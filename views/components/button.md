---
tags: component
title: Button
layout: default
intro:
url_uswds: https://designsystem.digital.gov/components/button
url_uswds_guidance: '#guidance'
url_uswds_usage: '#using-the-button-component-2'
nice_uswds: Button component
description_uswds: ''
url_honeycrisp: 'http://honeycrisp.herokuapp.com/cfa/styleguide#atoms-buttons'
nice_honeycrisp: Button atom
modifier_honeycrisp: .cfa-button
tokens: true
styles: true
description_honeycrisp: ''
---

<!-- INTRO -->

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

<!-- DETAILS -->

{% render 'details.md',
  name: title,
  url_uswds: url_uswds,
  url_uswds_usage: url_uswds_usage,
  nice_uswds: nice_uswds,
  url_honeycrisp: url_honeycrisp,
  nice_honeycrisp: nice_honeycrisp,
  tokens: tokens,
  styles: styles,
  dictionary: dictionary,
  modifier_honeycrisp: modifier_honeycrisp %}

<!-- ACCESSIBILITY -->

{% render 'accessibility.md' %}

<!-- EXAMPLES -->

## Examples {#examples}

{% capture context %}{
  "items": [
    {
      "label": "Primary Button",
      "modifier": "cfa-button"
    },
    {
      "label": "Disabled",
      "modifier": "cfa-button",
      "disabled": "true"
    },
    {
      "label": "ARIA Disabled",
      "modifier": "cfa-button",
      "ariaDisabled": "true"
    }
  ]
}{% endcapture %}

{% render 'figure.md', name: 'button', nice: 'Button', context: context, caption: 'Primary button' %}

{% capture context %}{
  "items": [
    {
      "label": "Outline Button",
      "modifier": "cfa-button usa-button--outline"
    },
    {
      "label": "Disabled",
      "modifier": "cfa-button usa-button--outline",
      "disabled": "true"
    },
    {
      "label": "ARIA Disabled",
      "modifier": "cfa-button usa-button--outline",
      "ariaDisabled": "true"
    }
  ]
}{% endcapture %}

{% render 'figure.md', name: 'button', nice: 'Button', context: context, caption: 'Outline button' %}

{% capture context %}{
  "items": [
    {
      "label": "Primary Button",
      "modifier": "cfa-button usa-button--big"
    },
    {
      "label": "Disabled",
      "modifier": "cfa-button usa-button--big",
      "disabled": "true"
    },
    {
      "label": "ARIA Disabled",
      "modifier": "cfa-button usa-button--big",
      "ariaDisabled": "true"
    }
  ]
}{% endcapture %}

{% render 'figure.md', name: 'button', nice: 'Big Button', context: context, caption: 'Big button' %}

{% capture context %}{
  "items": [
    {
      "label": "Primary Button",
      "modifier": "cfa-button usa-button--big usa-button--outline"
    },
    {
      "label": "Disabled",
      "modifier": "cfa-button usa-button--big usa-button--outline",
      "disabled": "true"
    },
    {
      "label": "ARIA Disabled",
      "modifier": "cfa-button usa-button--big usa-button--outline",
      "ariaDisabled": "true"
    }
  ]
}{% endcapture %}

{% render 'figure.md', name: 'button', nice: 'Big Button', context: context, caption: 'Big outline button' %}

{% capture context %}{
  "items": [
    {
      "label": "Button",
      "modifier": "cfa-button",
      "prefix": "translate"
    },
    {
      "label": "Button",
      "modifier": "cfa-button",
      "postfix": "arrow_forward"
    },
    {
      "label": "Button",
      "modifier": "cfa-button usa-button--big",
      "prefix": "translate"
    },
    {
      "label": "Button",
      "modifier": "cfa-button usa-button--big",
      "postfix": "arrow_forward"
    }
  ]
}{% endcapture %}

{% render 'figure.md', name: 'button', nice: 'Big Button', context: context, caption: 'Button with icons' %}

{% capture context %}{
  "items": [
    {
      "label": "Secondary Button",
      "modifier": "cfa-button usa-button--secondary"
    },
    {
      "label": "Disabled",
      "modifier": "cfa-button usa-button--secondary",
      "disabled": "true"
    },
    {
      "label": "ARIA Disabled",
      "modifier": "cfa-button usa-button--secondary",
      "ariaDisabled": "true"
    }
  ]
}{% endcapture %}

{% render 'figure.md', name: 'button', nice: 'Button', context: context, caption: 'Secondary button' %}

{% capture context %}{
  "items": [
    {
      "label": "Unstyled Button",
      "modifier": "cfa-button usa-button--unstyled"
    }
  ]
}{% endcapture %}

{% render 'figure.md', name: 'button', nice: 'Big Button', context: context, caption: 'Unstyled button' %}

<!-- GUIDANCE -->

## Guidance {#guidance}

Refer to <a href="{{ url_uswds }}{{ url_uswds_guidance }}" target="_blank" rel="noopener nofollow" class="usa-link--external">additional guidance on the USWDS documentation site</a>.

<!-- DESIGN -->

{% render 'figma.md', url: 'https://www.figma.com/file/sQQqaoeuOPpm43wLlYfyEo/Honeycrisp-Design-System' %}

<!-- SOURCE -->

<!-- render 'source.md', name: '{{ name }}', nice: '{{ nice }}', theme: '$theme-{{ setting }}: {{ value }}', usage: 'https://designsystem.digital.gov/components/alert/#using-the-alert-component-2', config: config -->
