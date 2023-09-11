---
tags: [primary, component]
title: Components
collection: componentByAlpha
layout: default
story: Components are simple and consistent solutions to common user-interface needs.
sublist: true
---

The {{ package.nice }} contains customizations for the following components.

<ul class="usa-card-group flex-row margin-top-4">
  {% for item in collections.componentByAlpha %}
  {% unless item.data.tags contains 'primary' %}
  <li class="usa-card site-component-card mobile-lg:grid-col-6 tablet-lg:grid-col-4 margin-bottom-2" role="region" aria-label="{{ item.data.title }} component">
    <div class="usa-card__container">
      <header class="usa-card__header">
        <h3 class="usa-card__heading font-lang-lg">
          <a href="{{ config.baseUrl }}{{ item.url }}">{{ item.data.title }}</a>
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

For a full list of available USWDS components refer to guidance on the USWDS documentation site.

<a class="usa-button cfa-button usa-button--outline" href="https://designsystem.digital.gov/components/overview" target="_blank" rel="noopener nofollow">
  <span>USWDS documentation site</span>

  <svg class="usa-icon" aria-hidden="true" focusable="false" role="img">
    <use href="{{ config.baseUrl }}uswds/img/sprite.svg#launch"></use>
  </svg>
</a>
