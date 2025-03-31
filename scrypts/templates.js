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