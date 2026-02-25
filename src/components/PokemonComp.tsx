import { Pokemon } from "@/types/pokemon";

// Declaramos la función asíncrona
export default async function PokemonComp() {
  const randomId: number = Math.floor(Math.random() * 1025) + 1;
  const baseUrl: string = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
  const errorUrl: string = `https://pokeapi.co/api/v2/pokemon/200000`;

  try {
    // La función espera hasta que no hagas el fetch.
    // Esta función devuelve un una Promesa de tipo Response donde está toda la respuesta HTTP
    const response = await fetch(baseUrl);
    // console.log(answer);

    // Si la respuesta HTTP NO está entre 200 y 299
    if (!response.ok) {
      return <p>Error al cargar el pokemon</p>;
    }

    // "Abrimos" el body de la respuesta HTTP y lo pasamos a formato JSON
    // Aunque podemos pensar que el body ya viene en formato JSON, viene en un String por lo que
    // debemos de parsear todo eso a JSON.
    const pokemonData = await response.json();
    console.log(pokemonData);

    // const parsedPokemon: Pokemon = {
    //   id: pokemonData.id,
    //   name: pokemonData.name,
    //   sprites: [pokemonData.sprites.front_default, pokemonData.sprites.back_default],
    //   stats: {pokemonData.stats[1].base_stat}

    // }
    
    return (
      <div>
        <h1 className="poke-nombre">{pokemonData.name}</h1>
        <img
          src={pokemonData.sprites.front_default}
          alt={`${pokemonData.name} image`}
        />
      </div>
    );
  } catch (error) {
    return <div>Server error</div>;
  }
}
