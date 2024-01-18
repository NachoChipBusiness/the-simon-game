// Game Play Functions

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

$(document).on("keydown", function(event) {
    if (gamePattern.length === 0) {
        nextSequence();
    }
});

$(document).on("touchstart", function(event) {
    if (gamePattern.length === 0) {
        nextSequence();
    }
});

$(".btn").on("click", function(event) {
    makeButtonSound($(this));
    makePressedAnimation($(this));

    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    let checkPatternResult = checkUserPatternCorrectness();

    if (checkPatternResult === false) {
        userClickedPattern = [];
        gamePattern = [];

        $("#level-title").text("Game Over, Press Any Key to Restart");
        makeEndGameSound();
        makeEngGameAnimation();
        return;        
    }
    if (userClickedPattern.length === gamePattern.length) {
        userClickedPattern = [];
        setTimeout(nextSequence, 1000);
    }
});

var DELAY = 500; //miliseconds

function nextSequence() {
    var randomNumber = Math.floor( Math.random() * 4 );
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#level-title").text("Level " + gamePattern.length);
    playGamePattern();
}

function playGamePattern(count = gamePattern.length) {
    if (count === 0) {return;}
    
    var idx = gamePattern.length - count;
    var jqElement = $("#" + gamePattern[idx]);
    
    makeButtonSound(jqElement);
    makePatternAnimation(jqElement);

    setTimeout(function() {
        playGamePattern(count - 1);
    }, DELAY);
}

function checkUserPatternCorrectness() {
    for (var i = 0; i < userClickedPattern.length; i++) {
        if (userClickedPattern[i] !== gamePattern[i]) {
            return false;
        }
    }
    return true;
}

// Visual & Sound Effects
function makeButtonSound(jqElement) {
    var color = jqElement.attr("id");
    switch (color) {
        case "red":
            var redAudio = new Audio("sounds/red.mp3");
            redAudio.play();
            break;
        
        case "blue":
            var blueAudio = new Audio("sounds/blue.mp3");
            blueAudio.play();
            break;
        
        case "green":
            var greenAudio = new Audio("sounds/green.mp3");
            greenAudio.play();
            break;
        
        case "yellow":
            var yellowAudio = new Audio("sounds/yellow.mp3");
            yellowAudio.play();
            break;
        
        default:
            console.log(color);
            break;
    }
}

function makePressedAnimation(jqElement) {
    jqElement.addClass("pressed");
    setTimeout(function() {
        jqElement.removeClass("pressed");
    }, 100);
}

function makePatternAnimation(jqElement) {
    jqElement.fadeOut(DELAY/2).fadeIn(DELAY/2);
}


function makeEndGameSound() {
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
}

function makeEngGameAnimation() {
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 100);
}