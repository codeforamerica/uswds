# Design Tokens Test

This is a demonstration of the Code for America, U.S. Web Design System (USWDS) theme. Design tokens and styles from the Honeycrisp design system are applied to USWDS settings.

## Requirements:

* Node
* NPM

# Getting started

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

## Commands

Compile USWDS with the custom theme.

```
npx gulp compile
```

Watch USWDS theme styles and compile assets.

```
npx gulp watch
```

Compile demo using 11ty.

```
npx @11ty/eleventy@2.0.0
```

Serve the static demo and watch view files for changes.

```
npx @11ty/eleventy@2.0.0 --serve
```
