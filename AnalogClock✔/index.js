setInterval(function(){
    let date=new Date();
    let hour=date.getHours();
    let minute=date.getMinutes();
    let second=date.getSeconds();

    let hourR=30*hour+0.5*minute+(0.5/60)*second;
    let minuteR=6*minute+0.1*second;
    let secondR=6*second;



    let hands=document.querySelectorAll('div');
    hands[1].style.transform=`rotate(${hourR}deg)`;
    hands[2].style.transform=`rotate(${minuteR}deg)`;
    hands[3].style.transform=`rotate(${secondR}deg)`;
},1000)
