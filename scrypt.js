const mainContent = document.getElementById('main_content');
const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const currentPokemon = [];

function showLoadingSpinner() {
    mainContent.innerHTML = createLoadingSpinner();
}

async function fetchData(path="") {
    let response = await fetch(BASE_URL + path);
    return await response.json();
}
  
async function loadPokemonData() {
    try {
        const data = await fetchData();
        for (let pokemon of data.results) {
            const pokemonData = await fetchData(pokemon.name);
            currentPokemon.push(pokemonData);
        }
    } catch (error) {
        console.error('Error loading Pokemon data:', error);
    }
}

function renderPokemon() {
    mainContent.innerHTML = "";
    currentPokemon.forEach(pokemon => {
        const pokemonCard = createPokemonCard(pokemon);
        mainContent.innerHTML += pokemonCard;
    });
}

async function init() {
    showLoadingSpinner()
    await loadPokemonData();
    renderPokemon();
}


