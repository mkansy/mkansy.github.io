# Teaching

<p>**Note**: The links below only work for ETH students.</p>

<div class="row">
<div class="well col-sm-18 clearfix">

{% for course in site.data.teachinglist %}

  <div class="col-sm-4">
  <pubtit><a href="{{ course.url }}">{{ course.name }}</a></pubtit>
  </div>
  <div class="col-sm-8">
  <p style="color:rgb(128,128,128);">{{ course.type }} ({{ course.time }})</p>
  </div>

{% endfor %}

</div>
</div>
