// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultConf = require('../../.eslintrc.js');
module.exports = {
  ...defaultConf,
  rules: {
    ...defaultConf.rules,
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: {
          order: 'alphabetically'
        }
      }
    ]
  }
};
