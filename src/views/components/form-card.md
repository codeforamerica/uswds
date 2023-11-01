---
tags: component
title: Form card
layout: default
story: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
url_uswds: https://designsystem.digital.gov/components/form
url_uswds_guidance: https://designsystem.digital.gov/components/form
url_uswds_usage: https://designsystem.digital.gov/components/form
nice_uswds: Form
url_honeycrisp: http://honeycrisp.herokuapp.com/cfa/styleguide#organisms-form_card_1
nice_honeycrisp: Form card organism
modifier_honeycrisp: ['.cfa-form-card', '.cfa-form', '.cfa-form-card__graphic', '.cfa-form-card__heading', '.cfa-form-card__help-message', '.cfa-form-card__header-alert', '.cfa-form-card__content', '.cfa-form-card__input-select-group', '.cfa-form-card__footer']
design_honeycrisp: https%3A%2F%2Fwww.figma.com%2Ffile%2FsQQqaoeuOPpm43wLlYfyEo%2FHoneycrisp-Design-System%3Ftype%3Ddesign%26node-id%3D6129%253A521%26mode%3Ddesign%26t%3DvzQiHaQRkv72JvWh-1
tokens: false
styles: true
---

<!-- INTRO -->

Form cards enable users to easily progress through complex forms by providing a single-page presentation of important questions and form sections. {.usa-prose}

<!-- DETAILS -->

{% capture details_custom %}
The {{ title }} is a custom component that extends the <a href="{{ url_uswds }}" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS {{ nice_uswds }}</a>. It includes the <a href="{{ config.baseUrl }}components/alert/">alert component</a>, <a href="{{ config.baseUrl }}components/form-group/">form group component</a>, <a href="{{ config.baseUrl }}/components/fieldset">fieldset component</a>, <a href="{{ config.baseUrl }}/components/button">button component</a>, and any other components necessary to create a form. The visual appearance uses <b>design tokens</b> from the Honeycrisp <a href="http://honeycrisp.herokuapp.com/cfa/styleguide#molecules-form_group" target="_blank" rel="noopener nofollow" class="usa-link--external">{{ nice_honeycrisp }}</a>. Further customization is applied using the <b>CSS modifiers</b> {% for modifier in modifier_honeycrisp %}<code>{{ modifier }}</code>{% if forloop.index != forloop.length %}, {% endif %}{% endfor %} to add <b>styles</b> defined in a custom stylesheet.
{% endcapture %}

{% render 'details.md',
  name: title,
  url_uswds: url_uswds,
  url_uswds_usage: url_uswds_usage,
  nice_uswds: nice_uswds,
  url_honeycrisp: url_honeycrisp,
  nice_honeycrisp: nice_honeycrisp,
  tokens: tokens,
  styles: styles,
  modifier_honeycrisp: modifier_honeycrisp,
  details_custom: details_custom,
  dictionary: dictionary,
  config: config %}

<!-- EXAMPLES -->

## Examples {#examples}

{% capture id %}{% createId %}{% endcapture %}
{% capture id_first_name %}{% createId %}{% endcapture %}
{% capture id_last_name %}{% createId %}{% endcapture %}
{% capture id_birthday %}{% createId %}{% endcapture %}
{% capture id_gender %}{% createId %}{% endcapture %}
{% capture id_residency_within_year %}{% createId %}{% endcapture %}

