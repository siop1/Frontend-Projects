let cardData=[];
for(var i=1;i<=18;i++){
    cardData.push(i);
    cardData.push(i);
}
function reset(){
cardData.sort(cardShuffler);
console.log(cardData);
function cardShuffler(){
    // return Math.random()> .5? 2:-1;
    return Math.random()-Math.random();
}
for(let i=0;i<36;i++){
    document.querySelectorAll('.cards')[i].innerText=cardData[i];
}
}

// creating cards
var noOfCards=36
for(let i=1;i<=noOfCards;i++){
    let cards=document.createElement('div');
    cards.className="cards";
    document.getElementById('container-grid').appendChild(cards)
    
}
reset();
// initial display none cards
for(let i=0;i<36;i++){
    // document.querySelectorAll('.cards')[i].style.color='transparent';
}


