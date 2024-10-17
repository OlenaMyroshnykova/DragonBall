document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://dragonball-api.com/api/characters?limit=10'; // URL для получения персонажей с ограничением на 10 персонажей

    // Функция для загрузки всех персонажей
    async function loadCharacters() {
        const characters = await fetchAllPages(apiUrl);
        displayCharacters(characters);
    }

    // Функция для получения данных с учетом новой структуры (items и links)
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

                // Проверяем, существует ли поле "items"
                if (data.items) {
                    results = results.concat(data.items); // Добавляем элементы из текущей страницы
                } else {
                    console.warn('Нет поля "items" в данных:', data);
                    break; // Прерываем, если не найдено
                }

                // Переходим к следующей странице, если она существует
                nextPage = data.links && data.links.next ? data.links.next : null;
            }
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }
        return results;
    }

    // Функция для отображения персонажей на странице
    function displayCharacters(characters) {
        const characterList = document.querySelector('.character-list');
        characterList.innerHTML = '';

        characters.forEach(character => {
            console.log(character); // Выводим данные персонажа в консоль для отладки

            const card = document.createElement('div');
            card.className = 'character-card';

            // Отображаем информацию персонажа
            card.innerHTML = `
                <img src="${character.image || 'https://via.placeholder.com/150'}" alt="${character.name}">
                <h3><strong>Name:</strong></h3>
                <p class="idP">${character.name || 'Unknown'}</p>
                <h3><strong>Race:</strong></h3>
                <p>${character.race || 'Unknown'}</p>
                <h3><strong>Gender:</strong></h3>
                <p>${character.gender || 'Unknown'}</p>
                <h3><strong>Base KI:</strong></h3>
                <p>${character.ki || 'Not Available'}</p>
                <h3><strong>Total KI:</strong></h3>
                <p>${character.maxKi || 'Not Available'}</p>
            `;
            characterList.appendChild(card);
        });
    }

    // Загрузка персонажей при загрузке страницы
    loadCharacters();
});