{% capture context %}{
  "form": {
    "modifier": "cfa-form"
  },
  "graphic": "{{ config.baseUrl }}assets/img/sprite.svg#person",
  "header": {
    "heading": {
      "text": "Tell us about yourself"
    }
  },
  "formGroups": [
    {
      "modifier": "cfa-form-group",
      "id": "form-group-{{ id_first_name }}",
      "label": {
        "text": "What is your first name?",
        "for": "input-{{ id_first_name }}",
        "modifier": "cfa-label",
        "modifierHint": "cfa-hint"
      },
      "hint": {
        "text": "Legally as it appears on your I.D.",
        "modifier": "cfa-hint",
        "id": "hint-{{ id_first_name }}"
      },
      "input": {
        "modifier": "cfa-input",
        "id": "input-{{ id_first_name }}",
        "name": "input['{{ id_first_name }}']",
        "ariaDescribedby": "hint-{{ id_first_name }}",
        "type": "text",
        "required": "true"
      }
    },
    {
      "modifier": "cfa-form-group usa-form-group--error",
      "id": "form-group-{{ id_last_name }}",
      "label": {
        "text": "What is your last name?",
        "for": "input-{{ id_last_name }}",
        "modifier": "cfa-label",
        "modifierHint": "cfa-hint"
      },
      "hint": {
        "text": "Legally as it appears on your I.D.",
        "modifier": "cfa-hint",
        "id": "hint-{{ id_last_name }}"
      },
      "error": {
        "text": "This field is required",
        "id": "error-message-{{ id }}",
        "role": "alert"
      },
      "input": {
        "modifier": "cfa-input",
        "id": "input-{{ id_last_name }}",
        "name": "input['{{ id_last_name }}']",
        "ariaDescribedby": "hint-{{ id_last_name }}",
        "type": "text",
        "required": "true"
      }
    },
    {
      "modifier": "cfa-memorable-date",
      "memorableDate": "true",
      "fieldset": {
        "modifier": "cfa-fieldset",
        "hint": {
          "text": "For example January / 1 / 2000",
          "id": "hint-{{ id_birthday }}",
          "modifier": "cfa-hint"
        },
        "legend": {
          "text": "What is your date of birth?",
          "modifier": "cfa-legend",
          "modifierHint": "cfa-hint"
        }
      },
      "month": {
        "type": "select",
        "modifier": "usa-form-group--month usa-form-group--select",
        "id": "month-{{ id_birthday }}",
        "label": {
          "text": "Month",
          "for": "month-{{ id_birthday }}",
          "modifier": "cfa-label text-normal",
          "modifierHint": "cfa-hint"
        },
        "selectEl": {
          "modifier": "cfa-select",
          "id": "month-{{ id_birthday }}",
          "name": "month['{{ id_birthday }}']",
          "required": "true",
          "ariaDescribedby": "hint-{{ id_birthday }}",
          "default": {
            "label": "Click to select month",
            "selected": "true"
          },
          "options": [
            {
              "label": "---",
              "disabled": "true"
            },
            {
              "value": "1",
              "label": "01 - January"
            },
            {
              "value": "2",
              "label": "02 - February"
            },
            {
              "value": "3",
              "label": "03 - March"
            },
            {
              "value": "4",
              "label": "04 - April"
            },
            {
              "value": "5",
              "label": "05 - May"
            },
            {
              "value": "6",
              "label": "06 - June"
            },
            {
              "value": "7",
              "label": "07 - July"
            },
            {
              "value": "8",
              "label": "08 - August"
            },
            {
              "value": "9",
              "label": "09 - September"
            },
            {
              "value": "10",
              "label": "10 - October"
            },
            {
              "value": "11",
              "label": "11 - November"
            },
            {
              "value": "12",
              "label": "12 - December"
            }
          ]
        }
      },
      "day": {
        "modifier": "usa-form-group--day",
        "id": "form-group-{{ id_birthday }}",
        "label": {
          "text": "Day",
          "for": "day-{{ id_birthday }}",
          "modifier": "cfa-label text-normal",
          "modifierHint": "cfa-hint"
        },
        "input": {
          "modifier": "cfa-input",
          "id": "day-{{ id_birthday }}",
          "name": "day['{{ id_birthday }}']",
          "type": "text",
          "inputmode": "numeric",
          "maxlength": "2",
          "pattern": "[0-9]*",
          "required": "true",
          "ariaDescribedby": "hint-{{ id_birthday }}"
        }
      },
      "year": {
        "modifier": "usa-form-group--year",
        "id": "form-group-{{ id_birthday }}",
        "label": {
          "text": "Year",
          "for": "year-{{ id_birthday }}",
          "modifier": "cfa-label text-normal",
          "modifierHint": "cfa-hint"
        },
        "input": {
          "modifier": "cfa-input",
          "id": "year-{{ id_birthday }}",
          "name": "year['{{ id_birthday }}']",
          "type": "text",
          "inputmode": "numeric",
          "minlength": "4",
          "maxlength": "4",
          "pattern": "[0-9]*",
          "required": "true",
          "ariaDescribedby": "hint-{{ id_birthday }}"
        }
      }
    },
    {
      "modifier": "cfa-form-group",
      "id": "form-group-{{ id_gender }}",
      "label": {
        "text": "Which gender do you identify with?",
        "for": "input-{{ id_gender }}",
        "modifier": "cfa-label",
        "modifierHint": "cfa-hint"
      },
      "hint": {
        "text": "For example, man, woman, or non-binary.",
        "modifier": "cfa-hint",
        "id": "hint-{{ id_gender }}"
      },
      "input": {
        "modifier": "cfa-input",
        "id": "input-{{ id_gender }}",
        "name": "input['{{ id_gender }}']",
        "ariaDescribedby": "hint-{{ id_gender }}",
        "type": "text"
      }
    },
    {
      "modifier": "cfa-fieldset",
      "legend": {
        "text": "Did you move to the state within the last year?",
        "modifier": "cfa-legend",
        "modifierHint": "cfa-hint"
      },
      "options": [
        {
          "modifier": "cfa-radio",
          "id": "radio-{% createId %}",
          "name": "radio['{{ id_residency_within_year }}']",
          "type": "radio",
          "value": "yes",
          "label": "Yes",
          "input": {
            "modifier": "usa-radio__input--tile"
          }
        },
        {
          "modifier": "cfa-radio",
          "id": "radio-{% createId %}",
          "name": "radio['{{ id_residency_within_year }}']",
          "type": "radio",
          "value": "no",
          "label": "No",
          "input": {
            "modifier": "usa-radio__input--tile"
          }
        }
      ]
    }
  ],
  "footer": {
    "submit": [
      {
        "label": "Continue",
        "modifier": "cfa-form-card__footer-first-button cfa-button usa-button--big",
        "type": "submit"
      }
    ]
  }
}{% endcapture %}

