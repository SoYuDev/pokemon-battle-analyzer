// Si no pongo use client me salta error
"use client";

import { useBattleStore } from "@/store/globalStore";

export default function TestComp() {
  const { isFighting, toggleFight } = useBattleStore();
  console.log(`The value of isFighting is: ${isFighting}`);

  function test() {
    toggleFight();
  }

  // Otra manera de acceder al valor isFighting
  const isFightingValue = useBattleStore((s) => s.isFighting);

  // Si descomento esto entra en un bucle infinito
  // toggleFight();
  // console.log(`The value of isFighting is: ${isFighting}`);

  return (
    <div>
      <h2>isFighting?: {isFighting}</h2>
      <button onClick={test}>Toggle</button>
    </div>
  );
}
