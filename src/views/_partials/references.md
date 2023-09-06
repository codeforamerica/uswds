{% if ref_main %}

Refer to additional guidance on the USWDS documentation site.

<a class="usa-button cfa-button usa-button--outline" href="{{ ref_main }}" target="_blank" rel="noopener nofollow">
  <span>USWDS documentation site</span>

  <svg class="usa-icon" aria-hidden="true" focusable="false" role="img">
    <use href="{{ config.baseUrl }}assets/img/sprite.svg#launch"></use>
  </svg>
</a>

{% endif %}

{% if ref_additional %}

<b>Additional references</b>

<div class="font-body-3xs">
  {{ ref_additional }}
</div>

{% endif %}