let totalPresses = 0;
let correctPresses = 0;
let totalReactionTime = 0;
let directions = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
let currentDirection = '';
let gameActive = false;
let countdownTimer = 20;
let countdownInterval;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
document.getElementById('start').addEventListener('click', startGame);
document.getElementById('stop').addEventListener('click', stopGame);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        startGame();
    } else if (event.key === 'Backspace') {
        stopGame();
    }
});

function startGame() {
    totalPresses = 0;
    correctPresses = 0;
    totalReactionTime = 0;
    gameActive = true;
    countdownTimer = 20;

    updateScore();
    nextDirection();

    countdownInterval = setInterval(() => {
        countdownTimer--;
        document.getElementById('timer').textContent =countdownTimer;
        if (countdownTimer <= 0) {
            stopGame();
        }
    }, 1000);
}

function stopGame() {
    gameActive = false;
    clearInterval(countdownInterval);
    updateScore();
}

let reactionTime = 0;

function nextDirection() {
    if (!gameActive) return;

    currentDirection = directions[Math.floor(Math.random() * directions.length)];
    reactionTime = Date.now();
    document.getElementById('dph').textContent = currentDirection;
}

document.addEventListener('keydown', async (event) => {
    if (!gameActive) return;

    let userKey = '';
    if (event.key === 'ArrowUp') userKey = 'UP';
    else if (event.key === 'ArrowDown') userKey = 'DOWN';
    else if (event.key === 'ArrowLeft') userKey = 'LEFT';
    else if (event.key === 'ArrowRight') userKey = 'RIGHT';

    if (userKey) {
        totalPresses++;
        if (userKey === currentDirection) {
            correctPresses++;
            document.getElementById(userKey).style.backgroundColor = "green";
            totalReactionTime += Date.now() - reactionTime;
        } else {
            document.getElementById(userKey).style.backgroundColor = "red";
        }

        await sleep(200);
        ColorBack(userKey);
        nextDirection();
    }
});

function ColorBack(key) {
    document.getElementById(key).style.backgroundColor = '';
}

function updateScore() {
    if (totalPresses > 0) {
        const averageReactionTime = (totalReactionTime / correctPresses).toFixed(3);
        document.getElementById('dph').textContent = `Helyes: ${correctPresses}/${totalPresses}, Átlagos reakcióidő: ${averageReactionTime} ms`;
    } else {
        document.getElementById('dph').textContent = `Helyes: ${correctPresses}/${totalPresses}`;
    }
}