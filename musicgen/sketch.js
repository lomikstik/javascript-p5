var octaveFactor = 1; //Default = 1
var speedFactor = 0.25;  //Default = 1
var xoff = 0.0;
var yoff = 0.0;
var val, freq, ns;
var bassEnabled = false; //Default = false
function setup() {
    noiseSeed();
    osc = new p5.Oscillator();
    osc.setType('sine');
    osc.freq(261.63);
    osc.amp(1);
    osc.start();
    
    osc2 = new p5.Oscillator();
    osc2.setType('sine');
    osc2.freq(261.63);
    osc2.amp(1);
    osc2.start();
    
    ns = new p5.Noise();
    ns.setType('brown');
    ns.amp(0);
    ns.start();
}

function draw() {
    createCanvas(301, 80);
    background(51);
    if (frameCount % Math.round(15 / speedFactor) == 0) {
        calcNote();
        if (bassEnabled) {
            ns.amp(1);
            setTimeout(function(){
            ns.amp(0, 0.1);
            }, 10);
        }
    }
    
    fill(200);
    for (var i = 0; i < 15; i++) {
        rect(i * 20, 0, 20, 79);
    }
    fill(100);
    rect(val * 20, 0, 20, 159);
    for(var i = -1; i < 15; i++) {
    if(!(i == 2 || i == 5 || i == 9 || i == 12)) {
            fill(20);
            rect(i * 20 + 15, 0, 10, 50);
            fill(200);
        }
    }

}

function calcNote() {
    val = noise(xoff, yoff);
//    val = random(0, 1);
    val = map(val, 0, 1, 0, 14.99);
    val = Math.floor(val);
    
    xoff+=0.3;        //Default += 0.3
    if (xoff == 1.2) {
        xoff = 0;
        yoff += 0.1; //Default += 0.1
    }
    
    if(val == 0) {
        osc.freq(196.00 * octaveFactor);
        osc2.freq(246.94 * octaveFactor);
    }
    else if(val == 1) {
        osc.freq(220.00 * octaveFactor);
        osc2.freq(261.63 * octaveFactor);
    }
    else if(val == 2) {
        osc.freq(246.94 * octaveFactor);
        osc2.freq(293.66 * octaveFactor);
    }
    else if(val == 3) {
        osc.freq(261.63 * octaveFactor);
        osc2.freq(329.63 * octaveFactor);
    }
    else if (val == 4) {
        osc.freq(293.66 * octaveFactor);
        osc2.freq(349.23 * octaveFactor);
    }
    else if (val == 5) {
        osc.freq(329.63 * octaveFactor);
        osc2.freq(392.00 * octaveFactor);
    }
    else if (val == 6) {
        osc.freq(349.23 * octaveFactor);
        osc2.freq(440.00 * octaveFactor);
    }
    else if (val == 7) {
        osc.freq(392.00 * octaveFactor);
        osc2.freq(493.88 * octaveFactor);
    }
    else if (val == 8) {
        osc.freq(440.00 * octaveFactor);
        osc2.freq(523.25 * octaveFactor);
    }
    else if (val == 9) {
        osc.freq(493.88 * octaveFactor);
        osc2.freq(587.33 * octaveFactor);
    }
    else if (val == 10) {
        osc.freq(523.25 * octaveFactor);
        osc2.freq(659.25 * octaveFactor);
    }
    else if (val == 11) {
        osc.freq(587.33 * octaveFactor);
        osc2.freq(698.46 * octaveFactor);
    }
    else if (val == 12) {
        osc.freq(659.25 * octaveFactor);
        osc.freq(783.99 * octaveFactor);
    }
    else if (val == 13) {
        osc.freq(698.46 * octaveFactor);
    }
    else if (val == 14) {
        osc.freq(783.99 * octaveFactor);
    }
}