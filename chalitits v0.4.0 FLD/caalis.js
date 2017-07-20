function Caalis() {
    this.x = 30;
    this.y = 30;
    this.r = 255;
    this.g = 255;
    this.b = 255;
    this.generation = 0;
    this.rot = 0;
    this.speed = 1;
    this.rotspeed = 3;
    this.state = 0;
    this.randomturn = 0;
    this.stateDecay = 0;
    this.energy = 50;
    this.fovs = [];
    this.age = 0;
    this.isPredator = false;
    
    this.randomTurnFactor = 0.3;
    this.sprintFactor = 2;
    this.sprintTurnFactor = 1;
    this.splitMass = 100;
    
    this.fovs[0] = new FOV(this);
    this.fovs[0].centerAngle = 0;
    this.fovs[0].width = 60;
    this.fovs[0].range = 50;
    
    this.fovs[1] = new FOV(this);
    this.fovs[1].centerAngle = 60;
    this.fovs[1].width = 60;
    this.fovs[1].range = 45;
    
    this.fovs[2] = new FOV(this);
    this.fovs[2].centerAngle = -60;
    this.fovs[2].width = 60;
    this.fovs[2].range = 45;
    
    this.eyes = [];
    this.eyes[0] = new Eye();
    this.eyes[0].offset = 40;
    this.eyes[0].rotoffset = 30;
    
    this.eyes[1] = new Eye();
    this.eyes[1].offset = 40;
    this.eyes[1].rotoffset = -30;
 
    this.think = function () {
        if (this.state == 0) {                                          //State 0: Standart wandering behaviour
            if (this.eyes[0].seeswall && !this.eyes[1].seeswall) {
                this.turn(-this.rotspeed);
                this.move(this.speed * 0.1 * worldScale);
                this.randomturn = random(-this.rotspeed*this.randomTurnFactor, 0);
            }
            else if (this.eyes[1].seeswall && !this.eyes[0].seeswall) {
                this.turn(this.rotspeed);
                this.move(this.speed * 0.1 * worldScale);
                this.randomturn = random(0, this.rotspeed*this.randomTurnFactor);
            }
            else if (this.eyes[0].seeswall && this.eyes[1].seeswall){
                if (random(-1,1) > 0) {
                    this.state = 1;
                }
                else {
                    this.state = 2;
                }
            }
            
            else if (this.fovs[1].foodCount > this.fovs[0].foodCount && this.fovs[1].foodCount > this.fovs[2].foodCount) {
                this.turn(this.rotspeed * this.sprintTurnFactor);
                this.randomturn = 0;
                this.move(this.speed*this.sprintFactor * worldScale);
//                this.state = 3;
//                this.stateDecay = 20;
            }
            else if (this.fovs[0].foodCount > this.fovs[1].foodCount && this.fovs[0].foodCount > this.fovs[2].foodCount) {
                this.randomturn = 0;
                this.move(this.speed * this.sprintFactor * worldScale);
//                this.state = 3;
//                this.stateDecay = 20;
            }
            else if (this.fovs[2].foodCount > this.fovs[0].foodCount && this.fovs[2].foodCount > this.fovs[1].foodCount) {
                this.turn(-this.rotspeed * this.sprintTurnFactor);
                this.randomturn = 0;
                this.move(this.speed * this.sprintFactor * worldScale);
//                this.state = 3;
//                this.stateDecay = 20;
            }
            
            else {
                this.move(this.speed * worldScale);
                if (random(0,1) < 0.01) {
                    this.randomturn = random (-this.rotspeed * this.randomTurnFactor, this.rotspeed * this.randomTurnFactor);
                }
                this.turn(this.randomturn);
            }
        }
        
        
        else if (this.state == 1) {                                 //State 1: Turn left until no wall seen
            if (this.eyes[0].seeswall || this.eyes[1].seeswall) {
                this.turn(this.rotspeed);
            }
            else {
                this.state = 0;
            }
        }
        
        
        else if (this.state == 2) {                                 //State 2: Turn right until no wall seen
            if (this.eyes[0].seeswall || this.eyes[1].seeswall) {
                this.turn(-this.rotspeed);
            }
            else {
                this.state = 0;
            }
        }
        
        
//        else if (this.state == 3) {                                 //State 3: Run for food until stateDecay==0
//            if (this.eyes[0].seesfood && !this.eyes[1].seesfood) {
//                this.turn(this.rotspeed);
//            }
//            else if (this.eyes[1].seesfood && !this.eyes[0].seesfood) {
//                this.turn(-this.rotspeed);
//            }
//            this.randomturn = 0;
//            this.move(this.speed*2);
//            this.stateDecay--;
//            if (this.stateDecay == 0 || this.eyes[0].seeswall || this.eyes[1].seeswall) {
//                this.state = 0;
//            }
//            
//        }
        
        else if (this.state == 4) {     
            this.stateDecay--;
            if (this.stateDecay == 0) {
                this.state = 0;
                this.split();
            }
        }
    }
    
    this.see = function () {
        for (k = 0; k < this.eyes.length; k++) {
            this.eyes[k].x = this.x + Math.cos(radians(this.rot + this.eyes[k].rotoffset)) * this.eyes[k].offset * worldScale;
            this.eyes[k].y = this.y + Math.sin(radians(this.rot + this.eyes[k].rotoffset)) * this.eyes[k].offset * worldScale;
            this.eyes[k].see();
        }
        for (k = 0; k < this.fovs.length; k++) {
            this.fovs[k].see();
        }
    }
    
    this.draw = function () {
        
        //fill(90, 220, 130);
        fill(this.r, this.g, this.b);
        stroke(this.r - 50, this.g - 50, this.b - 50);
        strokeWeight(2);
        ellipse(this.x, this.y, (this.energy + 100) / 10 * worldScale);
        noStroke();
        for (k = 0; k < this.eyes.length; k++) {
            fill(255, 0, 0);

            if (this.eyes[k].seeswall) {
                fill(0, 255, 0);
            }  
//            if (this.eyes[k].seesfood) {
//                fill(0, 0, 255);
//            }

            ellipse(this.eyes[k].x, this.eyes[k].y, 4 * worldScale);
        }
        for (k = 0; k < this.fovs.length; k++) {
            this.fovs[k].draw();
        }
    }
    
    this.move = function (spd) {
        this.x += Math.cos(radians(this.rot)) * spd;
        this.y += Math.sin(radians(this.rot)) * spd;
        this.energy-=Math.pow(Math.abs(spd), 1.1) * activeConsumption;
    }
    
    this.turn = function (rotspd) {
        this.rot += rotspd;
        this.energy-=Math.abs(rotspd) * activeConsumption / 2;
        if (this.rot >= 360) {
            this.rot -= 360;
        }
        else if (this.rot < 0) {
            this.rot += 360;
        }
    }
    
    this.update = function () {
        this.age += 1/60;
        for (j = 0; j < foods.length; j++) {
            if (dist(this.x, this.y, foods[j].x, foods[j].y) < foods[j].size/2 * worldScale +  (this.energy + 100) * worldScale/20) {
                this.energy += foods[j].size * nutrition;
                foods[j].respawn();                                 //Food eating energy gain
                if (this.energy > this.splitMass) {                              // Splitting behaviour
                    this.stateDecay = 60;
                    this.state = 4;
                }
            }
        }
        
        
        this.energy -= passiveConsumption;
        
        if (this.energy <= 0) {
            if (this == selectedCaalis && menuMode == 0) {
                menuMode = 1;
            }
            caali.splice(i, 1);
            if (i == caali.length && i != 0) {
                i--;
            }
        }
    }
    
    this.split = function () {
        this.child = new Caalis();
        this.child.energy = this.energy / 2;
        this.child.x = this.x;
        this.child.y = this.y;
        this.child.speed = this.speed + random(-0.1, 0.1) * mutationFactor;
        this.child.rotspeed = this.rotspeed + random(-0.1, 0.1) * mutationFactor;
        this.child.eyes[0].offset = this.eyes[0].offset + random(-1, 1) * mutationFactor;
        this.child.eyes[1].offset = this.eyes[1].offset + random(-1, 1) * mutationFactor;
        this.child.eyes[0].rotoffset = this.eyes[0].rotoffset + random(-2,2) * mutationFactor;
        this.child.eyes[1].rotoffset = this.eyes[1].rotoffset + random(-2,2) * mutationFactor;
        this.child.fovs[0].range = this.fovs[0].range + random(-1,1) * mutationFactor;
        this.child.fovs[0].centerAngle = this.fovs[0].centerAngle + random(-1, 1) * mutationFactor;
        this.child.fovs[0].width = this.fovs[0].width + random(-1, 1) * mutationFactor;
        this.child.fovs[1].range = this.fovs[1].range + random(-1,1) * mutationFactor;
        this.child.fovs[1].centerAngle = this.fovs[1].centerAngle + random(-1, 1) * mutationFactor;
        this.child.fovs[1].width = this.fovs[1].width + random(-1, 1) * mutationFactor;
        this.child.fovs[2].range = this.fovs[2].range + random(-1,1) * mutationFactor;
        this.child.fovs[2].centerAngle = this.fovs[2].centerAngle + random(-1, 1) * mutationFactor;
        this.child.fovs[2].width = this.fovs[2].width + random(-1, 1) * mutationFactor;
        this.child.r = Math.max(Math.min(this.r + random(-15,15) * mutationFactor, 255), 0);
        this.child.g = Math.max(Math.min(this.g + random(-15,15) * mutationFactor, 255), 0);
        this.child.b = Math.max(Math.min(this.b + random(-15,15) * mutationFactor, 255), 0);
        this.child.rot = this.rot + 180;
        this.child.randomTurnFactor = this.randomTurnFactor + random(-0.015, 0,015) * mutationFactor;
        this.child.sprintFactor = this.sprintFactor + random(-0.05, 0.05) * mutationFactor;
        this.child.sprintTurnFactor = this.sprintTurnFactor + random(-0.05, 0.05) * mutationFactor;
        this.child.splitMass = this.splitMass + random(-2, 2) * mutationFactor;
        this.child.generation = this.generation + 1;
        caali.push(this.child);
        this.energy /= 2;
    }
}