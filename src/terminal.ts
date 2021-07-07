import { AnsiAction } from './ansi-action';
import { CONTROL_PREFIX_FIRST_CHAR, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP } from './ansi-codes';
import { TerminalKey, terminalKeyToValue } from './terminal-key';

export class Terminal {
  private readonly _size: [number, number];
  private readonly _cursorPos: [number, number] = [0, 0];
  private _currentText: string[] = [''];
  private readonly _ansiActions = [
    new AnsiAction(MOVE_UP, allParams => {
      const amount = Number.parseInt(allParams[0] ?? '1');
      for (let i = 0; i < amount; i++) {
        if (this._cursorPos[1] > 0) {
          this._cursorPos[1] = this._cursorPos[1] - 1;
        }
      }
    }),
    new AnsiAction(MOVE_LEFT, allParams => {
      const amount = Number.parseInt(allParams[0] ?? '1');
      for (let i = 0; i < amount; i++) {
        if (this._cursorPos[0] > 0) {
          this._cursorPos[0] = this._cursorPos[0] - 1;
        }
      }
    }),
    new AnsiAction(MOVE_DOWN, allParams => {
      const amount = Number.parseInt(allParams[0] ?? '1');
      for (let i = 0; i < amount; i++) {
        if (this._cursorPos[1] < this._currentText.length && this._cursorPos[1] < this.height - 1) {
          this._cursorPos[1] = this._cursorPos[1] + 1;
        }
      }
    }),
    new AnsiAction(MOVE_RIGHT, allParams => {
      const amount = Number.parseInt(allParams[0] ?? '1');
      for (let i = 0; i < amount; i++) {
        if (this._cursorPos[0] < this.getCursorLine().length - 1) {
          this._cursorPos[0] = this._cursorPos[0] + 1;
        }
      }
    })
  ];

  constructor(size: [number, number]) {
    this._size = size;
    process.stdout.write = (text: string) => this.write(text);
  }

  private get width() {
    return this._size[0];
  }
  private get height() {
    return this._size[1];
  }

  private getCursorLine(): string {
    return this._currentText[this._cursorPos[1]];
  }

  private setCursorLine(text: string) {
    this._currentText[this._cursorPos[1]] = text;
  }

  private insertLine() {
    this._cursorPos[1] = this._cursorPos[1] + 1;
    if (this.getCursorLine() === undefined) {
      this._currentText.push('');
      this._cursorPos[0] = 0;
    }
  }

  private writeToBuffer(text: string) {
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char.match(/[\r\n]/)) {
        this.insertLine();
      } else {
        this.writeToCursor(char);
      }
    }
  }

  private writeToCursor(char: string) {
    if (this.getCursorLine().length === this.width && this._cursorPos[0] === this.width) {
      this.insertLine();
    }
    const a = this.getCursorLine().substr(0, this._cursorPos[0]) + char + this.getCursorLine().substr(this._cursorPos[0] + 1);
    this.setCursorLine(a);
    this._cursorPos[0] = this._cursorPos[0] + 1;
  }

  public write(text: string): boolean {
    if (text.indexOf(CONTROL_PREFIX_FIRST_CHAR) === -1) {
      this.writeToBuffer(text);
      return true;
    }
    const ansiBeginnings = text.split(CONTROL_PREFIX_FIRST_CHAR);

    this.writeToBuffer(ansiBeginnings.shift()!);

    for (const ansiBeginning of ansiBeginnings) {
      const modifier = this._ansiActions.find(x => x.tryRunAction(ansiBeginning));
      if (!modifier) {
        throw new Error('Unknown ansi escape');
      }
      this.writeToBuffer(modifier.rest);
    }

    return true;
  }

  public sendKey(key: TerminalKey) {
    this.write(terminalKeyToValue(key));
  }
}
