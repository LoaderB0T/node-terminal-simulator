import { DO_MOVE_LEFT, DO_MOVE_UP } from '../src/consts/ansi-codes';
import { Terminal } from '../src/index';

describe('', () => {
  let t: Terminal;

  beforeEach(() => {
    t = new Terminal([100, 6]);
  });

  test('1 line logging', () => {
    t.write('1 line of text');
    expect(t.text).toStrictEqual(['1 line of text']);
  });

  test('2 lines logging', () => {
    t.write('1 line of text\n2nd line of text');
    expect(t.text).toStrictEqual(['1 line of text', '2nd line of text']);
  });

  test('8 lines logging', () => {
    t.write('1\n2\n3\n4\n5\n6\n7\n8');
    expect(t.text).toStrictEqual(['1', '2', '3', '4', '5', '6', '7', '8']);
  });

  test('concat text', () => {
    t.write('1');
    t.write('2');
    t.write('3');
    t.write('4');
    t.write('5');
    t.write('6');
    t.write('7');
    t.write('8');
    expect(t.text).toStrictEqual(['12345678']);
  });

  test('overwrite text', () => {
    t.write('1\n2\n3\n4\n5\n6\n7\n8');
    t.write(DO_MOVE_UP);
    t.write(DO_MOVE_UP);
    t.write(DO_MOVE_UP);
    t.write(DO_MOVE_LEFT);
    t.write('new\nlines');
    expect(t.text).toStrictEqual(['1', '2', '3', '4', 'new', 'lines', '7', '8']);
  });

  test('overwrite text without left reset', () => {
    t.write('1\n2\n3\n4\n5\n6\n7\n8x');
    t.write(DO_MOVE_UP);
    t.write(DO_MOVE_UP);
    t.write(DO_MOVE_UP);
    t.write('new\nlines');
    expect(t.text).toStrictEqual(['1', '2', '3', '4', '5 new', 'lines', '7', '8x']);
  });
});
