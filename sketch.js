//Create variables here
var dognor,happyDog,database,foodS,foodStock;
var dog;
var x;

function preload(){
  //load images here
  dognor=loadImage("dogImg.png");
  happyDog=loadImage("dogImg1.png");
}

function setup() {
  database=firebase.database();

  createCanvas(500,500);
  dog=createSprite(250,400);
  dog.addImage(dognor);
  dog.scale=0.2;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock,showError)

  
}


function draw() {  
background(rgb(46, 139, 87))

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(happyDog);
  }
  
  drawSprites();
  //add styles here
  textSize(30);
  fill("white")
  text("Food Remaining:"+foodS,135,250)

  textSize(20)
  fill("white")
  text("Note:Press up arrow key to feed the dog :)",80,30)

}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
if(x<=0){
  x=0;
}else{
  x=x-1;
}
  database.ref('/').update({
   Food:x
  })
}
function showError(){
  console.log("error ocurred")
}



