---
title: Alert
layout: default
intro: Alerts (notices) are a way to highlight important information by separating it from the main copy.
---

## Details

<ul class="usa-content-list">
  <li><strong>Extends:</strong> <a href="https://designsystem.digital.gov/components/alert/" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS Alert component</a></li>
  <li><strong>Honeycrisp:</strong> <a href="http://honeycrisp.herokuapp.com/cfa/styleguide#atoms-notices" target="_blank" rel="noopener nofollow" class="usa-link--external">Notice atom</a></li>
  <li><strong>Customization:</strong> <abbr title="{{ dictionary.tokens }}">Tokens</abbr> and <abbr title="{{ dictionary.styles }}">Styles</abbr></li>
  <li><strong><abbr title="{{ dictionary.modifier }}">Modifier</abbr>:</strong> <code>.cfa-alert</code></li>
</ul>

The **Alert** extends the <a href="https://designsystem.digital.gov/components/alert/" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS Alert</a> component. The visual appearance is modified using **design tokens** applied to the USWDS Alert settings from the <a href="http://honeycrisp.herokuapp.com/cfa/styleguide#atoms-notices" target="_blank" rel="noopener nofollow" class="usa-link--external">Honeycrisp Notice atom</a>. Further styling is applied using the **CSS modifier** `.cfa-alert` to adds **styles** defined in a custom stylesheet.

## Examples

{% capture body %}
Providing your race and ethnicity is optional and will not affect your individual application.

We will use this information to evaluate the fairness of this application, and we ask you to provide it to ensure that you are accurately represented.
{% endcapture %}

{% render 'figure.md', name: 'alert', nice: 'Informational alert', body: body, context: '{
  "modifier": "cfa-alert usa-alert--info",
  "role": null,
  "heading": "Can we ask about your race and ethnicity?"
}' %}

{% capture body %}
We couldn't find your address. To make sure you get mail from the county, you may edit your address or keep going. {.usa-alert__text}
{% endcapture %}

{% render 'figure.md', name: 'alert', nice: 'Warning alert', body: body, context: '{
  "modifier": "cfa-alert usa-alert--warning",
  "role": null,
  "heading":
  "Make sure your address is correct"
}' %}

{% capture body %}
This is an example error notice. It's a great way to highlight **errors or dangerous issues**. {.usa-alert__text}
{% endcapture %}

{% render 'figure.md', name: 'alert', nice: 'Error notice', body: body, context: '{
  "modifier": "cfa-alert usa-alert--error",
  "role": "alert",
  "heading": "Error notice"
}' %}

{% capture body %}
You were recommended for expedited food assistance (SNAP). {.usa-alert__text}
{% endcapture %}

{% render 'figure.md', name: 'alert', nice: 'Success', body: body, context: '{
  "modifier": "cfa-alert usa-alert--success",
  "role": null,
  "heading": "Done! Your application has been submitted."
}' %}

<!-- SOURCE -->

{% render 'source.md', name: 'alert', nice: 'Notice' %}
