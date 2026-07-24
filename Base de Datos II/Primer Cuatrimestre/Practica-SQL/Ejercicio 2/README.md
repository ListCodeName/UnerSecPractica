# Ejercicio 2: Lenguaje de Manipulación de Datos (DML) y Alteraciones Avanzadas

El **Lenguaje de Manipulación de Datos (DML)** agrupa las sentencias SQL que te permiten interactuar con los registros o datos contenidos en las tablas de la base de datos. A diferencia de DDL, aquí trabajamos directamente sobre las filas agregando, modificando o eliminando la información almacenada.

---

## 📖 Sintaxis Explicada (phpMyAdmin / MySQL / MariaDB)

### 1. Inserción de Datos (`INSERT INTO`)
Sirve para agregar nuevas filas a una tabla.
* **Inserción de un Registro Individual:**
  ```sql
  INSERT INTO nombre_tabla (columna1, columna2, columna3)
  VALUES ('valor_texto', 123, '2026-05-25');
  ```
  *(Nota: Los tipos de texto y fecha van entre comillas simples `'`, mientras que los números van sueltos).*

* **Inserción Masiva (Múltiples Filas en una Sola Sentencia):**
  Es mucho más rápido y óptimo para poblar bases de datos de forma masiva:
  ```sql
  INSERT INTO nombre_tabla (columna1, columna2, columna3)
  VALUES 
      ('valorA1', 111, '2026-05-01'),
      ('valorB2', 222, '2026-05-02'),
      ('valorC3', 333, '2026-05-03');
  ```

### 2. Modificación de Datos (`UPDATE`)
Modifica los valores de las columnas en registros existentes que cumplan con una condición:
```sql
UPDATE nombre_tabla
SET columna1 = 'nuevo_valor', columna2 = 456
WHERE columna_id = 1;
```
> [!WARNING]
> La cláusula `WHERE` es **fundamental** en un `UPDATE`. Si omites el `WHERE`, el motor aplicará el cambio en **absolutamente todas las filas de la tabla**, destruyendo tu información anterior de forma irreversible.

### 3. Eliminación de Datos (`DELETE` vs `TRUNCATE`)
* **Eliminación Selectiva (`DELETE`):**
  Borra filas específicas de la tabla que coinciden con una condición:
  ```sql
  DELETE FROM nombre_tabla WHERE columna_id = 2;
  ```
  > [!WARNING]
  > Al igual que con `UPDATE`, si ejecutas `DELETE FROM nombre_tabla;` sin una cláusula `WHERE`, el motor **borrará todas las filas de la tabla**.

* **Vaciado Total (`TRUNCATE`):**
  Es una sentencia DDL que borra **todas** las filas de la tabla de forma instantánea y restablece cualquier contador `AUTO_INCREMENT` a 1:
  ```sql
  TRUNCATE TABLE nombre_tabla;
  ```

### 4. Cambios Avanzados de Columnas (`RENAME` & `CHANGE`)
* **Renombrar una Columna:**
  En MySQL 8.0+ y MariaDB 10.5.2+ puedes usar la sintaxis moderna:
  ```sql
  ALTER TABLE nombre_tabla RENAME COLUMN nombre_antiguo TO nombre_nuevo;
  ```
  *(Nota: Para versiones antiguas de phpMyAdmin/MySQL, se utilizaba `CHANGE COLUMN nombre_antiguo nombre_nuevo TIPO_DATO [RESTRICCIONES]`).*

* **Modificar Tipo de Datos con Tabla Poblada:**
  ```sql
  ALTER TABLE nombre_tabla MODIFY COLUMN nombre_columna NUEVO_TIPO;
  ```
  > [!IMPORTANT]
  > Si reduces la longitud de un campo (ej: de `VARCHAR(100)` a `VARCHAR(20)`) en una tabla que ya tiene registros, corres el riesgo de que el motor **trunque** los textos largos existentes o lance un error de desbordamiento de datos.

---

## 🎯 Desafío Práctico: Operaciones en la Universidad

Utilizando la base de datos `universidad_practica` y las tablas `alumnos` y `cursos` que creaste en el Ejercicio 1, ejecuta en la consola de **phpMyAdmin** las siguientes operaciones de manipulación y alteración:

1. **Inserción Unitaria:**
   Agrega un nuevo curso a la tabla `cursos`. El curso debe llamarse `'Introducción a Bases de Datos'` y tener `4` créditos.

2. **Inserción Masiva (Alumnos):**
   Registra 4 alumnos de un solo golpe utilizando una única sentencia `INSERT INTO` en la tabla `alumnos`. Inventa nombres, apellidos, legajos únicos de 10 caracteres, y correos electrónicos ficticios para cada uno.

3. **Inserción Masiva (Cursos):**
   Registra 3 cursos nuevos en la tabla `cursos` en una sola sentencia SQL (ej: `'Programación Web'`, `'Arquitectura de Computadoras'`, `'Inglés Técnico'`). Asigna créditos realistas.

4. **Actualización Selectiva:**
   Modifica el correo electrónico (`email`) de uno de tus alumnos registrados en el paso 2. Ubica su `id_alumno` y actualízalo con una sentencia `UPDATE` que contenga un `WHERE` específico.

5. **Actualización Masiva:**
   Incrementa en `1` los créditos a **todos** los cursos de la tabla `cursos` que actualmente tengan exactamente `4` créditos (ej. si tenían 4, ahora tendrán 5).

6. **Eliminación Selectiva:**
   El alumno con legajo `'1234567890'` (o el legajo que le hayas asignado al cuarto alumno en el paso 2) se ha dado de baja. Ejecuta una sentencia `DELETE` para remover únicamente este registro de la base de datos.

7. **Renombrar Columna:**
   Se ha decidido que el campo `telefono` de los alumnos guardará exclusivamente teléfonos celulares. Renombra la columna `telefono` de la tabla `alumnos` por el nuevo nombre `celular` (manteniendo su tipo `VARCHAR(20)`).

8. **Modificación de Tipo con Datos:**
   Para estandarizar el almacenamiento de celulares a un formato nacional reducido, modifica el campo `celular` de la tabla `alumnos` para que su tipo sea `VARCHAR(15)`, manteniendo su opcionalidad.
