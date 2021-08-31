'use strict';

import { Controlls } from './Controlls.js';
import { Overlay } from './Overlay.js';
import * as storage from '../storage.js';

export class MemoryGame {
  constructor(images, id, callback) {
    this.userID = localStorage.userID;
    this.images = images;
    this.levelId = id;
    this.callback = callback;
    this.tasksCount = this.images.length;
    this.count = this.tasksCount;
    this.overlay = new Overlay();
    this.controlls = new Controlls(this.tasksCount);
    this.renderLogicPage(this.callback, this.images);
    // this.fitPositions(this.images);
    this.cardsArray = Array.from(document.querySelectorAll('.card'));
    this.timer = document.querySelector('#timer');
    this.moves = document.querySelector('#flips');
    this.time = 0;
    this.flips = 0;
  }

  startGame() {
    if (this.countDown) {
      clearInterval(this.countDown);
    }
    window.addEventListener('orientationchange', () => {this.fitPositions(this.images)});
    // this.fitPositions(this.images);
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
    this.controlls.updateMusicButton();
    this.timer.innerText = this.time;
    this.moves.innerText = this.flips;
    this.cardsArray.forEach(card => {
      card.addEventListener('click', () => {
        //переворот карты
        this.openCard(card);
      });
      card.addEventListener('touchstart', (EO) => {
        EO = EO || window.event;
        EO.preventDefault();
        //переворот карты
        this.openCard(card);
      });
    });
    document.querySelector('.hint_button').addEventListener('click', () => {
      this.hintCards(this.cardsArray);
    });
    document.querySelector('.hint_button').addEventListener('touchstart', (EO) => {
      EO = EO || window.event;
      EO.preventDefault();
      document.querySelector('.hint_button').style.transform = 'scale(1.1)';
      this.hintCards(this.cardsArray);
      setTimeout(() => {
        document.querySelector('.hint_button').style.transform = 'scale(1)';
      }, 300);
    });
  }

  startCountDown() {
    return setInterval(() => {
      this.time++;
      this.timer.innerText = this.time;
    }, 1000);
  }

  endGame() {
    document.querySelector('.logic_game_wrapper').appendChild( this.overlay.createOverlay() );
    clearInterval(this.countDown);
    storage.addPlayerData(this.userID, this.levelId, this.time, this.flips);
    globalThis.audioController.stopMusic();
    globalThis.audioController.hooraySound();
    this.overlay.endGame();
    globalThis.audioController.vibro(true);
    window.removeEventListener('orientationchange', () => {this.fitPositions(this.images)});

    setTimeout(() => {
      this.controlls.turnBack(this.callback);
    }, 8000);
  }

