var border = 10;
var width = 1000;
var height = 600;
var cubes = [];
var caali = [];
var foods = [];
var cubeCount = 0;
var nutrition = 0.2;
var foodCount = 60;
var passiveConsumption = 0.001;
var mutationFactor = 1;
var i;
var j;
var k;

function setup() {
    
    createCanvas(1000 + 2 * border, 600 + 2 * border);
    frameRate(60);
//    cubes[0] = new Cube();
//    cubes[0].x = 60 + border;
//    cubes[0].y = 100 + border;
//    cubes[0].w = 20;
//    cubes[0].h = 200
//    cubes[1] = new Cube();
//    cubes[1].x = 150 + border;
//    cubes[1].y = 280 + border;
//    cubes[1].w = 300;
//    cubes[1].h = 20;
//    cubes[2] = new Cube();
//    cubes[2].x = 350 + border;
//    cubes[2].y = 200 + border;
//    cubes[2].w = 20;
//    cubes[2].h = 400
//    cubes[3] = new Cube();
//    cubes[3].x = 200 + border;
//    cubes[3].y = 500 + border;
//    cubes[3].w = 400;
//    cubes[3].h = 40;
    
    for (i=0; i<3; i++) {
        caali[i] = new Caalis();
    }
    caali[0].r = 255;
    caali[0].g = 150;
    caali[0].b = 150;
    caali[1].r = 150;
    caali[1].g = 255;
    caali[1].b = 150;
    caali[2].r = 150;
    caali[2].g = 150;
    caali[2].b = 255;
    
    for (i = 0; i < foodCount; i++){
        foods[i] = new Food();
        foods[i].x = random(border + foods[i].size, 800 + border - foods[i].size);
        foods[i].y = random(border + foods[i].size, 600 + border - foods[i].size);
    }
    
}

function draw() {
    noStroke();
    background(70);
    fill(0);
    rect(800 + border, border, 200, 600);
    fill(40);
    rect(0, 0, 1000 + 2 * border,border);
    rect(0, 600+border,1000 + 2 * border, border);
    rect(0, border, border, 600);
    rect(1000 + border, border, border, 600);
    
//    for (i = 0; i < cubeCount; i++) {
//        cubes[i].draw();
//    }
//    

    if (frameCount % 20 == 0 && foods.length < foodCount) {
        var newFood = new Food();
        newFood.x = random(border + newFood.size, 800 + border - newFood.size);
        newFood.y = random(border + newFood.size, 600 + border - newFood.size);
        foods.push(newFood);
    }
    
   
    for (i = 0; i < caali.length; i++) {
        if (caali.length>39) console.log(i); 
        caali[i].see();
        caali[i].think();
        caali[i].update();
        caali[i].draw();
    }
    
    foods.forEach (function (food) {
        food.draw();
    })
    
    for (i = 0; i < caali.length; i++) {
        fill(caali[i].r, caali[i].g, caali[i].b);
        textSize(12);
        if (i<30) {
            text (i + ":  " + Math.round(caali[i].energy*10)/10, 820,20 + i * 20);
        }
        else {
            text (i + ":  " + Math.round(caali[i].energy*10)/10, 880,20 + (i-30) * 20);
        }
        fill(0);
        textSize(8);
        text (i, caali[i].x-5, caali[i].y+3);
    }
    
    
    
    var kaqs = 0;
    //DEBUG TEST TONY DELETE WHEN DONE                                      //DEBUG TEST TONY
    if (!mouseIsPressed) {
        for (kaqs = 0; kaqs < 601; kaqs++) {

            if (kaqs%20 == 0 && foods.length < foodCount) {
                var newFood = new Food();
                newFood.x = random(border + newFood.size, 800 + border - newFood.size);
                newFood.y = random(border + newFood.size, 600 + border - newFood.size);
                foods.push(newFood);
            }


            for (i = 0; i < caali.length; i++) {
                caali[i].see();
                caali[i].think();
                caali[i].update();
            }
        }
    }
    
}

