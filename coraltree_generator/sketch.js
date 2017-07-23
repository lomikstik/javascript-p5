var tree = [], walkers = [], stepSize = 1, yBias = 0.01, r = 10,k, treeSize = 2000, maxWalkers = 300, tooHigh = 0;

function setup() {
    createCanvas(1300,600);
    ellipseMode(RADIUS);
    for(var i = 0; i < width; i+=2*r) {
        tree.push(new Walker(i,height));
    }
}

function draw() {
    background(140,170,255);
    noStroke();
    tooHigh = 0;
    if(tree.length + walkers.length < treeSize && walkers.length < maxWalkers) {
        walkers.push(new Walker(random(width), 0))
    }
    for(k = 0; k < walkers.length; k++) {
        walkers[k].walk(50);
    }
    for(k = 0; k < tree.length; k++) {
        tree[k].checkY();
    }
    
    if(tooHigh>0) {
        tree.forEach(function(part) {
            part.y += lerp(0,1,tooHigh/200);
        });
    }
    tree.forEach(function(part) {
        part.show();
    });
}

function Walker (x, y) {
    this.x = x;
    this.y = y;
    
    this.walk = function (steps = 1) {
        for(var i = 0; i < steps; i++) {
            this.x += random(-stepSize, stepSize);
            this.x = constrain(this.x, 0, width);
            this.y += random(-stepSize, stepSize) + yBias;
            this.y = constrain(this.y, 0, height);
            if(this.collided()) {
                tree.push(this);
                walkers.splice(k,1);
                break;
            }
            
        }
        //this.show();
    }
    
    this.collided = function () {
        for(var j = 0; j < tree.length; j++) {
            if(distSq(this, tree[j]) < r*r*4) {
                this.x = (this.x + tree[j].x) / 2;
                this.y = (this.y + tree[j].y) / 2;
                return true;
            }
        }
        return false;
    }
    
    this.show = function () {
        fill(0,255-this.y/4,0);
        ellipse(this.x, this.y, r);
    }
    
    this.checkY = function () {
        if(this.y > height + r) {
            tree.splice(k,1);
        }
        else if(height / 3 - this.y > tooHigh) {
            tooHigh = height / 3 - this.y;
        }
    }
}


function distSq (a, b) {
    return ((a.x-b.x)*(a.x-b.x) + (a.y-b.y)*(a.y-b.y));
}