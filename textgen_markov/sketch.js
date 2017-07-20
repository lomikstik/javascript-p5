var txt, grams = {}, order = 5, btn, len = 300;

function preload() {
    txt = loadStrings('text.txt');
}

function setup() {
    //txt = "the theremin is a theremin that therefore does things there";
    txt = join(txt, " ");
    noCanvas();
    btn = createButton('Generate!');
    btn.mousePressed(markovIt);
    
    for(var i = 0; i <= txt.length - order; i++) {
        gram = txt.substring(i,i+order);
        if(!grams[gram]) {
            grams[gram] = [];
        }
        grams[gram].push(txt.charAt(i+order));
    }
}

function draw() {
  
}

function markovIt() {
    var currentGram = txt.substring(0,order);
    var result = currentGram;
    for(var i = 0; i < len; i++) {
        var possibilities = grams[currentGram];
        if(!possibilities) break;
        var next = random(possibilities);
        result +=next;
        currentGram = result.substring(result.length-order, result.length);
    }
    createP(result);
}