---
tags: component
title: Button
layout: default
intro: '"I use buttons to find important links or submit online applications"'
url_uswds: https://designsystem.digital.gov/components/button
url_uswds_guidance: '#guidance'
url_uswds_usage: '#using-the-button-component-2'
nice_uswds: Button component
description_uswds: ''
url_honeycrisp: http://honeycrisp.herokuapp.com/cfa/styleguide#atoms-buttons
nice_honeycrisp: Button atom
modifier_honeycrisp: .cfa-button
design_honeycrisp: https%3A%2F%2Fwww.figma.com%2Ffile%2FsQQqaoeuOPpm43wLlYfyEo%2FHoneycrisp-Design-System%3Ftype%3Ddesign%26node-id%3D5002%253A530%26mode%3Ddesign%26t%3DhXwkxQAW233Fykey-1
tokens: true
styles: true
---

<!-- INTRO -->

Buttons allow users to trigger actions. They are styled consistently according to their importance and the type of action they enable the user to perform.

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
  modifier_honeycrisp: modifier_honeycrisp,
  config: config %}

<!-- EXAMPLES -->

## Examples {#examples}

{% capture context %}{
  "items": [
    {
      "label": "Primary",
      "modifier": "cfa-button",
      "type": "button"
    },
    {
      "label": "Disabled",
      "modifier": "cfa-button",
      "type": "button",
      "disabled": "true"
    },
    {
      "label": "ARIA Disabled",
      "modifier": "cfa-button",
      "type": "button",
      "ariaDisabled": "true"
    }
  ]
}{% endcapture %}

{% render 'figure.md', name: 'button', nice: 'Button', context: context, caption: 'Primary button' %}

{% capture context %}{
  "items": [
    {
      "label": "Outline",
      "modifier": "cfa-button usa-button--outline",
      "type": "button"
    },
    {
      "label": "Disabled",
      "modifier": "cfa-button usa-button--outline",
      "type": "button",
      "disabled": "true"
    },
    {
      "label": "ARIA Disabled",
      "modifier": "cfa-button usa-button--outline",
      "type": "button",
      "ariaDisabled": "true"
    }
  ]
}{% endcapture %}

{% render 'figure.md', name: 'button', nice: 'Button', context: context, caption: 'Outline button' %}

{% capture context %}{
  "items": [
    {
      "label": "Big Primary",
      "modifier": "cfa-button usa-button--big",
      "type": "button"
    },
    {
      "label": "Disabled",
      "modifier": "cfa-button usa-button--big",
      "type": "button",
      "disabled": "true"
    },
    {
      "label": "ARIA Disabled",
      "modifier": "cfa-button usa-button--big",
      "type": "button",
      "ariaDisabled": "true"
    }
  ]
}{% endcapture %}

{% render 'figure.md', name: 'button', nice: 'Big Button', context: context, caption: 'Big button' %}

{% capture context %}{
  "items": [
    {
      "label": "Big Outline",
      "modifier": "cfa-button usa-button--big usa-button--outline",
      "type": "button"
    },
    {
      "label": "Disabled",
      "modifier": "cfa-button usa-button--big usa-button--outline",
      "type": "button",
      "disabled": "true"
    },
    {
      "label": "ARIA Disabled",
      "modifier": "cfa-button usa-button--big usa-button--outline",
      "type": "button",
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
      "type": "button",
      "prefix": "{{ config.baseUrl }}uswds/img/sprite.svg#translate"
    },
    {
      "label": "Button",
      "modifier": "cfa-button",
      "postfix": "{{ config.baseUrl }}uswds/img/sprite.svg#arrow_forward"
    },
    {
      "label": "Button",
      "modifier": "cfa-button usa-button--big",
      "prefix": "{{ config.baseUrl }}uswds/img/sprite.svg#translate"
    },
    {
      "label": "Button",
      "modifier": "cfa-button usa-button--big",
      "postfix": "{{ config.baseUrl }}uswds/img/sprite.svg#arrow_forward"
    }
  ]
}{% endcapture %}

{% render 'figure.md', name: 'button', nice: 'Big Button', context: context, caption: 'Button with icons. Any button type may have a prefixed or postfixed icon inside the label.' %}

{% capture context %}{
  "items": [
    {
      "label": "Unstyled",
      "modifier": "usa-button--unstyled",
      "type": "button"
    },
    {
      "label": "Disabled",
      "modifier": "usa-button--unstyled",
      "type": "button",
      "disabled": "true"
    },
    {
      "label": "ARIA Disabled",
      "modifier": "usa-button--unstyled",
      "type": "button",
      "ariaDisabled": "true"
    }
  ]
}{% endcapture %}

{% render 'figure.md', name: 'button', nice: 'Big Button', context: context, caption: 'Unstyled button' %}

{% capture context %}{
  "items": [
    {
      "label": "Secondary",
      "modifier": "cfa-button usa-button--secondary",
      "type": "button"
    },
    {
      "label": "Big Secondary",
      "modifier": "cfa-button usa-button--secondary usa-button--big",
      "type": "button"
    }
  ]
}{% endcapture %}

{% render 'figure.md', name: 'button', nice: 'Button', context: context, caption: 'Secondary button' %}

{% capture caption %}

