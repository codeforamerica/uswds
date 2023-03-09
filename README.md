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

Compile USWDS with the custom theme.

```
npx gulp compile
```

Compile demo using 11ty.

```
npx @11ty/eleventy@2.0.0
```

Serve the static demo

```
npx @11ty/eleventy@2.0.0 --serve
```
