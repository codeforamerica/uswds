---
tags: documentation
title: Getting started for engineers
collection: documentationByAlpha
layout: default
story: An overview of the Code for America USWDS theme, integration with the Form Flow Builder, and NPM installation.
sublist: [
  {
    anchor: 'overview',
    title: 'Overview'
  },
  {
    anchor: 'ffb',
    title: 'Form Flow Builder'
  },
  {
    anchor: 'npm',
    title: 'Node Package Manager'
  },
  {
    anchor: 'starter',
    title: 'USWDS Starter'
  }
]
thumbnail: assets/site/thumbnail-installation.png
thumbnail_description: Browse simple and consistent solutions to common user-interface needs in the Code for America U.S. Web Design System theme.
---

{% capture utility_alert %}{% capture context %}{
  "modifier": "usa-alert--info",
  "role": "region",
  "label": "USWDS CSS Utilities",
  "body": "<p>The USWDS includes a <a href=\"https://designsystem.digital.gov/utilities\" target=\"_blank\" target=\"_blank\" rel=\"noopener nofollow\" class=\"usa-link--external\">robust set of CSS utilities</a> for simple style modifications to templates or new components. Consider using these for simple theme modification as well.</p>"
}{% endcapture %}{% component 'alert' context %}{% endcapture %}

{% capture starter_repo_alert %}{% capture context %}{
  "modifier": "usa-alert--info",
  "role": "region",
  "label": "USWDS CSS Utilities",
  "text": "You may use the <a href=\"https://github.com/codeforamerica/uswds-starter\" target=\"_blank\" target=\"_blank\" rel=\"noopener nofollow\" class=\"usa-link--external\">Code for America USWDS starter repository</a> to quickly get started or follow a similar step-by-step process below."
}{% endcapture %}{% component 'alert' context %}{% endcapture %}

## Overview of the new design system {#overview}

The Code for America, U. S. Web Design System (USWDS) theme replaces the Honeycrisp Ruby gem but preserves its design style. The theme uses “design tokens” from the Honeycrisp design system to make the USWDS look similar to Honeycrisp. On this site, engineers can reference documentation for component replacements.

### Migrating from Honeycrisp

Migration requires changes in installation and how components are written in applications. For each component documentation page, you will find.

* The necessary HTML markup and CSS selectors needed to render each component.

* A preview of how the markup should be rendered.

* If applicable, description of JavaScript required to make the component functional.

* Code snippets for Thymeleaf template fragments (Java Spring) and Embedded Ruby (ERB) partials (Ruby on Rails).

### Additional features

USWDS components unavailable in Honeycrisp can be used in applications*. Some examples include:

* the <a href="https://designsystem.digital.gov/components/combo-box" target="_blank" rel="noopener nofollow" class="usa-link--external">Combobox</a>,

* the <a href="https://designsystem.digital.gov/components/date-picker" target="_blank" rel="noopener nofollow" class="usa-link--external">Date Picker</a>,

* the <a href="https://designsystem.digital.gov/components/time-picker" target="_blank" rel="noopener nofollow" class="usa-link--external">Time Picker</a>,

* and <a href="https://designsystem.digital.gov/components/overview" target="_blank" rel="noopener nofollow" class="usa-link--external">others</a>.

Extended USWDS themes are more easily supported, if desired, using Sass configuration methods.

The USWDS provides a robust set of CSS utilities that can be used to make small modifications to components or templates. Utilities can also be used to create entirely new components.

Code snippets for each component are rendered using pre-built Thymeleaf template fragments and ERB templates that can be included in your project. Parameters can be passed to these components to customize their appearance.

<small>*Please keep in mind, however, due to the Form Flow Builder’s focus on a limited set of components, we have not tested all USWDS components with this theme.</small>

## Enabling the theme in the Form Flow Builder {#ffb}

