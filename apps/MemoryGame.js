'use strict';

import { Controlls } from './Controlls.js';
import { Overlay } from './Overlay.js';

export class MemoryGame {
  constructor(images, id, callback) {
    this.images = images;
    this.id = id;
    console.log(this.id);
    this.callback = callback;
    this.tasksCount = this.images.length;
    this.count = this.tasksCount;
    this.overlay = new Overlay();
    this.controlls = new Controlls(this.tasksCount);
    this.renderLogicPage(this.callback);
    this.cardsArray = Array.from(document.querySelectorAll('.card'));
    this.timer = document.querySelector('#timer');
    this.moves = document.querySelector('#flips');
    this.time = 0;
    this.flips = 0;
  }

  startGame() {
    this.time = 0;
    this.flips = 0;
    this.isBusy = true;//ч-л выполняется, играть нельзя
    this.checkingCard = null;
    this.matchedCardsArray = [];
    setTimeout(() => {
      this.isBusy = false;//можем начинать играть
      this.shuffleCards(this.cardsArray);
      this.countDown = this.startCountDown();
    }, 500);

    this.controlls.updateMusicButton(globalThis.audioController);
    this.timer.innerText = this.time;
    this.moves.innerText = this.flips;

    this.cardsArray.forEach(card => {
      card.addEventListener('click', () => {
        //переворот карты
        this.openCard(card);
      });
    });
    document.querySelector('.hint_button').addEventListener('click', () => {
      this.hintCards(this.cardsArray);
    })
  }

  startCountDown() {
    return setInterval(() => {
      this.time++;
      this.timer.innerText = this.time;
    }, 1000);
  }

  endGame() {
    clearInterval(this.countDown);
    this.overlay.endGame();
    globalThis.audioController.vibro(true);
    globalThis.audioController.stopMusic();
    globalThis.audioController.hooraySound();
    setTimeout(() => {
      this.controlls.turnBack(this.callback);
    }, 8000);
  }

  openCard(card) {
    if(card !== this.checkingCard && !this.isBusy && !this.matchedCardsArray.includes(card)) {//можем ли мы открыть карту, послюусловие - т.к. неверно работает при нажатии на уже скрытую карту
      card.classList.add('visible');
      //sound
      globalThis.audioController.clickSound();
      this.flips++;
      this.moves.innerText = this.flips;
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
    card1.classList.add('matched');
    card2.classList.add('matched');
    this.isBusy = true;
    //убрать карту
    setTimeout(() => {
      globalThis.audioController.vibro(false);
      globalThis.audioController.cardPopSound();
      card1.style.opacity = '0';
      card2.style.opacity = '0';
      card1.style.cursor = 'auto';
      card2.style.cursor = 'auto';
      this.isBusy = false;
      this.count--;
      this.controlls.taskIsDone(this.count);
    }, 800);
    //win
    if (this.matchedCardsArray.length === this.cardsArray.length) {
      setTimeout(() => {
        this.endGame();
      }, 800);
    }
  }

  notMatched(card1, card2) {
    this.isBusy = true;
    setTimeout(() => {
      globalThis.audioController.flipSound();

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

  hintCards(cardsArray) {
    this.isBusy = true;
    cardsArray.forEach(card => {
      card.classList.add('visible');
    });
    setTimeout(() => {
      this.isBusy = false;
      cardsArray.forEach(card => {
        card.classList.remove('visible');
      });
    }, 4000);
  }

  shuffleCards(cardsArray) { //Fisher-Yates алгоритм
    for (let i = cardsArray.length - 1; i > 0; i--) {
      let randomInd = Math.floor( Math.random() * (i + 1) );
      cardsArray[randomInd].style.order = i;
      cardsArray[i].style.order = randomInd;
    }
  }

  renderLogicPage(callback) {
    let k = this.id.split('_')[1];
    const wrapper = document.querySelector('.wrapper');
    const logic_game_wrapper = document.createElement('div');
    logic_game_wrapper.className = 'logic_game_wrapper';
    logic_game_wrapper.style.background = `url(../assets/img/logicmenu/bg${k}.png)`;
    logic_game_wrapper.appendChild( this.overlay.createOverlay() );

    const buttons_container = document.createElement('div');
    buttons_container.className = 'buttons_container';
    this.controlls.createBackArrow(buttons_container, callback);
    this.controlls.createTaskCheckPoint(this.tasksCount, buttons_container);
    logic_game_wrapper.appendChild( buttons_container );

    this.controlls.createMusicButton(logic_game_wrapper, globalThis.audioController);
    this.controlls.createHintButton(logic_game_wrapper);

    logic_game_wrapper.appendChild( this.createCard(this.images) );

    wrapper.appendChild( logic_game_wrapper );
  }

  createInfoBlock() {
    const info_container = document.createElement('div');
    info_container.className = 'info_container';
    const time = document.createElement('div');
    time.className = 'game_info';
    time.textContent = 'Time:';
    const spanT = document.createElement('span');
    spanT.id = 'timer';
    spanT.textContent = '0';
    time.appendChild( spanT );

    const flips = document.createElement('div');
    flips.className = 'game_info';
    flips.textContent = 'Flips:';
    const spanF = document.createElement('span');
    spanF.id = 'flips';
    spanF.textContent = '0';
    flips.appendChild( spanF );

    info_container.appendChild(time);
    info_container.appendChild(flips);
    return info_container;
  }

  createCard(array) {
    const cards_container = document.createElement('div');
    cards_container.className = 'cards_container';
    cards_container.appendChild( this.createInfoBlock() );

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
//может render вставить в preloader???
