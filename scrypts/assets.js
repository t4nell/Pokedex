const searchInput = document.getElementById('search_input');
const backButton = document.getElementById('back_button');
const nextButton = document.getElementById('next_button');
async function loadNextPokemon() {
    currentOffset += LIMIT;
    showLoadingSpinner();
    await loadPokemonData();
    renderPokemon();
}

async function loadPreviousPokemon() {
    if (currentOffset >= LIMIT) {
        currentOffset -= LIMIT;
        showLoadingSpinner();
        await loadPokemonData();
        renderPokemon();
    }
}

async function loadFilteredPokemonDetails(filteredPokemon) {
    currentPokemon.length = 0;
    for (let pokemon of filteredPokemon) {
        const pokemonData = await fetchData(pokemon.name);
        currentPokemon.push(pokemonData);
    }
}

async function searchPokemon() {
    const searchValue = searchInput.value.toLowerCase();
    if (searchValue) {
        const data = await fetchData('?limit=2000');
        backButton.style.display = 'none';
        nextButton.style.display = 'none';
        showLoadingSpinner();
        const filteredPokemon = data.results.filter(pokemon => 
            pokemon.name.startsWith(searchValue)
        );
        await loadFilteredPokemonDetails(filteredPokemon);
        if (currentPokemon.length === 0) {
            mainContent.innerHTML = `<p>Keine Pokemon mit "${searchValue}" gefunden</p>`;
        } else {
            renderPokemon();
        }
        searchInput.value = '';
    }
}