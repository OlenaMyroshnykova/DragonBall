document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://dragonball-api.com/api/planets?limit=10';

    async function loadCharacters() {
        const planets = await fetchAllPages(apiUrl);
        displayCharacters(planets);
    }

    async function fetchAllPages(url) {
        let results = [];
        let nextPage = url;
        while (nextPage) {
            const response = await fetch(nextPage);
            const data = await response.json();
            results = results.concat(data.items);
            nextPage = data.links && data.links.next ? data.links.next : null;
        }
        return results;
    }

    function displayCharacters(planets) {
        const planetsList = document.querySelector('.planets-list');
        planetsList.innerHTML = '';

        planets.forEach(planet => {
            const card = document.createElement('div');
            card.className = 'planet-card';
            let isDestroyed = "No";
            if (planet.isDestroyed === true) {
                isDestroyed = "Sí";
            }
            card.innerHTML = `
                <h3>${planet.name}</h3>
                <img src="${planet.image || 'https://via.placeholder.com/150'}" alt="${planet.name}">
                <div class="planet-info">
                    <h4><strong>Destroyed:</strong></h4>
                    <p> ${isDestroyed}</p>
                </div>
            `;
            planetsList.appendChild(card);
        });

        observeCards();
    }

    function observeCards() {
        const cards = document.querySelectorAll('.character-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible'); 
                    observer.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => {
            observer.observe(card);
        });
    }
    loadCharacters();
});
