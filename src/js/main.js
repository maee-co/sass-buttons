// scss
require('../sass/sass-buttons/main.scss');

// include library
var $ = require('jquery');
window.jQuery = $;

//include js
require('./hoge');


$(function(){
  console.log('Hello World!');
  $('.button').on('click', function(e) {
    e.preventDefault();
  });

  $('.button-circle').on('click', function(e) {
    e.preventDefault();
  });

  $('#loading').on('click', function(e){
    $(this).toggleClass('is-loading');
  });

  $('#anime1').on('click', function(e){
    $(this).addClass('jello animated');
  });
  $('#anime1').bind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $(this).removeClass('jello animated');
  });

  $('#anime2').on('click', function(e){
    $(this).addClass('swing animated');
  });
  $('#anime2').bind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $(this).removeClass('swing animated');
  });

  $('#anime3').on('click', function(e){
    $(this).addClass('bounce animated');
  });
  $('#anime3').bind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $(this).removeClass('bounce animated');
  });

})
