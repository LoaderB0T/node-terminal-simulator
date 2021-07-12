export interface Stdout {
  write: (str: string) => boolean;
  getWindowSize(): [number, number];
}
