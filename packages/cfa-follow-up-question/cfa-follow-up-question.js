'use strict';

class FollowUpQuestion {
  /**
   * Follow up constructor
   *
   * @param   {Object}  s  Optional settings configuration
   *
   * @return  {Object}     Instance of FollowUpQuestion
   */
  constructor(s = {}) {
    this.selector = s.selector ? s.selector : FollowUpQuestion.selector;

    this.elFocusable = s.elFocusable ? s.elFocusable : FollowUpQuestion.elFocusable;

    this.elDisabled = s.elDisabled ? s.elDisabled : FollowUpQuestion.elDisabled;

    this.ariaExpanded = s.ariaExpanded ? s.ariaExpanded : FollowUpQuestion.ariaExpanded;

    this.index = s.index ? s.index : FollowUpQuestion.index;

    this.show = s.show ? s.show : this.show;

    this.hide = s.hide ? s.hide : this.hide;

    this.init();

    document.querySelector('body')
      .addEventListener('change', event => {
        if (event.target.matches(this.selector)) {
          this.toggle();
        }
    });

    return this;
  }

  /**
   * Initializes the follow up trigger and target region
   *
   * @return  {Object}  Instance of FollowUpQuestion
   */
  init() {
    let triggers = document.querySelectorAll(this.selector);

    for (let i = 0; i < triggers.length; i++) {
      if (triggers[i].dataset.ariaControls) {
        let trigger = triggers[i];
        let target = document.getElementById(trigger.dataset.ariaControls);
        let checked = trigger.getAttribute('checked') ? true : false;

        if (false === checked) {
          this.hide(target);
        }

        trigger.setAttribute('aria-controls', trigger.dataset.ariaControls);

        if (this.ariaExpanded) {
          trigger.setAttribute('aria-expanded', checked);
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
   * @return  {Object}           Instance of FollowUpQuestion
   */
  toggle() {
    let triggers = document.querySelectorAll(this.selector);

    for (let i = 0; i < triggers.length; i++) {
      let trigger = triggers[i];

      if (null === trigger.getAttribute('aria-controls')) continue;

      let target = document.getElementById(trigger.dataset.ariaControls);
      let checked = trigger.checked;

      if (checked) {
        this.show(target);
      } else {
        this.hide(target);
      }

      if (this.ariaExpanded) {
        trigger.setAttribute('aria-expanded', checked);
      }
    }

    return this;
  }

  /**
   * Method for hiding the follow up target region
   *
   * @param   {Object}  target  Node element of the target region
   *
   * @return  {Object}          Instance of FollowUpQuestion
   */
  hide(target) {
    target.setAttribute('hidden', '');

    // Set potentially focusable contents tabindex to -1
    this.index(target.querySelectorAll(this.elFocusable.join(', ')));

    // Set child inputs to disabled
    this.disable(target.querySelectorAll(this.elDisabled.join(', ')));

    return this;
  }

  /**
   * Method for showing the follow up target region
   *
   * @param   {Object}  target  Node element of the target region
   *
   * @return  {Object}          Instance of FollowUpQuestion
   */
  show(target) {
    target.removeAttribute('hidden');

    // Remove potentially focusable contents tabindex
    this.index(target.querySelectorAll(this.elFocusable.join(', ')), true);

    // Enable child inputs
    this.disable(target.querySelectorAll(this.elDisabled.join(', ')), true);

    return this;
  }

  /**
   * Method for enabling or disabling form elements within the target region.
   *
   * @param   {NodeList}  elements  Elements to enable or disable
   * @param   {Boolean}   enable    Wether to enable or disable elements
   *
   * @return  {Object}              Instance of FollowUpQuestion
   */
  disable(elements, enable = false) {
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];

      if (enable) {
        element.removeAttribute('disabled');
      } else {
        element.setAttribute('disabled', '');
      }
    }

    return this;
  }
}

/** @type  {String}  The main selector for the follow up question component event listening */
FollowUpQuestion.selector = '[data-js="follow-up-question"]';

/** @type  {Array}  A list of potentially focusable element selectors */
FollowUpQuestion.elFocusable = [
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
FollowUpQuestion.index = (elements, index = false) => {
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

/** @type  {Array}  A list of form elements that can be disabled */
FollowUpQuestion.elDisabled = [
  'button', 'fieldset', 'select', 'textarea', 'input'
];

/** @type  {Boolean}  Wether to add the aria-expanded attribute to the radio button, which at the time of authoring, is an invalid use of aria */
FollowUpQuestion.ariaExpanded = false;

export default FollowUpQuestion;
