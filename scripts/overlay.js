const overlayContainer = document.getElementById('overlay-container');

function showPokemonDetails(pokemon) {
    overlayContainer.innerHTML = createPokemonOverlay(pokemon);
}

function calculateStatPercentage(baseStat) {
    const MAX_STAT = 255;
    return (baseStat / MAX_STAT) * 100;
}

function closeOverlay() {
    overlayContainer.innerHTML = '';
}

function getCurrentPokemonIndex(pokemonId) {
    const currentIndex = currentPokemon.findIndex(pokemon => pokemon.id === pokemonId);
    return {
        index: currentIndex,
        isFirst: currentIndex === 0 && currentPage === 0,
        isLast: currentIndex === currentPokemon.length - 1 && currentPage + 1 >= totalPages
    };
}

async function showPreviousPokemon(currentPokemonId) {
    const position = getCurrentPokemonIndex(currentPokemonId);
    if (position.index > 0) {
        showPokemonDetails(currentPokemon[position.index - 1]);
    } else if (currentPage > 0) {
        currentOffset -= LIMIT;
        await loadPokemonData();
        renderPokemon();
        showPokemonDetails(currentPokemon[currentPokemon.length - 1]);
    }
}

async function showNextPokemon(currentPokemonId) {
    const position = getCurrentPokemonIndex(currentPokemonId);
    if (position.index < currentPokemon.length - 1) {
        showPokemonDetails(currentPokemon[position.index + 1]);
    } else if (currentPage + 1 < totalPages) {
        currentOffset += LIMIT;
        await loadPokemonData();
        renderPokemon();
        showPokemonDetails(currentPokemon[0]);
    }
}