document.querySelectorAll('.btn_maps').forEach(button => {
    button.setAttribute('disabled', 'true');
});

//load stories
window.onload = function () {
    let currentIndex = 0;
    let projects = [];

    fetch('data/fun_tography.json')
        .then(response => response.json())
        .then(data => {
            projects = data;
            displayInitialCards();
            createLoadMoreButton();
        })
        .catch(error => console.error('Error fetching portfolio data:', error));

    function displayCard() {
        if (currentIndex < projects.length) {
            const project = projects[currentIndex];
            const container = document.getElementById('stories');
            const card = document.createElement('div');
            card.className = `story ${project.theme}`;
            card.innerHTML = `
                <div class="wrapper">
                    <div class="text">
                        <p class="date">${project.date}</p>
                        <h3>${project.title}</h3>
                        <p class="desc">${project.description}</p>
                    </div>
                    <img class="featured" src="img/maps/${project.main}" alt="${project.title}">
                    <div class="text">
                        <p class="closing">${project.closing}</p>
                    </div>
                    <div class="complements">    
                        ${project.complement_01 ? `<img class="complement" src="img/maps/${project.complement_01}" alt="Map detail">` : ''}
                        ${project.complement_02 ? `<img class="complement" src="img/maps/${project.complement_02}" alt="Map detail">` : ''}
                        ${project.complement_03 ? `<img class="complement" src="img/maps/${project.complement_03}" alt="Map detail">` : ''}
                        ${project.complement_04 ? `<img class="complement" src="img/maps/${project.complement_04}" alt="Map detail">` : ''}
                        ${project.super ? `<img class="featured" src="img/maps/${project.super}" alt="Map alternative">` : ''}
                    </div>
                </div>    
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
        button.innerText = 'Read one more story';
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