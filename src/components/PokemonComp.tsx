import { fetchRandomPokemon } from "@/service/pokemonService";
import { Pokemon } from "@/types/pokemon";
import { useEffect, useState } from "react";

export default function PokemonComp() {
  const [parsedPokemon, setParsedPokemon] = useState<Pokemon | null>(null);

  // Hook useEffect, diferente al useState.
  // No debemos de usar componentes async ya que genera problemas y los fetching deben de ser
  // usado aquí.
  useEffect(() => {
    fetchRandomPokemon()
      // Como fetchRandomPokemon es Promise podemos hacer .then()
      .then((data) => {
        setParsedPokemon(data);
      });
  }, []);
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
