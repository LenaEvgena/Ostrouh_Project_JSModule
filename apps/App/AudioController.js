'use strict';

export class AudioController {
  constructor() {
    this.bgMusic = new Audio('/assets/sounds/bgmusic.mp3');
    this.slide = new Audio('/assets/sounds/slide.mp3');
    this.flip = new Audio('/assets/sounds/flip.mp3');
    this.click = new Audio('/assets/sounds/click2.mp3');
    this.balloonPop = new Audio('/assets/sounds/balloonpop.mp3');
    this.hooray = new Audio('/assets/sounds/hooray.mp3');
    this.cardPop = new Audio('/assets/sounds/cardpop.mp3');
    this.drop = new Audio('/assets/sounds/drop1.mp3');

    this.balloonPop.volume = 0.2;
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
  toggleBgMusic() {
    if(this.bgMusic.paused) {
      this.bgMusic.play();
      globalThis.isPaused = false;
    } else {
      this.bgMusic.pause();
      globalThis.isPaused = true;
    }
  }
  clickSound() {
    this.click.play();
  }
  flipSound() {
    this.flip.play();
  }
  slideSound() {
    this.slide.play();
  }
  balloonPopSound() {
    this.balloonPop.play();
  }
  hooraySound() {
    this.hooray.play();
  }
  cardPopSound() {
    this.cardPop.play();
  }
  dropSound() {
    this.drop.play();
  }
  vibro(flag) {
    if (navigator.vibrate) {
      if (!flag) {
        window.navigator.vibrate(100);
      } else {
        window.navigator.vibrate([100, 50, 100, 50, 100])
      }
    }
  }
}
