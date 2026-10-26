/* Image magnifier glass for any <img> inside .map_wrapper */
(function () {
  var MIN_ZOOM = 2;
  var GLASS_CLASS = "img-magnifier-glass";

  /* A WeakSet is used instead of a data-attribute because other scripts
     rebuild the page with innerHTML, which would preserve the attribute
     while discarding the listeners attached to the old nodes. */
  var handled = new WeakSet();

  function magnify(img) {
    if (handled.has(img)) return;
    var wrapper = img.closest(".map_wrapper");
    if (!wrapper) return;
    handled.add(img);

    img.setAttribute("draggable", "false");

    wrapper.querySelectorAll("." + GLASS_CLASS).forEach(function (old) {
      old.remove();
    });

    var glass = document.createElement("div");
    glass.className = GLASS_CLASS;
    glass.setAttribute("aria-hidden", "true");
    wrapper.appendChild(glass);

    var zoom = MIN_ZOOM;
    var bw = 0;

    function refresh() {
      var w = img.offsetWidth;
      var h = img.offsetHeight;
      if (!w || !h) return;
      zoom = Math.max(MIN_ZOOM, (img.naturalWidth || w) / w);
      bw = parseFloat(getComputedStyle(glass).borderLeftWidth) || 0;
      glass.style.backgroundImage = "url('" + img.src + "')";
      glass.style.backgroundSize = w * zoom + "px " + h * zoom + "px";
    }

    function getCursorPos(e) {
      var point = e.touches && e.touches.length ? e.touches[0] : e;
      var rect = img.getBoundingClientRect();
      return { x: point.clientX - rect.left, y: point.clientY - rect.top };
    }

    function moveMagnifier(e) {
      var w = img.offsetWidth;
      var h = img.offsetHeight;
      if (!w || !h) return;

      if (e.cancelable && e.type.indexOf("touch") === 0) e.preventDefault();

      var pos = getCursorPos(e);
      if (pos.x < 0 || pos.y < 0 || pos.x > w || pos.y > h) {
        hide();
        return;
      }

      if (glass.style.display !== "block") {
        glass.style.display = "block";
        if (!glass.style.backgroundSize) refresh();
      }

      var gw = glass.offsetWidth / 2;
      var gh = glass.offsetHeight / 2;
      var x = Math.min(Math.max(pos.x, gw / zoom), w - gw / zoom);
      var y = Math.min(Math.max(pos.y, gh / zoom), h - gh / zoom);

      glass.style.left = img.offsetLeft + x - gw + "px";
      glass.style.top = img.offsetTop + y - gh + "px";
      glass.style.backgroundPosition =
        "-" + (x * zoom - gw + bw) + "px -" + (y * zoom - gh + bw) + "px";
    }

    function hide() {
      glass.style.display = "none";
    }

    if (img.complete && img.naturalWidth) refresh();
    img.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    ["mousemove", "touchstart", "touchmove"].forEach(function (evt) {
      img.addEventListener(evt, moveMagnifier, { passive: false });
    });
    img.addEventListener("dragstart", function (e) {
      e.preventDefault();
    });
    img.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });
    img.addEventListener("mouseenter", refresh);
    wrapper.addEventListener("mouseleave", hide);
    img.addEventListener("touchend", hide);
    img.addEventListener("touchcancel", hide);
  }

  function init() {
    document.querySelectorAll(".map_wrapper img").forEach(magnify);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  /* Re-attach when other scripts inject or rebuild the page content */
  if (window.MutationObserver) {
    new MutationObserver(init).observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }
})();
