# NextJS

Next JS es un framework de React

## App Router

Se crea un enrutamiento por carpetas. Al crear una carpeta esa página existirá.

## Layout

Es un componente que envuelve a otros, se mantiene fijo y sin rencargar mientras el usuario navega.

## Server Components

- Todos los componentes se ejecutan en el servidor

- Simplifica el fetching de datos

- Usa el componente <Image/> en vez del tag img
  - Coge la imagen, le reduce el peso automáticamente y la carga mediante lazy loading

- SEO automático
  - Al dibujar la página en el servidor (SSR) antes de enviarsela al usuario, el robot de Google ve instantaneamente toda la información de los Pokemon. Con React normal la pantalla se cargaría en blanco inicialmente y tendría un peor posicionamiento.

  ## useState Context y gestores de estado (Zustand / Redux)

  ### useState
  - Estado local de un componente
  - Ideal para cosas pequeñas y aisladas

  ### Context
  - Permite compartir datos globales sin pasar props
  - Se combine con useState o useReducer

  ### Gestores de estado (Zustand / Redux)
  - Pensados para un estado global complejo
  - Mejor rendimiento y organización para apps grandes
  - Zustand cubre lo que harias con Context + useReducer pero con menos codigo.

  ## useEffect

  Hook muy importante como useState, se ejecuta una vez como mínimo o cada vez que cambiamos algunas
  de sus dependencias

  ```typescript
  useEffect(() => {
    fetchRandomPokemon().then(setParsedPokemon);
  }, []);
  ```

  ```typescript
  useEffect(() => {
    if (!pokemonLeft || !pokemonRight) {
      fetchBothPokemons();
    }
  }, []);
  ```

  La dependencias se especifican en el array (el segundo argumento) cada vez que cambien se,
  se ejecutará de nuevo.

  ## Non-null Assertion Operator -> poke!

  Le decimos al compilador de TypeScript que la variable nunca va a ser null o undefined. En el
  siguiente caso es mala práctica ya que ese valor puede llegar a ser null por lo que mejor es un
  ternario.

  ```typescript
        <main>
        {pokemonArrayToCombat.length > 0 ? (
          pokemonArrayToCombat.map((poke) => (
            // Entiendo que el casteo es mala práctica deberiamos de poner un ternario aqui (lo es)
            <PokemonComp key={poke?.id} parsedPokemon={poke!} />
          ))
        ) : (
          <p>Cargando Pokemon...</p>
        )}
      </main>
  ```

## Zustand persist middleware

De manera automática hace lo siguiente:

- Al hacer un set para cambiar un dato, coge ese dato y lo mete en el localStorage
- Cuando carga la página lee el localStorage y sobreescribe los datos con los que tenía

### partialize

Nos permite especificar que datos queremos guardar exactamente

```typescript
    // 3. Opciones de configuración del persist
    {
      name: "pokemon-battle-storage", // Nombre de la key en el LocalStorage
      // partialize es un filtro en el que especificaos qué variables queremos
      partialize: (state) => ({
        // Guardamos solo los datos, omitiendo el isFighting
        pokemonArrayToCombat: state.pokemonArrayToCombat,
        pokemonWinner: state.pokemonWinner,
        pokemonWinnerArrayByType: state.pokemonWinnerArrayByType,
        isFightComputed: state.isFightComputed,
      }),
    },
```

## Resolución de problemas con Next.js y Zustand

Next.js pinta la página en un servidor y luego manda el HTML al navegador. Aquí está el conflicto.

### Hydration Mismatch

El problema que teniamos antes del commit "cae4818" era el siguiente:

1. El componente nace: Next.js monta el componente. Como el servidor no tiene localStorage el estado
   inicial es un Array vacío.

2. Antes de crear el semáforo isHydrated se disparaba la petición a la API

3. Zustand empieza a leer el localStorage y coloca los guarda en pantalla.

4. La peticion que hicimos en el paso 2 responde, sobrescribiendo los datos del localStorage

** Al añadir la variable isHydrated obligamos a esperar a que Zustand obtenga los datos.
Si no hay datos, entonces si se hará una llamada a la API.
**

## Flujo del programa.

### Primer Render

- isHydrated: false
- Si no tenemos información en el localStorage, pokemonArrayToCombat estará vacío.
- Si isHydrated es false, el componente devuelve un texto de error

Después, se ejecutara el useEffect que establece isHydrated a true, este use effect se ejecuta una
vez al tener las dependencias vacías. Al cambiar el estado, se vuelve a renderizar el componente.

### Segundo Render

- isHydrated: true
  Por lo que se cargará todo el HTML.

El segundo useEffect se ejecuta cada vez que cambia algo en sus dependencias, como hemos cambiado
isHydrated se dispara.

Este useEffect tiene sus validaciones, comprueba que isHydrated sea false y que pokemonArrayToCombat
sea para hacer un fetch y rellenar pokemonArrayToCombat

## Custom Hooks

Son útiles para desacoplar la lógica de un componente y reutilizarla si es necesario.
Deben empezar por use para que React los identifique.

- No se pueden llamar dentro de if o for
- Tienen que estar siempre en la parte de más arriba del componente
- Se ejecutan exactamente en el orden en el que están puestos

## TODO

Tengo un componente padre donde se hacen dos llamadas a la api o donde puedo usar Promise.all.
Este componente encapsula dos componentes Pokemon

Usar zustand o redux o mobex para el gestor de estados
Hacer peticiones y guardarlas
Crear un archivo service que se encargue de manejar las peticiones

React strict mode, usar axios

Almacenar los pokemons en la store
Los componentes deben de consumir de la store la data
añadir estilos

Usar localStorage para mantener los Pokemon

- FIX hardcoded winnerType on globalSotre fetchPokemonsByWinner method
- Remove Non-null Assertion Operators in Pokemon Combat
- Improve Styling
- Use persist middleware with zustand
- Añadir navbar / header
- Refactorizar / Limpiar código (Por ejemplo lo del setTimeOut ...)
- Cuando hago hover en las imágenes hay casos en los que el Pokemon no tiene back img, mejorar eso, es null

## Cosas a destacar

- Uso de axios
- Uso de Arquitectura basada en componentes
- Uso de React
- Typescript para código robusto (Interfaces...)
- Código flexible y escalable (Mostrar ejemplos)
- Zundstand + middleware persist para localStorage
- Arquitectura del proyecto siguiendo los principios SOLID
- Web dinámica
- Si puedo usar SCSS usarlo y destacarlo...
- Control de Versiones (GitHub GitKraken)

```

```
