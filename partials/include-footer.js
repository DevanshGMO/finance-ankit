/**
 * include-footer.js
 * Usage:
 *   <div data-include="footer"></div>
 *   <script src="/assets/js/include-footer.js" data-footer-src="/partials/footer.html"></script>
 * - Place footer.html at the path given in data-footer-src (default: /partials/footer.html)
 * - Works on any page; injects the footer HTML into every element with data-include="footer"
 */
(function () {
  var placeholders = document.querySelectorAll('[data-include="footer"]');
  if (!placeholders.length) return;

  var thisScript = document.currentScript;
  var footerSrc = (thisScript && thisScript.getAttribute('data-footer-src')) || '/partials/footer.html';

  function inject(html) {
    placeholders.forEach(function (el) {
      el.innerHTML = html;
    });
  }

  fetch(footerSrc, { credentials: 'same-origin' })
    .then(function (res) { return res.text(); })
    .then(inject)
    .catch(function (err) {
      console.error('Footer include failed:', err);
    });
})();