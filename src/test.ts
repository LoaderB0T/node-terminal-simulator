import chalk from 'chalk';
import { DO_MOVE_LEFT } from './consts/ansi-codes';
import { Terminal } from './models/terminal';

const t = new Terminal([100, 8]);

const input = [chalk.blue('123456789'), DO_MOVE_LEFT, DO_MOVE_LEFT, chalk.red('a'), DO_MOVE_LEFT, DO_MOVE_LEFT, 'b', '\n', 'abc'];

const text = input.join('');

console.log(text);
console.log();

t.write(text);
console.log(t.getStyledText());
console.log();
