const publicKey = '7b6c39aeeb00ec1c34b92306b32b9282';
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const characterContainer = document.getElementById('character-container');

// Function to fetch data from Marvel API
async function fetchCharacters(query) {
    const ts = new Date().getTime();
    const hash = md5(ts + 'd90df22db666adcf82ed7641a0a5777c9da9b136' + publicKey); // You need to include md5.js for hashing
    const url = `${baseUrl}?nameStartsWith=${query}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayCharacters(data.data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to display characters
function displayCharacters(characters) {
    characterContainer.innerHTML = '';
    characters.forEach(character => {
        const characterCard = document.createElement('div');
        characterCard.classList.add('character-card');
        
        const image = `${character.thumbnail.path}.${character.thumbnail.extension}`;
        characterCard.innerHTML = `
            <img src="${image}" alt="${character.name}">
            <h2>${character.name}</h2>
            <p>${character.description || 'No description available.'}</p>
        `;

        characterContainer.appendChild(characterCard);
    });
}

// Event listener for search button
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchCharacters(query);
    }
});

// Example: Fetch and display a list of characters on load
fetchCharacters('Spider-Man');
