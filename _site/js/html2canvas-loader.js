// html2canvas CDN loader for bug download
(function() {
    if (!window.html2canvas) {
        var script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
        script.onload = function() {
            window.html2canvasLoaded = true;
        };
        document.head.appendChild(script);
    }
})();
