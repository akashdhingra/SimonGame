var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }

});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswers(userClickedPattern.length - 1);
});

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("sounds/" + name +".mp3");
  var playPromise = audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");},100)
}


function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

function checkAnswers(currentLevel){
  console.log("Game pattern in  checkAnswers " + gamePattern);
  console.log("User clicked patter in checkAnswers " + userClickedPattern);

// It is checking if pressed key is equal to the key in the game pattern and
// it will keep on checking until both the values of userClickedPattern and
// gamePattern becomes equal.
// Once it became equal then it will increase the level by calling the nextSequence
// If user selects wrong click then the game starts again
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
          nextSequence();
        }, 1000);
      }
  }
  else
    {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press any button to restart");

      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);

    startOver();
  }

}
