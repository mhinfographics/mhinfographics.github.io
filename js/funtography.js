//load stories
window.onload = function () {
    menuCheck(); thumbnailCheck();
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
                        <a class="title-link" href="https://mhinfographics.github.io/funtography/${project.sequence}.html"><h3>${project.title}</h3></a>
                        <p class="desc">${project.description}</p>
                    </div>
                    ${project.main ? `<div class="map_wrapper"><img class="featured" src="img/maps/${project.main}" alt="${project.title}"></div>` : ''}
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
                content += `<div class="map_wrapper complement"><img src="img/maps/${value}" class="complement" /></div>`;
            } else if (key === 'image_large') {
                content += `<div class="map_wrapper"><img src="img/maps/${value}" class="featured" /></div>`;
            } else if (key === 'image_body') {
                content += `<div class="map_wrapper"><img src="img/maps/${value}" class="body" /></div>`;
            }  else if (key === 'text_wide') {
                content += `<div class="text"><p>${value}</p></div>`;
            }
        });
        return content;
    }

    function displayInitialCards() {
        for (let i = 0; i < 1; i++) {
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

function thumbnailCheck() {
    const entriesDiv = document.getElementById('mainEntries');
    if (entriesDiv) {
        const latestUl = entriesDiv.querySelector('.latest');
        const numbersUl = entriesDiv.querySelector('.numbers');

        if (latestUl || numbersUl) {
            fetch('data/funtography.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    if (latestUl) {
                        const latestEntries = data.slice(1, 4);
                        latestEntries.forEach(entry => {
                            const listItem = document.createElement('li');
                            const sequence = String(entry.sequence).padStart(2, '0');
                            const url = `funtography/${sequence}.html`;

                            listItem.style.cursor = 'pointer';
                            listItem.addEventListener('click', () => {
                                window.location.href = url;
                            });

                            const thumbDiv = document.createElement('div');
                            thumbDiv.className = 'thumb';
                            thumbDiv.style.backgroundImage = `url(../img/maps/${entry.main})`;

                            const p = document.createElement('p');
                            p.innerHTML = `Nº${entry.sequence}– <span>${entry.title}</span>`;
                            
                            listItem.appendChild(thumbDiv);
                            listItem.appendChild(p);

                            latestUl.appendChild(listItem);
                        });
                    }

                    if (numbersUl) {
                        const allOtherEntries = data.slice(3);
                        allOtherEntries.forEach(entry => {
                            const listItem = document.createElement('li');
                            const link = document.createElement('a');
                            const sequence = String(entry.sequence).padStart(2, '0');
                            const thumbnail = document.createElement('div');
                            thumbnail.className = 'thumbnail';
                            thumbnail.style.backgroundImage = `url(../img/maps/${entry.main})`;
                            link.href = `funtography/${sequence}.html`;
                            link.textContent = `Nº${sequence}`;
                            listItem.appendChild(thumbnail);
                            listItem.appendChild(link);
                            numbersUl.appendChild(listItem);
                        });
                    }
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                });
        }
    }
}