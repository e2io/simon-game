var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var windowSize = window.matchMedia("(max-width: 990px)");

function allSpan(windowSize) {

  if (windowSize.matches) {
    $("#span1").addClass("span1");
    $("#span2").removeClass("span2");
    $("#span-button").removeClass("span-button");
  } else {
    $("#span2").addClass("span2");
    $("#span1").removeClass("span1");
    $("#span-button").addClass("span-button");
  }

}

allSpan(windowSize);
windowSize.addListener(allSpan);



$(document).keypress(function() {

  if (!started) {
    nextSequence();
    started = true;
    $("h1").text("Level " + level);
  } else {
    alert("Key pressing not allowed now !!");
  }
});

$(".start-btn").click(function() {

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
    gameOverStat(windowSize);
    windowSize.addListener(gameOverStat);
    startOver();

  }
}

function startOver() {

  started = false;
  gamePattern = [];
  level = 0;
  userClickedPattern = [];

}


function gameOverStat(x) {
  if (x.matches) {
    $("h1").text("Game Over, Press Start to start again");
  } else {
    $("h1").text("Game Over, Press Any Key to Restart");
  }
}
