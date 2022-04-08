const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var playerImg, bgImg, player, archer, arrow, archerImg, inner, middle, outer
var arrowImg, button1,play, playImg, help, back, backImg, helpImg
var continu, retryd, continueImg, retryImg, swoosh, popp, up, down, shooot
var counter = 0
var count = 0
var gameState = "waiting"
let world
let engine
var arrows = []
var shots = 0
var done = false
var score = 0
var countedShots = 0
var level = 1
var sizeT = 15
var staticion = false
var additionn = 0


var movementDirection = false
var size = false
var beginning = false
var hit = false
var oHit = false
var mHit = false
var iHit = false

var finalI = false
var finalM = false
var finalO = false

var outerHit = false
var middleHit = false
var innerHit = false


function preload() {
  bgImg = loadImage("Sky.jpg")
  playerImg = loadImage("player.png")
  arrowImg = loadImage("arrow.png")
  archerImg = loadImage("playerArcher.png")
  playImg = loadImage("play.jpg")
  helpImg = loadImage("help.jfif")
  backImg = loadImage("OIP.jfif")
  retryImg = loadImage("retry.png")
  continueImg = loadImage("continue.png")
  swoosh = loadSound("Swoosh.mp3")
  popp = loadSound("Pop.mp3")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  engine = Engine.create();
  world = engine.world;

  //outer = new Target(width-200,height/3, 150,"red")
  //middle = new Target(width-200, height/3, 100,"grey")
  //inner = new Target(width-200,height/3,50,"red")

  outer = new Target(width-200,2*height/3.25 - 200, 150,"red")
  middle = new Target(width-200, 2*height/3.25 -200, 100,"grey")
  inner = new Target(width-200,2*height/3.25 - 200,50,"red")

  player = createSprite(100,2*height/3.25+50)
  player.addImage(playerImg)
  player.scale = 0.1

  archer = new Archer(200,2*height/3.25,120,120)
  //archer = createSprite(200,height-300)
  //archer.addImage(archerImg)
  //archer.scale = 0.05
  //archer.rotation = 270  
  
  //arrow = new Arrow(200, height-300, 50,10,0)
  //arrow = createSprite(200,height-300)
  //arrow.addImage(arrowImg)
  //arrow.scale = 0.1

  help = createImg("help.jfif")
  help.position(200,height/2 - width/10)
  help.size(width/5,height/5)
  help.mouseClicked(clickedHelp)


  play = createImg("play.jpg")
  play.position(width-200 - width/5,height/2 - width/10)
  play.size(width/5,height/5)
  play.mouseClicked(clickedPlay)

  back = createImg("OIP.jfif")
  back.position(100,100)
  back.size(50,50)
  back.hide()

  retryd = createImg("retry.png")
  retryd.position(width/2 - width/15,height/2)
  retryd.size(width/15,height/15)
  retryd.mouseClicked(retry)
  retryd.hide()

  continu = createImg("continue.png")
  continu.position(width/2 + width/5,height/2)
  continu.size(width/15,height/15)
  continu.mouseClicked(nextLevel)
  continu.hide()

  up = createImg("up.png")
  up.position(250,height-400)
  up.size(width/15,height/15)
  up.mouseClicked(upp)
  up.hide()

  shooot = createImg("shoot.png")
  shooot.position(250,height-300)
  shooot.size(width/15,height/15)
  shooot.mouseClicked(shooting_pressed)
  shooot.hide()
  
  down = createImg("down.png")
  down.position(250,height-200)
  down.size(width/15,height/15)
  down.mouseClicked(downn)
  down.hide()
}