**Danger buttons** tell users to pause and ensure they’re certain of the action they’re about to take. It can be a way to signal that action is discouraged (e.g., submitting a minimal application *anyway*) or irreversible (e.g., *deleting* a client or *removing* document).

{% endcapture %}

{% capture context %}{
  "items": [
    {
      "label": "Danger",
      "modifier": "cfa-button cfa-button--danger",
      "type": "button"
    },
    {
      "label": "Danger",
      "modifier": "cfa-button cfa-button--danger usa-button--big",
      "type": "button"
    },
    {
      "label": "Danger",
      "modifier": "cfa-button cfa-button--danger usa-button--outline",
      "type": "button"
    },
    {
      "label": "Danger",
      "modifier": "cfa-button cfa-button--danger usa-button--outline usa-button--big",
      "type": "button"
    },
    {
      "label": "Danger",
      "modifier": "cfa-button cfa-button--danger usa-button--unstyled",
      "type": "button"
    }
  ]
}{% endcapture %}

{% render 'figure.md', name: 'button', nice: 'Button', context: context, caption: caption %}

<!-- GUIDANCE -->

## Guidance {#guidance}

**Type attribute**. If the button is a `<button>` element the type attribute should be explicitly set to “button,” “reset,” or “submit.” Without the type attribute, button elements are set to the “submit” type in forms by default.

**Links as buttons**. Links may be styled as buttons. However, [screen readers read links and buttons differently<sup><strong>1</strong></sup>](#ref-1). A consistent button variant should be used to distinguish between buttons that invoke actions and links. Consider using an icon for buttons styled as links, such as directional arrows for onsite links, and an external icon for links that go offsite.

**Labels**. Buttons should always include a text label but may also include an icon prefix or postfix on either side of the label. Buttons with an icon but without text labels are discouraged. The icon and text label combination is the most certain way of communicating the icon's meaning. Refer to [guidance from Nielson Norman Group on “Icon Usability.”<sup><strong>2</strong></sup>](#ref-2).

**Button role**. Buttons should be written using the `<button>` element. However, if a button is a different element styled as a button and performs an action, the role attribute should be set to `role=”button”`. Refer to the best practices for buttons and ARIA in the [MDN documentation for the ARIA “button” role<sup><strong>3</strong></sup>](#ref-3).

**Disabling buttons**. To achieve the effect of disabling the button for everyone but provide context to screen readers as to why it's disabled, use the following pattern.

* Use the ARIA disabled attribute `aria-disabled=”true”` over the `disabled` attribute.
* Prevent events such as form submissions and clicks on the button (using JavaScript).
* Provide an `aria-describedby` attribute that points to an element’s id with text indicating why the button is disabled.

Refer to <a href="{{ url_uswds }}{{ url_uswds_guidance }}" target="_blank" rel="noopener nofollow" class="usa-link--external">additional guidance on the USWDS documentation site</a>.

**References**

1. <a href="https://designsystem.digital.gov/components/button/#accessibility" target="_blank" rel="noopener nofollow" class="usa-link--external">Accessibility | "Button" | designsystem.digital.gov</a> {#ref-1}
1. <a href="https://www.nngroup.com/articles/icon-usability" target="_blank" rel="noopener nofollow" class="usa-link--external">"Icon Usability" | nngroup.com</a> {#ref-2}
1. <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role" target="_blank" rel="noopener nofollow" class="usa-link--external">"ARIA: button role" | Accessibility | developer.mozilla.org</a> {#ref-3}
1. <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled target=" target="_blank" rel="noopener nofollow" class="usa-link--external">"aria-disabled" | Accessibility | developer.mozilla.org</a> {#ref-4}
1. <a href="https://css-tricks.com/making-disabled-buttons-more-inclusive target=" target="_blank" rel="noopener nofollow" class="usa-link--external">"Making Disabled Buttons More Inclusive" | css-tricks.com</a> {#ref-5}

<!-- ACCESSIBILITY -->

{% capture additional %}
1. Vertical padding (top and bottom) on the standard Button has been increased to `2` <a href="https://designsystem.digital.gov/design-tokens/spacing-units/" target="_blank" rel="noopener nofollow" class="usa-link--external">spacing units</a> to achieve <a href="https://www.w3.org/WAI/WCAG21/Understanding/target-size.html" target="_blank" rel="noopener nofollow" class="usa-link--external">WCAG 2.1 AAA target size success</a> requirements.
{% endcapture %}

{% capture keyboard_test %}
When navigating to any button using the keyboard, a <a href="https://www.w3.org/WAI/WCAG21/Understanding/focus-visible" target="_blank" rel="noopener nofollow" class="usa-link--external">visible focus indicator (WCAG 2.1 AA success)</a> is present and they are identified as buttons. They can be activated using the space bar.
{% endcapture %}

{% render 'accessibility.md'
  nice: 'Button',
  url_uswds: url_uswds,
  theme_passes: true,
  audit_passes: true,
  keyboard_passes: true,
  keyboard_test: keyboard_test,
  resize_passes: true,
  guidance_passes: true,
  additional: additional,
  config: config %}

<!-- DESIGN -->

{% render 'figma.md', url: design_honeycrisp %}

<!-- SOURCE -->

{% capture usage %}{{ url_uswds }}{{ url_uswds_usage }}{% endcapture %}
{% render 'source.md', name: 'button', nice: 'Button', theme: false, usage: usage, config: config %}
