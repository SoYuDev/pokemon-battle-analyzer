import { Pokemon } from "@/types/pokemon";

export default async function PokemonComp() {
  const randomId: number = Math.floor(Math.random() * 1025) + 1;
  const baseUrl: string = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
  const errorUrl: string = `https://pokeapi.co/api/v2/pokemon/200000`;

  try {
    const answer = await fetch(errorUrl);

    if (!answer.ok) {
      return <p>Error al cargar el pokemon</p>;
    }

    const pokemon = await answer.json();
    console.log(pokemon);

    return (
      <div>
        <h1 className="poke-nombre">{pokemon.name}</h1>
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
    );
  } catch (error) {
    return <div>Server error</div>;
  }
}