The theme is already available in the Code for America Form Flow Builder <a href="https://github.com/codeforamerica/form-flow" target="_blank" rel="noopener nofollow" class="usa-link--external">Library</a> and <a href="https://github.com/codeforamerica/form-flow-starter-app" target="_blank" rel="noopener nofollow" class="usa-link--external">Starter Application</a>. To enable the theme, follow these steps:

1. Run the setup script. This will check and handle the installation of NPM and Node.js.

2. Add env variables to `.env`.

3. Change the <a href="https://github.com/codeforamerica/form-flow#design-system" target="_blank" rel="noopener nofollow" class="usa-link--external">design system configuration setting in your application.yaml file</a>. Enabling this property sets template resolution to use the theme templates and an updated head template linking to precompiled styles and scripts.

You may override default USWDS templates with your own if you need to add your own theme and customize the appearance of components.

### Gradle tasks

Build tasks using Gradle will be activated when the application is configured to use the theme. They will automatically install it from NPM and compile the source Dart Sass and ES JavaScript to production-ready CSS and JavaScript. Other tasks include migrating static USWDS assets, SVGs, and images, to the static output directory.

Source for Dart Sass and ES JavaScript can be found in the <span class="code">src/main/resources/static/assets/</span> directory. Once compiled, they will be placed into the <span class="code">generated/main/resources/static/assets/</span> directory.

Additional Gradle tasks for watching Sass and JavaScript files can be called. These will monitor changes to Sass files and recompile them. More details on all Gradle tasks can be found on the <a href="https://github.com/codeforamerica/form-flow" target="_blank" rel="noopener nofollow" class="usa-link--external">Form Flow Builder library repository</a>.

### Theme

The <span class="code">src/main/resources/static/assets/scss/styles.scss</span> is the entry point for all of the local styles for the FFB. This is where Sass imports and theme settings can be managed. The default setup will provide the necessary styles for the theme.

{% capture code %}
@forward 'cfa-uswds'; // CfA USWDS theme
@forward 'uswds';     // USWDS component packages
@forward 'cfa';       // CfA component packages
{% endcapture %}{% block 'scss' code %}

If you want to modify a few theme settings, such as colors, you may extend the theme’s default settings with a Sass map.

{% capture code %}
// Modify CfA USWDS theme settings
@use 'cfa-uswds-theme' with (
  $cfa-focus-color: 'blue-warm-60v'
  // ... additional settings here ...
);
@forward 'cfa-uswds';  // CfA USWDS theme
@forward 'uswds';      // USWDS component packages
@forward 'cfa';        // CfA component packages
{% endcapture %}{% block 'scss' code %}

{{ utility_alert }}

The theme uses a subset of USWDS settings (prefixed with `$cfa-`). Refer to the **theme-level** settings documentation on what can be configured.

{% capture context %}{
  "items": [
    {
      "label": "Theme-level settings documentation",
      "modifier": "cfa-button usa-button--outline",
      "href": "https://docs.google.com/spreadsheets/d/1nVIAmi6pRDu5Z7II6ttwKryGrdYBhuJYmpO4YjXmuxQ/edit#gid=0",
      "target": "_blank",
      "rel": "noopener nofollow",
      "postfix": "{{ config.baseUrl }}assets/img/sprite.svg#launch"
    }
  ]
}{% endcapture %}{% component 'button' context %}

There are many more that can be configured, however, directly with the USWDS. If you want to modify more or anything other than the theme settings, omit the `@use 'cfa-uswds-theme' ...` statement and extend the USWDS core with a new Sass map containing USWDS settings. Keep in mind this may require a larger settings block and should only be done if you are prepared to create your own theme or use the USWDS without the Code for America theme layer. Use the <a href="https://docs.google.com/spreadsheets/d/1nVIAmi6pRDu5Z7II6ttwKryGrdYBhuJYmpO4YjXmuxQ/edit#gid=0" target="_blank" rel="noopener nofollow" class="usa-link--external">theme settings</a> as a base and <a href="https://designsystem.digital.gov/documentation/settings/" target="_blank" rel="noopener nofollow" class="usa-link--external">the USWDS documentation site for additional settings</a>.