{% render 'figure.md', name: 'form-card', nice: title, body: body, context: context, caption: 'Form card with multiple form groups and fieldsets' %}

{% capture id %}{% createId %}{% endcapture %}
{% capture id_street_address_line_1 %}{% createId %}{% endcapture %}
{% capture id_street_address_line_2 %}{% createId %}{% endcapture %}
{% capture id_city %}{% createId %}{% endcapture %}
{% capture id_state %}{% createId %}{% endcapture %}
{% capture id_zip_code %}{% createId %}{% endcapture %}

{% capture context %}{
  "form": {
    "modifier": "cfa-form"
  },
  "graphic": "{{ config.baseUrl }}assets/img/sprite.svg#home",
  "header": {
    "heading": {
      "text": "Where are you currently living?"
    }
  },
  "fieldset": {
    "modifier": "cfa-fieldset",
    "formGroups": [
      {
        "modifier": "cfa-form-group",
        "id": "form-group-{{ id_street_address_line_1 }}",
        "label": {
          "text": "Street address",
          "for": "input-{{ id_street_address_line_1 }}",
          "modifier": "cfa-label"
        },
        "input": {
          "modifier": "cfa-input",
          "id": "input-{{ id_street_address_line_1 }}",
          "name": "input['{{ id_street_address_line_1 }}']",
          "type": "text",
          "required": "true",
          "autocomplete": "address-line1"
        }
      },
      {
        "modifier": "cfa-form-group",
        "id": "form-group-{{ id_street_address_line_2 }}",
        "label": {
          "text": "Street address line 2",
          "for": "input-{{ id_street_address_line_2 }}",
          "modifier": "cfa-label"
        },
        "input": {
          "modifier": "cfa-input",
          "id": "input-{{ id_street_address_line_2 }}",
          "name": "input['{{ id_street_address_line_2 }}']",
          "type": "text",
          "required": "true",
          "autocomplete": "address-line2"
        }
      },
      {
        "modifier": "cfa-form-group",
        "id": "form-group-{{ id_city }}",
        "label": {
          "text": "City",
          "for": "input-{{ id_city }}",
          "modifier": "cfa-label"
        },
        "input": {
          "modifier": "cfa-input",
          "id": "input-{{ id_city }}",
          "name": "input['{{ id_city }}']",
          "type": "text",
          "required": "true",
          "autocomplete": "address-level2"
        }
      },
      {
        "modifier": "cfa-form-group",
        "id": "form-group-{{ id_state }}",
        "label": {
          "text": "State, territory, or military post",
          "for": "input-{{ id_state }}",
          "modifier": "cfa-label"
        },
        "input": {
          "modifier": "cfa-input usa-input--sm",
          "id": "input-{{ id_state }}",
          "name": "input['{{ id_state }}']",
          "type": "text",
          "required": "true",
          "maxlength": "2",
          "autocomplete": "address-level1"
        }
      },
      {
        "modifier": "cfa-form-group",
        "id": "form-group-{{ id_zip_code }}",
        "label": {
          "text": "ZIP code",
          "for": "input-{{ id_zip_code }}",
          "modifier": "cfa-label"
        },
        "input": {
          "modifier": "cfa-input usa-input--md",
          "id": "input-{{ id_zip_code }}",
          "name": "input['{{ id_zip_code }}']",
          "type": "text",
          "required": "true",
          "pattern": "[\\d]{5}(-[\\d]{4})?",
          "autocomplete": "postal-code"
        }
      }
    ]
  },
  "footer": {
    "submit": [
      {
        "label": "Continue",
        "modifier": "cfa-form-card__footer-first-button cfa-button usa-button--big",
        "type": "submit"
      }
    ]
  }
}{% endcapture %}

