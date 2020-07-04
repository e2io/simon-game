var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keypress(function() {

  if (!started) {
    nextSequence();
    started = true;
    $("h1").text("Level " + level);
  } else {
    alert("Key pressing not allowed now !!");
  }
});

$(".start-btn").click(function(){

    if (!started) {
      nextSequence();
      started = true;
      $("h1").text("Level " + level);
    } else {
      alert("Key pressing not allowed now !!");
    }

});


$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});


function nextSequence() {

  //userClickedPattern = [];
  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  level++;

  $("h1").text("Level " + level);

  $("#" + randomChosenColour).fadeIn().fadeOut().fadeIn();
  playSound(randomChosenColour);

}


function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.preLoad = "auto";
  audio.play();

}


function animatePress(currentColour) {

  $("." + currentColour).addClass("pressed");
  setTimeout(function() {

  $("." + currentColour).removeClass("pressed");
  }, 100);

}


function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (gamePattern.length === userClickedPattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];


    }

  } else {

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.preLoad = "auto";
    wrong.play();
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();

  }
}

function startOver() {

  started = false;
  gamePattern = [];
  level = 0;
  userClickedPattern = [];

}
