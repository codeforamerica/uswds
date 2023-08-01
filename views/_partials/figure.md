{% capture ID %}{% createId %}{% endcapture %}

<figure class="border border-base-lighter margin-0 margin-y-3 padding-3 tablet:padding-4 radius-lg" tabindex="0" {% if label %}aria-label="{{ label }}"{% endif %}>
  <div class="margin-0 margin-bottom-3">
    {% if caption %}<figcaption class="margin-bottom-2">{{ caption }}</figcaption>{% endif %}
    {% package name context %}{{ body }}{% endpackage %}
  </div>

  <div class="margin-0">
    <div class="usa-accordion cfa-accordion">
      <div class="usa-accordion__heading">
        <button type="button" class="usa-accordion__button" aria-expanded="false" aria-controls="aria-c-{{ ID }}">
          View HTML
        </button>
      </div>
      <div id="aria-c-{{ ID }}" class="usa-accordion__content overflow-visible padding-0">
        {% package name context true %}{{ body }}{% endpackage %}
      </div>
    </div>
  </div>
</figure>