const mainContent = document.getElementById('main_content');
const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const LIMIT = 40;
let currentPokemon = [];
let currentOffset = 0;
let pokemonCount = 0;
let currentPage = 0;
let totalPages = 0;

async function init() {
    showLoadingSpinner()
    await loadPokemonData();
    renderPokemon();
    updateNavigationState()
}

function showLoadingSpinner() {
    mainContent.innerHTML = createLoadingSpinner();
    backButton.style.display = 'none';
    nextButton.style.display = 'none';
}

async function fetchData(path="") {
    let response = await fetch(BASE_URL + path);
    return await response.json();
}
  
async function loadPokemonData() {
    try {
        const data = await fetchData(`?limit=${LIMIT}&offset=${currentOffset}`);
        currentPokemon = [];
        pokemonCount = data.count;
        currentPage = currentOffset / LIMIT;
        totalPages = Math.ceil(pokemonCount / LIMIT);
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
    showNavigationButtons();
    updateNavigationState();
}