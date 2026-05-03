import t from 'tap';
import { normalize, tokenize, firstDiffIndex, contextWindow } from './verify_latex_parity';

t.test('normalize', (t) => {
  t.test('should collapse multiple spaces', (t) => {
    t.equal(normalize('Hello   World'), 'Hello World');
    t.end();
  });

  t.test('should strip LaTeX comments', (t) => {
    t.equal(normalize('Hello % comment\nWorld'), 'Hello World');
    t.end();
  });

  t.test('should normalize ft.\\ to ft.', (t) => {
    t.equal(normalize('30 ft.\\ and more'), '30 ft. and more');
    t.end();
  });

  t.test('should trim whitespace', (t) => {
    t.equal(normalize('  Hello World  '), 'Hello World');
    t.end();
  });

  t.end();
});

t.test('tokenize', (t) => {
  t.test('should split by space', (t) => {
    t.same(tokenize('Hello World'), ['Hello', 'World']);
    t.end();
  });

  t.test('should filter out empty strings', (t) => {
    t.same(tokenize('Hello  World'), ['Hello', 'World']);
    t.end();
  });

  t.end();
});

t.test('firstDiffIndex', (t) => {
  t.test('should return -1 for identical arrays', (t) => {
    t.equal(firstDiffIndex(['A', 'B'], ['A', 'B']), -1);
    t.end();
  });

  t.test('should return the first mismatch index', (t) => {
    t.equal(firstDiffIndex(['A', 'B', 'C'], ['A', 'X', 'C']), 1);
    t.end();
  });

  t.test('should return length of shorter array if one is prefix of other', (t) => {
    t.equal(firstDiffIndex(['A', 'B'], ['A', 'B', 'C']), 2);
    t.end();
  });

  t.end();
});

t.test('contextWindow', (t) => {
  const tokens = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  t.test('should show tokens around index with markers', (t) => {
    const result = contextWindow(tokens, 5, 2);
    t.equal(result, '3 4 >>>5<<< 6 7');
    t.end();
  });

  t.test('should handle start of array', (t) => {
    const result = contextWindow(tokens, 1, 2);
    t.equal(result, '0 >>>1<<< 2 3');
    t.end();
  });

  t.test('should handle end of array', (t) => {
    const result = contextWindow(tokens, 9, 2);
    t.equal(result, '7 8 >>>9<<< 10');
    t.end();
  });

  t.end();
});
