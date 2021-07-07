export const CONTROL_PREFIX_FIRST_CHAR: string = '\u001b';
export const CONTROL_PREFIX: string = `\\[`;

export const MOVE_UP = `${CONTROL_PREFIX}(\\d*)A`;
export const MOVE_DOWN = `${CONTROL_PREFIX}(\\d*)B`;
export const MOVE_RIGHT = `${CONTROL_PREFIX}(\\d*)C`;
export const MOVE_LEFT = `${CONTROL_PREFIX}(\\d*)D`;
export const INSERT_NEW_LINE = `${CONTROL_PREFIX}(\\d*)L`;
export const DELETE_LINE = `${CONTROL_PREFIX}(\\d*)M`;
export const CLEAR_LINE = `${CONTROL_PREFIX}0K`;
export const HIDE_CURSOR = `${CONTROL_PREFIX}?25l`;
export const SHOW_CURSOR = `${CONTROL_PREFIX}?25h`;

export const START_BLINK_CURSOR = `${CONTROL_PREFIX}?12h`;
export const STOP_BLINK_CURSOR = `${CONTROL_PREFIX}?12l`;
export const SAVE_CURSOR = `${CONTROL_PREFIX}s`;
export const RESTORE_CURSOR = `${CONTROL_PREFIX}u`;

export const KEY_ARROW_UP = `${CONTROL_PREFIX}A`;
export const KEY_ARROW_DOWN = `${CONTROL_PREFIX}B`;
export const KEY_ARROW_RIGHT = `${CONTROL_PREFIX}C`;
export const KEY_ARROW_LEFT = `${CONTROL_PREFIX}D`;
