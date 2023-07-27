---
title: Homepage
layout: full
intro:
---

<section class="usa-section margin-y-8">
  <div class="grid-container">
    <div class="usa-prose text-center tablet-lg:width-tablet-lg margin-x-auto padding-y-8 padding-x-2 tablet:padding-x-8 radius-lg bg-white">
      <h1>
        <span class="usa-sr-only">{{ package.nice }}</span>
        <svg aria-hidden="true" width="573" height="128" xmlns="http://www.w3.org/2000/svg" class="maxw-full">
          <use href="#logo">
        </svg>
      </h1>
      <p class="usa-intro">{{ package.description }}</p>
      <div>
        <a class="cfa-button usa-button usa-button--outline usa-button--big margin-x-0" href="{{ config.baseUrl }}components">
          <span>View components</span>
          <svg class="usa-icon" aria-hidden="true" focusable="false" role="img">
            <use href="{{ config.baseUrl }}uswds/img/sprite.svg#arrow_forward"></use>
          </svg>
        </a>
      </div>
      <div>
        <a href="{{ package.repository.url }}" target="_blank" rel="noopener nofollow" class="cfa-button usa-button usa-button--outline margin-x-0">
          <span>v{{ package.version }}</span>
          <svg class="usa-icon" aria-hidden="true" focusable="false" role="img">
            <use href="{{ config.baseUrl }}uswds/img/sprite.svg#launch"></use>
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>
