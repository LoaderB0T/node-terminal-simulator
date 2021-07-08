import { Terminal } from '../src/index';

describe('', () => {
  let t: Terminal;

  beforeEach(() => {
    t = new Terminal([100, 8]);
  });

  test('test 1 line logging', () => {
    t.write('1 line of text');
    expect(t.text).toStrictEqual(['1 line of text']);
  });

  test('test 2 line logging', () => {
    t.write('1 line of text\n2nd line of text');
    expect(t.text).toStrictEqual(['1 line of text', '2nd line of text']);
  });
});
