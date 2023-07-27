## Source and usage {#source-and-usage}

{% capture package %}{% getFile name %}{% endcapture %}
{% capture stylesheet %}{% getFile name 'stylesheet' %}{% endcapture %}
{% capture thymeleaf %}{% getFile name 'thymeleaf' %}{% endcapture %}
{% capture erb %}{% getFile name 'erb' %}{% endcapture %}

{% for i in package %}
<p class="usa-icon-list__item">
  <span class="usa-icon-list__icon"><svg class="usa-icon" aria-hidden="true" focusable="false" role="img"><use href="{{ config.baseUrl }}uswds/img/sprite.svg#folder_open"></use></svg></span>
  <span class="usa-icon-list__content"><strong>Package:</strong> <a href="{{ pckg.repository.url }}{{ package | replace: pckg.name, '/tree/main' }}" target="_blank" class="usa-link--external bg-base-lightest padding-2px padding-x-05 radius-sm font-mono-xs">{{ package }}</a></span>
</p>

{{ config.dictionary.package }} Learn more about packages on the <a href="https://designsystem.digital.gov/components/packages/" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS documentation site</a>.
{% endfor %}

<ul class="usa-content-list">
  {% if sass != false %}<li>
    {% for i in stylesheet %}<strong>Sass stylesheet:</strong> <code>.{{ stylesheet | replace: package, '' }}</code>
    {% endfor %}{% if stylesheets %}<div class="font-body-3xs"><em>Additional required stylesheets from other packages:</em><ul class="font-body-3xs">{{ stylesheets }}</ul></div>{% endif %}
  </li>{% endif %}
  {% for i in thymeleaf %}<li><strong>Thymeleaf template fragment:</strong> <code>.{{ thymeleaf | replace: package, '' }}</code></li>{% endfor %}
  {% for i in erb %}<li><strong>Embedded Ruby (ERB) partial template:</strong> <code>.{{ erb | replace: package, '' }}</code></li>{% endfor %}
  {% if javascript %}<li><strong>JavaScript</strong> {{ javascript }} Guidance on individual module loading will added. Currently, there is one script that imports all modules. The source is located at
<code>@codeforamerica/js/index.js</code>. This entrypoint is compiled using Rollup.js and distributed to <code>@codeforamerica/dist/js/default.js</code>.</li>{% endif %}
</ul>

{% if sass != false %}
<figure class="border border-base-lighter margin-0 margin-y-3 padding-3 radius-lg" tabindex="0" aria-label="Sass">
  <figcaption class="margin-bottom-2">
    <strong>Sass theme settings and stylesheet loading</strong>
    <p>Below is a demonstration of{% if theme %} customizing the component theme settings and{% endif %} importing {% if stylesheets %}Sass stylesheets{% else %}the Sass stylesheet{% endif %} from the package.{% if usage %} Refer to the <a href="{{ usage }}" target="_blank" rel="noopener nofollow" class="usa-link--external">usage documentation</a> for additional settings.{% endif %}</p>
  </figcaption>
  <div class="code-block"><pre class="language-scss">{% if theme %}@use 'uswds-core' with (
  {{ theme }},
  // ... additional theme settings here ...
);
{% endif %}@forward 'uswds';
{% for i in stylesheet %}@forward '{{ stylesheet }}';{% endfor %}
{% if stylesheets_import %}{{ stylesheets_import }}{% endif %}</pre></div>
</figure>
{% endif %}

{% for i in thymeleaf %}
<figure class="border border-base-lighter margin-0 margin-bottom-3 padding-3 radius-lg" tabindex="0" aria-label="Thymeleaf">
  <div class="margin-0 margin-bottom-3">
    <figcaption class="margin-bottom-2">
      <strong>Thymeleaf template fragment</strong>
      <p>This is the pre-rendered template fragment from the package. It is the same template used to render the demonstrations above. You may copy and paste from this example or use the template using the <code>th:block th:replace</code> tag. See the example below.</p>
    </figcaption>
    {% thymeleaf name %}
  </div>

  <div class="margin-0">
    <div class="margin-bottom-2">
      <strong>Template fragment inclusion</strong>
      <p>Below is an example of how to use the fragment from the package directory using the <code>th:block th:replace</code> inclusion tag. Replace the fragment parameters using your variables or context.</p>
    </div>
    {% thymeleaf name true %}
  </div>
</figure>
{% endfor %}

{% for i in erb %}
<figure class="border border-base-lighter margin-0 margin-bottom-3 padding-3 radius-lg" tabindex="0" aria-label="Embedded Ruby">
  <div class="margin-0 margin-bottom-3">
    <figcaption class="margin-bottom-2">
      <strong>ERB template partial</strong>
      <p>This is the pre-rendered partial template from the package. You may copy and paste from this example or use the template directly from the path.</p>
    </figcaption>
    {% erb name %}
  </div>

  <div class="margin-0">
    <div class="margin-bottom-2">
      <strong>Partial render</strong>
      <p>Below is an example of how to include the partial in a view from the package directory using the Ruby <code>ERB</code> class. Replace the argument values using your variables or context. In a Rails environment, the <code>render</code> method can be used instead with the same hash values.</p>
    </div>
    {% erb name true %}
  </div>
</figure>
{% endfor %}
