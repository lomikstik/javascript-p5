var video;
var button;
var snapshots = [];

function setup() {
    createCanvas(300,240);
    background(51);
    video = createCapture(VIDEO);
    video.size(320,240);
    video.hide();
    button = createButton('KILL!');
    button.mousePressed(manipulatePixels);
}

function draw() {
    //tint(255,0,0);
    //image(video,0,0);
    /*if(frameCount%5 == 0) {
        btn0_action();
    }*/
    //image(video);
    manipulatePixels();
}

function btn0_action() {
    //image(video,0,0);
    /*snapshots.reverse();
    snapshots.push(video.get());
    snapshots.reverse();
    if(snapshots.length > 9) {
        //snapshots.reverse();
        snapshots.pop();
        //snapshots.reverse();
    }
    
    for(var i = 0; i < snapshots.length; i++) {
        image(snapshots[i],100*(i%3),80*Math.floor(i/3),100,80);
    }*/
}

function manipulatePixels() {
    image(video,0,0);
    loadPixels();
    
    for(var i=0; i<width*height*4; i+=4) {     //B = G, G = R, R = B
        pixels[i+3] = pixels[i];
        pixels[i] = pixels[i+1];
        pixels[i+1] = pixels[i+2];
        pixels[i+2] = pixels[i+3];
        pixels[i+3] = 255;
    }
    

    
    updatePixels();
}
