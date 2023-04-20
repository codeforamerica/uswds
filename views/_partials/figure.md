<div class="border margin-bottom-3 padding-3 radius-lg">
  <figure class="margin-0 margin-bottom-3">
    <figcaption>{{ nice }}</figcaption>
    {% package name context %}{{ body }}{% endpackage %}
  </figure>

  <figure class="margin-0 margin-bottom-3">
    <figcaption>HTML</figcaption>
    {% package name context true %}{{ body }}{% endpackage %}
  </figure>
</div>