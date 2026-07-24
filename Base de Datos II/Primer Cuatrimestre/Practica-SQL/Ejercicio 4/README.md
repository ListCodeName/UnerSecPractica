# Ejercicio 4: Relaciones, Uniones y Reportes Agrupados (JOINs y Agregaciones)

En las bases de datos relacionales del mundo real, la información no se almacena en una única tabla gigante, sino en múltiples tablas especializadas vinculadas mediante **Claves Foráneas (FK)**. El **JOIN** es la operación SQL que te permite reconstruir y unir estos datos fragmentados en una única vista de salida. Asimismo, las funciones de **Agregación y Agrupamiento** te permiten resumir miles de filas en estadísticas ejecutivas (totales, promedios, conteos).

---

## 📥 Preparación del Entorno
Antes de comenzar, debes cargar los datos de prueba en tu gestor:
1. Abre **phpMyAdmin** en tu navegador.
2. Ve a la pestaña **Importar** (Import) en la barra superior.
3. Elige el archivo [db_biblioteca.sql](file:///c:/xampp/htdocs/UnerSecPractica/Base%20de%20Datos%20II/Primer%20Cuatrimestre/Practica-SQL/Ejercicio%204/db_biblioteca.sql) ubicado en esta carpeta.
4. Haz clic en **Importar**.
5. Se habrá creado la base de datos `biblioteca_ejercicio` con sus claves primarias y foráneas relacionadas. Selecciónala y abre la pestaña **SQL**.

---

## 📖 Sintaxis Explicada (JOINs y Agrupamientos)

### 1. INNER JOIN (Intersección de Relaciones)
Combina filas de dos tablas únicamente cuando hay una coincidencia exacta de claves en ambas tablas:
```sql
SELECT t1.columna, t2.columna
FROM tabla1 t1
INNER JOIN tabla2 t2 ON t1.campo_fk = t2.campo_pk;
```
* **`t1` y `t2`:** Son **alias de tablas** que simplifican la escritura.
* **`ON`:** Especifica la condición de acoplamiento (habitualmente matching de `FK = PK`).
* Si un registro de `tabla1` tiene un valor nulo en su FK, quedará **excluido** del resultado de un `INNER JOIN`.

### 2. LEFT JOIN (Preservación del Conjunto Izquierdo)
Retorna **todas** las filas de la tabla izquierda (la declarada en el `FROM`), junto con las filas coincidentes de la tabla derecha. Si no hay correspondencia en la derecha, rellena las columnas de esta última con valores `NULL`:
```sql
SELECT t1.columna, t2.columna
FROM tabla1 t1
LEFT JOIN tabla2 t2 ON t1.campo_fk = t2.campo_pk;
```
* Es ideal para auditar fallos de carga o buscar elementos "huérfanos" (ej. clientes que no han realizado pedidos, autores sin libros).

### 3. Funciones de Agregación
Calculan un único valor resumen a partir de un conjunto de valores numéricos de una columna:
* **`COUNT(columna)`:** Cuenta la cantidad de filas que contienen valores no nulos en esa columna.
* **`SUM(columna)`:** Suma todos los valores numéricos de la columna.
* **`AVG(columna)`:** Obtiene el promedio aritmético de los valores numéricos.
* **`MAX(columna)` / `MIN(columna)`:** Obtiene el valor máximo o mínimo.

### 4. Agrupamiento (`GROUP BY` y `HAVING`)
* **`GROUP BY columna_agrupar`:**
  Instruye al motor a separar las filas en "grupos" según los valores idénticos de esa columna y a calcular las funciones de agregación para cada grupo de forma independiente.
  ```sql
  SELECT categoria, COUNT(*), AVG(precio)
  FROM productos
  GROUP BY categoria;
  ```
* **`HAVING condicion_agregada`:**
  Filtra los resultados **después** de que los grupos han sido consolidados por el `GROUP BY`.
  > [!IMPORTANT]
  > **Diferencia entre WHERE y HAVING:**
  > * `WHERE` filtra filas individuales **antes** de que el motor agrupe los datos (y no puede contener funciones como `AVG` o `SUM`).
  > * `HAVING` filtra grupos enteros **después** de que se consolida el `GROUP BY`, basándose en el resultado de funciones agregadas (ej: `HAVING AVG(precio) > 500`).

---

## 🎯 Desafío Práctico: Reportes de Biblioteca

Utiliza la base de datos `biblioteca_ejercicio` para resolver los siguientes problemas de negocio mediante consultas SQL en **phpMyAdmin**:

1. **Listado de Catálogo con Autores (INNER JOIN):**
   La biblioteca necesita imprimir un listado físico del catálogo. Diseña una consulta que devuelva el **título** del libro, su **género** y el **nombre y apellido completo** de su autor (en una sola columna o por separado).

2. **Auditoría de Autores sin Publicaciones (LEFT JOIN):**
   El comité editorial quiere saber qué autores registrados en la base de datos **no tienen ningún libro asociado** en el sistema. Escribe una consulta que liste a todos los autores y sus libros, y verifica quién no tiene registros (las columnas del libro deben aparecer en `NULL`).

3. **Conteo Total de Libros Disponibles (COUNT):**
   Se requiere presentar un informe patrimonial. Escribe una consulta que devuelva la cantidad total de libros registrados en la biblioteca utilizando la función `COUNT()`.

4. **Estadísticas de Precios por Género (GROUP BY + AVG):**
   El departamento de finanzas quiere analizar el valor de adquisición de los libros. Obtén el nombre del **género literario** y el **precio promedio** de los libros pertenecientes a cada género.

5. **Filtro de Géneros Premium (HAVING):**
   A partir de la consulta anterior, filtra los resultados para mostrar únicamente aquellos géneros literarios cuyo precio promedio de adquisición sea estrictamente **mayor a `$40,000`**.

6. **Control de Préstamos Activos (INNER JOIN + GROUP BY):**
   La dirección necesita controlar a los lectores problemáticos. Escribe una consulta que obtenga el **nombre y apellido del usuario**, su **email**, y la **cantidad de libros que tiene actualmente prestados** (es decir, aquellos registros en la tabla `prestamos` que tengan el campo `fecha_devolucion_real` en `NULL`).

7. **Recaudación de Caja por Multas (SUM):**
   Se requiere auditar el ingreso de caja. Calcula el **monto total de dinero recaudado o facturado** en concepto de multas de la biblioteca (`monto_multa`) de todos los préstamos completados.
