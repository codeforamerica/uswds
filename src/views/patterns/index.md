---
tags: [primary, pattern]
title: Patterns
collection: patternByAlpha
layout: default
story: Consistent solutions to common user experience needs.
sublist: true
thumbnail: assets/site/thumbnail-patterns.png
thumbnail_description: Patterns using the Code for America U.S. Web Design System theme.
---

<ul class="usa-card-group flex-row margin-top-4">
  {% for item in collections.patternByAlpha %}
  {% unless item.data.tags contains 'primary' %}
  <li class="usa-card site-component-card mobile-lg:grid-col-6 margin-bottom-2" role="region" aria-label="{{ item.data.title }} component">
    <div class="usa-card__container">
      <div class="usa-card__media">
        <div class="usa-card__img">
          <img src="{{ config.baseUrl }}{% if item.data.thumbnail %}{{ item.data.thumbnail }}{% else %}assets/site/thumbnail-component.png{% endif %}" alt="{{ item.data.meta_image_description }}" loading="lazy" decoding="async">
        </div>
      </div>
      <header class="usa-card__header">
        <h3 class="usa-card__heading font-lang-lg">
          <a href="{{ config.baseUrl }}{{ item.url | remove_first: '/' }}">{{ item.data.title }}</a>
        </h3>
      </header>
      <div class="usa-card__body font-lang-sm">
        <p>{{ item.data.story }}</p>{% if item.data.url_uswds %}<p class="margin-bottom-0"><small>Extends the <a href="{{ item.data.url_uswds }}" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS {{ item.data.nice_uswds }}</a>.</small></p>{% endif %}
      </div>
    </div>
  </li>
  {% endunless %}
  {% endfor %}
</ul>
