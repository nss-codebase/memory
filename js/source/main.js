(function(){
  'use strict';

  $(document).ready(init);

  var clock;
  var timer;
  var numbers;

  function init(){
    $('#start').click(start);
    $('#board td').click(reveal);
  }

  function reveal(){
    var row = $(this).parent().index();
    var col = $(this).index();
    var pos = (row * 4) + col;
    var img = numbers[pos];

    $(this).find('.back').css('background-image', 'url("./media/' + img + '.png")');
    $(this).find('.flipper').addClass('rotate');
    $(this).addClass('show');
    checkMatch();
  }

  function checkMatch(){
    var $matches = $('.show');

    if($matches.length === 2){
      var td1 = $matches[0];
      var td2 = $matches[1];
      var img1 = $(td1).find('.back').css('background-image');
      var img2 = $(td2).find('.back').css('background-image');

      if(img1 === img2){
        $matches.addClass('match');
        $matches.off('click');
      }else{
        setTimeout(function(){
          $matches.find('.flipper').removeClass('rotate');
          setTimeout(function(){
            $matches.find('.back').css('background-image', '');
          }, 1000);
        }, 1000);
      }

      $matches.removeClass('show');
    }
  }

  function start(){
    create();
    randomize();

    clearInterval(timer);
    clock = $('#clock').data('time') * 1;
    timer = setInterval(updateClock, 1000);
  }

  function create(){
    numbers = [];

    for(var i = 0; i < 2; i++){
      for(var j = 0; j < 10; j++){
        numbers.push(j);
      }
    }
  }

  function randomize(){
    for(var i = 0; i < numbers.length; i++){
      var rnd = Math.floor(Math.random() * numbers.length);
      var temp = numbers[rnd];
      numbers[rnd] = numbers[i];
      numbers[i] = temp;
    }
  }

  function updateClock(){
    clock--;

    if(clock > 0 && clock < 10){
      warning();
    }else if(!clock){
      clearInterval(timer);
      results();
    }

    $('#clock').text(clock);
  }

  function warning(){
    var opacity = $('body').css('opacity') * 1;
    opacity -= 0.1;
    $('body').css('opacity', opacity);
  }

  function results(){
    var matches = $('.match').length;

    if(matches === 20){
      alert('Winner');
    }else{
      alert('Try Again');
    }
  }
})();
