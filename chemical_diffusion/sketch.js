var grid, next;
var da = 1.0, db = 0.5, f = 0.025, k = 0.062, timescale = 1;
//DEFAULTS FOR A NICE SIMULATION
//var da = 1.0, db = 0.5, f = 0.055, k = 0.062, timescale = 1;
//SPLITTING CELLS
//Default with f = 0.025
function setup() {
    createCanvas(200,200);
    pixelDensity(1);
    grid = [];
    next = [];
    for(var x = -1; x < width+1; x++) {
        grid[x] = [];
        next[x] = [];
        for(var y = -1; y < height+1; y++) {
            grid[x][y] = {a: 1, b: 0};
            next[x][y] = {a: 1, b: 0};
        }
    }
    next[100][100].b = 1;
    
    
}

function draw() {
    background(51);
    
    for(var x = 0; x < width; x++) {
        for(var y = 0; y < height; y++) {
            var a = grid[x][y].a;
            var b = grid[x][y].b;
            next[x][y].a = a+(da*laplaceA(x,y)-a*b*b
                              +f*(1-a))*timescale;
            next[x][y].b = b+(db*laplaceB(x,y)+a*b*b
                              -(k+f)*b)*timescale;
        }
    }
    
    loadPixels();
    for(var x = 0; x < width; x++) {
        for(var y = 0; y < height; y++) {
            var pix = (x + y * width) * 4;
            pixels[pix + 0] = 0;
            pixels[pix + 1] = floor(grid[x][y].a*255);
            pixels[pix + 2] = floor(grid[x][y].b*255);
        }
    }
    updatePixels();
    swap();
}

function swap() {
    var temp = next;
    grid = next;
    next = temp;
}

function laplaceA(x, y) {
    var sumA = 0;
    sumA += grid[x][y].a * -1;
    sumA += grid[x+1][y].a * 0.2;
    sumA += grid[x-1][y].a * 0.2;
    sumA += grid[x][y+1].a * 0.2;
    sumA += grid[x][y-1].a * 0.2;
    sumA += grid[x+1][y+1].a * 0.05;
    sumA += grid[x-1][y+1].a * 0.05;
    sumA += grid[x-1][y-1].a * 0.05;
    sumA += grid[x+1][y-1].a * 0.05;
    return sumA;
}

function laplaceB(x, y) {
    var sumB = 0;
    sumB += grid[x][y].b * -1;
    sumB += grid[x+1][y].b * 0.2;
    sumB += grid[x-1][y].b * 0.2;
    sumB += grid[x][y+1].b * 0.2;
    sumB += grid[x][y-1].b * 0.2;
    sumB += grid[x+1][y+1].b * 0.05;
    sumB += grid[x-1][y+1].b * 0.05;
    sumB += grid[x-1][y-1].b * 0.05;
    sumB += grid[x+1][y-1].b * 0.05;
    return sumB;
}

function mouseDragged() {
    grid[mouseX][mouseY].b = 1;
}