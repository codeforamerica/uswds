## Details {#details}

<ul class="usa-content-list">
  {% if url_uswds %}<li><strong>Extends:</strong> <a href="{{ url_uswds }}" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS {{ nice_uswds }}</a></li>{% endif %}
  {% if url_honeycrisp %}<li><strong>Honeycrisp:</strong> <a href="{{ url_honeycrisp }}" target="_blank" rel="noopener nofollow" class="usa-link--external">{{ nice_honeycrisp }}</a></li>{% endif %}
  {% if tokens or styles %}
  <li>
    <strong>Customization:</strong> {% if tokens %}<abbr title="{{ dictionary.tokens }}">Tokens</abbr>{% endif %}
    {% if tokens and styles %}and {% endif %}{% if styles %}<abbr title="{{ dictionary.styles }}">Styles</abbr>{% endif %}
  </li>
  {% endif %}
  {% if modifier_honeycrisp %}<li><strong><abbr title="{{ dictionary.modifier }}">Modifier</abbr>:</strong> <code>{{ modifier_honeycrisp }}</code></li>{% endif %}
</ul>

The **{{ name }}** extends the <a href="{{ url_uswds }}" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS {{ nice_uswds }}</a>. The visual appearance is modified using **design tokens** applied to the <a href="{{ url_uswds }}{{ url_uswds_usage }}" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS {{ nice_uswds }} settings</a> from the <a href="{{ url_honeycrisp }}" target="_blank" rel="noopener nofollow" class="usa-link--external">Honeycrisp {{ nice_honeycrisp }}</a>.{% if modifier_honeycrisp %} Further styling is applied using the **CSS modifier** `.cfa-alert` to add **styles** defined in a custom stylesheet.{% endif %}