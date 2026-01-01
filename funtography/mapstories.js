window.onload = function () {
    const entriesDiv = document.getElementById('entries');
    if (entriesDiv) {
        const latestUl = entriesDiv.querySelector('.latest');
        const numbersUl = entriesDiv.querySelector('.numbers');

        if (latestUl || numbersUl) {
            fetch('../data/funtography.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    if (latestUl) {
                        const latestEntries = data.slice(0, 3);
                        latestEntries.forEach(entry => {
                            const listItem = document.createElement('li');
                            const sequence = String(entry.sequence).padStart(2, '0');
                            const url = `${sequence}.html`;

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
                            link.href = `${sequence}.html`;
                            link.textContent = `Nº${sequence}`;
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
};
