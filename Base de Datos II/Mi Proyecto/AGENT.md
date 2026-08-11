# AGENT.md - Memoria y Directivas del Proyecto Integrador

Este archivo sirve como ancla de contexto y memoria persistente para el entorno agéntico (Antigravity) y los desarrolladores durante el ciclo de vida del proyecto.

---

## 📌 1. Visión General del Proyecto
- **Contexto**: Articulación entre las asignaturas **Base de Datos II** y **Emprendimientos**.
- **Objetivo**: Diseñar la identidad comercial de un emprendimiento propio y construir un sistema web funcional en **Laravel (PHP, HTML, Vanilla JS, Pure CSS)** centrado en un proceso de negocio estratégico.
- **Ubicación local**: `c:\xampp\htdocs\<nombre-de-tu-proyecto>`

---

## 🎨 2. Sistema de Diseño e Identidad Visual
- **Enfoque de Diseño**: Vanilla CSS (Pure CSS), modular, responsivo y sin dependencias externas pesadas.
- **Regla de Colores**:
  - `var(--primary-500)`: Color de acento primario derivado del logo/branding del emprendimiento.
  - Escala cromática armónica de 50 a 900 para estados hover, fondos, bordes y badges.
- **Elementos UI Estandarizados**:
  - **Cajas de texto**: Fondo oscuro contrastado, borde sutil de `1px solid rgba(255,255,255,0.1)` y glow en focus.
  - **Botones**: Sombra suave en reposo, elevación en hover (`translateY(-2px)`), radio de borde consistente.
  - **Cabeceras**: Tipografía moderna con jerarquía tipográfica clara.

---

## 🗄️ 3. Modelo de Base de Datos y Motor (SQLite)
El sistema utiliza **SQLite** como motor de base de datos relacional (almacenado en un archivo embebido `database/database.sqlite`), evitando la necesidad de instalar o ejecutar el servidor MySQL en XAMPP.

### Circuitos requeridos:
1. **Circuito de Ventas y Pedidos**: Clientes, Pedidos, Detalle de Pedidos, Facturación.
2. **Circuito de Compras y Materia Prima**: Proveedores, Insumos, Órdenes de Compra.
3. **Circuito de Stock e Inventario**: Movimientos de Stock, Almacenes, Alertas de Reorden.

---

## 🤖 4. Guía para el Entorno Agéntico (Antigravity)
Cuando solicites código o refactorizaciones al asistente IA:
- **Base de Datos**: Configurar el archivo `.env` con `DB_CONNECTION=sqlite` sin requerir servidor MySQL externo.
- **No limitarse a un simple CRUD**: El desarrollo debe resolver un proceso estratégico (ejemplo: deducción automática de materias primas al confirmar una venta, cálculo de rendimientos, algoritmo de reposición de stock).
- **Mantener la separación de responsabilidades**: Controladores limpios en Laravel, modelos con relaciones Eloquent claras, y vistas estructuradas.
- **Preservar la documentación**: Cada circuito debe contar con su correspondiente archivo markdown en la carpeta `docs/`.

---

## 📜 5. Historial de Cambios y Decisiones de Diseño
- `2026-08-11`: Creación de la estructura base y portal interactivo de pautas.
- `2026-08-11`: Actualización del motor de base de datos a SQLite (sin dependencia de MySQL en XAMPP).
