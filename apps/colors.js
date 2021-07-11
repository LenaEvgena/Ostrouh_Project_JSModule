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
  let bgMusic = new AudioController;
  bgMusic.stopMusic();

  const wrapper = document.querySelector('.wrapper');
  wrapper.appendChild( createColorsPage() );

  // document.querySelector('.colors_game_wrapper').style.display = 'flex';//после двух повторов без этого не работает
  const back_arrow = document.querySelector('.back_arrow');
  back_arrow.addEventListener('click', () => turnBack());


  let dragImages = Array.from(document.querySelectorAll('.drag_image'));
  let drag_container = document.querySelector('.colors_drag_images');
  let dropContainers = Array.from(document.querySelectorAll('.image_container'));

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
    container.addEventListener('mouseover', DivDragOver);

  });

  setTimeout(() => {
    getElementPos(dragImages);
  }, 500);


  function Drag_Start(EO) {
    // началось перетаскивание мячика
    EO = EO || window.event;
    if (EO.which != 1) return;
    DraggedImage = EO.target;

    DragShiftX = EO.pageX - DraggedImage.x;
    DragShiftY = EO.pageY - DraggedImage.y;

    DraggedImage.style.cursor = 'grabbing';
    DraggedImage.style.zIndex = '1000';
    document.addEventListener('mousemove', Drag_Move);
    drag_container.addEventListener('mouseup', Drag_Stop);
  }

  function Drag_Move(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    DraggedImage.style.left = (EO.pageX - DragShiftX) + "px";
    DraggedImage.style.top = (EO.pageY - DragShiftY) + "px";

    DraggedImage.hidden = true;
    let elemBelow = document.elementFromPoint(EO.clientX, EO.clientY);
    DraggedImage.hidden = false;

    if(!elemBelow) return;
    if (DraggedImage.id === elemBelow.id) {
      DivDrop();
    }
  }

  function Drag_Stop(EO) {
    // закончилось перетаскивание мячика (неважно куда он уронен)
    EO = EO || window.event;
    EO.preventDefault();
    DraggedImage.style.cursor = 'auto';
    DraggedImage.style.zIndex = '1';
    document.removeEventListener('mousemove', Drag_Move);
    drag_container.removeEventListener('mouseup', Drag_Stop);
    DraggedImage = null;
  }

  function DivDrop(EO) {
    // мячик уронен
    EO = EO || window.event;
    EO.preventDefault();
    if (DraggedImage){
      drag_container.removeChild(DraggedImage);
      DraggedImage.style.opacity = 0;
      Drag_Stop();
      taskIsDone();
    }
  }

  function DivDragEnter(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    EO.currentTarget.style.transform = 'scale(1.1)';
  }
  function DivDragOver(EO) {
    EO = EO || window.event;
    EO.preventDefault();
  }
  function DivDragLeave(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    EO.currentTarget.style.transform = 'scale(1.0)';
  }

  function getElementPos(arr) {
    let X = [];
    let Y = [];
    for (let i = 0; i < arr.length; i++) {
      X.push(arr[i].offsetLeft);
      Y.push(arr[i].offsetTop);
    }
    for (let i = 0; i < arr.length; i++) {
      arr[i].style.position = 'absolute';
      arr[i].style.left = X[i] + 'px';
      arr[i].style.top = Y[i] + 'px';
    }
    return {left: X, top: Y};
  }

  function turnBack() {
    // const colors_game_wrapper = document.querySelector('.colors_game_wrapper');
    // colors_game_wrapper.style.display = 'none';
    document.querySelector('.colors_game_wrapper').style.display = 'none';
    back_arrow.style.transform = 'scale(0.9)';
    document.querySelector('.menu_wrapper').style.display = 'flex';
  }

  function createColorsPage() {
    const colors_game_wrapper = document.createElement('div');
    colors_game_wrapper.className = 'colors_game_wrapper';
    const colors_drag_images = document.createElement('div');
    colors_drag_images.className = 'colors_drag_images';
    const colors_drop_images = document.createElement('div');
    colors_drop_images.className = 'colors_drop_images';

    colors_game_wrapper.appendChild( createBackArrow() );
    colors_game_wrapper.appendChild( createTaskCheckPoint(4) );
    colors_drag_images.appendChild( createColorGameImage('redcar', 'drag_image', 'red') );
    colors_drag_images.appendChild( createColorGameImage('greencar', 'drag_image', 'green') );
    colors_drag_images.appendChild( createColorGameImage('bluecar', 'drag_image', 'blue') );
    colors_drag_images.appendChild( createColorGameImage('yellowcar', 'drag_image', 'yellow') );

    colors_drop_images.appendChild( createColorBoxDiv('bluebox', 'blue', 'drop_image') );
    colors_drop_images.appendChild( createColorBoxDiv('redbox', 'red', 'drop_image') );
    colors_drop_images.appendChild( createColorBoxDiv('yellowbox', 'yellow', 'drop_image') );
    colors_drop_images.appendChild( createColorBoxDiv('greenbox', 'green', 'drop_image') );
    colors_game_wrapper.appendChild( createOverlay() );

    colors_game_wrapper.appendChild(colors_drag_images);
    colors_game_wrapper.appendChild(colors_drop_images);

    return colors_game_wrapper;
  }

  function createColorBoxDiv(image, id, imgClassName) {
    const box = document.createElement('div');
    box.className = 'image_container';
    box.id = id;
    box.appendChild( createColorGameImage(image, imgClassName, id) );
    return box;
  }

  function createColorGameImage(image, className, id) {
    const img = document.createElement('img');
    img.id = id;
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
    overlay.style.display = 'none';
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

  // function animateBalloons() {
  //   let balloons = document.querySelectorAll('#balloons span');

  //   let start = new Date();
  //   let timer = setInterval(() => {
  //     let timePassed = Date.now() - start;
  //     if (timePassed >= 7000) {
  //       clearInterval(timer);
  //       return;
  //     }
  //     balloons.forEach(balloon => {
  //       balloon.style.top += timePassed/5 + 'px';
  //     })
  //   }, 1000/60)
  // }

  let tasksCount = 4;
  function taskIsDone() {
    tasksCount--;
    const tasksPointsDiv = document.querySelector('#tasksPoints');
    let points = tasksPointsDiv.children;
    let n = tasksCount;
    let point = points[n];
    const drop = new Audio('../assets/sounds/drop1.mp3');
    const hooray = new Audio('../assets/sounds/hooray.mp3');

    if (tasksCount != 0) {
      drop.play();

      if (point.id != 'done') {
        point.style.background = 'url(../assets/img/icons/redcircle.png)';
        point.style.backgroundSize = 'cover';
        point.id = 'done';
        point = points[n--];
      } else {
        point = point.nextSibling;
        point.style.background = 'url(../assets/img/icons/redcircle.png)';
        point.style.backgroundSize = 'cover';
        point.id = 'done';
      }

    } else {
      point.style.background = 'url(../assets/img/icons/redcircle.png)';
      point.style.backgroundSize = 'cover';
      point.id = 'done';
      drop.play();
      setTimeout(() => {
        document.querySelector('.overlay').style.display = 'flex';
        hooray.play();
        animateBalloons();

        setTimeout(() => {
          document.querySelector('.colors_game_wrapper').style.display = 'none';
          document.querySelector('.menu_wrapper').style.display = 'flex';
        }, 10000)//10000


      }, 100);
    }
  }

  // function appendImageToBlock() {
  //   // let childrenCount = 4;
  //   let arrayToPop = Array.from(createRandomToys());
  //   let dragArray = [];
  //   const colors_drag_images = Array.from(document.querySelector('.colors_drag_images'));

  //   for (let j = arrayToPop.length - 1; j >= 0; j--) {
  //     let img = arrayToPop[j];
  //     colors_drag_images.appendChild(img);
  //     dragArray.push(img);
  //     arrayToPop.pop();
  //   }
  //   console.log('dragArray', dragArray);
  //   console.log('arrayToPop2', arrayToPop);

  //   return dragArray;
  // }

  // function createRandomToys() {
  //   let toys = [];
  //   const toysImages = ['bluecar', 'blueduck', 'blueplane', 'greencar', 'greenduck', 'greenplane',
  //   'redcar', 'redduck', 'redplane', 'yellowcar', 'yellowduck', 'yellowplane'];

  //   for (var i = 0; i < toysImages.length; i++) {
  //     const img = document.createElement('img');
  //     img.src = `../assets/img/colors/${toysImages[i]}.png`;
  //     img.className = 'drag_image';

  //     let str = toysImages[i];
  //     if (str.includes('red')) {
  //       img.id = 'red';
  //     } else if (str.includes('blue')) {
  //       img.id = 'blue';
  //     } else if (str.includes('yellow')) {
  //       img.id = 'yellow';
  //     } else if (str.includes('green')) {
  //       img.id = 'green';
  //     }
  //     toys.push(img);
  //     shuffleImages(toys);
  //   }
  //   return toys;
  // }

  // function shuffleImages(array) {
  //   array.sort(() => Math.random() - 0.5);
  // }
}
