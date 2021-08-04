'use strict';

import { AudioController } from './AudioController.js';
import { Controlls } from './Controlls.js';

export class Overlay {
  constructor() {
    this.createOverlay();
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
    // balloons.addEventListener('click', this.tapBalloons());
    this.drawBalloons(balloons);
    this.drawBalloons(balloons);
    balloonsContainer.appendChild(balloons);
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
  tapBalloons(e) {
    e = e || window.event;
    e.preventDefault();
    e.target.style.background = 'url(../assets/img/other/confetti.png)';
    e.target.style.backgroundSize = 'cover';
    e.target.style.width = '150px';
    AudioController.balloonPopSound();

    setTimeout(() => {e.target.style.display = 'none'}, 300);
  }
  endGame() {
    document.querySelector('.overlay').classList.add('visible');
  }
}




// for (let i = 1; i <= 10; i++) {
    //   let ballon = document.createElement('span');
    //   ballon.style.background = `url(../assets/img/other/ballon${i}.png)`;
    //   ballon.style.backgroundSize = 'cover';
    //   ballon.style.position = 'absolute';
    //   let leftPosition = Math.floor(Math.random() * (window.innerWidth + 1));
    //   let topPosition = Math.floor(Math.random() * (window.innerHeight + 1));
    //   ballon.style.left = leftPosition + 'px';
    //   ballon.style.top = topPosition + 'px';

    //   balloons.appendChild(ballon);
    // }
    // for (let j = 1; j <= 10; j++) {
    //   let ballon = document.createElement('span');
    //   ballon.style.background = `url(../assets/img/other/ballon${j}.png)`;
    //   ballon.style.backgroundSize = 'cover';
    //   ballon.style.position = 'absolute';
    //   let leftPosition = Math.floor(Math.random() * (window.innerWidth + 1));
    //   let topPosition = Math.floor(Math.random() * (window.innerHeight * 1.5 + 1));
    //   ballon.style.left = leftPosition + 'px';
    //   ballon.style.top = topPosition + 'px';

    //   balloons.appendChild(ballon);
    // }

