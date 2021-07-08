'use strict';



class AudioSounds {
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
  clickItem() {
    this.clickSound.play();
  }
  slideItem() {
    this.slideSound.play();
  }
  //victory sound
}


function iniStartPage() {
  const wrapper = document.querySelector('.wrapper');
  wrapper.appendChild( createMainPage() );

  const playButton = document.querySelector('.btn_img');

  playButton.addEventListener('mousedown', () => playButton.style.transform = 'scale(0.9)');
  playButton.addEventListener('mouseup', () => playButton.style.transform = 'scale(1.0)');
  playButton.addEventListener('touchstart', () => playButton.style.transform = 'scale(0.9)');
  playButton.addEventListener('touchend', () => playButton.style.transform = 'scale(1.0)');

  playButton.addEventListener('click', startMenuPage);


  function startMenuPage() {
    const main_wrapper = document.querySelector('.main_wrapper');
    main_wrapper.style.display = 'none';

    initMenuPage();
  }

  function createMainPage() {
    const main_wrapper = document.createElement('div');
    main_wrapper.className = 'main_wrapper';

    const main_button = document.createElement('div');
    main_button.className = 'main_button';
    main_wrapper.appendChild(main_button);

    const img = document.createElement('img');
    img.src = 'assets/img/main/play_btn400.png';
    img.className = 'btn_img';
    img.alt = 'play_icon';
    img.onclick = () => {
      new Audio('../assets/sounds/click2.mp3').play()
      // audio.clickSound();
    };
    // img.setAttribute("onclick","new Audio('../assets/sounds/click1.mp3').play()");
    main_button.appendChild(img);

    return main_wrapper;
  }
}

window.onload = () => iniStartPage();
window.addEventListener('load', () => {
  let bgMusic = new AudioSounds;
  // bgMusic.startMusic();
})
