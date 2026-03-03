import { getAttack, getPrimaryType } from "@/service/poke.utils";
import {
  fetchRandomPokemon,
  fetchRandomPokemonByType,
} from "@/service/pokemonService";
import { Pokemon } from "@/types/pokemon";
import { create } from "zustand";

interface BattleState {
  isFighting: boolean;
  pokemonArrayToCombat: (Pokemon | null)[];
  pokemonWinner: Pokemon | null;
  pokemonWinnerArrayByType: (Pokemon | null)[];
  toggleFight: () => void;
  // Las funciones async siempre devuelven una Promesa aunque no estemos devolviendo los Pokemon.
  fetchPokemons: () => Promise<void>;
  calculateWinner: () => void;
  fetchPokemonsByWinner: () => Promise<void>;
}

export const useBattleStore = create<BattleState>((set, get) => ({
  // Initial state
  isFighting: false,
  pokemonArrayToCombat: [],
  pokemonWinner: null,
  pokemonWinnerArrayByType: [],

  toggleFight: () => set((state) => ({ isFighting: !state.isFighting })),

  fetchPokemons: async () => {
    set({ isFighting: false });
    try {
      const [data1, data2] = await Promise.all([
        fetchRandomPokemon(),
        fetchRandomPokemon(),
      ]);

      set({ pokemonArrayToCombat: [data1, data2] });
      console.log(get().pokemonArrayToCombat);

      get().calculateWinner();
    } catch (error) {
      console.log("Error fetching Pokemons: ", error);
    }
  },

  calculateWinner: () => {
    const fightingPokemons = get().pokemonArrayToCombat;

    if (!fightingPokemons || fightingPokemons.length === 0) {
      console.log("Error, no hay pokemons en la lista...");
      return;
    }

    // Eliminamos los posibles pokemons que sean nulos de la lista.
    const filteredPokemons: Pokemon[] = fightingPokemons.filter(
      (poke) => poke !== null,
    );

    if (filteredPokemons.length === 0) return;

    /*
      Pasamos como valor inicial (acummulator) el primer Pokemon de la lista, durante la 
      iteración va a ir comprobando si el pokemon pasado tiene más o menos ataque que el actual
      en función del resultado el acumulador será uno u otro.
      */
    const pokemonWinner = filteredPokemons.reduce(
      (accumulator, currentPokemon) => {
        return getAttack(currentPokemon) > getAttack(accumulator)
          ? currentPokemon
          : accumulator;
      },
      filteredPokemons[0],
    );

    console.log("WINNER: ", pokemonWinner);
    set({ pokemonWinner: pokemonWinner });

    get().fetchPokemonsByWinner();
  },

  fetchPokemonsByWinner: async () => {
    const winnerPok = get().pokemonWinner;

    if (!winnerPok) return;

    const winnerType = getPrimaryType(winnerPok);

    if (!winnerType) {
      console.log("Error getting winner's type.");
      return;
    }

    try {
      const POKEMONS_TO_FETCH = 3;

      // Create Array of Promises from specified number
      const fetchPromises: Promise<Pokemon | null>[] = Array.from(
        { length: POKEMONS_TO_FETCH },
        () => fetchRandomPokemonByType(winnerType),
      );

      const newPokemonsArray: (Pokemon | null)[] =
        await Promise.all(fetchPromises);
      set({ pokemonWinnerArrayByType: newPokemonsArray });

      console.log("POKEMONS BY TYPE", get().pokemonWinnerArrayByType);
    } catch (error) {
      console.log("Error fetching Pokemons: ", error);
    }
  },
}));
