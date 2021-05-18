//creating the variables
var gameState = "play";
var alien_blue, alien_green, alien_lblue;
var abi, agi, albi;
var blue_ns, grey_ns, cool_ns;
var bnsi, gnsi, cnsi;
var boy,bg;
var bi, bgi;
var alienGroup;
var alienGroup2;
var alienGroup3;
var invisibleGround;
var nsSound;
var gameOver,gameOverImage,gameOverSound;
var restart, restartImage
var score = 0;

function preload(){
  
//loading the image of the aliens
 abi = loadImage("alien_blue-removebg-preview.png");
 agi = loadImage("alien_green-removebg-preview.png");
 albi = loadImage("light_blue_alien-removebg-preview.png");
  
//loading the image of the ninja stars
 bnsi = loadImage("blue_ninja_star-removebg-preview.png");
 gnsi = loadImage("grey_ninja_star-removebg-preview.png");
 cnsi = loadImage("ninja_star_cool-removebg-preview.png");
  
//loading the image of th boy
 bi = loadImage("boy_scared-removebg-preview.png");
  
//loading the image of background
 bgi = loadImage("scary_night.jfif");
  
//loading the image of gameOver text
 gameOverImage = loadImage("gameover.png");
  
//loading the image of the restart icon
  restartImage = loadImage("restart.png");
  
//loading the sound of the ninja stars when they hit the aliens  
  nsSound = loadSound("knifeSwoosh.mp3");
  
//loading a sound when the game is over
  gameOverSound = loadSound("gameover.mp3");
  
}

function setup(){
  createCanvas(800,500);
  
//creating the background
  bg = createSprite(600,250,1200,500);
  bg.addImage(bgi);
  bg.scale = 3.8;
  bg.velocityX = 2;
  
//creating gameover text
  gameOver = createSprite(400,200,20,20);
  gameOver.addImage(gameOverImage);
  gameOver.shapeColor = ("green");
  
  
//creating the restart icon
  restart = createSprite(400,270,20,20);
  restart.addImage(restartImage);
  restart.scale = 0.7;
  
//creating the blue ninja star
  blue_ns = createSprite(460,40,20,20);
  blue_ns.addImage(bnsi);
  blue_ns.scale = 0.25;
  
//creating the grey ninja star
  grey_ns = createSprite(360,40,20,20);
  grey_ns.addImage(gnsi);
  grey_ns.scale = 0.25;
  
//creating the cool ninja star  
  cool_ns = createSprite(260,40,20,20);
  cool_ns.addImage(cnsi);
  cool_ns.scale = 0.25;
  
//creating the boy  
  boy = createSprite(700,300,20,20);
  boy.addImage(bi);
  boy.scale = 0.5;
  
//creating the invisible ground
  invisibleGround = createSprite(700,460,100,15);
  invisibleGround.visible = false;
  
//creating the groups  
  alienGroup = createGroup();
  alienGroup2 = createGroup();
  alienGroup3 = createGroup();
  
}

