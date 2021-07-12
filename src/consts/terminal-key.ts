import { KEY_ARROW_DOWN, KEY_ARROW_LEFT, KEY_ARROW_RIGHT, KEY_ARROW_UP } from './ansi-codes';

export type TerminalKey = 'up' | 'down' | 'left' | 'right' | 'enter' | 'backspace' | 'tab';

export const terminalKeyToValue = (key: TerminalKey): string => {
  switch (key) {
    case 'up':
      return KEY_ARROW_UP;
    case 'down':
      return KEY_ARROW_DOWN;
    case 'left':
      return KEY_ARROW_LEFT;
    case 'right':
      return KEY_ARROW_RIGHT;
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
