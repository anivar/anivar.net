// Copy-to-clipboard with progressive enhancement: site renders fully without JS.
(function () {
  if (!navigator.clipboard) return;
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var src = btn.previousElementSibling || btn.parentElement.querySelector('[data-quote]');
      if (!src) return;
      var text = src.innerText.trim();
      navigator.clipboard.writeText(text).then(function () {
        var prev = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = prev; }, 1400);
      });
    });
  });
  document.querySelectorAll('[data-copy-target="prev"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var src = btn.previousElementSibling;
      if (!src) return;
      navigator.clipboard.writeText(src.innerText.trim()).then(function () {
        var prev = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = prev; }, 1400);
      });
    });
  });
})();
