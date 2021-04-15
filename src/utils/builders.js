export default {
  debounce: () => {
    let timeout = null;
    return function (fnc, delayMs) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fnc();
      }, delayMs || 500);
    };
  }
}