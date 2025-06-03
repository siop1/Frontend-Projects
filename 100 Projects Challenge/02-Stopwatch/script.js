const timerCountdownElem = document.getElementById("timer-countdown");
const startButtonElem = document.getElementById("start-btn");
const stopButtonElem = document.getElementById("stop-btn");
const resetButtonElem = document.getElementById("reset-btn");
const lapButtonElem = document.getElementById("lap-btn");
const lapContainerElem = document.getElementById("lap-container");
const lapClearButtonElem = document.getElementById("lap-clear-btn");

let lapTimerCounter=1;
let interval = null;
let currentTime = 0;
function updateTimer() {
    let hours = Math.floor(currentTime / 3600);
    let minutes = Math.floor((currentTime - hours * 3600) / 60);
    let seconds = currentTime % 60;
    let formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    timerCountdownElem.innerHTML = formattedTime;
}

function startTimer() {
    if (interval != null)
        return;
    interval = setInterval(() => {
        currentTime++;
        updateTimer();
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
    interval = null;
}

function resetTimer() {
    clearInterval(interval);
    interval = null;
    currentTime = 0;
    updateTimer();
}

function lapTimer(){
    if(interval==null)
        return;
    let lapTimerChildElem=document.createElement('h3');
    lapTimerChildElem.innerHTML=`${lapTimerCounter.toString().padStart(2,"0")}--${timerCountdownElem.innerHTML}`;
    lapContainerElem.prepend(lapTimerChildElem);
    lapTimerCounter++;
}

function lapClear(){
    lapContainerElem.innerHTML="";
    lapTimerCounter=1;
}
startButtonElem.addEventListener('click', startTimer)
stopButtonElem.addEventListener('click', stopTimer)
resetButtonElem.addEventListener('click', resetTimer)
lapButtonElem.addEventListener('click', lapTimer)
lapClearButtonElem.addEventListener('click', lapClear)