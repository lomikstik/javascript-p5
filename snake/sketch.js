var left;
var right;
var up;
var down;
var snake;
var food;
var paused = false;
var segmentSize = 10;
function setup() {
    createCanvas(600, 600);
    noStroke();
    snake = new Snake();
    food = new Food();
    snake.init();
    left = createVector(-1,0);
    right = createVector(1,0);
    up = createVector(0,-1);
    down = createVector(0,1);
}

function draw() {
    rectMode(CENTER);
    if(frameCount%5 == 0 && !paused) {
        background(81);
        snake.update();
        snake.draw();
        food.draw();
    }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW && snake.segments[snake.segments.length-1].pos.x - snake.segments[snake.segments.length-2].pos.x != segmentSize) {
    snake.direction = left;
  } else if (keyCode === RIGHT_ARROW && snake.segments[snake.segments.length-1].pos.x - snake.segments[snake.segments.length-2].pos.x != -segmentSize) {
    snake.direction = right;
  } else if (keyCode === UP_ARROW && snake.segments[snake.segments.length-1].pos.y - snake.segments[snake.segments.length-2].pos.y != segmentSize) {
    snake.direction = up;
  } else if (keyCode === DOWN_ARROW && snake.segments[snake.segments.length-1].pos.y - snake.segments[snake.segments.length-2].pos.y != -segmentSize) {
    snake.direction = down;
  }
    else if (key == 'E') {
        textSize(100);
        fill(255)
        text("DITF", 50, 200);
    }
}

function Snake() {
    this.length = 3;
    this.direction = createVector(1, 0);
    this.headPos = createVector(100-segmentSize/2, 100-segmentSize/2);
    this.segments = [];
    
    this.init = function() {
        for(var i = 0; i < this.length; i++) {
            this.segments.push(new Segment(this.headPos.x - segmentSize * i, this.headPos.y));
            this.segments.lifespan = this.length - i;
        }
    }
    
    this.update = function() {
        for(var i = 0; i < this.segments.length; i++) {
            this.segments[i].lifespan--;
            if(this.segments[i].lifespan <= 0) {
                this.segments.splice(i, 1);
            }
        }
        
        
        
        this.headPos.add(this.direction.mult(segmentSize));
        this.direction.mult(1/segmentSize);
        
        for(var i = 0; i < this.segments.length; i++) {
            if(Math.abs(this.headPos.x - this.segments[i].pos.x) < segmentSize && Math.abs(this.headPos.y - this.segments[i].pos.y) < segmentSize) {
                GameOver();
            }
        }
        if(this.headPos.x >= 600 || this.headPos.x <= 0 || this.headPos.y >= 600 || this.headPos.y <= 0 ) {
            GameOver();
        }
        
        var newSeg = new Segment(this.headPos.x, this.headPos.y);
        newSeg.lifespan = this.length;
        this.segments.push(newSeg);
        
        
        
        if(Math.abs(this.headPos.x - food.position.x) < segmentSize && Math.abs(this.headPos.y - food.position.y) < segmentSize) {
            food.eaten();
            this.length++;
            for(var i = 0; i < this.segments.length; i++) {
                this.segments[i].lifespan++;
            }
        }
    }
    this.draw = function() {
		colorMode(HSB);
        for(var i = 0; i < this.segments.length; i++) {
            this.segments[i].draw(i%255);
        }
		colorMode(RGB);
    }
}

function Segment(x, y) {
    this.pos = createVector(x, y);
    this.lifespan = 1;
    
    this.draw = function(hue) {
        fill(hue,255,255);
        rect(this.pos.x, this.pos.y, segmentSize, segmentSize);
    }
}

function Food() {
    this.position = createVector(0,0);
    this.position.x = random(segmentSize/2, 600 - segmentSize/2);
    this.position.y = random(segmentSize/2, 600 - segmentSize/2);
    
    this.draw = function() {
        fill(50, 255, 150);
        rect(this.position.x, this.position.y, segmentSize, segmentSize);
    }
    
    this.eaten = function() {
        this.position.x = random(segmentSize/2, 600 - segmentSize/2);
        this.position.y = random(segmentSize/2, 600 - segmentSize/2);
//        for(var m = 0; m < 20; m++) {
//            for(var i = 0; i < snake.segments.length; i++) {
//                if(this.position == snake.segments[i].position) {
//                    this.position.x = random(segmentSize/2, 600 - segmentSize/2);
//                    this.position.y = random(segmentSize/2, 600 - segmentSize/2);
//                    break;
//                }
//            }
//        }
    }
}

function GameOver() {
    paused = true;
    textSize(50);
    fill(255)
    text("Game over!", 50, 200);
}