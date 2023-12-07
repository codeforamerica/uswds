const { registerTransforms } = require('@tokens-studio/sd-transforms');
const StyleDictionary = require('style-dictionary');

/**
 * Register a custom transformation to preserve tokens references as token strings.
 */
StyleDictionary.registerTransform({
  name: 'cfa-uswds-theme/tokens',
  type: 'value',
  transitive: true,
  matcher: token => {
    return typeof token.original.value === 'string' &&
      token.original.value.includes('{')
  },
  transformer: token => {
    return token.original.value
      .replace('{', '\'').replace('}', '\'');
  }
});

/**
 * Configure and register Tokens Studio transformations
 */
registerTransforms(StyleDictionary, {
  excludeParentKeys: true,
  casing: 'kebab'
});

/**
 * Style Dictionary extend
 */
const theme = StyleDictionary.extend({
  source: ['src/tokens/index.json'],
  platforms: {
    scss: {
      transforms: [
        'cfa-uswds-theme/tokens',
        'content/quote',
        'ts/descriptionToComment',
        'ts/size/px',
        'ts/opacity',
        'ts/size/lineheight',
        'ts/typography/fontWeight',
        'ts/resolveMath',
        'ts/size/css/letterspacing',
        'ts/typography/css/fontFamily',
        'ts/typography/css/shorthand',
        'ts/border/css/shorthand',
        'ts/shadow/css/shorthand',
        'ts/color/css/hexrgba',
        'ts/color/modifiers',
        'name/cti/kebab',
      ],
      buildPath: 'packages/',
      files: [{
        destination: 'cfa-uswds-theme/_tokens.scss',
        format: 'scss/variables'
      }]
    }
  }
});

theme.buildAllPlatforms();
