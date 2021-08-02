'use strict';

import { AudioController } from './AudioController.js';
// import { Overlay } from './Overlay.js';

const audio = new AudioController();

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

// function taskIsDone() {
//   colorTasksCount--;
//   const tasksPointsDiv = document.querySelector('#tasksPoints');
//   let points = tasksPointsDiv.children;
//   let n = colorTasksCount;
//   let point = points[n];

//   if (colorTasksCount != 0) {
//     audio.dropSound();
//     point.style.background = 'url(../assets/img/icons/redcircle.png)';
//     point.style.backgroundSize = 'cover';
//   } else {
//     audio.dropSound();
//     point.style.background = 'url(../assets/img/icons/redcircle.png)';
//     point.style.backgroundSize = 'cover';

//     setTimeout(() => {
//       document.querySelector('.overlay').classList.add('visible');
//       audio.hooraySound();
//       tapBalloons();

//       setTimeout(() => {
//         turnBack();
//       }, 8000)
//     }, 100);
//   }
// }
      // audio.dropSound();
      // audio.dropSound();

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