{% capture code %}
// Modify USWDS theme settings
@use 'uswds-core' with (
  $theme-focus-color: 'blue-warm-60v'
  $theme-focus-offset: 2
  // ... additional settings here ...
);
@forward 'uswds';      // USWDS component packages
@forward 'cfa';        // CfA component packages
{% endcapture %}{% block 'scss' code %}

There are a handful of settings used by the theme’s component packages. They can be modified by extending the CfA core with a new Sass map containing those settings. Refer to the **package-level** configuration documentation.

{% capture context %}{
  "items": [
    {
      "label": "Package-level settings documentation",
      "modifier": "cfa-button usa-button--outline",
      "href": "https://docs.google.com/spreadsheets/d/1nVIAmi6pRDu5Z7II6ttwKryGrdYBhuJYmpO4YjXmuxQ/edit#gid=1464502756",
      "target": "_blank",
      "rel": "noopener nofollow",
      "postfix": "{{ config.baseUrl }}assets/img/sprite.svg#launch"
    }
  ]
}{% endcapture %}{% component 'button' context %}

{% capture code %}
// Modify CfA USWDS theme settings
@use 'cfa-uswds-theme' with (
  $cfa-focus-color: 'blue-warm-60v'
  // ... additional settings here ...
);
@forward 'uswds';      // USWDS component packages
// Modify CfA component package settings
@use 'cfa-core' with (
  $cfa-details-background-color: 'secondary-lightest'
);
@forward 'cfa';        // CfA component packages
{% endcapture %}{% block 'scss' code %}

### JavaScript

The <span class="code">src/main/resources/static/assets/js/index.js</span> file is the entry point for the FFB JavaScript. This is where ES module imports and component configuration and instantiation are handled. The default setup will provide the necessary functionality for the theme. Components for the USWDS typically follow this instantiation pattern:

{% capture code %}
import accordion from '@uswds/uswds/js/usa-accordion';
accordion.on(document.body);
{% endcapture %}{% block 'javascript' code %}

USWDS JavaScript functionality may not need to be modified but there are a few documented methods that can be explored on the <a href="https://designsystem.digital.gov/documentation/developers/#js-customization" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS documentation site</a>.

Components for the theme typically follow a slightly different instantiation pattern:

{% capture code %}
import Details from '@codeforamerica/uswds/packages/cfa-details/cfa-details.js';
new Details();
{% endcapture %}{% block 'javascript' code %}

Theme JavaScript functionality may not need to be modified but some methods for each component class can be replaced and some classes accept a settings configuration object. For example, the <a href="{{ config.baseUrl }}components/file-selector/" target="_blank" rel="noopener nofollow" class="usa-link--external">File selector component</a> is a utility wrapper around the <a href="https://www.dropzone.dev" target="_blank" rel="noopener nofollow" class="usa-link--external">Dropzone library</a>. It accepts an argument of mock files to upload and a <a href="https://github.com/dropzone/dropzone/blob/main/src/options.js" target="_blank" rel="noopener nofollow" class="usa-link--external">Dropzone options object</a> directly passed to the Dropzone class. This will be necessary to configure in most cases as the utility only handles the user experience functionality of the Upload Document component.

Details on JavaScript-enabled components can be found on their respective component reference on this site.

### Templates

Template fragments for the USWDS components will be served from a different directory than Honeycrisp template fragments. They can be found at <span class="code">resources/cfa-uswds-templates/</span>. You may override templates and fragments in this path by placing a file with the same name and path in your application.

## Installation using Node Package Manager (NPM) {#npm}

{% capture code %}$ npm install {{ package.name }}{% endcapture %}{% block 'bash' code %}

