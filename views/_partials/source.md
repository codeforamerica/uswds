### Source

<ul class="usa-content-list">
  {% capture package %}{% getFile name %}{% endcapture %}
  {% for i in package %}<li><strong>Package:</strong> {{ package }}</li>{% endfor %}

  {% capture thymeleaf %}{% getFile name 'thymeleaf' %}{% endcapture %}
  {% for i in thymeleaf %}<li><strong>Thymeleaf template:</strong> {{ thymeleaf }}</li>{% endfor %}

  {% capture erb %}{% getFile name 'erb' %}{% endcapture %}
  {% for i in erb %}<li><strong>ERB template:</strong> {{ erb }}</li>{% endfor %}

  {% capture stylesheet %}{% getFile name 'stylesheet' %}{% endcapture %}
  {% for i in stylesheet %}<li><strong>SCSS Stylesheet:</strong> {{ stylesheet }}</li>{% endfor %}
</ul>

<div class="border margin-0 margin-bottom-3 padding-3 radius-lg">
  {% for i in thymeleaf %}
  <figure class="margin-0 margin-bottom-3">
    <figcaption>Thymeleaf template</figcaption>
    {% thymeleaf name %}
  </figure>
  {% endfor %}

  {% for i in erb %}
  <figure class="margin-0">
    <figcaption>Embedded Ruby (ERB) template</figcaption>
    {% erb name %}
  </figure>
  {% endfor %}
</div>
