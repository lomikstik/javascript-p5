var maze;
var cellSize = 16;
var genX = 0;
var genY = 0;
var path = [];

function setup() {
    createCanvas(400,400);
    maze = [];
    for(var i = -1; i <= width / cellSize; i++) {
        maze[i] = [];
        for(var j = -1; j <= height / cellSize; j++) {
            maze[i][j] = {r:true,t:true,l:true,b:true,generated:false, x:i, y:j};
            if(i == -1 || i == floor(width/cellSize) || j == -1 || j == floor(height / cellSize)) {
                maze[i][j].generated = true;
            }
        }
    }
}

function draw() {
    generate();
    background(51);
    stroke(255,0,255);
    for(var i = 0; i < width / cellSize; i++) {
        for(var j = 0; j < height / cellSize; j++) {
            var cell = maze[i][j];
            var x = i*cellSize;
            var y = j*cellSize;
            if(cell.r) {
                line(x+cellSize-1,y,x+cellSize-1,y+cellSize);
            }
            if(cell.t) {
                line(x,y,x+cellSize,y);
            }
            if(cell.l) {
                line(x,y,x,y+cellSize);
            }
            if(cell.b) {
                line(x,y+cellSize-1,x+cellSize,y+cellSize-1);
            }
        }
    }
}

function generate() {
    maze[genX][genY].generated = true;
    var possibleCells = [];
    if(!maze[genX+1][genY].generated){possibleCells.push(maze[genX+1][genY]);} //Right
    if(!maze[genX][genY-1].generated){possibleCells.push(maze[genX][genY-1]);} //Top
    if(!maze[genX-1][genY].generated){possibleCells.push(maze[genX-1][genY]);} //Left
    if(!maze[genX][genY+1].generated){possibleCells.push(maze[genX][genY+1]);} //Bottom
    if(possibleCells.length != 0) {
        var newCell = random(possibleCells);
        if(newCell.x - genX == 1) {maze[genX][genY].r = false;
                                  newCell.l = false;}
        if(newCell.x - genX == -1) {maze[genX][genY].l = false;
                                   newCell.r = false;}
        if(newCell.y - genY == 1) {maze[genX][genY].b = false;
                                  newCell.t = false;}
        if(newCell.y - genY == -1) {maze[genX][genY].t = false;
                                   newCell.b = false;}
        path.push({x:genX, y:genY});
        genX = newCell.x;
        genY = newCell.y;
    } else if(path.length > 0) {
        var npos = path.pop();
        genX = npos.x;
        genY = npos.y;
    }
}
