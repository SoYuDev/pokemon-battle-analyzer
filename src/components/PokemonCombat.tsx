"use client";

import { useBattleStore } from "@/store/globalStore";
import PokemonComp from "./PokemonComp";
import { useEffect, useState } from "react";

export default function PokemonCombat() {
  const {
    isFighting,
    toggleFight,
    pokemonArrayToCombat,
    pokemonWinner,
    pokemonWinnerArrayByType,
    fetchPokemons,
    isFightComputed, // Viene de la store
    setFightComputed, // Viene de la store
  } = useBattleStore();

  const [battleText, setBattleText] = useState("Battle");

  // TRUCO DE NEXT.JS: Esperar a leer el LocalStorage
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Cuando el componente se monta en el navegador, indicamos que ya podemos leer la memoria
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // SOLO llamamos a fetchPokemons si ya hemos leído la memoria (isHydrated)
    // Y el array de pokémons está realmente vacío.
    if (isHydrated && pokemonArrayToCombat.length === 0) {
      fetchPokemons();
    }
  }, [isHydrated, pokemonArrayToCombat.length, fetchPokemons]);

  function handleBattleButton() {
    toggleFight();
    setFightComputed(false);
    changeBattleButtonText();
  }

  // Helper Method, almacenamos una arrow function. También tenemos la opción de usar setInterval()
  const delay = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

  async function changeBattleButtonText() {
    await delay(1000);
    setBattleText("Fighting.");

    await delay(1000);
    setBattleText("Fighting..");

    await delay(1000);
    setBattleText("Fighting...");

    await delay(1000);
    setBattleText("Battle");

    toggleFight();
    setFightComputed(true);
  }

  // Si Next.js aún no ha cargado los datos de memoria, evitamos pintar la pantalla rota
  if (!isHydrated) {
    return <p>Cargando LocalStorage...</p>;
  }

  return (
    <>
      <header>
        <button
          onClick={fetchPokemons}
          style={{ backgroundColor: isFighting ? "red" : "white" }}
          disabled={isFighting}
        >
          Start New Battle
        </button>
        <h1>
          {pokemonArrayToCombat.map((poke, index) => (
            <span className="poke-nombre" key={poke?.id}>
              {poke?.name}
              {index < pokemonArrayToCombat.length - 1 ? " vs " : ""}
            </span>
          ))}
        </h1>
      </header>
      <main>
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
        onClick={handleBattleButton}
        disabled={isFighting || isFightComputed}
      >
        {battleText}
      </button>

      {/* Usamos el isFightComputed de la Store Global */}
      {isFightComputed ? (
        <div>
          <p>
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
