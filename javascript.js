moment().format();


function updateTime() {
    let time = moment().tz("America/New_york").format("h:mm:ss a");
    document.querySelector('h2').textContent = time;
    setInterval(updateTime, 1000);
    updateTime;
}
function initializeTime(){
    const clock = document.createElement('h2');
    const element = document.getElementById("the-time");
    element.appendChild(clock);
    updateTime();
    button.remove();

}


button = document.querySelector('button');
button.onclick = function(){
    button.classList.toggle('fade');
    setTimeout(initializeTime, 800);
}
