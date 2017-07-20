var world;
var nest;
var tileSize = 6;
var ant;
var activeAnts = [];
var allAnts = [];
var antCount = 20;
var tickCount = 0;
function setup() {
    createCanvas(800,600);
    world = new Array();
    for(var i = -1; i < 101; i++) {
        world[i] = new Array();
        for(var j = -1; j < 101; j++) {
            world[i][j] = new Array();
            world[i][j][0] = 0;
            world[i][j][1] = 0;
            world[i][j][2] = 0;
        }
    }
    
    generateWorld();
    
    nest = new Nest();
    for(var i = 0; i < antCount; i++) {
        allAnts[i] = new Ant();
    }
}

function draw() {
    for(var i = 0; i < 50; i++) {
        if(!mouseIsPressed) {
            gameTick();
        }
    }
    gameTick();
    background(50);
    //Draw the world values as colors
    for(var i = 0; i < 100; i++) {
        for(var j = 0; j < 100; j++) {
            fill(world[i][j][0],world[i][j][1],world[i][j][2]);
            rect(i*tileSize, j*tileSize, tileSize, tileSize);
        }
    }
    for(var i = 0; i < allAnts.length; i++) {
        allAnts[i].show();
    }
    nest.show();
}

//function mousePressed() {
//    if(mouseX < 600) {
//        generateAnts();
//        generateWorld();
//    }
//}

function generateWorld() {
    for(var i = 0; i < 100; i++) {
        for(var j = 0; j < 100; j++) {
            world[i][j][0] = 0;
            world[i][j][1] = random(100);
            world[i][j][2] = random(100);
        }
    }
}

function gameTick() {
    for(var i = 0; i < allAnts.length; i++) {
        allAnts[i].update();
    }
    tickCount++;
    if(tickCount > 500) {
        tickCount = 0;
        generateAnts();
        generateWorld();
    }
}
