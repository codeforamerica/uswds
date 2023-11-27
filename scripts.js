const package = require(`${process.env.PWD}/package.json`);
const entrypoints = require(`${process.env.PWD}/entrypoints`);

const rollup = require('rollup');
const commonJs = require('@rollup/plugin-commonjs');        // Adds support for legacy CommonJS modules
const nodeResolve = require('@rollup/plugin-node-resolve'); // Uses the Node resolution algorithm for import declarations
const replace = require('@rollup/plugin-replace');          // Replaces strings, such as Node variables

const path = require('path');

/**
 * Plugin configuration
 */

let plugins = {
  replace: replace({
    'preventAssignment': true,
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  nodeResolve: nodeResolve({
    browser: true,
    moduleDirectories: [
      'node_modules'
    ]
  }),
  commonJs: commonJs()
};

/**
 * Executing function
 */

(async () => {
  try {
    for (let i = 0; i < entrypoints.length; i++) {
      const script = entrypoints[i];

      if (!script.hasOwnProperty('input') || path.extname(entrypoints[i].input) != '.js') continue;

      console.log(`[${package.name}] Rolling up "${script.input.replace(process.env.PWD, '')}"`);

      script.plugins = script.plugins
        .map(p => typeof p === 'string' ? plugins[p] : p);

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
