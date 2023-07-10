---
tags: component
title: Template
layout: default
intro:
url_uswds: https://designsystem.digital.gov/components/
url_uswds_usage: '#'
nice_uswds: Template component
description_uswds: ''
url_honeycrisp: 'http://honeycrisp.herokuapp.com/cfa/styleguide#'
nice_honeycrisp: Template atom
modifier_honeycrisp: false
tokens: true
styles: true
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

{% capture body_default %}

Default Body

{% endcapture %}

{% capture context %}{
  "modifier": "cfa-"
}{% endcapture %}

<!-- render 'figure.md', name: '{{ name }}', nice: '{{ nice }}', body: body_default, context: context, caption: '{{ caption }}' -->

<!-- GUIDANCE -->

## Guidance {#guidance}

Refer to <a href="{{ url_uswds }}{{ url_uswds_guidance }}" target="_blank" rel="noopener nofollow" class="usa-link--external">additional guidance on the USWDS documentation site</a>.

<!-- DESIGN -->

{% render 'figma.md', url: 'https://www.figma.com/file/sQQqaoeuOPpm43wLlYfyEo/Honeycrisp-Design-System' %}

<!-- SOURCE -->

<!-- render 'source.md', name: '{{ name }}', nice: '{{ nice }}', theme: '$theme-{{ setting }}: {{ value }}', usage: '{{ url_uswds }}{{ url_uswds_usage }}', config: config -->
