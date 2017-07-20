function Axon (input_, output_) {
    this.input = input_;
    this.output = output_;
    this.input.outputs.push(this);
    this.output.inputs.push(this);
    this.weight = random(-1, 1);
    
    this.send = function () {
        return this.input.value * this.weight;
    }
}