{% capture ID %}{% createId %}{% endcapture %}

<figure class="border border-base-lighter margin-0 margin-y-3 padding-3 tablet:padding-4 radius-lg" {% if label %}aria-label="{{ label }}"{% endif %}>
  {% if caption %}<figcaption class="margin-bottom-2">{{ caption }}</figcaption>{% endif %}

  {% component name context false true %}

  <div class="margin-0 margin-top-3">
    <div class="usa-accordion cfa-accordion">
      <div class="usa-accordion__heading">
        <button type="button" class="usa-accordion__button" aria-expanded="false" aria-controls="aria-c-html-{{ ID }}">
          View HTML
        </button>
      </div>
      <div id="aria-c-html-{{ ID }}" class="usa-accordion__content overflow-visible">
        <p>The HTML for the demonstration above is rendered using context passed to the component's Thymeleaf template fragment. Learn how to include component templates for Thymeleaf and Ruby in the <a href="#source-and-usage">source and usage section</a>.</p>
        {% component name context true true %}
      </div>
      <div class="usa-accordion__heading">
        <button type="button" class="usa-accordion__button" aria-expanded="false" aria-controls="aria-c-context-{{ ID }}">
          View context passed to this component
        </button>
      </div>
      <div id="aria-c-context-{{ ID }}" class="usa-accordion__content overflow-visible">
        <p>{{ dictionary.context }} The context here is defined as JSON but the root attributes are translated to different variable syntaxes for Thymeleaf and Ruby templates. Learn how to pass these variables to each component template in the <a href="#source-and-usage">source and usage section</a>.</p>
        {% block 'json' context %}
      </div>
    </div>
  </div>
</figure>