When not using the [Form Flow Builder](#ffb), the Code for America USWDS theme is most reasonably managed using NPM. This lets you compile the theme with your application’s CSS, JavaScript, SVGs, and other images. It also maintains a dependency link with the theme source to receive updates. Installing Node.js will install NPM at the same time. We recommend using <a href="https://github.com/nvm-sh/nvm" target="_blank" rel="noopener nofollow" class="usa-link--external">Node Version Manager (NVM)</a>, but you may also install <a href="https://nodejs.org/" target="_blank" rel="noopener nofollow" class="usa-link--external">Node.js</a> directly. Even if you are using the Form Flow Builder’s automated integration, it’s helpful to know how this installation works.

### Quick start

{{ starter_repo_alert }}

Once NPM is available, you can add the theme to a new or existing project. If you do not have a package.json file in your project yet, you can run the init command where you would like the package.json to exist and where the corresponding `node_modules/` directory is installed. This will walk you through the steps of creating a package.json file.

{% block 'bash' '$ npm init' %}

Once complete, run the installation command to add the theme to your project.

{% capture code %}$ npm install {{ package.name }}{% endcapture %}{% block 'bash' code %}

This will add the theme package to the <span class="code">node_modules/@codeforamerica/uswds/</span> directory of your project. Precompiled static assets are available in the dist directory of the theme. These can be added as links in your HTML or project templates. The stylesheet can be added to the `<head>` tag.

{% block 'bash' '<link rel="stylesheet" href="node_modules/@codeforamerica/uswds/dist/assets/css/styles.css">' %}

The JavaScript can be added just before the closing `</body>` tag.

{% block 'bash' '<script src="node_modules/@codeforamerica/uswds/dist/assets/js/default.js"></script>' %}

These examples link the assets from the `node_modules/` directory, however, you should move all of the static assets under <span class="code">dist/assets/</span> into the directory where you keep (or plan to keep) similar static assets. Refer to the directory diagram below for more information on available assets.

### Custom installation and theming

To make simple modifications to the theme, such as colors, you must set up a **front-end development environment** for compiling the theme’s Sass and JavaScript. This is preferred if you want to use the theme components as a base and make simple updates to the color palette or other USWDS settings.

{{ utility_alert }}

## Code for America USWDS starter {#starter}

The <a href="https://github.com/codeforamerica/uswds-starter" target="_blank" target="_blank" rel="noopener nofollow" class="usa-link--external">Code for America USWDS starter</a> can be used to quickly set up an environment to start configuring the theme. It describes how to set up a simple NPM project with the theme as a dependency. It also describes how the theme’s Sass and Rollup scripts can be used to compile Sass and JavaScript and run them through the necessary transformations without programming your own Sass or Rollup scripts.

{% capture context %}{
  "items": [
    {
      "label": "Code for America USWDS starter",
      "modifier": "cfa-button usa-button--outline",
      "href": "https://github.com/codeforamerica/uswds-starter",
      "target": "_blank",
      "rel": "noopener nofollow",
      "postfix": "{{ config.baseUrl }}assets/img/sprite.svg#launch"
    }
  ]
}{% endcapture %}{% component 'button' context %}

You may also follow the <a href="https://designsystem.digital.gov/how-to-use-uswds" target="_blank" target="_blank" rel="noopener nofollow" class="usa-link--external">instructions on the USWDS documentation site</a> to create your own USWDS theme for your project from scratch.

## Building pages

Once the theme is installed, configured, and linked you can start building pages. The <a href="https://designsystem.digital.gov/templates/">USWDS documentation site has several page templates</a> that you can use to get started. Once you have created page templates you can start adding components using the rendered HTML in the component catalog. Or, use the Thymeleaf template fragments and ERB templates partial to render pre-built components in your Java Spring or Ruby on Rails application.

{% capture context %}{
  "items": [
    {
      "label": "Browse components",
      "modifier": "cfa-button usa-button--big usa-button--outline",
      "href": "{{ config.baseUrl }}components",
      "postfix": "{{ config.baseUrl }}assets/img/sprite.svg#arrow_forward"
    }
  ]
}{% endcapture %}{% component 'button' context %}
