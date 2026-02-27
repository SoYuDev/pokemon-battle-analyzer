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

  ## TODO

  Tengo un componente padre donde se hacen dos llamadas a la api o donde puedo usar Promise.all.
  Este componente encapsula dos componentes Pokemon

Usar zustand o redux o mobex para el gestor de estados
Hacer peticiones y guardarlas
Crear un archivo service que se encargue de manejar las peticiones

React strict mode, usar axios
