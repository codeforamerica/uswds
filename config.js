const package = require(`${process.env.PWD}/package.json`);
const fs = require('fs');
const path = require('path');

module.exports = {
  /**
   * The base URL is used by the static site to find static assets. For local
   * development it is relative while for the production (GitHub Pages) site it
   * it uses prepends the site root URL to all paths.
   *
   * @var {String}
   */
  baseUrl: (process.env.NODE_ENV === 'production') ?
    `${package.homepage}/` : 'http://localhost:8080/',

  /**
   * The following set of path strings define where directories are located for
   * compiling entry points.
   *
   * @var {String}
   */
  base: process.env.PWD,
  src: 'src',
  dist: 'dist',
  packages: 'packages',
  assets: 'assets',
  entry: {
    styles: 'scss/_styles.scss',
    scripts: 'js/index.js'
  },
  output: {
    styles: 'css/styles.css',
    scripts: 'js/default.js'
  },

  /**
   * The following load paths are used by the Dart Sass library to find Sass modules
   *
   * @type {Array}
   */
  loadPaths: [
    'src',
    'packages',
    'node_modules',
    'node_modules/@uswds',
    'node_modules/@uswds/uswds/packages'
  ],

  /**
   * 11ty (Eleventy) static site documentation configuration. Not all
   * settings are relevant to 11ty but to packages used in eleventy.config.js
   */

  /**
   * 11ty (Eleventy) configuration.
   *
   * @source https://www.11ty.dev/docs
   */
  eleventy: {
    dir: {
      input: 'src/views',
      output: 'dist',
      layouts: '_layouts',
      includes: '_partials'
    },
    watchTargets: [
      './packages/**/*.{html.erb,th.html}',
      './src/views/**/*.{twig,md}'
    ],
    serverOptions: {
      watch: './dist/**/*.{css,js,svg,png,jpg,jpeg,gif}'
    }
  },

  /**
   * Settings for the structural rendering of code. These settings are
   * passed to the js-beautify plugin directly.
   *
   * @source https://github.com/beautify-web/js-beautify#options
   */
  beautify: {
    indent_size: 2,
    indent_char: ' ',
    preserve_newlines: false,
    indent_inner_html: false,
    inline: [],
    wrap_line_length: 0
  },

  /**
   * Syntax highlighters used for code. Languages are imported from
   * the Highlight.js library.
   *
   * @source https://highlightjs.org
   */
  hightlightJs: [
    'css',
    'erb',
    'java',
    'javascript',
    'json',
    'markdown',
    'plaintext',
    'ruby',
    'scss',
    'twig',
    'typescript',
    'xml',
  ],

  /**
   * Configuration for the markdownIt library. Used for 11ty markdown config
   * and the {% md %} markdown shortcode.
   *
   * @source https://github.com/markdown-it/markdown-it
   */
  markdownIt: {
    html: true,
    breaks: false,
    linkify: true
  },

  /**
   * Options for the ThymeleafJS library.
   *
   * @source https://github.com/ultraq/thymeleafjs#new-templateengineoptions
   */
  thymeleaf: {
    templateResolver: (templateName) => {
      return fs.readFileSync(path.join(__dirname, `${templateName}.html`));
    }
  },

  /**
   * Common dictionary strings for the documentation
   */
  dictionary: {
    package: 'Packages are collections of functionality that make up a component. Typically, they include stylesheets, templates, and scripts.',
    tokens: 'Tokens define the name of basic system elements such as color, typography, or spacing. The values of tokens are relative to how the system defines them. This enables teams to alter the visual appearance of components yet remain within the system boundaries.',
    modifier: 'A modifier is a class name that applies a variant, type, or extended style customization to modify the component\'s visual appearance.'
  }
};
