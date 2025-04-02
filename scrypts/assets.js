const searchInput = document.getElementById('search_input');

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
        showLoadingSpinner();
        try {
            const data = await fetchData('?limit=2000');
            const filteredPokemon = data.results.filter(pokemon => 
                pokemon.name.startsWith(searchValue)
            );
            await loadFilteredPokemonDetails(filteredPokemon);
            renderPokemon();
        } catch (error) {
            mainContent.innerHTML = 'Fehler bei der Suche';
        }
        searchInput.value = '';
    }
}