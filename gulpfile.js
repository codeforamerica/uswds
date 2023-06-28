/**
 * Dependencies
 */

const uswds = require('@uswds/compile');
const { series } = require("gulp");
const package = require('./package.json');
const execSync = require('child_process').execSync;

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
exports.copySetup = cb => {
  console.log(`[${package.name}] copySetup is modified to prevent overwriting theme files.`);

  cb();
};

/**
 * Prevent copyAll from overwriting theme files.
 *
 * @param  {Function}  cb  Async callback passed from the previous Gulp pipe.
 */
exports.copyAll = cb => {
  console.log(`[${package.name}] copyAll is modified to prevent overwriting theme files.`);

  // uswds.copyAssets();
  // or
  uswds.copyFonts();
  uswds.copyImages();
  uswds.copyJS();

  cb();
};

/**
 * Execute npm script for rollup script
 *
 * @return  {String}  Exec sync stdout
 */
exports.compileJavaScript = () => {
  try {
    const stdout = execSync('npm run rollup');

    console.log(stdout.toString());

    return stdout;
  } catch (err) {
    console.log(`[${package.name}] Compile JavaScript failing: ${err}`);
  }
};

/**
 * Prevent init from overwriting theme files.
 *
 * @param  {Function}  cb  Async callback passed from the previous Gulp pipe.
 */
exports.init = cb => {
  console.log(`[${package.name}] init is modified to prevent overwriting theme files.`);

  uswds.compile();

  cb();
};

/**
 * Extend USWDS compile with custom JavaScript compile
 *
 * @param  {Function}  cb  Async callback passed from the previous Gulp pipe.
 */
exports.compile = cb => {
  uswds.compile();

  exports.compileJavaScript();

  cb();
};

/**
 * [watch description]
 *
 * @var {Function}
 */

// console.dir(uswds.watch);
exports.watch = uswds.watch;
// series(exports.watch, buildS/ass, watchSass);
