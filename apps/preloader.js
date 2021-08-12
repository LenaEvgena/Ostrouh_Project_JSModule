'use strict';

export function showPreloader() {
  document.body.appendChild( createPreloader() );
  // document.body.addEventListener('load', hidePreloader());
  window.onload = hidePreloader();
}

function createPreloader() {
  const preloader = document.createElement('div');
  preloader.className = 'preloader';
  preloader.id = 'preloader';
  const loader = document.createElement('div');
  loader.className = 'loader';
  const loadPerc = document.createElement('span');
  loadPerc.id = 'load_perc';
  // loadPerc.textContent = '0%';

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

function hidePreloader() {
  setTimeout(() => {
  let preloader = document.getElementById('preloader');
    if (!preloader.classList.contains('hide')) {
      preloader.classList.add('hide');
      setTimeout(() => {
        document.body.removeChild(preloader);
      }, 500);
    }
  }, 1000);
}
