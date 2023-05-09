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
const execSync = require('child_process').execSync;

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
const escape = (str) => {
  return (typeof str === 'string') ?
    str.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/'/g, '&#39;')
      .replace(/"/g, '&quot;') : str;
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
      filename = `${filename}/cfa-${name}.html.erb`;
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
    console.log(`[${package.name}] The file for "${name}" of type "${type}" does not exist: ${filename}`);
  }

  return (exists) ? resolved : exists;
};

/**
 * Ruby ERB experiment
 *
 * @param   {[type]}  name     [name description]
 * @param   {[type]}  context  [context description]
 *
 * @return  {[type]}           [return description]
 */
const erbInclude = async (name, context) => {
  let rubyPath = getFile(name, 'erb');

  let vars = Object.keys(context).map(c => {
    return `${c}=${(typeof context[c] === 'string') ?
      `"${context[c].replace(/"/g, '\\"')}"` : context[c]}`.replace(/\n/g, '')
  }).join('; ');

  let command = `(echo '<% ${vars} %>' && cat ${rubyPath}) | erb`;

  try {
    const stdout = execSync(command);

    console.log(`[${package.name}] ERB "${name}" render passing`);

    return stdout.toString();
  } catch (err) {
    console.log(`[${package.name}] ERB "${name}" render failing; ${command}`);
  }
};

/**
 * Retrieve a package Thymeleaf template fragment, pass context to it, render, and return
 *
 * @param   {String}  name     The name of the template
 * @param   {String}  context  The context to pass to the template
 *
 * @return  {String}           The rendered template
 */
const fragmentInclude = async (name, context) => {
  let templatePath = getFile(name, 'thymeleaf')
    .replace(__dirname + '/', '').replace('.html', '');

  let params = Object.keys(context).map(c => `'${escape(context[c])}'`.replace(/\n/g, '') ).join(', ');

  let include = `<th:block th:replace="~{${templatePath} :: ${name}(${params})}" />`;

  try {
    let rendered = await ThymeleafTempate.process(include, {});

    console.log(`[${package.name}] Thymeleaf "${name}" fragment inclusion passing`);

    return rendered;
  } catch (err) {
    console.log(`[${package.name}] Thymeleaf "${name}" fragment inclusion failing; \n ${include}`);
  }
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
   * @param   {Array}  args  Accepts 0: Context body, 1: name as String,
   *                         2: context as JSON String, 3: wether to return
   *                         rendered HTML or pre-rendered HTML in a code block
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

    if (args[3]) {
      return block(rendered);
    } else {
      // Test fragment include method and ERB template
      let fragment = await fragmentInclude(name, context);
      // console.dir(fragment);

      let erb = await erbInclude(name, context);
      // console.dir(erb);

      return beautify(rendered + erb, CONFIG_BEAUTIFY);
    }
  });

  /**
   * Retrieves a package's Thymeleaf template source and wraps it in a code block
   *
   * @param   {String}  name  Name of the package
   *
   * @return  {String}        The template source escaped and wrapped in a code block
   */
  eleventyConfig.addShortcode('thymeleaf', async function(name, include = false) {
    let templatePath = getFile(name, 'thymeleaf')
      .replace(__dirname, package.name)
      .replace('.html', '');

    let template = unline(fs.readFileSync(getFile(name, 'template'), 'utf-8'));

    if (include) {
      let params = [...new Set(template.match(/\$\{[A-z$_.-][\w$]{0,}}/g))];

      return block(`<th:block th:replace="~{${templatePath} :: ${name}(${
          params.map(c => `${c.replace('${', '').replace('}', '')}`).join(',')
        })}" />`, true);
    }

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
   * Creates a random string ID
   *
   * @return  {String}  Random string ID
   */
  eleventyConfig.addShortcode('createId', async function() {
    return Math.random().toString(16).substring(2);
  });

  /**
   * Create a filename friendly string from supplied string
   *
   * @return  {String}  Returns filename friendly string
   */
  eleventyConfig.addShortcode('createSlug', async function(s) {
    return s.toLowerCase().replace(/[^0-9a-zA-Z - _]+/g, '')
    .replace(/\s+/g, '-').replace(/-+/g, '-')
  });


  /**
   * Data
   */

  eleventyConfig.addGlobalData('package', package);

  eleventyConfig.addGlobalData('dictionary', config.dictionary);

  eleventyConfig.addGlobalData('config', config);

  return CONFIG_ELEVENTY;
};
