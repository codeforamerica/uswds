const package = require('./package.json');
const eleventyPluginTwig = require('@factorial/eleventy-plugin-twig');
const twig = require('twig');
const fs = require('fs');
const beautify = require('js-beautify').html;

module.exports = function(config) {
  config.addGlobalData('package', package);

  config.addPlugin(eleventyPluginTwig, {
    dir: {
      layouts: 'views/_includes/',
      input: 'views',
      output: 'dist'
    },
    twig: {
      shortcodes: [
        {
          symbol: 'beautify',
          callback: (eleventyConfig, userOptions, inputPath, data) => {
            twig.cache(false);

            const template = twig.twig({
              data: data,
              data: fs.readFileSync(inputPath, 'utf-8'),
              path: inputPath
            });

            // console.dir(template);

            rendered = template.render(data);

            return beautify(`${rendered}<!-- template source: ${inputPath} -->`, {
              indent_size: 2,
              indent_char: ' ',
              preserve_newlines: false,
              indent_inner_html: false,
              inline: [],
              wrap_line_length: 0,
              indent_inner_html: false
            });
          }
        }
      ]
    }
  });

  return {
    dynamicPartials: true,
    dir: {
      input: 'views',
      output: 'dist'
    }
  }
};
