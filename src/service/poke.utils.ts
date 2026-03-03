import { Pokemon } from "@/types/pokemon";

// ? Archivo con métodos utiles para acceder a los atributos de los Pokemon

export const getPrimaryType = (pokemon: Pokemon): string => {
  return pokemon.types[0]?.type?.name || "";
};

export const getAttack = (pokemon: Pokemon): number => {
  // Access to the array element which value it's "attack"
  const pokeAttackValue = pokemon.stats.find((s) => s.stat.name === "attack");
  return pokeAttackValue ? pokeAttackValue.base_stat : 0;
};
