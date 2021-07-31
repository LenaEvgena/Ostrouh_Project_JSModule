'use strict';
class AudioController {
  constructor() {
    this.bgMusic = new Audio('../assets/sounds/bgmusic.mp3');
    this.slideSound = new Audio('../assets/sounds/slide.mp3');
    this.clickSound = new Audio('../assets/sounds/click2.mp3');
    this.balloonPopSound = new Audio('../assets/sounds/balloonpop.mp3');
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
  //victory sound
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
  }

  openCard(card) {
    card.classList.add('visible');
    //sound
    //проверка на совпадение
  }

  closeCard(card) {
    card.classList.remove('visible');
  }
}




function initLogicGame() {
  const overlay1 = document.querySelector('.overlay1');
  overlay1.appendChild( createBalloons() );
  tapBalloons();

  const cards = Array.from(document.querySelectorAll('.card'));
  const memoryGame = new MemoryGame(cards);


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
