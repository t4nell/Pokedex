function createLoadingSpinner() {
    return `
        <div class="loading_spinner">
            <svg width="100" height="100" viewBox="0 0 100 100">
                <circle class="pokeball_outer" cx="50" cy="50" r="45"/>
                <path class="pokeball_middle" d="M5,50 h90 M50,50 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0" stroke-width="10"/>
                <circle class="pokeball_button" cx="50" cy="50" r="8" stroke-width="2"/>
            </svg>
        </div>
    `
}

function createPokemonCard(pokemon) {
    const mainType = pokemon.types[0].type.name;
    return `
        <div class="pokemon_card" onclick="showPokemonDetails(${JSON.stringify(pokemon).replace(/"/g, '&quot;')})">
            <div class="pokemon_image ${mainType}">
                <img class="pokemon_image_img" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            </div>
            <div class="pokemon_stats">
                <span>#${pokemon.id}</span>
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

function createPokemonOverlay(pokemon) {
    const mainType = pokemon.types[0].type.name;
    const currentIndex = getCurrentPokemonIndex(pokemon.id);
    const isFirst = currentIndex === 0 && currentPage === 0;
    const isLast = currentIndex === currentPokemon.length - 1 && currentPage + 1 >= totalPages;
    return `
    <div id="overlay" class="pokemon_overlay" onclick="closeOverlay()">
        <div class="overlay_content ${pokemon.types[0].type.name}" onclick="event.stopPropagation()">
            <div class="overlay_header">
                <span class="pokemon_name">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span>
                <span>#${pokemon.id.toString().padStart(3, '0')}</span>
            </div>
            
            <div class="overlay_image ${mainType}">
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            </div>
            
            <div class="overlay_types">
                ${pokemon.types.map(type => `<span class="type ${type.type.name}">${type.type.name}</span>`).join('')}
            </div>
            
            <div class="overlay_stats">
                <div class="stat_row">
                    <span>🏋️ ${pokemon.weight/10} kg</span>
                    <span>📏 ${pokemon.height/10} m</span>
                </div>
                <div class="stat_bar">
                    <span class="width_55px">HP:</span>
                    <div class="progress_bar">
                        <div style="width: ${calculateStatPercentage(pokemon.stats[0].base_stat)}%">${pokemon.stats[0].base_stat}/255</div>
                    </div>
                </div>
                <div class="stat_bar">
                    <span class="width_55px">ATK:</span>
                    <div class="progress_bar">
                        <div style="width: ${calculateStatPercentage(pokemon.stats[1].base_stat)}%">${pokemon.stats[1].base_stat}/255</div>
                    </div>
                </div>
                <div class="stat_bar">
                    <span class="width_55px">DEF:</span>
                    <div class="progress_bar">
                        <div style="width: ${calculateStatPercentage(pokemon.stats[2].base_stat)}%">${pokemon.stats[2].base_stat}/255</div>
                    </div>
                </div>
                <div class="stat_bar">
                    <span class="width_55px">Sp.ATK:</span>
                    <div class="progress_bar">
                        <div style="width: ${calculateStatPercentage(pokemon.stats[3].base_stat)}%">${pokemon.stats[3].base_stat}/255</div>
                    </div>
                </div>
                <div class="stat_bar">
                    <span class="width_55px">Sp.DEF:</span>
                    <div class="progress_bar">
                        <div style="width: ${calculateStatPercentage(pokemon.stats[4].base_stat)}%">${pokemon.stats[4].base_stat}/255</div>
                    </div>
                </div>
                <div class="stat_bar">
                    <span class="width_55px">Speed:</span>
                    <div class="progress_bar">
                        <div style="width: ${calculateStatPercentage(pokemon.stats[5].base_stat)}%">${pokemon.stats[5].base_stat}/255</div>
                    </div>
                </div>
            </div>
            <div class="overlay_button_container"> 
                <button class="overlay_button" onclick="showPreviousPokemon(${pokemon.id})" ${isFirst ? 'disabled' : ''}>←</button>  
                <button class="overlay_button" onclick="showNextPokemon(${pokemon.id})" ${isLast ? 'disabled' : ''}>→</button>
            </div>
            
        </div>
    </div>
    `;
}