# Supervision

<div class="row">
<div class="well col-sm-18 clearfix">

{% for stud in site.data.studentlist %}

  <div class="col-sm-4">
  <pubtit><a href="{{ stud.url }}">{{ stud.name }}</a></pubtit>
  </div>
  <div class="col-sm-8">
  <p style="color:rgb(128,128,128);">{{ stud.type }} ({{ stud.time }})</p>
  </div>

{% endfor %}

</div>
</div>
