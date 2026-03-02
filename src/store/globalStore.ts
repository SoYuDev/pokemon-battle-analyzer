import { fetchRandomPokemon } from "@/service/pokemonService";
import { Pokemon } from "@/types/pokemon";
import { create } from "zustand";

interface BattleState {
  isFighting: boolean;
  pokemonLeft: Pokemon | null;
  pokemonRight: Pokemon | null;
  pokemonArray: (Pokemon | null)[];
  toggleFight: () => void;
  // Las funciones async siempre devuelven una Promesa aunque no estemos devolviendo los Pokemon.
  fetchBothPokemons: () => Promise<void>;
}

export const useBattleStore = create<BattleState>((set) => ({
  // Initial state
  isFighting: false,
  pokemonLeft: null,
  pokemonRight: null,
  pokemonArray: [],

  toggleFight: () => set((state) => ({ isFighting: !state.isFighting })),

  fetchBothPokemons: async () => {
    set({ isFighting: false });
    try {
      const [data1, data2] = await Promise.all([
        fetchRandomPokemon(),
        fetchRandomPokemon(),
      ]);

      set({ pokemonLeft: data1, pokemonRight: data2 });

      set({ pokemonArray: [data1, data2, data1] });
    } catch (error) {
      console.log("Error fetching Pokemons: ", error);
    }
  },
}));
