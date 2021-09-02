'use strict';
globalThis.PreloadedImagesH = {}; // ключ - имя предзагруженного изображения

export function LoadPageData(file) {//загружаем данные для работы

  let pageIsLoaded = false; //загрузились ли все данные
  let filesLoaded = 0; // кол-во загруж. файлов
  let filesToLoad = null; // количество нужных файлов
  let progress = 0;

  showPreloader();

  $.ajax(`${file}`,
    {
      type: 'GET',
      dataType: 'json',
      cache: false,
      success: Success,
      error: ErrorHandler,
    }
  );

  function Success(data) {
    // console.log('Данные загруженны через AJAX!', data);
    filesToLoad = data.length;
    let percent = 100 / filesToLoad;
    data.forEach(item => {
      preloadImage(item);
      // progress += percent;
      // console.log(progress);
      // document.getElementById('load_perc').innerText =`${Math.round(progress)}%`;
      filesLoaded++;
    })
    count();
    showPreloader();

    function count() {
      do {
        progress += percent;
        // console.log(progress);
        document.getElementById('load_perc').innerText =`${Math.round(progress)}%`;
      } while (Math.round(progress) % 2 != 0);

      if (Math.round(progress) < 100) {
        setTimeout(count);
      }
    }
  }

  function ErrorHandler(jqXHR, StatusStr, ErrorStr) {
    alert(StatusStr + ' ' + ErrorStr);
  }

  function preloadImage(FN) {
    if (FN in globalThis.PreloadedImagesH) return;// если такое изображение уже предзагружалось - ничего не делаем
    let image = new Image();// предзагружаем - создаём невидимое изображение
    image.src = FN;
    globalThis.PreloadedImagesH[FN] = true; // запоминаем, что изображение уже предзагружалось
  }

  function showPreloader() {
    if (!pageIsLoaded) {
      document.body.appendChild( createPreloader() );
      pageIsLoaded = true;
    }
    if (filesToLoad === filesLoaded) {
      hidePreloader();
    }
  }

  function hidePreloader() {
    let preloader = document.getElementById('preloader');
    setTimeout(() => {
      if (!preloader.classList.contains('hide')) {
        preloader.classList.add('hide');
        setTimeout(() => {
          document.body.removeChild(preloader);
        }, 400);
      }
    }, 600);
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

