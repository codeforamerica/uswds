---
layout: full
intro:
---

<section class="bg-main usa-section padding-y-8">
  <div class="grid-container padding-y-8">
    <div class="usa-prose text-center maxw-mobile-lg margin-x-auto radius-lg padding-y-8">
      <h1>
        <span class="usa-sr-only">{{ package.nice }}</span>
        <svg aria-hidden="true" width="573" height="128" class="maxw-full">
          <use href="#logo">
        </svg>
      </h1>
      <p class="usa-intro">{{ package.description }}</p>
      <div>
        <a class="cfa-button usa-button usa-button--outline usa-button--big margin-x-0" href="{{ config.baseUrl }}how-to-use">
          <span>How to use</span>
          <svg class="usa-icon" aria-hidden="true" focusable="false" role="img">
            <use href="{{ config.baseUrl }}assets/img/sprite.svg#arrow_forward"></use>
          </svg>
        </a>
      </div>
      <div>
        <a class="cfa-button usa-button usa-button--outline usa-button--big margin-x-0" href="{{ config.baseUrl }}components">
          <span>View components</span>
          <svg class="usa-icon" aria-hidden="true" focusable="false" role="img">
            <use href="{{ config.baseUrl }}assets/img/sprite.svg#arrow_forward"></use>
          </svg>
        </a>
      </div>
      <div>
        <a href="{{ package.repository.url }}/releases/tag/v{{ package.version }}" target="_blank" rel="noopener nofollow" class="usa-link--external">Latest release v{{ package.version }}</a>
      </div>
    </div>
  </div>
</section>
