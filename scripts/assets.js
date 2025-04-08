const backButton = document.getElementById('back_button');
const nextButton = document.getElementById('next_button');
const pagesContainer = document.getElementById('pages_container');

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

function showNavigationButtons() {
    backButton.style.display = 'block';
    nextButton.style.display = 'block';
}

function updateNavigationState() {
    backButton.disabled = currentPage <= 0;
    nextButton.disabled = currentPage + 1 >= totalPages;
    pagesContainer.innerHTML = `${currentPage + 1} / ${totalPages}`;
}