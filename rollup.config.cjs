const commonJs = require('@rollup/plugin-commonjs');
const nodeResolve = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');

module.exports = {
  input: 'js/index.js',
  output: {
    file: 'dist/js/default.js',
    format: 'iife',
    name: 'Default',
    // exports: 'named'
  },
  plugins: [
    replace({
      'preventAssignment': true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    nodeResolve(),
    commonJs()
  ]
};