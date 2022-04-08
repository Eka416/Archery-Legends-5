class Archer {
    constructor(x, y, width, height) {
      const options = {
        isStatic: true
      };
  
      this.body = Matter.Bodies.rectangle(x, y, width, height, options);
      this.width = width;
      this.height = height;
      this.collapse = false;
      this.image = loadImage("playerArcher.png");
  
      World.add(world, this.body);
  
      Matter.Body.setAngle(this.body, 270); // -90 degree
    }
  
    display() {
      var pos = this.body.position;
      var angle2 = this.body.angle
      push();
      translate(pos.x, pos.y);
      rotate(angle2);
      imageMode(CENTER);
      image(this.image, 0, 0, this.width, this.height);
      pop();
    }
}
  