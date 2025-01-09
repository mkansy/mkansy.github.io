# Recent News

<div class="row">
<div class="well col-sm-18 clearfix">

{% for article in site.data.news limit:5 %}

  <div class="col-sm-2" style="max-width: 10%;">
  <pubtit>{{ article.date }}</pubtit>
  </div>
  <div class="col-sm-10" style="max-width: 90%;">
  <p style="color:rgb(128,128,128);">{{ article.headline}}</p>
  </div>

{% endfor %}

{% if site.data.news.size > 5 %}
<div class="col-sm-12">
<a href="{{ site.url }}{{ site.baseurl }}/allnews.html">... see all news</a>
</div>
{% endif %}

</div>
</div>
