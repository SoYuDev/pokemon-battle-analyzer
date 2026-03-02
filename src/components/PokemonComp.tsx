import { Pokemon } from "@/types/pokemon";
import { useState } from "react";
// Pasamos una variable, parsedPokemon que va a ser de tipo Pokemon
export default function PokemonComp({
  parsedPokemon,
}: {
  parsedPokemon: Pokemon;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const imgToShow = isHovered
    ? parsedPokemon.sprites[1]
    : parsedPokemon.sprites[0];

  return (
    <div>
      <h1 className="poke-nombre">{parsedPokemon.name}</h1>
      <a href={`https://www.pokemon.com/us/pokedex/${parsedPokemon.name}`} target="_blank">
        <img
          src={imgToShow}
          alt={`${parsedPokemon.name} image`}
          loading="lazy"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ cursor: "pointer", transition: "all 0.3s ease" }}
        />
      </a>

      <p>{`HP: ${parsedPokemon.stats[0].base_stat}`}</p>
    </div>
  );
}
