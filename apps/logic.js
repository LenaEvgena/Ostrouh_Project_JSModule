'use strict';

import { AudioController } from './AudioController.js';
class MemoryGame {
  constructor(cards) {
    this.audioController = new AudioController();
    this.cardsArray = cards;
  }

  startGame() {
    this.isBusy = true;//ч-л выполняется, играть нельзя
    this.checkingCard = null;
    this.matchedCardsArray = [];
    setTimeout(() => {
      this.isBusy = false;//можем начинать играть
    }, 500);
    // this.audioController.startMusic();
    this.shuffleCards(this.cardsArray);
  }

  endGame() {
    const overlay1 = document.querySelector('.overlay1');
    overlay1.classList.add('visible');
    overlay1.appendChild( createBalloons() );
    tapBalloons();
    //sound
    this.audioController.hooraySound();
  }

  openCard(card) {
    if(card !== this.checkingCard && !this.isBusy) {//можем ли мы открыть карту
      card.classList.add('visible');
      //sound
      this.audioController.clickSound();
      //проверка на совпадение
      if (this.checkingCard) { //если можем, и карта уже есть одна нажатая - проверяем совпадение
        this.checkMatching(card);
      } else {
        this.checkingCard = card;
      }
    }
  }

  checkMatching(card) {
    if (this.getCardSrc(card) === this.getCardSrc(this.checkingCard)) {
      this.isMatched(card, this.checkingCard);
    } else {
      this.notMatched(card, this.checkingCard);
    }
    //обнуляем карту
    this.checkingCard = null;
  }

  getCardSrc(card) {
    return card.querySelector('.animal').src;
  }

  isMatched(card1, card2) {
    this.matchedCardsArray.push(card1);
    this.matchedCardsArray.push(card2);
    console.log(this.matchedCardsArray);
    card1.classList.add('matched');
    card2.classList.add('matched');
    this.isBusy = true;
    //убрать карту
    setTimeout(() => {
      this.audioController.cardPopSound();
      card1.style.opacity = '0';
      card2.style.opacity = '0';
      this.isBusy = false;
    }, 1000);
    //win
    if (this.matchedCardsArray.length === this.cardsArray.length) {
      this.endGame();
    }
  }

  notMatched(card1, card2) {
    this.isBusy = true;
    setTimeout(() => {
      this.audioController.flipSound();

      this.closeCard(card1);
      this.closeCard(card2);
      this.isBusy = false;
    }, 1000);
    //обнуляем карту
    this.checkingCard = null;
  }

  closeCard(card) {
    card.classList.remove('visible');
  }

  shuffleCards(cardsArray) { //Fisher-Yates алгоритм
    for (let i = cardsArray.length - 1; i > 0; i--) {
      let randomInd = Math.floor( Math.random() * (i + 1) );
      cardsArray[randomInd].style.order = i;
      cardsArray[i].style.order = randomInd;
    }
  }
}

export function initLogicGame() {
  const cards = Array.from(document.querySelectorAll('.card'));
  const memoryGame = new MemoryGame(cards);

  memoryGame.startGame();
  cards.forEach(card => {
    card.addEventListener('click', () => {
      //переворот карты
      memoryGame.openCard(card);
    });
  });
}

initLogicGame();

function createBalloons() {
    const balloonsContainer = document.createElement('div');
    balloonsContainer.className = 'balloonsContainer';
    const balloons = document.createElement('div');
    balloons.id = 'balloons';
    for (let i = 1; i <= 10; i++) {
      let ballon = document.createElement('span');
      ballon.style.background = `url(../assets/img/other/ballon${i}.png)`;
      ballon.style.backgroundSize = 'cover';
      ballon.style.position = 'absolute';
      let leftPosition = Math.floor(Math.random() * (window.innerWidth + 1));
      let topPosition = Math.floor(Math.random() * (window.innerHeight + 1));
      ballon.style.left = leftPosition + 'px';
      ballon.style.top = topPosition + 'px';

      balloons.appendChild(ballon);
    }
    for (let j = 1; j <= 10; j++) {
      let ballon = document.createElement('span');
      ballon.style.background = `url(../assets/img/other/ballon${j}.png)`;
      ballon.style.backgroundSize = 'cover';
      ballon.style.position = 'absolute';
      let leftPosition = Math.floor(Math.random() * (window.innerWidth + 1));
      let topPosition = Math.floor(Math.random() * (window.innerHeight * 1.5 + 1));
      ballon.style.left = leftPosition + 'px';
      ballon.style.top = topPosition + 'px';

      balloons.appendChild(ballon);
    }
    balloonsContainer.appendChild(balloons);
    return balloonsContainer;
  }

function tapBalloons() {
  const balloonPop = new Audio('../assets/sounds/balloonpop.mp3');

  let balloons = Array.from(document.querySelectorAll('#balloons span'));
  balloons.forEach(balloon => {
    balloon.addEventListener('click', (e) => {
      e.preventDefault();

      e.target.style.background = 'url(../assets/img/other/confetti.png)';
      e.target.style.backgroundSize = 'cover';
      e.target.style.width = '150px';
      //sound
      balloonPop.play();
      // this.audioController.balloonPopSound();

      setTimeout(() => {e.target.style.display = 'none'}, 500);
    });
  });
}

