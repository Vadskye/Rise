# Fix Debounce and Caching Race Condition in Monster UI

## Problem Analysis

The user reports this sequence:
1. **Load** Monster A (not cached, takes time to compute)
2. **Quickly switch** to Monster B (already cached) → B appears immediately
3. **Switch a third time** to Monster C (should be cached) → **long load**, even though C should be instant

The root cause is **two interacting bugs** — one on the client, one revealed by the client's behavior on the server.

### Bug 1: No cleanup on selection-change fetches (client)

The `useEffect` in [App.tsx](file:///c:/Users/vadsk/github/Rise/typescript/monster_ui/src/App.tsx) has two branches:

```typescript
if (selectionChanged) {
  fetchPreview();     // immediate fetch
  return;             // ← BUG: no cleanup function!
} else {
  const handler = setTimeout(fetchPreview, 500);
  return () => clearTimeout(handler);  // cleanup only clears timeout
}
```

When the user switches monsters (the `selectionChanged` branch), the effect returns `undefined` — **no cleanup**. This means:
- The in-flight HTTP request is **never cancelled**
- When the stale response eventually arrives, it **unconditionally updates state** (`setPreviewStats`, `setErrors`, `setLoading`), overwriting the current monster's data with the old monster's data

### Bug 2: `handleEverything()` operates on the global "current" character sheet (server)

This is the deeper issue that explains the "long load" symptom. Tracing through the server code:

1. [validate.ts](file:///c:/Users/vadsk/github/Rise/typescript/monster_ui/server/validate.ts) calls `createCharacterSheet(name)` (line 41)
2. [createCharacterSheet](file:///c:/Users/vadsk/github/Rise/typescript/src/character_sheet/current_character_sheet.ts#L17-L25) sets a **global** `currentCharacterName` (line 22)
3. `handleEverything()` (line 133) delegates to functions in [sheet_worker.ts](file:///c:/Users/vadsk/github/Rise/typescript/src/character_sheet/sheet_worker.ts) which use [roll20_shim.ts](file:///c:/Users/vadsk/github/Rise/typescript/src/character_sheet/roll20_shim.ts)
4. Every function in `roll20_shim` calls `getCurrentCharacterSheet()` — which reads the **global** `currentCharacterName`

This means `handleEverything()` always operates on whichever character sheet was most recently set as "current". This is fine when requests are sequential, but **when Bug 1 allows overlapping requests**, the global state is corrupted:

**Trace of the failure (A → B → C):**

| Time | Client | Server |
|------|--------|--------|
| T=0 | Select A. Effect runs, `fetchPreview(A)`. No cleanup returned. | Receives request for A. `createCharacterSheet("A")` → sets global current = "A". Begins slow computation via `handleEverything()`. |
| T=0.2s | Select B. Previous cleanup = `undefined` (nothing cancelled!). Effect runs, `fetchPreview(B)`. | Still computing A. B's request queues. |
| T=2s | | A finishes. Response sent. Processes B's request: `characterSheetExists("B")` → cache hit → returns cached result instantly. Response sent. |
| T=2s | A's **stale** response arrives: `setPreviewStats(A)`, `setLoading(false)`. Then B's response arrives: `setPreviewStats(B)`, `setLoading(false)`. User sees B (correct, but A's data briefly flashed). | **Global current is still "A"** (set during A's computation, never changed back because B was a cache hit and didn't call `createCharacterSheet`). |
| T=3s | Select C. Effect runs, `fetchPreview(C)`. | Receives C. `characterSheetExists("C")` → true, cache hit... **but wait**: the cache check passes, and C's cached result is returned. |

Hmm — in this exact trace, C actually gets a cache hit. So what causes the "long load"?

The issue manifests when **the cache is invalidated**. Let me reconsider. The critical scenario is:

**When A is being computed for the first time while B and C are already cached:**

The `handleEverything()` call for A runs `setAttrs()` through the Roll20 shim, which calls `getCurrentCharacterSheet().setProperties(attrs)`. Since `currentCharacterName` is "A", these writes go to A's sheet. That part is correct.

**But** — the issue is that `handleEverything()` also calls `on()` to register event handlers via the shim. Those handlers are registered on whatever `getCurrentCharacterSheet()` returns. If any handler triggers a recalculation cycle via `triggerRecalculation()` or if the `on()` listeners from previous computations still exist on other sheets, those sheets could be modified as a side effect, **invalidating their caches**.

> [!IMPORTANT]
> Actually, I realize there may be an even simpler explanation. Let me reconsider more carefully.

After more analysis, I believe the simpler and more likely explanation for the "long load on third switch" is:

**The lack of request cancellation means the server is blocked.** Node.js is single-threaded. `validateMonster()` is entirely synchronous (it calls `handleEverything()`, `triggerRecalculation()`, etc. synchronously). When Monster A (uncached) is being computed, **all subsequent HTTP requests are queued** until A finishes. The user's request for C must wait in the Node.js event loop until A's synchronous computation completes, even though C is cached and would return instantly.

The sequence is:
1. User selects A → client sends request, server starts synchronous computation (~2s)
2. User switches to B → client sends request, **queued behind A** on the server
3. User switches to C → client sends request, **also queued behind A**
4. A finishes → server processes B (cache hit, instant) → server processes C (cache hit, instant)
5. All three responses arrive at the client nearly simultaneously

The user perceives B as "appearing immediately" because by the time they switch to C, A might have already finished (or nearly finished), so B's response arrives quickly. C then appears to have a "long load" because the user has been waiting since they clicked C.

**The fix must cancel obsolete requests so the server doesn't waste time on computations the user no longer cares about.** However, `AbortController` only cancels the client-side `fetch` — the server keeps computing. A complete fix would ideally also address server-side cancellation, but that's a much larger change.

## Proposed Changes

### Frontend Component

#### [MODIFY] [App.tsx](file:///c:/Users/vadsk/github/Rise/typescript/monster_ui/src/App.tsx)

The core fix: return a proper cleanup function from **both** branches of the effect, using `AbortController` to cancel in-flight requests and an `active` flag to ignore stale responses.

```typescript
  // Debounced preview calculation effect
  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    if (!activeSelection) {
      setPreviewStats(null);
      setErrors([]);
      setWarnings([]);
      lastSelectionRef.current = null;
      return;
    }

    if (activeSelection.type === 'group') {
      setPreviewStats(null);
      setErrors([]);
      setWarnings([]);
      lastSelectionRef.current = activeSelection;
      return;
    }

    let monsterData: MonsterData | undefined;
    let sharedFreeformCode: string | undefined;

    if (activeSelection.type === 'monster') {
      monsterData = db.monsters.find((m) => m.name === activeSelection.name);
    } else if (activeSelection.type === 'group-monster') {
      const group = db.monsterGroups.find((g) => g.name === activeSelection.groupName);
      monsterData = group?.monsters.find((m) => m.name === activeSelection.name);
      sharedFreeformCode = group?.sharedFreeformCode;
    }

    if (!monsterData) {
      setPreviewStats(null);
      lastSelectionRef.current = activeSelection;
      return;
    }

    const selectionChanged =
      !lastSelectionRef.current ||
      lastSelectionRef.current.type !== activeSelection.type ||
      lastSelectionRef.current.name !== activeSelection.name ||
      (activeSelection.type === 'group-monster' &&
        (lastSelectionRef.current as any).groupName !== activeSelection.groupName);

    lastSelectionRef.current = activeSelection;

    const fetchPreview = () => {
      setLoading(true);
      fetch('/api/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          monster: monsterData,
          sharedFreeformCode,
          groupName: activeSelection.type === 'group-monster' ? activeSelection.groupName : undefined,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Preview server returned error status');
          return res.json();
        })
        .then((result) => {
          if (!active) return;
          setErrors(result.errors || []);
          setWarnings(result.warnings || []);
          setPreviewStats(result.computedStats);
          setLoading(false);
        })
        .catch((err) => {
          if (err.name === 'AbortError') return;
          if (!active) return;
          setErrors([`Engine calculation failed: ${err.message || err}`]);
          setPreviewStats(null);
          setLoading(false);
        });
    };

    if (selectionChanged) {
      fetchPreview();
    } else {
      const handler = setTimeout(fetchPreview, 500);
      // Capture handler in cleanup so the timeout is also cleared
      const originalAbort = () => { active = false; controller.abort(); };
      return () => { originalAbort(); clearTimeout(handler); };
    }

    return () => { active = false; controller.abort(); };
  }, [activeSelection, db]);
```

> [!WARNING]
> **Limitation**: `AbortController` only cancels the **client-side** `fetch`. The Express server will still complete any synchronous `validateMonster()` computation that has already started. This fix prevents stale state on the client and avoids queuing redundant requests, but cannot interrupt a server-side computation already in progress.

## Open Questions

1. **Is the "long load" specifically the stale-request-blocking scenario described above, or is there also a cache invalidation issue?** If `handleEverything()` has side effects that modify other character sheets' data (invalidating their caches), the problem would persist even with client-side request cancellation. I was unable to fully rule this out from reading the code — `handleEverything()` runs ~15 subsystems through the global `getCurrentCharacterSheet()` shim, and any side effects on other sheets would silently invalidate caches.

2. **Should we add client-side caching?** Currently, every selection change requires a server round-trip even for previously-viewed, unchanged monsters. A client-side cache (keyed by a hash of the monster data) would make switching between previously-viewed monsters truly instant with no server request at all. This would be a more robust fix but adds complexity.

## Verification Plan

### Automated Tests
- `npm test` in `typescript/monster_ui` to verify no regressions.

### Manual Verification
- Load the app, select a monster, wait for it to compute, then rapidly switch between 3+ monsters and verify:
  - No stale data appears
  - Cached monsters appear without unnecessary delay
  - The loading indicator correctly reflects the current request state
