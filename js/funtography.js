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
                    <div class="counter"><p>Funtography&ensp;<span>–Nº${project.sequence}</span></p></div>
                    <div class="text">
                        <p class="date">${project.date}</p>
                        <a class="title-link" href="${project.sequence}.html"><h3>${project.title}</h3></a>
                        <p class="desc">${project.description}</p>
                    </div>
                    ${project.main ? `<img class="featured" src="img/maps/${project.main}" alt="${project.title}">` : ''}
                    ${project.body_complment ? `<div class="complements">${generateBodyComplement(project.body_complment)}</div>` : ''}
                    <div class="text">
                        <p class="date">
                            Funtography&ensp;<span>–Nº${project.sequence}</span>, ${project.date}
                        </p>
                        <p class="permlink">
                            <a href="https://mhinfographics.github.io/funtography/${project.sequence}" target="_blank">Shareable permanent link <span>&#8599;</span></a>
                        </p>
                    </div>
                </div>    
            `;
            container.appendChild(card);
            currentIndex++;
        }
    }

    function generateBodyComplement(bodyComplement) {
        if (!bodyComplement) return '';
    
        let content = '';
        bodyComplement.forEach(item => {
            const key = Object.keys(item)[0];
            const value = item[key];
            if (key === 'image_small') {
                content += `<img src="img/maps/${value}" class="complement" />`;
            } else if (key === 'image_large') {
                content += `<img src="img/maps/${value}" class="featured" />`;
            } else if (key === 'text_wide') {
                content += `<div class="text"><p>${value}</p></div>`;
            }
        });
        return content;
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

function menuCheck() {
    document.querySelectorAll('.btn_maps').forEach(button => {
        button.setAttribute('disabled', 'true');
        button.classList.add('disabled');
    });
}