function draw(){
//making the background color grey
  background(180);
 
  //making the background sprite infinite
   if(bg.x > 800){
    bg.x = bg.width/2;
  }
  
//adding gameStates to the game
if(gameState === "play"){  

//making the gameover image invisible
  gameOver.visible = false;
  
//making the restart icon invisible
  restart.visible = false;

//making the boy jump when space key is pressed
  if(keyDown("space")){
    boy.velocityY = -4;
  }
  
//adding gravity to the boy
  boy.velocityY = boy.velocityY + 0.8;
  
//making the ninja stars come down when q,w and e are pressed respectively
  if(keyDown("q")){
  cool_ns.velocityY = 10;
}
  
  if(keyDown("w")){
  grey_ns.velocityY = 10;
}
  
  if(keyDown("e")){
  blue_ns.velocityY = 10;
}
  
//making the ninja stars infinite
  if(cool_ns.y>500 || grey_ns.y>500 || blue_ns.y>500){
   cool_ns.y = 40; 
   cool_ns.velocityY = 0;
    
   grey_ns.y = 40; 
   grey_ns.velocityY = 0;
    
   blue_ns.y = 40;
   blue_ns.velocityY = 0;
    
  }
  
//increasing the score, adding the sound of ninja star and destroying the alien groups when the ninja star collides with the alien groups
  if(alienGroup.isTouching(cool_ns)){
    alienGroup.destroyEach();
    score = score+3;
    nsSound.play();
  } 
  
  
  if(alienGroup.isTouching(grey_ns)){
    alienGroup.destroyEach();
    score = score+2;
     nsSound.play();
  }
  
  if(alienGroup.isTouching(blue_ns)){
     alienGroup.destroyEach();
     score = score+1;
     nsSound.play();
   }
   
   
  if(alienGroup2.isTouching(cool_ns)){
    alienGroup2.destroyEach();
    score = score+4;
     nsSound.play();
  } 
   
  if(alienGroup2.isTouching(grey_ns)){
    alienGroup2.destroyEach();
    score = score+3;
     nsSound.play();
  }

  if(alienGroup2.isTouching(blue_ns)){
    alienGroup2.destroyEach();
    score = score+2;
     nsSound.play();
  }
  
   if(alienGroup3.isTouching(cool_ns)){
    alienGroup3.destroyEach();
    score = score+10;
      nsSound.play();
  } 
  
  if(alienGroup3.isTouching(grey_ns)){
    alienGroup3.destroyEach();
    score = score+10;
     nsSound.play();
  } 
  
  if(alienGroup3.isTouching(blue_ns)){
    alienGroup3.destroyEach();
    score = score+8;
     nsSound.play();
  }
  
//changing the gamestate to end when the alien group collides with the boy 
  if(alienGroup.isTouching(boy) || alienGroup2.isTouching(boy) || alienGroup3.isTouching(boy)){
    gameState = 'end';
    gameOverSound.play();
  }
  
//calling the alien functions
  alien_green();
  
  alien_blue();
  
//mking the light blue alien spawn when the scores reaches to 150
  if(score === 150){
    alien_lblue();
  }
 
//making the boy collide with the invisible ground
  boy.collide(invisibleGround)
  
}if(gameState === 'end'){
  
//making the gameover image visible
  gameOver.visible = true;
  
//making the restart icon visible
  restart.visible = true;
  
//destroying object when the game is over
  boy.visible = false;
  cool_ns.visible = false;
  blue_ns.visible = false;
  grey_ns.visible = false;
  alienGroup.destroyEach();
  alienGroup2.destroyEach();
  alienGroup3.destroyEach();
  
  if(mousePressedOver(restart)){
    reset();
  }
  
  bg.velocityX = 0
}
  
//drawing the sprites
  drawSprites();
  
//creating the text
  fill("white");
  textSize(17)
   text("Score: " +score,width-150,40);
}

//creating a reset function
function reset(){
  gameState = "play";
  gameOver.visibile = false;
 restart.visible = false;
  boy.visible = true;
  cool_ns.visible = true;
  blue_ns.visible = true;
  grey_ns.visible = true;
  bg.velocityX = 2
  score = 0
}

//creating the green alien
function alien_green(){
  if(frameCount % Math.round(random(80,120)) === 0){
  var alien_green = createSprite(100,380,20,20);
  alien_green.addImage(agi);
  alien_green.scale = 0.5;
  alien_green.velocityX = (4 + score/25);
  alienGroup.add(alien_green);
  }
}

//creating the blue alien
function alien_blue(){
  if(frameCount % 1000 === 0){
  var alien_blue = createSprite(100,480,20,20);
  alien_blue.addImage(abi);
  alien_blue.scale = 0.2;
  alien_blue.velocityX = (6 + score/25);
    alienGroup2.add(alien_blue);
  
  }
}

//creating the light blue alien
function alien_lblue(){
  var alien_lblue = createSprite(100,230,20,20);
  alien_lblue.addImage(albi);
  alien_lblue.scale = 0.8;
  alien_lblue.velocityX = 4;
  alienGroup3.add(alien_lblue);
  
}