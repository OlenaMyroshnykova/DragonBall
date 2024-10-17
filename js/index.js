document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://dragonball-api.com/api/characters?limit=10';

    // Функция для загрузки всех персонажей
    async function loadCharacters() {
        const characters = await fetchAllPages(apiUrl);
        displayCharacters(characters);
    }

    // Функция для получения данных с учетом новой структуры
    async function fetchAllPages(url) {
        let results = [];
        let nextPage = url;
        try {
            while (nextPage) {
                const response = await fetch(nextPage);
                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`);
                }
                const data = await response.json();

                if (data.items) {
                    results = results.concat(data.items);
                } else {
                    console.warn('Нет поля "items" в данных:', data);
                    break;
                }

                nextPage = data.links && data.links.next ? data.links.next : null;
            }
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }
        return results;
    }

    // Функция для отображения карточек персонажей на странице
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
                    <p><strong>Race:</strong> ${character.race || 'Unknown'}</p>
                    <p><strong>Base KI:</strong> ${character.ki || 'Not Available'}</p>
                    <p><strong>Affiliation:</strong> ${character.affiliation || 'Unknown'}</p>
                </div>
            `;
            characterList.appendChild(card);
        });

        // Добавляем анимацию появления карточек
        observeCards();
    }

    // Настройка Intersection Observer для анимации подгрузки
    function observeCards() {
        const cards = document.querySelectorAll('.character-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');  // Карточка появляется
                    observer.unobserve(entry.target);  // Прекращаем отслеживание
                }
            });
        }, { threshold: 0.1 });  // Анимация срабатывает, когда карточка на 10% видна

        cards.forEach(card => {
            observer.observe(card);
        });
    }

    // Загрузка персонажей при загрузке страницы
    loadCharacters();
});






