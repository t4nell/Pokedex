const searchInput = document.getElementById('search_input');
const searchContainer = document.getElementById('search_container');
const clearFilterButton = document.getElementById('clear_filter');

async function searchPokemon() {
    const searchValue = validateAndGetSearchValue();
    if (!searchValue) return;
    
    await performPokemonSearch(searchValue);
}

function validateAndGetSearchValue() {
    const searchValue = searchInput.value.toLowerCase();
    if (searchValue.length < 3) {
        alert('Bitte gib mindestens 3 Zeichen ein');
        return null;
    }
    searchInput.value = '';
    return searchValue;
}

async function performPokemonSearch(searchValue) {
    const data = await fetchData('?limit=2000');
    showLoadingSpinner();
    const filteredPokemon = data.results.filter(pokemon => 
        pokemon.name.startsWith(searchValue)
    );
    await loadFilteredPokemonDetails(filteredPokemon);
    
    if (currentPokemon.length === 0) {
        mainContent.innerHTML = `<p>Keine Pokemon mit "${searchValue}" gefunden</p>`;
    } else {
        currentPage = 0;
        totalPages = 1;
        renderPokemon();
        nextButton.disabled = true;
        clearFilterButton.style.display = 'block';
    }
}

async function loadFilteredPokemonDetails(filteredPokemon) {
    currentPokemon.length = 0;
    for (let pokemon of filteredPokemon) {
        const pokemonData = await fetchData(pokemon.name);
        currentPokemon.push(pokemonData);
    }
}

async function clearFilter() {
    currentOffset = 0;
    currentPage = 0;
    clearFilterButton.style.display = 'none';
    await init();
}

function toggleSearch() {
    searchContainer.classList.toggle('show');
}