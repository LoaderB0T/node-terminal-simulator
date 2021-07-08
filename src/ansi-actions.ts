import { AnsiAction } from './ansi-action';
import { MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP } from './ansi-codes';

export const ansiActions = [
  new AnsiAction(MOVE_UP, (t, allParams) => {
    const amount = Number.parseInt(allParams[0] ?? '1');
    for (let i = 0; i < amount; i++) {
      if (t.cursorY > 0) {
        t.cursorY = t.cursorY - 1;
      }
    }
  }),
  new AnsiAction(MOVE_LEFT, (t, allParams) => {
    const amount = Number.parseInt(allParams[0] ?? '1');
    for (let i = 0; i < amount; i++) {
      if (t.cursorX > 0) {
        t.cursorX = t.cursorX - 1;
      }
    }
  }),
  new AnsiAction(MOVE_DOWN, (t, allParams) => {
    const amount = Number.parseInt(allParams[0] ?? '1');
    for (let i = 0; i < amount; i++) {
      if (t.cursorY < t.currentText.length && t.cursorY < t.height - 1) {
        t.cursorY = t.cursorY + 1;
      }
    }
  }),
  new AnsiAction(MOVE_RIGHT, (t, allParams) => {
    const amount = Number.parseInt(allParams[0] ?? '1');
    for (let i = 0; i < amount; i++) {
      if (t.cursorX < t.getCursorLine().length - 1) {
        t.cursorX = t.cursorX + 1;
      }
    }
  })
];
