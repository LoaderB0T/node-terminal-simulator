import { assert } from 'console';
import { DO_DELETE_LINE, DO_MOVE_LEFT, DO_MOVE_UP } from './consts/ansi-codes';
import { Terminal } from './models/terminal';

const t = new Terminal([100, 8]);

t.write('This is a test');
// Output:
// This is a test

t.write('. Additional new text.'); // Same line
// Output:
// This is a test. Additional text.

t.write('\n'); // New line
t.write('This is a new line.');
// Output:
// This is a test. Additional text.
// This is a new line.

t.write(DO_MOVE_UP); // \u001b[A
t.write(DO_MOVE_LEFT); // \u001b[999D
t.write('This overwrites the first line.');
// Output:
// This overwrites the first line.text.
// This is a new line.

t.write(DO_DELETE_LINE); // \u001b[1L
// Output:
// This is a new line.

console.log(t.text);

assert(t.text === 'This is a new line.', 't.text should be "This is a new line."');
