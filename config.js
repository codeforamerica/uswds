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
    'tokens': 'Design tokens are passed to the settings configuration to modify the visual appearance of the component',
    'styles': 'A custom stylesheet is used to modify the component\'s visual appearance',
    'modifier': 'The class name that applies extended style customization to modify the component\'s visual appearance'
  }
};