function Caalis() {
    this.x = 30;
    this.y = 30;
    this.r = 255;
    this.g = 255;
    this.b = 255;
    this.rot = 0;
    this.speed = 1;
    this.rotspeed = 3;
    this.state = 0;
    this.randomturn = 0;
    this.stateDecay = 0;
    this.energy = 50;
    this.fovs = [];
    
    this.randomTurnFactor = 0.3;
    this.sprintFactor = 2;
    this.sprintTurnFactor = 1;
    this.splitMass = 100;
    
    this.fovs[0] = new FOV(this);
    this.fovs[0].centerAngle = 0;
    this.fovs[0].width = 60;
    this.fovs[0].range = 50;
    
    this.fovs[1] = new FOV(this);
    this.fovs[1].centerAngle = 60;
    this.fovs[1].width = 60;
    this.fovs[1].range = 45;
    
    this.fovs[2] = new FOV(this);
    this.fovs[2].centerAngle = -60;
    this.fovs[2].width = 60;
    this.fovs[2].range = 45;
    
    this.eyes = [];
    this.eyes[0] = new Eye();
    this.eyes[0].offset = 40;
    this.eyes[0].rotoffset = 30;
    
    this.eyes[1] = new Eye();
    this.eyes[1].offset = 40;
    this.eyes[1].rotoffset = -30;
 
    this.think = function () {
        if (this.state == 0) {                                          //State 0: Standart wandering behaviour
            if (this.eyes[0].seeswall && !this.eyes[1].seeswall) {
                this.turn(-this.rotspeed);
                this.randomturn = random(-this.rotspeed*this.randomTurnFactor, 0);
            }
            else if (this.eyes[1].seeswall && !this.eyes[0].seeswall) {
                this.turn(this.rotspeed);
                this.randomturn = random(0, this.rotspeed*this.randomTurnFactor);
            }
            else if (this.eyes[0].seeswall && this.eyes[1].seeswall){
                if (random(-1,1) > 0) {
                    this.state = 1;
                }
                else {
                    this.state = 2;
                }
            }
            
            else if (this.fovs[1].foodCount > this.fovs[0].foodCount && this.fovs[1].foodCount > this.fovs[2].foodCount) {
                this.turn(this.rotspeed * this.sprintTurnFactor);
                this.randomturn = 0;
                this.move(this.speed*this.sprintFactor);
//                this.state = 3;
//                this.stateDecay = 20;
            }
            else if (this.fovs[0].foodCount > this.fovs[1].foodCount && this.fovs[0].foodCount > this.fovs[2].foodCount) {
                this.randomturn = 0;
                this.move(this.speed * this.sprintFactor);
//                this.state = 3;
//                this.stateDecay = 20;
            }
            else if (this.fovs[2].foodCount > this.fovs[0].foodCount && this.fovs[2].foodCount > this.fovs[1].foodCount) {
                this.turn(-this.rotspeed * this.sprintTurnFactor);
                this.randomturn = 0;
                this.move(this.speed * this.sprintFactor);
//                this.state = 3;
//                this.stateDecay = 20;
            }
            
            else {
                this.move(this.speed);
                if (random(0,1) < 0.01) {
                    this.randomturn = random (-this.rotspeed * this.randomTurnFactor, this.rotspeed * this.randomTurnFactor);
                }
                this.turn(this.randomturn);
            }
        }
        
        
        else if (this.state == 1) {                                 //State 1: Turn left until no wall seen
            if (this.eyes[0].seeswall || this.eyes[1].seeswall) {
                this.turn(this.rotspeed);
            }
            else {
                this.state = 0;
            }
        }
        
        
        else if (this.state == 2) {                                 //State 2: Turn right until no wall seen
            if (this.eyes[0].seeswall || this.eyes[1].seeswall) {
                this.turn(-this.rotspeed);
            }
            else {
                this.state = 0;
            }
        }
        
        
//        else if (this.state == 3) {                                 //State 3: Run for food until stateDecay==0
//            if (this.eyes[0].seesfood && !this.eyes[1].seesfood) {
//                this.turn(this.rotspeed);
//            }
//            else if (this.eyes[1].seesfood && !this.eyes[0].seesfood) {
//                this.turn(-this.rotspeed);
//            }
//            this.randomturn = 0;
//            this.move(this.speed*2);
//            this.stateDecay--;
//            if (this.stateDecay == 0 || this.eyes[0].seeswall || this.eyes[1].seeswall) {
//                this.state = 0;
//            }
//            
//        }
        
        else if (this.state == 4) {     
            this.stateDecay--;
            if (this.stateDecay == 0) {
                this.state = 0;
                this.split();
            }
        }
    }
    
    this.see = function () {
        for (k = 0; k < this.eyes.length; k++) {
            this.eyes[k].x = this.x + Math.cos(radians(this.rot + this.eyes[k].rotoffset)) * this.eyes[k].offset;
            this.eyes[k].y = this.y + Math.sin(radians(this.rot + this.eyes[k].rotoffset)) * this.eyes[k].offset;
            this.eyes[k].see();
        }
        for (k = 0; k < this.fovs.length; k++) {
            this.fovs[k].see();
        }
    }
    
    this.draw = function () {
        
        //fill(90, 220, 130);
        fill(this.r, this.g, this.b);
        stroke(this.r - 50, this.g - 50, this.b - 50);
        strokeWeight(2);
        ellipse(this.x, this.y, (this.energy + 100) / 10);
        noStroke();
        for (k = 0; k < this.eyes.length; k++) {
            fill(255, 0, 0);

            if (this.eyes[k].seeswall) {
                fill(0, 255, 0);
            }  
//            if (this.eyes[k].seesfood) {
//                fill(0, 0, 255);
//            }

            ellipse(this.eyes[k].x, this.eyes[k].y, 4, 4);
        }
        for (k = 0; k < this.fovs.length; k++) {
            this.fovs[k].draw();
        }
    }
    
    this.move = function (spd) {
        this.x += Math.cos(radians(this.rot)) * spd;
        this.y += Math.sin(radians(this.rot)) * spd;
        this.energy-=Math.pow(Math.abs(spd), 1.1) * 0.01;
    }
    
    this.turn = function (rotspd) {
        this.rot += rotspd;
        this.energy-=Math.abs(rotspd)*0.005;
        if (this.rot >= 360) {
            this.rot -= 360;
        }
        else if (this.rot < 0) {
            this.rot += 360;
        }
    }
    
    this.update = function () {
        for (j = 0; j < foods.length; j++) {
            if (Math.sqrt(Math.pow(foods[j].x - this.x, 2) + Math.pow(foods[j].y - this.y, 2)) < foods[j].size/2 +  (this.energy + 100)/20) {
                this.energy += foods[j].size * nutrition;
                foods[j].respawn();                                 //Food eating energy gain
                if (this.energy > this.splitMass) {                              // Splitting behaviour
                    this.stateDecay = 60;
                    this.state = 4;
                }
            }
        }
        
        
        this.energy -= passiveConsumption;
        
        if (this.energy <= 0) {
            caali.splice(i, 1);
            if(i == caali.length && i != 0) {
                i--;
            }
        }
    }
    
    this.split = function () {
        this.child = new Caalis();
        this.child.energy = this.energy / 2;
        this.child.x = this.x;
        this.child.y = this.y;
        this.child.speed = this.speed + random(-0.1, 0.1) * mutationFactor;
        this.child.rotspeed = this.rotspeed + random(-0.1, 0.1) * mutationFactor;
        this.child.eyes[0].offset = this.eyes[0].offset + random(-1, 1) * mutationFactor;
        this.child.eyes[1].offset = this.eyes[1].offset + random(-1, 1) * mutationFactor;
        this.child.eyes[0].rotoffset = this.eyes[0].rotoffset + random(-2,2) * mutationFactor;
        this.child.eyes[1].rotoffset = this.eyes[1].rotoffset + random(-2,2) * mutationFactor;
        this.child.fovs[0].range = this.fovs[0].range + random(-1,1) * mutationFactor;
        this.child.fovs[0].centerAngle = this.fovs[0].centerAngle + random(-1, 1) * mutationFactor;
        this.child.fovs[0].width = this.fovs[0].width + random(-1, 1) * mutationFactor;
        this.child.fovs[1].range = this.fovs[1].range + random(-1,1) * mutationFactor;
        this.child.fovs[1].centerAngle = this.fovs[1].centerAngle + random(-1, 1) * mutationFactor;
        this.child.fovs[1].width = this.fovs[1].width + random(-1, 1) * mutationFactor;
        this.child.fovs[2].range = this.fovs[2].range + random(-1,1) * mutationFactor;
        this.child.fovs[2].centerAngle = this.fovs[2].centerAngle + random(-1, 1) * mutationFactor;
        this.child.fovs[2].width = this.fovs[2].width + random(-1, 1) * mutationFactor;
        this.child.r = Math.max(Math.min(this.r + random(-15,15) * mutationFactor, 255), 0);
        this.child.g = Math.max(Math.min(this.g + random(-15,15) * mutationFactor, 255), 0);
        this.child.b = Math.max(Math.min(this.b + random(-15,15) * mutationFactor, 255), 0);
        this.child.rot = this.rot + 180;
        this.child.randomTurnFactor = this.randomTurnFactor + random(-0.015, 0,015) * mutationFactor;
        this.child.sprintFactor = this.sprintFactor + random(-0.05, 0.05) * mutationFactor;
        this.child.sprintTurnFactor = this.sprintTurnFactor + random(-0.05, 0.05) * mutationFactor;
        this.child.splitMass = this.splitMass + random(-2, 2) * mutationFactor;
        caali.push(this.child);
        this.energy /= 2;
    }
}

