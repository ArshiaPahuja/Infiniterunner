var PLAY = 1;
var END = 0;
var gameState = PLAY;

var girl, girl_running;
var ground, invisibleGround, groundImage;


var rocksGroup, rock, rock1, rock2;

var score=0;

var gameOver, restart;


function preload(){
  girl_running =   loadAnimation("girl1.png","girl2.png","girl3.png","girl4.png","girl5.png","girl6.png");
  
  
  groundImage = loadImage("background.png");
  
  
  
  rock = loadImage("rock.png");
  rock1 = loadImage("rock1.png");
  rock2 = loadImage("rock2.png");
  
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  girl = createSprite(50,180,20,50);
  
  girl.addAnimation("running", girl_running);
  girl.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  
  rocksGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    
    girl.changeAnimation("running", girl_running);
    
    if(keyDown("space") && girl.y >= 159) {
      girl.velocityY = -12;
    }
  
    girl.velocityY = girl.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    girl.collide(invisibleGround)
    
    spawnRocks();
  
    if(rocksGroup.isTouching(girl)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    girl.velocityY = 0;
    rocksGroup.setVelocityXEach(0);
    
    
    //change the trex animation
    girl.changeAnimation("collided",girl_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    rocksGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}



function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  rocksGroup.destroyEach();
  
  score = 0;
}

function spawnRocks() {
  if(frameCount % 60 === 0) {
    var rock = createSprite(600,165,10,40);
    //obstacle.debug = true;
    rock.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: rock.addImage(rock);
              break;
      case 2: rock.addImage(rock1);
              break;
      case 3: rock.addImage(rock3);
              break;
    
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    rock.scale = 0.5;
    rock.lifetime = 300;
    //add each obstacle to the group
    rocksGroup.add(rock);
  }
}