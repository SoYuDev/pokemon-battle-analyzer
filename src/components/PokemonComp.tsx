import { Pokemon } from "@/types/pokemon";

// Declaramos la función asíncrona
export default async function PokemonComp() {
  const randomId: number = Math.floor(Math.random() * 1025) + 1;
  const baseUrl: string = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

  try {
    const response = await fetch(baseUrl);
    console.log(response);

    // Si la respuesta HTTP NO está entre 200 y 299
    if (!response.ok) {
      return <p>Error al cargar el pokemon</p>;
    }

    // "Abrimos" el body de la respuesta HTTP y lo pasamos a formato JSON
    const pokemonData = await response.json();
    console.log(pokemonData);

    const parsedPokemon: Pokemon = {
      id: pokemonData.id,
      name: pokemonData.name,
      sprites: [
        pokemonData.sprites.front_default,
        pokemonData.sprites.back_default,
      ],
      stats: pokemonData.stats,
      types: pokemonData.types,
    };

    console.log(parsedPokemon);

    return (
      <div>
        <h1 className="poke-nombre">{parsedPokemon.name}</h1>
        <img
          src={parsedPokemon.sprites[0]}
          alt={`${parsedPokemon.name} image`}
        />
        <p>{`HP: ${parsedPokemon.stats[0].base_stat}`}</p>
      </div>
    );
  } catch (error) {
    return <div>Server error</div>;
  }
}
