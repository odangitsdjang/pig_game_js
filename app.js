/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores, roundScore, activePlayer, gameNotOver;

initializeGame();

function initializeGame() {
  scores = [0, 0];
  gameNotOver = true;
  roundScore = 0;
  activePlayer = 0;
  document.querySelector('.dice').style.display = 'none';

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;


  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

function addPoints(s, rScore) {
  s[activePlayer] += rScore;
  document.getElementById('score-'+activePlayer).textContent = s[activePlayer];
}

function gameOver() {
  // return scores.some((el) => el>100);

  return scores[activePlayer] >= 100;
}

function finishGame() {
  gameNotOver = false;
  document.querySelector('#name-'+activePlayer).textContent = 'WINNER!!';
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.player-' +activePlayer+ '-panel').classList.remove('active');
  document.querySelector('.player-' +activePlayer+ '-panel').classList.add('winner');

}

function changePlayer() {

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';

  activePlayer = (activePlayer === 0) ? 1 : 0;
}

document.querySelector('.btn-roll').addEventListener('click', ()=> {
  if (gameNotOver) {
    let dice = Math.floor(Math.random() * 6) + 1;
    const diceDOM =  document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = `dice-${dice}.png`;
    if (dice === 1) {
      roundScore = 0;
      addPoints(scores, roundScore);
      changePlayer();
    }
    else {
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', ()=> {
  if (gameNotOver) {
    addPoints(scores, roundScore);
    if (gameOver()) {
      finishGame();
    }
    changePlayer(scores, roundScore);
    roundScore = 0;
  }
});


document.querySelector('.btn-new').addEventListener('click', initializeGame);
