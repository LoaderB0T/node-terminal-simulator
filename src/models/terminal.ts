import { InternalTerminal } from './internal-terminal';
import { TerminalKey, terminalKeyToValue } from '../consts/terminal-key';
import { Stdout } from './stdout';
import { Settings } from './settings';
import { AnsiAction } from './ansi-action';
import { ansiActions } from '../consts/ansi-actions';

export class Terminal {
  private readonly _internalTerminal: InternalTerminal;
  private _originalStdout?: typeof process.stdout.write;
  private _originalStdWindowSize?: () => [number, number];

  constructor(size: [number, number]) {
    this._internalTerminal = new InternalTerminal(size);
  }

  public static logToFile(filePath: string) {
    Settings.logToFile = filePath;
  }

  public static addAnsiAction(action: AnsiAction) {
    ansiActions.push(action);
  }

  public get width() {
    return this._internalTerminal.width;
  }

  public get height() {
    return this._internalTerminal.height;
  }

  public get lines() {
    return this._internalTerminal.currentText.map(x => x.trimEnd());
  }

  public get text() {
    return this.lines.join('\n');
  }

  public get allLines() {
    return [...this._internalTerminal.historyText, ...this.lines];
  }

  public get allText() {
    return this.allLines.join('\n');
  }

  public write(text: string): boolean {
    return this._internalTerminal.write(text);
  }

  public sendKey(key: TerminalKey) {
    process.stdin.emit('data', terminalKeyToValue(key));
  }

  public sendText(text: string) {
    process.stdin.emit('data', text);
  }

  public redirectStdout(stdout?: Stdout) {
    stdout ??= process.stdout;
    if ((stdout as any)['__node_terminal_simulator_redirected']) {
      this.restoreStdout(stdout);
    }
    (stdout as any)['__node_terminal_simulator_redirected'] = true;
    this._originalStdout = stdout.write;
    this._originalStdWindowSize = stdout.getWindowSize;
    stdout.write = (text: string) => this.write(text);
    stdout.getWindowSize = () => [this.width, this.height];
  }

  public restoreStdout(stdout?: Stdout) {
    stdout ??= process.stdout;
    if (!(stdout as any)['__node_terminal_simulator_redirected']) {
      throw new Error('Stdout has not been redirected');
    }
    stdout.write = this._originalStdout!;
    stdout.getWindowSize = this._originalStdWindowSize!;
    (stdout as any)['__node_terminal_simulator_redirected'] = undefined;
  }
}
