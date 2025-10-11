export default (testFile) => {
  // Tests can count as coverage for any files in the same directory, but not in other
  // directories.
  // This helps fix a weird bug where a file that is covered by two different tests would
  // only show the *lower* test coverage value of the two tests.
  const updated = testFile.replace(/\w+\.test\.ts$/, '*.ts');
  console.log(`Test file: '${testFile}' -> '${updated}'`);
  return updated;
};
