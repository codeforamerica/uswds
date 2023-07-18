{% capture ID %}{% createId %}{% endcapture %}

<div class="border border-base-lighter margin-bottom-3 padding-3 radius-lg">
  <figure tabindex="0" class="margin-0 margin-bottom-3">
    {% if caption %}<figcaption class="margin-bottom-2">{{ caption }}</figcaption>{% endif %}
    {% package name context %}{{ body }}{% endpackage %}
  </figure>

  <figure class="margin-0">
    <div class="usa-accordion cfa-accordion">
      <figcaption class="usa-accordion__heading">
        <button type="button" class="usa-accordion__button" aria-expanded="false" aria-controls="aria-c-{{ ID }}">
          View HTML
        </button>
      </figcaption>
      <div id="aria-c-{{ ID }}" class="usa-accordion__content overflow-visible padding-0">
        {% package name context true %}{{ body }}{% endpackage %}
      </div>
    </div>
  </figure>
</div>