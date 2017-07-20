// Matter modules
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine, boxes = [], circles = [], world, ground = [], dragX, dragY, constrA, constrB;
var mode, menu;
function setup () {
    createCanvas(1000, 600);
    engine = Engine.create();
    world = engine.world;
    ground[0] = new Box(400, 610, 800, 40);
    ground[0].body.isStatic = true;
    ground[1] = new Box(400, -10, 800, 40);
    ground[1].body.isStatic = true;
    ground[2] = new Box(-10, 300, 40, 600);
    ground[2].body.isStatic = true;
    ground[3] = new Box(810, 300, 40, 600);
    ground[3].body.isStatic = true;
    Engine.run(engine);
    mode = "rectangle";
    menu = new Menu();
}

function mousePressed () {
    dragX = mouseX;
    dragY = mouseY;
    if (mouseX>800) {
        menu.clicked();
    }
    else if(mode == "constraint") {
        for(var i = 0; i < circles.length; i++) {
            if(dist(mouseX, mouseY, circles[i].body.position.x, circles[i].body.position.y) < circles[i].radius / 2) {
                constrA = circles[i];
                break;
            }
        }
        for(var i = 0; i < circles.length; i++) {
            if(dist(mouseX, mouseY, boxes[i].body.position.x, boxes[i].body.position.y) < Math.sqrt(boxes[i].body.area) / 2) {
                constrA = boxes[i];
                break;
            }
        }
    }
    
}
function mouseReleased () {
    if (mode == "rectangle" && dragX < 800 && dragY > 0 && dragY < 600) {
        boxes.push(new Box((mouseX + dragX) / 2, (mouseY + dragY) / 2, Math.abs(mouseX-dragX), Math.abs(mouseY-dragY)));
    }
    
    else if (mode == "circle" && dragX < 800 && dragY > 0 && dragY < 600) {
        console.log("noKaqs");
        circles.push(new Circle(dragX, dragY,2*Math.sqrt(Math.pow(mouseX-dragX, 2) + Math.pow(mouseY-dragY, 2))));
        console.log("kaqs");
    }
    else if(mode == "constraint") {
        for(var i = 0; i < circles.length; i++) {
            if(dist(mouseX, mouseY, circles[i].body.position.x, circles[i].body.position.y) < circles[i].radius / 2) {
                constrB = circles[i];
                break;
            }
        }
        for(var i = 0; i < circles.length; i++) {
            if(dist(mouseX, mouseY, boxes[i].body.position.x, boxes[i].body.position.y) < Math.sqrt(boxes[i].body.area) / 2) {
                constrB = boxes[i];
                break;
            }
        }
        
        Matter.Constraint.create({bodyA: constrA.body, bodyB: constrB.body});
    }
    
    dragX = 0;
    dragY = 0;
}

function draw () {
    background(51);
    stroke(100);
    strokeWeight(2);
    fill(200);
    boxes.forEach(function (currBox) {
        currBox.draw();
    })
    circles.forEach(function (currCircle) {
        currCircle.draw();
    })
    fill(150);
    ground[0].draw();
    ground[1].draw();
    ground[2].draw();
    ground[3].draw();
    createObject();
    noStroke();
    
    menu.draw();
}

function createObject () {
    if (mode == "rectangle") {
        if (dragX > 0 && dragX < 800 && dragY > 0 && dragY < 600) {
            stroke(255);
            strokeWeight(1);
            fill(255,255,255,0);
            rect(dragX,dragY,mouseX-dragX,mouseY-dragY);
        }
    }
    
    else if (mode == "circle") {
        if (dragX > 0 && dragX < 800 && dragY > 0 && dragY < 600) {
            stroke(255);
            strokeWeight(1);
            fill(255,255,255,0);
            ellipse(dragX,dragY,2*Math.sqrt(Math.pow(mouseX-dragX, 2) + Math.pow(mouseY-dragY, 2)));
        }
    }
    else if (mode == "constraint") {
        if(dragX > 0 && dragX < 800 && dragY > 0 && dragY < 600) {
            stroke(255);
            strokeWeight(1);
            line()
        }
    }
}