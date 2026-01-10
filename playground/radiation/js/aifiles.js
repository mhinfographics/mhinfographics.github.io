document.addEventListener('DOMContentLoaded', function() {
    const containers = document.querySelectorAll('[data-embed]');
    containers.forEach(container => {
        const contentName = container.dataset.embed;
        if (contentName) {
            fetch(`graphics/${contentName}.html`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok for ${contentName}.html`);
                    }
                    return response.text();
                })
                .then(data => {
                    container.innerHTML = data;
                })
                .catch(error => console.error(`Error loading ${contentName}.html:`, error));
        }
    });
});
