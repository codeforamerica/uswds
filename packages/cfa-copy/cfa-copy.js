'use strict';

/**
 * Copy to Clipboard Helper
 */
class Copy {
  /**
   * @constructor
   *
   * @param   {Object}  s  The settings object, may include 'selector',
   *                       'aria', 'notifyTimeout', 'before', 'copied',
   *                       or 'after' attributes.
   *
   * @return  {Class}      The constructed instance of Copy.
   */
  constructor(s = {}) {
    // Set attributes
    this.selector = (s.hasOwnProperty('selector')) ? s.selector : Copy.selector;

    this.selectors = (s.hasOwnProperty('selectors')) ? s.selectors : Copy.selectors;

    this.message = (s.hasOwnProperty('message')) ? s.message : Copy.message;

    this.notifyTimeout = (s.hasOwnProperty('notifyTimeout')) ? s.notifyTimeout : Copy.notifyTimeout;

    this.before = (s.hasOwnProperty('before')) ? s.before : Copy.before;

    this.copied = (s.hasOwnProperty('copied')) ? s.copied : Copy.copied;

    this.after = (s.hasOwnProperty('after')) ? s.after : Copy.after;

    // Select the entire text when it's focused on
    document.querySelectorAll(this.selectors.TARGETS).forEach(item => {
      item.addEventListener('focus', () => this.select(item));
      item.addEventListener('click', () => this.select(item));
    });

    // The main click event for the class
    document.querySelector('body').addEventListener('click', event => {
      if (!event.target.matches(this.selector))
        return;

      this.element = event.target;

      this.elementMessage = (this.element.nextElementSibling.matches(this.selectors.MESSAGE))
        ? this.element.nextElementSibling : null;

      this.target = this.element.dataset.copy;

      this.before(this);

      if (this.copy(this.target)) {
        this.copied(this);

        if (this.elementMessage) {
          this.elementMessage.innerText = this.message;
        }

        clearTimeout(this.element['timeout']);

        this.element['timeout'] = setTimeout(() => {
          if (this.elementMessage) {
            this.elementMessage.innerText = '';
          }

          this.after(this);
        }, this.notifyTimeout);
      }
    });

    return this;
  }

  /**
   * The click event handler
   *
   * @param   {String}  target  Content of target data attribute
   *
   * @return  {Boolean}         Wether copy was successful or not
   */
  copy(target) {
    let selector = this.selectors.TARGETS.replace(']', `="${target}"]`);

    let input = document.querySelector(selector);

    this.select(input);

    if (navigator.clipboard && navigator.clipboard.writeText)
      navigator.clipboard.writeText(input.value);
    else if (document.execCommand)
      document.execCommand('copy');
    else
      return false;

    return true;
  }

  /**
   * Handler for the text selection method
   *
   * @param   {Object}  input  The input with content to select
   */
  select(input) {
    input.select();

    input.setSelectionRange(0, 99999);
  }
}

/**
 * The main element selector.
 *
 * @var {String}
 */
Copy.selector = '[data-js*="copy"]';

/**
 * The selectors for various elements queried by the utility. Refer to the
 * source for defaults.
 *
 * @var {Object}
 */
Copy.selectors = {
  TARGETS: '[data-copy-target]',
  MESSAGE: '[data-copy="message"]',
  ICON: '[data-copy="icon"]'
};

/**
 * The message that is asserted when the copy is successful.
 *
 * @var {String}
 */
Copy.message = 'Copied!';

/**
 * Timeout for the "Copied!" notification.
 *
 * @var {Number}
 */
Copy.notifyTimeout = 1500;

/**
 * Before hook. Triggers before the click event.
 *
 * @var {Function}
 */
Copy.before = () => {};

/**
 * Copied hook. Triggers after a successful the copy event.
 *
 * @var {Function}
 */
Copy.copied = () => {};

/**
 * After hook. Triggers after the click event.
 *
 * @var {Function}
 */
Copy.after = () => {};

export default Copy;
