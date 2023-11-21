## Source and usage {#source-and-usage}

{% capture package %}{% getFile name %}{% endcapture %}
{% capture stylesheet %}{% getFile name 'stylesheet' %}{% endcapture %}
{% capture thymeleaf %}{% getFile name 'thymeleaf' %}{% endcapture %}
{% capture erb %}{% getFile name 'erb' %}{% endcapture %}

{% for i in package %}
<p class="usa-icon-list__item">
  <span class="usa-icon-list__icon"><svg class="usa-icon" aria-hidden="true" focusable="false" role="img"><use href="{{ config.baseUrl }}assets/img/sprite.svg#folder_open"></use></svg></span>
  <span class="usa-icon-list__content"><strong>Package:</strong> <a href="{{ pckg.repository.url }}{{ package | replace: pckg.name, '/tree/main' }}" target="_blank" class="usa-link--external code">{{ package }}</a></span>
</p>

{{ config.dictionary.package }} <a href="https://designsystem.digital.gov/components/packages" target="_blank" rel="noopener nofollow" class="usa-link--external">Learn more about packages on the USWDS documentation site</a>.
{% endfor %}

<ul class="usa-content-list">
  {% for i in stylesheet %}<li><strong>Sass stylesheet:</strong> <code>.{{ stylesheet | replace: package, '' }}</code></li>{% endfor %}
  {% for i in thymeleaf %}<li><strong>Thymeleaf template fragment:</strong> <code>.{{ thymeleaf | replace: package, '' }}</code></li>{% endfor %}
  {% for i in erb %}<li><strong>Embedded Ruby (ERB) partial template:</strong> <code>.{{ erb | replace: package, '' }}</code></li>{% endfor %}
  {% if javascript %}<li><strong>JavaScript</strong> {{ javascript }} Guidance on individual module loading will added. Currently, there is one script that imports all modules. The source is located at
<code>@codeforamerica/js/index.js</code>. This entrypoint is compiled using Rollup.js and distributed to <code>@codeforamerica/dist/js/default.js</code>.</li>{% endif %}
</ul>

{% if theme %}
<div class="border border-base-lighter margin-0 margin-bottom-3 padding-3 radius-lg">
  <figure class="margin-0">
    <figcaption class="margin-bottom-2">
      <strong>Sass theme settings</strong>
      <p>Below is a demonstration of customizing the component theme settings. Refer to the <a href="https://docs.google.com/spreadsheets/d/1nVIAmi6pRDu5Z7II6ttwKryGrdYBhuJYmpO4YjXmuxQ/edit#gid=0" target="_blank" rel="noopener nofollow" class="usa-link--external">theme and package-level settings documentation</a>{% if usage %} or <a href="{{ usage }}" target="_blank" rel="noopener nofollow" class="usa-link--external">usage documentation</a> for additional USWDS settings{% endif %}.</p>
    </figcaption>
    {% block 'scss' theme %}
  </figure>
</div>
{% endif %}

{% for i in thymeleaf %}
<div class="border border-base-lighter margin-0 margin-bottom-3 padding-3 radius-lg">
  <figure class="margin-0 margin-bottom-3">
    <figcaption class="margin-bottom-2">
      <strong id="aria-lb-th-label">Thymeleaf template fragment</strong>
      <p>This is the pre-rendered template fragment from the package. It is the same template used to render the demonstrations above. You may copy and paste from this example or use the template using the <code>th:block th:replace</code> tag. See the example below.</p>
    </figcaption>
    {% thymeleaf name %}
  </figure>

  <figure class="margin-0">
    <figcaption class="margin-bottom-2">
      <strong>Template fragment inclusion</strong>
      <p>Below is an example of how to use the fragment from the package directory using the <code>th:block th:replace</code> inclusion tag. Replace the fragment parameters using your variables or context.</p>
    </figcaption>
    {% thymeleaf name true %}
  </figure>
</div>
{% endfor %}

{% for i in erb %}
<div class="border border-base-lighter margin-0 margin-bottom-3 padding-3 radius-lg">
  <figure class="margin-0 margin-bottom-3">
    <figcaption class="margin-bottom-2">
      <strong>ERB template partial</strong>
      <p>This is the pre-rendered partial template from the package. You may copy and paste from this example or use the template directly from the path.</p>
    </figcaption>
    {% erb name %}
  </figure>

  <figure class="margin-0">
    <figcaption class="margin-bottom-2">
      <strong>Partial render</strong>
      <p>Below is an example of how to include the partial in a view from the package directory using the Ruby <code>ERB</code> class. Replace the argument values using your variables or context. In a Rails environment, the <code>render</code> method can be used instead with the same hash values.</p>
    </figcaption>
    {% erb name true %}
  </figure>
</div>
{% endfor %}
