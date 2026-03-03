"use client";

import { useBattleStore } from "@/store/globalStore";
import PokemonComp from "./PokemonComp";
import { useEffect, useState } from "react";

export default function PokemonCombat() {
  // Obj destructuring
  const {
    isFighting,
    toggleFight,
    pokemonArray,
    pokemonArrayByType,
    pokemonWinner,
    fetchPokemons,
  } = useBattleStore();

  const [battleText, setBattleText] = useState("Battle");
  const [isFightComputed, setFightComputed] = useState(false);

  useEffect(() => {
    fetchPokemons();
  }, []);

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

    // Al final, ejecutamos el resto de la lógica
    toggleFight();
    setFightComputed(true);
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
          {pokemonArray.map((poke, index) => (
            // poke existe? devuelve su id, sino, devuelve undefined.
            <span className="poke-nombre" key={poke?.id}>
              {poke?.name}
              {/* Comprobración para ver si el pokemon evaluado es el último y poner o no un texto "vs" */}
              {index < pokemonArray.length - 1 ? " vs " : ""}
            </span>
          ))}
        </h1>
      </header>
      <main>
        {/* Pokemon Components here */}
        {pokemonArray.length > 0 ? (
          pokemonArray.map((poke) => (
            // Entiendo que el casteo es mala práctica deberiamos de poner un ternario aqui
            <PokemonComp key={poke?.id} parsedPokemon={poke!} />
          ))
        ) : (
          <p>Cargando Pokemon...</p>
        )}
      </main>
      <p>Winner is the one with higher Attack stat!</p>
      <button onClick={handleBattleButton} disabled={isFighting}>
        {battleText}
      </button>

      {/* Hasta que no ocurren los setTimeOuts no se muestra nada */}
      {isFightComputed ? (
        <div>
          <p>
            The winner is{" "}
            <span className="poke-nombre">{pokemonWinner?.name}</span>
          </p>
          <div className="winner-types">
            {pokemonArrayByType.length > 0 ? (
              pokemonArrayByType.map((poke) => (
                // Entiendo que el casteo es mala práctica deberiamos de poner un ternario aqui
                <PokemonComp key={poke?.id} parsedPokemon={poke!} />
              ))
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
