---
title: Recover from errors
layout: examples
body: bg-base-lightest
---

{% capture toolbar %}{
  "alert": {
    "modifier": "cfa-alert cfa-site-alert usa-alert--error margin-0 border-top-0 border-x-0",
    "role": "alert",
    "body": "<p>Some required questions aren’t filled or we can’t accept some of the answers. We’ll be able to continue with your application once the issues are addressed.</p>"
  },
  "skipNav": "#main-content",
  "container": {
    "modifier": "tablet:padding-y-2"
  },
  "home": {
    "href": "{{ config.baseUrl }}"
  },
  "logo": {
    "alt": {
      "modifier": "usa-sr-only",
      "text": "Code for America"
    },
    "default": {
      "href": "#logo-cfa-stacked",
      "style": "width: 101px; height: 82px"
    },
    "tablet": {
      "href": "#logo-cfa-long",
      "style": "width: 161px; height: 49px"
    }
  },
  "chat": "{{ config.baseUrl }}assets/img/sprite.svg#chat",
  "languageSelector": "{{ config.baseUrl }}assets/img/sprite.svg#translate"
}{% endcapture %}

{% capture formCard %}{
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

{% capture footer %}{
  "modifier": "",
  "returnToTop": "#",
  "navigation": {
    "ariaLabel": "Footer navigation",
    "items": [
      {
        "label": "Site map",
        "href": "#"
      },
      {
        "label": "Privacy policy",
        "href": "https://en.wikipedia.org/wiki/Privacy_policy",
        "target": "_blank",
        "rel": "noopener nofollow",
        "modifier": "usa-link--external"
      },
      {
        "label": "Terms of service",
        "href": "https://en.wikipedia.org/wiki/Terms_of_service",
        "target": "_blank",
        "rel": "noopener nofollow",
        "modifier": "usa-link--external"
      }
    ]
  },
  "home": {
    "href": "{{ config.baseUrl }}"
  },
  "logo": {
    "alt": {
      "modifier": "usa-sr-only",
      "text": "Code for America"
    },
    "default": {
      "href": "#logo-cfa-stacked",
      "style": "width: 101px; height: 82px"
    },
    "tablet": {
      "href": "#logo-cfa-long",
      "style": "width: 161px; height: 49px"
    }
  },
  "identifier": {
    "modifier": "cfa-font-smooth",
    "identity": {
      "ariaLabel": "Agency identifier",
      "domain": "domain.gov",
      "disclaimer": "This service was built by Code for America in partnership with Domain.gov on behalf of the people of the United States of America."
    },
    "requiredLinks": {
      "ariaLabel": "Important links",
      "items": [
        {
          "label": "About Code for America",
          "href": "https://codeforamerica.org",
          "target": "_blank",
          "rel": "noopener nofollow",
          "modifier": "usa-link--external"
        },
        {
          "label": "Diversity, Equity, & Inclusion",
          "href": "https://codeforamerica.org/about-us/diversity-equity-inclusion",
          "target": "_blank",
          "rel": "noopener nofollow",
          "modifier": "usa-link--external"
        }
      ]
    },
    "governmentSection": {
      "ariaLabel": "Domain.gov government information and services",
      "description": "Looking for government information and services?",
      "link": {
        "label": "Visit domain.gov",
        "href": "https://get.gov",
        "target": "_blank",
        "rel": "noopener nofollow",
        "modifier": "usa-link--external"
      }
    }
  }
}{% endcapture %}

{% component 'toolbar' toolbar %}

<main>
  <section class="grid-container usa-section">
    <div class="maxw-tablet margin-x-auto padding-bottom-4">
      <a href="#">Go back</a>
    </div>
    {% component 'form-card' formCard %}
  </section>
</main>

{% component 'footer' footer %}
