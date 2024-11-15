// cards
window.onload = function() {
    menuCheck();
    let currentIndex = 0;
    const cardsPerPage = 15;
    let projects = [];

    // use "url portfolio" spreadsheet to export this json file    
    fetch('data/arcade.json')
        .then(response => response.json())
        .then(data => {
            projects = data;
            loadMoreCards();
            createLoadMoreButton();
        })
        .catch(error => console.error('Error fetching the portfolio data:', error));

    function loadMoreCards() {
        const container = document.getElementById('arcade-cont');
        const endIndex = Math.min(currentIndex + cardsPerPage, projects.length);

        for (let i = currentIndex; i < endIndex; i++) {
            const project = projects[i];
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <a href="${project.link}" target="_blank">
                    <div class="cover" style="background-image: url(${project.thumb});"></div>
                    <div class="cover blend" style="background-image: url(${project.thumb});"></div>
                    <div class="text">
                        <p class="headline">${project.headline}</p>
                        <p class="date">${project.month}, ${project.year}</p>
                        <p class="outlet">${project.media}</p>
                        <div class="tags"></div>
                    </div> 
                </a>   
            `;

            // Replace terms inside the outlet element
            const outletElement = card.querySelector('.outlet');
            if (outletElement) {
                outletElement.innerHTML = outletElement.innerHTML.replace(/NYT/g, 'The New York Times').replace(/SCMP/g, 'The South China Morning Post');
            }

            // Create h4 elements for each tag
            const tagsContainer = card.querySelector('.tags');
            const tags = project.tags.replace(/,/g, '').split(' ');
            tags.forEach(tag => {
                const tagElement = document.createElement('h4');
                tagElement.textContent = tag;
                tagsContainer.appendChild(tagElement);
            });

            container.appendChild(card);
        }

        currentIndex = endIndex;

        if (currentIndex >= projects.length) {
            document.getElementById('load-more-btn').style.display = 'none';
        }
    }

    function createLoadMoreButton() {
        const container = document.getElementById('getmore');
        const loadMoreBtn = document.createElement('button');
        loadMoreBtn.id = 'load-more-btn';
        loadMoreBtn.innerText = 'Load more';
        loadMoreBtn.onclick = loadMoreCards;
        container.appendChild(loadMoreBtn);
    }
};

function menuCheck(){
    document.querySelectorAll('.btn_arca').forEach(button => {
        button.setAttribute('disabled', 'true');
        button.classList.add('disabled');
    });
}