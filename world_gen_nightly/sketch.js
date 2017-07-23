var xSlider, ySlider, scaleSlider, seedBox, noiseX, noiseY, noiseValue;

function setup() {
    var canva = createCanvas(200,200);
    canva.parent("sliderbox");
    xSlider = createSlider(0, 10, 0, 0.1);
    xSlider.parent("sliderbox");
    ySlider = createSlider(0, 10, 0, 0.1);
    ySlider.parent("sliderbox");
    scaleSlider = createSlider(20, 1000, 20);
    scaleSlider.parent("sliderbox");
    waterSlider = createSlider(0,255,127,1);
    waterSlider.parent("sliderbox");
    beachSlider = createSlider(0,255,10,1);
    beachSlider.parent("sliderbox");
}

function draw() {
    background(51);
    loadPixels();
    for(var i = 0; i < width * height * 4; i += 4) {
        noiseValue = map(noise(((i/4)%width)/scaleSlider.value()+xSlider.value(),(Math.floor((i/4)/height))/scaleSlider.value()+ySlider.value()),0,1,0,255);
        
//        pixels[i] = noiseValue;         //Plain noise values
//        pixels[i+1] = noiseValue;
//        pixels[i+2] = noiseValue;
        
        if(noiseValue > waterSlider.value()+beachSlider.value()) {            //Land
            pixels[i] = 0;
            pixels[i+1] = map(noiseValue,waterSlider.value(),255,255,50);
            pixels[i+2] = 0;
        }
        if(noiseValue < waterSlider.value()){         //Water
            pixels[i] = 0;
            pixels[i+1] = 0;
            pixels[i+2] = map(noiseValue,0,waterSlider.value(),50,255);
        }
        if(noiseValue < waterSlider.value()+beachSlider.value() && noiseValue > waterSlider.value()) {
            pixels[i] = map(noiseValue,waterSlider.value(),waterSlider.value()+beachSlider.value(),255,50);
            pixels[i+1] = map(noiseValue,127,255,255,50);
            pixels[i+2] = 0;
        }
    }
    updatePixels();
}