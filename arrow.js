class Arrow {
    constructor(x, y, width, height, archerAngle) {
      this.isRemoved = false
      var options = {
        restitution: 0.8,
        friction: 1.0,
        density: 1.0,
        isStatic: true
      };
      this.width = width;
      this.height = height;
      this.body = Bodies.rectangle(x, y, this.width, this.height, options);
      this.image = loadImage("arrow.png");
      this.trajectory = [];
      this.isRemoved = false;
      this.archerAngle = archerAngle;
      this.velocity = p5.Vector.fromAngle(archerAngle);
      World.add(world, this.body);
    }
  
   
  
    shoot(archerAngle) {
      var shootAngle = archerAngle/50 + 1
      this.velocity = p5.Vector.fromAngle(shootAngle);
      this.velocity.mult(25);
      swoosh.play()
  
      Matter.Body.setVelocity(this.body, {
        x: this.velocity.x,
        y: this.velocity.y
      });
  
      Matter.Body.setStatic(this.body, false);
    }
  
    display() {
      var tmpAngle;
      if (this.body.velocity.y === 0) {
        tmpAngle = this.archerAngle + 90

      } else {
        tmpAngle = Math.atan(this.body.velocity.y / this.body.velocity.x);
      }
      Matter.Body.setAngle(this.body, tmpAngle);
  
      var pos = this.body.position;
      var angle = this.body.angle;
  
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.image, 0, 0, this.width, this.height);
      pop();
  
      if (this.body.velocity.x > 0 && this.body.position.x > 0) {
        var position = [this.body.position.x, this.body.position.y];
        this.trajectory.push(position);
      }
      if (this.body.position.x + 40 >= inner.x
        && this.body.position.x + 40 < inner.x + outer.r/2
        && this.body.position.y > outer.y - outer.r/2 + sizeT
        && this.body.position.y < outer.y + outer.r/2 - sizeT) {
        Matter.Body.setStatic(this.body, true);
        hit = true
      }
      if (innerHit == true) {
        Matter.Body.setStatic(this.body, true);
        hit = true
      }
  
      for (var i = 0; i < this.trajectory.length; i++) {
        fill("white");

        if (this.body.position.x + 40 > outer.x - outer.r/2
          && this.body.position.x + 40 < outer.x + outer.r/2
          && this.body.position.y > outer.y - outer.r/2 + sizeT
          && this.body.position.y < outer.y + outer.r/2 - sizeT) {
            outerHit = true
            oHit = true
            if (shots == 4 && finalO == false){
              finalO = true
              if (oHit){  
                oHit = false
                score = score + 25
              }
            }
        }

        if (this.body.position.x + 40 > middle.x - middle.r/2
          && this.body.position.x + 40 < middle.x + middle.r/2
          && this.body.position.y > middle.y - middle.r/2 + 0.75 * sizeT
          && this.body.position.y < middle.y + middle.r/2 - 0.75 * sizeT) {
                middleHit = true
                mHit = true
                if (shots == 4 && finalM == false){
                  finalM = true
                  if (mHit){  
                    mHit = false
                    score = score + 25
                  }
                }
              
        }

        if (this.body.position.x + 40 > inner.x - inner.r/2
            && this.body.position.x + 40 < inner.x + inner.r/2
            && this.body.position.y > inner.y - inner.r/2 + (sizeT/2)
            && this.body.position.y < inner.y + inner.r/2 - (sizeT/2)) {
                innerHit = true
                iHit = true
                if (!staticion) {
                  additionn++
                  if (level == 1 || level == 2) {
                    setTimeout(() => {
                      Matter.Body.setStatic(this.body, true);
                      hit = true
                      staticion = true
                    }, width/10);
                  }
                  else {
                    Matter.Body.setStatic(this.body, true);
                    hit = true
                    staticion = true
                  }
                }

                if (shots == 4 && finalI == false){
                  
                  finalI = true
                  if (oHit){  
                    oHit = false
                    score = score + 50
                  }
                }
                
        }
        if (!hit) {
          ellipse(this.trajectory[i][0], this.trajectory[i][1], 5, 5);
        }
      }
    }
    remove(index,arrows) {
        this.speed = 0.05;
        this.width = 300;
        this.height = 300;
        Matter.World.remove(world, arrows[index].body);
        arrows.splice(index, 1);
        staticion = false
        if (oHit){  
            oHit = false
            score = score + 25
          }
          if (mHit) {
            mHit = false
            score = score + 25
          }
          if (iHit) {
            iHit = false
            score = score + 50
          }
          if (shots == 4) {
              finalO = true
          }

    }
  
  }
  