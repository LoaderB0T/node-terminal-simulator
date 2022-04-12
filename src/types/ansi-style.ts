export type AnsiStyle = [number, number];
export type AnsiStyleCollection = Record<AnsiStyleKind, AnsiStyle>;

export type AnsiStyleMap = {
  x: number;
  y: number;
  styles: AnsiStyleKind[];
}[];

export type AnsiStyleKind =
  | 'reset'
  | 'bold'
  | 'dim'
  | 'italic'
  | 'underline'
  | 'overline'
  | 'inverse'
  | 'hidden'
  | 'strikethrough'
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white'
  | 'blackBright'
  | 'redBright'
  | 'greenBright'
  | 'yellowBright'
  | 'blueBright'
  | 'magentaBright'
  | 'cyanBright'
  | 'whiteBright'
  | 'bgBlack'
  | 'bgRed'
  | 'bgGreen'
  | 'bgYellow'
  | 'bgBlue'
  | 'bgMagenta'
  | 'bgCyan'
  | 'bgWhite'
  | 'bgBlackBright'
  | 'bgRedBright'
  | 'bgGreenBright'
  | 'bgYellowBright'
  | 'bgBlueBright'
  | 'bgMagentaBright'
  | 'bgCyanBright'
  | 'bgWhiteBright';
