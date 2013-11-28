<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="yi.util.*" %>
<!-- Hello World 演示，轮播组件 -->
<div class="container carousel-android-container">
  <div class="center-block">
    <div id="carousel-android-captions" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carousel-android-captions" data-slide-to="0" class="active"></li>
        <li data-target="#carousel-android-captions" data-slide-to="1"></li>
        <li data-target="#carousel-android-captions" data-slide-to="2"></li>
        <li data-target="#carousel-android-captions" data-slide-to="3"></li>
      </ol>
      <div class="carousel-inner">
        <div class="item active">
          <div class="carousel-android-content">
            <img src="<%=PageUtils.modPath(request)%>img/gingerbread.jpg" alt="Gingerbread">
          </div>
          <div class="carousel-caption">
            <h3>Gingerbread</h3>
            <p>Gingerbread - Android 2.3</p>
          </div>
        </div>
        <div class="item">
          <div class="carousel-android-content">
            <img src="<%=PageUtils.modPath(request)%>img/honeycomb.jpg" alt="Honeycomb">
          </div>
          <div class="carousel-caption">
            <h3>Honeycomb</h3>
            <p>Honeycomb - Android 3.0/3.1</p>
          </div>
        </div>
        <div class="item">
          <div class="carousel-android-content">
            <img src="<%=PageUtils.modPath(request)%>img/icecream_sandwich.jpg" alt="IceCream Sandwich">
          </div>
          <div class="carousel-caption">
            <h3>IceCream Sandwich</h3>
            <p>IceCream Sandwich - Android 4.0</p>
          </div>
        </div>
        <div class="item">
          <div class="carousel-android-content">
            <img id="img_jellybean" data-src="holder.js/200x200/text:Jelly Bean" alt="Jelly Bean">
          </div>
          <div class="carousel-caption">
            <h3>Jelly Bean</h3>
            <p>Jelly Bean - Android 4.1</p>
          </div>
        </div>
      </div>
      <a class="left carousel-control" href="#carousel-android-captions" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left"></span>
      </a>
      <a class="right carousel-control" href="#carousel-android-captions" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right"></span>
      </a>
    </div>
  </div>
</div>
