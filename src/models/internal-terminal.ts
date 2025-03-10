import { appendFileSync } from 'fs';

import { Settings } from './settings.js';
import { ansiActions } from '../consts/ansi-actions.js';
import { CONTROL_PREFIX_FIRST_CHAR, DO_CONTROL_PREFIX } from '../consts/ansi-codes.js';
import { ansiStyles } from '../consts/ansi-styles.js';
import { terminalKeyToValue } from '../consts/terminal-key-to-value.js';
import { TerminalKey } from '../consts/terminal-key.js';
import { AnsiStyleKind, AnsiStyleMap } from '../types/ansi-style.js';

export class InternalTerminal {
  private readonly _size: [number, number];
  private readonly _cursorPos: [number, number] = [0, 0];
  public readonly currentStyles: AnsiStyleMap = [];
  public readonly activeStyles: AnsiStyleKind[] = [];
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
      this.historyText.push(this.currentText.shift()!.trimEnd());
      if (this.cursorY === this.height) {
        this.cursorY = this.cursorY - 1;
      }
    }
  }

  public writeToBuffer(text: string) {
    for (const char of text) {
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
      this.cursorX > this.getCursorLine().length
        ? ' '.repeat(this.cursorX - this.getCursorLine().length)
        : '';
    const newLineText =
      this.getCursorLine().substring(0, this.cursorX) +
      fillEmptySpace +
      char +
      this.getCursorLine().substring(this.cursorX + 1);
    this.setCursorLine(newLineText);
    const existingStyles = this.currentStyles.find(
      s => s.x === this.cursorX && s.y === this.cursorY
    );

    if (existingStyles) {
      existingStyles.styles = [...this.activeStyles];
    } else {
      this.currentStyles.push({
        x: this.cursorX,
        y: this.cursorY,
        styles: [...this.activeStyles],
      });
    }
    this.cursorX = this.cursorX + 1;
  }

  public write(text: string): boolean {
    if (Settings.logToFile) {
      appendFileSync(Settings.logToFile, text.replace(CONTROL_PREFIX_FIRST_CHAR, ''));
    }
    if (text.indexOf(CONTROL_PREFIX_FIRST_CHAR) === -1) {
      this.writeToBuffer(text);
      return true;
    }
    const ansiBeginnings = text.split(CONTROL_PREFIX_FIRST_CHAR);

    this.writeToBuffer(ansiBeginnings.shift()!);

    for (const ansiBeginning of ansiBeginnings) {
      const modifier = ansiActions.find(x => x.tryRunAction(this, ansiBeginning));
      if (!modifier) {
        throw new Error(`Unknown ansi escape: ${ansiBeginning}`);
      }
      this.writeToBuffer(modifier.rest);
    }

    return true;
  }

  public sendKey(key: TerminalKey) {
    this.write(terminalKeyToValue(key));
  }

  public getStylesAt(line: number, char: number): AnsiStyleKind[] {
    return this.currentStyles.find(s => s.x === char && s.y === line)?.styles || [];
  }

  public getStyledText(): string {
    const resultLines: string[] = [];
    for (let i = 0; i < this.currentText.length; i++) {
      resultLines.push('');
      const line = this.currentText[i];
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        const styles = this.getStylesAt(i, j);
        let outStr = char;
        styles.forEach(style => {
          const ansiStyle = ansiStyles[style];
          outStr = `${DO_CONTROL_PREFIX}${ansiStyle[0]}m${outStr}${DO_CONTROL_PREFIX}${ansiStyle[1]}m`;
        });
        resultLines[i] += outStr;
      }
    }
    return resultLines.join('\n');
  }
}
