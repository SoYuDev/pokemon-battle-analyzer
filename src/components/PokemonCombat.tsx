"use client";

import { useBattleStore } from "@/store/globalStore";
import PokemonComp from "./PokemonComp";
import { useEffect } from "react";

export default function PokemonCombat() {
  // Obj destructuring
  const {
    isFighting,
    toggleFight,
    pokemonArray,
    pokemonWinner,
    fetchPokemons,
  } = useBattleStore();

  useEffect(() => {
    fetchPokemons();
  }, []);

  function handleBattleButton() {
    toggleFight();
  }

  return (
    <>
      <header>
        <button
          onClick={fetchPokemons}
          style={{ backgroundColor: isFighting ? "red" : "white" }}
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
        Battle
      </button>
      {isFighting ? <p>The winner is {pokemonWinner?.name}</p> : ""}
    </>
  );
}
