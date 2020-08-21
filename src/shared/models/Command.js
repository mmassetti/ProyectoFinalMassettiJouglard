export class AsyncCommand {
  fn;
  constructor(fn) {
    this.fn = fn;
  }

  execute() {
    return this.fn();
  }
}
