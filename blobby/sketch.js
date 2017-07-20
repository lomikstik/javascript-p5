var step, radius, radiusdev;
function setup() {
    createCanvas(400,400);
    step = PI/200;
    radius = 100;
    radiusdev = 20;
    noiseSeed(2555);
}

function draw() {
    background(51);
    stroke(255);
    strokeWeight(3);
    fill(255,127);
    push();
    translate(200,200);
    beginShape();
    noiseDetail(2);
    for(var i = 0; i < TWO_PI; i += step) {
        var deltaR = map(noise(cos(i)+10,sin(i)+10,frameCount/100),0,1,-radiusdev,radiusdev);
        //var deltaR = sin(frameCount/15+(i*15))*radiusdev;
        vertex(cos(i)*(radius+deltaR),sin(i)*(radius+deltaR));
    }
    endShape();
    pop();
}