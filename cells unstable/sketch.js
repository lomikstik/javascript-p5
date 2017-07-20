//Global settings for the world
var maxFoodCount = 100,
    foodRespawnRate = 5,
    viscosity = 0.3,
    gravity = 0,
    consumptionFactor = 1,
    light = 0.2;

var cells = [], foods = [], engine, world, defaultGenome, i;
var emptyVec;
function setup() {
    angleMode(DEGREES);
    createCanvas(800,600);
    defaultGenome = new Genome();
    cells[0] = new Cell();
    //world.gravity.y = gravity;
    //emptyVec = Matter.Vector.create(0, 0);
//    console.log(emptyVec);
}

function draw() {
    background(220);
    gameTick();
    for (i = 0; i < cells.length; i++) {
        cells[i].draw();
    }
}

function gameTick() {
    for (i = 0; i < cells.length; i++) {
        cells[i].update();
    }
}

function mousePressed() {
    var newCell = new Cell();
    newCell.x = mouseX;
    newCell.y = mouseY;
    cells.push(newCell);
}