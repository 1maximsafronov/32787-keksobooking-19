(function () {
  const TIME_DELAY = 500;

  function debounce(cb) {
    let lastTimeout = null;

    return function () {
      let parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, TIME_DELAY);
    };
  }

  window.debounce = debounce;
})();