{% render 'figure.md', name: 'form-card', nice: title, body: body, context: context, caption: 'Form card with single question and multi-part text input fieldset' %}

{% capture id %}{% createId %}{% endcapture %}
{% capture id_alert_label %}{% createId %}{% endcapture %}

{% capture context %}{
  "form": {
    "modifier": "cfa-form"
  },
  "header": {
    "heading": {
      "id": "aria-lb-{{ id_alert_label }}",
      "text": "Confirm your address"
    },
    "alert": {
      "modifier": "cfa-form-card__header-alert cfa-alert usa-alert--warning",
      "role": "region",
      "labelledBy": "aria-lb-{{ id_alert_label }}",
      "text": "We couldn't find your address. To make sure you get mail from the county, you may edit your address or keep going. <a href=\"#\">Alternatively, click here to look up your county information</a>."
    }
  },
  "fieldset": {
    "modifier": "cfa-fieldset",
    "formGroups": [
      {
        "options": [
          {
            "modifier": "cfa-radio",
            "id": "radio-{% createId %}",
            "name": "radio['{{ id }}']",
            "type": "radio",
            "value": "suggested-address",
            "label": "Suggested address",
            "description": "4918 Webster St., Apt 2 <br> Oakland, CA <br> 94609",
            "checked": "true",
            "input": {
              "modifier": "usa-radio__input--tile"
            }
          },
          {
            "modifier": "cfa-radio",
            "id": "radio-{% createId %}",
            "name": "radio['{{ id }}']",
            "type": "radio",
            "value": "address-you-entered",
            "label": "Address you entered",
            "description": "4918 Webster Street <br> Apt 2 <br> Oakland, CA <br> 94609",
            "input": {
              "modifier": "usa-radio__input--tile"
            }
          }
        ]
      }
    ]
  },
  "footer": {
    "submit": [
      {
        "label": "Continue",
        "modifier": "cfa-form-card__footer-first-button cfa-button usa-button--big",
        "type": "submit"
      }
    ]
  }
}{% endcapture %}

{% render 'figure.md', name: 'form-card', nice: title, body: body, context: context, caption: 'Form card with single question, alert, and radios fieldset' %}

{% capture context %}{
  "form": {
    "modifier": "cfa-form"
  },
  "graphic": "{{ config.baseUrl }}assets/img/sprite.svg#phone",
  "header": {
    "heading": {
      "text": "Are you sure you want to leave your phone number blank?"
    }
  },
  "content": "<p>A caseworker may need to contact you by phone about your application. If you don't have a phone number, you can enter a friend or family member's phone number instead.</p>",
  "footer": {
    "submit": [
      {
        "label": "Add a phone number",
        "modifier": "cfa-form-card__footer-first-button cfa-button usa-button--big",
        "href": "#"
      }
    ],
    "skip": [
      {
        "label": "Continue without it",
        "modifier": "cfa-button usa-button--big usa-button--outline",
        "href": "#"
      }
    ]
  }
}{% endcapture %}

{% render 'figure.md', name: 'form-card', nice: title, body: body, context: context, caption: 'Form card with single question, continue, and skip links' %}

{% capture help_message_content %}

* Your spouse
* Your children
* Other family members
* Your domestic partner

{% endcapture %}

{% capture context %}{
  "form": {
    "modifier": "cfa-form"
  },
  "header": {
    "heading": {
      "text": "Do you live with any of these people?"
    }
  },
  "content": "{% md help_message_content %}",
  "footer": {
    "group": [
      {
        "label": "Yes",
        "check": true,
        "modifier": "cfa-button cfa-button--yes usa-button--big usa-button--outline",
        "href": "#"
      },
      {
        "label": "No",
        "cross": true,
        "modifier": "cfa-button cfa-button--no usa-button--big usa-button--outline ",
        "href": "#"
      }
    ]
  }
}{% endcapture %}

