import { fetchRandomPokemon } from "@/service/pokemonService";
import { Pokemon } from "@/types/pokemon";

export default async function PokemonComp() {
  const parsedPokemon: Pokemon | null = await fetchRandomPokemon();
  console.log(parsedPokemon);
  // Si es null...
  if (!parsedPokemon) {
    return <p>Error fetching the Pokemon</p>;
  }

  return (
    <div>
      <h1 className="poke-nombre">{parsedPokemon.name}</h1>
      <img
        src={parsedPokemon.sprites[0]}
        alt={`${parsedPokemon.name} image`}
        loading="lazy"
      />

      <p>{`HP: ${parsedPokemon.stats[0].base_stat}`}</p>
    </div>
  );
}
