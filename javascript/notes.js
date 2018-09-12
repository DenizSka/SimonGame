
$(document).ready(() => {
  console.log('ready');
  let allBoxes;

  // Let's start by adding an event click to each box.
  // Where do you see where the user is clicking? Answer: Target.id
  //instead of doing mouseup and mousedown on id -> I did it in class.
  //I was able to use toggle class and this way I way able to avoid doing different functions. Toggle class was difficult simluate when it was computer's turn. So instead I used animate and played with the opacity.


  const $circle = $('.smallcircles');

  // $circle
  //   .on('mousedown', event => $(event.target).addClass('light'))
  //   .on('mouseup', event => $(event.target).toggleClass('light'))

  //Tell me where I am clicking.
  $circle
    .on('click', event => console.log('user clicked', event.target.id))
    .on('computerClick', event => console.log('computer clicked', event.target.id))

  // make the circle change size and color with each click so that we know they are clicked. However these changes should only stay while clicked and afterwards should go away.

  // $circle.on('mousedown', event => $(event.target).css('opacity', 0.5));
  // $circle.on('mouseup', event => $(event.target).css('opacity', 1));


  //give me back an array of 6 items (using map) that is filled with random numbers from 1 to 4.

  let computerTurnNumbers = [];
  // = Array(3).fill(0).map(n => Math.floor(Math.random() * 4));

  //-> This will give something like: computerTurns =  [ 1, 4, 1, 4, 2, 2 ]

  // Next step is to make the computer randomly generate a series of lighting boxes. In order to do that we looped over the computerTurnnumbers array and trigger the computer click event that is corresponding with each index number of the circle (eq means id in jquery). We set a timeout because we wanted these actions to be one after the other.

  function computerClick() {
    // console.log(computerTurnNumbers)
    computerTurnNumbers = Array(3).fill(0).map(n => Math.floor(Math.random() * 4));
    computerTurnNumbers.forEach((circlePosition, i) => {
      setTimeout(() => {
        $circle.eq(circlePosition).trigger('computerClick');
        $circle.eq(circlePosition).animate({
            opacity:  '0.5',
        }, 300);
        $circle.eq(circlePosition).animate({
            opacity:  '1',
        }, 300);
      }
      , 1000*i);
    })
  }

  // call the function corresponding to each number in the array.
  // computerClick();

  // Now its user's turn. Listen user's click events. Store the number corresponding to each function in an array.
  //Game should start when the user clicks on the white box.
  function gameBegin(){
    $('.white').on('click', event => computerClick());
    $circle.on('mousedown', event => $(event.target).css('opacity', 0.5));
    $circle.on('mouseup', event => $(event.target).css('opacity', 1));
  };


  // Keeping track of user's moves. Collect them in an array.
  let userClicks = [];

  function userMoves(){
    $circle.click(function() {
      userClicks.push(parseInt(event.target.id))
      console.log(userClicks)
      checkWin ();
    })
  };

  // userMoves();

  // compare computer vs users array to see if user its a pass or gameover.
  function checkWin (){
    userClicks.join();
    computerTurnNumbers.join();
      if (userClicks.join() === computerTurnNumbers.join()) {
        console.log (userClicks)
        userClicks = [];
      alert ('next Level')
    } else if (userClicks.length === computerTurnNumbers.length){
      $('h2').html('Game Over').css({
          fontSize: 36,
          marginBottom: 15,
        });
      $('p').html('Click anywhere on circle to Restart');
        // clear out user array. Call computer click again.
        computerClick();
        userClicks = [];
        //how to restart again?
    }
  }
   function noClicks() {
    //removes all lsitening events.
    $circle.unbind();
    }

    //set the strat phase. no clicks, computer's turn first. After that start listening to users turn.
    function startPhase(){
    noClicks();
    gameBegin();
    userMoves();
   }
   startPhase()



  //clicks should only be tracked after computer's turn. So set the click off in the beginning and call it in the computer's turn.

});

