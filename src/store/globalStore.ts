import { fetchRandomPokemon } from "@/service/pokemonService";
import { Pokemon } from "@/types/pokemon";
import { create } from "zustand";

interface BattleState {
  isFighting: boolean;
  pokemonArray: (Pokemon | null)[];
  pokemonWinner: Pokemon | null;
  toggleFight: () => void;
  // Las funciones async siempre devuelven una Promesa aunque no estemos devolviendo los Pokemon.
  fetchPokemons: () => Promise<void>;
  calculateWinner: () => void;
}

export const useBattleStore = create<BattleState>((set, get) => ({
  // Initial state
  isFighting: false,
  pokemonArray: [],
  pokemonWinner: null,

  toggleFight: () => set((state) => ({ isFighting: !state.isFighting })),

  fetchPokemons: async () => {
    set({ isFighting: false });
    try {
      const [data1, data2] = await Promise.all([
        fetchRandomPokemon(),
        fetchRandomPokemon(),
      ]);

      set({ pokemonArray: [data1, data2] });
      console.log(get().pokemonArray);

      get().calculateWinner();
    } catch (error) {
      console.log("Error fetching Pokemons: ", error);
    }
  },

  calculateWinner: () => {
    const misPokemons = get().pokemonArray;

    // Inicializamos array vacío, normalmente tendremos un único ganador, pero puede darse el caso
    // de que los Pokemon evaluados tengan el mismo ataque y ataque especial, dandose un empate.
    const winnerPokemonArray: Pokemon[] = [];

    if (misPokemons.length > 0) {
      // Eliminamos los posibles pokemons que sean nulos de la lista.
      const filteredPokemons: Pokemon[] = misPokemons.filter(
        (poke) => poke !== null,
      );

      /*
      Pasamos como valor inicial (acummulator) el primer Pokemon de la lista, durante la 
      iteración va a ir comprobando si el pokemon pasado tiene más o menos ataque que el actual
      en función del resultado el acumulador será uno u otro.
      */
      const pokemonWinner = filteredPokemons.reduce(
        (accumulator, currentPokemon) => {
          return currentPokemon.stats[1].base_stat >
            accumulator.stats[1].base_stat
            ? currentPokemon
            : accumulator;
        },
        filteredPokemons[0],
      );
      console.log("The winner is...", pokemonWinner.name);
      set({ pokemonWinner: pokemonWinner });
    } else {
      console.log("Error, no hay pokemons en la lista...");
    }
  },
}));
