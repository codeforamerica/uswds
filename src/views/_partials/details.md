## Details {#details}

{% capture icon_details %}<svg class="usa-icon" aria-hidden="true" focusable="false" role="img"><use href="{{ config.baseUrl }}assets/img/sprite.svg#chevron_right"></use></svg>{% endcapture %}

<ul class="usa-content-list">
  {% if url_uswds %}<li><strong>Extends:</strong> <a href="{{ url_uswds }}" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS {{ nice_uswds }}</a></li>{% endif %}
  {% if url_honeycrisp %}<li><strong>Honeycrisp:</strong> <a href="{{ url_honeycrisp }}" target="_blank" rel="noopener nofollow" class="usa-link--external">{{ nice_honeycrisp }}</a></li>{% endif %}
  {% if tokens or styles %}
  <li>
    <strong>Customization:</strong> {% if tokens %}Design tokens{% endif %}
    {% if tokens and styles %}and {% endif %}{% if styles %}Styles{% endif %}
  </li>
  {% endif %}
  {% if modifier_honeycrisp %}<li><strong>Modifier:</strong> {% for modifier in modifier_honeycrisp %}<code>{{ modifier }}</code>{% if forloop.index != forloop.length %}, {% endif %}{% endfor %}</li>{% endif %}
</ul>

<details class="cfa-details">
  <summary class="cfa-details__summary usa-prose">More details{{ icon_details }}</summary>
  <div class="cfa-details__content usa-prose">{% if details_custom %}{{ details_custom }}{% else %}
    <p>{% if url_uswds %}The <b>{{ name }}</b> extends the <a href="{{ url_uswds }}" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS {{ nice_uswds }}</a>. {% endif %}{% if tokens %}The visual appearance is modified using <b>design tokens</b> {% if url_uswds %}applied to the <a href="{{ url_uswds_usage }}" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS {{ nice_uswds }} settings</a> {% endif %}from the <a href="{{ url_honeycrisp }}" target="_blank" rel="noopener nofollow" class="usa-link--external">Honeycrisp {{ nice_honeycrisp }}</a>.{% endif %}{% if modifier_honeycrisp %} Further customization is applied using the <b>CSS modifier(s)</b> {% for modifier in modifier_honeycrisp %}<code>{{ modifier }}</code>{% if forloop.index != forloop.length %}, {% endif %}{% endfor %} to add <b>styles</b> defined in a custom stylesheet.{% endif %}</p>{% endif %}
    {% if tokens %}<p><b>Design tokens</b>. {{ dictionary.tokens }} <a href="https://bixal.github.io/uswds-design-tokens-guide" target="_blank" rel="noopener nofollow" class="usa-link--external">Learn more about tokens on the Bixal's Design Tokens Guide</a>.</p>{% endif %}
    {% if modifier_honeycrisp %}<p><b>Modifier</b>. {{ dictionary.modifier }}</p>{% endif %}</div>
</details>
