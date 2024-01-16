---
tags: component
title: Alert
layout: default
story: An alert appears when I need help or when something has changed. It may be time-sensitive.
url_uswds: https://designsystem.digital.gov/components/alert
url_uswds_guidance: https://designsystem.digital.gov/components/alert/#guidance
url_uswds_usage: https://designsystem.digital.gov/components/alert/#using-the-alert-component-2
nice_uswds: Alert component
url_honeycrisp: http://honeycrisp.herokuapp.com/cfa/styleguide#atoms-notices
nice_honeycrisp: Notice atom
modifier_honeycrisp: .cfa-alert
design_honeycrisp: https%3A%2F%2Fwww.figma.com%2Ffile%2FsQQqaoeuOPpm43wLlYfyEo%2FHoneycrisp-Design-System%3Ftype%3Ddesign%26node-id%3D5003%253A527%26mode%3Ddesign%26t%3DwZwR9bNLbdvqwaT5-1
tokens: true
styles: true
thumbnail: assets/site/thumbnail-alert.png
thumbnail_description: An illustration of the alert component.
---

<!-- INTRO -->

The {{ title }} component distinguishes important information or errors that wouldn't normally appear in a layout or template. They may blend into or disrupt a user's workflow. Disruptive notices are most effective if used sparingly and appear after user interaction.

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

## Examples {#examples}

{% capture caption %}

**Informational, gray**. For non-urgent messages or context that is important to find but should not interrupt a user’s workflow. The HTML element may have the `role="region"` attribute. If so, it must also have an `aria-labelledby` attribute that refers to the heading id. If it does not have a visible heading it must have an `aria-label` with the value of the label based on information inside the alert.

{% endcapture %}

{% capture body_labelledby %}aria-lb-{% createId %}{% endcapture %}

{% capture body %}

<h3 class="usa-alert__heading" id="{{ body_labelledby }}">Can we ask about your race and identity?</h3>

Providing your race and ethnicity is optional and will not affect your individual application.

