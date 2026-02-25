interface Stat {
  name: string;
  url: string;
}

interface Stats {
  base_stat: number;
  effort: number;
  stat: Stat;
}

interface Type {
  slot: number;
  type: { name: string; url: string };
}

interface Types {
  slot: number;
  type: Type[];
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: string[];
  // El ataque está embebido aquí
  stats: Stats[];
  // Los tipos, del que necesitamos el primero está embebido aquí
  types: Types[];
}
