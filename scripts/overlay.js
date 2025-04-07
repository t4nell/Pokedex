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