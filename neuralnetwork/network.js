function Network () {
    this.layers = [];
    this.i;
    this.layers[0] = new Layer(2);
    this.layers[1] = new Layer(3);
    this.layers[2] = new Layer(1);
    
    this.connect = function (layer1, neuron1, layer2, neuron2) {
        var axon = new Axon (this.layers[layer1].neurons[neuron1], this.layers[layer2].neurons[neuron2]);
    }
    
    this.update = function () {
        for (this.i = 1; this.i < this.layers.length; this.i++) {
            this.layers[this.i].update();
        }
    }
    
    this.input = function () {
        for (this.i = 0; this.i < valuesIn.length; this.i++) {
            this.layers[0].neurons[this.i].value = valuesIn[this.i];
//            console.log("Inputted: " + valuesIn[this.i]);
        }
    }
    
    this.output = function () {
        var output = [];
        for (this.i = 0; this.i < this.layers[2].neuronCount; this.i++) {
            output[this.i] = this.layers[2].neurons[this.i].value;
        }
        return output;
    }
    
    this.teach = function (error) {
        this.changeFactor = changeFactor * error;
        for (this.i = 0; this.i < this.layers.length; this.i++) {
            this.layers[this.i].teach(this.changeFactor);
        }
    }
}

function Layer (neuronCount) {
    this.neurons = [];
    this.neuronCount = neuronCount;
    this.i;
    for(this.i = 0; this.i < this.neuronCount+1; this.i++) {
        this.neurons[this.i] = new Neuron;
    }
    
    this.update = function () {
        for(this.i = 0; this.i < this.neuronCount; this.i++) {
            this.neurons[this.i].calculate();
        }
        this.neurons[this.neuronCount].value = 1;
    }
    
    this.teach = function (cF) {
        for (this.i = 0; this.i < this.neurons.length; this.i++) {
            for (var kaqs = 0; kaqs < this.neurons[this.i].outputs.length; kaqs++) {
                this.neurons[this.i].outputs[kaqs].weight += random(-cF, cF);
                this.neurons[this.i].outputs[kaqs].weight = Math.max(-1, Math.min(this.neurons[this.i].outputs[kaqs].weight, 1));
            }
        }
    }
}