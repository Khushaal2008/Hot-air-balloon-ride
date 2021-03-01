var AirBalloonImg,AirBalloon,databases,height,backgroundImg

function preload(){
  AirBalloonImg = loadImage("Hot Air Ballon-04.png");
  backgroundImg = loadImage("Hot Air Ballon-01.png")
}

function setup() {
  database = firebase.database()
  createCanvas(1500,700);
 ;
 AirBalloon = createSprite(385,490);
 AirBalloon.addImage(AirBalloonImg)
 AirBalloon.scale = 0.8
 var AirBalloonPosition = database.ref('balloon/height')
 AirBalloonPosition.on("value",readHeight,showError)
}

function draw() {
  background(backgroundImg);  
  textSize(23)
text("Use arrow keys to move the balloon",100,100)


  if(keyDown(LEFT_ARROW)){
    updateHeight(-5,0);
}
else if(keyDown(RIGHT_ARROW)){
    updateHeight(5,0);
    
}
else if(keyDown(UP_ARROW)){
    updateHeight(0,-5);
    AirBalloon.scale= AirBalloon.scale - 0.01
}
else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+5);
    AirBalloon.scale= AirBalloon.scale + 0.01
}

  drawSprites();
}

function updateHeight(x,y){
  database.ref("balloon/height").set({
    'x':height.x +x,
    'y':height.y +y
  })
}

function readHeight(data){
  height = data.val()
AirBalloon.x = height.x
AirBalloon.y = height.y
}

function showError(){
  console.log("error in writing to the database")
}


