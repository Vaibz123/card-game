
const SUITS=["♥","♦","♠","♣"]
const VALUES=["A","2","3","4","5","6","7","8","9","10","J","Q","K"]


//var map=VALUES.map(value=>VALUES.indexOf(value)+1)
//console.log(map); 

export default class Deck{

    constructor(cards=freshDeck())
    {
        this.cards=cards
    }

    get size(){
        return this.cards.length;
    }

    shuffle(){
        for(let i=this.size-1;i>0;i--){
            let index= Math.floor(Math.random()*(i+1));
            let t=this.cards[i];
            this.cards[i]=this.cards[index];
            this.cards[index]=t;
        }

    }

    pop(){
        return this.cards.shift();   
    }
    push(card){
        return this.cards.push(card);
    }
}

class Card{
    constructor(suit,value){
        this.suit=suit;
        this.value=value;
    }

    get color() {
        return this.suit === "♣" || this.suit === "♠" ? "black" : "red"
      }
    
      getHTML() {
        const cardDiv = document.createElement("div")
        cardDiv.innerText = this.suit
        cardDiv.classList.add("card", this.color)
        cardDiv.dataset.value = `${this.value} ${this.suit}`
        return cardDiv
      }
}
function freshDeck(){
    return SUITS.flatMap( suit =>{
        return VALUES.map(value=>{
            return new Card(suit,value)
        })
    })
}