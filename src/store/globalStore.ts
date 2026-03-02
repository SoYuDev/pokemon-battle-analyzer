import { fetchRandomPokemon } from "@/service/pokemonService";
import { Pokemon } from "@/types/pokemon";
import { create } from "zustand";

interface BattleState {
  isFighting: boolean;
  pokemonArray: (Pokemon | null)[];
  toggleFight: () => void;
  // Las funciones async siempre devuelven una Promesa aunque no estemos devolviendo los Pokemon.
  fetchPokemons: () => Promise<void>;
}

export const useBattleStore = create<BattleState>((set) => ({
  // Initial state
  isFighting: false,
  pokemonArray: [],

  toggleFight: () => set((state) => ({ isFighting: !state.isFighting })),

  fetchPokemons: async () => {
    set({ isFighting: false });
    try {
      const [data1, data2] = await Promise.all([
        fetchRandomPokemon(),
        fetchRandomPokemon(),
      ]);

      set({ pokemonArray: [data1, data2] });
    } catch (error) {
      console.log("Error fetching Pokemons: ", error);
    }
  },
}));
