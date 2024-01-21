# University Projects

{% for proj in site.data.projectlist %}

<div class="row">

<div class="well col-sm-18 clearfix">
  <div class="col-sm-4">
  <img src="{{ site.url }}{{ site.baseurl }}/images/pubpic/{{ proj.image }}" class="img-responsive" width="100%" style="float: left; padding-right: 10px" />
  </div>
  <div class="col-sm-8">
  <pubtit>{{ proj.title }}</pubtit>
  <p style="color:rgb(128,128,128);"><em>{{ proj.type }} ({{ proj.time }})</em></p>
  <ul>
  {% for bullet in proj.bullets %}
    <li>{{ bullet }}</li>
  {% endfor %}
  </ul>
  <p style="color:rgb(128,128,128);"><em>Used technologies: {{ proj.tech }}</em></p>
  </div>
</div>

</div>

{% endfor %}
