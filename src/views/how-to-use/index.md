---
tags: [primary, documentation]
title: How to use
collection: documentationByAlpha
layout: default
story: Guides to help you get started with the Code for America USWDS theme.
sublist: true
thumbnail: assets/site/thumbnail-how-to-use.png
thumbnail_description: Browse guides to help you get started with the Code for America USWDS theme.
---

<ul class="usa-card-group flex-row margin-top-4">
  {% for item in collections.documentationByAlpha %}
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
        <p>{{ item.data.story }}</p>
      </div>
    </div>
  </li>
  {% endunless %}
  {% endfor %}
</ul>
