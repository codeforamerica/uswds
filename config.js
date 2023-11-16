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
  baseUrl: (process.env.NODE_ENV === 'production') ? `${package.homepage}/` : '/',

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
  beautify: {
    indent_size: 2,
    indent_char: ' ',
    preserve_newlines: false,
    indent_inner_html: false,
    inline: [],
    wrap_line_length: 0
  },
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
  eleventy: {
    dir: {
      input: 'src/views',
      output: 'dist',
      layouts: '_layouts',
      includes: '_partials'
    }
  },
  markdownIt: {
    html: true,
    breaks: false,
    linkify: true
  },
  thymeleaf: {
    templateResolver: (templateName) => {
      return fs.readFileSync(path.join(__dirname, `${templateName}.html`));
    }
  },
  dictionary: {
    package: 'Packages are collections of functionality that make up a component. Typically, they include stylesheets, templates, and scripts.',
    tokens: 'Tokens define the name of basic system elements such as color, typography, or spacing. The values of tokens are relative to how the system defines them. This enables teams to alter the visual appearance of components yet remain within the system boundaries.',
    modifier: 'A modifier is a class name that applies a variant, type, or extended style customization to modify the component\'s visual appearance.'
  }
};
