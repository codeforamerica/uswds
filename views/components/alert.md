---
title: Alert
layout: default
intro: Alerts (notices) are a way to highlight important information by separating it from the main copy.
url_uswds: https://designsystem.digital.gov/components/alert
url_uswds_usage: '#using-the-alert-component-2'
nice_uswds: Alert component
description_uswds: ''
url_honeycrisp: http://honeycrisp.herokuapp.com/cfa/styleguide#atoms-notices
nice_honeycrisp: Notice atom
modifier_honeycrisp: .cfa-alert
description_honeycrisp: ''
---

## Details {#details}

<ul class="usa-content-list">
  <li><strong>Extends:</strong> <a href="https://designsystem.digital.gov/components/alert/" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS Alert component</a></li>
  <li><strong>Honeycrisp:</strong> <a href="http://honeycrisp.herokuapp.com/cfa/styleguide#atoms-notices" target="_blank" rel="noopener nofollow" class="usa-link--external">Notice atom</a></li>
  <li><strong>Customization:</strong> <abbr title="{{ dictionary.tokens }}">Tokens</abbr> and <abbr title="{{ dictionary.styles }}">Styles</abbr></li>
  <li><strong><abbr title="{{ dictionary.modifier }}">Modifier</abbr>:</strong> <code>.cfa-alert</code></li>
</ul>

The **Alert** extends the <a href="https://designsystem.digital.gov/components/alert/" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS Alert</a> component. The visual appearance is modified using **design tokens** applied to the <a href="https://designsystem.digital.gov/components/alert/#using-the-alert-component-2" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS Alert settings</a> from the <a href="http://honeycrisp.herokuapp.com/cfa/styleguide#atoms-notices" target="_blank" rel="noopener nofollow" class="usa-link--external">Honeycrisp Notice atom</a>. Further styling is applied using the **CSS modifier** `.cfa-alert` to add **styles** defined in a custom stylesheet.

## Examples {#examples}

{% capture body_default %}
Providing your race and ethnicity is optional and will not affect your individual application.

We will use this information to evaluate the fairness of this application, and we ask you to provide it to ensure that you are accurately represented.
{% endcapture %}

{% render 'figure.md', name: 'alert', nice: 'Informational', body: body_default, context: '{
  "modifier": "cfa-alert usa-alert--info",
  "role": false,
  "heading": "Can we ask about your race and ethnicity?"
}' %}

{% capture body %}
We couldnt find your address. To make sure you get mail from the county, you may edit your address or keep going. {.usa-alert__text}
{% endcapture %}

{% render 'figure.md', name: 'alert', nice: 'Warning', body: body, context: '{
  "modifier": "cfa-alert usa-alert--warning",
  "role": false,
  "heading": "Make sure your address is correct"
}' %}

{% capture body %}
This is an example error notice. Its a great way to highlight **errors or dangerous issues**. {.usa-alert__text}
{% endcapture %}

{% render 'figure.md', name: 'alert', nice: 'Error', body: body, context: '{
  "modifier": "cfa-alert usa-alert--error",
  "role": "alert",
  "heading": "Error notice"
}' %}

{% capture body %}
You were recommended for expedited food assistance (SNAP). {.usa-alert__text}
{% endcapture %}

{% render 'figure.md', name: 'alert', nice: 'Success', body: body, context: '{
  "modifier": "cfa-alert usa-alert--success",
  "role": false,
  "heading": "Done! Your application has been submitted."
}' %}

### Default

This is an example of what the component looks like by default, without the modifier, <code>.cfa-alert</code>. It includes a single, solid border on the left and an icon corresponding to the alert type (informational, warning, error, or success). The colors for each alert type are the same in the examples above. Additional variant modifiers for the alert can be found in the <a href="https://designsystem.digital.gov/components/alert/#using-the-alert-component-2" target="_blank" rel="noopener nofollow" class="usa-link--external">usage documentation</a>.

{% render 'figure.md', name: 'alert', nice: 'Informational alert', body: body_default, context: '{
  "modifier": false,
  "role": false,
  "heading": "Can we ask about your race and ethnicity?"
}' %}

<!-- SOURCE -->

{% render 'source.md', name: 'alert', nice: 'Notice', theme: '$theme-alert-padding-x: 2', usage: 'https://designsystem.digital.gov/components/alert/#using-the-alert-component-2' %}

{% render 'figma.md', url: 'https://www.figma.com/file/H8qVKsmn0dGFG03pomDBDI/Reorganize-components?type=design&node-id=5003-527' %}
