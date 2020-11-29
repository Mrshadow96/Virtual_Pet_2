class Food{
  constructor(){
   this.foodStock = 15;
   this.lastFed;
   this.image = loadImage("Milk.png");

  }
   updateFoodStock(foodStock){
     this.foodStock = foodStock;
   }
  
   getFedTime(lastFed){
     this.lastFed = lastFed;
   }

   deductFood(){
     if(this.foodStock > 0)(

        this.foodStock = this.foodStock - 1
     )
     return this.foodStock;
   }

   getFoodStock(){
    return this.foodStock;

   }

  display(){

    var x = 60, y = 170;

    imageMode(CENTER);
    image(this.image, 720, 230, 60, 60);

    if(this.foodStock != 0){
      for(var i = 0; i < this.foodStock; i++ ){
        if(i % 10 == 0){
          x = 80;
          y = y + 50; 

        }
        image(this.image, x, y, 50, 50);
        x = x + 30;
        
      }
    }
  }
}