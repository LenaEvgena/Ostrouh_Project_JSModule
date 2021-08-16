'use strict';

const AjaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";

function AJAXStorage() {
  let UpdatePassword = Math.random();

  const self = this;
  self.hash = {};

  self.addValue = function(userID, Hash) {
    // self.hash[key] = value;
    self.hash[userID] = Hash;
    lockStorage();
  };

  self.getValue = function(key) {
    return self.hash[key];
  };

  self.getKeys = function() {
    return Object.keys(self.hash);
  };

  update();

  function update() {
    $.ajax({
      url: AjaxHandlerScript,
      type: 'POST',
      datatype: 'json',
      data: {
        f: 'READ',
        n: 'OSTROUH_PROJ_RECORDS'},
      cache: false,
      success: readReady,
      error: errorHandler
    })
  };

  function readReady(data) {
    if (data) {
      self.hash = JSON.parse(data.result);
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
        n: 'OSTROUH_PROJ_RECORDS',
        v: JSON.stringify(self.hash)},
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
        n: 'OSTROUH_PROJ_RECORDS',
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
        n: 'OSTROUH_PROJ_RECORDS',
        p: UpdatePassword,
        v: JSON.stringify(self.hash)},
      cache: false,
      success: dataLoaded,
      error: errorHandler
    })
  };

  function dataLoaded(data) {
    console.log("Данные загружены:" + data.result);
    // let records = [];
    // if (data.result != '') {
    //   records = JSON.parse(data.result);
    // }
    // if (!records.length) {
    //   records = [];
    // }
    // let userName = document.getElementById('check_name').value;

  }

  function errorHandler(jqXHR, StatusStr, ErrorStr) {
    alert(StatusStr + ' ' + ErrorStr);
  };
}

const gameStorage = new AJAXStorage();

export function addPlayer(userID, time = 0, flip = 0) {
  let playerName = document.getElementById('check_name').value.trim() || '';
  //if(!playerName)...
  globalThis.userName = playerName;
  let usedID = gameStorage.getKeys();
  userID = usedID.length + 1;
  globalThis.userID = userID;
  let totalTime = time;
  let flips = flip;
  let Hash = {};
  Hash.userName = playerName;

  if (playerName) {
    Hash.totalTime = totalTime;
    Hash.flips = flips;
    return gameStorage.addValue(userID, Hash);
  }
}

export function addPlayerData(userID, time, flip) {
  userID = globalThis.userID;
  let Hash = gameStorage.getValue(userID);
  let totalTime = time + Hash.totalTime;
  let flips = flip + Hash.flips;

  Hash.totalTime = totalTime;
  Hash.flips = flips;
  return gameStorage.addValue(userID, Hash);
}

export function showPlayersList() {
  let showInfo = gameStorage.getKeys();
  let entries = Object.entries(gameStorage.hash);
  let resultHTML = '';

  if (showInfo) {
    for (let i = 0; i < entries.length; i++) {
      let hash = entries[i];
      let print1 = 'Player: ' + hash[1].userName;
      let print2 = 'Total time: ' + hash[1].totalTime;
      let print3 = 'Flips: ' + hash[1].flips;
      // let print1 = 'Player ' + hash[1].userName + '<br>';
      // let print2 = 'Total time ' + hash[1].totalTime + '<br>';
      // let print3 = 'Flips ' + hash[1].flips + '<br>';

      resultHTML += `
      ${(i + 1)} ${print1} ${print2} ${print3}`;
    }
  } else {
    resultHTML = 'The list is empty';
  }
  console.log(resultHTML);

  // alert(resultHTML);
  // document.getElementById('message').innerHTML = resultHTML;
}
    // <div id="message" class="drink-info"></div>
