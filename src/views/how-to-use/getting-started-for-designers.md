---
tags: documentation
title: Getting started for designers
collection: documentationByAlpha
layout: default
story: A comparison of the Code for America USWDS theme to Honeycrisp and creating custom themes.
sublist: [
  {
    anchor: 'overview',
    title: 'Overview'
  },
  {
    anchor: 'themes',
    title: 'Creating themes'
  }
]
thumbnail: assets/site/thumbnail-design.png
thumbnail_description: Learn how to design for the USWDS and the Code for America theme.
---

## Overview of the theme {#overview}

The Code for America, U. S. Web Design System (USWDS) theme adapts the USWDS to look like the Honeycrisp Design System. On this site, designers can learn how to design for the USWDS, create custom themes, and find guidance for component usage.

### Comparison to Honeycrisp

Compared to Honeycrisp, the theme’s user interface (UI) looks and feels similar. In addition to how the design system works, there will be slight differences in how the theme displays. Examples include the following.

* Atomic properties or styles of the USWDS are defined using **design tokens**. USWDS design tokens have been used to adapt the USWDS to create this theme.

* **Spacing** in the USWDS is based on an 8px grid size, compared to Honeycrisp’s 5px grid size. All spacing increments are based on multiples of 8 instead of 5.

* The **typography** scale is customized to match Honeycrisp’s type sizing as closely as possible, but they are slightly different.

* **Color** values between the CfA USWDS theme and the Honeycrisp are not 1 to 1. The USWDS provides a robust color system that allows for nearest-neighbor matching. This helps ensure adequate color contrast for accessibility.

Each of these topics are explained in more detail below. Continue to use the <a href="https://www.figma.com/file/sQQqaoeuOPpm43wLlYfyEo/Honeycrisp-Design-System?type=design&node-id=5002%3A529&mode=design&t=qoyrYLxatItQeaYk-1" target="_blank" target="_blank" rel="noopener nofollow" class="usa-link--external">Honeycrisp Design Library</a> to create mockups with the understanding that they may not exactly match their live counterparts pixel to pixel.

