# Student Supervision

<p>If you are an ETH student and are interested in doing your thesis in our group, feel free to reach out to me via <a href="mailto:manuel.kansy@inf.ethz.ch">email</a>.</p>

<div class="row">
<div class="well col-sm-18 clearfix">

{% for proj in site.data.studentlist %}

  <div class="col-sm-4">
  <pubtit>{{ proj.name }}</pubtit>
  </div>
  <div class="col-sm-8">
  <p style="color:rgb(128,128,128);">{{ proj.type }} ({{ proj.time }})</p>
  </div>

{% endfor %}

</div>
</div>
