## Accessibility {#accessibility .margin-bottom-2}

{% capture passes %}
<div class="usa-icon-list__icon text-green">
  <svg class="usa-icon" role="img">
    <title>Passes</title>
    <use href="/uswds/img/sprite.svg#check_circle"></use>
  </svg>
</div>
{% endcapture %}

{% capture unchecked %}
<div class="usa-icon-list__icon text-base">
  <svg class="usa-icon" role="img">
    <title>Unchecked</title>
    <use href="/uswds/img/sprite.svg#radio_button_unchecked"></use>
  </svg>
</div>
{% endcapture %}

<ul class="usa-icon-list">
  <li class="usa-icon-list__item">
    {% if theme_passes %}{{ passes }}{% else %}{{ unchecked }}{% endif %}<div class="usa-icon-list__content">Customization to the visual appearance of the {{ nice }} has been verified for <a href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html" target="_blank" rel="noopener nofollow" class="usa-link--external">WCAG 2.1 AA contrast minimum success</a>.</div>
  </li>
  <li class="usa-icon-list__item">
    {% if audit_passes %}{{ passes }}{% else %}{{ unchecked }}{% endif %}<div class="usa-icon-list__content">The {{ nice }} examples pass manual audits (WCAG 2.1 AA using <a href="https://www.deque.com/axe/browser-extensions/" target="_blank" rel="noopener nofollow" class="usa-link--external">axe</a> or <a href="https://developer.chrome.com/docs/lighthouse/accessibility/" target="_blank" rel="noopener nofollow" class="usa-link--external">Lighthouse</a>).</div>
  </li>
  <li class="usa-icon-list__item">
    {% if keyboard_passes %}{{ passes }}{% else %}{{ unchecked }}{% endif %}<div class="usa-icon-list__content">The {{ nice }} passes keyboard interaction tests. <em>{{ keyboard_test }}</em></div>
  </li>
  <li class="usa-icon-list__item">
    {% if resize_passes %}{{ passes }}{% else %}{{ unchecked }}{% endif %}<div class="usa-icon-list__content">The {{ nice }} achieves <a href="https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html" target="_blank" rel="noopener nofollow" class="usa-link--external">WCAG 2.1 AA resizing success</a>. <em>Resizing text up to 200% without loss of content or functionality.</em></div>
  </li>
  <li class="usa-icon-list__item">
    {% if guidance_passes %}{{ passes }}{% else %}{{ unchecked }}{% endif %}<div class="usa-icon-list__content">Guidance on ensuring {{ nice }} accessibility has been provided in this documentation.</div>
  </li>
</ul>

**Additional items**

{{ additional }}

Refer to <a href="{{ url_uswds }}#accessibility" target="_blank" rel="noopener nofollow" class="usa-link--external">additional accessibility guidance on the USWDS documentation site</a>.
