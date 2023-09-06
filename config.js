const package = require('./package.json');
const thymeleaf = require('thymeleaf');

const fs = require('fs');
const path = require('path');

module.exports = {
  'baseUrl': (process.env.NODE_ENV === 'production') ? `${package.homepage}/` : '/',
  'beautify': {
    'indent_size': 2,
    'indent_char': ' ',
    'preserve_newlines': false,
    'indent_inner_html': false,
    'inline': [],
    'wrap_line_length': 0
  },
  'eleventy': {
    'dir': {
      'input': 'views',
      'output': 'dist',
      'layouts': '_layouts',
      'includes': '_partials'
    }
  },
  'markdown_it': {
    'html': true,
    'breaks': false,
    'linkify': true
  },
  'thymeleaf': {
    ...thymeleaf.STANDARD_CONFIGURATION,
    templateResolver: (templateName) => {
      return fs.readFileSync(path.join(__dirname, `${templateName}.html`));
    }
  },
  'dictionary': {
    'package': 'Packages are collections of functionality that make up a component. Typically, they include stylesheets, templates, and scripts.',
    'tokens': 'Tokens define the name of basic system elements such as color, typography, or spacing. The values of tokens are relative to how the system defines them. This enables teams to alter the visual appearance of components yet remain within the system boundaries.',
    'modifier': 'A modifier is a class name that applies a variant, type, or extended style customization to modify the component\'s visual appearance.'
  }
};
