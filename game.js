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
  level++;

  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  // playSound(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("sounds/" + name +".mp3");
  var playPromise = audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");},100)
};

function wrongButton(){
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");},200)
};


function checkAnswers(currentLevel){

  if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
      console.log("success");
      if (userClickedPattern.length == gamePattern.length){
        setTimeout(function(){
          nextSequence();
        }, 1000);

      }
  }
  else
    console.log("wrong");
    var audio = new Audio("sounds/wrong.mp3");
    var playPromise = audio.play();
    wrongButton();

}
