const package = require('./package.json');

const sass = require('sass');

const postcss = require('postcss');
const purgecss = require('@fullhuman/postcss-purgecss') // Removes unused CSS from output
const autoprefixer = require('autoprefixer');           // Adds vendor spec prefixes
const mqpacker = require('@hail2u/css-mqpacker');       // Packs media queries together
const cssnano = require('cssnano');                     // CSS optimization

const path = require('path');
const fs = require('fs');

/**
 * Plugin configuration
 */

let plugins = [
  // purgecss({
  //   content: [
  //     path.join(__dirname, 'dist/**/*.html'),
  //     path.join(__dirname, 'eleventy.config.js')
  //   ],
  //   fontFace: true,
  //   keyframes: true,
  //   // variables: true,
  //   safelist: {
  //     // standard: [
  //     //   /hljs[\S]*?(?=")/g
  //     // ],
  //     deep: [
  //       /hljs-[-_:\w]*/g,
  //       // USWDS Navigation/Header
  //       /usa-js-mobile-nav--active/,
  //       /is-visible/
  //     ]
  //     // greedy: []
  //   },
  //   defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
  // }),
  autoprefixer('last 4 version'),
  mqpacker({
    sort: true
  }),
  cssnano({
    preset: [
      'default', {
        calc: false // The current calc preset is not up-to-date with postcss-calc so this needs to be disabled for now https://github.com/postcss/postcss-simple-vars/issues/94
      }
    ]
  })
];

/**
 * Module declaration and configuration
 */

let modules = [
  {
    file: path.join(__dirname, 'scss/theme/styles.scss'),
    outDir: path.join(__dirname, 'dist/uswds/css/'),
    outFile: 'styles.css',
    options: {
      // sourceMap: (process.env.NODE_ENV === 'production') ? false : true, // needs to be enabled if creating a sourcemap handler below
      sourceMap: false,
      loadPaths: [
        path.join(__dirname, '/scss/'),
        path.join(__dirname, '/packages/'),
        path.join(__dirname, '/node_modules/'),
        path.join(__dirname, '/node_modules/@uswds'),
        path.join(__dirname, '/node_modules/@uswds/uswds/packages')
      ]
    }
  }
];

/**
 * Executing function
 */

(async () => {
  try {
    for (let i = 0; i < modules.length; i++) {
      const style = modules[i];

      console.log(`[${package.name}] Compiling Sass for "${style.file}"`);

      let result = await sass.compileAsync(style.file, style.options);

      // TODO: Create sourcemap handler from Sass to PostCSS?
      // if (process.env.NODE_ENV != 'production') {
      //   console.dir(result.sourceMap);
      // }

      console.log(`[${package.name}] Compiled. Running output through PostCSS`);

      let optim = await postcss(plugins)
        .process(result.css, {
          from: undefined
        });

      fs.writeFileSync(`${style.outDir}${style.outFile}`, optim.css);

      console.log(`[${package.name}] Styles complete`);
    }
  } catch (err) {
    console.dir(err);
  }
})();
