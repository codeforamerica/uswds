const package = require(`${process.env.PWD}/package.json`);
const config = require(`${process.env.PWD}/config`);

const rollup = require('rollup');
const commonJs = require('@rollup/plugin-commonjs');        // Adds support for legacy CommonJS modules
const nodeResolve = require('@rollup/plugin-node-resolve'); // Uses the Node resolution algorithm for import declarations
const replace = require('@rollup/plugin-replace');          // Replaces strings, such as Node variables

const path = require('path');

/**
 * Plugin configuration
 */

let plugins = [
  replace({
    'preventAssignment': true,
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  nodeResolve({
    browser: true,
    moduleDirectories: [
      'node_modules'
    ]
  }),
  commonJs()
];

/**
 * Module declaration and configuration
 */

let modules = [
  {
    input: path.join(config.base, config.src, config.entry.scripts),
    output: [{
      file:  path.join(config.base, config.dist, config.assets, config.output.scripts),
      format: 'iife',
      name: 'Default',
      sourcemap: (process.env.NODE_ENV === 'production') ? false : 'inline',
      strict: true
    }],
    plugins: plugins
  }
];

/**
 * Executing function
 */

(async () => {
  try {
    for (let i = 0; i < modules.length; i++) {
      const script = modules[i];

      console.log(`[${package.name}] Rolling up "${script.input.replace(process.env.PWD, '')}"`);

      const bundle = await rollup.rollup(script);

      for (let i = 0; i < script.output.length; i++) {
        await bundle.write(script.output[i]);
      }

      bundle.close();

      console.log(`[${package.name}] Rolled out to "${script.output[i].file.replace(process.env.PWD, '')}"`);
    }
  } catch (err) {
    console.dir(err);
  }
})();