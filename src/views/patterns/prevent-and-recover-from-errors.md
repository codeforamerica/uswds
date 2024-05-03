---
tags: pattern
title: Prevent and recover from errors
layout: default
story: Validation lets me know when I’ve missed something or provided the wrong information in an online form
sublist: [
  {
    anchor: 'constraints',
    title: 'Constraints'
  },
  {
    anchor: 'prevent-errors',
    title: 'Prevent errors'
  },
  {
    anchor: 'recover-from-errors',
    title: 'Recover from errors'
  }
]
thumbnail: assets/site/thumbnail-prevent-and-recover-from-errors.png
thumbnail_description: An illustration of a required form group component.
---

<!-- INTRO -->

Validation patterns in forms assist users in skipping or entering information that doesn’t match a specified format. The best applications prevent users from encountering these errors in the first place or provide more permissive entry formats. However, validation is often a necessary stop-gap solution to ensuring that the most accurate information is provided.

There are many scenarios that require different approaches to good validation. The two main considerations for all approaches are;

**Prevent users from encountering validation as much as possible**. While often necessary, consider form validation something to be avoided. Be as accommodating as possible, whether that means re-evaluating optional questions, loosening the restrictions on responses to questions (doing more parsing in the back end), or providing clear and helpful context to enable users to provide the right information on their first attempt.

**Provide a way out to help users recover from errors**. Ensure everyone, including sighted, unsighted, low-vision users, or users with cognitive disabilities, can read, understand, and follow instructions to recover from errors raised through validation.

## Constraints {#constraints}

The pattern described here works within a few constraints.

**Validation happens after the screen is submitted**. In an ideal scenario, validation occurs before the screen is submitted. This solution reduces the burden on engineers to maintain JavaScript that would normally support the interactivity required for front-end validation. This recommendation will ensure WCAG 2.1 AA success criteria.

**This guidance is mostly agnostic to any design system**. It is mostly written with the Honeycrisp Design System or the USWDS in mind but the annotations only illustrate code related to accessibility, not styling.

## Prevent errors {#prevent-errors}

Illustrate which questions are required. Use the required attribute on required inputs. If a question is optional, consider whether it needs to be asked. If it does, mark it as optional.
Use the appropriate input types that suggest formatting for answers. For example, text for generic alpha-numeric answers, email for email addresses, phone for phone numbers, memorable dates, etc.

Provide text to help users understand special formatting. This is text underneath the question label (help text).

Disabled buttons can prevent the applicant from skipping required questions. Ensure you have provided an affordance for sighted and screen-reader users as to why the button is disabled.

**Relevant WCAG 2.1 Criteria**

* <a href="https://www.w3.org/WAI/WCAG21/quickref/#qr-content-structure-separation-programmatic" target="_blank" rel="noopener nofollow" class="usa-link--external">1.3.1 Info and Relationships</a> (Level A)
* <a href="https://www.w3.org/WAI/WCAG22/quickref/#sensory-characteristics" target="_blank" rel="noopener nofollow" class="usa-link--external">1.3.3 Sensory Characteristics</a> (Level A)
* <a href="https://www.w3.org/WAI/WCAG21/quickref/#qr-navigation-mechanisms-descriptive" target="_blank" rel="noopener nofollow" class="usa-link--external">2.4.6 Headings and Labels</a> (Level AA)
* <a href="https://www.w3.org/WAI/WCAG21/quickref/#qr-minimize-error-cues" target="_blank" rel="noopener nofollow" class="usa-link--external">3.3.2 Labels or Instructions</a> (Level A)
* <a href="https://www.w3.org/WAI/WCAG21/quickref/#qr-ensure-compat-rsv" target="_blank" rel="noopener nofollow" class="usa-link--external">4.1.2 Name, Role, Value</a> (Level A)
* <a href="https://www.w3.org/WAI/tutorials/forms/instructions/" target="_blank" rel="noopener nofollow" class="usa-link--external">Read more about accessible form instructions here</a>

{% capture context %}{
  "items": [
    {
      "label": "View the prevent errors example",
      "modifier": "cfa-button usa-button--big usa-button--outline",
      "href": "{{ config.baseUrl }}examples/prevent-errors",
      "postfix": "{{ config.baseUrl }}assets/img/sprite.svg#arrow_forward"
    }
  ]
}{% endcapture %}{% component 'button' context %}

## Recover from errors {#recover-from-errors}

Change the page title so it isn’t the same as the previous page and users know there are errors.

Provide an alert with a summary of validation errors at the top of the page. This should be the very first element, before the skip link, so it is read when the page is opened.

Follow the good message outline.

1. Say what happened
1. Provide reassurance
1. Give them a way out

Provide jump links to each error label or to the first error in the form.

Structure each invalid question so that its validation message is positioned before the invalid input and reads in logical order from top to bottom.

Use the aria-invalid attribute on invalid inputs.

**Relevant WCAG 2.1 Criteria**

* <a href="https://www.w3.org/WAI/WCAG21/quickref/#qr-minimize-error-identified" target="_blank" rel="noopener nofollow" class="usa-link--external">3.3.1 Error Identifications (Level A)</a>
* <a href="https://www.w3.org/WAI/WCAG21/quickref/#qr-minimize-error-suggestions" target="_blank" rel="noopener nofollow" class="usa-link--external">3.3.3 Error Suggestion (Level AA)</a>
* <a href="https://www.w3.org/WAI/WCAG21/quickref/#qr-minimize-error-reversible" target="_blank" rel="noopener nofollow" class="usa-link--external">3.3.4 Error Prevention (Legal, Financial, Data) (Level AA)</a>
* <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#status-messages" target="_blank" rel="noopener nofollow" class="usa-link--external">4.1.3 Status Messages (Level AA)</a>
* <a href="https://www.w3.org/WAI/tutorials/forms/notifications/" target="_blank" rel="noopener nofollow" class="usa-link--external">Read more about accessible user notification here</a>
* <a href="https://www.w3.org/WAI/tutorials/forms/validation/" target="_blank" rel="noopener nofollow" class="usa-link--external">Read more about accessible input validation here</a>

{% capture context %}{
  "items": [
    {
      "label": "View the recover from errors example",
      "modifier": "cfa-button usa-button--big usa-button--outline",
      "href": "{{ config.baseUrl }}examples/recover-from-errors",
      "postfix": "{{ config.baseUrl }}assets/img/sprite.svg#arrow_forward"
    }
  ]
}{% endcapture %}{% component 'button' context %}
