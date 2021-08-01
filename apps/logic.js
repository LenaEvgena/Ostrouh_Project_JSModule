'use strict';
class AudioController {
  constructor() {
    this.bgMusic = new Audio('../assets/sounds/bgmusic.mp3');
    this.slideSound = new Audio('../assets/sounds/slide.mp3');
    this.clickSound = new Audio('../assets/sounds/click2.mp3');
    this.balloonPopSound = new Audio('../assets/sounds/balloonpop.mp3');
    this.hooraySound = new Audio('../assets/sounds/hooray.mp3')
    this.bgMusic.volume = 0.03;
    this.bgMusic.loop = true;
  }
  startMusic() {
    this.bgMusic.play();
  }
  stopMusic() {
    this.bgMusic.pause();
    this.bgMusic.currentTime = 0;
  }
  clickSound() {
    this.clickSound.play();
  }
  slideSound() {
    this.slideSound.play();
  }
  balloonPopSound() {
    this.balloonPopSound.play();
  }
  hooraySound() {
    this.hooraySound.play();
  }
  //flip sound
}

class MemoryGame {
  constructor(cards) {
    this.audioController = new AudioController();
    this.cardsArray = cards;
  }

  startGame() {
    this.playing = true;
    this.checkingCard = null;
    this.matchedCardsArray = [];

    this.audioController.startMusic();
    // this.shuffleCards(this.cardsArray);
  }

  endGame() {
    document.querySelector('.overlay1').classList.add('visible');
    this.audioController.hooraySound();
  }

  openCard(card) {
    card.classList.add('visible');
    //sound
    //проверка на совпадение
    if (this.checkingCard) {
      this.checkMatch(card);
    }
    this.checkingCard = card;
    console.log(this.checkingCard);
  }

  checkMatch(card) {
    if (this.getCardSrc(card) === this.getCardSrc(this.checkingCard)) {
      this.isMatched(card, this.checkingCard);
    } else {
      this.notMatched(card, this.checkingCard);
    }
  }

  getCardSrc(card) {
    return card.querySelector('.animal').src;
  }

  isMatched(card1, card2) {
    this.matchedCardsArray.push(card1);
    this.matchedCardsArray.push(card2);
    card1.classList.add('matched');
    card2.classList.add('matched');
    //sound
    console.log(this.matchedCardsArray);
    //win
  }

  notMatched() {

  }

  closeCards() {
    this.cardsArray.forEach(card => {
      card.classList.remove('visible');
    });
  }

  shuffleCards(cardsArray) { //Fisher-Yates алгоритм
    for (let i = cardsArray.length - 1; i > 0; i--) {
      let randomInd = Math.floor( Math.random() * (i + 1) );
      cardsArray[randomInd].style.order = i;
      cardsArray[i].style.order = randomInd;
    }
  }
}




function initLogicGame() {
  const overlay1 = document.querySelector('.overlay1');
  overlay1.appendChild( createBalloons() );
  tapBalloons();

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
      let leftPosition = Math.floor(Math.random() * (1050 - 0 + 1) + 50) ;
      let topPosition = Math.floor(Math.random() * (1000 - 0 + 1));
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

