const package = require('./package.json');
const config = require('./config');

const fs = require('fs');
const path = require('path');

const eleventyPluginTwig = require('@factorial/eleventy-plugin-twig');
// const twig = require('twig');
const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
const beautify = require('js-beautify').html;
const thymeleaf = require('thymeleaf');

let CONFIG_BEAUTIFY = config.beautify;
let CONFIG_ELEVENTY = config.eleventy;
let CONFIG_MARKDOWN = config.markdown_it;
let CONFIG_THYMELEAF = config.thymeleaf;

let ThymeleafTempate = new thymeleaf.TemplateEngine(CONFIG_THYMELEAF);

/**
 * Utilities
 */

/**
 * Replaces the HTML markup characters in a string with HTML entity counterparts
 *
 * @param   {String}  string  An HTML template string
 *
 * @return  {String}          The escaped template string
 */
const escape = (string) => {
  return string.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;');
};

/**
 * Wraps passed string a code block and performs transformations on the content for display
 *
 * @param   {String}  string  An HTML template string
 *
 * @return  {String}          The transformed template string wrapped in a code block
 */
const block = (string, beautifyStr = true, escapeStr = true) => {
  string = (beautifyStr) ? beautify(string, CONFIG_BEAUTIFY) : string;

  string = (escapeStr) ? escape(string) : string;

  return `<div class="code-block"><pre>${string}</pre></div>`;
};

/**
 * Removes the extra html, head, and body tags from a rendered Thymeleaf template
 *
 * @param   {String}  string  An HTML template string
 *
 * @return  {String}          The template string with tags removed
 */
const unwrap = (string) => {
  return string.replace('<!DOCTYPE html><html th:lang="${#locale.language}"><head></head><body>', '')
    .replace('</body></html>', '');
};

/**
 * Remove new lines groups from the template string if there are more than one
 *
 * @param   {String}  string  An HTML template string
 *
 * @return  {String}          The template string with new lines removed
 */
const unline = (string) => {
  return string.replace(/(\n){2,}/g, '\n');
};

/**
 * Resolves a package file path based on name and type
 *
 * @param   {String}          name  The name of the package to look for.
 * @param   {String}          name  The specific file type to look for. If not
 *                                  provided, the package base is returned.
 *
 * @return  {String/Boolean}        A fully resolved file path. If no file exists, false is returned
 */
const getFile = (name, type = '') => {
  let filename = `packages/cfa-${name}`;

  switch (type) {
    case 'template':
      filename = `${filename}/cfa-${name}.th.html`;
      break

    case 'erb':
      filename = `${filename}/cfa-${name}.erb`;
      break

    case 'thymeleaf':
      filename = `${filename}/cfa-${name}.th.html`;
      break

    case 'stylesheet':
      filename = `${filename}/_cfa-${name}.scss`;

      break;
  }

  let resolved = path.join(__dirname, filename);
  let exists = fs.existsSync(resolved);

  if (false === exists) {
    console.log(`The file for ${name} of type ${type} does not exist: ${filename}`);
  }

  return (exists) ? resolved : exists;
};

/**
 * Eleventy
 */

module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget('./**/*.{css,scss,js,twig,json}');

  /**
   * Plugin configuration
   */

  let markdown = markdownIt(CONFIG_MARKDOWN);

  eleventyConfig.setLibrary('md', markdown);

  eleventyConfig.amendLibrary('md', lib => lib.use(markdownItAttrs));

  eleventyConfig.addPlugin(eleventyPluginTwig, {
    dir: CONFIG_ELEVENTY.dir
  });

  /**
   * Shortcodes
   */

  /**
   * Fully renders a package's Thymeleaf template with context passed as the
   * second argument and shortcode body. It returns the Thymeleaf template
   * string escaped and wrapped in a code block if the 3rd argument, escape,
   * is true.
   *
   * @param   {Array}  args  Accepts 1: Name as String, 2: Context as JSON
   *                         String, 3: 0: Content body as mixed markdown
   *
   * @return  {String}       Rendered template or code block source preview
   */
  eleventyConfig.addPairedShortcode('package', async function(...args) {
    let name = args[1];

    let context = (args[2]) ? JSON.parse(args[2]) : false;

    if (args[0]) {
      context.body = markdown.render(args[0]);
    }

    let template = unline(fs.readFileSync(getFile(name, 'thymeleaf'), 'utf-8'));

    let rendered = unwrap(await ThymeleafTempate.process(template, context));

    // Attempt at a test for fragment replacement
    // console.dir(await ThymeleafTempate.process(`<!DOCTYPE html>
    //   <html th:lang="\$\{#locale.language\}" xmlns:th="http://www.thymeleaf.org">
    //     <body>
    //       <div th:replace="::packages/cfa-${name}/cfa-${name}.th.html" th:with="${Object.keys(context).map(c => `${c}=\$\{${context[c]}\}`).join(',')}"></div>
    //     </body>
    // </html>`, {}));

    if (args[3]) {
      return block(rendered);
    } else {
      return beautify(rendered, CONFIG_BEAUTIFY);
    }
  });

  /**
   * Retrieves a package's Thymeleaf template source and wraps it in a code block
   *
   * @param   {String}  name  Name of the package
   *
   * @return  {String}        The template source escaped and wrapped in a code block
   */
  eleventyConfig.addShortcode('thymeleaf', async function(name) {
    let template = unline(fs.readFileSync(getFile(name, 'template'), 'utf-8'));

    return block(template, false);
  });

  /**
   * Retrieves a package's ERB template source and wraps it in a code block
   *
   * @param   {String}  name  Name of the package
   *
   * @return  {String}        The template source escaped and wrapped in a code block
   */
  eleventyConfig.addShortcode('erb', async function(name) {
    let template = unline(fs.readFileSync(getFile(name, 'erb'), 'utf-8'));

    return block(template, false);
  });

  /**
   * Gets a resolved file path by name and file type then adds the package name
   * for display
   *
   * @param   {String}  name  Name of the package
   * @param   {String}  type  Type of file to retrieve
   *
   * @return  {String}        The template source escaped and wrapped in a code block
   */
  eleventyConfig.addShortcode('getFile', async function(name, type = '') {
    let resolved = getFile(name, type);

    return (resolved) ? resolved.replace(__dirname, package.name) : resolved;
  });

  /**
   * Data
   */

  eleventyConfig.addGlobalData('package', package);

  eleventyConfig.addGlobalData('dictionary', config.dictionary);

  eleventyConfig.addGlobalData('config', config);

  return CONFIG_ELEVENTY;
};
