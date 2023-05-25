let commonJs = require('@rollup/plugin-commonjs');
let nodeResolve = require('@rollup/plugin-node-resolve');

module.exports = {
  input: 'js/index.js',
  output: {
    file: 'dist/js/default.js',
    format: 'iife',
    name: 'Default',
    // exports: 'named'
  },
  plugins: [
    nodeResolve(),
    commonJs()
  ]
};