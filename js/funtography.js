//load stories
window.onload = function () {
    menuCheck();
    let currentIndex = 0;
    let projects = [];

    fetch('data/funtography.json')
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
                <div class="wrapper" id="proj-id_${project.sequence}">
                    <div class="text">
                        <p class="date">${project.date}</p>
                        <h3>${project.title}</h3>
                        <p class="desc">${project.description}</p>
                    </div>
                    <img class="featured" src="img/maps/${project.main}" alt="${project.title}">
                    ${project.closing ? `<div class="text">
                        <p class="closing">${project.closing}</p>
                    </div>` : ''} 
                    <div class="complements">
                        ${project.kicker ? `<img class="featured" src="img/maps/${project.kicker}" alt="Map alternative">` : ''}
                        ${project.kicker ? `<div class="text"><p class="closing">${project.kickertext}</p></div>` : ''}    
                        ${project.complement_01 ? `<img class="complement" src="img/maps/${project.complement_01}" alt="Map detail">` : ''}
                        ${project.complement_02 ? `<img class="complement" src="img/maps/${project.complement_02}" alt="Map detail">` : ''}
                        ${project.complement_03 ? `<img class="complement" src="img/maps/${project.complement_03}" alt="Map detail">` : ''}
                        ${project.complement_04 ? `<img class="complement" src="img/maps/${project.complement_04}" alt="Map detail">` : ''}
                        ${project.complement_05 ? `<img class="complement" src="img/maps/${project.complement_05}" alt="Map detail">` : ''}
                        ${project.complement_06 ? `<img class="complement" src="img/maps/${project.complement_06}" alt="Map detail">` : ''}
                        ${project.complement_07 ? `<img class="complement" src="img/maps/${project.complement_07}" alt="Map detail">` : ''}
                        ${project.complement_08 ? `<img class="complement" src="img/maps/${project.complement_08}" alt="Map detail">` : ''}
                        ${project.complement_09 ? `<img class="complement" src="img/maps/${project.complement_09}" alt="Map detail">` : ''}
                        ${project.complement_10 ? `<img class="complement" src="img/maps/${project.complement_10}" alt="Map detail">` : ''}
                        ${project.complement_11 ? `<img class="complement" src="img/maps/${project.complement_11}" alt="Map detail">` : ''}
                        ${project.complement_12 ? `<img class="complement" src="img/maps/${project.complement_12}" alt="Map detail">` : ''}
                        ${project.super ? `<img class="featured" src="img/maps/${project.super}" alt="Map alternative">` : ''}
                    </div>
                </div>    
            `;
            container.appendChild(card);
            currentIndex++;
        }
    }

    function displayInitialCards() {
        for (let i = 0; i < 3; i++) {
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
function menuCheck(){
    document.querySelectorAll('.btn_maps').forEach(button => {
        button.setAttribute('disabled', 'true');
        button.classList.add('disabled');
    });
}