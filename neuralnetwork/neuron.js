function Neuron () {
    this.inputs = [];
    this.outputs = [];
    this.value = 0;
    this.i;
    
    this.calculate = function () {
        this.value = 0;
        for (this.i = 0; this.i < this.inputs.length; this.i++) {
            this.value += this.inputs[this.i].send();
        }
        this.value = sigmoid(this.value);
//        console.log(this.value);
    }
    
}

function sigmoid(t) {
    return 1/(1+Math.pow(Math.E, -t));
}