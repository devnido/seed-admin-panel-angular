## Seed Admin Panel Angular

### Este proyecto fue creado para utilizar como base en futuros desarrollos que utilicen caracteristicas similares.

Proyecto base que forma parte de otros 2 adicionales, este cógido es el front-end que sirve para levantar una SPA (simple page application) utilizando como fuente de datos los siguientes  proyectos [servidor de autenticación](https://github.com/devnido/seed-auth-api-nodejs) y [servidor de fuente de datos](https://github.com/devnido/seed-resource-api-nodejs) estos 3 permiten levnatar un sistema cliente - servidor.

## Descripción

Está desarrollado en Angular versión 9.

Se utilizó [Angular CLI](https://github.com/angular/angular-cli) version 9.0.1.

## Uso 

1. Para ejecutar este código es necesario ejecutar previamente los otros dos proyectos back-end mencionados anteriormente ([servidor de autenticación](https://github.com/devnido/seed-auth-api-nodejs) y [servidor de fuente de datos](https://github.com/devnido/seed-resource-api-nodejs)). 

2. Una vez cumplido el punto anterior ejecutar  `ng serve -o`

3. Para utilizar tu propia llave pública en el captcha debes establecer su valor en el archivo environment.ts 

## Funcionalidades implementadas 

1. Registro de usuarios.
2. Ingreso de usuarios.
3. Recuperar contraseña mediante email.
4. Modificar nombre y contraseña en el perfil de usuario.
5. Agregar tareas.
6. Listar tareas de forma paginada.
7. Buscar tareas por nombre y estado.
8. Modificar el estado de la tarea en el listado.
9. Modificar el estado y el nombre de la tarea en página detalle.
10. Eliminar una tarea.
11. Mostrar hora y fecha de acuerdo a la región configurada en el cliente.
12. Validaciones de autenticación con reCaptcha.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
