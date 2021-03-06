var border = 10;
var width = 1000;
var height = 600;
var cubes = [];
var caali = [];
var foods = [];
var cubeCount = 0;
var nutrition = 1;
var foodCount = 60;
var passiveConsumption = 0.005;
var activeConsumption = 0.05;
var worldScale = 1;
var mutationFactor = 1;
var timescale = 1;
var foodRespawnRate = 0.05;
var i;
var j;
var k, time = 0, foodTimer = 0, menu, worldScalePrev;
var selectedCaalis;
var menuMode = 1;   //menuMode 0 - inspect and control one selected caalis
                    //menuMode 1 - show all caalis's nutrient values/age/stuff
                    //menuMode 2 - access global variables nutr, timescale, foodcount etc.
var sliders = [];
function setup() {
    
    createCanvas(1000 + 2 * border, 600 + 2 * border);
    frameRate(60);
//    randomSeed(1234);
    sliders[0] = createSlider(0,3,0,0.1);
    sliders[0].position(810,70);
    sliders[0].style('width', '195px');
    sliders[0].style('visibility', 'hidden');
    sliders[1] = createSlider(0,2,1,0.05);
    sliders[1].position(810,120);
    sliders[1].style('width', '195px');
    sliders[1].style('visibility', 'hidden');
    sliders[2] = createSlider(0,20,1,0.1);
    sliders[2].position(810,170);
    sliders[2].style('width', '195px');
    sliders[2].style('visibility', 'hidden');
    sliders[3] = createSlider(0,100,60,1);
    sliders[3].position(810,220);
    sliders[3].style('width', '195px');
    sliders[3].style('visibility', 'hidden');
    sliders[4] = createSlider(0,0.5,0.05,0.01);
    sliders[4].position(810,270);
    sliders[4].style('width', '195px');
    sliders[4].style('visibility', 'hidden');
    sliders[5] = createSlider(0,0.01,0.005,0.0002);
    sliders[5].position(810,320);
    sliders[5].style('width', '195px');
    sliders[5].style('visibility', 'hidden');
    sliders[6] = createSlider(0,0.1,0.05,0.001);
    sliders[6].position(810,370);
    sliders[6].style('width', '195px');
    sliders[6].style('visibility', 'hidden');
    sliders[7] = createSlider(0,0.9,0,0.1);
    sliders[7].position(810,420);
    sliders[7].style('width', '195px');
    sliders[7].style('visibility', 'hidden');
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
    menu = new Menu();
}

function draw() {
    time += timescale;
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
    
    while (time > 1) {
        foodTimer += foodRespawnRate;
        while (foodTimer > 1 && foods.length < foodCount) {
            var newFood = new Food();
            newFood.x = random(border + newFood.size, 800 + border - newFood.size);
            newFood.y = random(border + newFood.size, 600 + border - newFood.size);
            foods.push(newFood);
            foodTimer--;
        }


        for (i = 0; i < caali.length; i++) {
            caali[i].see();
            caali[i].think();
            caali[i].update();
        }
        time--;
    }

    
   
    for (i = 0; i < caali.length; i++) {
        caali[i].draw();
    }
    
    foods.forEach (function (food) {
        food.draw();
    })
    
    menu.draw();
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
        ellipse(this.x, this.y, this.size * worldScale);
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
        vertex(this.owner.x + Math.cos(radians(this.owner.rot + this.width / 2 + this.centerAngle)) * this.range * worldScale,
               this.owner.y + Math.sin(radians(this.owner.rot + this.width / 2 + this.centerAngle)) * this.range * worldScale);
        bezierVertex(this.owner.x + Math.cos(radians(this.owner.rot + this.width / 4 + this.centerAngle)) * this.range * worldScale * this.curviness,
                    this.owner.y + Math.sin(radians(this.owner.rot + this.width / 4 + this.centerAngle)) * this.range * worldScale * this.curviness,
                    this.owner.x + Math.cos(radians(this.owner.rot - this.width / 4 + this.centerAngle)) * this.range * worldScale * this.curviness,
                    this.owner.y + Math.sin(radians(this.owner.rot - this.width / 4 + this.centerAngle)) * this.range * worldScale * this.curviness,
                    this.owner.x + Math.cos(radians(this.owner.rot - this.width / 2 + this.centerAngle)) * this.range * worldScale,
                    this.owner.y + Math.sin(radians(this.owner.rot - this.width / 2 + this.centerAngle)) * this.range * worldScale);
        //vertex(this.owner.x, this.owner.y);
        endShape();
        triangle(this.owner.x, this.owner.y,
                this.owner.x + Math.cos(radians(this.owner.rot + this.width / 2 + this.centerAngle)) * this.range * worldScale,
                this.owner.y + Math.sin(radians(this.owner.rot + this.width / 2 + this.centerAngle)) * this.range * worldScale,
                this.owner.x + Math.cos(radians(this.owner.rot - this.width / 2 + this.centerAngle)) * this.range * worldScale,
                this.owner.y + Math.sin(radians(this.owner.rot - this.width / 2 + this.centerAngle)) * this.range * worldScale);
    }
    
    this.see = function () {
        this.foodCount = 0;
        if (!this.owner.isPredator) {
            for (var kaqs = 0; kaqs < foods.length; kaqs++) {
                if (dist(this.owner.x, this.owner.y, foods[kaqs].x, foods[kaqs].y) <= this.range * worldScale) {
                    var distVec = createVector(foods[kaqs].x - this.owner.x, foods[kaqs].y - this.owner.y);
                    if (angle_between(degrees(distVec.heading()),
                                      this.owner.rot + this.centerAngle - this.width / 2,
                                     this.owner.rot + this.centerAngle + this.width / 2)) {
                        this.foodCount += foods[kaqs].size;
                    }
                }
            }
        }
        else {
            for (var kaqs = 0; kaqs < caali.length; kaqs++) {
                if (dist(this.owner.x, this.owner.y, caali[kaqs].x, caali[kaqs].y) <= this.range * worldScale && !caali[kaqs].isPredator) {
                    var distVec = createVector(caali[kaqs].x - this.owner.x, caali[kaqs].y - this.owner.y);
                    if (angle_between(degrees(distVec.heading()),
                                      this.owner.rot + this.centerAngle - this.width / 2,
                                     this.owner.rot + this.centerAngle + this.width / 2)) {
                        this.foodCount += caali[kaqs].energy;
                    }
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

function mousePressed () {
    if(mouseX < 800) {
        for (var ctr = 0; ctr < caali.length; ctr++) {
            if(dist(mouseX, mouseY, caali[ctr].x, caali[ctr].y) < (caali[ctr].energy + 100) * worldScale/20) {
                selectedCaalis = caali[ctr];
                menuMode = 0;
                for (i = 0; i < sliders.length; i++) {
                    sliders[i].style('visibility', 'hidden');
                }
                break;
            }
            else if (menuMode == 0) {
                menuMode = 1;
            }
        }
    }
    else {
        menu.clicked();
    }
}