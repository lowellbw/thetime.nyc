// Time display using native Intl API
const timeFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
});

const timeDisplay = document.querySelector('h2');

function updateTime() {
    timeDisplay.textContent = timeFormatter.format(new Date());
}

updateTime();
setInterval(updateTime, 1000);

// Video background switching
const video = document.querySelector('video');

const videoSources = {
    home: { src: 'background-shortened.mp4', poster: 'background-m.jpeg' },
    brooklyn: { src: 'brooklyn.mp4', poster: 'background-b.jpeg' },
    manhattan: { src: 'manhattan.mp4', poster: 'background-manhattan.jpeg' },
    bronx: { src: 'bronx.mp4', poster: 'background-bronx.jpeg' },
    queens: { src: 'queens.mp4', poster: 'background-q.jpeg' },
    staten: { src: 'statenisland.mp4', poster: 'background-staten.jpeg' }
};

function switchVideo(location) {
    const { src, poster } = videoSources[location];
    video.poster = poster;
    video.src = src;
}

document.querySelector('h1').addEventListener('click', () => switchVideo('home'));
document.getElementById('brooklyn').addEventListener('click', () => switchVideo('brooklyn'));
document.getElementById('manhattan').addEventListener('click', () => switchVideo('manhattan'));
document.getElementById('bronx').addEventListener('click', () => switchVideo('bronx'));
document.getElementById('queens').addEventListener('click', () => switchVideo('queens'));
document.getElementById('staten').addEventListener('click', () => switchVideo('staten'));

// Interactive grid canvas
const canvas = document.getElementById('grid-canvas');
const ctx = canvas.getContext('2d');

let mouseX = 0;
let mouseY = 0;
let gridCells = [];

const CELL_SIZE = 40;
const INFLUENCE_RADIUS = 150;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initGrid();
}

function initGrid() {
    gridCells = [];
    const cols = Math.ceil(canvas.width / CELL_SIZE) + 1;
    const rows = Math.ceil(canvas.height / CELL_SIZE) + 1;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            gridCells.push({
                x: col * CELL_SIZE,
                y: row * CELL_SIZE,
                baseOpacity: 0.03,
                currentOpacity: 0.03,
                targetOpacity: 0.03
            });
        }
    }
}

function updateGrid() {
    for (const cell of gridCells) {
        const centerX = cell.x + CELL_SIZE / 2;
        const centerY = cell.y + CELL_SIZE / 2;

        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < INFLUENCE_RADIUS) {
            const intensity = 1 - (distance / INFLUENCE_RADIUS);
            cell.targetOpacity = 0.03 + (intensity * 0.4);
        } else {
            cell.targetOpacity = 0.03;
        }

        // Smooth transition
        cell.currentOpacity += (cell.targetOpacity - cell.currentOpacity) * 0.15;
    }
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const cell of gridCells) {
        if (cell.currentOpacity > 0.035) {
            // Calculate color based on position for variety
            const hue = ((cell.x + cell.y) * 0.5) % 60 - 30; // Slight hue variation

            ctx.fillStyle = `hsla(${hue}, 70%, 70%, ${cell.currentOpacity})`;
            ctx.fillRect(cell.x + 1, cell.y + 1, CELL_SIZE - 2, CELL_SIZE - 2);

            // Add glow effect for brighter cells
            if (cell.currentOpacity > 0.15) {
                ctx.shadowColor = `hsla(${hue}, 80%, 60%, 0.5)`;
                ctx.shadowBlur = 10;
                ctx.fillRect(cell.x + 1, cell.y + 1, CELL_SIZE - 2, CELL_SIZE - 2);
                ctx.shadowBlur = 0;
            }
        }
    }

    // Draw subtle grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;

    for (let x = 0; x <= canvas.width; x += CELL_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y <= canvas.height; y += CELL_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function animate() {
    updateGrid();
    drawGrid();
    requestAnimationFrame(animate);
}

// Event listeners
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
    }
});

window.addEventListener('resize', resizeCanvas);

// Initialize
resizeCanvas();
animate();
