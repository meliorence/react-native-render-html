global.__DEV__ = true;

global.performance = {
  now() {
    const [seconds, nano] = process.hrtime();
    return seconds * 1000000 + nano / 1000;
  }
};

console.warn = () => {};
