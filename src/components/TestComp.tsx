// Si no pongo use client me salta error
"use client";

import { useBattleStore } from "@/store/globalStore";

export default function TestComp() {
  const { isFighting, toggleFight } = useBattleStore();
  console.log(`The value of isFighting is: ${isFighting}`);

  // Si descomento esto entra en un bucle infinito
  // toggleFight();
  // console.log(`The value of isFighting is: ${isFighting}`);

  return (
    <div>
      <h2>isFighting?: {isFighting}</h2>
      <button onClick={toggleFight}>Toggle</button>
    </div>
  );
}
