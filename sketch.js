var gameState = 'play';
var trackImg, track;
var policeImg, police;
var playercar, playercarImg;
var cycle, cycleImg;
var score = 0;
function preload() {
    trackImg = loadImage('track.png');
    policeImg = loadImage('police1.png');
    playercarImg = loadImage('playercar1.png');
    cycleImg = loadImage('cycle1.png');
}
function setup() {
    createCanvas(displayWidth,displayHeight);
  
    track = createSprite(240,270, displayWidth,displayHeight);
    track.addImage('track', trackImg)
    track.velocityY = 4;
    track.scale = 4;
    track.y = track.height/2;
    cycleGroup = new Group();
    policeGroup = new Group();
    playercar = createSprite(240,650);
    playercar.addImage('playercar', playercarImg);
    playercar.scale = 0.2;
}
function draw() {
    spawnCycles();
    spawnPolice();
     background(255);
    
    if (track.y > displayHeight/2) {
        track.y = 270;
    }
    if(gameState === 'play') {
        if (keyDown('left_arrow')) {
            playercar.x = playercar.x -3;
        }
        if(keyDown('right_arrow')) {
            playercar.x = playercar.x + 3;
        }
        score = score + Math.round(getFrameRate()/50);
    }
    
    if(cycleGroup.isTouching(playercar) || policeGroup.isTouching(playercar)) {
        playercar.destroy();
        gameState = 'end';

    }
   drawSprites();
   textSize(20);
    fill(110);
     text('Score: ' + score, 380,50);
   if (gameState === 'end') {
        background('0')
        stroke('black');
        fill('black');
        textSize(30);
        text('Game over', 240, 135);
        
}
    }
    
     

function spawnCycles() {
    
    if (frameCount % 50 == 0) {
        cycle = createSprite(random(0,500),0 );
        cycle.addImage('cycle', cycleImg);
        cycle.scale = 0.2;
        
        cycle.velocityY = 6;
        cycleGroup.add(cycle);
    }
}
function spawnPolice() {
    
    if (frameCount % 150 == 0) {
        police = createSprite(random(0,1000),0);
        police.addImage('police', policeImg);
        police.scale = 0.2;
        police.velocityY = 10;
        policeGroup.add(police);
    }
}