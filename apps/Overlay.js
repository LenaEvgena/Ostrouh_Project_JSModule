'use strict';

import { AudioController } from './AudioController.js';

export class Overlay {
  constructor() {
    this.audioController = new AudioController();
  }

  createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    let span = document.createElement('span');
    span.className = 'overlay_text';
    span.textContent = 'excellent!!!';

    overlay.appendChild(span);
    overlay.appendChild( this.createBalloons() );
    return overlay;
  }

  createBalloons() {
    const balloonsContainer = document.createElement('div');
    balloonsContainer.className = 'balloonsContainer';
    const balloons = document.createElement('div');
    balloons.id = 'balloons';
    this.drawBalloons(balloons);
    this.drawBalloons(balloons);
    balloonsContainer.appendChild(balloons);
    this.tapBalloons(balloons);
    return balloonsContainer;
  }

  drawBalloons(parent) {
    for (let j = 1; j <= 10; j++) {
      let ballon = document.createElement('span');
      ballon.style.background = `url(../assets/img/other/ballon${j}.png)`;
      ballon.style.backgroundSize = 'cover';
      ballon.style.position = 'absolute';
      let leftPosition = Math.floor(Math.random() * (window.innerWidth + 1));
      let topPosition = Math.floor(Math.random() * (window.innerHeight * 1.5 + 1));
      ballon.style.left = leftPosition + 'px';
      ballon.style.top = topPosition + 'px';

      parent.appendChild(ballon);
    }
  }

  tapBalloons(container) {
    container.addEventListener('click', (EO) => {
      EO = EO || window.EO;
      EO.preventDefault();
      EO.target.style.background = 'url(../assets/img/other/confetti.png)';
      EO.target.style.backgroundSize = 'cover';
      EO.target.style.width = '150px';
      this.audioController.balloonPopSound();

      setTimeout(() => {EO.target.style.display = 'none'}, 300);
    });
  }

  endGame() {
    document.querySelector('.overlay').classList.add('visible');
  }
}
