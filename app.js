import Deck from "./deck.js";
const card_map={"2":2,
"3":3,
"4":4,
"5":5,
"6":6,
"7":7,
"8":8,
"9":9,
"10":10,
"J":11,
"Q":12,
"K":13,
"A":14};
const computer=document.querySelector('.computer');
const player=document.querySelector('.player');
const text=document.querySelector('.text');
const computerDeckElement=document.querySelector('.computer-deck');
const playerDeckElement=document.querySelector('.player-deck');

let playerDeck,computerDeck,inRound,stop

document.addEventListener('click',()=>{
    if(stop){
        cleanBeforeRound();
        return;
    }
    if(inRound)
        cleanBeforeRound();
    else
        flipCard();
})

startGame()

function startGame(){
    const deck=new Deck();
    deck.shuffle();

    const mid= Math.ceil(deck.size/2);
    playerDeck= new Deck(deck.cards.slice(0,mid));
    computerDeck= new Deck(deck.cards.slice(mid,deck.size));

    cleanBeforeRound();
}

function cleanBeforeRound(){
    inRound=false;
    text.innerText="";
    computer.innerHTML="";
    player.innerHTML="";

    updateDeckCount();
}

function updateDeckCount(){
    playerDeckElement.innerHTML=playerDeck.size;
    computerDeckElement.innerHTML=computerDeck.size;
}

function flipCard(){
    inRound=true;
    const playerCard= playerDeck.pop();
    const computerCard= computerDeck.pop();

    player.appendChild(playerCard.getHTML());
    computer.appendChild(computerCard.getHTML());
    updateDeckCount();

    if(isRoundWinner(playerCard,computerCard)){
        text.innerText="You won this round!!!";
        playerDeck.push(playerCard);
        playerDeck.push(computerCard);
    }
    else if(isRoundWinner(computerCard,playerCard)){
        text.innerText="You lost the round";
        computerDeck.push(playerCard);
        computerDeck.push(computerCard);
    }
    else{
        text.innerText="Draw";
        playerDeck.push(playerCard);
        computerDeck.push(computerCard);
    }
    if(count(computerDeck))
    {
        text.innerText="You win!!!"; 
        stop=true;
    }
    
    if(count(playerDeck)){
        text.innerText="You lose!!"; 
        stop=true;
    }
}

function isRoundWinner(card1,card2){
    return card_map[card1.value]>card_map[card2.value]
}
function count(deck){
    return deck.size===0;
}

//computer.appendChild(deck.cards[0].getHTML());

//console.log(deck.cards);