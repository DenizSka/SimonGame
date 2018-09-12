
$(document).ready(() => {
  console.log('ready');


  function gameBegin(){
    console.log(level, 'in game begin');
    $('.white').on('click', event => computerClick());
     // Make the circle change opacity with each click.
    $circle.on('mousedown', event => $(event.target).css('opacity', 0.5));
    $circle.on('mouseup', event => $(event.target).css('opacity', 1));
  };

  //give me back an array of 1++ items (using map) that is filled with random numbers from 1 to 4.

  function setSeries(level) {
    computerTurnNumbers = Array(level+1).fill(0).map(n => Math.floor(Math.random() * 4));
    }

  // Make the computer randomly generate a series of lighting boxes. In order to do that we looped over the computerTurnnumbers array and trigger the computer click event that is corresponding with each index number of the circle (eq means id in jquery).

  function computerClick() {
    setSeries(level);
    console.log(computerTurnNumbers, 'in computer click');
    computerTurnNumbers.forEach((circlePosition, i) => {
      // We set a timeout because we wanted these actions to be one after the other.
      setTimeout(() => {
        $('<audio>').appendTo($circle.eq(circlePosition));
        audio.play();
        $circle.eq(circlePosition).animate({
            opacity:  '0.5',
        }, 300);
        $circle.eq(circlePosition).animate({
            opacity:  '1',
        }, 300);
      }
      , 1000*i);
    });
  }

  //Keep track of user moves. And collect them in userClicks array.
  let userClicks = [];
  function userMoves(){
    $circle.click(function() {
      userClicks.push(parseInt(event.target.id))
      //console.log(userClicks)
      console.log(userClicks, 'user numbers');
      checkWin();
    });
  }

  function gameOver(){
    // clear out user array. Begin from level 1. Call start phase.
    $('p').html('');
    level = 1;
    userClicks = [];
    computerTurnNumbers = [];
    gameBegin();
    console.log(computerTurnNumbers, 'turn numbers');
    //Userclicks array is empty at this point. But when the userMoves is being called, userClicks array takes one clicked id two time instead of one. So it can never check if the level is won or lose.
    userMoves();
    //This was working before but since the userClicks array is not working level does not increment aymore.
    $('h2').html('Level :' + level);
  }

  // compare computer vs users array to see if user its a pass or gameover.
  function checkWin (){
    userClicks.join();
    computerTurnNumbers.join();
      if (userClicks.join() === computerTurnNumbers.join()) {
        //console.log (userClicks)
        userClicks = [];
        level++;
        $('h2').html('Level :' + level);
        computerClick();
    } else if (userClicks.length === computerTurnNumbers.length){
      $('h2').html('Game Over').css({
          fontSize: 36,
          marginBottom: 15,
        });
      $('p').html('Click anywhere on circle to Restart');
      $('.white').on('click', event => gameOver());
    }
  }


  //page load phase. No clicks, computer's turn first. After that start listening to users turn. (Could not figure out where to put the unbind click listener.)

  gameBegin();
  userMoves();

  $('.contained').on('submit', (event) => {
    // stop the event from getting to the browser and reloading
    event.preventDefault();
    $('<h2>')
      .text(`Welcome ${event.target.elements.name.value}`)
      .appendTo($('.main'));
  })

});

