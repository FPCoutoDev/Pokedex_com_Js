const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');
const html = document.getElementById('LoadItem')
console.log(pokemonId)
console.log(urlParams)

async function loadItems(params) {
    
const pokemon = await pokeApi.getPokemonsById(pokemonId);
const evolution = await pokeApi.getSpeciesById(pokemonId);
const evolutionHTML = await getEvolutionImages(evolution)
const newHtml = `
     <div class="content">
        <div class="pokemon-header">
          <h2>${pokemon.name} <span>#${pokemon.number}</span></h2>
          <img
            class="pokemon-image"
            src="${pokemon.photo}"
            alt="${pokemon.name}"
          />
        </div>

        <div class="pokemon-info">
          <h3>Tipo</h3>
<ol class="types">
        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
</ol>

          <h3>Habilidades</h3>
          <ul class="abilities">
        ${pokemon.habilities.map((habilidades) => `<li">${habilidades}</li>`).join("<br>  ")}
          </ul>

          <h3>Altura e Peso</h3>
          <p>Altura: ${(pokemon.height) / 10} m</p>
          <p>Peso: ${pokemon.weight / 10}kg</p>

          <h3>Estatísticas Base</h3>
          <ul class="stats">
            <li>HP: ${pokemon.hp}</li>
            <li>Ataque: ${pokemon.damage}</li>
            <li>Defesa: ${pokemon.defense}</li>
            <li>Sp. Ataque: ${pokemon.criticalDamage}</li>
            <li>Sp. Defesa: ${pokemon.criticalDefense}</li>
            <li>Velocidade: ${pokemon.speed }</li>
          </ul>
          <h3>Evolução</h3>

          <ul class="evolution">
          ${evolutionHTML}
          </ul>

          <h3>Sprites (visual completo)</h3>
          <div class="sprites">
            <img src="${pokemon.frontPixelPhoto}" alt="Normal" />
            <img src="${pokemon.backPixelPhoto}" alt="Costas" />
            <img src="${pokemon.frontShinyPixelPhoto}" alt="Shiny" />
            <img src="${pokemon.backShinyPixelPhoto}" alt="Costas Shiny" />
          </div>
        </div>
      </div>`
      html.innerHTML += newHtml
}

async function getEvolutionImages(evolution) {

const evolutionsData = await Promise.all(evolution.map(name => pokeApi.getPokemonsById(name)));

  return evolutionsData.map(pokemon => `<li><img src="${pokemon.frontPixelPhoto}" alt="${pokemon.name}">${pokemon.name}</li>`).join('');
}

loadItems()
