const package = require(`${process.env.PWD}/package.json`);
const entrypoints = require(`${process.env.PWD}/entrypoints`);

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

let plugins = {
  // TODO: Regex for hljs styles are not working
  // purgecss: purgecss({
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
  autoprefixer: autoprefixer('last 4 version'),
  mqpacker: mqpacker({
    sort: true
  }),
  cssnano: cssnano({
    preset: [
      'default', {
        // TODO: The current calc preset is not up-to-date with postcss-calc so
        //       this needs to be disabled for now https://github.com/postcss/postcss-simple-vars/issues/94
        calc: false
      }
    ]
  })
};

/**
 * Executing function
 */

(async () => {
  try {
    for (let i = 0; i < entrypoints.length; i++) {
      const style = entrypoints[i];

      if (!style.hasOwnProperty('input') || path.extname(style.input) != '.scss') continue;

      console.log(`[${package.name}] Compiling Sass for "${style.input.replace(process.env.PWD, '')}"`);

      for (let i = 0; i < style.output.length; i++) {
        let output = style.output[i];

        let result = await sass.compileAsync(style.input, output.options);

        let css = result.css;

        if (result.hasOwnProperty('sourceMap')) {
          console.log(`[${package.name}] Generating sourcemaps`);

          let sourceMap = JSON.stringify(result.sourceMap);
          let sourceMapBase64 = (Buffer.from(sourceMap, 'utf8') || '').toString('base64');
          let sourceMapComment = '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,' + sourceMapBase64 + ' */';

          css = `${css}\n\n${sourceMapComment}`;
        }

        fs.writeFileSync(output.file, css);

        console.log(`[${package.name}] Sass compiled. Running output through PostCSS`);

        // Set plugins if they are string keys for pre-configured plugins
        style.plugins = style.plugins
          .map(p => typeof p === 'string' ? plugins[p] : p);

        let optim = await postcss(style.plugins)
          .process(css, {
            from: output.file
          });

        fs.writeFileSync(output.file, optim.css);

        console.log(`[${package.name}] Styles written to "${output.file.replace(process.env.PWD, '')}"`);
      }
    }
  } catch (err) {
    console.dir(err);
  }
})();
