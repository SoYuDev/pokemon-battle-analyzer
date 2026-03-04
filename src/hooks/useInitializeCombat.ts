import { useEffect } from "react";
import { useBattleStore } from "@/store/globalStore";
import { useHydration } from "./useHydration";

export function useInitializeCombat() {
  const isHydrated = useHydration();
  // Lo sacamos de la Store
  const { pokemonArrayToCombat, fetchPokemons } = useBattleStore();

  useEffect(() => {
    // Si ya estamos en el navegador y no hay luchadores, los buscamos
    if (isHydrated && pokemonArrayToCombat.length === 0) {
      fetchPokemons();
    }
  }, [isHydrated, pokemonArrayToCombat.length, fetchPokemons]);

  // Solo necesitamos devolver isHydrated porque el componente lo necesita para mostrar
  // la pantalla de "Cargando LocalStorage..."
  return isHydrated;
}
