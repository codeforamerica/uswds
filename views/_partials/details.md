## Details {#details}

{% capture icon_info %}
<svg class="usa-icon margin-left-2px" aria-hidden="true" focusable="false" role="img"><use xlink:href="/uswds/img/sprite.svg#info_outline"></use></svg>
{% endcapture %}

<ul class="usa-content-list">
  {% if url_uswds %}<li><strong>Extends:</strong> <a href="{{ url_uswds }}" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS {{ nice_uswds }}</a></li>{% endif %}
  {% if url_honeycrisp %}<li><strong>Honeycrisp:</strong> <a href="{{ url_honeycrisp }}" target="_blank" rel="noopener nofollow" class="usa-link--external">{{ nice_honeycrisp }}</a></li>{% endif %}
  {% if tokens or styles %}
  <li>
    <strong>Customization:</strong> {% if tokens %}<abbr class="usa-tooltip display-inline-flex flex-align-center" data-position="bottom" title="{{ dictionary.tokens }}">Design tokens {{ icon_info }}</abbr>{% endif %}
    {% if tokens and styles %}and {% endif %}{% if styles %}<abbr class="usa-tooltip display-inline-flex flex-align-center" data-position="bottom" title="{{ dictionary.styles }}">Styles {{ icon_info }}</abbr>{% endif %}
  </li>
  {% endif %}
  {% if modifier_honeycrisp %}<li><strong><abbr class="usa-tooltip display-inline-flex flex-align-center" data-position="bottom" title="{{ dictionary.modifier }}">Modifier {{ icon_info }}:</abbr></strong> <code>{{ modifier_honeycrisp }}</code></li>{% endif %}
</ul>

The **{{ name }}** extends the <a href="{{ url_uswds }}" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS {{ nice_uswds }}</a>. The visual appearance is modified using **design tokens** applied to the <a href="{{ url_uswds }}{{ url_uswds_usage }}" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS {{ nice_uswds }} settings</a> from the <a href="{{ url_honeycrisp }}" target="_blank" rel="noopener nofollow" class="usa-link--external">Honeycrisp {{ nice_honeycrisp }}</a>.{% if modifier_honeycrisp %} Further styling is applied using the **CSS modifier** `.cfa-alert` to add **styles** defined in a custom stylesheet.{% endif %}