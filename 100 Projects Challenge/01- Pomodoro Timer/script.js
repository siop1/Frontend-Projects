// Elements
const startBtnElem=document.getElementById('start-btn');
const stopBtnElem=document.getElementById('stop-btn');
const resetBtnElem=document.getElementById('reset-btn');
const timerCountdownElem=document.getElementById('timer-countdown');

let interval=null;
let timeLeft=1500;
function updateTimer(){
    let minutes=Math.floor(timeLeft/60);
    let seconds=timeLeft%60;
    let formattedTime=`${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;
    timerCountdownElem.innerHTML=formattedTime;
}

function startTimer(){
    if(interval!==null) 
        return;
    interval=setInterval(() => {
        timeLeft--;
        updateTimer();
        if(timeLeft===0){
            alert("Time is up");
            timeLeft=1500;
        }
    }, 1000);
}

function stopTimer(){
    clearInterval(interval);
    interval=null;
}

function resetTimer(){
    clearInterval(interval);
    interval=null;
    timeLeft=1500;
    updateTimer();

}
startBtnElem.addEventListener('click',startTimer);
stopBtnElem.addEventListener('click',stopTimer);
resetBtnElem.addEventListener('click',resetTimer);