'use strict';

export class Controlls {
  constructor(count) {
    this.count = count;
  }

  turnBack(callback) {
    callback();
  }

  createBackArrow(parent, callback) {
    const back_arrow = document.createElement('img');
    back_arrow.src = '../assets/img/other/arrow_back.png'
    back_arrow.className = 'back_arrow';
    back_arrow.addEventListener('click', () => {
      back_arrow.style.transform = 'scale(0.9)';
      back_arrow.style.cursor = 'pointer';
      globalThis.audioController.clickSound();
      this.turnBack(callback);
    });
    parent.appendChild(back_arrow);
  }

  createHintButton(parent) {
    const hint_button = document.createElement('img');
    hint_button.src = '../assets/img/other/hint3.png'
    hint_button.className = 'hint_button';
    parent.appendChild(hint_button);
  }

  createMusicButton(parent, controller) {
    const musicButton = document.createElement('img');
    musicButton.src = '../assets/img/other/musicbutton.png'
    musicButton.className = 'music_button';

    musicButton.addEventListener('click', () => {
      musicButton.classList.toggle('clicked');
      controller.toggleBgMusic();
      this.updateMusicButton();
    });
    parent.appendChild(musicButton);
  }

  updateMusicButton() {
    const musicButton = document.querySelector('.music_button');
    if(globalThis.isPaused) {
      musicButton.classList.add('clicked');
    } else {
      musicButton.classList.remove('clicked');
    }
  }

  createTaskCheckPoint(count, parent) {
    const tasksPointsDiv = document.createElement('div');
    tasksPointsDiv.id = 'tasksPoints';
    for (let i = 0; i < count; i++) {
      const taskPoint = document.createElement('span');
      taskPoint.style.animationDelay = `${ i / 10 }s`;
      taskPoint.id = 'point';
      taskPoint.style.background = 'url(../assets/img/icons/emptycircle.png)';
      taskPoint.style.backgroundSize = 'cover';
      tasksPointsDiv.appendChild(taskPoint);
    }
    parent.appendChild(tasksPointsDiv);
  }

  taskIsDone(count) {
    const points = Array.from(document.querySelectorAll('#point'));
    let point = points[count];

    if (count != 0) {
      point.style.background = 'url(../assets/img/icons/redcircle.png)';
      point.style.backgroundSize = 'cover';
    } else {
      point.style.background = 'url(../assets/img/icons/redcircle.png)';
      point.style.backgroundSize = 'cover';
    }
  }

  createScoreButton(parent, callback) {
    const score_button = document.createElement('img');
    score_button.src = '../assets/img/other/score.png'
    score_button.className = 'score_button';
    score_button.addEventListener('click', () => {
      globalThis.audioController.clickSound();
      callback();
    });
    parent.appendChild(score_button);
    parent.appendChild(this.createScoreList());
  }

  createScoreList() {
    const list = document.createElement('div');
    list.className = 'list';
    const modal = document.createElement('div');
    modal.className = 'list_modal';
    const table = document.createElement('div');
    table.className = 'list_table';

    modal.appendChild(table);
    list.appendChild(modal);
    return list;
  }
}
