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
home.addEventListener("click", function(){updateVideoBackground('background-shortened.mp4')});

brooklyn = document.getElementById('brooklyn');
brooklyn.addEventListener("click", function(){updateVideoBackground('brooklyn.mp4')});

manhattan = document.getElementById('manhattan');
manhattan.addEventListener("click", function(){updateVideoBackground('manhattan.mp4')});

bronx = document.getElementById('bronx');
bronx.addEventListener("click", function(){updateVideoBackground('bronx.mp4')});

queens = document.getElementById('queens');
queens.addEventListener("click", function(){updateVideoBackground('queens.mp4')});

staten = document.getElementById('staten');
staten.addEventListener("click", function(){updateVideoBackground('statenisland.mp4')});
