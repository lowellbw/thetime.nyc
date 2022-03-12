moment().format();


function updateTime() {
    let time = moment().tz("America/New_york").format("h:mm:ss a");
    console.log(time)
    document.querySelector('h2').textContent = time;
    setInterval(updateTime, 1000);
    updateTime;
}
document.onload = updateTime();

function updateVideoBackground(new_source) {
    let background = document.querySelector('video');
    background.src = new_source;
}
home = document.querySelector('h1');
home.addEventListener("click", function(){updateVideoBackground('nyc-background-lowquality.mp4')});

brooklyn = document.getElementById('brooklyn');
brooklyn.addEventListener("click", function(){updateVideoBackground('boat-in-brooklyn.mov')});

manhattan = document.getElementById('manhattan');
manhattan.addEventListener("click", function(){updateVideoBackground('manhattan.mp4')});
