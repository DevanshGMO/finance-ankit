// js/include-header.js
(function () {
  function loadHeader() {
    var placeholders = document.querySelectorAll('[data-include="header"]');
    if (!placeholders.length) return;

    var thisScript =
      document.currentScript ||
      (function () {
        var scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
      })();

    var headerSrc =
      (thisScript && thisScript.getAttribute('data-header-src')) ||
      'partials/header.html';

    fetch(headerSrc, { credentials: 'same-origin' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status + ' for ' + headerSrc);
        return res.text();
      })
      .then(function (html) {
        placeholders.forEach(function (el) {
          el.innerHTML = html;
        });
      })
      .catch(function (err) {
        console.error('Header include failed:', err);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
  } else {
    loadHeader();
  }
})();
