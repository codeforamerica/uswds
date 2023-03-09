/**
 * Dependencies
 */

const uswds = require('@uswds/compile');

/**
 * @uswds/compile settings
 */

uswds.settings.version = 3;
uswds.paths.src.projectSass = './scss/';
uswds.paths.dist.theme = './scss/theme/';
uswds.paths.dist.img = './dist/uswds/img';
uswds.paths.dist.fonts = './dist/uswds/fonts';
uswds.paths.dist.js = './dist/uswds/js';
uswds.paths.dist.css = './dist/uswds/css';

/**
 * @uswds/compile exports
 *
 * @src https://designsystem.digital.gov/documentation/getting-started/developers/phase-two-compile/#step-6-export-compile-functions
 */

/**
 * Prevent copySetup from overwriting theme files.
 *
 * @param  {Function}  cb  Async callback passed from the previous Gulp pipe.
 */
exports.copySetup = (cb) => {
  console.log('[Design Tokens Test] copySetup is modified to prevent overwriting theme files.');

  cb();
};

/**
 * Prevent copyAll from overwriting theme files.
 *
 * @param  {Function}  cb  Async callback passed from the previous Gulp pipe.
 */
exports.copyAll = (cb) => {
  console.log('[Design Tokens Test] copyAll is modified to prevent overwriting theme files.');

  // uswds.copyAssets();
  // or
  uswds.copyFonts();
  uswds.copyImages();
  uswds.copyJS();

  cb();
};

/**
 * Prevent init from overwriting theme files.
 *
 * @param  {Function}  cb  Async callback passed from the previous Gulp pipe.
 */
exports.init = (cb) => {
  console.log('[Design Tokens Test] init is modified to prevent overwriting theme files.');

  uswds.compile();

  cb();
};

/**
 * [compile description]
 *
 * @var {[type]}
 */
exports.compile = uswds.compile;

/**
 * [watch description]
 *
 * @var {[type]}
 */
exports.watch = uswds.watch;
