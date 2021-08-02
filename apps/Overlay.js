'use strict';

import { AudioController } from './AudioController.js';
const audio = new AudioController();

function createOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  let span = document.createElement('span');
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
    ballon.style.background = `url(../assets/img/other/ballon${i}.png)`;
    ballon.style.backgroundSize = 'cover';
    ballon.style.position = 'absolute';
    let leftPosition = Math.floor(Math.random() * (window.innerWidth + 1));
    let topPosition = Math.floor(Math.random() * (window.innerHeight + 1));
    ballon.style.left = leftPosition + 'px';
    ballon.style.top = topPosition + 'px';

    balloons.appendChild(ballon);
  }
  for (let j = 1; j <= 10; j++) {
    let ballon = document.createElement('span');
    ballon.style.background = `url(../assets/img/other/ballon${j}.png)`;
    ballon.style.backgroundSize = 'cover';
    ballon.style.position = 'absolute';
    let leftPosition = Math.floor(Math.random() * (window.innerWidth + 1));
    let topPosition = Math.floor(Math.random() * (window.innerHeight * 1.5 + 1));
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
