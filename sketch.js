//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImg, happyDogImg, gardenImg;
var lastFed, fedTime;
var foodObj;
var player;

var gameState = "start";
var gameState = "play";

function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
  gardenImg = loadImage("garden1.cms");

}

function setup() {
	createCanvas(900, 500);
  
  database = firebase.database();
  console.log(database);

  foodStock = database.ref('Food');
  foodStock.on('value',readStock);
  foodStock.set(20);

  foodObj = new Food();
  
  dog = createSprite(780,220,70,70);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  feed = createButton("FEED THE DOG");
  feed.position(700, 140);
  feed.mousePressed(feedDog);

  addFood = createButton("ADD FOOD")
  addFood.position(830, 140);
  addFood.mousePressed(addFoods);

  input = createInput("Pet's Name");
  input.position(displayWidth/2 - 30 , displayHeight/2 - 80);
  name = input.value();
  
  button = createButton('Confirm');
  button.position(displayWidth/2 + 15, displayHeight/2);
  button.mousePressed(CreateGreetings);
    
    }

function draw() {  
    // background(46, 139, 87);
    background(gardenImg);
  
    fedTime = database.ref('FeedTime');
    fedTime.on('value',(data)=>{
    lastFed = data.val();
    })
  
  fill("white");
  stroke("white");
  textSize(20);
  if(lastFed >= 12){
  text("Last Feed : " + lastFed % 12 + " " + "PM", 380, 70);
  }else if(lastFed === 0){
    text("Last Feed : 12 AM"+ lastFed, 380, 70);
  }else{
    text("Last Feed : "+ lastFed + " " + "AM", 380, 70);
  
  }
    foodObj.display();
    drawSprites();
    
  }
  
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
dog.addImage(happyDogImg);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food : foodObj.getFoodStock(),
  FeedTime : hour()
    
})
}

function addFoods(){
  foodS++;
  database.ref('/').update({
  Food : foodS
  })
}

function CreateGreetings(){
  input.hide();
  button.hide();
  greeting = createElement('h2');
  greeting.html("Pet's Name : " + name)
  greeting.position(displayWidth/2 - 70, displayHeight/2);
}