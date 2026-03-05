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
      particleCount: 200,
      spread: 120, // Angulo apertura
      origin: { y: 0.75 },
      scalar: 1.2, // Escala el tamaño de los papeles
      ticks: 500, // Duración
      gravity: 0.8, // Caen un poco más suavemente
      startVelocity: 50, // Salen disparados hacia arriba con más fuerza
      colors: ["#FF0000", "#FFFFFF", "#0000FF", "#FFD700"],
    });
  };

  return { battleText, startBattleAnimation };
}
