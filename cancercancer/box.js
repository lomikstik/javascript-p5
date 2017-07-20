function Box(x, y, w, h) {
    this.body = Bodies.rectangle(x, y, w, h);
    World.add(world, this.body);
    this.draw = function () {
        quad(this.body.vertices[0].x,
            this.body.vertices[0].y,
            this.body.vertices[1].x,
            this.body.vertices[1].y,
            this.body.vertices[2].x,
            this.body.vertices[2].y,
            this.body.vertices[3].x,
            this.body.vertices[3].y);
    }
}