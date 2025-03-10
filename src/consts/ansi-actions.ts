import {
  CLEAR_LINE,
  DELETE_LINE,
  HIDE_CURSOR,
  INSERT_NEW_LINE,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
  SET_COLOR,
  SHOW_CURSOR,
} from './ansi-codes.js';
import { ansiStyles } from './ansi-styles.js';
import { AnsiAction } from '../models/ansi-action.js';
import { AnsiStyleKind } from '../types/ansi-style.js';

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
      if (t.ghostLineCount > 0) {
        t.ghostLineCount--;
      } else {
        t.currentText.pop();
      }
      t.cursorX = 0;
    }
  }),
  new AnsiAction(DELETE_LINE, (t, allParams) => {
    const amount = Number.parseInt(allParams[0] ?? '1');
    for (let i = 0; i < amount; i++) {
      t.currentText.splice(t.cursorY, 1);
      t.cursorX = 0;
      t.ghostLineCount++;
    }
  }),
  new AnsiAction(CLEAR_LINE, t => {
    t.setCursorLine(t.getCursorLine().slice(0, t.cursorX));
  }),
  new AnsiAction(HIDE_CURSOR, () => {
    // ignore for now
  }),
  new AnsiAction(SHOW_CURSOR, () => {
    // ignore for now
  }),
  new AnsiAction(SET_COLOR, (t, allParams) => {
    const styleCodeStr = allParams[0] ?? '0';
    const styleCode = Number.parseInt(styleCodeStr);

    const styleNameStart = Object.keys(ansiStyles)
      .map(x => x as AnsiStyleKind)
      .find(key => ansiStyles[key][0] === styleCode);
    const styleNamesEnd = Object.keys(ansiStyles)
      .map(x => x as AnsiStyleKind)
      .filter(key => ansiStyles[key][1] === styleCode);

    if (styleNameStart) {
      if (!t.activeStyles.some(x => x === styleNameStart)) {
        t.activeStyles.push(styleNameStart);
      }
    }
    if (styleNamesEnd) {
      styleNamesEnd.forEach(styleNameEnd => {
        const index = t.activeStyles.findIndex(x => x === styleNameEnd);
        if (index > -1) {
          t.activeStyles.splice(index, 1);
        }
      });
    }
  }),
];
