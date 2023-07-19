---
tags: component
title: Form Group
layout: default
intro:
url_uswds:
url_uswds_guidance:
url_uswds_usage:
nice_uswds:
url_honeycrisp: http://honeycrisp.herokuapp.com/cfa/styleguide#molecules-form_group
nice_honeycrisp: Form group molecule
modifier_honeycrisp: ['.cfa-form-group', '.cfa-label', '.cfa-hint', '.cfa-input-group', '.cfa-input', '.cfa-textarea', '.cfa-select']
design_honeycrisp:
tokens: true
styles: true
---

<!-- INTRO -->

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

<!-- DETAILS -->

{% capture details_custom %}
The {{ title }} includes the <a href="{{ config.baseUrl }}components/input">text input component</a>, <a href="{{ config.baseUrl }}components/textarea">textarea component</a>, <a href="{{ config.baseUrl }}components/select">select component</a>, and other components that do not have dedicated documentation in the USWDS (labels and hints). The visual appearance is modified using <b>design tokens</b> from the Honeycrisp <a href="http://honeycrisp.herokuapp.com/cfa/styleguide#atoms-form_elements" target="_blank" rel="noopener nofollow" class="usa-link--external">Form elements atom</a> and <a href="http://honeycrisp.herokuapp.com/cfa/styleguide#molecules-form_group" target="_blank" rel="noopener nofollow" class="usa-link--external">{{ nice_honeycrisp }}</a>. Further customization is applied using the <b>CSS modifiers</b> {% for modifier in modifier_honeycrisp %}<code>{{ modifier }}</code>{% if forloop.index != forloop.length %}, {% endif %}{% endfor %} to add <b>styles</b> defined in custom stylesheets.{% endcapture %}

