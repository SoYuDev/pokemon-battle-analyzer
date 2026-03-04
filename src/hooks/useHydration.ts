import { useState, useEffect } from "react";

// La finalidad de este Custom Hook es desacoplar la lógica de los componentes
// Es un semáforo para darle tiempo a Zustand a que recoja la información del localStorage
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Cuando el componente se monta en el navegador, indicamos que ya podemos leer la memoria
    setIsHydrated(true);
  }, []);

  return isHydrated;
}
