---
tags: [primary, component]
title: Components
collection: componentByAlpha
layout: default
story: Simple and consistent solutions to common user-interface needs. The Code for America USWDS theme contains the following components.
sublist: true
---

<ul class="usa-card-group flex-row margin-top-4">
  {% for item in collections.componentByAlpha %}
  {% unless item.data.tags contains 'primary' %}
  <li class="usa-card site-component-card mobile-lg:grid-col-6 margin-bottom-2" role="region" aria-label="{{ item.data.title }} component">
    <div class="usa-card__container">
      <div class="usa-card__media">
        <div class="usa-card__img">
          <img src="{{ config.baseUrl }}{% if item.data.thumbnail %}{{ item.data.thumbnail }}{% else %}assets/img/thumbnail-component.png{% endif %}" alt="{{ item.data.meta_image_description }}" loading="lazy" decoding="async">
        </div>
      </div>
      <header class="usa-card__header">
        <h3 class="usa-card__heading font-lang-lg">
          <a href="{{ config.baseUrl }}{{ item.url | remove_first: '/' }}">{{ item.data.title }}</a>
        </h3>
      </header>
      <div class="usa-card__body font-lang-sm">
        <p>{{ item.data.story }}</p>
        {% if item.data.url_uswds %}<p class="margin-bottom-0"><small>Extends the <a href="{{ item.data.url_uswds }}" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS {{ item.data.nice_uswds }}</a>.</small></p>{% endif %}
      </div>
    </div>
  </li>
  {% endunless %}
  {% endfor %}
</ul>

For a full list of available USWDS components refer to guidance on the USWDS documentation site.

<a class="usa-button cfa-button usa-button--outline" href="https://designsystem.digital.gov/components/overview" target="_blank" rel="noopener nofollow">
  <span>USWDS documentation site</span>

  <svg class="usa-icon" aria-hidden="true" focusable="false" role="img">
    <use href="{{ config.baseUrl }}assets/img/sprite.svg#launch"></use>
  </svg>
</a>
