# Code for America, U.S. Web Design System theme (USWDS)

This theme replaces the <a href="https://github.com/codeforamerica/honeycrisp-gem" target="_blank" rel="noindex noopener nofollow">Honeycrisp Ruby gem</a> but preserves the style and design. The theme uses “design tokens” from the <a href="http://honeycrisp.herokuapp.com/cfa/styleguide" target="_blank" rel="noindex noopener nofollow">Honeycrisp design system</a> to make the USWDS look similar to Honeycrisp. Full documentation on using the theme can be referenced on the <a href="https://codeforamerica.github.io/uswds" target="_blank" rel="noindex noopener nofollow">corresponding documentation site</a>.

## Usage

This readme will cover the basics for working with and contributing to the theme codebase. The following notes are a high-level overview of how to install and use the theme. More detailed instructions will be added in the first official release.

1. Install this package and the USWDS package as dependencies using npm.

1. Configure Sass include paths.

1. Add imports to project Sass entrypoint.

1. Compile Sass to /static/assets/css.

1. Copy the static /dist/img directory to the static/assets directory.

1. Copy the static /dist/js file into the static/assets directory.

1. Fonts do not have to be copied into the static directory since the theme uses the system font but this would be done if desired. Copy the static /dist/fonts.

1. Link to stylesheet and JavaScript files in the head once they are in the static directory.

## Contributing

Contributing to the theme requires Node.js, NPM, and Ruby on the system level. Installing Node.js will install NPM at the same time. We recommend using <a href="https://github.com/nvm-sh/nvm" target="_blank" rel="noindex noopener nofollow">Node Version Manager (NVM)</a>, but you may also install <a href="https://nodejs.org" target="_blank" rel="noindex noopener nofollow">Node.js</a> directly. Components are written as Thymeleaf fragment and Embedded Ruby (ERB) partial templates. Thymeleaf is included as a project dependency. <a href="https://www.ruby-lang.org" target="_blank" rel="noindex noopener nofollow">Ruby</a>, however, is required on the system level to render ERB files. At the time of writing, the MacOS System Ruby `2.6.10p210` was used. <a href="https://rvm.io" target="_blank" rel="noindex noopener nofollow">Ruby Version Manager (RVM)</a> is available to help manage Ruby versions.

The project primarily uses <a href="https://docs.npmjs.com/cli/v9/using-npm/scripts" target="_blank" rel="noindex noopener nofollow">NPM scripts</a> to run the Node.js libraries <a href="https://rollupjs.org" target="_blank" rel="noindex noopener nofollow">Rollup.js</a>, <a href="https://sass-lang.com/documentation/js-api" target="_blank" rel="noindex noopener nofollow">Sass</a>, <a href="https://www.11ty.dev" target="_blank" rel="noindex noopener nofollow">11ty (Eleventy)</a>, and <a href="https://github.com/ultraq/thymeleafjs" target="_blank" rel="noindex noopener nofollow">ThymeleafJS</a> to generate a static site and USWDS assets.

### Getting started

Clone the repository and navigate to the project.

```bash
git clone https://github.com/codeforamerica/uswds.git codeforamerica/uswds && cd codeforamerica/uswds
```

If using NVM, you may set the supported Node.js version number first. If not you may skip ahead.

```bash
nvm use
```

Install dependencies,

```bash
npm install
```

Compile and start the development server. View the site locally at http://localhost:8080

```bash
npm start
```

---

### Workflow

#### Development

Once the development command is running (`npm start`) 11ty will watch for changes to view and component templates defined in the `watchTargets` block of [config.js](config.js). Separate tasks for watching for changes to Sass and JavaScript files are also activated.

Most changes will be made to files within the [src](src) or [packages](packages) directories. Once a change is made to a source file it will be compiled into the [dist](dist) directory. The local development server will refresh to reflect the change.

#### Flows and general style guides

Potential changes can be broken down into the following flow categories:

