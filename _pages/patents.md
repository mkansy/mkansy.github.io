# Patents

<div class="row">
<div class="well col-sm-18 clearfix">

{% for patent in site.data.patentlist %}
{% assign author_text = patent.authors | replace: 'Manuel Kansy','<span style="color:rgb(0,0,0);">Manuel Kansy</span>' %}

<div class="col-sm-4">
  <pubtit><a href="{{ patent.url }}">{{ patent.patent_number }}</a></pubtit>
</div>
<div class="col-sm-8">
<pubtit>{{ patent.title }}</pubtit>
<p style="color:rgb(128,128,128);"><em>{{ author_text | safe }}</em></p>
</div>
{% endfor %}

</div>
</div>

