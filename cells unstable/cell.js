function Cell() {
    //this.body = Matter.Bodies.circle(100,100,10);
    this.x = width/2;
    this.y = height/2;
    this.velX = 0;
    this.velY = 0;
    this.angle = 0;
    this.type = "photocyte";
    this.mass = 50;
    this.maxMass = 100;
    this.minMass = 10;
    this.genome = defaultGenome;
    this.mode = this.genome.modes[0];
    //console.log(this);
    this.setup = function () {
        if (this.mode.type == "photocyte") {
            this.maxMass = 150;
        }
    }
    
    this.update = function () {
        if (this.mass >= this.mode.splitMass) {
            this.split();
        }
        
        if (this.mode.type == "photocyte") {
            this.mass += light;
        }
        
        if(this.mass > this.maxMass) this.mass = this.maxMass; 
        
        for(var k = 0; k < cells.length; k++) {
            var distance = dist(this.x,this.y,cells[k].x,cells[k].y);
            if(distance<sqrt(this.mass)*2+sqrt(cells[k].mass)*2&&cells[k]!=this) {
                //THESE ARE COLLIDING!!!
                this.velX += (-cells[k].x + this.x)*0.05/distance;
                this.velY += (-cells[k].y + this.y)*0.05/distance;
                
                cells[k].velX += (-this.x + cells[k].x+random(0,0.1))*0.05;
                cells[k].velY += (-this.y + cells[k].y)*0.05;
            }
        }
        
        this.x += this.velX;
        this.y += this.velY;
        this.velX = lerp(this.velX, 0, viscosity);
        this.velY = lerp(this.velY, 0, viscosity);
        
        if(this.x > 600 || this.y > 600 || this.x < 0 || this.y < 0) {
            cells.splice(i,1);
        }
    }
    
    this.draw = function () {
        ellipseMode(RADIUS);
        fill(this.mode.color.r,this.mode.color.g,this.mode.color.b);
        ellipse(this.x, this.y, Math.sqrt(this.mass*4));
    }
    
    this.split = function () {
        this.childA = new Cell();
        this.childA.genome = this.genome;
        this.childA.mode = this.genome.modes[this.mode.childAMode];
        this.childA.angle = this.angle + this.mode.childAAngle;
        this.childA.x = this.x + Math.cos(this.mode.splitAngle+this.angle) * 25;
        this.childA.y = this.y + Math.sin(this.mode.splitAngle+this.angle) * 25;
        this.childA.mass = this.mass * this.mode.splitMassRatio;
        cells.push(this.childA);
        
        this.childB = new Cell();
        this.childB.genome = this.genome;
        this.childB.mode = this.genome.modes[this.mode.childBMode];
        this.childB.angle = this.angle + this.mode.childBAngle;
        this.childB.x = this.x - Math.cos(this.mode.splitAngle+this.angle) * 25;
        this.childB.y = this.y - Math.sin(this.mode.splitAngle+this.angle) * 25;
        this.childB.mass = this.mass * (1-this.mode.splitMassRatio);
        cells.push(this.childB);
        
        cells.splice(i,1);
    }
}