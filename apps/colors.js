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
  let drag_container = document.querySelector('.colors_drag_images');

  let dropImages = Array.from(document.querySelectorAll('.drop_image'));
  let dropContainers = Array.from(document.querySelectorAll('.image_container'));

  console.log('dragImages', dragImages);
  console.log('dropContainers', dropContainers);

  let DraggedImage = null;
  let DragShiftX;
  let DragShiftY;

  dragImages.forEach((image) => {
    image.addEventListener('mousedown', Drag_Start);
    image.addEventListener('mouseup', Drag_Stop);
  });

  dropContainers.forEach((container) => {
    container.addEventListener('mouseenter', DivDragEnter);
    container.addEventListener('mouseup', DivDrop);
    container.addEventListener('mouseleave', DivDragLeave);
  });

  setTimeout(() => {
    getElementPos(dragImages);
  }, 500);

  function Drag_Start(EO) {
    // началось перетаскивание мячика
    EO = EO || window.event;
    console.log('starting drag id=' + EO.target.id);
    DraggedImage = EO.target;
    DragShiftX = EO.pageX - DraggedImage.x;
    DragShiftY = EO.pageY - DraggedImage.y;
    DraggedImage.style.cursor = 'grabbing';
    DraggedImage.style.zIndex = '1000';

    drag_container.addEventListener('mousemove', Drag_Move);
    DraggedImage.addEventListener('mouseup', Drag_Stop);
  }

  function Drag_Move(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    DraggedImage.style.left = (EO.pageX - DragShiftX) + "px";
    DraggedImage.style.top = (EO.pageY - DragShiftY) + "px";
  }

  function Drag_Stop(EO) {
    // закончилось перетаскивание мячика (неважно куда он уронен)
    EO = EO || window.event;
    console.log('drag finished');
    console.log('drag finished at id=' + EO.currentTarget.id);
    EO.preventDefault();
    DraggedImage.style.cursor = 'auto';
    DraggedImage.style.zIndex = '1';
    drag_container.removeEventListener('mousemove', Drag_Move);
    DraggedImage.removeEventListener('mouseup', Drag_Stop);
    DraggedImage = null;
  }

  function DivDrop(EO) {
    // мячик уронен
    EO = EO || window.event;
    EO.preventDefault();
    // var DragElem = document.getElementById('COON');
    // Div.appendChild(DragElem);
    if (DraggedImage)
      EO.currentTarget.appendChild(DraggedImage);
  }

  function DivDragEnter( EO) {
    EO = EO || window.event;
  // по-умолчанию ронять элементы в div запрещено, отменяем:
    EO.preventDefault();
    EO.currentTarget.style.transform = 'scale(1.1)';
    EO.currentTarget.addEventListener('mouseover', DivDragOver);
    console.log('div enter id=' + EO.currentTarget.id);
  }
  function DivDragOver(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    console.log('div over');
  }
  function DivDragLeave(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    EO.currentTarget.style.transform = 'scale(1.0)';
    EO.currentTarget.removeEventListener('mouseover', DivDragOver);
    // EO.currentTarget.removeEventListener('mouseenter', DivDragEnter);
    console.log('div leave');
  }

  function getElementPos(arr) {
    var X = [];
    var Y = [];
    for (var i = 0; i < arr.length; i++) {
      X.push(arr[i].offsetLeft);
      Y.push(arr[i].offsetTop);
    }
    for (var i = 0; i < arr.length; i++) {
      arr[i].style.position = 'absolute';
      arr[i].style.left = X[i] + 'px';
      arr[i].style.top = Y[i] + 'px';
    }
    return {left: X, top: Y};
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
    colors_drag_images.appendChild( createColorGameImage('redcar', 'drag_image',) );
    colors_drag_images.appendChild( createColorGameImage('yellowcar', 'drag_image',) );
    colors_drag_images.appendChild( createColorGameImage('bluecar', 'drag_image',) );
    const div1 = document.createElement('div');
    div1.className = 'image_container';
    div1.id = 'blue';

    const div2 = document.createElement('div');
    div2.className = 'image_container';
    div2.id = 'red';
    const div3 = document.createElement('div');
    div3.className = 'image_container';
    div3.id = 'yelllow';
    div1.appendChild( createColorGameImage('bluebox', 'drop_image') );
    div2.appendChild( createColorGameImage('redbox', 'drop_image') );
    div3.appendChild( createColorGameImage('yellowbox', 'drop_image') );
    colors_drop_images.appendChild( div1 );
    colors_drop_images.appendChild( div2 );
    colors_drop_images.appendChild( div3 );
    colors_game_wrapper.appendChild(colors_drag_images);
    colors_game_wrapper.appendChild(colors_drop_images);

    return colors_game_wrapper;
  }

  function createColorGameImage(image, className) {
    const img = document.createElement('img');
    img.id = image;
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
