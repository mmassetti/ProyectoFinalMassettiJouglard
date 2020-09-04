export const compose = (...fns) => (...args) =>
  fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

export const prop = name => obj => obj[name];

export const safeExec = prop => obj => obj?.[prop]();
