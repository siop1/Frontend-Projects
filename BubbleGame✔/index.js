let bubbles="";
let timerElem=document.querySelector('#timer');
let bubbleContainerElem=document.querySelector('#bubbleContainer');
let hitElem=document.querySelector('#hit');
let scoreElem=document.querySelector('#score');

function bubbleCreator(){
    for(let i=0;i<144;i++){
        let randomNum=Math.floor(Math.random()*10);
        bubbles+=`<div class="bubble">${randomNum}</div>`;
    }
    bubbleContainerElem.innerHTML=bubbles;
    bubbles="";
}
let timer=60;
function timerStart(){
    timerElem.textContent=timer;
    let timerChanger=setInterval(()=>{
        if(timer>0){
            timer--;
            timerElem.textContent=timer;
        }
        else{
            clearInterval(timerChanger);
            bubbleContainerElem.innerHTML=`<h1>Game Over</h1>`;
            bubbleContainerElem.style.alignItems='center';
            bubbleContainerElem.style.justifyContent='center';
        }
    },1000)
}

function hitToHit(){
    let randomNum=Math.floor(Math.random()*10);
    hitElem.textContent=randomNum;
}

function scoreCounter(){
    bubbleContainerElem.addEventListener('click',(details)=>{
        if(details.target.textContent==hitElem.textContent){
            console.log('match')
            score=Number(scoreElem.textContent);
            score+=10;
            scoreElem.textContent=score;
            hitToHit();
            bubbleCreator();

        }
            
    });
}

timerStart();
hitToHit();
scoreCounter()
bubbleCreator();

