const playerCardArray = [];
const dealerCardArray = [];
let playerTotal = 0;
let dealerTotal = 0;
let dealerTalkBox = null;
let isTurnFinished = false;

const dealerSpeach = {
  turn: "It's your turn !",
  win: 'You Won !',
  loose: 'You loose ...',
  ace: 'What value do you want to get from this ace ? 1 or 11',
};

onload = () => {
  init();
};

init = () => {
  dealerTalkBox = document.getElementById('dealerSpeaking');
  document.getElementById('moreCard').addEventListener('click', handleMoreCard);
  document.getElementById('stopTurn').addEventListener('click', handleStopTurn);
  document.getElementById('restart').addEventListener('click', () => {
    location.reload();
  });
  startGame();
};

//deroulement du jeu

startGame = () => {
  dealerTalkBox.innerText = dealerSpeach.turn;
  addCard('PLAYER');
  addCard('PLAYER');
  calculatePlayerScore();

  addCard('DEALER');
  calculateDealerScore();
  //second dealer card is hidden
  addCard('DEALER', true);
};

handleMoreCard = () => {
  addCard('PLAYER');
  calculatePlayerScore();
};

calculatePlayerScore = () => {
  playerTotal = playerCardArray.reduce((acc, cur) => acc + cur);

  document.getElementById('playerTotalScore').innerText = playerTotal;
  if (playerTotal >= 21) {
    endGame();
  } else {
    handleMoreTurn();
  }
};

handleWin = () => {
  dealerTalkBox.innerText = dealerSpeach.win;
  isTurnFinished = true;
};

handleLoose = () => {
  dealerTalkBox.innerText = dealerSpeach.loose;
  isTurnFinished = true;
};

handleMoreTurn = () => {
  dealerTalkBox.innerText = dealerSpeach.turn;
};

handleStopTurn = () => {
  isTurnFinished = true;
  dealerTurn();
};
dealerTurn = () => {
  console.log('handleDealerTurn');
  document
    .getElementsByClassName('hiddenCard')[0]
    .classList.remove('hiddenCard');
  calculateDealerScore();
  while (dealerTotal <= 16) {
    console.log('boucle');
    addCard('DEALER');
    calculateDealerScore();
  }
  endGame();
};

endGame = () => {
  if (playerTotal > 21) {
    handleLoose();
  } else if (playerTotal === 21 || dealerTotal > 21) {
    handleWin();
  } else if (playerTotal > dealerTotal) {
    handleWin();
  } else {
    handleLoose();
  }
  document.getElementById('btnContainer').style.display = 'none';
  document.getElementById('restart').style.display = 'block';
};

calculateDealerScore = () => {
  console.log('dealer array ', dealerCardArray);
  dealerTotal = dealerCardArray.reduce((acc, cur) => acc + cur);
  document.getElementById('dealerTotalScore').innerText = dealerTotal;
};

//tool

addCard = (turn, hidden) => {
  const container =
    turn == 'PLAYER'
      ? document.getElementById('playerCardContainer')
      : document.getElementById('dealerCardContainer');
  const card = document.createElement('div');

  if (hidden) {
    card.classList.add('hiddenCard');
  }

  let cardValue = Math.floor(Math.random() * 10) + 1;
  if (cardValue === 1) {
    cardValue = handleAce(turn);
  }
  let valueLabel = document.createElement('span');

  turn == 'PLAYER'
    ? playerCardArray.push(cardValue)
    : dealerCardArray.push(cardValue);

  valueLabel.innerText = cardValue;
  card.appendChild(valueLabel);
  container.appendChild(card);
};

handleAce = (turn) => {
  if (turn == 'DEALER') {
    if (dealerTotal + 11 >= 17 && dealerTotal + 11 <= 21) {
      return 11;
    } else {
      return 1;
    }
  } else {
    return parseInt(prompt(dealerSpeach.ace));
  }
};
