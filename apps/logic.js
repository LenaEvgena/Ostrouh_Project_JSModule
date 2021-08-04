'use strict';

import { AudioController } from './AudioController.js';
import { Controlls } from './Controlls.js';
import { Overlay } from './Overlay.js';

class MemoryGame {
  constructor() {
    // constructor(cards) {
    this.audioController = new AudioController();
    this.overlay = new Overlay();
    this.images = ['cat', 'cow', 'croco', 'dog', 'elef', 'girrafe', 'horse', 'lamb', 'lion', 'monkey', 'panda', 'pig', 'squirrel', 'turkey', 'zebra'];
    this.tasksCount = this.images.length;
    this.count = this.tasksCount;
    this.controlls = new Controlls(this.tasksCount);
    this.renderLogicPage();
    // this.cardsArray = cards;
    this.cardsArray = Array.from(document.querySelectorAll('.card'));
  }

  startGame() {
    this.isBusy = true;//ч-л выполняется, играть нельзя
    this.checkingCard = null;
    this.matchedCardsArray = [];
    setTimeout(() => {
      this.isBusy = false;//можем начинать играть
    }, 500);
    // this.audioController.startMusic();
    // this.shuffleCards(this.cardsArray);
    this.cardsArray.forEach(card => {
      card.addEventListener('click', () => {
        //переворот карты
        this.openCard(card);
      });
    });
  }

  endGame() {
    this.overlay.endGame();
    this.audioController.hooraySound();
    setTimeout(() => {
      this.controlls.turnBack();
    }, 8000)
  }

  openCard(card) {
    if(card !== this.checkingCard && !this.isBusy && !this.matchedCardsArray.includes(card)) {//можем ли мы открыть карту, послюусловие - т.к. неверно работает при нажатии на уже скрытую карту
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
      this.count--;
      this.controlls.taskIsDone(this.count);
    }, 800);
    //win
    if (this.matchedCardsArray.length === this.cardsArray.length) {
      setTimeout(() => {
        this.endGame();
      }, 500);
    }
  }

  notMatched(card1, card2) {
    this.isBusy = true;
    setTimeout(() => {
      this.audioController.flipSound();

      this.closeCard(card1);
      this.closeCard(card2);
      this.isBusy = false;
    }, 800);
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

  renderLogicPage() {
    const wrapper = document.querySelector('.wrapper');
    const logic_game_wrapper = document.createElement('div');
    logic_game_wrapper.className = 'logic_game_wrapper';

    const buttons_container = document.createElement('div');
    buttons_container.className = 'buttons_container';
    this.controlls.createBackArrow(buttons_container);
    this.controlls.createTaskCheckPoint(this.tasksCount, buttons_container);
    logic_game_wrapper.appendChild( buttons_container );

    logic_game_wrapper.appendChild( this.overlay.createOverlay() );
    logic_game_wrapper.appendChild( this.createCard(this.images) );
    console.log(this.images);

    wrapper.appendChild( logic_game_wrapper );
  }

  createCard(array) {
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
}

export function initLogicGame() {
  // const cards = Array.from(document.querySelectorAll('.card'));
  // const memoryGame = new MemoryGame(cards);
  const memoryGame = new MemoryGame();
  memoryGame.startGame();
}
