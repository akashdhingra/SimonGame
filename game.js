var gamePattern = [];

function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  return randomNumber;
}

const buttonColours = ["red", "blue", "green", "yellow"];

var randomChosenColour = buttonColours[nextSequence()];

gamePattern.push(randomChosenColour);

$("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
