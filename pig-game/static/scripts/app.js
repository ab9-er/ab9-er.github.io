/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var currentScore, holdScore, diceValue, activePlayer, activeGame;

init();

function newDiceValue() {
    return Math.floor(Math.random() * 6) + 1;
}

function init() {

    hideDice();
    resetCurrentScore();
    resetHoldScore();
    initPlayers();

    activeGame = true;
}

function hideDice() {
    document.querySelector('.dice').style.display = 'none';
}

function showDice() {
    document.querySelector('.dice').style.display = 'block';
}

function resetCurrentScore() {
    currentScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
}

function resetHoldScore() {
    holdScore = [0, 0];
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
}

function changeActivePlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function initPlayers() {
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    activePlayer = 0;
}

function holdLogic() {
    holdScore[activePlayer] += currentScore;
    document.getElementById('score-' + activePlayer).textContent = holdScore[activePlayer];
    resetCurrentScore();
    hideDice();

    if (holdScore[activePlayer] >= 100) {
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
        document.getElementById('name-' + activePlayer).textContent = 'Winner';
        activeGame = false;
    } else {
        changeActivePlayer();
    }
}

document.querySelector('.btn-new').addEventListener('click', function (){
    console.log('Clicked on new game');
    init();
    initPlayers();
});

document.querySelector('.btn-roll').addEventListener('click', function() {
    console.log('Clicked on roll dice');

    if (activeGame) {
        var currentDiceValue = newDiceValue();
        var currentDiceDom = 'static/img/dice-' + currentDiceValue + '.png';

        showDice();
        document.querySelector('.dice').src = currentDiceDom;

        if (currentDiceValue !== 1) {
            currentScore += currentDiceValue;
            document.getElementById('current-' + activePlayer).textContent = currentScore;

            if (currentScore + holdScore[activePlayer] >= 100) holdLogic();

        } else {
            currentScore = 0;
            resetCurrentScore();
            hideDice();
            changeActivePlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function (){
    console.log('Clicked on hold');
    if (activeGame) {
        holdLogic();
    }
});