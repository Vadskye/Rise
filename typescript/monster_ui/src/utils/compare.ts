/**
 * Recursively find all paths where two objects differ.
 * If one side is undefined/null and the other is a non-null object,
 * the undefined/null side is normalized to an empty object for recursive comparison.
 */
export function getChangedPaths(obj1: unknown, obj2: unknown, currentPath: string = ''): string[] {
  if (obj1 === obj2) {
    return [];
  }

  let o1: unknown = obj1;
  let o2: unknown = obj2;
  if (
    (o1 === null || o1 === undefined) &&
    typeof o2 === 'object' &&
    o2 !== null &&
    !Array.isArray(o2)
  ) {
    o1 = {};
  }
  if (
    (o2 === null || o2 === undefined) &&
    typeof o1 === 'object' &&
    o1 !== null &&
    !Array.isArray(o1)
  ) {
    o2 = {};
  }

  if (typeof o1 !== 'object' || o1 === null || typeof o2 !== 'object' || o2 === null) {
    return [currentPath];
  }

  if (Array.isArray(o1) && Array.isArray(o2)) {
    if (o1.length !== o2.length) {
      return [currentPath];
    }
    const paths: string[] = [];
    for (let i = 0; i < o1.length; i++) {
      const subPath = currentPath ? `${currentPath}.${i}` : `${i}`;
      paths.push(...getChangedPaths(o1[i], o2[i], subPath));
    }
    return paths;
  }

  if (Array.isArray(o1) || Array.isArray(o2)) {
    return [currentPath];
  }

  const rec1 = o1 as Record<string, unknown>;
  const rec2 = o2 as Record<string, unknown>;
  const keys = Array.from(new Set([...Object.keys(rec1), ...Object.keys(rec2)]));
  const paths: string[] = [];
  for (const key of keys) {
    const subPath = currentPath ? `${currentPath}.${key}` : key;
    paths.push(...getChangedPaths(rec1[key], rec2[key], subPath));
  }
  return paths;
}
