import { AnsiAction } from './ansi-action';
import { CLEAR_LINE, DELETE_LINE, INSERT_NEW_LINE, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP } from './ansi-codes';

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
  }),
  new AnsiAction(INSERT_NEW_LINE, (t, allParams) => {
    const amount = Number.parseInt(allParams[0] ?? '1');
    for (let i = 0; i < amount; i++) {
      t.currentText.splice(t.cursorY, 0, '');
      t.currentText.pop();
      // todo: pop not always necessary
      t.cursorX = 0;
    }
  }),
  new AnsiAction(DELETE_LINE, (t, allParams) => {
    const amount = Number.parseInt(allParams[0] ?? '1');
    for (let i = 0; i < amount; i++) {
      t.currentText.splice(t.cursorY, 1);
      t.cursorX = 0;
    }
  }),
  new AnsiAction(CLEAR_LINE, t => {
    t.setCursorLine(t.getCursorLine().slice(0, t.cursorX));
  })
];

// export const HIDE_CURSOR = `${CONTROL_PREFIX}?25l`;
// export const SHOW_CURSOR = `${CONTROL_PREFIX}?25h`;

// export const START_BLINK_CURSOR = `${CONTROL_PREFIX}?12h`;
// export const STOP_BLINK_CURSOR = `${CONTROL_PREFIX}?12l`;
// export const SAVE_CURSOR = `${CONTROL_PREFIX}s`;
// export const RESTORE_CURSOR = `${CONTROL_PREFIX}u`;