{% render 'figure.md', name: 'form-card', nice: title, body: body, context: context, caption: 'Form card with single question, yes, and no links' %}

## Guidance {#guidance}

The form card contains three major sections or slots that can be customized with additional content or components described below.

**Header**. This is the first section of the card that contains the following elements.
  * **Heading**. The overall question of the card that the form fields relate to.
  * **Help message**. Additional text that explains the question heading in further detail.
  * **Alert**. Including additional text in an alert helps emphasize the importance of the information being asked for in the card or provides the applicant with time-sensitive information.

**Content**. This is the main body of the form card that may contain any of the following types of content.
  * **Process expectations**. Expectations can be set for how long it takes an application to complete, the major steps of the application, or breakdowns of service offerings.
  * **Form element components**. Any form group component includes text inputs, text areas, selects, checkboxes, or radios.
  * **Detailed examples**. These may be sample answers, illustrations for hard-to-find information, or alternatives.
  * **Informational summaries**. These may include next-step summaries that set clear expectations for application submission follow-up.

**Footer**. This is the last section of the card that may contain any of the following elements in this order.

  1. **Continue button**. This primary element allows a user to submit the information asked for in a form card or progress to the next form card.
  1. **Skip button**. This gives the applicant time and flexibility in providing the information asked for in the form card.
  1. **Yes or no buttons**. Form cards with yes or no questions prevent applicants from answering irrelevant questions.
  1. **Subtle link**. This type of link enables applicants to take alternative actions with their applications that are allowed but discouraged.
  1. **Subtle text**. This type of text is used to reassure applicants to build trust, whether it's a note to remind them that we are securely protecting their personal information or a small alert to inform them that information has been sent to them.

**Form groups vs. Fieldsets**. The header and content sections may use a `fieldset` with a `legend` element for the heading when the form card contains form element components.

  * Form cards, with a combination of text inputs, text areas, selects, and checkbox group or radio group, will use the form group markup.
  * All other form cards may use the `fieldset` and `legend` markup.
    * Form cards with single text input, text area, select, checkbox group or radio group.
    * Form cards with multiple text inputs, text areas, or selects will use the fieldset markup.

{% capture ref_additional %}
1. <a href="https://designsystem.digital.gov/patterns/complete-a-complex-form/progress-easily" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Complete a complex form, Progress easily</cite> | U.S. Web Design System (USWDS)</a>
1. <a href="https://designsystem.digital.gov/templates/form-templates" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Templates, Form Templates</cite> | U.S. Web Design System (USWDS)</a>
1. <a href="https://designsystem.digital.gov/templates/authentication-pages" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Templates, Authentication Pages</cite> | U.S. Web Design System (USWDS)</a>
1. <a href="https://design.va.gov/templates/forms" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Templates, Form</cite> | VA.gov Design System</a>
1. <a href="https://design-system.service.gov.uk/patterns/question-pages" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Question Pages</cite> | GOV.UK Design System</a>
1. <a href="https://design-system.service.gov.uk/get-started/labels-legends-headings" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Making labels and legends headings</cite> | GOV.UK Design System</a>
{% endcapture %}

{% render 'references.md', ref_main: url_uswds_guidance, ref_additional: ref_additional, config: config %}

<!-- ACCESSIBILITY -->

{% render 'accessibility.md'
  nice: title,
  theme_passes: false,
  audit_passes: false,
  keyboard_passes: false,
  keyboard_test: 'No keyboard test has been created.',
  resize_passes: false,
  screen_reader_passes: false,
  screen_reader_tests: 'No screen reader test has been created.',
  guidance_passes: false,
  additional: false,
  config: config %}

<!-- DESIGN -->

{% render 'figma.md', url: design_honeycrisp %}

<!-- SOURCE -->

{% capture stylesheets %}
  {% capture packages %}@codeforamerica/uswds/packages{% endcapture %}
  {% capture stylesheet_form %}{% getFile 'form' 'stylesheet' %}{% endcapture %}

  <li>Form: <code>..{{ stylesheet_form | replace: packages, '' }}</code></li>
{% endcapture %}

{% capture stylesheets_import %}
@forward '{{ stylesheet_form }}'
{% endcapture %}

{% render 'source.md', name: 'form-card', nice: title, stylesheets: stylesheets, stylesheets_import: stylesheets_import, config: config, pckg: package %}
