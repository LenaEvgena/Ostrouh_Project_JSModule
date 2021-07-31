'use strict';
// class AudioController {
//   constructor() {
//     this.bgMusic = new Audio('../assets/sounds/bgmusic.mp3');
//     this.slideSound = new Audio('../assets/sounds/slide.mp3');
//     this.clickSound = new Audio('../assets/sounds/click2.mp3');
//     this.bgMusic.volume = 0.03;
//     this.bgMusic.loop = true;
//   }
//   startMusic() {
//     this.bgMusic.play();
//   }
//   stopMusic() {
//     this.bgMusic.pause();
//     this.bgMusic.currentTime = 0;
//   }
//   clickSound() {
//     this.clickSound.play();
//   }
//   slideSound() {
//     this.slideSound.play();
//   }
//   //victory sound
// }

function initLogicGame() {
  let cards = Array.from(document.querySelectorAll('.card'));

  cards.forEach(card => {
    card.addEventListener('click', () => {
      //переворот карты

    });
  })





  let overlay1 = document.querySelector('.overlay1');
  overlay1.appendChild( createBalloons() );

  function createBalloons() {
    const balloonsContainer = document.createElement('div');
    balloonsContainer.className = 'balloonsContainer';
    const balloons = document.createElement('div');
    balloons.id = 'balloons';
    for (let i = 1; i <= 10; i++) {
      let ballon = document.createElement('span');
      ballon.style.background = 'url(../assets/img/other/ballon' + i + '.png)';
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



}

initLogicGame();
