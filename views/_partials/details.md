## Details {#details}

{% capture icon_info %}<svg class="usa-icon margin-left-2px" aria-hidden="true" focusable="false" role="img"><use href="{{ config.baseUrl }}uswds/img/sprite.svg#info_outline"></use></svg>{% endcapture %}

{% capture icon_details %}<svg class="usa-icon" aria-hidden="true" focusable="false" role="img"><use xlink:href="{{ config.baseUrl }}uswds/img/sprite.svg#arrow_drop_down"></use></svg>{% endcapture %}

<ul class="usa-content-list">
  {% if url_uswds %}<li><strong>Extends:</strong> <a href="{{ url_uswds }}" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS {{ nice_uswds }}</a></li>{% endif %}
  {% if url_honeycrisp %}<li><strong>Honeycrisp:</strong> <a href="{{ url_honeycrisp }}" target="_blank" rel="noopener nofollow" class="usa-link--external">{{ nice_honeycrisp }}</a></li>{% endif %}
  {% if tokens or styles %}
  <li>
    <strong>Customization:</strong> {% if tokens %}<abbr class="usa-tooltip display-inline-flex flex-align-center" data-position="bottom" title="{{ dictionary.tokens }}">Design tokens {{ icon_info }}</abbr>{% endif %}
    {% if tokens and styles %}and {% endif %}{% if styles %}<abbr class="usa-tooltip display-inline-flex flex-align-center" data-position="bottom" title="{{ dictionary.styles }}">Styles {{ icon_info }}</abbr>{% endif %}
  </li>
  {% endif %}
  {% if modifier_honeycrisp %}<li><strong><abbr class="usa-tooltip display-inline-flex flex-align-center" data-position="bottom" title="{{ dictionary.modifier }}">Modifier {{ icon_info }}:</abbr></strong> {% for modifier in modifier_honeycrisp %}<code>{{ modifier }}</code>{% if forloop.index != forloop.length %}, {% endif %}{% endfor %}</li>{% endif %}
  <li>
    <details>
      <summary class="usa-button cfa-button usa-button--unstyled">More details{{ icon_details }}</summary>
      {% if details_custom %}{{ details_custom }}{% else %}
      <p>{% if url_uswds %}The <b>{{ name }}</b> extends the <a href="{{ url_uswds }}" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS {{ nice_uswds }}</a>. {% endif %}{% if tokens %}The visual appearance is modified using <b>design tokens</b> {% if url_uswds %}applied to the <a href="{{ url_uswds_usage }}" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS {{ nice_uswds }} settings</a> {% endif %}from the <a href="{{ url_honeycrisp }}" target="_blank" rel="noopener nofollow" class="usa-link--external">Honeycrisp {{ nice_honeycrisp }}</a>.{% endif %}{% if modifier_honeycrisp %} Further customization is applied using the <b>CSS modifier(s)</b> {% for modifier in modifier_honeycrisp %}<code>{{ modifier }}</code>{% if forloop.index != forloop.length %}, {% endif %}{% endfor %} to add <b>styles</b> defined in a custom stylesheet.{% endif %}</p>{% endif %}
    </details>
  </li>
</ul>


