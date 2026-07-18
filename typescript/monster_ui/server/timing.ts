export const showDetailedTiming =
  process.argv.includes('--timing') ||
  process.argv.includes('--detailed-timing') ||
  process.env.TIMING === 'true' ||
  process.env.DETAILED_TIMING === 'true';
