window.onload = function () { addPortfolioCards(); addBlogCards(); addSketchCards(); addtalkCards(); addMapsCards(); addAwardCards(); menuCheck();};
function menuCheck(){
    document.querySelectorAll('.btn_home').forEach(button => {
        button.setAttribute('disabled', 'true');
        button.classList.add('disabled');
    });
}
function addPortfolioCards() {
    fetch('data/highlights.json')
        .then(response => response.json())
        .then(data => {
            const projects = data.slice(0, 3);
            const container = document.getElementById('projects-container');

            projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'card project';
                card.innerHTML = `
                    <a href="${project.link}" target="_blank">
                        <img class="thumb" src="img/cards/${project.thumb}" alt="${project.headline}">
                        <p class="date">${project.month}, ${project.year}</p>
                        <p class="head">${project.headline}</p>
                        <p class="desk">${project.category}</p>
                    </a>
                `;
                container.appendChild(card);
            });
        }).then((data) => {
            let learnMore = document.createElement('div');
            learnMore.classList.add('card', 'learn-more');
            const container = document.getElementById('projects-container');
            container.appendChild(learnMore);

            const learnMoreCard = "<img class='row-icon' src='img/svg/svg_m-plain.svg' alt='m letter with silly faces'><p>Want to see more projects?</p><a href='arcade.html'>View Arcade</a>";
            learnMore.innerHTML = learnMoreCard;
        })
        .catch(error => console.error('Error fetching portfolio data:', error));
}
function addBlogCards() {
    fetch('data/blog.json')
        .then(response => response.json())
        .then(data => {
            const projects = data.slice(0, 3);
            const container = document.getElementById('blogs-container');

            projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'card project';
                card.innerHTML = `
                    <a href="${project.link}" target="_blank">    
                        <img class="thumb" src="img/cards/${project.thumb}" alt="${project.headline}">
                        <p class="category">${project.category}</p>
                        <p class="date">${project.tag}</p>
                        <p class="head">${project.headline}</p>
                    </a>
                `;
                container.appendChild(card);
            });
        }).then((data) => {
            let learnMore = document.createElement('div');
            learnMore.classList.add('card', 'learn-more');
            const container = document.getElementById('blogs-container');
            container.appendChild(learnMore);

            const learnMoreCard = "<img class='row-icon' src='img/svg/svg_m-plain.svg' alt='m letter with silly faces'><p>Want to see more blog entries?</p><a href='https://mhinfographics.com/'>Visit mhinfographics.com</a>";
            learnMore.innerHTML = learnMoreCard;
        })
        .catch(error => console.error('Error fetching portfolio data:', error));
}
function addSketchCards() {
    fetch('data/sketches.json')
        .then(response => response.json())
        .then(data => {
            // Shuffle the array
            const shuffledProjects = data.sort(() => 0.5 - Math.random());
            // Select the first 3 projects
            const projects = shuffledProjects.slice(0, 3);
            const container = document.getElementById('sketch-container');

            projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'card project';
                card.innerHTML = `
                    <a href="${project.link}" target="_blank">
                        <img class="thumb" src="img/cards/${project.thumb}" alt="${project.headline}">
                        <p class="date">${project.category}, ${project.tag}</p>
                        <p class="head">${project.headline}</p>
                    </a>
                `;
                container.appendChild(card);
            });
        }).then(() => {
            let learnMore = document.createElement('div');
            learnMore.classList.add('card', 'learn-more');
            const container = document.getElementById('sketch-container');
            container.appendChild(learnMore);

            const learnMoreCard = "<img class='row-icon' src='img/svg/svg_m-plain.svg' alt='m letter with silly faces'><p>Want to see more silly doodles?</p><a href='https://sundaysketchbook.art/'>Visit sundaysketchbook.art</a>";
            learnMore.innerHTML = learnMoreCard;
        })
        .catch(error => console.error('Error fetching portfolio data:', error));
}
function addtalkCards() {
    fetch('data/talks.json')
        .then(response => response.json())
        .then(data => {
            const projects = data.slice(0, 3);
            const container = document.getElementById('talks-container');

            projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'card project';
                card.innerHTML = `
                    <img class="thumb" src="img/cards/${project.thumb}" alt="${project.headline}">
                    <p class="date">${project.tag}, ${project.category}</p>
                    <p class="head">${project.headline}</p>
                `;
                container.appendChild(card);
            });
        }).then((data) => {
            let learnMore = document.createElement('div');
            learnMore.classList.add('card', 'learn-more');
            const container = document.getElementById('talks-container');
            container.appendChild(learnMore);

            const learnMoreCard = "<img class='row-icon' src='img/svg/svg_m-plain.svg' alt='m letter with silly faces'><p>All events as a speaker, interviews and exhibitions.</p><a href='https://mhinfographics.com/highlights/#:~:text=Infographics%2Ddataviz-,Talks,-%2C%20exhibitions%20and%20interviews'>Full list</a>";
            learnMore.innerHTML = learnMoreCard;
        })
        .catch(error => console.error('Error fetching portfolio data:', error));
}
function addMapsCards() {
    fetch('data/maps.json')
        .then(response => response.json())
        .then(data => {
            // Shuffle the array
            const shuffledProjects = data.sort(() => 0.5 - Math.random());
            // Select the first 3 projects
            const projects = shuffledProjects.slice(0, 4);
            const container = document.getElementById('maps-container');

            projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'card project';
                card.innerHTML = `
                    <a href="${project.link}" target="_blank">
                        <img class="thumb" src="img/cards/${project.thumb}" alt="${project.headline}">
                        <p class="date">${project.category}, ${project.tag}</p>
                        <p class="head">${project.headline}</p>
                    </a>
                `;
                container.appendChild(card);
            });
        }).catch(error => console.error('Error fetching portfolio data:', error));
}

function addAwardCards() {
    fetch('data/awards.json')
        .then(response => response.json())
        .then(data => {
            // Shuffle the array
            const shuffledProjects = data.sort(() => 0.5 - Math.random());
            // Select the first 3 projects
            const projects = shuffledProjects.slice(0, 3);
            const container = document.getElementById('awards-container');

            projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'card project';
                card.innerHTML = `
                    <a href="${project.link}" target="_blank">
                        <img class="thumb" src="img/awards/${project.thumb}" alt="${project.category}">
                        <p class="category">${project.category}</p>
                        <p class="head">${project.headline}</p>
                    </a>
                `;
                container.appendChild(card);
            });
        }).then(() => {
            let learnMore = document.createElement('div');
            learnMore.classList.add('card', 'learn-more');
            const container = document.getElementById('awards-container');
            container.appendChild(learnMore);

            const learnMoreCard = "<img class='row-icon' src='img/svg/svg_m-plain.svg' alt='m letter with silly faces'><p>Thanks to all the organizations that have recognized my work for so many years. For a complete list ,please </p><a href='https://mhinfographics.com/awards'>visit mhinfographics.com /awards</a>";
            learnMore.innerHTML = learnMoreCard;
        })
        .catch(error => console.error('Error fetching portfolio data:', error));
}