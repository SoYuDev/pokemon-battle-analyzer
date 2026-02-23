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
