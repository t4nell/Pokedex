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