function Cube() {
    
    this.x = 200;
    this.y = 200;
    this.w = 100;
    this.h = 100;
    this.draw = function () {
        fill(200);
        rect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    }
}

function Food() {
    this.x = 300;
    this.y = 350;
    this.size = 16 + random(0, 4);
    
    this.draw = function () {
        fill(160, 70, 30);
        ellipse(this.x, this.y, this.size);
    }
    
    this.respawn = function () {
//        this.x = random(border + this.size, 600 + border - this.size);
//        this.y = random(border + this.size, 600 + border - this.size);
        foods.splice(j, 1);
    }
}

function Eye() {
    this.x = 0;
    this.y = 0;
    this.offset = 10;
    this.rotoffset = 0;
    this.seeswall = false;
    this.seesfood = false;
    
    this.see = function () {
        
        this.seeswall = false;
        this.seesfood = false;
        for (j = 0; j < cubeCount; j++) {
            if (Math.abs(cubes[j].x - this.x) < cubes[j].w / 2 + 2 && Math.abs(cubes[j].y - this.y) < cubes[j].h / 2 + 2) {
                this.seeswall = true;
                break;
            }
        }
        
        
        if (!this.seeswall && (this.x < border + 2 || this.x > 800 + border - 2 || this.y < border + 2 || this.y > height - border - 2)) {
            this.seeswall = true;
        }
    }
}

