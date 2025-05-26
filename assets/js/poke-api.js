    const pokeApi = {}

    
    function convertPokemonApiDetailToPokemon(pokeDetail){
        const pokemon = new Pokemon()
        pokemon.number = pokeDetail.id;
        pokemon.name = pokeDetail.name;

        const types =  pokeDetail.types.map((typeSlot) => typeSlot.type.name);
        const [type] = types;
        
        pokemon.types = types;
        pokemon.type = type;


        const habilities =  pokeDetail.abilities.map((habilitySlot) => habilitySlot.ability.name);
        const [hability] = habilities;

        pokemon.habilities = habilities;
        pokemon.hability = hability;

        pokemon.shinyPhoto = pokeDetail.sprites.other["official-artwork"].front_shiny;
        pokemon.photo = pokeDetail.sprites.other["official-artwork"].front_default;
        pokemon.frontPixelPhoto = pokeDetail.sprites.front_default
        pokemon.backPixelPhoto = pokeDetail.sprites.back_default
        pokemon.frontShinyPixelPhoto = pokeDetail.sprites.front_shiny
        pokemon.backShinyPixelPhoto = pokeDetail.sprites.back_shiny  
        

        pokemon.weight = pokeDetail.weight
        pokemon.height = pokeDetail.height
        pokemon.hp = pokeDetail.stats[0].base_stat;
        pokemon.damage = pokeDetail.stats[1].base_stat;
        pokemon.defense = pokeDetail.stats[2].base_stat;
        pokemon.criticalDamage = pokeDetail.stats[3].base_stat;
        pokemon.criticalDefense = pokeDetail.stats[4].base_stat;
        pokemon.speed = pokeDetail.stats[5].base_stat;

        return pokemon
    }

        pokeApi.getPokemonsById = async (pokemonNumber) => {
            try {
                const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`
                const response = await fetch(url);
                const jsonBody = await response.json();
                return convertPokemonApiDetailToPokemon(jsonBody)
            }  catch (error) {
                console.error(`Erro na tentativa de leitura do URL pelo Id = ${pokemonNumber}:`, error);
            }
        }

                pokeApi.getSpeciesById = async (pokemonNumber) => {
            try {
                const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemonNumber}/`
                const response = await fetch(url);
                const jsonBody = await response.json();
                const evolutionSpecies = jsonBody.evolution_chain;
                const evolutionUrl = evolutionSpecies.url;
                const evolutionResponse = await fetch(evolutionUrl);
                const evolutionJson = await evolutionResponse.json();
                return verificarEvolucao(evolutionJson)
            }  catch (error) {
                console.error(`Erro na tentativa de leitura do URL pelo Id = ${pokemonNumber}:`, error);
            }
        }

        function verificarEvolucao(data){
            let list = [data.chain.species.name]
                if (data.chain.evolves_to.length > 0){
                    const evolution1 = data.chain.evolves_to[0]
                    list.push(evolution1.species.name)
                    if (evolution1.evolves_to.length > 0){
                        const evolution2 = evolution1.evolves_to[0].species.name
                        list.push(evolution2)
                    }
                }
                return list

        }
        pokeApi.getPokemonDetail = async (pokemon) => {
            try {
                const response = await fetch(pokemon.url);
                const jsonBody = await response.json();
                return convertPokemonApiDetailToPokemon(jsonBody);
            } catch (error) {
                console.error(`Erro na tentativa de leitura do URL:`, error);
            }
        };

        pokeApi.getPokemons = async (offset = 0, limit = 16) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
        const response = await fetch(url);
        const jsonBody = await response.json();
        const pokemons = jsonBody.results;

        return Promise.all(
            pokemons.map(async  (pokemon) => {
                const data = await pokeApi.getPokemonDetail(pokemon)
                console.log(data)
                return data
            })
            
        );
    } catch (error) {
        console.error("Erro na hora de extrair dados da API:", error);
    }
};
