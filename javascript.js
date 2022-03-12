moment().format();


function updateTime() {
    let time = moment().tz("America/New_york").format("h:mm:ss a");
    console.log(time)
    document.querySelector('h2').textContent = time;
    setInterval(updateTime, 1000);
    updateTime;
}
document.onload = updateTime();

function updateVideoBackground(new_source, new_poster) {
    let background = document.querySelector('video');
    background.src = new_source;
    background.poster = new_poster
}
home = document.querySelector('h1');
home.addEventListener("click", function(){updateVideoBackground('background-shortened.mp4', 'background-m.jpeg')});

brooklyn = document.getElementById('brooklyn');
brooklyn.addEventListener("click", function(){updateVideoBackground('brooklyn.mp4', 'background-b.jpeg')});

manhattan = document.getElementById('manhattan');
manhattan.addEventListener("click", function(){updateVideoBackground('manhattan.mp4', 'background-manhattan.jpeg')});

bronx = document.getElementById('bronx');
bronx.addEventListener("click", function(){updateVideoBackground('bronx.mp4', 'background-bronx.jpeg')});

queens = document.getElementById('queens');
queens.addEventListener("click", function(){updateVideoBackground('queens.mp4', 'background-q.jpeg')});

staten = document.getElementById('staten');
staten.addEventListener("click", function(){updateVideoBackground('statenisland.mp4', 'background-staten.jpeg')});
