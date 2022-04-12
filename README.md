[![npm](https://img.shields.io/npm/v/node-terminal-simulator?color=%2300d26a&style=for-the-badge)](https://www.npmjs.com/package/node-terminal-simulator)
[![Sonar Quality Gate](https://img.shields.io/sonar/quality_gate/LoaderB0T_node-terminal-simulator?server=https%3A%2F%2Fsonarcloud.io&style=for-the-badge)](https://sonarcloud.io/summary/new_code?id=LoaderB0T_node-terminal-simulator)

# node-terminal-simulator

Simulates the behavior of a terminal in NodeJS.

## Motivation 💥

This small package provides a simple way to simulate the behavior of a terminal in NodeJS. The primary use case is to unit-test libraries or tools that interact with the terminal. It respects many special ANSI escape sequences, like cursor movement or deleting and inserting lines.

## Features 🔥

✅ Simulates the behavior of a terminal in NodeJS.

✅ Supports ANSI escape sequences. (e.g. cursor movement, deleting and inserting lines)

✅ Easily assert the expected current displayed text in the terminal.

✅ Send keys to the terminal to simulate user input.

✅ Accurately tracks the cursor position.

✅ Assert the lines that are pushed out of the visible terminal area.

✅ Easily extensible with custom escape sequences.

This project is by no means complete, but it's a good starting point. Feel free to open an issue or pull request if you have any suggestions for improvements like new escape sequences.

## Limitations ⚠️

🔒 Escape sequences for colors are removed from the output. (The text will be there, but without any color information.)

🔒 Many escape sequences are not recognized. (Feel free to contribute 😊)

## Built With 🔧

- [TypeScript](https://www.typescriptlang.org/)

## Usage Example 🚀

```typescript
import { Terminal, DO_DELETE_LINE, DO_MOVE_LEFT_FULLY, DO_MOVE_UP } from 'node-terminal-simulator';

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
t.write(DO_MOVE_LEFT_FULLY); // \u001b[999D
t.write('This overwrites the first line.');
// Output:
// This overwrites the first line.text.
// This is a new line.

t.write(DO_DELETE_LINE); // \u001b[1L
// Output:
// This is a new line.

console.log(t.text);

assert(t.text === 'This is a new line.', 't.text should be "This is a new line."');
```

## Contributing 🧑🏻‍💻

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 🔑

Distributed under the MIT License. See `LICENSE.txt` for more information.

## Contact 📧

Janik Schumacher - [@LoaderB0T](https://twitter.com/LoaderB0T) - [linkedin](https://www.linkedin.com/in/janikschumacher/)

Project Link: [https://github.com/LoaderB0T/node-terminal-simulator](https://github.com/LoaderB0T/node-terminal-simulator)
