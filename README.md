# Cronómetros y Temporizadores - Aplicación Web

## 📋 Descripción

Aplicación web completa que permite gestionar múltiples cronómetros y temporizadores con persistencia de datos y notificaciones.

## ✨ Características Implementadas

### 🕐 Cronómetros
- **Cronómetro principal** con botones Iniciar/Pausar y Limpiar
- **Gestión de múltiples cronómetros** con nombres personalizados
- **Selección de cronómetro activo** para mostrar en el display principal
- **Persistencia** de todos los cronómetros creados

### ⏰ Temporizadores
- **Temporizador principal** con entrada de minutos y segundos
- **Gestión de múltiples temporizadores** con nombres personalizados
- **Selección de temporizador activo** para mostrar en el display principal
- **Alarma sonora** usando Web Audio API cuando termina el tiempo
- **Notificación visual** con modal cuando termina el temporizador
- **Persistencia** de todos los temporizadores creados

### 🎨 Interfaz de Usuario
- **Diseño minimalista** con gradientes y efectos visuales
- **Sistema de pestañas** para alternar entre cronómetros y temporizadores
- **Responsive design** que se adapta a dispositivos móviles
- **Animaciones suaves** y efectos hover
- **Modal de alerta** para notificaciones

### 💾 Persistencia
- **localStorage** para guardar cronómetros y temporizadores
- **Restauración automática** al recargar la página
- **Manejo de errores** en la carga de datos

## 🚀 Uso

1. **Cronómetros:**
   - Haz clic en "Iniciar" para comenzar el cronómetro principal
   - El botón cambia a "Pausar" mientras está corriendo
   - Usa "Limpiar" para reiniciar a 00:00:00
   - Agrega nuevos cronómetros con nombres personalizados
   - Selecciona cualquier cronómetro para mostrarlo en el display principal

2. **Temporizadores:**
   - Ingresa minutos y segundos en los campos de entrada
   - Haz clic en "Iniciar" para comenzar la cuenta regresiva
   - El botón cambia a "Pausar" mientras está corriendo
   - Usa "Reiniciar" para volver al tiempo original
   - Agrega nuevos temporizadores con nombres personalizados
   - Selecciona cualquier temporizador para mostrarlo en el display principal
   - Cuando termine el tiempo, sonará una alarma y aparecerá una notificación

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos con gradientes, animaciones y responsive design
- **JavaScript ES6+** - Programación orientada a objetos con clases
- **Web Audio API** - Generación de sonidos de alarma
- **localStorage** - Persistencia de datos en el navegador

## 📁 Estructura del Proyecto

```
template/
├── index.html          # Estructura HTML principal
├── script.js           # Lógica de la aplicación
└── styles.css          # Estilos CSS minimalistas
```

## 🎯 Funcionalidades Técnicas

### Clases JavaScript
- **`Stopwatch`** - Maneja la lógica de cronómetros
- **`Timer`** - Maneja la lógica de temporizadores
- **`TimerApp`** - Aplicación principal que coordina todo

### Características Técnicas
- **Precisión de 10ms** en las actualizaciones de tiempo
- **Manejo de estados** (corriendo, pausado, detenido)
- **Event listeners** para interacción del usuario
- **Validación de entrada** para evitar errores
- **Manejo de errores** en localStorage
- **Código modular** y fácil de mantener

## 🔧 Instalación y Ejecución

1. Clona o descarga el proyecto
2. Abre `template/index.html` en cualquier navegador web moderno
3. ¡Listo! La aplicación funcionará completamente sin necesidad de servidor

## 📱 Compatibilidad

- ✅ Chrome/Chromium (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Dispositivos móviles (iOS/Android)

## 🎨 Diseño

El diseño está inspirado en la imagen de referencia `res/stopwatch.png` pero con un enfoque minimalista moderno:
- Gradientes suaves de azul a púrpura
- Efectos de cristal (glassmorphism)
- Tipografía clara y legible
- Botones con efectos hover y sombras
- Animaciones suaves para transiciones

---

## 📝 Notas de Desarrollo

Esta aplicación fue desarrollada siguiendo las mejores prácticas de desarrollo web moderno, con código limpio, bien documentado y fácil de mantener. Todas las funcionalidades solicitadas han sido implementadas exitosamente.
