# Design Tokens Test

This is a demonstration of the Code for America, U.S. Web Design System (USWDS) theme. Design tokens and styles from the Honeycrisp design system are applied to USWDS settings.

## Installing

These notes are a high-level overview during this package's pre-release phase. More detailed instructions will be added in the first official release.

1. Install this package and the USWDS package as dependencies using npm.

1. Configure Sass include paths.

1. Add imports to project Sass entrypoint.

1. Compile Sass to /static/assets/css.

1. Copy the static /dist/img directory to the static/assets directory.

1. Copy the static /dist/js file into the static/assets directory.

1. Fonts do not have to be copied into the static directory since the theme uses the system font but this would be done if desired. Copy the static /dist/fonts.

1. Link to stylesheet and JavaScript files in the head once they are in the static directory.

## Contributing

### Requirements:

* Node
* NPM

### Getting started

Clone the repository and move into the project.

```
git clone https://github.com/codeforamerica/design-tokens-test.git && cd design-tokens-test
```

Install dependencies (if using NVM, you may set the supported Node version number using `nvm use` before running the following command).

```
npm install
```

Run `npm start`[*](/#ref) to start development. `npx` is used to run development dependencies without including them in the package. When the commands are first run, it will ask whether to install the required package or not.

<span id="ref">*</span>Serve the static demo site, compile 11ty view directory files when they change, and compile USWDS theme directory styles when they change.

### Commands

Commands can be run with or without package version constraints.

Compile USWDS with the custom theme.

```
npx gulp@4.0.2 compile
```

Watch USWDS theme styles and compile assets.

```
npx gulp@4.0.2 watch
```

Compile demo using 11ty.

```
npx @11ty/eleventy@2.0.0
```

Serve the static demo and watch view files for changes.

```
npx @11ty/eleventy@2.0.0 --serve
```
