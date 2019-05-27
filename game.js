//initializing
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//load Images
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird1.png";
bg.src = "images/bg1.png";
fg.src = "images/fg1.png";
pipeNorth.src = "images/pipeNorth1.png";
pipeSouth.src = "images/pipeSouth1.png";

//on key down & on press (4 mobile)
document.addEventListener("keydown", moveUp);
document.addEventListener("touchstart", moveUp);
document.addEventListener("touchend", moveUp);

function moveUp() {
    bY -= 25;
    fly.play();
}

//pipe coordinates
var pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
}

//some variables
var gap = 95;
var constant = pipeNorth.height + gap;

var bX = 10;
var bY = 150;
var gravity = 1.5;
var score = 0;

// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

//draw images
function draw() {
    ctx.drawImage(bg, 0, 0);

    for (var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        //detect collision
        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) || bY + bird.height >= cvs.height - fg.height) {
            location.reload(); //reload the page
        }

        if (pipe[i].x == 5){
            score++;
            scor.play();
        }
    }


    ctx.drawImage(fg, 0, canvas.height - fg.height);

    ctx.drawImage(bird, bX, bY);

    ctx.fillStyle = "#f368e0";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height -20);

    bY += gravity;

    requestAnimationFrame(draw);
}

draw();
