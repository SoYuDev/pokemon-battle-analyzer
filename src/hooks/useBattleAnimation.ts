import { useState } from "react";

// Custom Hook con parámetros de entrada, le pasaremos los métodos de la Store de Zustand
// Para que en el componente pueda modificar los atributos.
export function useBattleAnimation(
  toggleFight: () => void,
  setFightComputed: (computed: boolean) => void
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
  };

  return { battleText, startBattleAnimation };
}