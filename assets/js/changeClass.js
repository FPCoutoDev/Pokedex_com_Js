const urlParam = new URLSearchParams(window.location.search);
const Id = urlParams.get('id');
const header = document.getElementById('header')
const footer = document.getElementById('footer')

async function addClass(pokemonID) {
const pokemon = await pokeApi.getPokemonsById(pokemonID);
console.log(pokemon.type)
switch (pokemon.type) {
  case "grass":
    header.classList.add('header_grass');
    footer.classList.add('footer_grass');
    break;
  case "bug":
    header.classList.add('header_bug');
    footer.classList.add('footer_bug');
    break;
  case "dark":
    header.classList.add('header_dark');
    footer.classList.add('footer_dark');
    break;
  case "dragon":
    header.classList.add('header_dragon');
    footer.classList.add('footer_dragon');
    break;
  case "electric":
    header.classList.add('header_electric');
    footer.classList.add('footer_electric');
    break;
  case "fairy":
    header.classList.add('header_fairy');
    footer.classList.add('footer_fairy');
    break;
  case "fighting":
    header.classList.add('header_fighting');
    footer.classList.add('footer_fighting');
    break;
  case "fire":
    header.classList.add('header_fire');
    footer.classList.add('footer_fire');
    break;
  case "flying":
    header.classList.add('header_flying');
    footer.classList.add('footer_flying');
    break;
  case "ghost":
    header.classList.add('header_ghost');
    footer.classList.add('footer_ghost');
    break;
  case "ground":
    header.classList.add('header_ground');
    footer.classList.add('footer_ground');
    break;
  case "ice":
    header.classList.add('header_ice');
    footer.classList.add('footer_ice');
    break;
  case "normal":
    header.classList.add('header_normal');
    footer.classList.add('footer_normal');
    break;
  case "poison":
    header.classList.add('header_poison');
    footer.classList.add('footer_poison');
    break;
  case "psychic":
    header.classList.add('header_psychic');
    footer.classList.add('footer_psychic');
    break;
  case "rock":
    header.classList.add('header_rock');
    footer.classList.add('footer_rock');
    break;
  case "steel":
    header.classList.add('header_steel');
    footer.classList.add('footer_steel');
    break;
  case "water":
    header.classList.add('header_water');
    footer.classList.add('footer_water');
}
}
addClass(Id)