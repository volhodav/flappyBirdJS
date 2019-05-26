//initializing
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//load Images
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "https://raw.githubusercontent.com/granttitus/FlappyBird/master/lib/bird.png";
bg.src = "https://raw.githubusercontent.com/granttitus/FlappyBird/master/lib/background.png";
fg.src = "https://raw.githubusercontent.com/granttitus/FlappyBird/master/lib/foreground.png";
pipeSouth.src = "https://raw.githubusercontent.com/granttitus/FlappyBird/master/lib/pipe-north.png";
pipeNorth.src = "https://raw.githubusercontent.com/granttitus/FlappyBird/master/lib/pipe-south.png";

//some variables
var gap = 85;
var constant = pipeNorth.height+gap;
var bX = 10;
var bY = 150;
var gravity = 1;

//on key down
document.addEventListener("keydown",moveUp);
function moveUp(){
  bY -= 20; 
}

//pipe coordinates
var pipe = [];
pipe[0] = {
  x : cvs.width,
  y : 0
}

//draw images
function draw(){
  ctx.drawImage(bg,0,0);
  for(var i = 0; i < pipe.length; i++){
    ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
    ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
    pipe[i].x--;
  }
  
  ctx.drawImage(fg,0,cvs.height - fg.height);
  ctx.drawImage(bird,bX,bY);
  bY += gravity;
  
  requestAnimationFrame(draw);
}

draw();