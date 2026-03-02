"use client";

import { useBattleStore } from "@/store/globalStore";
import PokemonComp from "./PokemonComp";
import { useEffect } from "react";

export default function PokemonCombat() {
  // Obj destructuring
  const {
    isFighting,
    toggleFight,
    pokemonLeft,
    pokemonRight,
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
        <button onClick={fetchBothPokemons} style={{ backgroundColor: isFighting ? "red" : "white" }}>
          Start New Battle
        </button>
        <h1>Pokemon 1 vs Pokemon 2</h1>
      </header>
      <main>
        {pokemonLeft ? (
          <PokemonComp parsedPokemon={pokemonLeft}></PokemonComp>
        ) : (
          <p>Loading...</p>
        )}
        
        {pokemonRight ? (
          <PokemonComp parsedPokemon={pokemonRight}></PokemonComp>
        ) : (
          <p>Loading...</p>
        )}
      </main>
      <p>Winner is the one with higher Attack stat!</p>
      <button onClick={handleBattleButton}>Battle</button>
    </>
  );
}
