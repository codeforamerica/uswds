const package = require(`${process.env.PWD}/package.json`);
const config = require(`${process.env.PWD}/config`);

const fs = require('fs');
const path = require('path');

const eleventyPluginTwig = require('@factorial/eleventy-plugin-twig');
// const twig = require('twig');
const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
const beautify = require('js-beautify').html;
const thymeleaf = require('thymeleaf');
const hljs = require('highlight.js/lib/core');
const execSync = require('child_process').execSync;

for (let i = 0; i < config.hightlightJs.length; i++) {
  let lang = config.hightlightJs[i];

  hljs.registerLanguage(lang, require(`highlight.js/lib/languages/${lang}`));
}

let CONFIG_BEAUTIFY = config.beautify;
let CONFIG_ELEVENTY = config.eleventy;
let CONFIG_MARKDOWN = config.markdownIt;

let CONFIG_THYMELEAF = {
  ...thymeleaf.STANDARD_CONFIGURATION,
  ...config.thymeleaf
};

let markdown = markdownIt(CONFIG_MARKDOWN);

let ThymeleafTempate = new thymeleaf.TemplateEngine(CONFIG_THYMELEAF);

/**
 * Utilities
 */

/**
 * Replaces the HTML markup characters in a string with HTML entity counterparts
 *
 * @param   {String}  str  An HTML template string
 *
 * @return  {String}       The escaped template string
 */