  openCard(card) {
    if(card !== this.checkingCard && !this.isBusy && !this.matchedCardsArray.includes(card)) {//можем ли мы открыть карту, посл.условие - т.к. неверно работает при нажатии на уже скрытую карту
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
    this.checkingCard = null;
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
    let k = this.levelId.split('_')[1]; //for bg images
    const wrapper = document.querySelector('.wrapper');
    const logic_game_wrapper = document.createElement('div');
    logic_game_wrapper.className = 'logic_game_wrapper';
    logic_game_wrapper.style.background = `url(assets/img/logicmenu/bg${k}.png)`;

    const buttons_container = document.createElement('div');
    buttons_container.className = 'buttons_container';
    this.controlls.createBackArrow(buttons_container, callback);
    this.controlls.createTaskCheckPoint(this.tasksCount, buttons_container);
    logic_game_wrapper.appendChild( buttons_container );

    this.controlls.createMusicButton(logic_game_wrapper, globalThis.audioController);
    this.controlls.createHintButton(logic_game_wrapper);

    logic_game_wrapper.appendChild( this.createCard(this.images) );
    wrapper.appendChild( logic_game_wrapper );
    this.fitPositions(this.images);
    // window.addEventListener('orientationchange', () => {this.fitPositions(this.images)});
  }

  createInfoBlock() {
    const info_container = document.createElement('div');
    info_container.className = 'info_container';
    const time = document.createElement('div');
    time.className = 'game_info';
    time.textContent = 'Time: ';
    const spanT = document.createElement('span');
    spanT.id = 'timer';
    spanT.textContent = '0';
    time.appendChild( spanT );

    const flips = document.createElement('div');
    flips.className = 'game_info';
    flips.textContent = 'Flips: ';
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

    const doubleArray = [...array, ...array];

    for (let i = 0; i < doubleArray.length; i++) {
      const card = document.createElement('div');
      card.className = 'card';

      const card_back = document.createElement('div');
      card_back.classList.add('card_back', 'card_face');

      const back_image = document.createElement('img');
      back_image.className = 'back_image';
      back_image.src = 'assets/img/bubbles/coloredbig.png';
      card_back.appendChild(back_image);

      const card_front = document.createElement('div');
      card_front.classList.add('card_front', 'card_face');

      const bubble = document.createElement('img');
      bubble.classList.add('bubble', 'logic_image');
      bubble.src = 'assets/img/bubbles/pink.png';
      card_front.appendChild(bubble);

      const animal = document.createElement('img');
      animal.classList.add('animal', 'logic_image');
      animal.src = `assets/img/logic/${doubleArray[i]}.png`;
      card_front.appendChild(animal);

      card.appendChild(card_back);
      card.appendChild(card_front);
      cards_container.appendChild(card);
    }
    return cards_container;
  }

  fitPositions(array) {
    const cards_container = document.querySelector('.cards_container');
    const info_container = document.querySelector('.info_container');
    const infoblock = document.querySelectorAll('.game_info');
    const cards = document.querySelectorAll('.card');
    const back_images = document.querySelectorAll('.back_image');
    const bubbles = document.querySelectorAll('.bubble');
    const animals = document.querySelectorAll('.animal');

    let ww = window.innerWidth;
    // let hw = window.innerHeight;
    let orientation = window.orientation;
    // console.log('ww-', ww, 'hw-', hw);
    // console.log((ww / hw));
    console.log(orientation);

    if (array.length <= 6) {
      if (orientation === 0 || orientation === 180 || orientation === -180) { // portrait orientation
        if (ww <= 767) {
          cards_container.style.gridTemplateColumns = 'repeat(3, auto)';
          cards_container.style.gridGap = '1.5vw';
          info_container.style.marginBottom = '13px';
          infoblock.forEach(info => {info.style.fontSize = '25px'});
          cards.forEach(card => {card.style.width = card.style.height = '100px'});
          back_images.forEach(back_image => {back_image.style.width = '100px'});
          bubbles.forEach(bubble => {bubble.style.width = '100px'});
          animals.forEach(animal => {animal.style.width = '80px'});
        }
        if (ww > 767 && ww <= 1279) {
          cards_container.style.gridTemplateColumns = 'repeat(3, auto)';
          cards_container.style.gridGap = '1.2vw';
          info_container.style.marginBottom = '15px';
          infoblock.forEach(info => {info.style.fontSize = '40px'});
          cards.forEach(card => {card.style.width = card.style.height = '170px'});
          back_images.forEach(back_image => {back_image.style.width = '170px'});
          bubbles.forEach(bubble => {bubble.style.width = '170px'});
          animals.forEach(animal => {animal.style.width = '140px'})
        }
        if (ww > 1279) {
          cards_container.style.gridTemplateColumns = 'repeat(3, auto)';
          cards_container.style.gridGap = '1vw';
          info_container.style.marginBottom = '25px';
          infoblock.forEach(info => {info.style.fontSize = '50px'});
          cards.forEach(card => {card.style.width = card.style.height = '180px'});
          back_images.forEach(back_image => {back_image.style.width = '180px'});
          bubbles.forEach(bubble => {bubble.style.width = '180px'});
          animals.forEach(animal => {animal.style.width = '150px'});
        }
      }
      if (orientation === 90 || orientation === -90) { // landscape orientation
        if (ww <= 767) {
          cards_container.style.gridTemplateColumns = 'repeat(4, auto)';
          cards_container.style.gridGap = '1vw';
          infoblock.forEach(info => {info.style.fontSize = '22px'});
          cards.forEach(card => {card.style.width = card.style.height = '85px'});
          back_images.forEach(back_image => {back_image.style.width = '85px'});
          bubbles.forEach(bubble => {bubble.style.width = '85px'});
          animals.forEach(animal => {animal.style.width = '65px'});
        }
        if (ww > 767 && ww <= 1279) {
          cards_container.style.gridTemplateColumns = 'repeat(4, auto)';
          cards_container.style.gridGap = '1vw';
          info_container.style.marginBottom = '20px';
          infoblock.forEach(info => {info.style.fontSize = '40px'});
          cards.forEach(card => {card.style.width = card.style.height = '160px'});
          back_images.forEach(back_image => {back_image.style.width = '160px'});
          bubbles.forEach(bubble => {bubble.style.width = '160px'});
          animals.forEach(animal => {animal.style.width = '130px'});
        }
        if (ww > 1279) {
          cards_container.style.gridTemplateColumns = 'repeat(4, auto)';
          cards_container.style.gridGap = '1vw';
          info_container.style.marginBottom = '20px';
          infoblock.forEach(info => {info.style.fontSize = '3.5vw'});
          cards.forEach(card => {card.style.width = card.style.height = '170px'});
          back_images.forEach(back_image => {back_image.style.width = '170px'});
          bubbles.forEach(bubble => {bubble.style.width = '170px'});
          animals.forEach(animal => {animal.style.width = '145px'});
        }
      }
    }

    if (array.length > 6 && array.length <= 8) {
      if (orientation === 0 || orientation === 180 || orientation === -180) {// portrait orientation
        if (ww <= 767) {
          cards_container.style.gridTemplateColumns = 'repeat(4, auto)';
          cards_container.style.gridGap = '1.5vw';
          info_container.style.marginBottom = '15px';
          infoblock.forEach(info => {info.style.fontSize = '25px'});
          cards.forEach(card => {card.style.width = card.style.height = '85px'});
          back_images.forEach(back_image => {back_image.style.width = '85px'});
          bubbles.forEach(bubble => {bubble.style.width = '85px'});
          animals.forEach(animal => {animal.style.width = '65px'});
        }
        if (ww > 767 && ww <= 1279) {
          cards_container.style.gridTemplateColumns = 'repeat(4, auto)';
          cards_container.style.gridGap = '1.2vw';
          info_container.style.marginBottom = '15px';
          infoblock.forEach(info => {info.style.fontSize = '40px'});
          cards.forEach(card => {card.style.width = card.style.height = '150px'});
          back_images.forEach(back_image => {back_image.style.width = '150px'});
          bubbles.forEach(bubble => {bubble.style.width = '150px'});
          animals.forEach(animal => {animal.style.width = '125px'});
        }
        if (ww > 1279) {
          cards_container.style.gridTemplateColumns = 'repeat(4, auto)';
          cards_container.style.gridGap = '1vw';
          info_container.style.marginBottom = '15px';
          infoblock.forEach(info => {info.style.fontSize = '6vw'});
          cards.forEach(card => {card.style.width = card.style.height = '180px'});
          back_images.forEach(back_image => {back_image.style.width = '180px'});
          bubbles.forEach(bubble => {bubble.style.width = '180px'});
          animals.forEach(animal => {animal.style.width = '150px'});
        }
      }
      if (orientation === 90 || orientation === -90) {// landscape orientation
        if (ww <= 767) {
          cards_container.style.gridTemplateColumns = 'repeat(6, auto)';
          cards_container.style.gridGap = '1.1vw';
          infoblock.forEach(info => {info.style.fontSize = '23px'});
          cards.forEach(card => {card.style.width = card.style.height = '80px'});
          back_images.forEach(back_image => {back_image.style.width = '80px'});
          bubbles.forEach(bubble => {bubble.style.width = '80px'});
          animals.forEach(animal => {animal.style.width = '60px'});
        }
        if (ww > 767 && ww <= 1279) {
          cards_container.style.gridTemplateColumns = 'repeat(4, auto)';
          cards_container.style.gridGap = '1vw';
          infoblock.forEach(info => {info.style.fontSize = '40px'});
          cards.forEach(card => {card.style.width = card.style.height = '140px'});
          back_images.forEach(back_image => {back_image.style.width = '140px'});
          bubbles.forEach(bubble => {bubble.style.width = '140px'});
          animals.forEach(animal => {animal.style.width = '120px'});
        }
        if (ww > 1279) {
          cards_container.style.gridTemplateColumns = 'repeat(4, auto)';
          cards_container.style.gridGap = '1vw';
          infoblock.forEach(info => {info.style.fontSize = '3vw'});
          info_container.style.marginBottom = '20px';
          cards.forEach(card => {card.style.width = card.style.height = '160px'});
          back_images.forEach(back_image => {back_image.style.width = '160px'});
          bubbles.forEach(bubble => {bubble.style.width = '160px'});
          animals.forEach(animal => {animal.style.width = '135px'});
        }
      }
    }

    if (array.length > 8 && array.length <= 15) {
      if (orientation === 0 || orientation === 180 || orientation === -180) { // portrait orientation
        if (ww <= 767) {
          cards_container.style.gridTemplateColumns = 'repeat(5, auto)';
          cards_container.style.gridGap = '1.5vw';
          info_container.style.marginBottom = '15px';
          infoblock.forEach(info => {info.style.fontSize = '25px'});
          cards.forEach(card => {card.style.width = card.style.height = '65px'});
          back_images.forEach(back_image => {back_image.style.width = '65px'});
          bubbles.forEach(bubble => {bubble.style.width = '65px'});
          animals.forEach(animal => {animal.style.width = '50px'});
        }
        if (ww > 767 && ww <= 1279) {
          cards_container.style.gridTemplateColumns = 'repeat(5, auto)';
          cards_container.style.gridGap = '1vw';
          info_container.style.marginBottom = '10px';
          infoblock.forEach(info => {info.style.fontSize = '40px'});
          cards.forEach(card => {card.style.width = card.style.height = '125px'});
          back_images.forEach(back_image => {back_image.style.width = '125px'});
          bubbles.forEach(bubble => {bubble.style.width = '125px'});
          animals.forEach(animal => {animal.style.width = '100px'});
        }
        if (ww > 1279) {
          cards_container.style.gridTemplateColumns = 'repeat(6, auto)';
          cards_container.style.gridGap = '1vw';
          info_container.style.marginBottom = '20px';
          infoblock.forEach(info => {info.style.fontSize = '6vw'});
          cards.forEach(card => {card.style.width = card.style.height = '180px'});
          back_images.forEach(back_image => {back_image.style.width = '180px'});
          bubbles.forEach(bubble => {bubble.style.width = '180px'});
          animals.forEach(animal => {animal.style.width = '150px'});
        }
      }
      if (orientation === 90 || orientation === -90) { // landscape orientation
        if (ww <= 767) {
          cards_container.style.gridTemplateColumns = 'repeat(8, auto)';
          cards_container.style.gridGap = '0.6vw';
          infoblock.forEach(info => {info.style.fontSize = '23px'});
          cards.forEach(card => {card.style.width = card.style.height = '60px'});
          back_images.forEach(back_image => {back_image.style.width = '60px'});
          bubbles.forEach(bubble => {bubble.style.width = '60px'});
          animals.forEach(animal => {animal.style.width = '45px'});
        }
        if (ww > 767 && ww <= 1279) {
          cards_container.style.gridTemplateColumns = 'repeat(6, auto)';
          cards_container.style.gridGap = '0.6vw';
          info_container.style.marginBottom = '10px';
          infoblock.forEach(info => {info.style.fontSize = '40px'});
          cards.forEach(card => {card.style.width = card.style.height = '115px'});
          back_images.forEach(back_image => {back_image.style.width = '115px'});
          bubbles.forEach(bubble => {bubble.style.width = '115px'});
          animals.forEach(animal => {animal.style.width = '95px'});
        }
        if (ww > 1279) {
          cards_container.style.gridTemplateColumns = 'repeat(6, auto)';
          cards_container.style.gridGap = '0.8vw';
          info_container.style.marginBottom = '10px';
          infoblock.forEach(info => {info.style.fontSize = '2.6vw'});
          cards.forEach(card => {card.style.width = card.style.height = '140px'});
          back_images.forEach(back_image => {back_image.style.width = '140px'});
          bubbles.forEach(bubble => {bubble.style.width = '140px'});
          animals.forEach(animal => {animal.style.width = '115px'});
        }
      }
    }
  }
}

