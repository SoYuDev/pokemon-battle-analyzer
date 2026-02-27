"use client";

import { useBattleStore } from "@/store/globalStore";
import PokemonComp from "./PokemonComp";

export default function PokemonCombat() {
  const { isFighting, toggleFight } = useBattleStore();
  function handleBattleButton() {
    toggleFight();
  }

  return (
    <>
      <header>
        <button style={{ backgroundColor: isFighting ? "red" : "white" }}>
          Start New Battle
        </button>
        <h1>Pokemon 1 vs Pokemon 2</h1>
      </header>
      <main>
        <PokemonComp></PokemonComp>
        <PokemonComp></PokemonComp>
      </main>
      <p>Winner is the one with higher Attack stat!</p>
      <button onClick={handleBattleButton}>Battle</button>
    </>
  );
}
