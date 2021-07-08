import { DO_CLEAR_LINE, DO_DELETE_LINE, DO_INSERT_NEW_LINE, DO_MOVE_LEFT, DO_MOVE_RIGHT, DO_MOVE_UP } from './ansi-codes';
import { Terminal } from './terminal';

const t = new Terminal([100, 8]);

// a.write('123456789012345678901234567890');

// a.write('\u001b[999Dtest');

// console.log(a.text);

const testText =
  '1test\n2test\n3test\n4test\n5test' +
  DO_MOVE_LEFT +
  DO_MOVE_UP +
  DO_MOVE_UP +
  'overwrite' +
  DO_MOVE_LEFT +
  DO_MOVE_RIGHT +
  DO_CLEAR_LINE;

t.write(testText);

process.stdout.write(testText);
console.log();
console.log();
console.log();
console.log();
console.log();
console.log(t.text.join('\n'));
