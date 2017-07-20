function Menu () {
    
    
    this.draw = function () {
        noStroke();
        fill(0); //Menu background
        rect(800, 0, 200, 600);
        
        fill(30); //Button boxes
        rect(805, 10, 30, 30);
        rect(845, 10, 30, 30);
        rect(885, 10, 30, 30);
        rect(925, 10, 30, 30);
        rect(965, 10, 30, 30);
        
        fill(100); //Button icons
        stroke(200);
        strokeWeight(1);
        rect(810, 15, 20, 20);
        ellipse(860,25,20);
        line(890,35,910,15);
    }
    
    this.clicked = function () {
        if (mouseY > 10 && mouseY < 40) {
            if (mouseX > 805 && mouseX < 835) {
                mode = "rectangle";
            }
            
            if (mouseX > 845 && mouseX < 875) {
                mode = "circle";
            }
            
            if (mouseX > 885 && mouseX < 915) {
                mode = "constraint";
            }
            
            if (mouseX > 925 && mouseX < 955) {
                mode = "drag";
            }
            
            if (mouseX > 965 && mouseX < 995) {
                mode = "select";
            }
        }
        
    }
}