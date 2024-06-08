document.addEventListener('DOMContentLoaded', () => {
    const userPointsSpan = document.getElementById('user-points');
    const cpuPointsSpan = document.getElementById('cpu-points');
    const userChoiceSpan = document.getElementById('user-choice');
    const cpuChoiceSpan = document.getElementById('cpu-choice');
    const messageDiv = document.getElementById('message');
    const winsPointP = document.getElementById('wins-point');
    const reloadButton = document.getElementById('reload');
    const weapons = document.querySelectorAll('.weapon button');
    let userPoints = 0;
    let cpuPoints = 0;

    const choices = ['ROCK✊🏼', 'PAPER🖐🏼', 'SCISSORS✌🏼'];

    function getRandomChoice() {
        return choices[Math.floor(Math.random() * choices.length)];
    }

    function determineWinner(userChoice, cpuChoice) {
        if (userChoice === cpuChoice) {
            return 'draw';
        }
        if (
            (userChoice === 'ROCK✊🏼' && cpuChoice === 'SCISSORS✌🏼') ||
            (userChoice === 'PAPER🖐🏼' && cpuChoice === 'ROCK✊🏼') ||
            (userChoice === 'SCISSORS✌🏼' && cpuChoice === 'PAPER🖐🏼')
        ) {
            return 'user';
        }
        return 'cpu';
    }

    function updateScore(winner) {
        if (winner === 'user') {
            userPoints++;
        } else if (winner === 'cpu') {
            cpuPoints++;
        }
        userPointsSpan.textContent = userPoints;
        cpuPointsSpan.textContent = cpuPoints;

        if (userPoints === 3 || cpuPoints === 3) {
            displayWinner(userPoints === 3 ? 'USER' : 'CPU');
        }
    }

    function displayWinner(winner) {
        winsPointP.textContent = `${winner} wins the game! 🎉`;
        messageDiv.classList.remove('disabled');
        weapons.forEach(weapon => weapon.disabled = true);
        reloadButton.classList.remove('disabled');
        
        // SweetAlert to show the winner
        Swal.fire({
            title: `${winner} wins the game! 🎉`,
            icon: 'success',
            confirmButtonText: 'Play Again'
        }).then((result) => {
            if (result.isConfirmed) {
                resetGame();
            }
        });
    }

    function resetGame() {
        userPoints = 0;
        cpuPoints = 0;
        userPointsSpan.textContent = userPoints;
        cpuPointsSpan.textContent = cpuPoints;
        messageDiv.classList.add('disabled');
        weapons.forEach(weapon => weapon.disabled = false);
        reloadButton.classList.add('disabled');
        userChoiceSpan.textContent = '';
        cpuChoiceSpan.textContent = '';
    }

    weapons.forEach(weapon => {
        weapon.addEventListener('click', () => {
            const userChoice = weapon.id;
            const cpuChoice = getRandomChoice();

            userChoiceSpan.textContent = userChoice;
            cpuChoiceSpan.textContent = cpuChoice;

            const winner = determineWinner(userChoice, cpuChoice);
            updateScore(winner);

            if (winner === 'user') {
                winsPointP.textContent = 'You won a point!🔥';
            } else if (winner === 'cpu') {
                winsPointP.textContent = 'CPU won a point!';
            } else {
                winsPointP.textContent = 'It\'s a draw!';
            }
            messageDiv.classList.remove('disabled');
        });
    });

    reloadButton.addEventListener('click', resetGame);
});
