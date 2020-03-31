/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

// Hide the dice at the Start of the Game
document.querySelector('.dice').style.display = 'none';

// Add event listener to 'Roll Dice' Button : Roll Dice Button
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // Roll the Dice to Get a Random Number 
        var dice = Math.floor(Math.random() * 6) + 1;
        console.log('Current Value of Dice = ' + dice);

        //console.log('Current Dice Value = ' + dice);

        // Display the Dice Image and the Result
        var diceObject = document.querySelector('.dice');
        diceObject.style.display = 'block';
        diceObject.src = 'dice-' + dice + '.png';

        // Update the round Score (if the rolled number is not 1)
        if (dice > 1) {
            // Add the Scores 
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {

            // The Other Player Gets the Chance and your round Scroe is Set to Zero. Next Player
            switctPlayers();

        }

    }

});

// New Game Button
document.querySelector('.btn-new').addEventListener('click', init);

// Hold-Button
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add the Current Score to the Global Score.
        scores[activePlayer] += roundScore;

        // Update the UI With the Global Score. Next Player
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // Check If a Player Has Won
        if (scores[activePlayer] >= 20) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!!!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            switctPlayers();
        }
    }



});


// Next Player Re-Usable Function

function switctPlayers() {
    // Hand over the dice to the other player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    // Display the Reset roundScrore to zero
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Toogle the style for the Current Player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

// Initilize Function

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    // Initilize all the Values to zero at the Start of the game.
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');




}