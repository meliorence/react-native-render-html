module.exports = {
  git: {
    commitMessage: 'chore: release v${version}'
  },
  npm: {
    publish: true
  },
  github: {
    release: true
  },
  plugins: {
    '@release-it/conventional-changelog': {
      preset: 'angular',
      infile: './CHANGELOG.md'
    }
  }
};
