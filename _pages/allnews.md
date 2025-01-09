---
layout: default
title: All News
permalink: /allnews.html
---

# All News

<div class="row">
<div class="well col-sm-18 clearfix">

{% for article in site.data.news %}

  <div class="col-sm-2" style="max-width: 10%;">
  <pubtit>{{ article.date }}</pubtit>
  </div>
  <div class="col-sm-10" style="max-width: 90%;">
  <p style="color:rgb(128,128,128);">{{ article.headline}}</p>
  </div>

{% endfor %}

</div>
</div>
