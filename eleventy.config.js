
const package = require('./package.json');
const eleventyPluginTwig = require('@factorial/eleventy-plugin-twig');

module.exports = function(config) {
  config.addGlobalData('package', package);

  config.addPlugin(eleventyPluginTwig, {
    dir: {
      layouts: 'views/_includes/',
      input: 'views',
      output: 'dist'
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
