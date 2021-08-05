'use strict';

import { AudioController } from './AudioController.js';
import { Controlls } from './Controlls.js';
import { Overlay } from './Overlay.js';
import * as SPA from './SPA.js';


export function initShapesGame() {
  const audio = new AudioController();

  const imagesBase = `../assets/img/shapes/images/`;
  const shadowsBase = `../assets/img/shapes/shadows/`;
  const images = ['cat', 'cow', 'dog', 'horse', 'lamb', 'pig', 'turkey'];
  const shadows = ['cat-shadow', 'cow-shadow', 'dog-shadow', 'horse-shadow', 'lamb-shadow', 'pig-shadow', 'turkey-shadow'];
  const wrapper = document.querySelector('.wrapper');
  let tasksCount = images.length;
  let DraggedImage = null;
  let shiftX;
  let shiftY;
  let isDragging = false;

  wrapper.appendChild( createShapesPage() );
  const shapes_drag_images = document.querySelector('.shapes_drag_images');
  const dragImages = Array.from(document.querySelectorAll('.shape_image'));

  dragImages.forEach((image) => {
    image.addEventListener('mousedown', Drag_Start);
  });

//   //   let dropImages = {
//   //   cat: {
//   //     x: 40,
//   //     y: 0
//   //   },
//   //   cow: {
//   //     x: 600,
//   //     y: 0
//   //   },
//   //   dog: {
//   //     x: 300,
//   //     y: 50
//   //   },
//   //   horse: {
//   //     x: 450,
//   //     y: 150
//   //   },
//   //   lamb: {
//   //     x: 200,
//   //     y: 250
//   //   },
//   //   pig: {
//   //     x: 800,
//   //     y: 0
//   //   },
//   //   turkey: {
//   //     x: 700,
//   //     y: 150
//   //   },
//   //   update() {
//   //     for(let key in this) {
//   //       document.getElementById(key + '-shadow').style.position = 'absolute';
//   //       document.getElementById(key + '-shadow').style.left = this[key].x + 'px';
//   //       document.getElementById(key + '-shadow').style.top = this[key].y + 'px';
//   //     }
//   //   },
//   // }
//   // dropImages.update();
//   // setTimeout(() => {
//   //   getElementPos(dragImages);
//   // }, 500);

  function Drag_Start(EO) {
    // началось перетаскивание мячика
    EO = EO || window.event;
    DraggedImage = EO.target;

    if (EO.which != 1) return;
    if (!DraggedImage) return;

    EO.preventDefault();

    DraggedImage.ondragstart = function() {
      return false;
    }

    startDrag(DraggedImage, EO.clientX, EO.clientY);
  }

  function startDrag(element, clientX, clientY) {
    if (isDragging) {
      return;
    }

    isDragging = true;
    document.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseup', onMouseUp);

    shiftX = clientX - element.getBoundingClientRect().left;
    shiftY = clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.cursor = 'pointer';
    element.style.zIndex = '100';

    shapes_drag_images.replaceChild( createShadow(shadowsBase, element.id), element );
    wrapper.appendChild(element);

    moveAt(clientX, clientY);
  }

  function moveAt(clientX, clientY) {
    let newX = clientX - shiftX;
    let newY = clientY - shiftY;
    // if (Math.abs(newX) < 100 || Math.abs(newY) < 100) return;

    DraggedImage.style.left = newX + 'px';
    DraggedImage.style.top = newY + 'px';
  }

  function onMouseUp(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    finishDrag();
  }

  function onMouseMove(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    moveAt(EO.clientX, EO.clientY);
    DraggedImage.hidden = true;
    let elemBelow = document.elementFromPoint(EO.clientX, EO.clientY);
    DraggedImage.hidden = false;

    if(!elemBelow) return;

    if ((DraggedImage.id + '-shadow') === elemBelow.id) {
      shapes_drag_images.removeChild(document.getElementById(DraggedImage.id + '-1'));
      DivDrop(EO, elemBelow);
    }
  }

  function DivDrop(EO, elemBelow) {
      // мячик уронен
    EO = EO || window.event;
    EO.preventDefault();
    if (DraggedImage) {
      wrapper.removeChild(DraggedImage);
      elemBelow.src = DraggedImage.src;
      audio.dropSound();
      finishDrag();
      taskIsDone();
    }
  }

  function finishDrag() {
    if(!isDragging) {
      return;
    }

    isDragging = false;
    DraggedImage.style.top = parseInt(DraggedImage.style.top) + pageYOffset + 'px';
    DraggedImage.style.position = 'absolute';

    DraggedImage = null;

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  function createShapesPage() {
    const shapes_game_wrapper = document.createElement('div');
    shapes_game_wrapper.className = 'shapes_game_wrapper';

    const buttons_container = document.createElement('div');
    buttons_container.className = 'buttons_container';

    const drop_container = document.createElement('div');
    drop_container.className = 'drop_container';

    const drag_container = document.createElement('div');
    drag_container.className = 'drag_container';

    shapes_game_wrapper.appendChild( createOverlay() );
    buttons_container.appendChild( createBackArrow() );
    buttons_container.appendChild( createTaskCheckPoint(tasksCount) );
    shapes_game_wrapper.appendChild( buttons_container );

    drop_container.appendChild( createImage(shadowsBase, shadows, 'shadow_image', 'shapes_drop_images') );
    drag_container.appendChild( createImage(imagesBase, images, 'shape_image', 'shapes_drag_images') );


    shapes_game_wrapper.appendChild(drag_container);
    shapes_game_wrapper.appendChild(drop_container);

    return shapes_game_wrapper;
  }

  function createImage(base, arr, className, parentClassName) {
    const parent = document.createElement('div');
    parent.className = parentClassName;
    for (var i = 0; i < arr.length; i++) {
      const img = document.createElement('img');
      img.id = arr[i];
      img.src = base + arr[i] + '.png';
      img.className = className;
      parent.appendChild(img);
    }
    return parent;
  }

  function createShadow(base, imageId) {
      const img = document.createElement('img');
      img.src = base + imageId + '-shadow.png';
      img.id = imageId + '-1';
      img.className = 'shadow_image';
    return img;
  }



  function turnBack() {
    const back_arrow = document.querySelector('.back_arrow');
    back_arrow.style.transform = 'scale(0.9)';
    back_arrow.style.cursor = 'pointer';
    SPA.switchToMenu();
  }

  function createBackArrow() {
    const back_arrow = document.createElement('img');
    back_arrow.src = '../assets/img/other/arrow_back.png'
    back_arrow.className = 'back_arrow';
    back_arrow.onclick = () => {
      audio.clickSound();
    }
    back_arrow.addEventListener('click', () => turnBack());
    return back_arrow;
  }

  function createTaskCheckPoint(count) {
    const tasksPointsDiv = document.createElement('div');
    tasksPointsDiv.id = 'tasksPoints';
    for (let i = 0; i < count; i++) {
      const taskPoint = document.createElement('span');
      taskPoint.style.background = 'url(../assets/img/icons/emptycircle.png)';
      taskPoint.style.backgroundSize = 'cover';
      tasksPointsDiv.appendChild(taskPoint);
    }
    return tasksPointsDiv;
  }

  function createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    let span = document.createElement('span');
    span.className = 'overlay_text';
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

  function tapBalloons() {
    let balloons = document.querySelector('#balloons');
    balloons.addEventListener('click', (e) => {
      e.preventDefault();

      e.target.style.background = 'url(../assets/img/other/confetti.png)';
      e.target.style.backgroundSize = 'cover';
      e.target.style.width = '150px';
      audio.balloonPopSound();

      setTimeout(() => {e.target.style.display = 'none'}, 300);
    });
  }

  function endGame() {
    const overlay = document.querySelector('.overlay');
    overlay.classList.add('visible');
    tapBalloons();
    //sound
    audio.hooraySound();

    setTimeout(() => {
      turnBack();
    }, 8000)
  }

  function taskIsDone() {
    tasksCount--;
    const tasksPointsDiv = document.querySelector('#tasksPoints');
    let points = tasksPointsDiv.children;
    let n = tasksCount;
    let point = points[n];

    if (tasksCount != 0) {
      point.style.background = 'url(../assets/img/icons/redcircle.png)';
      point.style.backgroundSize = 'cover';
    } else {
      point.style.background = 'url(../assets/img/icons/redcircle.png)';
      point.style.backgroundSize = 'cover';

      setTimeout(() => {
        endGame();
      }, 100)
    }
  }
}

// class ShapesGame {
//   constructor() {
//     this.imagesBase = `../assets/img/shapes/images/`;
//     this.shadowsBase = `../assets/img/shapes/shadows/`;
//     this.images = ['cat', 'cow', 'dog', 'horse', 'lamb', 'pig', 'turkey'];
//     this.shadows = ['cat-shadow', 'cow-shadow', 'dog-shadow', 'horse-shadow', 'lamb-shadow', 'pig-shadow', 'turkey-shadow'];
//     this.tasksCount = this.images.length;
//     this.count = this.tasksCount;
//     this.DraggedImage = null;
//     this.shiftX = null;
//     this.shiftY = null;
//     this.isDragging = false;
//     this.audioController = new AudioController();
//     this.overlay = new Overlay();
//     this.controlls = new Controlls(this.tasksCount);
//     this.renderShapesPage();

//     this.wrapper = document.querySelector('.wrapper');
//     this.shapes_drag_images = document.querySelector('.shapes_drag_images');
//     this.dragImages = Array.from(document.querySelectorAll('.shape_image'));
//   }

//   startGame() {
//     const dragImages = Array.from(document.querySelectorAll('.shape_image'));

//     dragImages.forEach((image) => {
//       image.addEventListener('mousedown', () => this.Drag_Start());
//     });
//   }

//   Drag_Start(EO) {
//     // началось перетаскивание мячика
//     EO = EO || window.event;
//     this.DraggedImage = EO.target;

//     if (EO.which != 1) return;
//     if (!this.DraggedImage) return;

//     EO.preventDefault();
//     this.DraggedImage.ondragstart = function() {
//       return false;
//     }

//     this.startDragging(this.DraggedImage, EO.pageX, EO.pageY);
//     document.addEventListener('mousemove', () => this.onMouseMove());
//     this.DraggedImage.addEventListener('mouseup', () => this.onMouseUp());
//   }

//   startDragging(element, pageX, pageY) {
//     if (this.isDragging) {
//       return;
//     }
//     this.isDragging = true;

//     this.shiftX = pageX - element.getBoundingClientRect().left;
//     this.shiftY = pageY - element.getBoundingClientRect().top;

//     element.style.position = 'absolute';
//     element.style.cursor = 'pointer';
//     element.style.zIndex = '100';

//     element.style.left = pageX - this.shiftX + 'px';
//     element.style.top = pageY - this.shiftY + 'px';

//     this.shapes_drag_images.replaceChild( this.createShadow(this.shadowsBase, element.id), element );
//     this.wrapper.appendChild(element);
//   }

//   onMouseUp(EO) {
//     EO = EO || window.event;
//     EO.preventDefault();
//     this.finishDrag();
//     document.removeEventListener('mousemove', () => this.onMouseMove());
//     this.DraggedImage.removeEventListener('mouseup', () => this.onMouseUp());
//     this.DraggedImage = null;
//   }

//   onMouseMove(EO) {
//     console.log('mooooving');
//     EO = EO || window.event;
//     EO.preventDefault();

//     this.DraggedImage.style.left = EO.pageX - this.shiftX + 'px';
//     this.DraggedImage.style.top = EO.pageY - this.shiftY + 'px';

//     this.DraggedImage.hidden = true;
//     let elemBelow = document.elementFromPoint(EO.pageX, EO.pageY);
//     this.DraggedImage.hidden = false;

//     if(!elemBelow) return;

//     if ((this.DraggedImage.id + '-shadow') === elemBelow.id) {
//       this.shapes_drag_images.removeChild(document.getElementById(this.DraggedImage.id + '-1'));
//       this.DivDrop(EO, elemBelow);
//     }
//   }

//   DivDrop(EO, elemBelow) {
//       // мячик уронен
//     EO = EO || window.event;
//     EO.preventDefault();
//     if (this.DraggedImage) {
//       this.wrapper.removeChild(this.DraggedImage);
//       elemBelow.src = this.DraggedImage.src;
//       this.audioController.dropSound();
//       this.finishDrag();
//       this.count--;
//       this.controlls.taskIsDone(this.count);
//     }
//   }

//   finishDrag() {
//     if(!this.isDragging) {
//       return;
//     }

//     this.isDragging = false;
//     this.DraggedImage.style.top = parseInt(this.DraggedImage.style.top) + pageYOffset + 'px';
//     this.DraggedImage.style.position = 'absolute';

//     this.DraggedImage = null;

//     document.removeEventListener('mousemove', () => this.onMouseMove());
//     this.DraggedImage.removeEventListener('mouseup', () => this.onMouseUp());
//   }

//   renderShapesPage() {
//     const wrapper = document.querySelector('.wrapper');
//     const shapes_game_wrapper = document.createElement('div');
//     shapes_game_wrapper.className = 'shapes_game_wrapper';

//     const buttons_container = document.createElement('div');
//     buttons_container.className = 'buttons_container';
//     this.controlls.createBackArrow(buttons_container);
//     this.controlls.createTaskCheckPoint(this.tasksCount, buttons_container);
//     shapes_game_wrapper.appendChild( buttons_container );

//     shapes_game_wrapper.appendChild( this.overlay.createOverlay() );

//     const drag_container = document.createElement('div');
//     drag_container.className = 'drag_container';
//     drag_container.appendChild( this.createImage(this.imagesBase, this.images, 'shape_image', 'shapes_drag_images') );
//     shapes_game_wrapper.appendChild(drag_container);

//     const drop_container = document.createElement('div');
//     drop_container.className = 'drop_container';
//     drop_container.appendChild( this.createImage(this.shadowsBase, this.shadows, 'shadow_image', 'shapes_drop_images') );
//     shapes_game_wrapper.appendChild(drop_container);

//     wrapper.appendChild( shapes_game_wrapper );
//   }

//   createImage(base, arr, className, parentClassName) {
//     const parent = document.createElement('div');
//     parent.className = parentClassName;
//     for (var i = 0; i < arr.length; i++) {
//       const img = document.createElement('img');
//       img.id = arr[i];
//       img.src = `${base}${arr[i]}.png`;
//       img.className = className;
//       parent.appendChild(img);
//     }
//     return parent;
//   }

//   createShadow(base, imageId) {
//       const img = document.createElement('img');
//       img.src =`${base}${imageId}-shadow.png`;
//       img.id = `${imageId}-1`;
//       img.className = 'shadow_image';
//     return img;
//   }
// }

// export function initShapesGame() {
//   const shapesGame = new ShapesGame();
//   shapesGame.startGame();
// }