* [Modifying documentation or content](#modifying-documentation-or-content): involves Node.js, Markdown + Liquid templates.
* [Modifying or adding a USWDS theme setting](#modifying-or-adding-a-uswds-theme-setting): involves Sass.
* [Modifying a CfA component](#modifying-a-cfa-component): involves Sass, JavaScript, Thymeleaf, or ERB.
* [Modifying the compilation of Sass or JavaScript](#modifying-the-compilation-of-sass-or-javascript): involves Node.js.

#### Modifying documentation or content

All content and context (strings, classes, HTML) passed to rendered components occurs in the [src/views](src/views) directory. There may be some special cases where a string is hard-coded into a component template but generally this is discouraged. The documentation is written in <a href="https://www.11ty.dev/docs/languages/markdown" target="_blank" rel="noindex noopener nofollow">Markdown + Liquid</a> syntax (11ty pre-processes Markdown templates using Liquid, hence, the syntax is combined) or <a href="https://github.com/factorial-io/eleventy-plugin-twig" target="_blank" rel="noindex noopener nofollow">Twig</a>. Twig is minimally used and appears in layouts or partials. The language is supported because USWDS component templates are written using Twig.

Pages use <a href="https://www.11ty.dev/docs/data-frontmatter" target="_blank" rel="noindex noopener nofollow">front matter</a>, or a YAML block, to define variables for the layout or page contents. This makes it easier to modify short strings deeply nested in the content. Several content blocks for each page are "templatized" to render automatically using variables. The variables are defined in each page, either through front-matter or other, and passed to partials in the [views/_partials](views/_partials) directory. For example, the details section for each component use a partial rendered with the shortcode `{% render 'details.md' name: title ... %}`.

Component demonstrations in the documentation use context to define their display. Context may be strings containing class names, plain text, or HTML, and booleans. Context is organized using a JSON object set in a capture block. For example, the Accordion component uses the following context:

```liquid
{% capture context %}{
  "modifier": "cfa-accordion usa-accordion--bordered",
  "multiple": true,
  "items": [
    {
      "expanded": true,
      "controls": "aria-c-{% createId %}",
      "heading": "We'll ask you about",
      "body": "{% md body_accordion_1 %}"
    },
  ...
```

Which is passed to the `figure.md` partial. This partial will create the figure that renders the live demonstration of the component paired the HTML source.

```liquid
{% render 'figure.md', name: 'accordion', nice: 'Bordered', context: context, caption: 'Bordered' %}
```

On the backend, the context is passed to both the Accordion component's Thymeleaf fragment and Embedded Ruby partial templates (in the [packages/cfa-accordion](packages/cfa-accordion) directory). It will then render unescaped and escaped HTML and inline it into the static HTML output. In the production build, only the Thymeleaf fragment is displayed.

Built-in Liquid template methods are used to enhance the functionality of Markdown. These are denoted inside the `{% ... %}` brackets. There are also several [custom shortcodes](#custom-shortcodes) added to the 11ty configuration for this site to assist various parts of the documentation display for the theme.

#### Modifying or adding a USWDS theme setting

While the [src/scss](src/scss) directory contains the entry points for Sass, the the main **theme-level settings** for the USWDS are set in [packages/cfa-uswds-theme/_index.scss](packages/cfa-uswds-theme/_index.scss). These settings are actively extended by the USWDS core in the [packages/cfa-uswds/_index.scss](packages/cfa-uswds/_index.scss). For example, the setting for the theme focus color in `cfa-uswds-theme`:

```scss
$cfa-focus-color: 'gold-30v' !default;
```

will map to the `cfa-uswds` package core setting map:

```scss
@use 'cfa-uswds-theme' as *;

@use 'uswds-core' with (
  $theme-focus-color: $cfa-focus-color,
  // ...
```

This set up allows users of the theme only customize the theme settings which is a much smaller subset of the <a href="https://designsystem.digital.gov/documentation/settings" target="_blank" rel="noindex noopener nofollow">full USWDS settings configuration</a>. If a current setting needs to be modified it can be done in the `cfa-uswds-theme` package. If a new USWDS setting needs to be added, set the `$cfa-` version of it in the `cfa-uswds-theme` package and map it to it's corresponding USWDS setting the `cfa-uswds` package.

There is a smaller set of **package-level settings** used by components in this theme. These settings aren’t supported by the USWDS but are used by other component packages. Those are set in the `cfa-core` package.

All <a href="https://docs.google.com/spreadsheets/d/1nVIAmi6pRDu5Z7II6ttwKryGrdYBhuJYmpO4YjXmuxQ/edit#gid=0" target="_blank" rel="noindex noopener nofollow">theme and package-level settings are documented here</a>.

#### Modifying a CfA component

Each component and its relevant code are stored together as [packages](packages) in the directory of the same name. Packages may contain template files for Thymeleaf and ERB to define the markup, Sass to define custom styles that aren't supported by the USWDS configuration, or JavaScript if it's necessary to enable functionality. Each of these concerns are separated into their own file.

```
— 📂 packages
  └ 📁 cfa-*
    ├ 📄 *.th.html    —  A Thymeleaf template component file for storing component markup.
    ├ 📄 _*.html.erb  —  An Embedded Ruby partial template file for storing component markup.
    ├ 📄 _*.scss      —  A Sass styling file for overriding or extending USWDS styles.
    └ 📄 *.js         —  A JavaScript file for functionality (currently, not to be confused with web components).
```

In place of the asterisk (*) is the component name. Names are modelled after USWDS counterparts that they represent or override. Names are only customized if they do not exist in the USWDS (ex, `details` or `follow-up-question`). **It's important that names are consistent across package directories, files, and their corresponding documentation page**.

##### **📄 &#42;.th.html

**Thymeleaf fragments** are "componentized" templates for the Java template engine. This syntax models "natural templating" or writing thats feels similar to HTML with an added binding syntax through custom HTML attributes. This makes it more formal and less flexible. Passing variables to these bindings fills the standard HTML attributes and string content within HTML tags. To test the rendering of Thymeleaf the theme uses **ThymeleafJS**. This is important to note because this implementation of the language is limited. <a href="https://www.thymeleaf.org" target="_blank" rel="noindex noopener nofollow">Read more about the Thymeleaf template language on the documentation site</a>.

**Only USWDS classes prefixed with `.usa-` are hard-coded into templates**. Theme modifiers prefixed with `.cfa-` are passed to the fragment to achieve theme styling. For example, to append the `cfa-accordion` class to the `usa-accordion`, the modifier parameter needs to be set.

```html
<div th:fragment="accordion(modifier, multiple, items)" class="usa-accordion" th:classappend="${modifier}" th:attr="data-allow-multiple=${multiple}" th:each="item: ${items}">
  <!-- ... -->
```

**Fragments will nest other components instead of re-creating them**. This enables full customization of every nested component. For example, the Form Group component will pull in the Input component.

```html
<th:block th:replace="~{packages/cfa-input/cfa-input.th :: input(${input}, ${inputGroup})}" />
```

##### 📄 _&#42;.html.erb

**Embedded Ruby partial templates** are scripted Ruby files with HTML and Ruby code intermixed. There is no binding syntax for HTML so it is less formal but more flexible. It is much easier to write Ruby code within templates which makes it less "componentized." This application doesn't operate inside of a Ruby on Rails environment so there are no helper methods, most notably the `render 'partial-name'` method for including other partials. The lowest level and simplest version of Rails `render` is `ERB.new(File.read('partial-name'), 0, 0, [*('a'..'z')].sample(8).join).result_with_hash({key: 'value'})` which can be cumbersome to manage. <a href="https://docs.ruby-lang.org/en/2.3.0/ERB.html" target="_blank" rel="noindex noopener nofollow">Read more about the ERB class on the Ruby documentation site</a>.

**The same rules for modifiers and nesting other components applies to ERB templates**.

```erb
<div class="usa-accordion<% if defined?(modifier) %> <%= modifier %><% end %>"<% if defined?(multiple) %> data-allow-multiple<% end %>>
  <!-- ... -->
```

Nesting another component:

```ruby
<%= ERB.new(File.read('packages/cfa-input/_cfa-input.html.erb'), 0, 0, '@input')
  .result_with_hash({
    input: input,
    inputGroup: (inputGroup if defined?(inputGroup))
  }.compact) %>
```

In some cases the string `@input` in the example above needs to be unique. It can be replaced with `[*('a'..'z')].sample(8).join` to always create a random string.

##### 📄 _&#42;.scss

**Dart Sass** modules **extend** the styling for custom or USWDS components that can't be styled using USWDS settings alone. Where possible, distinguish between theme styles and USWDS styles. Always prefer USWDS Sass theme tokens, utilities, functions, and other mixins over custom methods. This ensures that custom styling remains within the design system.

**Use the Block, element, modifier (BEM) naming convention**. Always prefix theme classes with `.cfa-`. Use the same name as the component for the block selector. <a href="https://getbem.com" target="_blank" rel="noindex noopener nofollow">Read more about the BEM naming convention</a>.

```
.cfa-block { }
.cfa-block__element { }
.cfa-block--modifier { }
```

**Use the CSS `.cfa-` prefix for custom styles**. This ensures clarity when using custom theme styles versus USWDS defaults. Do not add style overrides dependent on `.usa-` classes as the root class.

```scss
.cfa-button:not(.usa-button--unstyled) {
  // ...
```

**Reuse settings variables defined by theme settings**. They are always prefixed by `$theme-`. Often, they need to be passed to utility functions that will interpret the token value. <a href="https://designsystem.digital.gov/design-tokens/" target="_blank" rel="noindex noopener nofollow">Read more about design tokens on the USWDS documentation site</a>.

```scss
@use 'uswds-core' as *;

.cfa-button.usa-button--big:not(.usa-button--unstyled) {
  font-size: font-size($theme-button-font-family, 'lg');
  // ...
```

**Always use the `units()` function** to convert unit design tokens to the spacing dimensions defined by the system. Never hard-code pixel values. <a href="https://designsystem.digital.gov/design-tokens/spacing-units/" target="_blank" rel="noindex noopener nofollow">Read more about spacing unit tokens on the USWDS documentation site</a>.

```scss
@use 'uswds-core' as *;

.cfa-button:not(.usa-button--unstyled) {
  padding: units(2) units(2.5);

  // ...
```

**Use the `set-text-and-bg` mixin** when defining a background color and foreground text color. This ensures color combinations are run through the USWDS contrast checker. Combinations that don't have sufficient contrast (WCAG AA 2.1) will emit an exception to stdout. <a href="https://designsystem.digital.gov/design-tokens/color/overview" target="_blank" rel="noindex noopener nofollow">Read more about color on the USWDS documentation site</a>.

```scss
@use 'uswds-core' as *;

.cfa-button.usa-button--outline:not(.usa-button--unstyled):not([disabled]):not([aria-disabled=true]) {
  @include set-text-and-bg(
    $bg-color: $theme-body-background-color,
    $preferred-text-color: 'ink',
    $context: 'CfA Button'
  );

  // ...
```

**Use theme and state color tokens over system color tokens**. This ensures that the color theme has continuity throughout components. Read more about color. Read more about each color token types on the USWDS documentation site:

* <a href="https://designsystem.digital.gov/design-tokens/color/theme-tokens" target="_blank" rel="noindex noopener nofollow">Theme color tokens</a>
* <a href="https://designsystem.digital.gov/design-tokens/color/state-tokens" target="_blank" rel="noindex noopener nofollow">State color tokens</a>
* <a href="https://designsystem.digital.gov/design-tokens/color/system-tokens" target="_blank" rel="noindex noopener nofollow">System color tokens</a>

```scss
@use 'uswds-core' as *;

.cfa-button--no {
  > svg {
    fill: color('error');

  // ...

.cfa-button--yes {
  > svg {
    fill: color('success-darker');

  // ...
```

##### 📄 &#42;.js

**ES JavaScript** modules provide functionality to custom components or provide a utility wrapper around external libraries. They are written using as standard <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules" target="_blank" rel="noindex noopener nofollow">modules</a> and defined using <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes" target="_blank" rel="noindex noopener nofollow">class templates</a>.

* **Components properties and methods are be encapsulated**. Writing properties to global variables, such as the `window`, is discouraged. Write custom properties to the component instance, instead.
* **All JavaScript should be considered a progressive enhancement**. There should be a suitable default state for the component if the page does not invoke JavaScript. ARIA properties, such as `aria-hidden` will only be toggled when the component is instantiated.
* Use the `data-js` to define selectors for components. Use `aria-controls` to define target element selectors. Follow guidance defined by the <a href="https://www.w3.org/WAI/ARIA/apg/" target="_blank" rel="noindex noopener nofollow">ARIA Authoring Practices Guide</a>.

**Always use a class to define a component (using the component name, capitalized and camel-cased)**:

```javascript
class Details {
  constructor() {

    // ...

export default Details;
```

Using, or, creating a class instance:

```javascript
import Details from '@codeforamerica/uswds/packages/cfa-details/cfa-details.js';

new Details();
```

Classes can be easily extended. Methods and properties within them can be overridden or accessed individually.

```javascript
import Details from '@codeforamerica/uswds/packages/cfa-details/cfa-details.js';

Details.foo = 'bar';

let details = new Details();

details.method();
```

**Static properties used within the class are defined before the export**. They are often set for the class within the constructor with an optional settings override that can be passed upon instantiation.

```javascript
class Details {
  constructor(s = {}) {
    this.selector = s.selector ? s.selector : Details.selector;

    // ...

}

Details.selector = '[data-js="details"]';

// ...

export default Details;
```

**Click, change, or other event listeners are added to the `body`**. This makes functions less dependent on individual elements and more compatible with reactive frameworks.

```javascript
class Details {
  constructor() {

    // ...

    document.querySelector('body')
      .addEventListener('click', event => {
        if (event.target.matches(this.selector)) {
          this.toggle(event.target);
        }
    });

    // ...
```

Classes may be instantiated once for all elements they concern.

```javascript
import Details from '@codeforamerica/uswds/packages/cfa-details/cfa-details.js';

new Details();
```

Or, they may be instantiated per element. However, the main selector for the component should always be stored as a static property.

```javascript
(elements => {
  for (let i = 0; i < elements.length; i++) {
    new UploadDocuments(elements[i]);
  }
})(document.querySelectorAll(UploadDocuments.selector));
```

#### Modifying the compilation of Sass or JavaScript

...

#### Committing changes and publishing

...

### Project directory and file structure

```
— 📁 dist                —  All static files for the site are distributed here, including HTML, CSS, JavaScript, SVGs, images, and font files.
├ 📂 src                 —  Folder for source files such as Sass and JavaScript modules.
  ├ 📂 views             —  Folder for 11ty template views.
    ├ 📁 _layouts        —  This folder contains layouts extended by other view files.
    ├ 📁 _partials       —  This folder contains partials included in other view files.
     └ 📄 **/*.md        —  View files are usually Markdown files. Directories and file names reflect the URL pattern for the static site pages.
  ├ 📂 scss              —  Folder for Sass entry points.
    ├ 📄 _site.scss      —  Entry point for the site and theme styles are imported and configured.
    └ 📄 _styles.scss    —  Entry point for only the theme styles are imported and configured.
  └ 📂 js                —  Folder for JavaScript entry points.
    └ 📄 index.js        —  Entry point for where site and theme scripts are imported and configured.
├ 📂 packages            —  Folder for CfA theme components, including USWDS component stylesheets and templates for Thymeleaf and ERB.
  ├ 📁 cfa-uswds-theme   —  This package includes the main theme settings for the USWDS.
  ├ 📁 cfa-uswds         —  This package actively extends the USWDS core settings with the theme settings.
  ├ 📁 cfa-core          —  This package stores settings that aren’t supported by the USWDS but are used by other component packages.
  ├ 📁 cfa               —  This package imports all of the theme component packages.
  └ 📁 cfa-*             —  All additional *packages* are theme components or utilities.
    ├ 📄 *.th.html       —  A Thymeleaf template component file for storing component markup.
    ├ 📄 _*.html.erb     —  An Embedded Ruby partial template file for storing component markup.
    ├ 📄 _*.scss         —  A Sass styling file for overriding or extending USWDS styles.
    └ 📄 *.js            —  A JavaScript file for functionality (currently, not to be confused with web components).
├ 📄 config.js           —  Configuration for the theme, including base path definitions for static and source files.
├ 📄 eleventy.config.js  —  Configuration file for the 11ty site.
├ 📄 entrypoints.js      —  Defines the configuration for Sass and JavaScript modules and their distribution.
├ 📄 styles.js           —  Node.js script for generating CSS from Sass using Sass and PostCSS.
├ 📄 scripts.js          —  Node.js script for bundling JavaScript modules using Rollup.js.
├ 📄 package.json        —  Defines the theme package for NPM, manages dependencies, and CLI scripts.
└ 📄 .nvmrc              —  Used to define the Node.js latest version number supported during development.
```

### Scripts

The following NPM scripts, which are CLI commands, are available to run the primary development functions of the application.

#### Start

Compile styles, scripts, views, and start the 11ty server. Watch for changes to relevant files.

```bash
npm run start
```

#### Default

Compile styles, scripts, views. Runs once on relevant files.

```bash
npm run default
```

#### Views

Compile views and start the 11ty server. Watches for changes to relevant view and component templates.

```bash
npm run views
```

#### Scripts

Compile JavaScript using Rollup.js. Watch for changes to JavaScript files.

```bash
npm run scripts
```

#### Styles

Compile Sass using its built-in JavaScript API. Watch for changes to Sass files.

```bash
npm run styles
```

#### Preview

Compile views and start the 11ty server in "production mode."

```bash
npm run preview
```

#### Production

Compiles views, styles, and scripts for production.

```bash
npm run production
```

#### Version

This script hooks into the default <a href="https://docs.npmjs.com/cli/v9/commands/npm-version" target="_blank" rel="noindex noopener nofollow">`npm version`</a> command to compile views, scripts, and styles for production, and staging them for commit **before** NPM creates a version commit and Git version tag.

This script doesn't need to run on its own, just run `npm version {{ semantic version }}` when you are ready to commit a new version of the package to the repository before publishing.

```bash
npm run version
```

#### Pre-publish

This script hooks into the default <a href="https://docs.npmjs.com/cli/v9/commands/npm-publish" target="_blank" rel="noindex noopener nofollow">`npm publish`</a> command to push local commits and tags to remote **before** NPM publishes the latest version to its registry.

This script doesn't need to run on its own, just run `npm publish` when you are ready to publish the latest version of the package.

```bash
npm run prepublishOnly
```

#### Publish

This script hooks into the default <a href="https://docs.npmjs.com/cli/v9/commands/npm-publish" target="_blank" rel="noindex noopener nofollow">`npm publish`</a> command to push the [/dist](dist) directory to the GitHub Pages branch, gh-pages, which is the "production" environment for the site.

This script doesn't need to run on its own, just run `npm publish` when you are ready to publish the latest version of the package.

```bash
npm run publish
```

---

### Configuration

The [config.js](config.js) contains common configuration for the 11ty site and compilation path definitions for source Sass and JavaScript entry points.

---

### 11ty

The [eleventy.config.js](eleventy.config.js) defines the customized functionality available to templates. The main additions are library and plugin configuration, <a href="https://www.11ty.dev/docs/shortcodes" target="_blank" rel="noindex noopener nofollow">custom shortcodes</a>, global data, and collections.

### Custom shortcodes

Shortcodes are noted below but documented in more detail in the [source](eleventy.config.js).

#### **Package (Paired Shortcode)**

Render a component. The JSON context fills the template slots with the values used by the template. The boolean value determines whether to return rendered (false, default) or escaped (true) HTML.

```liquid
{% package 'name' 'context (JSON String)' false %}{{ 'body (HTML String)' }}{% endpackage %}
```

#### Markdown

Compile a Markdown string to HTML.

```liquid
{% md 'String (Markdown String)' %}
```

#### Thymeleaf

Retrieve an escaped Thymeleaf template. The boolean value determines whether to return the template fragment contents (false, default) or the template fragment include statement (true).

```liquid
{% thymeleaf 'name' false %}
```

#### Embedded Ruby

Retrieve an escaped Embedded Ruby template partial. The boolean value determines whether to return the template contents (false, default) or ERB partial render statement (true).

```liquid
{% erb 'name' false %}
```

#### Block

Create a code block demonstration from the supplied string. Supported syntax types are defined in the HighlightJs block in the [config.js](config.js) file.

```liquid
{% block 'type' 'String' %}
```

#### Get File

Retrieve a package file path for a package by its type.

```liquid
{% getFile 'name' 'String (value of thymeleaf, erb, stylesheet, or javascript)' %}
```

#### Create ID

Generate a random string to use as a unique ID.

```liquid
{% createId %}
```

#### Create Slug

Generate a slug (URL friendly string) from a human readable string ("My String" would become "my-string").

```liquid
{% createSlug 'string' %}
```
