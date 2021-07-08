'use strict';

// class Game {
//   constructor(images) {
//     this.imagesArray = images;
//     this.sounds = new AudioSounds();
//   }
//   startGame() {
//     this.imageToCheck = null;
//     this.matchedImages = [];
//     this.playing = true;
//   }
// }

function initColorsGame() {
  const wrapper = document.querySelector('.wrapper');
  wrapper.appendChild( createColorsPage() );

  const back_arrow = document.querySelector('.back_arrow');
  back_arrow.addEventListener('click', () => turnBack());





  let dragImages = Array.from(document.querySelectorAll('.drag_image'));
  let dropImages = Array.from(document.querySelectorAll('.drop_image'));

  console.log('dragImages', dragImages);
  console.log('dropImages', dropImages);

  let DraggedImage = null;

  dropImages.forEach((image) => {
    image.addEventListener('drop', DivDrop(this));
    image.addEventListener('dragover', DivDragOver);
  });

  dragImages.forEach((image) => {
    image.addEventListener('dragstart', DragStart);
    image.addEventListener('dragend', DragEnd);
  });


  function DragStart(EO) {
    // началось перетаскивание мячика
    EO = EO || window.event;
    console.log('starting drag id=' + EO.target.id);
    DraggedImage = EO.target;
  }

  function DragEnd(EO) {
    // закончилось перетаскивание мячика (неважно куда он уронен)
    EO = EO || window.event;
    console.log('drag finished');
    DraggedImage = null;
  }

  function DivDragOver(EO) {
    EO = EO || window.event;
    // по-умолчанию ронять элементы в div запрещено, отменяем:
    EO.preventDefault();
  }

  function DivDrop(Div, EO) {
    // мячик уронен
    EO = EO || window.event;
    EO.preventDefault();
    if (DraggedImage)
      Div.appendChild(DraggedImage);
  }












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
    colors_drag_images.appendChild( createColorGameImage('redcar', 'drag_image', 'true') );
    colors_drag_images.appendChild( createColorGameImage('yellowcar', 'drag_image', 'true') );
    colors_drag_images.appendChild( createColorGameImage('bluecar', 'drag_image', 'true') );
    colors_drop_images.appendChild( createColorGameImage('bluebox', 'drop_image') );
    colors_drop_images.appendChild( createColorGameImage('redbox', 'drop_image') );
    colors_drop_images.appendChild( createColorGameImage('yellowbox', 'drop_image') );
    colors_game_wrapper.appendChild(colors_drag_images);
    colors_game_wrapper.appendChild(colors_drop_images);

    return colors_game_wrapper;
  }

  function createColorGameImage(image, className, draggable) {
    const img = document.createElement('img');
    img.id = image;
    img.src = `../assets/img/colors/${image}.png`;
    img.className = className;
    // img.setAttribute('draggable', draggable);
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


// if (document.readyState === 'loading') {
//   document.addEventListener('DOMContentLoaded', initColorsGame());
// } else {
//   initColorsGame();
// }




  // let dragItems = Array.from(document.querySelectorAll('.drag_image'));
  // let dropImages = document.querySelector('.color_drop_images');

  // dropImages.ondragover = allowDrop;

  // function allowDrop(event) {
  //   event.preventDefault();
  // }


  // dragItems.forEach((item) => {
  //   item.ondragstart = () => drag();
  // });

  // function drag(event) {
  //   event.preventDefault();
  //   event.dataTransfer.setData('id', event.target.id)
  // }


  // dropImages.ondrop = drop;

  // function drop(event) {
  //   // event.preventDefault();
  //   let itemId = event.dataTransfer.get('id');
  //   console.log(itemId);
  //   event.target.append(document.getElementById(itemId));
  // }
