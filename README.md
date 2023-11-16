# Code for America, U.S. Web Design System theme (USWDS)

This theme replaces the [Honeycrisp Ruby gem](https://github.com/codeforamerica/honeycrisp-gem) but preserves the style and design. The theme uses “design tokens” from the [Honeycrisp design system](http://honeycrisp.herokuapp.com/cfa/styleguide) to make the USWDS look similar to Honeycrisp. Full documentation on using the theme can be referenced on the [corresponding documentation site](https://codeforamerica.github.io/uswds).

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

Contributing to the theme requires Node.js and NPM. Installing Node.js will install NPM at the same time. We recommend using [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm), but you may also install [Node.js](https://nodejs.org/) directly. The project primarily uses [NPM scripts](https://docs.npmjs.com/cli/v9/using-npm/scripts) to run the Node.js libraries [Rollup.js](https://rollupjs.org), [Dart Sass](https://sass-lang.com/documentation/js-api/), and [11ty (Eleventy)](https://www.11ty.dev) to generate a static site and USWDS assets.

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

Start development.

```bash
npm start
```

---

### Project directory and file structure

```
– 📁 dist                —  All static files for the site are distributed here, including HTML, CSS, JavaScript, SVGs, images, and font files.
├ 📂 src                 —  Folder for source files such as Dart Sass and JavaScript ES modules.
  ├ 📂 views             —  Folder for 11ty template views.
    ├ 📁 _layouts        —  This folder contains layouts extended by other view files.
    ├ 📁 _partials       —  This folder contains partials included in other view files.
     └ 📄 **/*.md        —  View files are usually Markdown files. Directories and file names reflect the URL pattern for the static site pages.
  ├ 📂 scss              —  Folder for Dart Sass entry points.
    ├ 📄 _site.scss      —  Entry point for the site and theme styles are imported and configured.
    └ 📄 _styles.scss    —  Entry point for only the theme styles are imported and configured.
  └ 📂 js                —  Folder for ES JavaScript entry points.
    └ 📄 index.js        —  Entry point for where site and theme scripts are imported and configured.
├ 📂 packages            —  Folder for CfA theme components, including USWDS component stylesheets and templates for Thymeleaf and ERB.
  ├ 📁 cfa-uswds-theme   —  This package includes the main theme settings for the USWDS.
  ├ 📁 cfa-uswds         —  This package actively extends the USWDS core settings with the theme settings.
  ├ 📁 cfa-core          —  This package stores settings that aren’t supported by the USWDS but are used by other component packages.
  ├ 📁 cfa               —  This package imports all of the theme component packages.
  └ 📁 cfa-*             —  All additional *packages* are theme components or utilities.
    ├ 📄 _*.html.erb     —  An Embedded Ruby partial template file.
    ├ 📄 _*.scss         —  A Dart Sass component styling file.
    ├ 📄 *.js            —  An ES JavaScript component file (not a web component).
    └ 📄 *.th.html       —  A Thymeleaf template component file.
├ 📄 config.js           —  Configuration for the theme, including base path definitions for static and source files.
├ 📄 eleventy.config.js  —  Configuration file for the 11ty site.
├ 📄 entrypoints.js      —  Defines the configuration for Dart Sass and ES JavaScript modules and their distribution.
├ 📄 styles.js           —  Node.js script for generating CSS from Dart Sass using Sass and PostCSS.
├ 📄 scripts.js          —  Node.js script for bundling JavaScript ES modules using Rollup.js.
├ 📄 package.json        —  Defines the theme package for NPM, manages dependencies, and CLI scripts.
└ 📄 .nvmrc              —  Used to define the Node.js latest version number supported during development.
```

### Scripts

The following NPM scripts, which are CLI commands, are available to run the primary development functions of the application.

#### Start

Compile styles, scripts, views, and start the 11ty server.

```bash
npm run start
```

#### Default

Compile styles, scripts, views.

```bash
npm run default
```

#### Views

Compile views and start the 11ty server.

```bash
npm run views
```

#### Scripts

Compile ES JavaScript using [Rollup.js](https://rollupjs.org).

```bash
npm run scripts
```

#### Styles

Compile Dart Sass using its built-in [JavaScript API](https://sass-lang.com/documentation/js-api/).

```bash
npm run styles
```

#### Preview

Compile views and start the 11ty server for production.

```bash
npm run preview
```

#### Production

Compiles views, styles, and scripts for production.

```bash
npm run production
```

#### Version

This script hooks into the default [`npm version`](https://docs.npmjs.com/cli/v9/commands/npm-version) command to compile views, scripts, and styles for production, and staging them for commit **before** NPM creates a version commit and Git version tag.

This script doesn't need to run on its own, just run `npm version {{ semantic version }}` when you are ready to commit a new version of the package to the repository before publishing.

```bash
npm run version
```

#### Pre-publish

This script hooks into the default [`npm publish`](https://docs.npmjs.com/cli/v9/commands/npm-publish) command to push local commits and tags to remote **before** NPM publishes the latest version to its registry.

This script doesn't need to run on its own, just run `npm publish` when you are ready to publish the latest version of the package.

```bash
npm run prepublishOnly
```

#### Publish

This script hooks into the default [`npm publish`](https://docs.npmjs.com/cli/v9/commands/npm-publish) command to push the [/dist](dist) directory to the GitHub Pages branch, gh-pages, which is the "production" environment for the site.

This script doesn't need to run on its own, just run `npm publish` when you are ready to publish the latest version of the package.

```bash
npm run publish
```

---

### Configuration

The [config.js](config.js) contains common configuration for the 11ty site and compilation path definitions for source Dart Sass and ES JavaScript entry points.

---

### 11ty

The static documentation site is generated using [11ty (Eleventy)](https://www.11ty.dev). Templates and views are defined in the [src/views/](src/views/) directory. Templates are written in [Markdown + Liquid](https://www.11ty.dev/docs/languages/markdown) syntax (11ty pre-processes Markdown templates using Liquid, hence, the syntax is combined) or [Twig](https://github.com/factorial-io/eleventy-plugin-twig). Twig is minimally used and appears in layouts or partials. The language is supported because USWDS templates are written using Twig.

#### 11ty Configuration

The [eleventy.config.js](eleventy.config.js) defines the customized functionality available to templates. The main additions are library and plugin configuration, [custom shortcodes](https://www.11ty.dev/docs/shortcodes/), global data, and collections.

#### Custom shortcodes

Shortcodes are noted below but documented in more detail in the [source](eleventy.config.js).

##### **Package (Paired Shortcode)**

Render a component. The JSON context fills the template slots with the values used by the template. The boolean value determines whether to return rendered (false, default) or escaped (true) HTML.

```liquid
{% package 'name' 'context (JSON String)' false %}{{ 'body (HTML String)' }}{% endpackage %}
```

##### Markdown

Compile a Markdown string to HTML.

```liquid
{% md 'String (Markdown String)' %}
```

##### Thymeleaf

Retrieve an escaped Thymeleaf template. The boolean value determines whether to return the template fragment contents (false, default) or the template fragment include statement (true).

```liquid
{% thymeleaf 'name' false %}
```

##### Embedded Ruby

Retrieve an escaped Embedded Ruby template partial. The boolean value determines whether to return the template contents (false, default) or ERB partial render statement (true).

```liquid
{% erb 'name' false %}
```

##### Block

Create a code block demonstration from the supplied string. Supported syntax types are defined in the HighlightJs block in the [config.js](config.js) file.

```liquid
{% block 'type' 'String' %}
```

##### Get File

Retrieve a package file path for a package by its type.

```liquid
{% getFile 'name' 'String (value of thymeleaf, erb, stylesheet, or javascript)' %}
```

##### Create ID

```liquid
{% createId %}
```

##### Create Slug

```liquid
{% createSlug %}
```
