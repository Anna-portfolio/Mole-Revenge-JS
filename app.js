//define variables
let gameBox = document.querySelector(".game-container");
let timesUp = document.querySelector(".game-container__timesup");

let score = document.querySelector(".score-time-container__score");
let time = document.querySelector(".score-time-container__time");

let player = document.querySelector(".game-container__mole");
let hammer = document.querySelector(".game-container__hammer");

//starting result and counter values
let result = 0;
let counter = 10;

//the number of pixels the player moves each time an arrow is pressed
let playerMovement = 15;

//player and hammer coordinates
let playerX;
let playerY;

let hammerX;
let hammerY;

//display the starting result on the screen
score.innerText = "Score: " + result;

//once the window is loaded, get a random position of the hammer and set the player's starting position
window.onload = () => {
    showHammer();

    player.style.left = "80px";
    player.style.top = "400px";

    playerX = parseInt(player.style.left);
    playerY = parseInt(player.style.top);
};

//random position of the hammer
function showHammer() {
    hammerX = Math.floor(Math.random() * 370) + 85;
    hammerY = Math.floor(Math.random() * 290) + 145;

    hammer.style.left = hammerX + "px";
    hammer.style.top = hammerY + "px";
}

//EventListener + switch statement: change the player position each time an arrow is pressed
//and check for possible hammer and border collisions

document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
        case 37:
            player.style.left =
                parseInt(player.style.left) - playerMovement + "px";
            playerX = parseInt(player.style.left);

            if (playerX - playerMovement <= 20) {
                player.style.left = 20 + "px";
            }
            collision();
            break;
        case 38:
            player.style.top =
                parseInt(player.style.top) - playerMovement + "px";
            playerY = parseInt(player.style.top);

            if (playerY - playerMovement <= 75) {
                player.style.top = 75 + "px";
            }
            collision();
            break;
        case 39:
            player.style.left =
                parseInt(player.style.left) + playerMovement + "px";
            playerX = parseInt(player.style.left);

            if (playerX - playerMovement >= 480) {
                player.style.left = 480 + "px";
            }
            collision();
            break;
        case 40:
            player.style.top =
                parseInt(player.style.top) + playerMovement + "px";
            playerY = parseInt(player.style.top);

            if (playerY - playerMovement >= 465) {
                player.style.top = 465 + "px";
            }
            collision();
            break;
    }
});

//collision detection (if true, the result increments by 1, the hammer changes its position, and the sound is played)
function collision() {
    let distance = Math.sqrt(
        Math.pow(playerX - hammerX, 2) + Math.pow(playerY - hammerY, 2),
    );

    if (distance < 45) {
        showHammer();
        hitSound();
        result++;
        score.innerText = "Score: " + result;
    }
}

//timer settings
timerId = setInterval(timer, 1000);

//if the counter reaches 0, both the player and hammer are no longer displayed,
//the "Time's Up!" inscription shows up, the collision is no longer detected,
//and the counter is set to null

function timer() {
    if (counter > 0) {
        counter--;
        time.innerText = "Time: " + counter;
    } else {
        if (counter === 0) {
            timesUp.style.display = "flex";
            hammer.style.display = "none";
            player.style.display = "none";
            collision = function () {};
            counter = null;
        }
    }
}

timer();

//sound settings
function hitSound() {
    let sound = new Audio("sounds/score.mp3");
    sound.play();
}
