var socket;
var derpX = 0, derpY = 0;
function setup() {
    createCanvas(600, 600);
    socket = io.connect('http://127.0.0.1:3000');
    //socket = io.connect();
    background(51);
    blendMode(BLEND);
    socket.on('derp', drawOther);
}

function draw() {
    derpX = lerp(derpX, mouseX, 0.05);
    derpY = lerp(derpY, mouseY, 0.05);
    stroke(0);
    noStroke();
    fill(0, 20);
    rect(0, 0, 600, 600);
    fill(0,255,0);
    ellipseMode(CENTER);
    ellipse(derpX, derpY, 20, 20);
    
    var data = {
        x:derpX,
        y:derpY
    }
    
    socket.emit('derp', data);
}

function drawOther(data) {
    fill(255,0,0);
    ellipseMode(CENTER);
    ellipse(data.x, data.y, 20, 20);
}