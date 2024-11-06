let totalPresses = 0;
let correctPresses = 0;
let directions = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
let currentDirection = '';
let gameActive = false;

document.getElementById('start').addEventListener('click', startGame);
document.getElementById('stop').addEventListener('click', stopGame);

function startGame() {
    totalPresses = 0;
    correctPresses = 0;
    gameActive = true;
    updateScore();
    nextDirection();
}

function stopGame() {
    gameActive = false;
    updateScore();
}

function nextDirection() {
    if (!gameActive) return;

    currentDirection = directions[Math.floor(Math.random() * directions.length)];
    document.getElementById('dph').textContent = currentDirection;
}

document.addEventListener('keydown', (event) => {
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
        }
        else{
            document.getElementById(userKey).style.backgroundColor = "red";
        }
        setTimeout(nextDirection, 10);        
    }
});

function updateScore() {
    document.getElementById('dph').textContent = `Összes: ${totalPresses}, Helyes: ${correctPresses}`;
}