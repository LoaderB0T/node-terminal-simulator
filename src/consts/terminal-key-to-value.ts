import { DO_KEY_ARROW_DOWN, DO_KEY_ARROW_LEFT, DO_KEY_ARROW_RIGHT, DO_KEY_ARROW_UP } from './ansi-codes';
import { TerminalKey } from './terminal-key';

export const terminalKeyToValue = (key: TerminalKey): string => {
  switch (key) {
    case 'up':
      return DO_KEY_ARROW_UP;
    case 'down':
      return DO_KEY_ARROW_DOWN;
    case 'left':
      return DO_KEY_ARROW_LEFT;
    case 'right':
      return DO_KEY_ARROW_RIGHT;
    case 'enter':
      return '\n';
    case 'backspace':
      return '\b';
    case 'tab':
      return '\t';
    default:
      throw new Error('Unsupported key');
  }
};
