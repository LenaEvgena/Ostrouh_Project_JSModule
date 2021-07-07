'use strict';

function initColorsGame() {
  const wrapper = document.querySelector('.wrapper');
  wrapper.appendChild( createColorsPage() );





  const back_arrow = document.querySelector('.back_arrow');
  back_arrow.addEventListener('click', () => turnBack());

  function turnBack() {
    const colors_game_wrapper = document.querySelector('.colors_game_wrapper');
    colors_game_wrapper.style.display = 'none';
    back_arrow.style.transform = 'scale(0.9)';

    initMenuPage();
  }

  function createColorsPage() {
    const colors_game_wrapper = document.createElement('div');
    colors_game_wrapper.className = 'colors_game_wrapper';
    const colors_drag_images = document.createElement('div');
    colors_drag_images.className = 'colors_drag_images';
    const colors_drop_images = document.createElement('div');
    colors_drop_images.className = 'colors_drop_images';

    colors_game_wrapper.appendChild( createBackArrow() );
    colors_drag_images.appendChild( createColorGameImage('redcar', 'drag_image') );
    colors_drag_images.appendChild( createColorGameImage('yellowcar', 'drag_image') );
    colors_drag_images.appendChild( createColorGameImage('bluecar', 'drag_image') );
    colors_drop_images.appendChild( createColorGameImage('bluebox', 'drop_image') );
    colors_drop_images.appendChild( createColorGameImage('redbox', 'drop_image') );
    colors_drop_images.appendChild( createColorGameImage('yellowbox', 'drop_image') );
    colors_game_wrapper.appendChild(colors_drag_images);
    colors_game_wrapper.appendChild(colors_drop_images);

    return colors_game_wrapper;
  }

  function createColorGameImage(image, className) {
    const img = document.createElement('img');
    img.src = `../assets/img/colors/${image}.png`;
    img.className = className;
    // img.setAttribute("onclick","new Audio('../assets/sounds/click2.mp3').play()");
    // img.onmouseover = () => {
    //   new Audio('../assets/sounds/slide.mp3').play()
    // };

    return img;
  }

  function createBackArrow() {
    const back_arrow = document.createElement('img');
    back_arrow.src = '../assets/img/other/arrow_back.png'
    back_arrow.className = 'back_arrow';
    back_arrow.setAttribute('onclick',"new Audio('../assets/sounds/click2.mp3').play()");
    // back_arrow.onclick = () => {
    //   turnBack();
    // };

    return back_arrow;
  }
}
