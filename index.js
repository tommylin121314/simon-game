var color_seq = [];
var user_seq = [];
var colors = ['green', 'red', 'yellow', 'blue'];
var curr_level = 0;
var gameover = false;
var transitioning = false;

// This function animations and play the sound of the button of the corresponding color
function showButton(color, user=false) {

    // Change button animation depending on what triggered the response
    var duration = 300;
    var opacity = 0.2;
    if(user) {
        duration = 50;
        opacity = 0.7
    }

    // Animates button and plays corresponding button sound
    $('#' + color).animate({'opacity': opacity}, duration=duration).animate({'opacity': 1}, duration=duration)

    // Animates press for user input
    if(user) {
        $('#' + color).toggleClass('pressed');
        setTimeout(function() {
            $('#' + color).toggleClass('pressed');
        }, 100);
    }

    switch(color) {
        case 'green':
            var sound = new Audio('sounds/green.mp3');
            sound.play();
            break;
        case 'blue':
            var sound = new Audio('sounds/blue.mp3');
            sound.play();
            break;
        case 'red':
            var sound = new Audio('sounds/red.mp3');
            sound.play();
            break;
        case 'yellow':
            var sound = new Audio('sounds/yellow.mp3');
            sound.play();
            break;
    }
}

function increaseLevel() {
    curr_level++;
    $('h1').text("Level " + curr_level);
}

// This function chooses a random color, pushes it to the game sequence, and calls showButton()
function nextSequence() {
    var num = Math.floor(Math.random() * 4);
    var color = colors[num];
    color_seq.push(color);
    showButton(color);
    increaseLevel();
}

function checkAnswer(index) {
    if(user_seq[index] != color_seq[index]) {
        gameOver();
    }
    else {
        if(index == color_seq.length - 1) {
            transitioning = true;
            setTimeout(function() {
                nextSequence();
                user_seq = [];
                transitioning = false;
            }, 1000);
        }
    }
}

function gameOver() {
    $('h1').text("Game Over. Press Any Key To Restart.");
    gameover = true;
    var sound = new Audio("sounds/wrong.mp3");
    sound.play();
    $('body').toggleClass('game-over');
    setTimeout(function() {
        $('body').toggleClass('game-over');
    }, 200);
}

function restart() {
    curr_level = 0;
    color_seq = [];
    user_seq = [];
    $('h1').text("Press Any Key To Start.");
}

$(document).keypress(function() {
    if(curr_level == 0)
        nextSequence();
    if(gameover) {
        gameover = false;
        restart();
    }
});

$('.btn').click(function() {
    if(curr_level > 0 && !gameover && !transitioning) {
        var color = this.id;
        user_seq.push(color);
        showButton(color, user=true);
        checkAnswer(user_seq.length - 1);
    }
});

