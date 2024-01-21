# Other Activities

{% for proj in site.data.otherprojlist %}

<div class="row">

<div class="well col-sm-18 clearfix">
  <div class="col-sm-4">
  <a href="{{ proj.url }}"><img src="{{ site.url }}{{ site.baseurl }}/images/pubpic/{{ proj.image }}" class="img-responsive" width="100%" style="float: left; padding-right: 10px" /></a>
  </div>
  <div class="col-sm-8">
  <pubtit>{{ proj.title }}</pubtit>
  <p style="color:rgb(128,128,128);"><em>{{ proj.type }} ({{ proj.time }})</em></p>
  <ul>
  {% for bullet in proj.bullets %}
    <li>{{ bullet }}</li>
  {% endfor %}
  </ul>
  </div>
</div>

</div>

{% endfor %}
