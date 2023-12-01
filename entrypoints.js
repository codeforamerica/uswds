const config = require(`${process.env.PWD}/config`);
const path = require('path');

module.exports = [
  /**
   * JavaScript modules
   *
   * These objects follow the conventions for Rollup.js module configuration.
   *
   * @reference https://rollupjs.org/configuration-options
   */
  {
    input: path.join(config.base, config.src, config.entry.scripts),
    output: [{
      file:  path.join(config.base, config.dist, config.assets, config.output.scripts),
      format: 'iife',
      name: 'Default',
      sourcemap: (process.env.NODE_ENV === 'production') ? false : 'inline',
      strict: true
    }],

    /**
     * Rollup.js plugins
     *
     * Use a string for pre-configured plugins. Add a plugin object configuration
     * to use a custom setting instead.
     *
     * @reference https://github.com/rollup/awesome
     */
    plugins: [
      'replace',
      'nodeResolve',
      'commonJs'
    ]
  },

  /**
   * Sass/PostCSS modules
   *
   * These modules will be compiled from Sass then passed to PostCSS for optimization
   * (using the plugins key).
   */
  {
    input:  path.join(config.base, config.src, 'scss/_site.scss'),
    output: [{
      file:  path.join(config.base, config.dist, config.assets, 'site/site.css'),

      /**
       * Dart Sass compileAsync options
       *
       * @reference https://sass-lang.com/documentation/js-api/interfaces/options
       */
      options: {
        sourceMap: (process.env.NODE_ENV === 'production') ? false : true,
        loadPaths: config.loadPaths
          .map(i => path.join(config.base, i))
      }
    }],

    /**
     * PostCSS plugins
     *
     * Use a string for pre-configured plugins. Add a plugin object configuration
     * to use your own settings or custom plugin.
     *
     * @reference https://postcss.org/docs/postcss-plugins
     */
    plugins: [
      // 'purgecss',
      'autoprefixer',
      'mqpacker',
      'cssnano'
    ]
  },
  (process.env.NODE_ENV === 'production') ? {
    input:  path.join(config.base, config.src, config.entry.styles),
    output: [{
      file:  path.join(config.base, config.dist, config.assets, config.output.styles),
      options: {
        sourceMap: (process.env.NODE_ENV === 'production') ? false : true,
        loadPaths: config.loadPaths
          .map(i => path.join(config.base, i))
      }
    }],
    plugins: [
      'autoprefixer',
      'mqpacker',
      'cssnano'
    ]
  } : {}
];
