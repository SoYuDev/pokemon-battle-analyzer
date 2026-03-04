// Esta interface sirve tanto para las stats como para los tipos.
interface NamedAPIResource {
  name: string;
  url: string;
}

interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: string[];
  // El ataque está embebido aquí
  stats: PokemonStat[];
  // Los tipos, del que necesitamos el primero, está embebido aquí
  types: PokemonType[];
}
