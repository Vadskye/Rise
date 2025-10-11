export default (testFile) => {
  // Tests only count as coverage for their corresponding files.
  // This helps fix a weird bug where a file that is covered by two different tests could
  // only show the *lower* test coverage value of the two tests, making integration tests
  // essentially useless for coverage.
  const updated = testFile.replace(/\.test\.ts$/, '.ts');
  return updated;
};
