import * as path from 'path';
import * as os from 'os';
import { configurePaths } from '../server/paths';

process.env.NODE_ENV = 'test';

// Point the server at isolated temp files so tests never touch the real database.
// Using os.tmpdir() + process.pid ensures each test process gets its own files.
const tmpDir = os.tmpdir();
configurePaths(
  path.join(tmpDir, `monsters_from_ui.test.${process.pid}.json`),
  path.join(tmpDir, `monsters_from_ui.test.${process.pid}.ts`),
);
