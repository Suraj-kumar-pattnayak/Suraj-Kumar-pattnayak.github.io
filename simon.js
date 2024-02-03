document.addEventListener('DOMContentLoaded', function() {
    const colors = ['green', 'red', 'yellow', 'blue'];
    let simonSequence = [];
    let userSequence = [];
    let level = 1;
    let gameStarted = false;

    const buttons = document.querySelectorAll('.simon-button');
    const startButton = document.getElementById('start-btn');
    const restartButton = document.getElementById('restart-btn');
    const scoreMessage = document.getElementById('score-message');

    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', restartGame);

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (!gameStarted) {
                return; // Ignore button clicks if the game hasn't started
            }
            const clickedColor = button.id;
            lightUpButton(clickedColor);
            userSequence.push(clickedColor);
            checkUserSequence();
        });
    });

    function startGame() {
        if (!gameStarted) {
            level = 1;
            simonSequence.length = 0;
            userSequence.length = 0;
            gameStarted = true;
            nextTurn();
        }
    }

    function nextTurn() {
        updateLevelDisplay();
        generateSimonSequence(level);
        playSimonSequence();
        // if(restartGame()) { startButton.innerText = "Start Game";};
    }
    function nxt()
    {  
        updateLevelDisplay();
        generateSimonSequence(level);
        playSimonSequence();
        startButton.innerText = "Start Game";
    }

    function updateLevelDisplay() {
        startButton.innerText = `Level ${level}`;
    }

    function generateSimonSequence(numSteps) {
        for (let i = 0; i < numSteps; i++) {
            simonSequence.push(colors[Math.floor(Math.random() * 4)]);
        }
    }

    function playSimonSequence() {
        let i = 0;
        const intervalId = setInterval(() => {
            lightUpButton(simonSequence[i]);
            i++;
            if (i >= simonSequence.length) {
                clearInterval(intervalId);
            }
        }, 1000);
    }

    function lightUpButton(color) {
        const button = document.getElementById(color);
        let opacity = 0.5;
        const intervalId = setInterval(() => {
            button.style.opacity = opacity;
            opacity = (opacity === 1) ? 0.5 : 1; // Toggle opacity
        }, 500);
        setTimeout(() => {
            clearInterval(intervalId);
            button.style.opacity = '1'; // Ensure the button is fully visible after blinking
        }, 1000);
    }

    function checkUserSequence() {
        const lastUserIndex = userSequence.length - 1;
        if (userSequence[lastUserIndex] !== simonSequence[lastUserIndex]) {
            endGame();
        } else if (userSequence.length === simonSequence.length) {
            level++;
            userSequence.length = 0;
            scoreMessage.style.color = "green";
            scoreMessage.style.fontSize = "x-large";
            scoreMessage.textContent = `Success! Your score: ${level - 1}`;
            setTimeout(() => {
                scoreMessage.textContent = ''; // Clear score message after a delay
                nextTurn();
            }, 2000);
        }
    }

    function endGame() {
        scoreMessage.style.color = "red";
        scoreMessage.style.fontSize = "x-large";
        scoreMessage.textContent = `Game Over! Your final score: ${level - 1}`;
        level = 1;
        gameStarted = false;
        updateLevelDisplay();
    }

    function restartGame() {
        level = 1;
        simonSequence.length = 0;
        userSequence.length = 0;
        scoreMessage.textContent = ''; // Clear any existing score message
        nxt();
    }
});




