# Ejercicio 1: Lenguaje de Definición de Datos (DDL)

El **Lenguaje de Definición de Datos (DDL)** es el conjunto de sentencias SQL que te permite definir, modificar y eliminar la estructura de los objetos de la base de datos (como bases de datos, tablas, índices y columnas). Estas sentencias no manipulan registros, sino la estructura física del esquema.

---

## 📖 Sintaxis Explicada (phpMyAdmin / MySQL / MariaDB)

### 1. Crear una Base de Datos
Para inicializar un contenedor de tablas en el motor:
```sql
CREATE DATABASE IF NOT EXISTS nombre_base_datos
CHARACTER SET utf8mb4
COLLATE utf8mb4_spanish_ci;
```
* **`IF NOT EXISTS`:** Previene errores si la base de datos ya está creada.
* **`CHARACTER SET utf8mb4`:** Asegura compatibilidad con todos los caracteres (incluyendo tildes, la "ñ" y emojis).

### 2. Crear una Tabla
Define el nombre, campos, tipos de datos y restricciones estructurales:
```sql
CREATE TABLE IF NOT EXISTS nombre_tabla (
    campo1 TIPO_DATO RESTRICCION,
    campo2 TIPO_DATO,
    PRIMARY KEY (campo_clave)
) ENGINE=InnoDB;
```
* **Tipos de Datos comunes:**
  * `INT`: Números enteros.
  * `VARCHAR(N)`: Cadenas de caracteres de longitud variable (máximo $N$ caracteres).
  * `DECIMAL(M, D)`: Números decimales exactos. Excelente para dinero. $M$ es la cantidad total de dígitos, $D$ es la cantidad de decimales (ej: `DECIMAL(10,2)` almacena hasta $99999999.99$).
  * `TEXT`: Cadenas de caracteres muy largas (sin límite práctico).
  * `DATE`: Fechas en formato `AAAA-MM-DD`.
* **Restricciones comunes:**
  * `PRIMARY KEY`: Identificador único de la fila. Impide valores duplicados y nulos.
  * `AUTO_INCREMENT`: El motor genera el número correlativo siguiente de forma automática (solo para campos numéricos clave).
  * `NOT NULL`: Impide que la columna acepte valores nulos (vacíos).
  * `UNIQUE`: Asegura que todos los valores en esta columna sean distintos (ej: correos o documentos).

### 3. Modificar una Tabla (`ALTER TABLE`)
Permite alterar la estructura de una tabla existente sin perder sus datos.
* **Agregar una Columna:**
  ```sql
  ALTER TABLE nombre_tabla ADD COLUMN nombre_columna TIPO_DATO [RESTRICCION];
  ```
* **Modificar el Tipo de Dato o Restricción de una Columna:**
  ```sql
  ALTER TABLE nombre_tabla MODIFY COLUMN nombre_columna NUEVO_TIPO [NUEVA_RESTRICCION];
  ```
* **Eliminar una Columna:**
  ```sql
  ALTER TABLE nombre_tabla DROP COLUMN nombre_columna;
  ```

### 4. Eliminar Objetos Estructurales
Para remover de forma irreversible tablas o bases de datos del disco duro:
```sql
DROP TABLE IF EXISTS nombre_tabla;
DROP DATABASE IF EXISTS nombre_base_datos;
```
> [!CAUTION]
> El comando `DROP` elimina tanto la estructura como **absolutamente todos los datos** dentro de ella sin pedir confirmación. Úsalo con extrema prudencia.

---

## 🎯 Desafío Práctico: Gestión Escolar

Abre la pestaña **SQL** en **phpMyAdmin** y ejecuta las sentencias necesarias para cumplir con los siguientes puntos del relevamiento escolar:

1. **Creación de la Base de Datos:**
   Crea una base de datos llamada `universidad_practica` configurada con el conjunto de caracteres `utf8mb4` para soporte de español.

2. **Creación de la Tabla Alumnos:**
   Dentro de la base de datos `universidad_practica`, crea una tabla llamada `alumnos` con las siguientes especificaciones:
   * `id_alumno`: Clave primaria, número entero, auto-incremental.
   * `legajo`: Cadena de caracteres fija o variable de longitud 10, obligatorio (`NOT NULL`), y único (`UNIQUE`).
   * `nombre`: Cadena de caracteres de longitud 50, obligatorio.
   * `apellido`: Cadena de caracteres de longitud 50, obligatorio.
   * `email`: Cadena de caracteres de longitud 100, único.
   * `fecha_ingreso`: Fecha, obligatorio.

3. **Creación de la Tabla Cursos:**
   Crea una tabla llamada `cursos` para registrar las materias disponibles:
   * `id_curso`: Clave primaria, número entero, auto-incremental.
   * `nombre_curso`: Cadena de caracteres de longitud 80, obligatorio.
   * `descripcion`: Texto largo, opcional.
   * `creditos`: Entero pequeño o estándar, obligatorio.

4. **Alteración - Agregar Campos:**
   La dirección académica requiere registrar el teléfono de contacto de los alumnos. Añade una nueva columna llamada `telefono` a la tabla `alumnos` (tipo `VARCHAR(20)`), que sea opcional.

5. **Alteración - Modificar Restricciones:**
   Debido a nombres de materias muy extensos, modifica el campo `nombre_curso` de la tabla `cursos` para que acepte hasta 150 caracteres (`VARCHAR(150)`), manteniendo la obligatoriedad.

6. **Alteración - Eliminar Campos:**
   Se decidió registrar las descripciones de los cursos en una plataforma externa (Moodle). Elimina la columna `descripcion` de la tabla `cursos`.

7. **Destrucción de Pruebas:**
   * Crea una tabla rápida llamada `tabla_basura` con una sola columna (`id INT`).
   * Aplica la sentencia correspondiente para eliminarla por completo del esquema físico.

---

## 💡 Tips de phpMyAdmin
* Recuerda seleccionar la base de datos haciendo clic en su nombre en la barra lateral izquierda antes de escribir sentencias que modifiquen tablas. De lo contrario, phpMyAdmin arrojará el error `No database selected`.
* Puedes presionar `Ctrl + Enter` dentro del editor SQL de phpMyAdmin para ejecutar tus consultas rápidamente.
