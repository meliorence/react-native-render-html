//@ts-expect-error __DEV__ does not exists at top-level
global.__DEV__ = true;

//@ts-expect-error performance does not exists at top-level
global.performance = {
  now() {
    const [seconds, nano] = process.hrtime();
    return seconds * 1000000 + nano / 1000;
  }
};

console.warn = () => {};
