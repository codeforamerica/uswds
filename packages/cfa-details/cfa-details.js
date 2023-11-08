'use strict';

class Details {
  /**
   * Details constructor
   *
   * @param   {Object}  s  Optional settings configuration
   *
   * @return  {Object}     Instance of Details
   */
  constructor(s = {}) {
    this.selector = s.selector ? s.selector : Details.selector;

    this.elFocusable = s.elFocusable ? s.elFocusable : Details.elFocusable;

    this.index = s.index ? s.index : Details.index;

    this.show = s.show ? s.show : this.show;

    this.hide = s.hide ? s.hide : this.hide;

    this.init();

    document.querySelector('body')
      .addEventListener('click', event => {
        if (event.target.matches(this.selector)) {
          this.toggle(event.target);
        }
    });

    return this;
  }

  /**
   * Initializes the follow up trigger and target region
   *
   * @return  {Object}  Instance of Details
   */
  init() {
    let triggers = document.querySelectorAll(this.selector);

    for (let i = 0; i < triggers.length; i++) {
      let trigger = triggers[i];

      if (trigger.dataset.ariaControls) {
        let controls = trigger.getAttribute('data-aria-controls');
        let target = document.getElementById(controls);
        let expanded = (trigger.getAttribute('data-aria-expanded') == 'true') ? true : false; // parent open

        trigger.setAttribute('aria-controls', controls);
        trigger.setAttribute('aria-expanded', expanded);

        trigger.removeAttribute('data-aria-controls');
        trigger.removeAttribute('data-aria-expanded');

        if (target && false === expanded) {
          this.hide(target);
        }
      }
    }

    return this;
  }

  /**
   * Main toggling method that checks all follow up triggers to ensure they
   * are properly hidden or shown.
   *
   * @param   {Object}  trigger  The node element that triggered the toggle
   *
   * @return  {Object}           Instance of Details
   */
  toggle(trigger) {
    if (trigger.getAttribute('aria-controls')) {
      let target = document.getElementById(trigger.getAttribute('aria-controls'));
      let expanded = (trigger.getAttribute('aria-expanded') === 'true');

      if (target && expanded) {
        this.hide(target);

        trigger.setAttribute('aria-expanded', 'false');
      } else if (target) {
        this.show(target);

        trigger.setAttribute('aria-expanded', 'true');
      }
    }

    return this;
  }

  /**
   * Method for hiding the details target region
   *
   * @param   {Object}  target  Node element of the target region
   *
   * @return  {Object}          Instance of Details
   */
  hide(target) {
    target.setAttribute('hidden', '');

    // Set potentially focusable contents tabindex to -1
    this.index(target.querySelectorAll(this.elFocusable.join(', ')));

    return this;
  }

  /**
   * Method for showing the details target region
   *
   * @param   {Object}  target  Node element of the target region
   *
   * @return  {Object}          Instance of Details
   */
  show(target) {
    target.removeAttribute('hidden');

    // Remove potentially focusable contents tabindex
    this.index(target.querySelectorAll(this.elFocusable.join(', ')), true);

    return this;
  }
}

/** @type  {String}  The main selector for the follow up question component event listening */
Details.selector = '[data-js="details"]';

/** @type  {Array}  A list of potentially focusable element selectors */
Details.elFocusable = [
  'a', 'button', 'input', 'select', 'textarea', 'object', 'embed', 'form',
  'fieldset', 'legend', 'label', 'area', 'audio', 'video', 'iframe', 'svg',
  'details', 'table', '[tabindex]', '[contenteditable]', '[usemap]'
];

/**
 * Method for adding or removing potentially focusable elements from the
 * dom tabbing order within the target region.
 *
 * @param   {NodeList}  elements  Elements to index
 * @param   {Boolean}   index     Wether to index elements or not
 *
 * @return  {Object}              The indexed elements
 */
Details.index = (elements, index = false) => {
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];

    if (index) {
      let dataDefault = element.getAttribute(`data-js-tabindex`);

      if (dataDefault) {
        element.setAttribute('tabindex', dataDefault);
      } else {
        element.removeAttribute('tabindex');
      }
    } else {
      element.setAttribute('tabindex', '-1');
    }
  };

  return elements;
}

export default Details;