const escapeHtml = (str) => {
  return (typeof str === 'string') ?
    str//.replace(/&amp;#039;/g, '\'')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // .replace(/'/g, '&#39;')
      .replace(/"/g, '&quot;') : str;
};

// /**
//  * Replaces the HTML markup characters in a string with HTML entity counterparts
//  *
//  * @param   {String}  str  An HTML template string
//  *
//  * @return  {String}       The escaped template string
//  */
// const escapeHtmlForFragment = (str) => {
//   return (typeof str === 'string') ?
//     str.replace(/&/g, '&amp;')
//       .replace(/</g, '&lt;')
//       .replace(/>/g, '&gt;')
//       // .replace(/'/g, '&\\#39;')
//       .replace(/"/g, '&quot;') : str;
// };

// /**
//  * Processes the params passed as arguments to Thymeleaf templates
//  *
//  * @param   {Mixed}  param  The parameter to sanitize
//  *
//  * @return  {Mixed}         The sanitized parameter
//  */
// const sanitizeForTh = (param) => {
//   switch(typeof param) {
//     case 'string':
//       param = `'${escapeHtmlForFragment(param)}'`;

//       break;

//     case 'object':
//       param = '${' + JSON.stringify(param)
//         .replace(/\[/g, '{')
//         .replace(/\]/g, '}')
//         .replace(/"/g, '\'') + '}';

//       break;
//   }

//   return param;
// }

/**
 * Processes the params passed as arguments to Embedded Ruby templates
 *
 * @param   {Mixed}  param  The parameter
 *
 * @return  {Mixed}         The sanitized parameter
 */
const sanitizeForErb = (param) => {
  switch(typeof param) {
    case 'string':
      param = `"${param
        .replace(/"/g, '\\"')
        // .replace(/'/g, '&#39;')
        .replace(/'/g, '\'"\'"\'')
      }"`;

      break;

    case 'object':
      param = JSON.stringify(param)
        .replace(/":/g, '"=>')
        // .replace(/'/g, '&#39;');
        .replace(/'/g, '\'"\'"\'');

      break;
  }

  return param;
}

// const sanitizeForErbNew = (param) => {
//   switch(typeof param) {
//     case 'string':
//       param = `"${param
//         .replace(/"/g, '\\"')
//         // .replace(/'/g, '&#39;')
//         .replace(/'/g, '\'"\'"\'')
//       }"`;

//       break;

//     case 'object':
//       param = JSON.stringify(param)
//         // .replace(/":/g, '"=>')
//         // .replace(/'/g, '&#39;');
//         .replace(/'/g, '\'"\'"\'');

//       break;
//   }

//   return param;
// }

/**
 * Adds syntax highlighting blocks to a string containing HTML.
 *
 * @param   {String}  str   String containing HTML.
 * @param   {String}  lang  The Highlight.js language syntax code.
 *
 * @return  {String}        HTML wrapped in Highlight.js HTML blocks.
 */
const highlight = (str, lang) => {
  return hljs.highlight(str, {language: lang}).value;
};

/**
 * Wraps passed string a code block and performs transformations on the content for display
 *
 * @param   {String}   str          An HTML template string
 * @param   {String}   lang         The language of the code block
 * @param   {Boolean}  beautifyStr  Wether to beautify the code block string or not
 * @param   {Boolean}  escapeStr    Wether to escape the output string or not
 *
 * @return  {String}          The transformed template string wrapped in a code block
 */
const block = (str, lang = 'html', beautifyStr = true, escapeStr = true) => {
  let id = `block-${createId()}`;

  str = (beautifyStr) ? beautify(str, CONFIG_BEAUTIFY) : str;

  let highlighted = highlight(str, lang);

  let escaped = (escapeStr) ? escapeHtml(str) : str;

  return `<div class="code-block">
      <div class="code-block__utility position-sticky pin-top">
        <button data-js="copy" data-copy="${id}" class="usa-button cfa-button">
          <svg class="usa-icon" aria-hidden="true" focusable="false" role="img">
            <use data-copy="icon" href="${config.baseUrl}assets/img/sprite.svg#content_copy"></use>
          </svg>
          <span>Copy<span class="usa-sr-only"> the following block to clipboard</span></span>
        </button>
        <span data-copy="message" aria-live="assertive" class="usa-sr-only"></span>
        <textarea hidden data-copy-target="${id}">${escaped}</textarea>
      </div>
      <pre class="language-${lang} padding-top-0">${highlighted}</pre>
    </div>`;
};

/**
 * Removes the extra html, head, and body tags from a rendered Thymeleaf template
 *
 * @param   {String}  str  An HTML template string
 *
 * @return  {String}       The template string with tags removed
 */
const removeExtraHtml = (str) => {
  return (typeof str === 'string') ? str
    .replace('<!DOCTYPE html><html th:lang="${#locale.language}"><head></head><body>', '')
    .replace('<html><head></head><body>', '')
    .replace('</body></html>', '') : str;
};

/**
 * Remove all empty HTML attributes from a string. TODO, update regex to only
 * remove between carets. This is a stop gap solution for emulating null values
 * passed to `th:attr` attributes in real Thymeleaf instances.
 *
 * @param   {String}  str  The string to search and replace
 *
 * @return  {String}       The string with HTML attributes removed
 */
const removeEmptyAttr = (str) => {
  return str.replace(/( [A-Za-z-]*)=""/g, '');
}

/**
 * Replace escaped single quote Thymeleaf output in HTML attributes with a single quote.
 *
 * @param   {String}  str  The string to search and replace
 *
 * @return  {String}       The string with single quotes added
 */
const replaceSingleQuoteEscape = (str) => {
  return str.replace(/&amp;#039;/g, '\''); // Fix strange single quote output
}

/**
 * Remove new lines groups from the template string if there are more than one.
 *
 * @param   {String}  str  An HTML template string
 *
 * @return  {String}       The template string with new lines removed
 */
const removeNewLines = (str) => {
  return str.replace(/(\n){2,}/g, '\n');
};

/**
 * Resolves a package file path based on name and type
 *
 * @param   {String}          name  The name of the package to look for.
 * @param   {String}          type  The specific file type to look for. If not
 *                                  provided, the package base is returned.
 *
 * @return  {String/Boolean}        A fully resolved file path. If no file exists, false is returned
 */
const getFile = (name, type = '') => {
  let filename = `${config.packages}/cfa-${name}`;

  switch (type) {
    case 'template':
      filename = `${filename}/cfa-${name}.th.html`;
      break

    case 'erb':
      filename = `${filename}/_cfa-${name}.html.erb`;
      break

    case 'thymeleaf':
      filename = `${filename}/cfa-${name}.th.html`;
      break

    case 'stylesheet':
      filename = `${filename}/_cfa-${name}.scss`;

      break;

    case 'javascript':
      filename = `${filename}/cfa-${name}.js`;

      break;
  }

  let resolved = path.join(config.base, filename);
  let exists = fs.existsSync(resolved);

  if (false === exists) {
    console.log(`[${package.name}] The file for "${name}" of type "${type}" does not exist: ${filename}`);
  }

  return (exists) ? resolved : exists;
};

/**
 * Render markdown content to assign as a string in a context object
 *
 * @param   {String}  mrkdwn  The markdown string to render
 *
 * @return  {String}          Fully rendered markdown with quotes escaped and new lines removed
 */
const markdownRender = async(mrkdwn) => {
  return markdown.render(mrkdwn)
    .replace(/"/g, '\\"')
    .replace(/\n/g, '');
};

/**
 * Render Ruby ERB template using a child process command execution
 *
 * @param   {String}   name     The name of the package to retrieve
 * @param   {Object}   context  JSON object with context to pass to the template
 * @param   {Boolean}  log      Wether to log status of the render
 *
 * @return  {String}           A rendered HTML string
 */
const erbRender = async (name, context, log = false) => {
  let rubyPath = getFile(name, 'erb');

  let vars = Object.keys(context).map(c => {
    return `${c}=${sanitizeForErb(context[c])}`.replace(/\n/g, '')//.replace(/'/g, '\'');
  }).join('; ');

  // let hash = Object.keys(context).map(c => {
  //   return `${c}: ${sanitizeForErbNew(context[c])}`.replace(/\n/g, '')//.replace(/'/g, '\'');
  // }).join(', ');

  // let erb = `puts ERB.new(File.read('${rubyPath}'), 0, 0, '@html').result_with_hash({${hash}})`;
  // let commandNew = `ruby -rerb -e "${erb}"`;

  let command = `(echo '<% ${vars} %>' && cat ${rubyPath}) | erb`;

  try {
    const stdout = execSync(command);

    // console.dir(execSync(commandNew));

    if (log) console.log(`[${package.name}] ERB "${name}" render passing`);

    return stdout.toString();
  } catch (err) {
    console.log(`[${package.name}] ERB "${name}" render failing; ${command}`);
  }
};

/**
 * Retrieve a package Thymeleaf template fragment, pass context to it, render,
 * and return the rendered string
 *
 * @param   {String}   name     The name of the template
 * @param   {String}   context  The context to pass to the template
 * @param   {Boolean}  log      Wether to log status of the render
 *
 * @return  {String}           The rendered template
 */
const fragmentInclude = async (name, context, log = false) => {
  // let thReplace = getFile(name, 'thymeleaf')
  //   .replace(__dirname + '/', '').replace('.html', '');

  // console.dir(thReplace);

  // Fragment include method
  // let templatePath = getFile(name, 'thymeleaf')
  //   .replace(__dirname + '/', '').replace('.html', '');

  // let params = Object.keys(context).map(c => `${sanitizeForTh(context[c])}`.replace(/\n/g, '') ).join(', ');

  // let include = `<th:block th:replace="~{${templatePath} :: ${name}(${params})}" />`;

  // try {
  //   let rendered = await ThymeleafTempate.process(include, {});

  //   if (log) console.log(`[${package.name}] Thymeleaf "${name}" fragment inclusion passing`);

  //   return rendered;
  // } catch (err) {
  //   console.log(`[${package.name}] Thymeleaf "${name}" fragment inclusion failing; \n ${include}`);
  // }

  // Direct render method
  let templatePath = getFile(name, 'thymeleaf');

  let template = fs.readFileSync(templatePath, 'utf-8');

  try {
    let rendered = await ThymeleafTempate.process(template, context);

    if (log) console.log(`[${package.name}] Thymeleaf "${name}" fragment render passing`);

    return rendered;
  } catch (err) {
    console.log(`[${package.name}] Thymeleaf "${name}" fragment render failing;
      \n ThymeleafTempate.process(${template}, ${context});`);
  }
};

/**
 * Creates a random string ID
 *
 * @return  {String}  Random string ID
 */
const createId = function() {
  return Math.random().toString(16).substring(2);
};

/**
 * Create a filename friendly string from supplied string
 *
 * @param   {String}  str  The string to transform into a slug
 *
 * @return  {String}       Returns filename friendly string
 */
const createSlug = function(str) {
  return str.toLowerCase().replace(/[^0-9a-zA-Z - _]+/g, '')
    .replace(/\s+/g, '-').replace(/-+/g, '-');
};

/**
 * Create a method name friendly string from supplied string
 *
 * @param   {String}  str  The string to transform into a slug
 *
 * @return  {String}       Returns method name friendly string
 */
const createCamelCase = function(str) {
  return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
};

/**
 * Eleventy
 */

module.exports = function(eleventyConfig) {
  /**
   * Set up watch targets and development server options from config
   */

  for (let w = 0; w < CONFIG_ELEVENTY.watchTargets.length; w++) {
    eleventyConfig.addWatchTarget(CONFIG_ELEVENTY.watchTargets[w]);
  }

  eleventyConfig.setServerOptions(CONFIG_ELEVENTY.serverOptions);

  /**
   * Plugin configuration
   */

  eleventyConfig.setLibrary('md', markdown);

  eleventyConfig.amendLibrary('md', lib => lib.use(markdownItAttrs));

  eleventyConfig.addPlugin(eleventyPluginTwig, {
    dir: CONFIG_ELEVENTY.dir,
    twig: {
      shortcodes: [
        {
          symbol: 'createId',
          callback: () => {
            return createId();
          }
        },
        {
          symbol: 'createSlug',
          callback: (eleventyConfig, userOptions, s) => {
            return createSlug(s);
          }
        }
      ]
    }
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
   * @param   {Array}  args  0: String, package name
   *                         1: String, context as JSON String
   *                         2: Boolean. Wether to return rendered HTML (false)
   *                            or pre-rendered HTML in a code block (true)
   *                         3: Boolean. Wether to the default template only (false)
   *                            or all component templates (true)
   *
   * @return  {String}       Rendered template or code block source preview
   */
  eleventyConfig.addShortcode('component', async function(...args) {
    let idAttrs = ['id', 'for', 'aria-describedby', 'aria-labelledby', 'aria-controls'];
    let name = args[0];
    let context = (args[1]) ? JSON.parse(args[1]) : false;
    let pre = (args[2]) ? args[2] : false;
    let all = (args[3]) ? args[3] : false;

    let rendered = '';

    let th = removeExtraHtml(await fragmentInclude(name, context));

    th = removeEmptyAttr(th);

    th = replaceSingleQuoteEscape(th);

    /**
     * Append ERB partial rendering to local development environments
     */
    if (all && process.env.NODE_ENV != 'production') {
      let erb = await erbRender(name, context);

      for (let i = 0; i < idAttrs.length; i++) {
        erb = erb.split(`${idAttrs[i]}="`).join(`${idAttrs[i]}="erb-`);
      }

      rendered = `
        <div class="margin-bottom-2"><b>Thymeleaf Preview</b></div>
        <div>
        <!-- START THYMELEAF COMPONENT -->
        ${th}
        <!-- END THYMELEAF COMPONENT -->
        </div>
        <br>
        <div class="margin-bottom-2"><b>ERB Preview</b></div>
        <div>
        <!-- START ERB COMPONENT -->
        ${erb}
        <!-- END ERB COMPONENT -->
        </div>`;
    } else {
      rendered = th;
    }

    /**
     * Return code block or fully rendered HTML
     */
    if (pre) {
      return block(rendered, 'html');
    } else {
      return beautify(rendered, CONFIG_BEAUTIFY);
    }
  });

  // /**
  //  * Fully renders a package's Thymeleaf template with context passed as the
  //  * second argument and shortcode body. It returns the Thymeleaf template
  //  * string escaped and wrapped in a code block if the 3rd argument, escape,
  //  * is true.
  //  *
  //  * @param   {Array}  args  Accepts 0: Context body, 1: name as String,
  //  *                         2: context as JSON String, 3: wether to return
  //  *                         rendered HTML (false) or pre-rendered HTML in a
  //  *                         code block (true)
  //  *
  //  * @return  {String}       Rendered template or code block source preview
  //  */
  // eleventyConfig.addShortcode('component', async function(...args) {
  //   let name = args[0];
  //   let context = (args[1]) ? JSON.parse(args[1]) : false;
  //   let rendered = removeExtraHtml(await fragmentInclude(name, context));

  //   rendered = removeEmptyAttr(rendered);

  //   rendered = replaceSingleQuoteEscape(rendered);

  //   return beautify(rendered, CONFIG_BEAUTIFY);
  // });

  /**
   * Renders a Markdown string and returns the rendered HTML
   *
   * @param   {String}  md  Markdown string
   *
   * @return  {String}      Rendered HTML
   */
  eleventyConfig.addShortcode('md', async function(mrkdwn) {
    return markdownRender(mrkdwn);
  });

  /**
   * Retrieves a package's Thymeleaf template source and wraps it in a code block
   *
   * @param   {String}   name     Name of the package
   * @param   {Boolean}  include  Pass true to return the inclusion demonstration instead of the template
   *
   * @return  {String}        The template source escaped and wrapped in a code block
   */
  eleventyConfig.addShortcode('thymeleaf', async function(name, include = false) {
    let templatePath = getFile(name, 'thymeleaf')
      .replace(`${__dirname}/`, '')
      .replace('.html', '');

    let template = removeNewLines(fs.readFileSync(getFile(name, 'thymeleaf'), 'utf-8'));

    if (include) {
      let params = [
        template.match(/\$\{[A-z$_.-]{0,}}/g)
      ].filter(m => m).flat();

      let iterationItems = [
        template.match(/th:each="[A-z$_.-]{0,}/g)
      ].filter(m => m).flat();

      iterationItems = iterationItems.map(i => '${' + i.split('="')[1] + '}');

      // Clean up params
      params = params.map(c => {
        if (c.includes('.')) {
          c = `${c.split('.')[0]}}`;
        }

        // Remove iteration items
        if (iterationItems.includes(c)) {
          return false;
        }

        return c;
      });

      // Create a new set of unique params and filter out Booleans or falsey variables
      params = [...new Set(params)].filter(Boolean);

      return block(`<th:block th:replace="~{${templatePath} :: ${createCamelCase(name)}(${
          params.join(', ')
        })}" />`, 'html', true);
    }

    return block(template, 'html', false);
  });

  /**
   * Retrieves a package's ERB template source and wraps it in a code block
   *
   * @param   {String}   name     Name of the package
   * @param   {Boolean}  include  Pass true to return the inclusion demonstration
   *                              instead of the template
   *
   * @return  {String}            The template source escaped and wrapped in a
   *                              code block
   */
  eleventyConfig.addShortcode('erb', async function(name, include = false) {
    let templatePath = getFile(name, 'erb')
      .replace(`${__dirname}/`, '');

    let template = removeNewLines(fs.readFileSync(getFile(name, 'erb'), 'utf-8'));

    if (include) {
      // Find params matching these patterns
      let params = [
        template.match(/<%= [A-z$_.-]{0,} %>/g),
        template.match(/<% if [A-z$_.-]{0,} %>/g),
        template.match(/<% if [A-z$_.'\-\[\]]{0,} %>/g),
        template.match(/<% if defined\?\([A-z$_.-]{0,}\) %>/g),
        template.match(/<% [A-z$_.-]{0,}.each do/g)
      ].filter(m => m).flat();

      let iterationItems = [
        template.match(/.each do \|[A-z]{0,}/g)
      ].filter(m => m).flat();

      iterationItems = iterationItems.map(i => i.split('|')[1]);

      // Clean what's not needed from param instances
      params = params.map(c => {
        c = c.replace('<%= ', '')
          .replace('<% if ', '')
          .replace('defined?(', '')
          .replace('<% ', '')
          .replace(') %>', '')
          .replace(' %>', '')
          .replace('.each do', '')

        if (c.includes("['")) {
          c = c.split("['")[0];
        }

        // Remove iteration items
        if (iterationItems.includes(c)) {
          return false;
        }

        return c;
      });

      // Create a set of unique params and filter out Booleans or falsey variables
      params = [...new Set(params)].filter(Boolean);

      return block(`<%= ERB.new(File.read('${templatePath}'), 0, 0, '@${createCamelCase(name)}').result_with_hash({${
          params.map(attr => {
            return `${attr}: ${attr}`;
          }).join(', ')
        }}) %>`, 'erb', true);
    }

    return block(template, 'erb', false);
  });

  /**
   * Turns a string into a highlighted code block
   *
   * @param   {String}  type  The type of code block to return. Accepted values
   *                          are defined in the ./config.js, 'hightlightJs' file
   * @param   {String}  str   String containing code
   *
   * @return  {String}       The Sass code escaped and wrapped in a code block
   */
  eleventyConfig.addShortcode('block', async function(type, str) {
    return block(str, type, false);
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
    return createId();
  });

  /**
   * Create a filename friendly string from supplied string
   *
   * @return  {String}  Returns filename friendly string
   */
  eleventyConfig.addShortcode('createSlug', async function(s) {
    return createSlug(s);
  });

  /**
   * Data
   */

  eleventyConfig.addGlobalData('package', package);

  eleventyConfig.addGlobalData('dictionary', config.dictionary);

  eleventyConfig.addGlobalData('config', config);

  eleventyConfig.addCollection('aboutByAlpha', (collectionApi) => {
    let alpha = collectionApi.getFilteredByTag('about')
      .sort((a, b) => a.data.title.localeCompare(b.data.title));

    return [
      ...alpha.filter(item => item.data.tags.includes('primary')),
      ...alpha.filter(item => !item.data.tags.includes('primary'))
    ];
  });

  eleventyConfig.addCollection('componentByAlpha', (collectionApi) => {
    let alpha = collectionApi.getFilteredByTag('component')
      .sort((a, b) => a.data.title.localeCompare(b.data.title));

    return [
      ...alpha.filter(item => item.data.tags.includes('primary')),
      ...alpha.filter(item => !item.data.tags.includes('primary'))
    ];
  });

  eleventyConfig.addCollection('patternByAlpha', (collectionApi) => {
    let alpha = collectionApi.getFilteredByTag('pattern')
      .sort((a, b) => a.data.title.localeCompare(b.data.title));

    return [
      ...alpha.filter(item => item.data.tags.includes('primary')),
      ...alpha.filter(item => !item.data.tags.includes('primary'))
    ];
  });

  eleventyConfig.addCollection('documentationByAlpha', (collectionApi) => {
    let alpha = collectionApi.getFilteredByTag('documentation')
      .sort((a, b) => a.data.title.localeCompare(b.data.title));

    return [
      ...alpha.filter(item => item.data.tags.includes('primary')),
      ...alpha.filter(item => !item.data.tags.includes('primary'))
    ];
  });

  /**
   * Events
   */

  // eleventyConfig.on('eleventy.after', async ({ dir, results, runMode, outputMode }) => {
  //   // Run me after the build ends

  //   console.dir({ outputMode })
  // });

  return CONFIG_ELEVENTY;
};
