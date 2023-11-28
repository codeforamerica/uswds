---
tags: component
title: Details
layout: default
story: A detail contains the particulars of complex terms and help me understand them better.
url_uswds:
url_uswds_guidance:
url_uswds_usage:
nice_uswds:
url_honeycrisp: https://honeycrisp.herokuapp.com/cfa/styleguide#molecules-reveal
nice_honeycrisp: Reveal molecule
modifier_honeycrisp: .cfa-details
design_honeycrisp: https%3A%2F%2Fwww.figma.com%2Ffile%2FsQQqaoeuOPpm43wLlYfyEo%2FHoneycrisp-Design-System%3Ftype%3Ddesign%26node-id%3D5004%253A537%26mode%3Ddesign%26t%3Db7vIYK7WH81HUo0S-1
tokens: true
styles: true
---

<!-- INTRO -->

The {{ title }} component contains helpful context for users but may not be necessary to display by default. It is primarily used to consolidate long or complex information to save space for other critical elements.

<!-- DETAILS -->

{% render 'details.md',
  name: title,
  url_honeycrisp: url_honeycrisp,
  nice_honeycrisp: nice_honeycrisp,
  tokens: tokens,
  styles: styles,
  dictionary: dictionary,
  modifier_honeycrisp: modifier_honeycrisp,
  config: config %}

## Examples {#examples}

{% capture certification_letter %}
If you don't have any of these documents, you can write, sign, date, and submit this letter:

*I, [your full name], work as a [your job]. I made $[monthly income] last month. Please use this letter as self-certification of my income.* <br> *[Your signature]* <br> *[Today's date]*
{% endcapture %}

{% capture context %}{
  "summary": "What's an example of a self-certification letter?",
  "icon": "{{ config.baseUrl }}assets/img/sprite.svg#chevron_right",
  "controls": "aria-c-{% createId %}",
  "body": "{% md certification_letter %}"
}{% endcapture %}

{% render 'figure.md', name: 'details', nice: title, body: body, context: context, caption: 'Details' %}

<!-- GUIDANCE -->

## Guidance {#guidance}

**Placement**. The component always follows complex text or lengthy descriptions. This is because the content in the component should answer potential questions related to it’s preceding content.

**Collapsed by default**. There is a risk of users skipping content in the component. Therefore, it should never contain critical information if it is always closed by default.

**Open by default, collapsed when revisiting**. Ideally, the component is open by default. If the user leaves the screen containing the component and returns, then the component can be closed.

**When to use something else**.

**Stacking collapsable sections of text**. <a href="{{ config.baseUrl }}components/accordion">Accordions</a> are used to consolidate long pages of text containing multiple headings. The Details component uses code that can’t be applied to this use case in a reliable way for screen reader users.

**Long text blocks such as legal information**. Text wells are used to contain extremely lengthy blocks of text. The Details component should contain shorter blocks of supplementary content.

{% capture ref_additional %}
1. <a href="#" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Title</cite> | domain.com</a>
{% endcapture %}

<!-- render 'references.md', ref_main: url_uswds_guidance, ref_additional: ref_additional, config: config -->

<!-- ACCESSIBILITY -->

{% render 'accessibility.md'
  nice: title,
  url_uswds: url_uswds,
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

{% capture theme %}
// Theme-level settings
@use 'cfa-uswds-theme' with (
  // Global theme settings that affect the component, changing these will affect other components
  $cfa-color-primary-lightest: 'mint-cool-5', // Affects details background
  $cfa-color-primary-darker: 'mint-cool-80v'  // Affects details text and border color
  $cfa-small-font-size: '2xs'                 // Affects details font size
);
// Package-level settings
@use 'cfa-core' with (
  $cfa-details-font-size: $theme-small-font-size,
  $cfa-details-background-color: $theme-color-primary-lightest,
  $cfa-details-text-color: $theme-color-primary-darker
);
{% endcapture %}

{% capture file_package %}{% getFile 'details' %}{% endcapture %}
{% capture javascript_details %}{% getFile 'details' 'javascript' %}{% endcapture %}

{% capture javascript %}enables the expansion and collapse of the details region. It also toggles the ARIA expanded attribute on the summary button and the tabindex attribute on potentially focusable children inside the details region. The module can be found at <code>.{{ javascript_details | replace: file_package, '' }}</code>.{% endcapture %}

{% render 'source.md', name: 'details', nice: title, theme: theme, javascript: javascript, config: config, pckg: package %}
