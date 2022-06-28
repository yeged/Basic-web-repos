var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 1;
var wrong = "wrong";
var flag = false;
var highestLevel = 0;

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePres(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
})
$(document).keypress(function() {
  if (gamePattern.length == 0) {
    nextSequence();
  }
})
$("body").click(function(){
  if (gamePattern.length == 0) {
    nextSequence();
  }
})

function nextSequence() {
  if (!flag){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    $("#level-title").html("Level " + level);
    level = level + 1;

  }

}

function checkAnswer(currentLevel) {
  // First case, wrong click (when user should press a key)
  if (gamePattern.length == 0) {
    wrongAnswer();
    reStartGame();

  }
  //Second Case, Level UP
  else if (gamePattern.length > 0 ) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel] ){
      rightAnwser();
    }
    else{
      wrongAnswer();
      bestLevel();
      reStartGame();
    }
  }
}

function rightAnwser(){
  if(gamePattern.length === userClickedPattern.length ){
    setTimeout(function () {
      nextSequence();
    }, 750);
    console.log(userClickedPattern);
  }
}

function wrongAnswer() {
  $("body").addClass("game-over")
  setTimeout(function() {
    $("body").removeClass("game-over")
  }, 200);
  playSound(wrong);
  $("#level-title").html("Game Over, Press Any Key to Restart" + " Your level is: " + (level-1));
  $("#level-title").css("line-height", 1.5)
  flag = true;
}

function animatePres(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  new Audio("sounds/" + name + ".mp3").play();
}

function reStartGame(){
  level = 1 ;
  gamePattern = [];
  userClickedPattern = [];
  setTimeout(function () {
    flag = false;
  }, 750);
}

function bestLevel(){

  if((level-1)> highestLevel){
    highestLevel = (level-1)
    $(".levelCount").html("Best Level : "+ highestLevel)
  }

}
