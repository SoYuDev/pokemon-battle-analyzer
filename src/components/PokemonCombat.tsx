"use client";

import { useBattleStore } from "@/store/globalStore";
import PokemonComp from "./PokemonComp";
import { useBattleAnimation } from "@/hooks/useBattleAnimation";
import { useInitializeCombat } from "@/hooks/useInitializeCombat";

export default function PokemonCombat() {
  const {
    isFighting,
    toggleFight,
    pokemonArrayToCombat,
    pokemonWinner,
    pokemonWinnerArrayByType,
    fetchPokemons,
    isFightComputed,
    setFightComputed,
  } = useBattleStore();

  // Custom Hook
  // isHydrated se encarga de dar tiempo a la app para que recoja la información de localStorage
  const isHydrated = useInitializeCombat();

  // Custom Hook
  const { battleText, startBattleAnimation } = useBattleAnimation(
    toggleFight,
    setFightComputed,
  );

  // ---------------------------------------------------------------------------------------------//

  // Si Next.js aún no ha cargado los datos de localStorage, evitamos pintar la pantalla rota
  if (!isHydrated) {
    return <p>Cargando LocalStorage...</p>;
  }

  return (
    <>
      <div className="battle-menu">
        <button
          onClick={fetchPokemons}
          style={{ backgroundColor: isFighting ? "red" : "#fff" }}
          disabled={isFighting}
        >
          Start New Battle
        </button>
        <h2 className="pokemon-fighters">
          {pokemonArrayToCombat.map((poke, index) => (
            <span className="poke-nombre" key={poke?.id}>
              {poke?.name}
              {/* El index es por si tuviesemos más de dos pokemons que se pelearan */}
              {index < pokemonArrayToCombat.length - 1 ? " vs " : ""}
            </span>
          ))}
        </h2>
      </div>

      <main className="arena">
        {pokemonArrayToCombat.length > 0 ? (
          pokemonArrayToCombat.map((poke) => {
            if (!poke) return null;
            return <PokemonComp key={poke.id} parsedPokemon={poke} />;
          })
        ) : (
          <p>Cargando Pokemon...</p>
        )}
      </main>

      <p>Winner is the one with higher Attack stat!</p>

      {/* Si la batalla ya se calculó, deshabilitamos el botón también */}
      <button
        onClick={startBattleAnimation}
        disabled={isFighting || isFightComputed}
      >
        {battleText}
      </button>

      {/* Usamos el isFightComputed de la Store Global */}
      {isFightComputed ? (
        <div className="combat-results">
          <p className="winner-text">
            The winner is{" "}
            <span className="poke-nombre">{pokemonWinner?.name}</span>
          </p>
          <div className="winner-types">
            {pokemonWinnerArrayByType.length > 0 ? (
              pokemonWinnerArrayByType.map((poke) => {
                if (!poke) return null;
                return <PokemonComp key={poke.id} parsedPokemon={poke} />;
              })
            ) : (
              <p>Cargando Pokemon...</p>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
