import { Terminal } from './terminal';

const a = new Terminal([20, 5]);

a.write('123456789012345678901234567890');

a.write('\u001b[999Dtest');

console.log(a.text);
