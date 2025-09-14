import tap from 'tap';
import { main as spellRankBreakdownMain } from './spell_rank_breakdown';
import { main as spellRoleBreakdownMain } from './spell_role_breakdown';

// Helper to capture console output
function captureOutput(callback: () => void): string {
  const originalLog = console.log;
  let output = '';
  console.log = (...args: any[]) => {
    output += args.join(' ') + '\n';
  };
  try {
    callback();
  } finally {
    console.log = originalLog;
  }
  return output;
}

tap.test('spell_rank_breakdown.ts', async t => {
  t.test('should output correct table for default arguments', async st => {
    const output = captureOutput(() => {
      spellRankBreakdownMain(false, []);
    });
    st.matchSnapshot(output, 'default output');
  });

  t.test('should output correct chart for --chart argument', async st => {
    const output = captureOutput(() => {
      spellRankBreakdownMain(true, []);
    });
    st.matchSnapshot(output, 'chart output');
  });

  t.test('should output correct table for --spheres argument', async st => {
    const output = captureOutput(() => {
      spellRankBreakdownMain(false, ['Pyromancy', 'Aeromancy']);
    });
    st.matchSnapshot(output, 'spheres output');
  });
});

tap.test('spell_role_breakdown.ts', async t => {
  t.test('should output correct table for default arguments', async st => {
    const output = captureOutput(() => {
      spellRoleBreakdownMain(false, []);
    });
    st.matchSnapshot(output, 'default output');
  });

  t.test('should output correct chart for --chart argument', async st => {
    const output = captureOutput(() => {
      spellRoleBreakdownMain(true, []);
    });
    st.matchSnapshot(output, 'chart output');
  });

  t.test('should output correct table for --spheres argument', async st => {
    const output = captureOutput(() => {
      spellRoleBreakdownMain(false, ['Pyromancy', 'Aeromancy']);
    });
    st.matchSnapshot(output, 'spheres output');
  });
});
