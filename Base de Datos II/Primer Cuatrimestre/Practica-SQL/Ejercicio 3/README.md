# Ejercicio 3: Consultas y Filtros Básicos (DQL)

El **Lenguaje de Consulta de Datos (DQL)** es el componente de SQL dedicado exclusivamente a la lectura y extracción de registros guardados en tus tablas. Mediante la sentencia `SELECT`, puedes formular preguntas específicas a la base de datos para tomar decisiones estratégicas de negocio.

---

## 📥 Preparación del Entorno
Antes de comenzar, debes cargar los datos de prueba en tu gestor:
1. Abre **phpMyAdmin** en tu navegador.
2. Ve a la pestaña **Importar** (Import) en la barra superior.
3. Haz clic en *Seleccionar archivo* y elige el archivo [db_tienda.sql](file:///c:/xampp/htdocs/UnerSecPractica/Base%20de%20Datos%20II/Primer%20Cuatrimestre/Practica-SQL/Ejercicio%203/db_tienda.sql) ubicado en esta carpeta.
4. Haz clic en **Importar** (o *Continuar/Go* en la parte inferior).
5. Se habrá creado y poblado la base de datos `tienda_ejercicio`. Selecciónala en la barra lateral izquierda y abre la pestaña **SQL** para resolver el desafío.

---

## 📖 Sintaxis Explicada (Filtros y Consultas Básicas)

### 1. Estructura Básica
Toda consulta de extracción parte del formato:
```sql
SELECT columna1, columna2 AS apodo
FROM nombre_tabla;
```
* **`SELECT *`:** Recupera todas las columnas de la tabla.
* **`AS`:** Permite renombrar temporalmente la cabecera de la columna en el resultado (alias) para mejorar la legibilidad.

### 2. Filtrado con Cláusula `WHERE`
Permite limitar la extracción únicamente a las filas que cumplan condiciones específicas utilizando operadores:

* **Operadores Relacionales:**
  * `=` (Igual)
  * `>` (Mayor que), `<` (Menor que)
  * `>=` (Mayor o igual), `<=` (Menor o igual)
  * `<>` o `!=` (Distinto / No igual)
  
* **Operadores Lógicos (Combinación):**
  * `AND`: Devuelve verdadero si **todas** las condiciones son verdaderas.
  * `OR`: Devuelve verdadero si **al menos una** condición es verdadera.
  * `NOT`: Invierte el valor de verdad de la condición.

### 3. Filtros Especializados
* **`LIKE` (Búsqueda de patrones de texto):**
  Utiliza comodines para buscar textos parciales:
  * `%`: Representa cero, uno o múltiples caracteres arbitrarios.
    * `LIKE 'A%'` -> Empieza con "A".
    * `LIKE '%o'` -> Termina con "o".
    * `LIKE '%cel%'` -> Contiene el texto "cel" en cualquier lugar.
  * `_`: Representa exactamente un único carácter.

* **`BETWEEN ... AND ...` (Rangos inclusivos):**
  Ahorra tener que encadenar filtros lógicos para valores continuos (números o fechas):
  ```sql
  WHERE precio BETWEEN 100 AND 500;
  -- Es exactamente equivalente a:
  WHERE precio >= 100 AND precio <= 500;
  ```

* **`IN (...)` (Búsqueda dentro de listas/conjuntos):**
  Filtra registros que coinciden con alguno de los elementos de una lista fija:
  ```sql
  WHERE ciudad IN ('Paraná', 'Santa Fe', 'Crespo');
  ```

### 4. Ordenamiento y Límites
* **`ORDER BY columna [ASC|DESC]`:**
  Ordena los resultados basándose en los valores de una o más columnas. Por defecto es `ASC` (ascendente / menor a mayor). Usa `DESC` para ordenar de mayor a menor.
* **`LIMIT N`:**
  Fuerza al motor a retornar como máximo $N$ filas. Es muy útil para optimizar consultas en tablas de millones de registros o para realizar podios.

---

## 🎯 Desafío Práctico: Reportes de la Tienda

Resuelve los siguientes problemas de negocio escribiendo la consulta SQL correspondiente y ejecutándola en **phpMyAdmin**:

1. **Listado General de Stock:**
   La gerencia comercial necesita ver todo el catálogo de productos registrados. Escribe una consulta que devuelva todas las columnas de la tabla `productos`.

2. **Filtro de Artículos de Alta Gama:**
   Se planea un impuesto especial a los artículos caros. Lista el **nombre**, la **categoría** y el **precio** de todos los productos cuyo precio unitario sea estrictamente mayor a `$200,000`.

3. **Búsqueda de Clientes por Apellido:**
   El área de atención al cliente necesita ubicar a un comprador. Encuentra el **nombre**, **apellido** y **email** de todos los clientes cuyo **apellido** comience con la letra `'L'` o `'G'`.

4. **Alerta de Stock Crítico:**
   Logística necesita reponer mercadería de urgencia. Escribe una consulta que liste todos los productos que tengan un stock **menor o igual a 5 unidades y que no estén totalmente vacíos** (stock mayor a 0).

5. **Reporte de Pedidos del Mes:**
   Administración requiere revisar las transacciones. Lista todos los pedidos de la tabla `pedidos` realizados durante el mes de **febrero de 2025** (es decir, entre el `'2025-02-01'` y el `'2025-02-28'`) cuyo estado sea `'Entregado'`. Ordena los resultados por el `monto_total` de **mayor a menor**.

6. **Filtrado Sectorial de Hogar e Indumentaria:**
   Marketing lanzará una campaña promocional para ciertos sectores. Escribe una consulta utilizando el operador `IN` para listar el nombre, la categoría y el precio de todos los productos que pertenezcan a las categorías `'Hogar'` o `'Indumentaria'`.

7. **Podio de Productos Más Caros:**
   Diseña una consulta que obtenga únicamente el **nombre** y el **precio** de los **3 productos más costosos** del inventario general de la tienda.
