
class Ninja {
    constructor(name, health, speed, strength){
        this.name = name
        this.health = health
        this.speed = speed
        this.strength = strength
    }
    drinkSake(){
        this.health += 10;   
        console.log(this.health)
    }
    
}

class Sensei extends Ninja {
    constructor(wisdom){
        super("superSensei", 200, 10, 10)
        this.wisdom = 10;
       }
        speakWisdom(){
        super.drinkSake()
        console.log("What one programmer can do in one month, two programmers can do in two months.")
    }
}

const superSensei = new Sensei()
console.log(superSensei);
superSensei.speakWisdom()
