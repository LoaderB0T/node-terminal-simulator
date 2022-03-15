import { InternalTerminal } from './internal-terminal';
import { TerminalKey } from '../consts/terminal-key';
import { Stdout } from './stdout';
import { Settings } from './settings';
import { AnsiAction } from './ansi-action';
import { ansiActions } from '../consts/ansi-actions';
import { terminalKeyToValue } from '../consts/terminal-key-to-value';

export class Terminal {
  private readonly _internalTerminal: InternalTerminal;
  private _originalStdout?: typeof process.stdout.write;
  private _originalStdWindowSize?: () => [number, number];

  constructor(size: [number, number]) {
    this._internalTerminal = new InternalTerminal(size);
  }

  /**
   * Set to any path to log the terminal output to a file.
   * This will include all escape characters without modifying anything
   * (inspect the actual raw output of your library for manual debugging).
   * @param filePath The path to the file to log to.
   */
  public static logToFile(filePath: string | undefined) {
    Settings.logToFile = filePath;
  }

  /**
   * Add a custom action to the library to handle a new ANSI code.
   * @param action The action to add.
   */
  public static addAnsiAction(action: AnsiAction) {
    ansiActions.push(action);
  }

  /**
   * Get the width of the simulated terminal.
   */
  public get width() {
    return this._internalTerminal.width;
  }

  /**
   * Get the height of the simulated terminal.
   */
  public get height() {
    return this._internalTerminal.height;
  }

  /**
   * Get the currently visible lines in the terminal.
   */
  public get lines() {
    return this._internalTerminal.currentText.map(x => x.trimEnd());
  }

  /**
   * Get the currently visible text in the terminal.
   */
  public get text() {
    return this.lines.join('\n');
  }

  /**
   * Get all lines in the terminal, including ones that got pushed our of sight.
   */
  public get allLines() {
    return [...this._internalTerminal.historyText, ...this.lines];
  }

  /**
   * Get all text in the terminal, including the text that got pushed out of sight.
   */
  public get allText() {
    return this.allLines.join('\n');
  }

  /**
   * Write text to the terminal. Supports ANSI escape codes.
   * @param text The text to write.
   */
  public write(text: string): boolean {
    return this._internalTerminal.write(text);
  }

  /**
   * Simulate a user key press in the terminal.
   * Use this for testing interactive prompts or other user input.
   * @param key The key to press.
   */
  public sendKey(key: TerminalKey) {
    process.stdin.emit('data', terminalKeyToValue(key));
  }

  /**
   * Simulate user text input in the terminal.
   * Use this for testing interactive prompts or other user input.
   * @param text The text to input.
   */
  public sendText(text: string) {
    process.stdin.emit('data', text);
  }

  /**
   * Redirect anything that writes to stdout to the simulated terminal.
   * Useful for testing your library that directly writes to stdout (eg with console.log).
   * @param stdout defaults to process.stdout
   */
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

  /**
   * Restore stdout to its original state.
   * Call this method at the end of your test (if you use redirectStdout)
   * for your testing framework to be able to print to the real terminal!
   * @param stdout defaults to process.stdout (In this case the fake one)
   */
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
