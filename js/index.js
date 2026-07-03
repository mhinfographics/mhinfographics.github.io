window.onload = function () { addPortfolioCards(); addBlogCards(); addSketchCards(); addtalkCards(); addMapsCards(); addAwardCards(); menuCheck();addPlaygroundCards(); };
function trimDescription(text, maxWords = 14) {
    if (!text) return '';
    const words = text.split(/\s+/);
    return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '... <span>More →</span>' : text;
}
// Disables the home button on the homepage to prevent users from navigating back to the homepage while already on it. It selects all elements with the class 'btn_home', sets their 'disabled' attribute to true, and adds a 'disabled' class for styling purposes.
function menuCheck(){
    document.querySelectorAll('.btn_home').forEach(button => {
        button.setAttribute('disabled', 'true');
        button.classList.add('disabled');
    });
}
// Adds the latest portfolio projects to the portfolio section of the homepage. It fetches data from a JSON file and selects the first 3 entries to display as cards. Each card contains a link, thumbnail image, category, tag, and headline of the project. After displaying the cards, it adds a "Learn More" card that links to the full collection of portfolio projects on mhinfographics.com.
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

            const learnMoreCard = "<img class='row-icon' src='img/svg/svg_m-plain.svg' alt='m letter with silly faces'><p>Want to see more projects?</p><a href='arcade.html' target='_blank'>View Arcade</a>";
            learnMore.innerHTML = learnMoreCard;
        })
        .catch(error => console.error('Error fetching portfolio data:', error));
}
// Adds the latest blog entries to the blog section of the homepage. It fetches data from a JSON file and selects the first 3 entries to display as cards. Each card contains a link, thumbnail image, category, tag, and headline of the blog entry. After displaying the cards, it adds a "Learn More" card that links to the full collection of blog entries on mhinfographics.com.
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

            const learnMoreCard = "<img class='row-icon' src='img/svg/svg_m-plain.svg' alt='m letter with silly faces'><p>Want to see more blog entries?</p><a href='https://mhinfographics.com/' target='_blank'>Visit mhinfographics.com</a>";
            learnMore.innerHTML = learnMoreCard;
        })
        .catch(error => console.error('Error fetching portfolio data:', error));
}
// Adds random sketches to the sketch section of the homepage. It fetches data from a JSON file, shuffles the array, and selects 3 unique random projects to display as cards. Each card contains a link, thumbnail image, category, tag, and headline of the project. After displaying the cards, it adds a "Learn More" card that links to the full collection of sketches on sundaysketchbook.art.
function addSketchCards() {
    fetch('data/sketches.json')
        .then(response => response.json())
        .then(data => {
            // Shuffle the array
            const shuffledProjects = data.sort(() => 0.5 - Math.random());
            // Select 3 unique random projects
            const projects = [];
            const usedIndices = new Set();
            while (projects.length < 3 && usedIndices.size < data.length) {
                const randomIndex = Math.floor(Math.random() * data.length);
                if (!usedIndices.has(randomIndex)) {
                    projects.push(data[randomIndex]);
                    usedIndices.add(randomIndex);
                }
            }
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

            const learnMoreCard = "<img class='row-icon' src='img/svg/svg_m-plain.svg' alt='m letter with silly faces'><p>Want to see more silly doodles?</p><a href='https://sundaysketchbook.art/' target='_blank'>Visit sundaysketchbook.art</a>";
            learnMore.innerHTML = learnMoreCard;
        })
        .catch(error => console.error('Error fetching portfolio data:', error));
}
// Adds the latest talks to the talks section of the homepage. It fetches data from a JSON file and selects the first 3 entries to display as cards. Each card contains a thumbnail image, date, headline, tag, and category of the talk. After displaying the cards, it adds a "Learn More" card that links to the full collection of talks on mhinfographics.com.
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

            const learnMoreCard = "<img class='row-icon' src='img/svg/svg_m-plain.svg' alt='m letter with silly faces'><p>All events as a speaker, interviews and exhibitions.</p><a href='https://mhinfographics.com/highlights' target='_blank'>Full list</a>";
            learnMore.innerHTML = learnMoreCard;
        })
        .catch(error => console.error('Error fetching portfolio data:', error));
}
// Adds random maps to the maps section of the homepage. It fetches data from a JSON file, shuffles the array, and selects 4 unique random projects to display as cards. Each card contains a link, thumbnail image, category, tag, and headline of the project.
function addMapsCards() {
    fetch('data/maps.json')
        .then(response => response.json())
        .then(data => {
            // Shuffle the array
            const shuffledProjects = data.sort(() => 0.5 - Math.random());
            // Select 3 unique random projects
            const projects = [];
            const usedIndices = new Set();
            while (projects.length < 4 && usedIndices.size < data.length) {
                const randomIndex = Math.floor(Math.random() * data.length);
                if (!usedIndices.has(randomIndex)) {
                    projects.push(data[randomIndex]);
                    usedIndices.add(randomIndex);
                }
            }
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
// Adds the latest playground projects to the playground section of the homepage. It fetches data from a JSON file and selects the first 3 entries to display as cards. Each card contains a link, thumbnail image, title, date, and description of the project. After displaying the cards, it adds a "Learn More" card that links to the full collection of playground projects on mhinfographics.github.io/playground.
function addPlaygroundCards() {
    fetch('playground/data/playground.json')
        .then(response => response.json())
        .then(data => {
            const projects = data.slice(0, 3);
            const container = document.getElementById('playground-container');

            projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'card project';
                    card.innerHTML = `
                        <a href="playground/${project.link}" target="_blank">    
                            <div class="preview multiply" style="background-image: url('playground/${project.thumbnail}')"></div>   
                            <p class="category">${project.title}</p>
                            <p class="date">${project.date}</p>
                            <p class="desc">${trimDescription(project.description)}</p>
                        </a>
                    `;
                container.appendChild(card);
            });
        }).then((data) => {
            let learnMore = document.createElement('div');
            learnMore.classList.add('card', 'learn-more');
            const container = document.getElementById('playground-container');
            container.appendChild(learnMore);

            const learnMoreCard = "<img class='row-icon' src='img/svg/svg_m-plain.svg' alt='m letter with silly faces'><p>Want to see more blog entries like this?</p><a href='https://mhinfographics.github.io/playground/' target='_blank'>Come to the playground!</a>";
            learnMore.innerHTML = learnMoreCard;
        })
        .catch(error => console.error('Error fetching portfolio data:', error));
}
// Adds the latest awards to the awards section of the homepage. It fetches data from a JSON file, shuffles the array, and selects 3 unique random projects to display as cards. Each card contains a link, thumbnail image, category, and headline of the award. After displaying the cards, it adds a "Learn More" card that links to the full collection of awards on mhinfographics.com/awards.
function addAwardCards() {
    fetch('data/awards.json')
        .then(response => response.json())
        .then(data => {
            // Shuffle the array
            const shuffledProjects = data.sort(() => 0.5 - Math.random());
            // Select 3 unique random projects
            const projects = [];
            const usedIndices = new Set();
            while (projects.length < 3 && usedIndices.size < data.length) {
                const randomIndex = Math.floor(Math.random() * data.length);
                if (!usedIndices.has(randomIndex)) {
                    projects.push(data[randomIndex]);
                    usedIndices.add(randomIndex);
                }
            }
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

            const learnMoreCard = "<img class='row-icon' src='img/svg/svg_m-plain.svg' alt='m letter with silly faces'><p>Thanks to all the organizations that have recognized my work for so many years. For a complete list ,please </p><a href='https://mhinfographics.com/awards' target='_blank'>visit mhinfographics.com /awards</a>";
            learnMore.innerHTML = learnMoreCard;
        })
        .catch(error => console.error('Error fetching portfolio data:', error));
}
// Function to randomize sketches when the "Randomize" button is clicked. This function will clear the current sketches and fetch new random sketches from the JSON file, ensuring that the displayed sketches are different each time the button is pressed.
function randomizeSketches() {
    const container = document.getElementById('sketch-container');
    // Remove existing sketch cards but keep the learn-more card
    container.querySelectorAll('.card.project').forEach(card => card.remove());

    fetch('data/sketches.json')
        .then(response => response.json())
        .then(data => {
            const projects = [];
            const usedIndices = new Set();
            while (projects.length < 3 && usedIndices.size < data.length) {
                const randomIndex = Math.floor(Math.random() * data.length);
                if (!usedIndices.has(randomIndex)) {
                    projects.push(data[randomIndex]);
                    usedIndices.add(randomIndex);
                }
            }
            const learnMore = container.querySelector('.card.learn-more');
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
                container.insertBefore(card, learnMore);
            });
        })
        .catch(error => console.error('Error fetching sketch data:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('randomizer-button');
    if (btn) btn.addEventListener('click', () => {
        btn.classList.toggle('st01');
        btn.classList.toggle('st02');
        randomizeSketches();
    });
});