function FOV(owner) {
    this.centerAngle = 0;
    this.range = 50;
    this.curviness = 1.1;
    this.width = 60;
    this.owner = owner;
    this.foodCount = 0;
    
    this.draw = function () {
        fill(this.owner.r, this.owner.g, this.owner.b, 20);
        noStroke();
        beginShape();
        //vertex(this.owner.x, this.owner.y);
        vertex(this.owner.x + Math.cos(radians(this.owner.rot + this.width / 2 + this.centerAngle)) * this.range,
               this.owner.y + Math.sin(radians(this.owner.rot + this.width / 2 + this.centerAngle)) * this.range);
        bezierVertex(this.owner.x + Math.cos(radians(this.owner.rot + this.width / 4 + this.centerAngle)) * this.range * this.curviness,
                    this.owner.y + Math.sin(radians(this.owner.rot + this.width / 4 + this.centerAngle)) * this.range * this.curviness,
                    this.owner.x + Math.cos(radians(this.owner.rot - this.width / 4 + this.centerAngle)) * this.range * this.curviness,
                    this.owner.y + Math.sin(radians(this.owner.rot - this.width / 4 + this.centerAngle)) * this.range * this.curviness,
                    this.owner.x + Math.cos(radians(this.owner.rot - this.width / 2 + this.centerAngle)) * this.range,
                    this.owner.y + Math.sin(radians(this.owner.rot - this.width / 2 + this.centerAngle)) * this.range);
        //vertex(this.owner.x, this.owner.y);
        endShape();
        triangle(this.owner.x, this.owner.y,
                this.owner.x + Math.cos(radians(this.owner.rot + this.width / 2 + this.centerAngle)) * this.range,
                this.owner.y + Math.sin(radians(this.owner.rot + this.width / 2 + this.centerAngle)) * this.range,
                this.owner.x + Math.cos(radians(this.owner.rot - this.width / 2 + this.centerAngle)) * this.range,
                this.owner.y + Math.sin(radians(this.owner.rot - this.width / 2 + this.centerAngle)) * this.range);
    }
    
    this.see = function () {
        this.foodCount = 0;
        for (var kaqs = 0; kaqs < foods.length; kaqs++) {
            if (dist(this.owner.x, this.owner.y, foods[kaqs].x, foods[kaqs].y) <= this.range) {
                var distVec = createVector(foods[kaqs].x - this.owner.x, foods[kaqs].y - this.owner.y);
                if (angle_between(degrees(distVec.heading()),
                                  this.owner.rot + this.centerAngle - this.width / 2,
                                 this.owner.rot + this.centerAngle + this.width / 2)) {
                    this.foodCount += foods[kaqs].size;
                }
            }
        }
    }
}
                    
function angle_between(n, a, b) {
	n = (360 + (n % 360)) % 360;
	a = (360 + a) % 360;
	b = (360 + b) % 360;

	if (a < b)
		return a <= n && n <= b;
	return a <= n || n <= b;
}