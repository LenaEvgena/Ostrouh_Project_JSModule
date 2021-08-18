'use strict';
import * as SPA from './SPA.js';
import { Overlay } from './Overlay.js';

const AjaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";

function AJAXStorage() {
  let UpdatePassword = Math.random();

  const self = this;
  self.userHash = {};

  self.addValue = function(userID, userHash) {
    self.userHash[userID] = userHash;
    lockStorage();
  };

  self.getValue = function(key) {
    return self.userHash[key];
  };

  self.getKeys = function() {
    return Object.keys(self.userHash);
  };

  update();

  function update() {
    $.ajax({
      url: AjaxHandlerScript,
      type: 'POST',
      datatype: 'json',
      data: {
        f: 'READ',
        n: 'OSTROUH_RECORDS'},
      cache: false,
      success: readReady,
      error: errorHandler
    })
  };

  function readReady(data) {
    if (data) {
      self.userHash = JSON.parse(data.result);
      console.log(data.result);
    } else {
      initStorage();
    }
  };

  function initStorage() {
    $.ajax({
      url: AjaxHandlerScript,
      type: 'POST',
      datatype: 'json',
      data: {
        f: 'INSERT',
        n: 'OSTROUH_RECORDS',
        v: JSON.stringify(self.userHash)},
      cache: false,
      success: dataLoaded,
      error: errorHandler
    })
  };

  function lockStorage() {
    $.ajax({
      url: AjaxHandlerScript,
      type: 'POST',
      datatype: 'json',
      data: {
        f: 'LOCKGET',
        n: 'OSTROUH_RECORDS',
        p: UpdatePassword},
        cache: false,
        success: updateStorage,
        error: errorHandler
    })
  };

  function updateStorage() {
    $.ajax({
      url: AjaxHandlerScript,
      type: 'POST',
      datatype: 'json',
      data: {
        f: 'UPDATE',
        n: 'OSTROUH_RECORDS',
        p: UpdatePassword,
        v: JSON.stringify(self.userHash)},
      cache: false,
      success: dataLoaded,
      error: errorHandler
    })
  };

  function dataLoaded(data) {
    console.log("Данные загружены:" + data.result);
  }

  function errorHandler(jqXHR, StatusStr, ErrorStr) {
    alert(StatusStr + ' ' + ErrorStr);
  };
}

const gameStorage = new AJAXStorage();
const overlay = new Overlay();
let userID;
let userHash = {};

export function addPlayer(userID, totalTime = 0, totalFlips = 0, totalScore = 0) {
  let playerName = document.getElementById('check_name').value.trim() || 'unknown';

  let usedID = gameStorage.getKeys();
  userID = usedID.length + 1;
  localStorage.setItem('userID', userID);
  localStorage.setItem('userName', playerName);

  userHash = {};
  userHash.userName = localStorage.userName;

  if (playerName) {
    userHash.totalScore = totalScore;
    userHash.totalTime = totalTime;
    userHash.totalFlips = totalFlips;

    userHash.easy = {};
    userHash.easy.score = 0;
    userHash.easy.time = 0;
    userHash.easy.flips = 0;

    userHash.medium = {};
    userHash.medium.score = 0;
    userHash.medium.time = 0;
    userHash.medium.flips = 0;

    userHash.hard = {};
    userHash.hard.score = 0;
    userHash.hard.time = 0;
    userHash.hard.flips = 0;

    return gameStorage.addValue(userID, userHash);
  }
}