{% render 'embed.md' src: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FsQQqaoeuOPpm43wLlYfyEo%2FHoneycrisp-Design-System%3Ftype%3Ddesign%26node-id%3D5008%253A549%26mode%3Ddesign%26t%3DYmX0My8KVP09ignW-1' title: 'The Honeycrisp Design Library' full: true %}

The **Honeycrisp Design Library** can be used with our copy of the <a href="https://www.figma.com/file/DArmxDsuTdPqd8h9aSNQAw/USWDS-(Community)-(Copy)?type=design&node-id=2555%3A2243&mode=design&t=VXw39O5JO7npJ6TB-1" target="_blank" rel="noopener nofollow" class="usa-link--external">U.S. Web Design System (USWDS) community Figma file</a> (created by TrussWorks).

{% render 'embed.md' src: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FDArmxDsuTdPqd8h9aSNQAw%2FUSWDS-(Community)-(Copy)%3Ftype%3Ddesign%26node-id%3D2555%253A2252%26mode%3Ddesign%26t%3DVXw39O5JO7npJ6TB-1' title: 'U.S. Web Design System (USWDS) community Figma file' full: true %}

## Creating themes {#themes}

Designers will likely need to create custom themes to adapt the system to fit another brand identity’s visual style. This may be for a government or civic organization. Many properties of the USWDS can be used to achieve custom themes (using design tokens). The Code for America USWDS Theme takes advantage of some of those properties. It also adds a layer of customization for components unavailable in the USWDS.

This section will cover some prerequisite topics for creating custom themes. Further sections will dive right into Figma so skip ahead if you feel comfortable with the basics.

### Design tokens

The USWDS relies heavily on design tokens. It’s important to understand this concept before working with the system. The most important takeaways include the following.

* Design tokens are the “currency” used to customize themes.

* They make it easier for designers and engineers to share a common language necessary to complete a theme.

* Tokens designate the rules for color, typography, spacing, and more.

* Read the <a href="https://bixal.github.io/uswds-design-tokens-guide/" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS Design Tokens Guide</a> by Bixal before getting started, "Understand the benefits" and "Learn the language" (both are embedded below).

{% render 'embed.md' src: 'https://bixal.github.io/uswds-design-tokens-guide/benefits/' title: 'Benefits, USWDS Design Tokens Guide' full: true %}

{% render 'embed.md' src: 'https://bixal.github.io/uswds-design-tokens-guide/language/' title: 'Language, USWDS Design Tokens Guide' full: true %}

### Spacing

Honeycrisp and the USWDS grid systems are mobile-first and responsive. The Honeycrisp grid is based on multiples of 5px. The USWDS grid is based on multiples of 8px and provides half-unit (4px) and single-pixel values for slight nudging (2px and 1px). This theme uses the USWDS grid and deprecates the Honeycrisp grid.

* Continue to create designs for mobile devices.

* If you define any spacing on a grid or between components and other elements, remember to use multiples of 8px.

{% capture context %}{
  "modifier": "usa-alert--info",
  "role": "region",
  "label": "Nudge amount",
  "body": "<p>You can change your default spacing increment in Figma to match the design system or your preference. This is the “nudge” amount used to determine how far something moves to when you select, hold shift, and press the arrow key. To do this go to the Main menu (<b>Figma</b> icon) in the application, then <b>Preferences</b>, select <b>Nudge amount…</b>. Change the big nudge amount to 8 or 16.</p>"
}{% endcapture %}{% component 'alert' context %}

{% render 'embed.md' src: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FsQQqaoeuOPpm43wLlYfyEo%2FHoneycrisp-Design-System%3Ftype%3Ddesign%26node-id%3D17522%253A3533%26mode%3Ddesign%26t%3D0UGecSpl0qfw7uEW-1' title: 'The theme spacing guide' full: true %}

<br>
<br>

{% capture context %}{
  "items": [
    {
      "label": "Learn more about USWDS spacing",
      "modifier": "cfa-button usa-button--outline",
      "href": "https://designsystem.digital.gov/design-tokens/spacing-units",
      "target": "_blank",
      "rel": "noopener nofollow",
      "postfix": "{{ config.baseUrl }}assets/img/sprite.svg#launch"
    }
  ]
}{% endcapture %}<!-- component 'button' context -->

### Color

Honeycrisp and the USWDS use theme color families, such as primary and secondary (and more), to determine the theme's appearance. The USWDS has more color families with predefined hues and grades for tints and shades in each family. These pre-defined values for every hue and grade ensure enough contrast between colors in various system components.

For the most part, using custom values in themes is discouraged. There are 42 hues, each with 10 tints and shades, making 470 possible color values. You can assign pre-defined system tokens to theme tokens to customize the appearance of your theme.

* To customize the theme, determine the theme color families you need to change (like primary, secondary, base, or warning).

* Fill all the grades in each family with the hue you want to use.

* More detailed instructions can be found in the <a href="https://www.figma.com/file/sQQqaoeuOPpm43wLlYfyEo/Honeycrisp-Design-System?type=design&node-id=17635%3A656&mode=design&t=DZFj3T6SxcFbarEd-1" target="_blank" rel="noopener nofollow" class="usa-link--external">Honeycrisp Design Library</a>.

{% render 'embed.md' src: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FsQQqaoeuOPpm43wLlYfyEo%2FHoneycrisp-Design-System%3Ftype%3Ddesign%26node-id%3D17604%253A3617%26mode%3Ddesign%26t%3D0UGecSpl0qfw7uEW-1' title: 'The theme color guide' full: true %}

<br>
<br>

{% capture context %}{
  "items": [
    {
      "label": "Learn more about USWDS color",
      "modifier": "cfa-button usa-button--outline",
      "href": "https://designsystem.digital.gov/design-tokens/color/overview",
      "target": "_blank",
      "rel": "noopener nofollow",
      "postfix": "{{ config.baseUrl }}assets/img/sprite.svg#launch"
    }
  ]
}{% endcapture %}<!-- component 'button' context -->

### Typography

Honeycrisp and this theme are typeset using sans-serif “system” fonts. This means the typeface users visually read text with depends on the operating system they are using. For iOS or MacOS users, this may be SF Pro. For Android users, this may be Roboto. For Windows users, this may be Segoe UI.

Line heights for all USWDS fonts are “normalized” so that their vertical height takes up the same space. It additionally supports the following 9 typefaces:

* Georgia

* Helvetica

* Merriweather

* Open Sans

* Public Sans

* Roboto Mono

* Source Sans Pro

* Tahoma

* Verdana

You may customize the typeface for your theme by choosing one of the supported typefaces. Typefaces not in this list can also be used, but there are some special instructions to enable them (<a href="https://designsystem.digital.gov/design-tokens/typesetting/font-family/#adding-fonts-to-uswds" target="_blank" rel="noopener nofollow" class="usa-link--external">which can be found on the USWDS site</a>).

{% render 'embed.md' src: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FsQQqaoeuOPpm43wLlYfyEo%2FHoneycrisp-Design-System%3Ftype%3Ddesign%26node-id%3D17523%253A3556%26mode%3Ddesign%26t%3D0UGecSpl0qfw7uEW-1' title: 'The theme typography guide' full: true %}