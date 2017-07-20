var changeFactor = 0.1;
var nNet, x, y;
var valuesIn = [];
var mistakes = 0;
function setup() {
    createCanvas(600, 600);
    nNet = new Network();
    for(var kaqs = 0; kaqs < nNet.layers.length-1; kaqs++) {
        for(var kaqs2 = 0; kaqs2 < nNet.layers[kaqs].neurons.length; kaqs2++) {
            for(var kaqs3 = 0; kaqs3 < nNet.layers[kaqs+1].neurons.length; kaqs3++) {
                console.log(kaqs + " " + kaqs2 + " " + kaqs3);
                nNet.connect(kaqs, kaqs2, kaqs+1, kaqs3);
            }
        }
    }
    x = random(600);
    y = random(600);
}

function draw() {
    background(51);
    x = random(600);
    y = random(600);
    
    valuesIn[0] = x;
    valuesIn[1] = y;
    nNet.input();
    nNet.update();
    if(nNet.output()[0] > 0.5 && y < 300) {
        nNet.teach(1 - nNet.output() * x);
        mistakes++;
        console.log(mistakes);
    }
    else if(nNet.output()[0] < 0.5 && y >= 300) {
        nNet.teach(0.5);
        mistakes++;
        console.log(mistakes);
    }
    
}

function mousePressed () {
    console.log(y);
    console.log(nNet.output());
}