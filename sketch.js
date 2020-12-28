var PLAY=1;
var END=0;
var gameState=PLAY;
var player,playerimg
var player2,player2img
var virus1,virus1img//green
var virus2,virus2img//blue
var virus3,virus3img//red  
var drop,dropimg
var mask,maskimg
var virusesGroup;
var masksGroup;
var gameOver,gameOverimg
var restart,restartimg
var score;
function preload(){
    playerimg=loadImage("images/player1.png");  
    player2img=loadImage("images/player2.png");
    virus1img=loadImage("images/virus1.jpg");
    virus2img=loadImage("images/virus2.png") 
    virus3img=loadImage("images/virus3.jpg");
    dropimg=loadImage("images/drop.png");
    maskimg=loadImage("images/mask.jpg");
    gameOverimg=loadImage("images/gameover.png");
    restartimg=loadImage("images/restart.jpg");
}
function setup(){
createCanvas(1000,500);


    player=createSprite(950,250);
    player.addImage(playerimg); 
    player.scale=0.5;

    
    gameOver=createSprite(500,250);
    gameOver.addImage(gameOverimg);
    gameOver.scale=0.9;
    
    restart=createSprite(500,300);
    restart.addImage(restartimg);
    restart.scale=0.09;

    drop=createSprite(800,250);
    drop.addImage(dropimg);
    drop.scale=0.09;

    gameOver.visible=false;
    restart.visible=false;
   
    virusesGroup= new Group();
    masksGroup= new Group();
   dropsGroup= new Group();
   score=0;
   
    
}



function draw(){
background("black");

  


   
  if(gameState==PLAY){
    score = score + Math.round(getFrameRate()/60);
    if(keyDown(LEFT_ARROW)){ 
        player.x=player.x-2;
        drop.x=drop.x-2;
    }
if(keyDown(RIGHT_ARROW)){
     player.x=player.x+2;
     drop.x=drop.x+2;
}
if(keyDown(UP_ARROW)){
    player.y=player.y-2;
    drop.y=drop.y-2;
}
if(keyDown(DOWN_ARROW)){
    player.y=player.y+2;
    drop.y=drop.y+2;
}
if(keyDown("space")){
drop.velocityX=-5;

}

if (drop.isTouching(virusesGroup)) {
    virusesGroup.destroyEach(); 
  }
if(masksGroup.isTouching(player)){
player.addImage(player2img)

}
if(virusesGroup.isTouching(player)){
    player.addImage(playerimg);
}

if(virusesGroup.isTouching(player)){
    gameState=END;
}

spawnDrops();
spawnMasks();
  spawnViruses();
  } 


else if(gameState==END){
gameOver.visible=true;
restart.visible=true;
virusesGroup.setVelocityXEach(0);
masksGroup.setVelocityYEach(0);
virusesGroup.setLifetimeEach(-1);
masksGroup.setLifetimeEach(-1);
dropsGroup.setVelocityYEach(0);
dropsGroup.setLifetimeEach(-1);
}
if(mousePressedOver(restart)){
reset();
}

drawSprites();
}
function spawnViruses(){
if(frameCount%60==0){
var virus=createSprite(0,200,50,50);
virus.scale=0.3;
virus.velocityX=10;
virus.y=random(50,450);
var rand=Math.round(random(1,3));
if(rand==1){
     virus.addImage(virus1img)
    }
else if(rand==2){
virus.addImage(virus2img)
}
else if (rand==3){
virus.addImage(virus3img)
}

virusesGroup.add(virus);
}
}
 function spawnMasks(){
if(frameCount%60==0){
var mask=createSprite(800,10,50,50);
mask.scale=0.1;
mask.velocityY=5;
mask.x=random(50,900);
mask.addImage(maskimg);


masksGroup.add(mask);
}
 }


function spawnDrops(){
drop=createSprite(850,250);
    drop.addImage(dropimg);
    drop.scale=0.09;

drop.x=player.x;
drop.y=player.y;


}




function reset(){
gameState=PLAY;
gameOver.visible=false;
restart.visible=false;
virusesGroup.destroyEach(0);
masksGroup.destroyEach(0);
}




