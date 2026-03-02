"use client";

import { useBattleStore } from "@/store/globalStore";
import PokemonComp from "./PokemonComp";
import { useEffect } from "react";
import { Pokemon } from "@/types/pokemon";

export default function PokemonCombat() {
  // Obj destructuring
  const {
    isFighting,
    toggleFight,
    pokemonLeft,
    pokemonRight,
    pokemonArray,
    fetchBothPokemons,
  } = useBattleStore();

  useEffect(() => {
    if (!pokemonLeft || !pokemonRight) {
      fetchBothPokemons();
    }
  }, []);

  function handleBattleButton() {
    toggleFight();
  }

  return (
    <>
      <header>
        <button
          onClick={fetchBothPokemons}
          style={{ backgroundColor: isFighting ? "red" : "white" }}
        >
          Start New Battle
        </button>
        <h1>
          {pokemonArray.map((poke, index) => (
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
            <PokemonComp key={poke?.id} parsedPokemon={poke as Pokemon} />
          ))
        ) : (
          <p>Cargando Pokemon...</p>
        )}
      </main>
      <p>Winner is the one with higher Attack stat!</p>
      <button onClick={handleBattleButton}>Battle</button>
    </>
  );
}
