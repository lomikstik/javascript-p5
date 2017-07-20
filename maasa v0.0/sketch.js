var maasa;
var lomiks;
var centerX = 200;
var centerY = 140;
var radius = 33;

function setup() {
    createCanvas(400,400);
    maasa = "miilums";
    lomiks = 38;
    ellipseMode(CENTER);
    angleMode(DEGREES);
}

function draw() {
    background(120,255,120);  // R G B
    stroke(0);
    strokeWeight(2);
    fill(0);
    ellipse(200,200,50,50);
    ellipse(200,280,100,120);
    ellipse(200,140,80,80);
    
    line(200,200,250,170+maasa*0);
    line(250,170+maasa*0,300,200+maasa*1);
    
    line(200,200,150,170+maasa*0);
    line(150,170+maasa*0,100,200+maasa*1);
    
    line(200,200,250,150+maasa*0);
    line(250,150+maasa*0,300,180+maasa*1);
    
    line(200,200,150,150+maasa*0);
    line(150,150+maasa*0,100,180+maasa*1);
    
    line(200,200,250,200+maasa*0);
    line(250,200+maasa*0,300,230+maasa*1);
    
    line(200,200,150,200+maasa*0);
    line(150,200+maasa*0,100,230+maasa*1);
    
    stroke(255,50,50);
    
    for(var i = 70; i < 110; i+=10) {
        var x1 = centerX - cos(i)*radius;
        var y1 = centerY - sin(i)*radius;
        var x2 = centerX - cos(i+10)*radius;
        var y2 = centerY - sin(i+10)*radius;
        line(x1,y1,x2,y2);
    }
    
    strokeWeight(10);
    point(220,120);
    point(180,120);
    lomiks+=10;
    maasa = sin(lomiks)*20;
}