import t from 'tap';
import { latexify } from './latexify';

let capturedWarnings: string[][];
let originalConsoleWarn: any;
t.beforeEach(() => {
  capturedWarnings = [];
  originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    capturedWarnings.push(args);
  };
});
t.afterEach(() => {
  console.warn = originalConsoleWarn;
});

t.test('text replacement', (t) => {
  t.test('should replace " + " with " add "', (t) => {
    t.equal(latexify('1 + 2'), '1 \\add 2');
    t.matchOnlyStrict(capturedWarnings, []);
    t.end();
  });

  t.test('should replace "+" followed by a digit with "plus" and the digit', (t) => {
    t.equal(latexify('+1'), '\\plus1');
    t.equal(latexify('word+2'), 'word\\plus2');
    t.matchOnlyStrict(capturedWarnings, []);
    t.end();
  });

  t.test('should replace " - " followed by a digit with " sub " and the digit', (t) => {
    t.equal(latexify('3 - 4'), '3 \\sub 4');
    t.matchOnlyStrict(capturedWarnings, []);
    t.end();
  });

  t.test('should replace "-" followed by a digit with "minus" and the digit', (t) => {
    t.equal(latexify('-5'), '\\minus5');
    t.equal(latexify('word-6'), 'word\\minus6');
    t.matchOnlyStrict(capturedWarnings, []);
    t.end();
  });

  t.test('should handle multiple replacements', (t) => {
    t.equal(latexify('1 + 2 - 3 +4 -5'), '1 \\add 2 \\sub 3 \\plus4 \\minus5');
    t.matchOnlyStrict(capturedWarnings, []);
    t.end();
  });

  t.test('should not modify text without special patterns', (t) => {
    t.equal(latexify('hello world'), 'hello world');
    t.matchOnlyStrict(capturedWarnings, []);
    t.end();
  });

  t.end();
});

t.test('warnings', (t) => {
  t.test('should warn for "<" character', (t) => {
    latexify('a < b');
    t.matchOnlyStrict(capturedWarnings, [["Problem latexifying text: contains '<'"]]);
    t.end();
  });

  t.test('should warn for ">" character not followed by "{"', (t) => {
    latexify('a > b');
    t.matchOnlyStrict(capturedWarnings, [["Problem latexifying text: contains '>'"]]);
    t.end();
  });

  t.test('should not warn for ">" character followed by "{"', (t) => {
    latexify('a >{b}');
    t.matchOnlyStrict(capturedWarnings, []);
    t.end();
  });

  t.test('should warn for unprefixed pcref', (t) => {
    latexify('See pcref{test}');
    t.matchOnlyStrict(capturedWarnings, [['Problem latexifying text: contains unprefixed pcref']]);
    t.end();
  });

  t.test('should warn for unprefixed trait', (t) => {
    latexify('See trait{test}');
    t.matchOnlyStrict(capturedWarnings, [['Problem latexifying text: contains unprefixed trait']]);
    t.end();
  });

  t.test('should warn for unprefixed glossterm', (t) => {
    latexify('See glossterm{test}');
    t.matchOnlyStrict(capturedWarnings, [
      ['Problem latexifying text: contains unprefixed glossterm'],
    ]);
    t.end();
  });

  t.test('should warn for actual tab character', (t) => {
    latexify('test\ttext');
    t.matchOnlyStrict(capturedWarnings, [
      ['Problem latexifying text: contains actual tab character'],
    ]);
    t.end();
  });

  t.test('should warn for unprefixed add', (t) => {
    latexify('gain a plus1 bonus');
    t.matchOnlyStrict(capturedWarnings, [['Problem latexifying text: contains unprefixed add']]);
    t.end();
  });

  t.test('should warn for unprefixed minus', (t) => {
    latexify('takes a minus1 penalty');
    t.matchOnlyStrict(capturedWarnings, [['Problem latexifying text: contains unprefixed minus']]);
    t.end();
  });

  t.test('should warn for unprefixed damagerank', (t) => {
    latexify('deals damagerankone damage');
    t.matchOnlyStrict(capturedWarnings, [
      ['Problem latexifying text: contains unprefixed damagerank'],
    ]);
    t.end();
  });

  t.test('should warn for unprefixed hprank', (t) => {
    latexify('regains hprankthree');
    t.matchOnlyStrict(capturedWarnings, [['Problem latexifying text: contains unprefixed hprank']]);
    t.end();
  });

  t.test('should warn for glossterm buff', (t) => {
    latexify('you are \\glossterm{braced}');
    t.matchOnlyStrict(capturedWarnings, [['Problem latexifying text: contains glossterm{buff}']]);
    t.end();
  });

  t.end();
});
