const overlayContainer = document.getElementById('overlay-container');


function showPokemonDetails(pokemon) {
    overlayContainer.innerHTML = createPokemonOverlay(pokemon);
}

function closeOverlay() {
    overlayContainer.innerHTML = '';
}

function getCurrentPokemonIndex(pokemonId) {
    return currentPokemon.findIndex(pokemon => pokemon.id === pokemonId);
}

async function showPreviousPokemon(currentPokemonId) {
    const currentIndex = getCurrentPokemonIndex(currentPokemonId);
    if (currentIndex > 0) {
        showPokemonDetails(currentPokemon[currentIndex - 1]);
    } else if (currentPage > 0) {
        currentOffset -= LIMIT;
        await loadPokemonData();
        renderPokemon();
        showPokemonDetails(currentPokemon[currentPokemon.length - 1]);
    }
}

async function showNextPokemon(currentPokemonId) {
    const currentIndex = getCurrentPokemonIndex(currentPokemonId);
    if (currentIndex < currentPokemon.length - 1) {
        showPokemonDetails(currentPokemon[currentIndex + 1]);
    } else if (currentPage + 1 < totalPages) {
        currentOffset += LIMIT;
        await loadPokemonData();
        renderPokemon();
        showPokemonDetails(currentPokemon[0]);
    }
}