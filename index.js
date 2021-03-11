let playerCardArray = [];
let dealerCardArray = [];

onload = () => {
  init();
};

init = () => {
  document.getElementById('moreCard').addEventListener('click', handleMoreCard);
  document.getElementById('stopTurn').addEventListener('click', () => {});
  startGame();
};

//deroulement du jeu

startGame = () => {
  createCard('PLAYER');
  createCard('PLAYER');

  createCard('DEALER');
  //second dealer card is hidden
  createCard('DEALER', true);

  calculatePlayerScore();
};

handleMoreCard = () => {
  createCard('PLAYER');
  calculatePlayerScore();
};

calculatePlayerScore = () => {
  let total = playerCardArray.reduce((acc, cur) => acc + cur);
  const playerTotalScore = document
    .getElementById('playerTotalScore')
    .innerText('grrrr');
  if (total === 21) {
    handleWin();
  } else if (total > 21) {
    handleLoose();
  } else {
    handleMoreTurn();
  }
};

handleWin = () => {
  alert("C'est gagné");
};

handleLoose = () => {
  alert("C'est perdu");
};

handleMoreTurn = () => {
  alert('Joue encore');
};

//tool

createCard = (turn, hidden) => {
  const container =
    turn == 'PLAYER'
      ? document.getElementById('playerCardContainer')
      : document.getElementById('dealerCardContainer');
  const card = document.createElement('div');
  if (hidden) {
    card.classList.add('hiddenCard');
  }

  let valueLabel = document.createElement('span');

  let cardValue = Math.floor(Math.random() * 11) + 1;

  //TODO
  //handle ace

  turn == 'PLAYER'
    ? playerCardArray.push(cardValue)
    : dealerCardArray.push(cardValue);

  valueLabel.innerText = cardValue;
  card.appendChild(valueLabel);
  container.appendChild(card);
};
