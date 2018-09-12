//Landing Page Box:

// I got the transition info from this site: http://jsfiddle.net/UH9UE/222/ & https://stackoverflow.com/questions/10317128/how-to-make-a-div-contenteditable-and-draggable

$("#transitionbox")
  .draggable()
  .click(function(){
      if ( $(this).is('.ui-draggable-dragging') ) {
          return;
      }
      $(this).draggable( "option", "disabled", true );
      $(this).attr('contenteditable','true');
  })
  .blur(function(){
      $(this).draggable( 'option', 'disabled', false);
      $(this).attr('contenteditable','false');
  });


// Define all the variables.
var audio = new Audio("https://www.soundjay.com/button/sounds/button-09.mp3");
let allBoxes;
const $circle = $('.smallcircles');
let computerTurnNumbers = [];
let level = 1;
// Keeping track of user's moves. Collect them in an array.
let userClicks = [];

let userName = '';






