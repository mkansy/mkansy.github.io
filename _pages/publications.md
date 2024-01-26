# Publications

{% assign number_printed = 0 %}
{% for publi in site.data.publist %}

{% assign even_odd = number_printed | modulo: 2 %}
{% if publi.highlight == 1 %}

<div class="row">

<div class="well col-sm-18 clearfix">
  <div class="col-sm-4">
  <img src="{{ site.url }}{{ site.baseurl }}/images/pubpic/{{ publi.image }}" class="img-responsive" width="100%" style="float: left; padding-right: 10px" />
  </div>
  <div class="col-sm-8">
  <pubtit>{{ publi.title }}</pubtit>
  <p style="color:rgb(128,128,128);"><em>{{ publi.conference }}</em></p>
  <p>{{ publi.description }}</p>
  <p><em>{{ publi.authors }}</em></p>
  <p style="display:inline"><strong>
    <a href="{{ publi.link.url }}">{{ publi.link.display }}</a> {% if publi.link2 %} &nbsp; --- &nbsp; <a href="{{ publi.link2.url }}">{{ publi.link2.display }}</a>{% endif %} {% if publi.link3 %} &nbsp; --- &nbsp; <a href="{{ publi.link3.url }}">{{ publi.link3.display }}</a>{% endif %} {% if publi.link4 %} &nbsp; --- &nbsp; <a href="{{ publi.link4.url }}">{{ publi.link4.display }}</a>{% endif %}
  </strong></p>
  <p class="text-danger"><strong> {{ publi.news1 }}</strong></p>
  <p> {{ publi.news2 }}</p>
  </div>
</div>

{% assign number_printed = number_printed | plus: 1 %}

</div>


{% endif %}
{% endfor %}
