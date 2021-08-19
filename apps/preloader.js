'use strict';

export function LoadPageData(array, numOfFiles) {//загружаем данные для работы

  let pageIsLoaded = false; //загрузились ли все данные
  let filesLoaded = 0; // кол-во загруж. файлов
  let progress = 0;

  showPreloader(numOfFiles);

  for (let j = 0; j < array.length; j++) {
    $.ajax(`${array[j]}`,
      {
        type: 'GET',
        contentType: 'image/png',
        cache: false,
        success: Success,
        complete: Complete,
        error: ErrorHandler,
        xhrFields: {onprogress: Progress}
      }
    );
  }

  function Progress(EO) {
    // console.log(EO);
    // if (EO.lengthComputable) {
      // let percent = Math.round(EO.loaded / EO.total * 100);
      // document.getElementById('load_perc').innerText =`${percent}%`;
      // console.log(percent);
    // }
  }

  function Success() {
    console.log('Данные загруженны через AJAX!');
    filesLoaded++;
  }

  function Complete() { //установить % загрузки в зависимости от количества файлов
    let percent = 100 / numOfFiles;
    progress = progress + percent;
    document.getElementById('load_perc').innerText =`${Math.round(progress)}%`;

    showPreloader(numOfFiles);
  }

  function ErrorHandler(jqXHR, StatusStr, ErrorStr) {
    alert(StatusStr + ' ' + ErrorStr);
  }

  function showPreloader(numOfFiles) {
    if (!pageIsLoaded) {
      document.body.appendChild( createPreloader() );
      pageIsLoaded = true;
    }
    if (numOfFiles === filesLoaded) {
      hidePreloader();
    }
  }

  function hidePreloader() {
    setTimeout(() => {
      let preloader = document.getElementById('preloader');
        if (!preloader.classList.contains('hide')) {
          preloader.classList.add('hide');
          setTimeout(() => {
            document.body.removeChild(preloader);
          }, 300);
        }
    }, 500);
  }

  function createPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.id = 'preloader';
    const loader = document.createElement('div');
    loader.className = 'loader';
    const loadPerc = document.createElement('span');
    loadPerc.id = 'load_perc';
    loadPerc.textContent = '';

    const cssloadPgloading = document.createElement('div');
    cssloadPgloading.id = 'cssload-pgloading';
    const cssloadLoadingwrap = document.createElement('div');
    cssloadLoadingwrap.className = 'cssload-loadingwrap';
    const cssloadBokeh = document.createElement('ul');
    cssloadBokeh.className = 'cssload-bokeh';

    for (let i = 0; i < 4; i++) {
      const li = document.createElement('li');
      cssloadBokeh.appendChild(li);
    }

    preloader.appendChild(loader);
    loader.appendChild(loadPerc);
    preloader.appendChild(cssloadPgloading);
    cssloadPgloading.appendChild(cssloadLoadingwrap);
    cssloadLoadingwrap.appendChild(cssloadBokeh);

    return preloader;
  }
}

