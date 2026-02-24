import { Pokemon } from "@/types/pokemon";

export default function PokemonCompOld() {
  const randomId: number = Math.floor(Math.random() * 1025) + 1;
  const baseUrl: string = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

  // Lo que devuelve el then, es lo que recibe el siguiente then p.j pokemon = answer.json
  return fetch(baseUrl)
    .then((answer) => {
      if (!answer.ok) {
        throw new Error("Error loading the Pokemon");
      }
      return answer.json();
    })
    .then((pokemon) => {
      return (
        <div>
          <h1 className="poke-nombre">{pokemon.name}</h1>
          <img
            src={pokemon.sprites.front_default}
            alt={`${pokemon.name} image`}
          />
        </div>
      );
    })
    .catch((error) => {
      return (
        <div>
          <p>API ERROR</p>
        </div>
      );
    });
}
