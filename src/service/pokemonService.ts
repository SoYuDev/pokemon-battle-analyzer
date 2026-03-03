import { Pokemon } from "@/types/pokemon";

const axios = require("axios");
const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const BASE_URL_TYPE = "https://pokeapi.co/api/v2/type/";

export function generateRandomPokemonId(): number {
  return Math.floor(Math.random() * 1025) + 1;
}

// Lo suyo es que el backend nos mandase un DTO que nosotros podamos crear una interfaz
// Al ser un API publica con muchísima información lo dejamos como any
function parsePokemonData(responseData: any): Pokemon {
  const parsedPokemon: Pokemon = {
    id: responseData.id,
    name: responseData.name,
    sprites: [
      responseData.sprites.front_default,
      responseData.sprites.back_default,
    ],
    stats: responseData.stats,
    types: responseData.types,
  };
  return parsedPokemon;
}

export async function customAxiosWithId(
  url: string,
  id: number,
): Promise<Pokemon | null> {
  try {
    const buildedUrl = `${url}${id}`;
    const response = await axios.get(buildedUrl);

    return parsePokemonData(response.data);
  } catch (error) {
    console.log(`Error fetching pokemon with id: ${id}`, error);
    return null;
  }
}

export async function fetchRandomPokemon(): Promise<Pokemon | null> {
  const randomPokemonId = generateRandomPokemonId();
  return customAxiosWithId(BASE_URL, randomPokemonId);
}

export async function fetchPokemonByUrl(url: string): Promise<Pokemon | null> {
  const response = await axios.get(url);
  return parsePokemonData(response.data);
}

// Recogeremos el tipo del ganador a partir de la globalStore.
export async function fetchRandomPokemonByType(
  pokeType: string,
): Promise<Pokemon | null> {
  const response = await axios.get(`${BASE_URL_TYPE}${pokeType}`);

  // No se puede leer esta propiedad que se indica en el doc, no existe en el JSON.
  // console.log(response.data.types[0].type.url);

  const pokemonLengthByType = response.data.pokemon.length;
  const randomNumber = Math.floor(Math.random() * pokemonLengthByType) + 1;


// A partir de esta llamada a la API, solo podemos acceder a la URL donde estan sus datos
  return fetchPokemonByUrl(response.data.pokemon[randomNumber].pokemon.url);
}
