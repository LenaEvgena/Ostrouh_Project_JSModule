'use strict';

const AjaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";

function AJAXStorage() {
  let UpdatePassword = Math.random();

  const self = this;
  self.hash = {};

  self.addValue = function(userID, Hash) {
    // self.hash[key] = value;
    self.hash[userID] = Hash;
    lockStorage();
  };

  // self.deleteValue = function(key) {
  //   delete self.hash[key];
  //   lockStorage();
  // };

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
        n: 'OSTROUH_PROJECT_RECORDS'},
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
        n: 'OSTROUH_PROJECT_RECORDS',
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
        n: 'OSTROUH_PROJECT_RECORDS',
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
        n: 'OSTROUH_PROJECT_RECORDS',
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

export function addPlayerData(userID, time = 0, flip = 0) {
  let totalTime = time;
  let flips = flip;
  let Hash = {};

  Hash.totalTime = totalTime;
  Hash.flips = flips;
  return gameStorage.addValue(userID, Hash);
}

    // function showDrinkInfo() {
    //   var drinkName = prompt('Введите название напитка:').toLowerCase().trim();
    //   var getDrinkInfo = (drinkName) ? gameStorage.getValue(drinkName) : 0;
    //   var resultHTML = '';

    //   if (getDrinkInfo) {
    //     var print1 = 'Напиток: ' + drinkName + '<br>';
    //     var print2 = 'Алкогольный: ' + getDrinkInfo.alcohol + '<br>';
    //     var print3 = 'Рецепт приготовления: ' + getDrinkInfo.recipe + '<br>';

    //     resultHTML = print1 + print2 + print3;
    //   } else {
    //     resultHTML = 'Ошибка! Нет такого напитка';
    //   }
    //   document.getElementById('message').innerHTML = resultHTML;
    // }


export function showPlayersList() {
  let showInfo = gameStorage.getKeys();
  console.log(showInfo);
  console.log(globalThis.userID);

  let resultHTML = '';

  if (showInfo) {
    for (let i = 0; i < showInfo.length; i++) {
      let print1 = 'Player ' + gameStorage.getValue(showInfo.playerName) + '<br>';
      let print2 = 'Total time ' + showInfo.totalTime + '<br>';
      let print3 = 'Flips ' + showInfo.flips + '<br>';

      resultHTML += `${(i + 1)} ${print1} ${print2} ${print3}`;
    }
  } else {
    resultHTML = 'The list is empty';
  }

  console.log(resultHTML);

  // alert(resultHTML);
  // document.getElementById('message').innerHTML = resultHTML;
}

    // <input type='button' value='Добавить напиток' onclick='addDrink()'>
    // <input type='button' value='Показать информацию о напитке' onclick='showDrinkInfo()'>
    // <input type='button' value='Показать меню напитков' onclick='showPlayersList()'>
    // <div id="message" class="drink-info"></div>
