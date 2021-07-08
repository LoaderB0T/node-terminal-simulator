export const CONTROL_PREFIX_FIRST_CHAR: string = '\u001b';
export const CONTROL_PREFIX: string = `\\[`;
export const DO_CONTROL_PREFIX: string = `${CONTROL_PREFIX_FIRST_CHAR}[`;

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
export const SET_COLOR = `${CONTROL_PREFIX}(\\d+)(?:;(\\d+))?m`;

export const KEY_ARROW_UP = `${CONTROL_PREFIX}A`;
export const KEY_ARROW_DOWN = `${CONTROL_PREFIX}B`;
export const KEY_ARROW_RIGHT = `${CONTROL_PREFIX}C`;
export const KEY_ARROW_LEFT = `${CONTROL_PREFIX}D`;

export const DO_MOVE_UP = `${DO_CONTROL_PREFIX}A`;
export const DO_MOVE_DOWN = `${DO_CONTROL_PREFIX}B`;
export const DO_MOVE_RIGHT = `${DO_CONTROL_PREFIX}C`;
export const DO_MOVE_LEFT = `${DO_CONTROL_PREFIX}999D`;
export const DO_INSERT_NEW_LINE = `${DO_CONTROL_PREFIX}1L`;
export const DO_DELETE_LINE = `${DO_CONTROL_PREFIX}1M`;
export const DO_CLEAR_LINE = `${DO_CONTROL_PREFIX}0K`;
export const DO_HIDE_CURSOR = `${DO_CONTROL_PREFIX}?25l`;
export const DO_SHOW_CURSOR = `${DO_CONTROL_PREFIX}?25h`;

export const DO_START_BLINK_CURSOR = `${DO_CONTROL_PREFIX}?12h`;
export const DO_STOP_BLINK_CURSOR = `${DO_CONTROL_PREFIX}?12l`;
export const DO_SAVE_CURSOR = `${DO_CONTROL_PREFIX}s`;
export const DO_RESTORE_CURSOR = `${DO_CONTROL_PREFIX}u`;

export const DO_KEY_ARROW_UP = `${DO_CONTROL_PREFIX}A`;
export const DO_KEY_ARROW_DOWN = `${DO_CONTROL_PREFIX}B`;
export const DO_KEY_ARROW_RIGHT = `${DO_CONTROL_PREFIX}C`;
export const DO_KEY_ARROW_LEFT = `${DO_CONTROL_PREFIX}D`;
