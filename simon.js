document.addEventListener('DOMContentLoaded', function() {
    const colors = ['green', 'red', 'yellow', 'blue'];
    let simonSequence = [];
    let userSequence = [];
    let level = 1;
    let gameStarted = false;

    const buttons = document.querySelectorAll('.simon-button');
    const startButton = document.getElementById('start-btn');

    startButton.addEventListener('click', startGame);

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (gameStarted) {
                const clickedColor = button.id;
                lightUpButton(clickedColor);
                userSequence.push(clickedColor);
                checkUserSequence();
            }
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
            setTimeout(nextTurn, 1000);
        }
    }

    function endGame() {
        alert(`Game Over! Your score: ${level - 1}`);
        level = 1;
        gameStarted = false;
        updateLevelDisplay();
    }
});


