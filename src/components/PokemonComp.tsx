import { Pokemon } from "@/types/pokemon";
// Pasamos una variable, parsedPokemon que va a ser de tipo Pokemon
export default function PokemonComp({
  parsedPokemon,
}: {
  parsedPokemon: Pokemon;
}) {
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