function draw() {
  background(255,255,255);
  Engine.update(engine);
  image(bgImg,0,0,width, height);
  textSize(width/13.6)
  if (touches.length > 0) {
    console.log("touch")
  }
  text("ARCHERY",width/2-250,100)
  if (gameState == "waiting") {
    player.visible = false
    if (counter == 1) {
      console.log(width)
      textSize(width/27.2)
      stroke("green")
      fill("red")
      text(" Obective: Beat the three levels by shooting the target \n Each levels lets you shoot three times \n You need atleast 150 points to move to the next level \n To shoot, click on the red button next to the bow \n To aim, click the up and down buttons \n The outer ring is worth 25 points \n The middle ring is worth 50 points \n The inner ring is worth 100 points",width/13.6,height/3)
    }
  }
  if (gameState == "playing") {
    up.show()
    down.show()
    shooot.show()
    if (level == 3){
      sizeT = 10
    }
    else {
      sizeT = 20
    }
    textSize(50)
    text("Score:" + score,10,70)
    textSize(30)
    text("Outer:" + outerHit,width-160,30)
    text("Middle:" + middleHit,width-160,70)
    text("Inner:" + innerHit,width-160,110)

    outer.display()
    middle.display()
    inner.display()
    archer.display()

    for (var i = 0; i < arrows.length; i++) {
      showArrows(i, arrows);
    }

    if (finalO) {
      if (score < 150) {
        redo()
      }
      if (score >= 150) {
        moveon()
      }
    }
    if (level == 2 || level == 3) {

      if (beginning == false) {
        inner.y  = inner.y +0
        middle.y = middle.y +0
        outer.y = outer.y + 0


        if (outer.y > height - 80) {
        beginning = true
        movementDirection = true
        }
      }
      if (outer.y >= height - 80 || movementDirection) {
        inner.y = inner.y - 3
        middle.y = middle.y - 3
        outer.y = outer.y - 3
        for (var i = 0; i < arrows.length; i++) {
          if (hit == true) {
          arrows[i].body.position.y = arrows[i].body.position.y - 3
          }
        }
        if (outer.y <= 100) {
          movementDirection = false
          inner.y = inner.y + 5
          middle.y = middle.y + 5
          outer.y = outer.y + 5
          for (var i = 0; i < arrows.length; i++) {
            if (hit == true) {
            arrows[i].body.position.y = arrows[i].body.position.y + 5
            }
          }
        }
      }
      if (outer.y <= 100 || !movementDirection) {
        inner.y = inner.y + 3
        middle.y = middle.y + 3
        outer.y = outer.y + 3
        for (var i = 0; i < arrows.length; i++) {
          if (hit == true) {
          arrows[i].body.position.y = arrows[i].body.position.y + 3
          }
        }

        if (outer.y > height - 80) {
          movementDirection = true
          inner.y = inner.y - 5
          middle.y = middle.y - 5
          outer.y = outer.y - 5
          for (var i = 0; i < arrows.length; i++) {
            if (hit == true) {
            arrows[i].body.position.y = arrows[i].body.position.y - 5
            }
          }
        }
      }
      if (level == 3 && !size) {
        size = true
        inner.r = inner.r/2
        middle.r = middle.r/2
        outer.r = outer.r/2
      }

    }
    if (level == 4) {
      gameState = "end"
    }


  }
  if (gameState == "end") {
    continu.hide()
    shooot.hide()
    up.hide()
    shooot.hide()
    down.hide()
    retryd.hide()
    textSize(100)
    text("YOU WIN",width/2-250, height/2)
  }
  drawSprites();
}
function shooting_pressed() {
    if (shots < 3){

      shots++
      outerHit = false    
      middleHit = false
      innerHit = false
      hit = false

      var posX = archer.body.position.x;
      var posY = archer.body.position.y;
      var angle = archer.body.angle;
      shot = true
      for (var i = 0; i < arrows.length; i++) {
        arrows[i].remove(i, arrows)
      }
      var arrow = new Arrow(posX + 75,posY - 75, 100, 10, angle);
      arrow.trajectory = [];
      Matter.Body.setAngle(arrow.body, angle);
      arrows.push(arrow);


      releasedd()
    }
}
function keyPressed() {
  if (keyCode === 32) {
    if (shots < 3){

      shots++
      outerHit = false    
      middleHit = false
      innerHit = false
      hit = false

      var posX = archer.body.position.x;
      var posY = archer.body.position.y;
      var angle = archer.body.angle;
      shot = true
      for (var i = 0; i < arrows.length; i++) {
        arrows[i].remove(i, arrows)
      }
      var arrow = new Arrow(posX + 50,posY - 50, 100, 10, angle);
      arrow.trajectory = [];
      Matter.Body.setAngle(arrow.body, angle);
      arrows.push(arrow);


      releasedd()
    }
  }
}

