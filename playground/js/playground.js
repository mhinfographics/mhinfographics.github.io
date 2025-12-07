//load stories
window.onload = function () {
    menuCheck();
    let currentIndex = 0;
    let projects = [];

    fetch('data/playground.json')
        .then(response => response.json())
        .then(data => {
            projects = data;
            displayInitialCards();
            createLoadMoreButton();
        })
        .catch(error => console.error('Error fetching playground data:', error));

    function displayCard() {
        if (currentIndex < projects.length) {
            const project = projects[currentIndex];
            const container = document.getElementById('stories');
            const card = document.createElement('div');
            card.className = `story`;
            card.innerHTML = `
                <a href="${project.link}">
                    <div class="wrapper" id="proj-id_${project.sequence}">
                        <div class="counter"><p>Playground&ensp;<span>–Nº${project.sequence}</span></p></div>
                        ${project.thumbnail ? `<div class="visual" style="background-image: url('${project.thumbnail}')"></div>` : ''}
                        <div class="text">
                            <p class="date">${project.date}</p>
                            <h3>${project.title}</h3>
                            <p class="desc">${project.description}</p>
                        </div>
                    </div>
                </a    
            `;
            container.appendChild(card);
            currentIndex++;
        }
    }

    function displayInitialCards() {
        for (let i = 0; i < 2; i++) {
            displayCard();
        }
    }

    function createLoadMoreButton() {
        const container = document.getElementById('moreStories');
        const button = document.createElement('button');
        button.className = 'load_more';
        button.innerText = 'Load more articles';
        button.onclick = function () {
            displayCard();
            if (currentIndex >= projects.length) {
                button.disabled = true;
                button.style.display = 'none';
            }
        };
        container.appendChild(button);
    }
};

function menuCheck() {
    document.querySelectorAll('.btn_playground').forEach(button => {
        button.setAttribute('disabled', 'true');
        button.classList.add('disabled');
    });
}