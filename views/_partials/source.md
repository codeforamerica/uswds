## Source and usage {#source-and-usage}

{% capture package %}{% getFile name %}{% endcapture %}
{% for i in package %}
<p class="usa-icon-list__item">
  <span class="usa-icon-list__icon"><svg class="usa-icon" aria-hidden="true" focusable="false" role="img"><use href="{{ config.baseUrl }}uswds/img/sprite.svg#folder_open"></use></svg></span>
  <span class="usa-icon-list__content"><strong>Package:</strong> <code>{{ package }}</code></span>
</p>
{% endfor %}

{{ config.dictionary.package }} Learn more about packages on the <a href="https://designsystem.digital.gov/components/packages/" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS documentation site</a>.

<ul class="usa-content-list">
  {% capture stylesheet %}{% getFile name 'stylesheet' %}{% endcapture %}
  {% for i in stylesheet %}<li><strong>Sass stylesheet:</strong> <code>..{{ stylesheet | replace: package, '' }}</code></li>{% endfor %}
  {% capture thymeleaf %}{% getFile name 'thymeleaf' %}{% endcapture %}
  {% for i in thymeleaf %}<li><strong>Thymeleaf template fragment:</strong> <code>..{{ thymeleaf | replace: package, '' }}</code></li>{% endfor %}
  {% capture erb %}{% getFile name 'erb' %}{% endcapture %}
  {% for i in erb %}<li><strong>Embedded Ruby (ERB) partial template:</strong> <code>..{{ erb | replace: package, '' }}</code></li>{% endfor %}
</ul>

<figure class="border border-base-lighter margin-bottom-3 padding-3 radius-lg margin-0 margin-bottom-3">
  <figcaption class="margin-bottom-2">
    <strong>Sass theme settings and stylesheet loading</strong>
    <p>Below is a demonstration of customizing the component theme settings and loading the Sass stylesheet from the package. Refer to the <a href="{{ usage }}" target="_blank" rel="noopener nofollow" class="usa-link--external">usage documentation</a> for additional settings.</p>
  </figcaption>
  <div class="code-block"><pre>@use 'uswds-core' with (
  {{ theme }},
  // ... additional theme settings here ...
);
@forward 'uswds';
@forward '{{ stylesheet }}';</pre></div>
</figure>

{% for i in thymeleaf %}
<div class="border border-base-lighter margin-bottom-3 padding-3 radius-lg">
  <figure class="margin-0 margin-bottom-3">
    <figcaption class="margin-bottom-2">
      <strong>Thymeleaf template fragment</strong>
      <p>This is the pre-rendered template fragment from the package. It is the same template used to render the demonstrations above. You may copy and paste from this example or use the template using the <code>th:block th:replace</code> tag. See the example below.</p>
    </figcaption>
    {% thymeleaf name %}
  </figure>

  <figure class="margin-0 margin-bottom-3">
    <figcaption class="margin-bottom-2">
      <strong>Template fragment inclusion</strong>
      <p>Below is an example of how to use the fragment from the package directory using the <code>th:block th:replace</code> inclusion tag. Replace the fragment parameters using your variables or context.</p>
    </figcaption>
    {% thymeleaf name true %}
  </figure>
</div>
{% endfor %}

{% for i in erb %}
<div class="border border-base-lighter margin-bottom-3 padding-3 radius-lg">
  <figure class="margin-0 margin-bottom-3">
    <figcaption class="margin-bottom-2">
      <strong>ERB template partial</strong>
      <p>This is the pre-rendered partial template from the package. You may copy and paste from this example or use the template directly from the path.</p>
    </figcaption>
    {% erb name %}
  </figure>

  <figure class="margin-0 margin-bottom-3">
    <figcaption class="margin-bottom-2">
      <strong>Partial render</strong>
      <p>Below is an example of how to include the partial in a view from the package directory using the Rails <code>render</code> method. Replace the argument values using your variables or context.</p>
    </figcaption>
    {% erb name true %}
  </figure>
</div>
{% endfor %}