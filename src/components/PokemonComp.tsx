import { Pokemon } from "@/types/pokemon";
import { useState } from "react";
import TypeIcon from "./TypeIcon";
// Pasamos una variable, parsedPokemon que va a ser de tipo Pokemon
export default function PokemonComp({
  parsedPokemon,
}: {
  parsedPokemon: Pokemon;
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Imagen que se mostrará en caso de que el Pokemon no tenga imagen frontal.
  const fallbackImage =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";

  // Comprobamos si tiene backSprite, si no tiene siempre se mostrará el frontal.
  const imgToShow =
    isHovered && parsedPokemon.sprites[1]
      ? parsedPokemon.sprites[1]
      : parsedPokemon.sprites[0] || fallbackImage;

  return (
    <div>
      <p className="poke-nombre">{parsedPokemon.name}</p>
      <a
        href={`https://www.pokemon.com/us/pokedex/${parsedPokemon.name}`}
        target="_blank"
      >
        <img
        className="poke-image"
          src={imgToShow}
          alt={`${parsedPokemon.name} image`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ cursor: "pointer", transition: "all 0.3s ease" }}
        />
      </a>

      <div className="poke-types-container">
        {parsedPokemon.types.map((typeObj) => (
          <TypeIcon key={typeObj.type.name} typeName={typeObj.type.name} />
        ))}
      </div>

      <p>{`HP: ${parsedPokemon.stats[0].base_stat}`}</p>
    </div>
  );
}
