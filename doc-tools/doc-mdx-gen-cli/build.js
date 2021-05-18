const esbuild = require('esbuild');
const alias = require('esbuild-plugin-alias');

esbuild.build({
  entryPoints: ['src/index.tsx'],
  outfile: 'bin/bundle.js',
  bundle: true,
  platform: 'node',
  minify: false,
  define: {
    __DEV__: false
  },
  plugins: [
    alias({
      'react-native': require.resolve('react-native-web')
    })
  ]
});
