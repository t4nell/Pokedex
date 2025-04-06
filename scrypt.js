const backButton = document.getElementById('back_button');
const nextButton = document.getElementById('next_button');
const mainContent = document.getElementById('main_content');
const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
let currentPokemon = [];
const LIMIT = 40;
let currentOffset = 0;
let pokemonCount = 0;

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
    const currentPage = currentOffset / LIMIT;
    const totalPages = Math.ceil(pokemonCount / LIMIT);
    backButton.style.display = 'block';
    nextButton.style.display = 'block';
    if (currentPage > 0 ) {
        backButton.disabled = false; 
    }else {
        backButton.disabled = true; 
    }
    if (currentPage + 1 < totalPages) {
        nextButton.disabled = false;            
    } else {
        nextButton.disabled = true;
    }
    
}

async function init() {
    showLoadingSpinner()
    await loadPokemonData();
    renderPokemon();
}


