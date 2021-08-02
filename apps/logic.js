'use strict';

import { AudioController } from './AudioController.js';
import * as SPA from './SPA.js';

const audio = new AudioController();

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
    const overlay = document.querySelector('.overlay');
    overlay.classList.add('visible');
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
      taskIsDone();
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

const images = ['cat', 'cow', 'croco', 'dog', 'elef', 'girrafe', 'horse', 'lamb', 'lion', 'monkey', 'panda', 'pig', 'squirrel', 'turkey', 'zebra'];
let tasksCount = images.length;

export function initLogicGame() {
  const wrapper = document.querySelector('.wrapper');
  wrapper.appendChild( renderLogicPage() );

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



function renderLogicPage() {

  const logic_game_wrapper = document.createElement('div');
  logic_game_wrapper.className = 'logic_game_wrapper';

  const buttons_container = document.createElement('div');
  buttons_container.className = 'buttons_container';

  logic_game_wrapper.appendChild( createOverlay() );
  buttons_container.appendChild( createBackArrow() );
  buttons_container.appendChild( createTaskCheckPoint(tasksCount) );
  logic_game_wrapper.appendChild( buttons_container );
  logic_game_wrapper.appendChild( createCard(images) );

  return logic_game_wrapper;
}


function createCard(array) {
  const cards_container = document.createElement('div');
  cards_container.className = 'cards_container';
  const doubleArray = array.concat(array);

  for (let i = 0; i < doubleArray.length; i++) {
    const card = document.createElement('div');
    card.className = 'card';

    const card_back = document.createElement('div');
    card_back.classList.add('card_back', 'card_face');
    const back_image = document.createElement('img');
    back_image.className = 'back_image';
    back_image.src = './assets/img/bubbles/coloredbig.png';
    card_back.appendChild(back_image);

    const card_front = document.createElement('div');
    card_front.classList.add('card_front', 'card_face');
    const bubble = document.createElement('img');
    bubble.classList.add('bubble', 'logic_image');
    bubble.src = './assets/img/bubbles/pink.png';
    card_front.appendChild(bubble);

    const animal = document.createElement('img');
    animal.classList.add('animal', 'logic_image');
    animal.src = `./assets/img/logic/${doubleArray[i]}.png`;
    card_front.appendChild(animal);

    card.appendChild(card_back);
    card.appendChild(card_front);
    cards_container.appendChild(card);
  }
  return cards_container;
}



function turnBack() {
  const back_arrow = document.querySelector('.back_arrow');
  back_arrow.style.transform = 'scale(0.9)';
  back_arrow.style.cursor = 'pointer';
  SPA.switchToMenu();
}

function createBackArrow() {
  const back_arrow = document.createElement('img');
  back_arrow.src = '../assets/img/other/arrow_back.png'
  back_arrow.className = 'back_arrow';
  back_arrow.onclick = () => {
    audio.clickSound();
  }
  back_arrow.addEventListener('click', () => turnBack());
  return back_arrow;
}

function createTaskCheckPoint(count) {
  const tasksPointsDiv = document.createElement('div');
  tasksPointsDiv.id = 'tasksPoints';
  for (let i = 0; i < count; i++) {
    const taskPoint = document.createElement('span');
    taskPoint.style.background = 'url(../assets/img/icons/emptycircle.png)';
    taskPoint.style.backgroundSize = 'cover';
    tasksPointsDiv.appendChild(taskPoint);
  }
  return tasksPointsDiv;
}

function createOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  let span = document.createElement('span');
  span.className = 'overlay_text';
  span.textContent = 'excellent!!!';

  overlay.appendChild(span);
  overlay.appendChild( createBalloons() );
  return overlay;
}

function createBalloons() {
  const balloonsContainer = document.createElement('div');
  balloonsContainer.className = 'balloonsContainer';
  const balloons = document.createElement('div');
  balloons.id = 'balloons';
  for (let i = 1; i <= 10; i++) {
    let ballon = document.createElement('span');
    ballon.style.background = 'url(../assets/img/other/ballon' + i + '.png)';
    ballon.style.backgroundSize = 'cover';
    ballon.style.position = 'absolute';
    let leftPosition = Math.floor(Math.random() * (1050 - 0 + 1) + 50) ;
    let topPosition = Math.floor(Math.random() * (1000 - 0 + 1));
    // let leftPosition = Math.floor(Math.random() * window.innerWidth / 2.5) - 600 ;
    // let topPosition = Math.floor(Math.random() * window.innerHeight / 2.5) - 300;
    ballon.style.left = leftPosition + 'px';
    ballon.style.top = topPosition + 'px';
    balloons.appendChild(ballon);
  }
  balloonsContainer.appendChild(balloons);
  return balloonsContainer;
}

function tapBalloons() {
  const audio1 = new AudioController();

  let balloons = document.querySelector('#balloons');
  balloons.addEventListener('click', (e) => {
    e.preventDefault();

    e.target.style.background = 'url(../assets/img/other/confetti.png)';
    e.target.style.backgroundSize = 'cover';
    e.target.style.width = '150px';
    audio1.balloonPopSound();

    setTimeout(() => {e.target.style.display = 'none'}, 300);
  });
}

function taskIsDone() {
  tasksCount--;
  const tasksPointsDiv = document.querySelector('#tasksPoints');
  let points = tasksPointsDiv.children;
  let n = tasksCount;
  let point = points[n];

  if (tasksCount != 0) {
    audio.dropSound();
    point.style.background = 'url(../assets/img/icons/redcircle.png)';
    point.style.backgroundSize = 'cover';
  } else {
    audio.dropSound();
    point.style.background = 'url(../assets/img/icons/redcircle.png)';
    point.style.backgroundSize = 'cover';

    setTimeout(() => {

      //function endGame()
      document.querySelector('.overlay').classList.add('visible');
      audio.hooraySound();
      tapBalloons();

      setTimeout(() => {
        turnBack();
      }, 8000)

    }, 100);
  }
}
