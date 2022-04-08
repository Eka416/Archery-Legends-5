class Target {
    constructor(x,y,r, color) {
        const options = {
            isStatic: true
          };
        this.color = color
        this.x = x
        this.y = y
        this.r = r
        if (this.color == "grey") {
            this.image = loadImage("imageRemove.png")
        }
        else if (this.color == "red") {
            this.image = loadImage("imageRemove2.png")
        }

    }
    display() {
        push()
        imageMode(CENTER);
        image(this.image, this.x, this.y, this.r, this.r);
        pop()
    }
}