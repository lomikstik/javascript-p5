var r = 20;
var k = 30;
var grid = [];
var w;
var active = [];
var cols;
var rows;
function setup() {
    createCanvas(600,600);
    w = r / sqrt(2);
    cols = floor(width / w);
    rows = floor(height / w);
    
    for(var i = 0; i < cols*rows; i++) {
        grid[i] = -1;
    }
    
    var x = random(width);
    var y = random(height);
    var ipos = floor(x / w);
    var jpos = floor(y / w);
    var pos = createVector(x,y);
    grid[ipos+jpos*cols] = pos;
    active.push(pos);
    while(active.length > 0) {
        var index = floor(random(active.length));
        var p = active[index];
        var found = false;
        for(var n = 0; n < k; n++) {
            var sample = p5.Vector.random2D();
            var m = random(r, 2*r);
            sample.setMag(m);
            sample.add(p);
            
            if(sample.x > 0 && sample.x < width && sample.y > 0 && sample.y < height) {
            
                var col = floor(sample.x / w);
                var row = floor(sample.y / w);
                var ok = true;
                for(var i = -1; i <= 1; i++) {
                    for(var j = -1; j <= 1; j++) {
                        var neighbor = grid[col+i+(j+row)*cols];
                        if(neighbor instanceof p5.Vector) {
                            var d = p5.Vector.dist(sample, neighbor);
                            if(d < r) {
                                ok = false;
                            }
                        }
                    }
                }
                if(ok) {
                    found = true;
                    grid[col + row*cols] = sample;
                    active.push(sample);
                    break;
                }
            }
        }
        if(!found) {
            active.splice(index,1);
        }
    }
    background(0);
    loadPixels();
    for(var i = 0; i < width*height*4; i+=4) {
        var pindex = floor(i/4);
        var px = pindex%width;
        var py = floor(pindex/height);
        var col = floor(px / w);
        var row = floor(py / w);
        var record = 1600;
        for(var c = -2; c <= 2; c++) {
            for(var j = -2; j <= 2; j++) {
                var neighbor = grid[col+c+(j+row)*cols];
                if(neighbor instanceof p5.Vector) {
                    //var d = dist(px,py,neighbor.x,neighbor.y);
                    var d = ((px-neighbor.x)*(px-neighbor.x) + (py-neighbor.y)*(py-neighbor.y));
                    //console.log(d);
                    if(d < record) {
                        record = d;
                    }
                }
            }
        }
        var value = map(record+(noise(px/10,py/10)*600)-(noise(px/10,py/10)*300),0,1600,100,0);
        //console.log(value);
        pixels[i] = value;
        pixels[i+1] = value;
        pixels[i+2] = value;
    }
    updatePixels();
}

function draw() {
    //background(51);
    stroke(255);
    strokeWeight(4);
//    for(var i = 0; i < grid.length; i++) {
//        if(grid[i] instanceof p5.Vector) {
//            point(grid[i].x, grid[i].y);
//        }
//    }
}