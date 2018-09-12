/* ---- Rules -----/

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as possible with each dice roll getting added to that rounds score.
- However, if the player rolls a 1, the entire collected score that round is lost and it's the next player's turn.
- Each player can choose to 'Hold', which means that the score that round gets added to the global score.
- Once a player holds, it's the next players turn
- The first player to reach 30 points in the global score wins!!!

/----Rules End ----*/

var scores, activePlayer, roundScore, gamePlaying;
var lastDice = 0;

new_game();

function new_game() {
	scores = [0,0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;

	document.querySelector('.dice').style.display = 'none';

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

function dice_btn() {
	if (gamePlaying) {

		var dice = Math.floor(Math.random()* 6) + 1;

		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice +'.png';

		if (dice === 6 && lastDice === 6) {
			score[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = '0';
			nextPlayer();
		}
		else if (dice !== 1) {
			roundScore = roundScore + dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		}
		else {
			nextPlayer();
		}

		lastDice = dice;
	}

}

function hold_btn() {
	if (gamePlaying) {
		scores[activePlayer] += roundScore;

		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		if (scores[activePlayer] >= 30 ) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer +'-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer +'-panel').classList.remove('active');
			gamePlaying = false;
		}
		else {
			nextPlayer();
		}
	}
}

function nextPlayer() {
	if (activePlayer === 0) {
			activePlayer = 1;
		}
		else {
			activePlayer = 0;
		}

		roundScore = 0;

		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';

		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-roll').addEventListener('click', dice_btn);

document.querySelector('.btn-hold').addEventListener('click', hold_btn);

document.querySelector('.btn-new').addEventListener('click', new_game);

