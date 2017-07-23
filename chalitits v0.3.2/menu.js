function Menu () {
    this.clicked = function () {
        if (mouseX > 810 && mouseX < 900 && mouseY > 10 && mouseY < 40) {
            menuMode = 1;
            for (i = 0; i < sliders.length; i++) {
                sliders[i].style('visibility', 'hidden');
            }
        }
        else if (mouseX > 900 && mouseX < 990 && mouseY > 10 && mouseY < 40) {
            menuMode = 2;
            for (i = 0; i < sliders.length; i++) {
                sliders[i].style('visibility', 'visible');
            }
        }
    }
    
    this.draw = function () {
        if(menuMode == 0 && drawStuff) {
            fill(255,0);
            stroke(255);
            strokeWeight(3);
            ellipse(selectedCaalis.x, selectedCaalis.y, (selectedCaalis.energy + 100) / 10 + 10);
            noStroke();
            fill(255);
            textSize(12);
            text("Energy: ", 820, 60);
            text(selectedCaalis.energy.toFixed(1) + " / " + selectedCaalis.splitMass.toFixed(1), 900, 60);
            text("Generation: ", 820, 80);
            text(selectedCaalis.generation, 900, 80);
            text("Lifetime: ", 820, 100);
            text(selectedCaalis.age.toFixed(0), 900, 100);
            text("Speed: ", 820, 120);
            text(selectedCaalis.speed.toFixed(2) + " / " + (selectedCaalis.speed * selectedCaalis.sprintFactor).toFixed(2), 900, 120);
        }
        else if (menuMode == 1 && drawStuff) {
            for (i = 0; i < caali.length; i++) {
                fill(caali[i].r, caali[i].g, caali[i].b);
                textSize(12);
                if (i < 27) {
                    text (i + ":  " + Math.round(caali[i].energy*10)/10, 820,60 + i * 20);
                }
                else if (i < 54) {
                    text (i + ":  " + Math.round(caali[i].energy*10)/10, 880,60 + (i%27) * 20);
                }
                else if (i < 81) {
                    text (i + ":  " + Math.round(caali[i].energy*10)/10, 940,60 + (i%27) * 20);
                }
                else{
                    break;
                }
            }
        }
        else if(menuMode == 2) {
            mutationFactor = sliders[0].value();
            nutrition = sliders[1].value();
            timescale = Math.pow(sliders[2].value(), 2);
            foodCount = sliders[3].value() / worldScale / worldScale;
            foodRespawnRate = sliders[4].value() / worldScale / worldScale;
            passiveConsumption = sliders[5].value();
            activeConsumption = sliders[6].value();
            worldScale = 1 - sliders[7].value();

            if(drawStuff) {
                textSize(14);
                noStroke();
                fill(255);

                text("Mutation factor: ", 820, 67);
                text(mutationFactor.toFixed(1), 970, 67);
                text("Nutrition factor: ", 820, 117);
                text(nutrition.toFixed(2), 970, 117);
                text("Timescale: ", 820, 167);
                text(timescale.toFixed(2), 970, 167);
                text("Max food count: ", 820, 227);
                text(foodCount, 970, 227);
                text("Food respawn rate: ", 820, 277);
                text(foodRespawnRate.toFixed(2), 970, 277);
                text("Passive consumption: ", 820, 327);
                text(passiveConsumption.toFixed(4), 970, 327);
                text("Active consumption: ", 820, 377);
                text(activeConsumption.toFixed(3), 970, 377);
                text("World scale: ", 820, 427);
                text(1/worldScale, 970, 427);
            }
        }
        if(drawStuff) {
                for (i = 0; i < caali.length; i++) {
                    fill(0);
                    textSize(8);
                    text (i, caali[i].x-5, caali[i].y+3);
        }
        }
        fill(100);
        if (menuMode == 0 || menuMode == 1) {
            fill(150);
        }
        stroke(20);
        strokeWeight(1);
        rect(810,10,90,30);
        fill(100);
        if (menuMode == 2) {
            fill(150);
        }
        rect(900,10,90,30);
        fill(0);
        noStroke();
        textSize(20);
        text("Caali", 820, 35);
        text("World", 910, 35);
    }
}