document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://dragonball-api.com/api/characters?limit=10';

    async function loadCharacters() {
        const characters = await fetchAllPages(apiUrl);
        displayCharacters(characters);
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

    function displayCharacters(characters) {
        const characterList = document.querySelector('.character-list');
        characterList.innerHTML = '';

        characters.forEach(character => {
            const card = document.createElement('div');
            card.className = 'character-card';

            card.innerHTML = `
                <img src="${character.image || 'https://via.placeholder.com/150'}" alt="${character.name}">
                <div class="character-info">
                    <h3>${character.name}</h3>
                    <h4>${character.race || 'Unknown'}</h4>
                    <h4><strong>Base KI:</strong></h4>
                    <p> ${character.ki || 'Not Available'}</p>
                    <h4><strong>Affiliation:</strong></h4>
                    <p> ${character.affiliation || 'Unknown'}</p>
                </div>
            `;
            characterList.appendChild(card);
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





