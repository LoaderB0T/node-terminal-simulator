import { ansiActions } from '../consts/ansi-actions';
import { CONTROL_PREFIX_FIRST_CHAR } from '../consts/ansi-codes';
import { TerminalKey, terminalKeyToValue } from '../consts/terminal-key';

export class InternalTerminal {
  private readonly _size: [number, number];
  private readonly _cursorPos: [number, number] = [0, 0];
  public currentText: string[] = [''];
  public historyText: string[] = [];
  public ghostLineCount: number = 0;

  constructor(size: [number, number]) {
    this._size = size;
  }

  public get width() {
    return this._size[0];
  }
  public get height() {
    return this._size[1];
  }
  public get cursorX() {
    return this._cursorPos[0];
  }
  public get cursorY() {
    return this._cursorPos[1];
  }
  public set cursorX(value: number) {
    this._cursorPos[0] = value;
  }
  public set cursorY(value: number) {
    this._cursorPos[1] = value;
  }

  public getCursorLine(): string {
    return this.currentText[this.cursorY];
  }

  public setCursorLine(text: string) {
    this.currentText[this.cursorY] = text;
  }

  public insertLine() {
    this.cursorY = this.cursorY + 1;
    if (this.getCursorLine() === undefined) {
      if (this.ghostLineCount > 0) {
        this.ghostLineCount--;
      }
      this.currentText.push('');
      this.fixRowCount();
    }
    this.cursorX = 0;
  }

  public fixRowCount() {
    while (this.currentText.length > this.height) {
      this.historyText.push(this.currentText.shift()!);
      if (this.cursorY === this.height) {
        this.cursorY = this.cursorY - 1;
      }
    }
  }

  public writeToBuffer(text: string) {
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char.match(/[\r\n]/)) {
        this.insertLine();
      } else {
        this.writeToCursor(char);
      }
    }
  }

  public writeToCursor(char: string) {
    if (this.getCursorLine().length === this.width && this.cursorX === this.width) {
      this.insertLine();
    }
    const fillEmptySpace =
      this.cursorX > this.getCursorLine().length ? ' '.repeat(this.cursorX - this.getCursorLine().length) : '';
    const newLineText =
      this.getCursorLine().substr(0, this.cursorX) + fillEmptySpace + char + this.getCursorLine().substr(this.cursorX + 1);
    this.setCursorLine(newLineText);
    this.cursorX = this.cursorX + 1;
  }

  public write(text: string): boolean {
    if (text.indexOf(CONTROL_PREFIX_FIRST_CHAR) === -1) {
      this.writeToBuffer(text);
      return true;
    }
    const ansiBeginnings = text.split(CONTROL_PREFIX_FIRST_CHAR);

    this.writeToBuffer(ansiBeginnings.shift()!);

    for (const ansiBeginning of ansiBeginnings) {
      const modifier = ansiActions.find(x => x.tryRunAction(this, ansiBeginning));
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