export function addPlayerData(userID, levelID, _time, _flips) {
  checkUser();
  userID = localStorage.userID;
  userHash = gameStorage.getValue(userID) || {};

  let _score;
  let time = _time;
  let level = levelID.split('_')[2];

  switch (level) {
    case 'easy':
      if (time <= 20) _score = 30;
      if (time > 20 && time <= 30) _score = 15;
      if (time > 35) _score = 5;
      userHash.easy.score += _score;
      userHash.easy.time += _time;
      userHash.easy.flips += _flips;
      break;

    case 'medium':
      if (time <= 40) _score = 30;
      if (time > 40 && time <= 50) _score = 15;
      if (time > 50) _score = 5;
      userHash.medium.score += _score;
      userHash.medium.time += _time;
      userHash.medium.flips += _flips;
      break;

    case 'hard':
      if (time <= 70) _score = 30;
      if (time > 70 && time <= 80) _score = 20;
      if (time > 80) _score = 5;
      userHash.hard.score += _score;
      userHash.hard.time += _time;
      userHash.hard.flips += _flips;
      break;
  }
  userHash.totalScore += _score;
  userHash.totalTime += _time;
  userHash.totalFlips += _flips;

  document.querySelector('.score_message').textContent = `+${_score}`;
  return gameStorage.addValue(userID, userHash);
}

export function showPlayersList() {
  let showInfo = gameStorage.getKeys();
  let entries = Object.entries(gameStorage.userHash).reverse();

  if (entries.length > 10) {
    entries = entries.slice(0, 10);
  }

  let resultHTML = `
    <table>
      <tr>
        <th></th>
        <th>Player</th>
        <th></th>
        <th>Score</th>
        <th>Time</th>
        <th>Flips</th>
      </tr>`;

  if (showInfo) {
    for (let i = 0; i < entries.length; i++) {
      let player = entries[i][1];
      resultHTML += `
        <tr>
          <td>${(i + 1)}.</td>
          <td>${EscapeHTML(player.userName)}</td>
          <td>Total</td>
          <td>${player.totalScore}</td>
          <td>${player.totalTime}</td>
          <td>${player.totalFlips}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>Easy</td>
          <td>${player.easy.score}</td>
          <td>${player.easy.time}</td>
          <td>${player.easy.flips}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>Medium</td>
          <td>${player.medium.score}</td>
          <td>${player.medium.time}</td>
          <td>${player.medium.flips}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>Hard</td>
          <td>${player.hard.score}</td>
          <td>${player.hard.time}</td>
          <td>${player.hard.flips}</td>
        </tr>`;
    }
    resultHTML += `</table>`;
  } else {
    resultHTML = 'The list is empty';
  }

  showScoreTable(resultHTML);
}

function showScoreTable(result) {
  const list = document.querySelector('.list');
  list.classList.toggle('visible');
  document.querySelector('.list_table').innerHTML = result;

  list.addEventListener('click', (e) => {
    const isClickInside = document.querySelector('.list_modal').contains(e.target);
    if (isClickInside) {
      return;
    } else {
      list.classList.remove('visible');
    }
  });
}

function EscapeHTML(text) {
  if (!text)
    return text;
  text = text.toString()
    .split("&").join("&amp;")
    .split("<").join("&lt;")
    .split(">").join("&gt;")
    .split('"').join("&quot;")
    .split("'").join("&#039;");
  return text;
}

export function checkUser() {
  if (localStorage.userID) {
    userID = Number(localStorage.userID);
    userHash = gameStorage.getValue(userID);
    console.log(userHash);
  } else{
    loadModal();
  }
}

function loadModal() {
  overlay.createAuthorizationModal();
  document.querySelector('.modal_overlay').classList.add('visible');
  document.querySelector('#check_button').addEventListener('click', () => {
    askAndSetName();
  });
}

function askAndSetName() {
  setUser(() => {
    document.querySelector('.modal_overlay').classList.remove('visible');
    setTimeout(() => {
      document.querySelector('.wrapper').removeChild(document.querySelector('.modal_overlay'));
    }, 300);
  });
}

export function setUser(callback) {
  if (document.getElementById('check_name').value === '') {
    document.getElementById('check_name').placeholder = 'Please, enter your name :)';
    setTimeout(() => {
      document.getElementById('check_name').placeholder = 'Enter your name';
    }, 500);
  } else {
    addPlayer();
    setTimeout(() => {
      callback();
    }, 100);
  }
}
