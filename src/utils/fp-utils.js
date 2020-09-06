export const compose = (...fns) => (...args) =>
  fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

export const prop = name => obj => obj[name];

export const safeExec = prop => obj => obj?.[prop]();

export const map = fn => container => container.map(fn);

export class Maybe {
  value;

  constructor(v) {
    this.value = v;
  }

  isNothing() {
    return !this.value;
  }

  isSomething() {
    return !this.isNothing();
  }

  map(fn) {
    return this.isNothing ? this : Maybe.of(fn(this.$value));
  }

  ap(f) {
    return this.isNothing ? this : f.map(this.$value);
  }

  chain(fn) {
    return this.map(fn).join();
  }

  join() {
    return this.isNothing ? this : this.$value;
  }
}
