import chalk from 'chalk';
import { DO_CLEAR_LINE, DO_MOVE_LEFT, DO_MOVE_LEFT_FULLY, DO_MOVE_RIGHT, DO_MOVE_UP } from '../src/consts/ansi-codes';
import { Terminal } from '../src/index';

describe('', () => {
  let t: Terminal;

  beforeEach(() => {
    t = new Terminal([100, 6]);
  });

  test('Single Color', () => {
    const text = 'Hello World';
    t.write(chalk.magenta(text));
    expect(t.text).toStrictEqual(text);
    for (let i = 0; i < text.length; i++) {
      expect(t.getStylesAt(0, i)).toStrictEqual(['magenta']);
    }
  });

  test('Dual Color', () => {
    const text1 = 'Hello ';
    const text2 = 'World';
    t.write(chalk.magenta(text1));
    t.write(chalk.yellowBright(text2));
    expect(t.text).toStrictEqual(text1 + text2);
    for (let i = 0; i < text1.length; i++) {
      expect(t.getStylesAt(0, i)).toStrictEqual(['magenta']);
    }
    for (let i = 0; i < text2.length; i++) {
      expect(t.getStylesAt(0, text1.length + i)).toStrictEqual(['yellowBright']);
    }
  });

  test('Colors while moving cursor', () => {
    const text1 = '123456789';
    const text2 = 'abc';
    t.write(chalk.magenta(text1));
    t.write(`${DO_MOVE_LEFT.repeat(6)}`);
    t.write(chalk.bgCyanBright(text2));
    expect(t.text).toStrictEqual('123abc789');
    expect(t.getStylesAt(0, 0)).toStrictEqual(['magenta']);
    expect(t.getStylesAt(0, 1)).toStrictEqual(['magenta']);
    expect(t.getStylesAt(0, 2)).toStrictEqual(['magenta']);
    expect(t.getStylesAt(0, 3)).toStrictEqual(['bgCyanBright']);
    expect(t.getStylesAt(0, 4)).toStrictEqual(['bgCyanBright']);
    expect(t.getStylesAt(0, 5)).toStrictEqual(['bgCyanBright']);
    expect(t.getStylesAt(0, 6)).toStrictEqual(['magenta']);
    expect(t.getStylesAt(0, 7)).toStrictEqual(['magenta']);
    expect(t.getStylesAt(0, 8)).toStrictEqual(['magenta']);
  });
});
