'use strict';

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

    let score_message = document.createElement('span');
    score_message.className = 'score_message';

    overlay.appendChild(span);
    overlay.appendChild(score_message);
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
      ballon.style.background = `url(./assets/img/other/ballon${j}.png)`;
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
      EO.target.style.background = 'url(./assets/img/other/confetti.png)';
      EO.target.style.backgroundSize = 'cover';
      EO.target.style.width = '150px';

      globalThis.audioController.balloonPopSound();

      setTimeout(() => {EO.target.style.display = 'none'}, 300);
    });
  }

  endGame() {
    document.querySelector('.overlay').classList.add('visible');
  }

  createAuthorizationModal() {
    const modal_overlay = document.createElement('div');
    modal_overlay.className = 'modal_overlay';
    // const modal = document.createElement('div');
    // modal.className = 'modal';

    modal_overlay.appendChild( this.createInput() );
    // modal_overlay.appendChild(modal);
    return document.querySelector('.wrapper').appendChild( modal_overlay );
  }

  createInput() {
    const fieldset = document.createElement('fieldset');
    fieldset.className = 'modal';
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.id = 'check_name';
    input.setAttribute('placeholder', 'Enter your name');
    const button = document.createElement('button');

    button.setAttribute('type', 'submit');
    button.id = 'check_button';

    const checkImage = document.createElement('img');
    checkImage.src = './assets/img/icons/check-icon.png';
    checkImage.className = 'check_pic';

    button.appendChild(checkImage);
    fieldset.appendChild(input);
    fieldset.appendChild(button);
    return fieldset;
  }
}
