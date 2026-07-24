# Ejercicio 5: Subconsultas y Consultas Complejas (Subqueries)

Una **subconsulta (Subquery)** es una sentencia `SELECT` anidada dentro de otra consulta principal (que a su vez puede ser un `SELECT`, `INSERT`, `UPDATE` o `DELETE`). Las subconsultas te permiten resolver problemas de extracción dinámicos en los cuales la condición de filtrado depende de datos calculados en tiempo de ejecución.

---

## 📥 Preparación del Entorno
Antes de comenzar, debes cargar los datos de prueba en tu gestor:
1. Abre **phpMyAdmin** en tu navegador.
2. Ve a la pestaña **Importar** en la barra superior.
3. Elige el archivo [db_empresa.sql](file:///c:/xampp/htdocs/UnerSecPractica/Base%20de%20Datos%20II/Primer%20Cuatrimestre/Practica-SQL/Ejercicio%205/db_empresa.sql) ubicado en esta carpeta.
4. Haz clic en **Importar**.
5. Se habrá creado la base de datos `empresa_ejercicio` con relaciones complejas e índices. Selecciónala y abre la pestaña **SQL**.

---

## 📖 Sintaxis Explicada (Tipos de Subconsultas)

### 1. Subconsultas Escalares (Un único valor)
Son aquellas que devuelven exactamente **una sola columna y una sola fila** (un único dato). Se colocan comúnmente en la cláusula `WHERE` con operadores relacionales estándar (`=`, `>`, `<`, etc.):
```sql
SELECT nombre, apellido 
FROM empleados
WHERE salario > (SELECT AVG(salario) FROM empleados);
```
*(Nota: El motor calcula primero el salario promedio y luego filtra a los empleados cuyo salario supera ese número).*

### 2. Subconsultas de Lista con Operadores `IN` / `NOT IN`
Devuelven una columna con **múltiples filas** (un conjunto de valores). Se utilizan para verificar pertenencia:
```sql
SELECT nombre_depto 
FROM departamentos
WHERE id_departamento IN (SELECT DISTINCT id_departamento FROM empleados);
```
> [!CAUTION]
> **Peligro de `NOT IN` con valores NULL:** Si la subconsulta interna de un `NOT IN` devuelve aunque sea un solo registro con valor `NULL`, la consulta externa no devolverá **ninguna fila** (debido a la lógica de tres valores de SQL: `TRUE`, `FALSE`, `UNKNOWN`). Para evitar este problema, prefiere siempre el uso de `EXISTS`.

### 3. Subconsultas Correlacionadas
Son subconsultas internas que **hacen referencia a una columna de la consulta externa**. El motor ejecuta la subconsulta una vez por cada fila de la consulta principal:
```sql
SELECT e.nombre, e.salario
FROM empleados e
WHERE e.salario > (
    SELECT AVG(sub.salario) 
    FROM empleados sub 
    WHERE sub.id_departamento = e.id_departamento
);
```
*(Nota: Aquí se calcula el promedio salarial de forma dinámica para cada departamento respectivo del empleado evaluado).*

### 4. Operadores `EXISTS` y `NOT EXISTS`
Evalúan si la subconsulta devuelve **al menos un registro**. Son altamente eficientes ya que el motor detiene la búsqueda interna en cuanto encuentra la primera coincidencia (cortocircuito):
```sql
SELECT nombre_depto
FROM departamentos d
WHERE NOT EXISTS (
    SELECT 1 
    FROM empleados e 
    WHERE e.id_departamento = d.id_departamento
);
```
*(Nota: `SELECT 1` o `SELECT *` es indistinto; `EXISTS` solo comprueba la existencia de filas, no lee sus valores).*

### 5. Subconsultas en la Cláusula `SELECT`
Inyectan un valor calculado directamente como una columna de la salida principal:
```sql
SELECT d.nombre_depto,
       (SELECT COUNT(*) FROM empleados e WHERE e.id_departamento = d.id_departamento) AS total_empleados
FROM departamentos d;
```

### 6. Subconsultas en la Cláusula `FROM` (Tablas Derivadas)
Actúan como una **tabla virtual o vista temporal** en memoria. **Es obligatorio** asignarles un alias mediante la cláusula `AS`:
```sql
SELECT MAX(gasto_total)
FROM (
    SELECT id_departamento, SUM(salario) AS gasto_total 
    FROM empleados 
    GROUP BY id_departamento
) AS resumen_gastos;
```

---

## 🎯 Desafío Práctico: Inteligencia de Negocios Corporativa

Utiliza la base de datos `empresa_ejercicio` para resolver las siguientes consignas en la consola SQL de **phpMyAdmin** empleando subconsultas:

1. **Subconsulta Escalar en WHERE:**
   La dirección de RRHH quiere premiar la productividad. Encuentra el **nombre**, **apellido** y **salario** de todos los empleados de la empresa que ganen un salario **estrictamente mayor al salario promedio** de toda la compañía.

2. **Subconsulta Correlacionada en WHERE:**
   Para detectar asimetrías de sueldos internos, lista el **nombre**, **apellido**, **salario** y el `id_departamento` de todos los empleados cuyo salario sea **mayor al promedio de su propio departamento** (usa alias de tabla para correlacionar la consulta interna con la externa).

3. **Subconsulta con Operador IN (Filtro Cruzado):**
   Finanzas está auditando los costos logísticos. Escribe una consulta que liste el `id_departamento` y el **nombre de aquellos departamentos** que tengan empleados trabajando en proyectos cuyo presupuesto asignado sea **mayor a `$1,000,000`** (es decir, proyectos millonarios).

4. **Subconsulta con Operador NOT EXISTS (Auditoría Vacantes):**
   El Director General quiere cerrar o reubicar departamentos inactivos. Identifica el **nombre** y la **ubicación** de aquellos departamentos que **no tengan ningún empleado asignado actualmente** (resuélvelo utilizando la cláusula `NOT EXISTS`).

5. **Subconsulta en la Cláusula SELECT (Consolidado Estructural):**
   Genera un reporte gerencial que liste el **nombre de todos los departamentos**, su **presupuesto de sede**, y una columna adicional autocalculada mediante una subconsulta llamada `cantidad_empleados` que muestre cuántos trabajadores pertenecen a ese departamento.

6. **Subconsulta en la Cláusula FROM (Análisis de Gasto Máximo):**
   Calcula la masa salarial (la suma total de salarios) de cada departamento y, tratando ese resultado como una **tabla derivada (FROM)**, obtén cuál es el **gasto salarial consolidado más alto** que se está pagando en la empresa (es decir, el `MAX` de los totales agrupados por departamento).
