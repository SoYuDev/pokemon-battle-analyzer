import { Pokemon } from "@/types/pokemon";

// Declaramos la función asíncrona
export default async function PokemonComp() {
  const randomId: number = Math.floor(Math.random() * 1025) + 1;
  const baseUrl: string = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
  const errorUrl: string = `https://pokeapi.co/api/v2/pokemon/200000`;

  try {
    // La función espera hasta que no hagas el fetch.
    // Esta función devuelve un objeto llamado Response donde está toda la respuesta HTTP
    const answer = await fetch(errorUrl);

    // Si la respuesta HTTP está entre 200 y 299
    if (!answer.ok) {
      return <p>Error al cargar el pokemon</p>;
    }

    // "Abrimos" el body de la respuesta HTTP y lo pasamos a formato JSON
    // Aunque podemos pensar que el body ya viene en formato JSON, viene en un String por lo que
    // debemos de parsear todo eso a JSON.
    const pokemon = await answer.json();
    console.log(pokemon);

    return (
      <div>
        <h1 className="poke-nombre">{pokemon.name}</h1>
        <img
          src={pokemon.sprites.front_default}
          alt={`${pokemon.name} image`}
        />
      </div>
    );
  } catch (error) {
    return <div>Server error</div>;
  }
}