function releasedd() {
    console.log(shots)
    setTimeout(() => {
      if (shots < 4) {
        if (shots == 3) {
          shots++
        }
        if (arrows.length) {
          var angles = archer.body.angle;
          arrows[arrows.length - 1].shoot(angles);
          archer.body.angle = 270
        }
      }
      touches = []  
    }, 100);

}

function showArrows(index, arrows) {
  arrows[index].display();
  if (
    arrows[index].body.position.x > width ||
    arrows[index].body.position.y > height
  ) {
    if (!arrows[index].isRemoved) {
      arrows[index].remove(index, arrows)
    }
    else {
      arrows[index].trajectory = []
    }
  }

}
function downn() {
  var angle = archer.body.angle;
  if (keyIsDown(DOWN_ARROW) || angle < 300 ) {
    angle += 1;
    Matter.Body.setAngle(archer.body, angle);
  }
}
function upp() {
  var angle = archer.body.angle;
  console.log()

  if (keyIsDown(UP_ARROW) || angle > 220) {
    angle -= 3;
    Matter.Body.setAngle(archer.body, angle);
  }
}

function clickedPlay() {
  gameState = "playing"
  play.hide()
  back.hide()
  help.hide()
  player.visible = true
}
function clickedBack() {
  back.hide()
  help.show()
  play.show()
  counter++
}

function clickedHelp() {
  help.hide()
  back.show()
  play.hide()
  back.scale = 0.2
  counter = 1
  if (counter == 1) {
    text("Obective: Shoot the target and get atleast 150 point \n hi",600,500)
    back.mouseClicked(clickedBack)
  }

}

function redo() {
  retryd.position(width/2 - width/15,height/2)
  retryd.size(width/15,width/15)
  retryd.show()
}

function moveon() {
  continu.show()
  retryd.show()
}

function retry() {
  if (level == 1){
    for (var i = 0; i < arrows.length; i++) {
      arrows[i].remove(i, arrows)
    }
    shots = 0 
    finalO = false
    finalM = false
    finalI = false
    score = 0
    retryd.hide()
    continu.hide()
    archer.body.angle = 270
  }
  else if (level == 2) {
      for (var i = 0; i < arrows.length; i++) {
        arrows[i].remove(i, arrows)
      }
      shots = 0 
      finalO = false
      finalM = false
      finalI = false
      score = 0
      retryd.hide()
      continu.hide()
      archer.body.angle = 270
    }
  else if (level == 3) {
    for (var i = 0; i < arrows.length; i++) {
      arrows[i].remove(i, arrows)
    }
    shots = 0 
    finalO = false
    finalM = false
    finalI = false
    score = 0
    retryd.hide()
    continu.hide()
    archer.body.angle = 270
  }
  else if (level == 4){
    
  }
}

function nextLevel() {
  if (level == 1){
    for (var i = 0; i < arrows.length; i++) {
      arrows[i].remove(i, arrows)
    }
    shots = 0 
    finalO = false
    finalM = false
    finalI = false
    score = 0
    retryd.hide()
    continu.hide()
    archer.body.angle = 270
    level++
  }
  else if (level == 2) {
    for (var i = 0; i < arrows.length; i++) {
      arrows[i].remove(i, arrows)
    }
    shots = 0 
    finalO = false
    finalM = false
    finalI = false
    score = 0
    retryd.hide()
    continu.hide()
    archer.body.angle = 270
    level++
  }
  else if (level == 3) {
    retryd.hide()
    continu.hide()
    archer.body.angle = 270
    level++
  }

}

