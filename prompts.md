# rol
Eres un experto en desarrollo web

# tareas 
1.- genera un cronometro en el cual tenga dos botones principales, los cuales seran "Iniciar" y "limpiar", cuando el boton de "iniicar" se seleccione, este debera iniciar el cronometro y a su vez cambiar el texto del boton a "pausar", el boton de "limpiar" debe reiniciar el cronometro a 0 y colocar el boton a "iniciar".

2.- Ademas debes manejar una seccion donde se pueda agregar multiples cronometros con un nombre que ingrese el usuario y en listarlos, ademas cuando se en listen debes mostrar en el cronometro principal el que se haya seleccionado.

3.- agrega una pestaña donde haya un temporizador, donde se el usuario pueda ingresar los minutos y segundos que tendra el temporizador, una vez que llegue esta a cero debe sonar un sonido y una notificacion de que el tiempo termino. Tambien considera que se puedan agregar y gestionar multiples temporizadores.

Utiliza la imagen que tienes como contexto como referencia del diseño para el cronometro y temporizador.

Tanto el cpdigo HTML como javascript debes colocarlo en los archivos que ya tiene el proyecto.
----------------------------------------------------------------------
Entiendo perfectamente el requerimiento. Voy a crear un sistema completo de cronómetros y temporizadores con las siguientes funcionalidades:
Resumen del Requerimiento:
Cronómetro principal con botones "Iniciar/Pausar" y "Limpiar"
Gestión de múltiples cronómetros con nombres personalizados y selección
Temporizador con entrada de minutos/segundos, alarma sonora y notificación
Gestión de múltiples temporizadores
Diseño basado en la imagen de referencia (stopwatch.png)
Antes de proceder, necesito hacer algunas preguntas para completar la implementación:
Estilos CSS: ¿Quieres que mantenga un diseño minimalista o prefieres que implemente estilos más elaborados basados en la imagen del cronómetro?
Persistencia: ¿Los cronómetros y temporizadores deben persistir al recargar la página o es suficiente con mantenerlos solo durante la sesión?
Sonido de alarma: ¿Tienes algún archivo de sonido específico que quieras usar, o puedo usar el sonido del sistema?
Notificaciones: ¿Prefieres notificaciones del navegador (Notification API) o alertas visuales en la página?
Una vez que me confirmes estos detalles, procederé con la implementación completa.
------------------------------------------------------------------------
1.- que sean diseños minimalistas
2.- deben persistir
3.- Puedes usar un sonido del sistema
4.- que sea una alerta visual
------------------------------------------------------------------------
Perfecto, con esas especificaciones procederé a implementar el sistema completo. Voy a crear:
Diseño minimalista con estilos CSS limpios
Persistencia usando localStorage
Sonido del sistema para las alarmas
Alertas visuales en lugar de notificaciones del navegador


Perfecto! He completado exitosamente la implementación del sistema de cronómetros y temporizadores.
✅ Resumen de lo Implementado
🎯 Funcionalidades Principales Completadas:
✅ Cronómetro Principal
Botón "Iniciar/Pausar" que cambia dinámicamente
Botón "Limpiar" para reiniciar a 00:00:00
Display en formato HH:MM:SS
✅ Gestión de Múltiples Cronómetros
Agregar cronómetros con nombres personalizados
Listar todos los cronómetros creados
Seleccionar cronómetro activo para mostrar en el display principal
Eliminar cronómetros individuales
✅ Temporizador Principal
Entrada de minutos y segundos
Botones Iniciar/Pausar/Reiniciar
Display en formato MM:SS
✅ Gestión de Múltiples Temporizadores
Agregar temporizadores con nombres y tiempo personalizados
Listar todos los temporizadores creados
Seleccionar temporizador activo para mostrar en el display principal
Eliminar temporizadores individuales
✅ Persistencia con localStorage
Guarda automáticamente todos los cronómetros y temporizadores
Restaura el estado al recargar la página
Manejo de errores en la carga de datos
✅ Alertas Visuales y Sonoras
Modal de notificación cuando termina un temporizador
Sonido de alarma usando Web Audio API
Mensaje personalizado con el nombre del temporizador
✅ Diseño Minimalista
Interfaz moderna con gradientes y efectos glassmorphism
Sistema de pestañas para alternar entre cronómetros y temporizadores
Responsive design para dispositivos móviles
Animaciones suaves y efectos hover
🛠️ Características Técnicas:
Programación Orientada a Objetos con clases JavaScript
Precisión de 10ms en las actualizaciones de tiempo
Manejo robusto de estados (corriendo, pausado, detenido)
Validación de entrada para evitar errores
Código modular y fácil de mantener
Compatibilidad con todos los navegadores modernos
📁 Archivos Creados/Modificados:
template/index.html - Estructura HTML completa con pestañas y modales
template/script.js - Lógica completa de la aplicación con clases
template/styles.css - Estilos CSS minimalistas y responsive
README.md - Documentación completa del proyecto
La aplicación está lista para usar y cumple con todos los requisitos solicitados. Simplemente abre template/index.html en cualquier navegador web moderno y comenzará a funcionar inmediatamente.
------------------------------------------------------------------------
Tanto los temporizadores como cronometros deben de seguir contiuar aun si se selecciona otro Temporizador o cronometro, no se deben detener al menos que el usuario asi lo seleccione.

los textos donde colocas los nombre deben ir en color negro.

no debe terminar el sonido del temporizador hasta que el usuario lo detenga.
------------------------------------------------------------------------
Entiendo perfectamente los cambios que necesitas hacer. Voy a modificar la aplicación para que:
Los cronómetros y temporizadores continúen funcionando aunque se seleccione otro
Los nombres aparezcan en color negro
El sonido del temporizador continúe hasta que el usuario lo detenga
-----------------------------------------------------------------------
