function Ant (brain) {
    this.x = 51;
    this.y = 50;
    this.fitness = 0;
    this.nest = nest;
    this.direction = 0; // 0-> 1^ 2<- 3 down
    this.brain;
    this.foodCarried = 0;
    this.waterCarried = 0;
    this.waterDelivered = 0;
    this.foodDelivered = 0;
    //Check if copy of another ant
    this.brain = brain;
    if(this.brain instanceof NeuralNetwork) {
        this.brain = this.brain.copy(); //We are a copy
        this.brain.mutate();
    }
    else {
        this.brain = new NeuralNetwork(7,20,5);  //INPUTS// 0 t1R, 1 t1G, 2 t1B, 3 t2R, 4 t2G, 5 t2B, 6 t3R, 7 t3G, 8 t3B, 9 nestX, 10 nestY
        // 11 food carried, 12 water carried
    }
    
    this.copy = function() {
        return new Ant(this.brain);
    }
    
    this.think = function () {
        var inputs = new Array();
//        if(this.direction == 0) { //RIGHT
//            var x = this.x;
//            var y = this.y;
//            inputs[0] = map(world[x+1][y-1][0],0,255,0,1); //RED of TILE 1
//            inputs[1] = map(world[x+1][y-1][1],0,255,0,1); //GREEN of TILE 1
//            inputs[2] = map(world[x+1][y-1][2],0,255,0,1); //BLUE of TILE 1
//            
//            inputs[3] = map(world[x+1][y][0],0,255,0,1); //RED of TILE 2
//            inputs[4] = map(world[x+1][y][1],0,255,0,1); //GREEN of TILE 2
//            inputs[5] = map(world[x+1][y][2],0,255,0,1); //BLUE of TILE 2
//            
//            inputs[6] = map(world[x+1][y+1][0],0,255,0,1); //RED of TILE 3
//            inputs[7] = map(world[x+1][y+1][1],0,255,0,1); //GREEN of TILE 3
//            inputs[8] = map(world[x+1][y+1][2],0,255,0,1); //BLUE of TILE 3
//        }
//        
//        if(this.direction == 1) { //UP
//            inputs[0] = map(world[x-1][y-1][0],0,255,0,1); //RED of TILE 1
//            inputs[1] = map(world[x-1][y-1][1],0,255,0,1); //GREEN of TILE 1
//            inputs[2] = map(world[x-1][y-1][2],0,255,0,1); //BLUE of TILE 1
//            
//            inputs[3] = map(world[x][y-1][0],0,255,0,1); //RED of TILE 2
//            inputs[4] = map(world[x][y-1][1],0,255,0,1); //GREEN of TILE 2
//            inputs[5] = map(world[x][y-1][2],0,255,0,1); //BLUE of TILE 2
//            
//            inputs[6] = map(world[x+1][y-1][0],0,255,0,1); //RED of TILE 3
//            inputs[7] = map(world[x+1][y-1][1],0,255,0,1); //GREEN of TILE 3
//            inputs[8] = map(world[x+1][y-1][2],0,255,0,1); //BLUE of TILE 3
//        }
//        
//        if(this.direction == 2) { //LEFT
//            inputs[0] = map(world[x-1][y-1][0],0,255,0,1); //RED of TILE 1
//            inputs[1] = map(world[x-1][y-1][1],0,255,0,1); //GREEN of TILE 1
//            inputs[2] = map(world[x-1][y-1][2],0,255,0,1); //BLUE of TILE 1
//            
//            inputs[3] = map(world[x-1][y][0],0,255,0,1); //RED of TILE 2
//            inputs[4] = map(world[x-1][y][1],0,255,0,1); //GREEN of TILE 2
//            inputs[5] = map(world[x-1][y][2],0,255,0,1); //BLUE of TILE 2
//            
//            inputs[6] = map(world[x-1][y+1][0],0,255,0,1); //RED of TILE 3
//            inputs[7] = map(world[x-1][y+1][1],0,255,0,1); //GREEN of TILE 3
//            inputs[8] = map(world[x-1][y+1][2],0,255,0,1); //BLUE of TILE 3
//        }
//        
//        if(this.direction == 3) { //DOWN
//            inputs[0] = map(world[x-1][y+1][0],0,255,0,1); //RED of TILE 1
//            inputs[1] = map(world[x-1][y+1][1],0,255,0,1); //GREEN of TILE 1
//            inputs[2] = map(world[x-1][y+1][2],0,255,0,1); //BLUE of TILE 1
//            
//            inputs[3] = map(world[x][y+1][0],0,255,0,1); //RED of TILE 2
//            inputs[4] = map(world[x][y+1][1],0,255,0,1); //GREEN of TILE 2
//            inputs[5] = map(world[x][y+1][2],0,255,0,1); //BLUE of TILE 2
//            
//            inputs[6] = map(world[x+1][y+1][0],0,255,0,1); //RED of TILE 3
//            inputs[7] = map(world[x+1][y+1][1],0,255,0,1); //GREEN of TILE 3
//            inputs[8] = map(world[x+1][y+1][2],0,255,0,1); //BLUE of TILE 3
//        }
        
        inputs[0] = map(this.nest.x - this.x,-width,width,-1,1);
        inputs[1] = map(this.nest.y - this.y,-height,height,-1,1);
        inputs[2] = map(this.foodCarried, 0, 255, 0, 1);
        inputs[3] = map(this.waterCarried, 0, 255, 0, 1);
        inputs[4] = world[this.x][this.y][0];
        inputs[5] = world[this.x][this.y][1];
        inputs[6] = world[this.x][this.y][2];
        var actions = this.brain.query(inputs);
        return actions;
    }
    
    this.update = function() {
        //world[this.x][this.y][0] = 255;
        var actions = this.think();
        var maxAction = Math.max(actions[0], actions[1], actions[2], actions[3], actions[4]);
        if(actions[4] == maxAction){
            //Do action 0 = walk X+
            this.x+=1;
            this.direction = 0;
        }
        else if(actions[1] == maxAction) {
            //Do action 1 = walk Y+
            this.y+=1;
            direction = 3;
        }
        else if(actions[2] == maxAction) {
            //Do action 2 = Walk X-
            this.x-=1;
            direction = 2;
        }
        else if(actions[3] == maxAction) {
            //Do action 2 = Walk Y-
            this.y-=1;
            direction = 1;
        }
        else if(actions[0] == maxAction) {
            //Do action 4 = eat
            if(255-this.foodCarried >= world[this.x][this.y][1]) {
                //Eat completely
                this.foodCarried += world[this.x][this.y][1];
                world[this.x][this.y][1] = 0;
            }
            else {
                world[this.x][this.y][1] -= 255-this.foodCarried;
                this.foodCarried = 255;
            }
            
            if(255-this.waterCarried >= world[this.x][this.y][2]) {
                //Drink completely
                this.waterCarried += world[this.x][this.y][2];
                world[this.x][this.y][2] = 0;
            }
            else {
                world[this.x][this.y][2] -= 255-this.waterCarried;
                this.waterCarried = 255;
            }
        }
        
        if(this.x == this.nest.x && this.y == this.nest.y) {
            this.foodDelivered += this.foodCarried;
            this.foodCarried = 0;
            this.waterDelivered += this.waterCarried;
            this.waterCarried = 0;
        }
        
        //Imprison the deserters
        if(this.x > 99) {
            this.x = 99;
        }
        if(this.x < 0) {
            this.x = 0;
        }
        if(this.y > 99) {
            this.y = 99;
        }
        if(this.y < 0) {
            this.y = 0;
        }
    }
    
    this.show = function () {
        fill(255,this.foodCarried, this.waterCarried);
        ellipse((this.x+0.5)*tileSize, (this.y+0.5)*tileSize, tileSize, tileSize);
    }
    
    this.calculateFitness = function () {
        var fitness = this.waterCarried*0.4 + this.foodCarried*0.4 + this.waterDelivered + this.foodDelivered;
        this.fitness = fitness;
    }
}