{% render 'details.md',
  name: title,
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

{% capture context %}{
  "modifier": "cfa-form-group",
  "id": "form-group-{{ id }}",
  "label": {
    "text": "What is your first name?",
    "for": "input-{{ id }}",
    "modifier": "cfa-label",
    "modifierHint": "cfa-hint"
  },
  "hint": {
    "text": "Legally as it appears on your I.D."
  },
  "input": {
    "modifier": "cfa-input",
    "id": "input-{{ id }}",
    "name": "input['{{ id }}']",
    "type": "text",
    "required": "true"
  }
}{% endcapture %}

{% render 'figure.md', name: 'form-group', nice: title, body: body, context: context, caption: 'Form group with text input' %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "modifier": "cfa-form-group usa-form-group--error",
  "id": "form-group-{{ id }}",
  "label": {
    "text": "What is your first name?",
    "for": "input-{{ id }}",
    "modifier": "cfa-label",
    "modifierHint": "cfa-hint"
  },
  "hint": {
    "text": "Legally as it appears on your I.D."
  },
  "error": {
    "text": "This field is required.",
    "id": "error-message-{{ id }}",
    "role": "alert"
  },
  "input": {
    "modifier": "cfa-input",
    "id": "input-{{ id }}",
    "name": "input['{{ id }}']",
    "type": "text",
    "required": "true",
    "ariaInvalid": "true",
    "ariaDescribedby": "error-message-{{ id }}"
  }
}{% endcapture %}

{% render 'figure.md', name: 'form-group', nice: title, body: body, context: context, caption: 'Invalid form group' %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "modifier": "cfa-form-group",
  "id": "form-group-{{ id }}",
  "label": {
    "text": "What is your email address?",
    "for": "input-{{ id }}",
    "modifier": "cfa-label",
    "modifierHint": "cfa-hint"
  },
  "hint": {
    "text": "Legally as it appears on your I.D."
  },
  "input": {
    "modifier": "cfa-input",
    "id": "input-{{ id }}",
    "name": "input['{{ id }}']",
    "type": "email"
  }
}{% endcapture %}

{% render 'figure.md', name: 'form-group', nice: title, body: body, context: context, caption: 'Form group with email input' %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "modifier": "cfa-form-group",
  "id": "form-group-{{ id }}",
  "label": {
    "text": "Please describe in as much detail as possible.",
    "for": "textarea-{{ id }}",
    "modifier": "cfa-label",
    "modifierHint": "cfa-hint"
  },
  "textarea": {
    "modifier": "cfa-textarea",
    "id": "textarea-{{ id }}",
    "name": "textarea['{{ id }}']"
  }
}{% endcapture %}

{% render 'figure.md', name: 'form-group', nice: title, body: body, context: context, caption: 'Form group with textarea' %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "modifier": "cfa-form-group",
  "id": "form-group-{{ id }}",
  "label": {
    "text": "Please describe in as much detail as possible.",
    "for": "textarea-{{ id }}",
    "modifier": "cfa-label",
    "modifierHint": "cfa-hint"
  },
  "textarea": {
    "modifier": "cfa-textarea",
    "id": "textarea-{{ id }}",
    "name": "textarea['{{ id }}']",
    "required": "true"
  }
}{% endcapture %}

{% render 'figure.md', name: 'form-group', nice: title, body: body, context: context, caption: 'Form group with textarea' %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "modifier": "cfa-form-group",
  "id": "{% createId %}",
  "label": {
    "text": "How much does your household currently have in savings?",
    "for": "input-{{ id }}",
    "modifier": "cfa-label",
    "modifierHint": "cfa-hint"
  },
  "hint": {
    "text": "Answer the best you can."
  },
  "inputGroup": {
    "modifier": "usa-input-group cfa-input-group"
  },
  "input": {
    "modifier": "cfa-input text-right",
    "id": "input-{{ id }}",
    "name": "input['{{ id }}']",
    "type": "text",
    "prefixText": "$",
    "placeholder": "0.00",
    "inputmode": "decimal",
    "js": "mask-dollars"
  }
}{% endcapture %}

{% render 'figure.md', name: 'form-group', nice: title, body: body, context: context, caption: 'Form group with prefix and mask (U.S. Dollars)' %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "modifier": "cfa-form-group",
  "id": "{% createId %}",
  "label": {
    "text": "What percentage of your monthly income do you spend on monthly expenses?",
    "for": "input-{{ id }}",
    "modifier": "cfa-label",
    "modifierHint": "cfa-hint"
  },
  "hint": {
    "text": "Answer the best you can."
  },
  "inputGroup": {
    "modifier": "usa-input-group cfa-input-group"
  },
  "input": {
    "modifier": "cfa-input text-right",
    "id": "input-{{ id }}",
    "name": "input['{{ id }}']",
    "type": "text",
    "postfixText": "%",
    "inputmode": "decimal"
  }
}{% endcapture %}

{% render 'figure.md', name: 'form-group', nice: title, body: body, context: context, caption: 'Form group with postfix' %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "modifier": "cfa-form-group",
  "id": "{% createId %}",
  "label": {
    "text": "How much does your household currently have in savings?",
    "for": "input-{{ id }}",
    "modifier": "cfa-label",
    "modifierHint": "cfa-hint"
  },
  "hint": {
    "text": "Answer the best you can."
  },
  "inputGroup": {
    "modifier": "usa-input-group cfa-input-group"
  },
  "input": {
    "modifier": "cfa-input",
    "id": "input-{{ id }}",
    "name": "input['{{ id }}']",
    "type": "tel",
    "pattern": "([0-9]{3}) [0-9]{3}-[0-9]{4}",
    "prefixText": "+1",
    "inputmode": "tel",
    "js": "mask-tel"
  }
}{% endcapture %}

{% render 'figure.md', name: 'form-group', nice: title, body: body, context: context, caption: 'Form group with prefix and input mask (U.S. Phone)' %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "modifier": "cfa-form-group",
  "id": "{% createId %}",
  "label": {
    "text": "What is your social security number?",
    "for": "input-{{ id }}",
    "modifier": "cfa-label",
    "modifierHint": "cfa-hint"
  },
  "input": {
    "modifier": "cfa-input",
    "id": "input-{{ id }}",
    "name": "input['{{ id }}']",
    "type": "text",
    "pattern": "[0-9]{3}-[0-9]{2}-[0-9]{4}",
    "inputmode": "numeric",
    "js": "mask-ssn"
  }
}{% endcapture %}

{% render 'figure.md', name: 'form-group', nice: title, body: body, context: context, caption: 'Form group with input mask (SSN)' %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "modifier": "cfa-form-group",
  "id": "form-group-{{ id }}",
  "label": {
    "text": "What type of income have you had most recently?",
    "for": "select-{{ id }}",
    "modifier": "cfa-label",
    "modifierHint": "cfa-hint"
  },
  "hint": {
    "text": "Answer the best you can. You will be able to include additional types of income."
  },
  "selectEl": {
    "modifier": "cfa-select",
    "id": "select-{{ id }}",
    "name": "select['{{ id }}']",
    "required": "true",
    "default": {
      "label": "Click to select an income type",
      "selected": "true"
    },
    "options": [
      {
        "label": "---",
        "disabled": "true"
      },
      {
        "value": "wages",
        "label": "wages, salaries, tips"
      },
      {
        "value": "self-employment",
        "label": "self-employment income"
      },
      {
        "value": "unemployment",
        "label": "unemployment benefits"
      },
      {
        "value": "cash-assistance",
        "label": "Cash Assistance grant"
      },
      {
        "value": "child-support",
        "label": "child support (received)"
      },
      {
        "value": "disability-medicaid",
        "label": "disability-related Medicaid"
      },
      {
        "value": "supplemental-security-income",
        "label": "Supplemental Security Income (SSI)"
      },
      {
        "value": "social-security-dependent",
        "label": "Social Security Dependent Benefits"
      },
      {
        "value": "social-security-disability",
        "label": "Social Security Disability Benefits"
      },
      {
        "value": "social-security-survivor",
        "label": "Social Security Survivor’s Benefits"
      },
      {
        "value": "social-security-retirement",
        "label": "Social Security Retirement Benefits"
      },
      {
        "value": "state-disability",
        "label": "State Disability Benefits"
      },
      {
        "value": "veteran",
        "label": "Veteran’s Pension or Benefits"
      },
      {
        "value": "pension",
        "label": "Government or Private Pension"
      },
      {
        "value": "deferred-comp",
        "label": "Withdrawals from Deferred Compensation (IRA, Keogh, etc.)"
      },
      {
        "value": "workers-comp",
        "label": "Worker’s Compensation"
      },
      {
        "value": "alimony",
        "label": "alimony (received)"
      },
      {
        "value": "boarder",
        "label": "boarder or lodger"
      },
      {
        "value": "gifts",
        "label": "gifts/contributions (received)"
      },
      {
        "value": "rental",
        "label": "rental income"
      },
      {
        "value": "investment",
        "label": "investment income (interest, dividends, and profit from selling stocks)"
      }
    ]
  }
}{% endcapture %}

{% render 'figure.md', name: 'form-group', nice: title, body: body, context: context, caption: 'Form group with select' %}

<!-- GUIDANCE -->

## Guidance {#guidance}

**Fieldsets vs. form groups**. Form questions with text inputs, text areas, and selects always use the form group component to wrap inputs with an associated `label` element. Other form element components, checkbox and radio components, will use the <a href="{{ config.baseUrl }}components/fieldset">fieldset component</a>.

**Text inputs**. Refer to <a href="{{ config.baseUrl }}components/input">text input documentation</a>.

**Textareas**. Refer to <a href="{{ config.baseUrl }}components/textarea">textarea documentation</a>.

**Select**. Refer to <a href="{{ config.baseUrl }}components/select">select documentation</a>.

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

<!-- render 'figma.md', url: design_honeycrisp -->

<!-- SOURCE -->

{% capture stylesheets %}
  {% capture packages %}@codeforamerica/uswds/packages{% endcapture %}
  {% capture stylesheet_label %}{% getFile 'label' 'stylesheet' %}{% endcapture %}
  {% capture stylesheet_hint %}{% getFile 'hint' 'stylesheet' %}{% endcapture %}
  {% capture stylesheet_input %}{% getFile 'input' 'stylesheet' %}{% endcapture %}
  {% capture stylesheet_input_group %}{% getFile 'input-group' 'stylesheet' %}{% endcapture %}
  {% capture stylesheet_select %}{% getFile 'select' 'stylesheet' %}{% endcapture %}

  <li>Label: <code>..{{ stylesheet_label | replace: packages, '' }}</code></li>
  <li>Hint: <code>..{{ stylesheet_hint | replace: packages, '' }}</code></li>
  <li>Text Input: <code>..{{ stylesheet_input | replace: packages, '' }}</code></li>
  <li>Input Prefix or Suffix: <code>..{{ stylesheet_input_group | replace: packages, '' }}</code></li>
  <li>Select: <code>..{{ stylesheet_select | replace: packages, '' }}</code></li>
{% endcapture %}

{% capture stylesheets_import %}
@forward '{{ stylesheet_label }}'
@forward '{{ stylesheet_hint }}'
@forward '{{ stylesheet_input }}'
@forward '{{ stylesheet_input_group }}'
@forward '{{ stylesheet_select }}'
{% endcapture %}

{% render 'source.md',
  name: 'form-group',
  nice: title,
  javascript: 'provides custom input masking support utilizing the open source library <a href="https://github.com/nosir/cleave.js" target="_blank" rel="noopener nofollow" class="usa-link--external">Cleave.js</a>.',
  stylesheets: stylesheets,
  stylesheets_import: stylesheets_import,
  config: config %}