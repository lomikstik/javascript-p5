function generateAnts() {
    normalizeFitness(allAnts);
    var oldAnts = allAnts.slice();
    allAnts = new Array();
    for(var i = 0; i < antCount; i++) {
        allAnts.push(poolSelect(oldAnts));
    }
}

function normalizeFitness(ants) {
    var totalFitness = 0;
    ants.forEach(function(a) {
        a.calculateFitness();
        totalFitness += a.fitness;
    });
    
    ants.forEach(function(a) {
        a.fitness = a.fitness / totalFitness;
    });
}

function poolSelect(pool) {
    var val = random(1);
    var counter = 0;
    while(val > 0) {
        val-=pool[counter].fitness;
        counter++;
    }
    counter--;
    return pool[counter].copy();
}

function Nest() {
    this.x = 50;
    this.y = 50;
    
    this.show = function () {
        fill(255,0,255);
        ellipse((this.x+0.5)*tileSize, (this.y+0.5)*tileSize, tileSize, tileSize);
    }
}