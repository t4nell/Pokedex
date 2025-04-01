function createPokemonCard(pokemon) {
    const mainType = pokemon.types[0].type.name;
    return `
        <div class="pokemon_card">
            <div class="pokemon_image ${mainType}">
                <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
            </div>
            <div class="pokemon_stats">
                <span>#${pokemon.id.toString().padStart(3, '0')}</span>
                <span>${pokemon.weight/10}kg</span>
                <span>${pokemon.height/10}m</span>
            </div>
            <div class="pokemon_info">
                <span class="pokemon_name">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span>
            </div>
            <div class="pokemon_types">
                ${pokemon.types.map(type => `<span class="type ${type.type.name}">${type.type.name}</span>`).join('')}
            </div>
        </div>
    `;
}

function createLoadingSpinner() {
    return `
        <div class="loading_spinner">
            <svg width="100" height="100" viewBox="0 0 100 100">
                <circle class="pokeball_outer" cx="50" cy="50" r="45" fill="#E3350D" />
                <path class="pokeball_middle" d="M5,50 h90 M50,50 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0" stroke="#2C3539" stroke-width="10" fill="#fff"/>
                <circle class="pokeball_button" cx="50" cy="50" r="8" fill="#2C3539" stroke="#fff" stroke-width="2"/>
            </svg>
        </div>
    `
}