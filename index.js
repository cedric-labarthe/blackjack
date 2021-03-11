const playerCardArray = [];
const dealerCardArray = [];
let playerTotal = 0;
let dealerTotal = 0;
let dealerTalkBox = null;
let isTurnFinished = false;
let cardArraySize = null;

const cardObject = {
  cardImg: [],
  cardValue: [],
};

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
  feedCardObject();
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
  playerTotal = playerCardArray.reduce((total, card) => total + card);

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
  document
    .getElementsByClassName('hiddenCard')[0]
    .classList.remove('hiddenCard');
  calculateDealerScore();
  while (dealerTotal <= 16) {
    addCard('DEALER');
    calculateDealerScore();
  }
  endGame();
};

// TODO
// handle draw (if player stop at score >17 & <21 && dealer got the same) who win ???

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
  dealerTotal = dealerCardArray.reduce((total, card) => total + card);
  document.getElementById('dealerTotalScore').innerText = dealerTotal;
};

//tool

feedCardObject = () => {
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j < 14; j++) {
      j < 11 ? cardObject.cardValue.push(j) : cardObject.cardValue.push(10);
    }
  }

  for (let i = 0; i < 4; i++) {
    const sign = ['club_', 'diamond_', 'heart_', 'spade_'];
    const heads = ['jack', 'king', 'queen'];
    for (let j = 1; j < 11; j++) {
      cardObject.cardImg.push(`./public/images/cards/${sign[i]}${j}.png`);
    }
    for (let k = 0; k < 3; k++) {
      cardObject.cardImg.push(
        `./public/images/cards/${sign[i]}${heads[k]}.png`
      );
    }
  }
};

addCard = (turn, hidden) => {
  const container =
    turn == 'PLAYER'
      ? document.getElementById('playerCardContainer')
      : document.getElementById('dealerCardContainer');
  const card = document.createElement('div');
  card.classList.add('cards');
  if (hidden) {
    card.classList.add('hiddenCard');
  }

  // let cardValue = Math.floor(Math.random() * 10) + 1;

  const handCard = chooseCard();

  let cardValue = handCard[0];
  const cardClass = handCard[1];
  const cardDeleteIndex = handCard[2];

  deleteCard(cardDeleteIndex);

  if (cardValue === 1) {
    cardValue = handleAce(turn);
  }
  let cardLabel = document.createElement('img');
  cardLabel.setAttribute('src', cardClass);

  let valueLabel = document.createElement('span');

  turn == 'PLAYER'
    ? playerCardArray.push(cardValue)
    : dealerCardArray.push(cardValue);

  valueLabel.innerText = cardValue;
  card.appendChild(cardLabel);
  card.appendChild(valueLabel);
  container.appendChild(card);
};

chooseCard = () => {
  cardArraySize = cardObject.cardImg.length;
  const cardIndex = Math.floor(Math.random() * cardArraySize);
  const cardValue = cardObject.cardValue[cardIndex];
  const cardImage = cardObject.cardImg[cardIndex];
  return [cardValue, cardImage, cardIndex];
};
deleteCard = (cardIndex) => {
  cardObject.cardValue.splice(cardIndex, 1);
  cardObject.cardImg.splice(cardIndex, 1);
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
    // TODO
    // Wait for a one or an eleven
  }
};
