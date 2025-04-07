const searchInput = document.getElementById('search_input');
const searchContainer = document.getElementById('search_container');
const backButton = document.getElementById('back_button');
const nextButton = document.getElementById('next_button');

async function searchPokemon() {
    const searchValue = searchInput.value.toLowerCase();
    searchInput.value = '';
    if (searchValue) {
        const data = await fetchData('?limit=2000');
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
    }
}

async function loadFilteredPokemonDetails(filteredPokemon) {
    currentPokemon.length = 0;
    for (let pokemon of filteredPokemon) {
        const pokemonData = await fetchData(pokemon.name);
        currentPokemon.push(pokemonData);
    }
}

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
    const currentPage = currentOffset / LIMIT;
    const totalPages = Math.ceil(pokemonCount / LIMIT);
    backButton.disabled = currentPage <= 0;
    nextButton.disabled = currentPage + 1 >= totalPages;
}

function showPokemonDetails(pokemon) {
    const overlayContainer = document.getElementById('overlay-container');
    overlayContainer.innerHTML = createPokemonOverlay(pokemon);
}

function closeOverlay() {
    const overlayContainer = document.getElementById('overlay-container');
    overlayContainer.innerHTML = '';
}

function toggleSearch() {
    searchContainer.classList.toggle('show');
}