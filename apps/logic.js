'use strict';
class AudioController {
  constructor() {
    this.bgMusic = new Audio('../assets/sounds/bgmusic.mp3');
    this.slideSound = new Audio('../assets/sounds/slide.mp3');
    this.clickSound = new Audio('../assets/sounds/click2.mp3');
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
  //victory sound
}

function initLogicGame() {
  let cards = Array.from(document.querySelectorAll('.card'));

  cards.forEach(card => {
    card.addEventListener('click', () => {
      //переворот карты

    });
  })





}

initLogicGame();
