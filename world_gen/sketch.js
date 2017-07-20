var xSlider, ySlider, scaleSlider, seedBox, noiseX, noiseY, noiseValue;

function setup() {
    createCanvas(200,200);
    xSlider = createSlider(0, 10, 0, 0.1);
    xSlider.parent("sliderbox");
    ySlider = createSlider(0, 10, 0, 0.1);
    ySlider.parent("sliderbox");
    scaleSlider = createSlider(20, 1000, 20);
    scaleSlider.parent("sliderbox");
}

function draw() {
    background(51);
    loadPixels();
    for(var i = 0; i < width * height * 4; i += 4) {
        noiseValue = map(noise(((i/4)%width)/scaleSlider.value()+xSlider.value(),(Math.floor((i/4)/height))/scaleSlider.value()+ySlider.value()),0,1,0,255);
        
//        pixels[i] = noiseValue;         //Plain noise values
//        pixels[i+1] = noiseValue;
//        pixels[i+2] = noiseValue;
        
        if(noiseValue > 135) {            //Land
            pixels[i] = 0;
            pixels[i+1] = map(noiseValue,127,255,255,50);
            pixels[i+2] = 0;
        }
        else if(noiseValue < 127){         //Water
            pixels[i] = 0;
            pixels[i+1] = 0;
            pixels[i+2] = map(noiseValue,0,128,50,255);
        }
        else {
            pixels[i] = map(noiseValue,127,255,255,50);
            pixels[i+1] = map(noiseValue,127,255,255,50);
            pixels[i+2] = 0;
        }
    }
    updatePixels();
}