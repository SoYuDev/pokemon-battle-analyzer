import { useState } from "react";

import confetti from "canvas-confetti";

// Custom Hook con parámetros de entrada, le pasaremos los métodos de la Store de Zustand
// Para que en el componente pueda modificar los atributos.
export function useBattleAnimation(
  toggleFight: () => void,
  setFightComputed: (computed: boolean) => void,
) {
  const [battleText, setBattleText] = useState("Battle");

  const delay = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const startBattleAnimation = async () => {
    // Bloqueamos la UI al empezar
    toggleFight();
    setFightComputed(false);

    // Animación de texto
    await delay(1000);
    setBattleText("Fighting.");
    await delay(1000);
    setBattleText("Fighting..");
    await delay(1000);
    setBattleText("Fighting...");
    await delay(1000);
    setBattleText("Battle");

    // Desbloqueamos y mostramos resultados
    toggleFight();
    setFightComputed(true);

    confetti({
      particleCount: 150, // Cantidad de papelitos
      spread: 80, // Cuánto se esparcen
      origin: { y: 0.6 }, // De dónde salen (0.6 es un poco más abajo de la mitad de la pantalla)
      colors: ["#FF0000", "#FFFFFF", "#0000FF", "#FFD700"], // Opcional: Colores de Pokémon
    });
  };

  return { battleText, startBattleAnimation };
}
