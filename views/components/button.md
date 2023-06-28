---
tags: component
title: Button
layout: default
intro: '"I use buttons to find important links or submit online applications"'
url_uswds: https://designsystem.digital.gov/components/button
url_uswds_guidance: https://designsystem.digital.gov/components/button/#guidance
url_uswds_usage: https://designsystem.digital.gov/components/button/#using-the-button-component-2
nice_uswds: Button component
url_honeycrisp: http://honeycrisp.herokuapp.com/cfa/styleguide#atoms-buttons
nice_honeycrisp: Button atom
modifier_honeycrisp: .cfa-button
design_honeycrisp: https%3A%2F%2Fwww.figma.com%2Ffile%2FsQQqaoeuOPpm43wLlYfyEo%2FHoneycrisp-Design-System%3Ftype%3Ddesign%26node-id%3D6133%253A1490%26mode%3Ddesign%26t%3DeSs9ZaxsX9qacQvQ-1
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
  modifier_honeycrisp: modifier_honeycrisp,
  tokens: tokens,
  styles: styles,
  dictionary: dictionary,
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

{% capture context %}{
  "items": [
    {
      "label": "Internal Link",
      "modifier": "cfa-button usa-button--outline",
      "href": "#",
      "postfix": "{{ config.baseUrl }}uswds/img/sprite.svg#arrow_forward"
    },
    {
      "label": "External Link",
      "modifier": "cfa-button usa-button--outline",
      "href": "#",
      "postfix": "{{ config.baseUrl }}uswds/img/sprite.svg#launch"
    },
    {
      "label": "ARIA Disabled",
      "modifier": "cfa-button usa-button--outline",
      "href": "#",
      "postfix": "{{ config.baseUrl }}uswds/img/sprite.svg#launch",
      "ariaDisabled": "true"
    }
  ]
}{% endcapture %}

{% render 'figure.md', name: 'button', nice: 'Button', context: context, caption: 'Link button' %}

<!-- GUIDANCE -->

## Guidance {#guidance}

**Type attribute**. If the button is a `<button>` element the type attribute should be explicitly set to “button,” “reset,” or “submit.” Without the type attribute, button elements are set to the “submit” type in forms by default.

**Links as buttons**. Links may be styled as buttons. However, screen readers will distinguish between links and buttons differently regardless of how they are styled. Normally, the keyboard can only invoke links using the Enter key. However, when users press the Space key, the USWDS will open links styled as buttons (with JavaScript). A consistent button variant should still be used to distinguish between buttons that open links and buttons that invoke actions. Consider using an icon for buttons styled as links, such as directional arrows for onsite links, and an external icon for links that go offsite.

**Labels**. Buttons should always include a text label but may also include an icon prefix or postfix on either side of the label. Buttons with an icon but without text labels are discouraged. The icon and text label combination is the most certain way of communicating the icon's meaning.

**Button role**. Buttons should be written using the `<button>` element. However, if a button is a different element styled as a button and performs an action, the role attribute should be set to `role=”button”`.

**Disabling buttons**. To achieve the effect of disabling buttons or links styled as buttons but provide context to screen readers as to why it's disabled, use the following pattern.

* Use the ARIA disabled attribute `aria-disabled=”true”` instead of the `disabled` attribute.
* Prevent events such as form submissions and clicks on the button using JavaScript.
* Provide an `aria-describedby` attribute that points to an element’s id with text indicating why the button is disabled.

{% capture ref_additional %}
1. <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>&lt;button&gt;: The Button element</cite> | developer.mozilla.org</a>
1. <a href="https://www.nngroup.com/articles/icon-usability" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Icon Usability</cite> | nngroup.com</a>
1. <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>ARIA: button role</cite> | Accessibility | developer.mozilla.org</a>
1. <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>aria-disabled</cite> | Accessibility | developer.mozilla.org</a>
1. <a href="https://css-tricks.com/making-disabled-buttons-more-inclusive" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Making Disabled Buttons More Inclusive</cite> | css-tricks.com</a>
1. <a href="https://design-system.service.gov.uk/components/button/" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Button</cite> | GOV.UK Design System</a>
1. <a href="https://design.va.gov/components/button/" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Button</cite> | VA.gov Design System</a>
1. <a href="https://nycopportunity.github.io/standard/buttons" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Buttons</cite> | Opportunity Standard</a>
{% endcapture %}

{% render 'references.md', ref_main: url_uswds_guidance, ref_additional: ref_additional, config: config %}

<!-- ACCESSIBILITY -->

{% capture additional %}
1. Vertical padding (top and bottom) on the smallest Button size has been increased to `2` <a href="https://designsystem.digital.gov/design-tokens/spacing-units/" target="_blank" rel="noopener nofollow" class="usa-link--external">spacing units</a> to achieve <a href="https://www.w3.org/WAI/WCAG21/Understanding/target-size.html" target="_blank" rel="noopener nofollow" class="usa-link--external">WCAG 2.1 AAA target size success</a> requirements.
{% endcapture %}

{% capture keyboard_test %}
When navigating to any button using the keyboard, a <a href="https://www.w3.org/WAI/WCAG21/Understanding/focus-visible" target="_blank" rel="noopener nofollow" class="usa-link--external">visible focus indicator (WCAG 2.1 AA success)</a> is present. Buttons and links styled as buttons can be activated using the space bar.
{% endcapture %}

{% render 'accessibility.md'
  nice: 'Button',
  url_uswds: url_uswds,
  theme_passes: true,
  audit_passes: true,
  keyboard_passes: true,
  keyboard_test: keyboard_test,
  resize_passes: true,
  screen_reader_passes: 'No screen reader test has been created.',
  guidance_passes: true,
  additional: additional,
  config: config %}

<!-- DESIGN -->

{% render 'figma.md', url: design_honeycrisp %}

<!-- SOURCE -->

{% render 'source.md', name: 'button', nice: title, usage: url_uswds_usage, javascript: 'enables links that are styled as buttons to be invoked using the space bar.', config: config, pckg: package %}
