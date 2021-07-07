export class AnsiAction {
  private readonly _match: string;
  private readonly _action: (params: (string | undefined)[]) => void;
  public rest: string = '';

  constructor(match: string, action: (params: (string | undefined)[]) => void) {
    this._match = match;
    this._action = action;
  }

  public tryRunAction(str: string) {
    const rgx = new RegExp(`^${this._match}(.*)`);
    const matches = rgx.test(str);
    if (!matches) {
      return false;
    }

    const m = str.match(rgx)!;
    m.shift();

    const rest = m.pop()!;
    const allParams = m.map(x => (x === '' ? undefined : x));

    this._action(allParams);

    this.rest = rest;

    return true;
  }
}
