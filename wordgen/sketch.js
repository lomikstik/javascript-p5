var btn, word, w, charsA = [], charsB = [];

function setup() {
    createCanvas(600,400);
    btn = createButton('Generate');
    btn.mousePressed(generateWord);
    word = "default";
    w = "";
    charsA = new Array("a","e","i","u","o","y");//,"ei","ai","au","eu","ao","ia");
    charsB = new Array("b","c","d","f","g","h","j","k","l","m","n","p","r","s","t","v","z","w","x");//,"ch","th","gh","sh","ph");
}

function draw() {
  background(51);
    noStroke();
    fill(255);
    text(w,20,60);
}

function generateWord() {
    w = "";
    var wordLength = Math.floor(random(4,10));
    var chTypeA = true;
    if(random(100) < 50) {
        chTypeA = false;
    }
    word = "";
    for(var j = 0; j < 12; j++) {
        wordLength = Math.floor(random(2,10));
        for(var i = 0; i < wordLength; i++) {
            var nextChar;
            if(chTypeA) {
                nextChar = charsA[Math.floor(random(charsA.length-1))];
            } else {
                nextChar = charsB[Math.floor(random(charsB.length-1))];
            }
            word = word + nextChar;
            chTypeA = !chTypeA;
        }
        w+=word;
        w+=" ";
        word = "";
    }
}