We will use this information to evaluate the fairness of this application, and we ask you to provide it to ensure that you are accurately represented. [Learn more about how we protect your personal information](#).

{% endcapture %}

{% capture context %}{
  "modifier": "cfa-alert usa-alert--info",
  "role": "region",
  "labelledby": "aria-lb-{% createId %}",
  "body": "{% md body %}"
}{% endcapture %}

{% render 'figure.md', name: 'alert', nice: 'Informational', context: context, caption: caption, dictionary: dictionary %}

{% capture caption %}

**Success, green**. For successful interactions such as a submitting an application. The HTML element should have the `role="status"` attribute.

{% endcapture %}

{% capture body %}

### Done! Your application has been submitted. {.usa-alert__heading}

You were recommended for expedited food assistance (SNAP). [Click here to learn more about expedited food assistance](#). {.usa-alert__text}

{% endcapture %}

{% capture context %}{
  "modifier": "cfa-alert usa-alert--success",
  "role": "status",
  "body": "{% md body %}"
}{% endcapture %}

{% render 'figure.md', name: 'alert', nice: 'Success', context: context, caption: caption, dictionary: dictionary %}

{% capture caption %}

**Warning, yellow**. For urgent messages or context that is important to find but should not interrupt a user’s workflow. The HTML element may have the `role="region"` attribute. If so, it must also have an `aria-labelledby` attribute that refers to the heading id. If it does not have a visible heading it must have an `aria-label` with the value of the label based on information inside the alert.

{% endcapture %}

{% capture body %}

We couldn't find your address. To make sure you get mail from the county, you may edit your address or keep going. [Alternatively, click here to look up your county information](#). {.usa-alert__text}

{% endcapture %}

{% capture context %}{
  "modifier": "cfa-alert usa-alert--warning",
  "heading": "Make sure your address is correct",
  "body": "{% md body %}"
}{% endcapture %}

{% render 'figure.md', name: 'alert', nice: 'Warning', context: context, caption: caption, dictionary: dictionary %}

{% capture caption %}

**Error, red**. For urgent messages or application failure messages that are out of the user’s control. Error messages should **rarely** appear. The HTML element should have `role="alert"` attribute.

{% endcapture %}

{% capture body %}

### Error notice {.usa-alert__heading}

This is an example error notice. Its a great way to highlight **errors or dangerous issues**. [Here is a link to more information](#). {.usa-alert__text}

{% endcapture %}

{% capture context %}{
  "modifier": "cfa-alert usa-alert--error",
  "role": "alert",
  "body": "{% md body %}"
}{% endcapture %}

{% render 'figure.md', name: 'alert', nice: 'Error', context: context, caption: caption, dictionary: dictionary %}

{% capture caption %}

**Emergency, orange warm**. For time sensitive messages that provide urgent advisory information. Emergency messages **must** be used sparingly. The HTML element should have `role="status"` attribute. For time-sensitive messages that demand the user's immediate attention and interrupt their workflow the HTML element should have `role="alert"` attribute.

{% endcapture %}

{% capture body %}

### Emergency alert message {.usa-alert__heading}

Additional context and followup information including [a link](#). {.usa-alert__text}

{% endcapture %}

{% capture context %}{
  "modifier": "cfa-alert usa-alert--emergency",
  "role": "status",
  "body": "{% md body %}"
}{% endcapture %}

{% render 'figure.md', name: 'alert', nice: 'Success', context: context, caption: caption, dictionary: dictionary %}

## Guidance {#guidance}

**Writing messages**. Use Plain language, be empathetic, and use trauma-informed principles when writing message content.

**Heading order**. It is a best practice to ensure the alert heading level does not skip and is in order with other page headings. However, this does not contribute to accessible success criteria.

**Attention and color**. A notice that uses a tertiary background color, or color that appears in roughly 5% of the color palette, will draw more attention. Also consider choosing combinations that are distinguishable across a broad spectrum of color blindness such as blue against orange, where orange is the emphasis color.

{% capture ref_additional %}
1. <a href="https://designsystem.digital.gov/components/site-alert/" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Site Alert</cite> | U.S. Web Design System (USWDS)</a>
1. <a href="https://dequeuniversity.com/rules/axe/4.7/heading-order?application=AxeEdge" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Heading levels should only increase by one</cite> | dequeuniversity.com</a>
1. <a href="https://www.tableau.com/blog/examining-data-viz-rules-dont-use-red-green-together" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>5 Tips on Designing Colorblind-Friendly Visualizations</cite> | tableau.com</a>
{% endcapture %}

{% render 'references.md', ref_main: url_uswds_guidance, ref_additional: ref_additional, config: config %}

<!-- ACCESSIBILITY -->

{% render 'accessibility.md'
  nice: title,
  url_uswds: url_uswds,
  theme_passes: true,
  audit_passes: true,
  keyboard_passes: false,
  keyboard_test: 'No keyboard test has been created.',
  resize_passes: true,
  screen_reader_passes: 'No screen reader test has been created.',
  guidance_passes: true,
  additional: false,
  config: config %}

<!-- DESIGN -->

{% render 'figma.md', url: design_honeycrisp %}

<!-- SOURCE -->

{% capture theme %}
// Theme-level settings
@use 'cfa-uswds-theme' with (
  // Global theme settings that affect the component, changing these will affect other components
  $cfa-color-info-lighter: 'gray-warm-4',       // Affects the background color of informational alerts
  $cfa-color-info-light: 'gray-warm-20',        // Affects border color of informational alerts
  $cfa-color-warning-lighter: 'gold-5v',        // Affects the background color of warning alerts
  $cfa-color-warning: 'gold-20v',               // Affects border color of informational alerts
  $cfa-color-error-lighter: 'orange-warm-10v'   // Affects the background color of error alerts
  $cfa-color-error: 'orange-warm-50v',          // Affects border color of error alerts
  $cfa-color-success-lighter: 'green-cool-5v',  // Affects the background color of success alerts
  $cfa-color-success-darker: 'green-cool-60v',  // Affects border color of success alerts
  $cfa-color-emergency: 'orange-warm-30v'       // Affects the background color of emergency alerts
  $cfa-color-emergency-dark: 'orange-warm-60v', // Affects border color of emergency alerts
  // Component specific settings
  $cfa-alert-bar-width: 0,
  $cfa-alert-padding-x: 2,
  $cfa-alert-padding-y: 2,
  $cfa-alert-link-color: 'ink'
);
// Package-level settings
@use 'cfa-core' with (
  $cfa-alert-border-width: 2px
);
{% endcapture %}

{% render 'source.md', name: 'alert', nice: title, theme: theme, usage: url_uswds_usage, config: config, pckg: package %}
