-- Script de Creación y Carga de Datos: db_biblioteca.sql
-- Compatible con phpMyAdmin, MySQL y MariaDB

CREATE DATABASE IF NOT EXISTS `biblioteca_ejercicio` CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
USE `biblioteca_ejercicio`;

-- 1. Estructura de la Tabla: autores
CREATE TABLE IF NOT EXISTS `autores` (
  `id_autor` INT AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `apellido` VARCHAR(50) NOT NULL,
  `nacionalidad` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_autor`)
) ENGINE=InnoDB;

-- 2. Estructura de la Tabla: libros
CREATE TABLE IF NOT EXISTS `libros` (
  `id_libro` INT AUTO_INCREMENT,
  `titulo` VARCHAR(100) NOT NULL,
  `id_autor` INT DEFAULT NULL, -- Acepta nulo para libros de autor desconocido
  `genero` VARCHAR(50) NOT NULL,
  `precio` DECIMAL(8, 2) NOT NULL,
  PRIMARY KEY (`id_libro`),
  KEY `fk_libros_autores` (`id_autor`)
) ENGINE=InnoDB;

-- 3. Estructura de la Tabla: usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` INT AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `apellido` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `fecha_registro` DATE NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB;

-- 4. Estructura de la Tabla: prestamos
CREATE TABLE IF NOT EXISTS `prestamos` (
  `id_prestamo` INT AUTO_INCREMENT,
  `id_libro` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  `fecha_prestamo` DATE NOT NULL,
  `fecha_devolucion_real` DATE DEFAULT NULL, -- NULL significa que no fue devuelto aún
  `monto_multa` DECIMAL(8, 2) DEFAULT 0.00,
  PRIMARY KEY (`id_prestamo`),
  KEY `fk_prestamos_libros` (`id_libro`),
  KEY `fk_prestamos_usuarios` (`id_usuario`)
) ENGINE=InnoDB;


-- --------------------------------------------------------
-- Restricciones de Integridad Referencial (Foreign Keys)
-- --------------------------------------------------------
ALTER TABLE `libros`
  ADD CONSTRAINT `fk_libros_autores` FOREIGN KEY (`id_autor`) REFERENCES `autores` (`id_autor`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `prestamos`
  ADD CONSTRAINT `fk_prestamos_libros` FOREIGN KEY (`id_libro`) REFERENCES `libros` (`id_libro`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_prestamos_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;


-- --------------------------------------------------------
-- Carga de Datos de Prueba (Semillas Relacionales)
-- --------------------------------------------------------

-- Inserción de Autores (6 Autores)
-- Nota: "Edgar Allan Poe" no tendrá ningún libro asociado para pruebas de LEFT JOIN
INSERT INTO `autores` (`nombre`, `apellido`, `nacionalidad`) VALUES
('Gabriel', 'García Márquez', 'Colombiana'),
('Jorge Luis', 'Borges', 'Argentina'),
('Isabel', 'Allende', 'Chilena'),
('Julio', 'Cortázar', 'Argentina'),
('Stephen', 'King', 'Estadounidense'),
('Edgar Allan', 'Poe', 'Estadounidense');

-- Inserción de Libros (11 Libros)
INSERT INTO `libros` (`titulo`, `id_autor`, `genero`, `precio`) VALUES
('Cien años de soledad', 1, 'Realismo Mágico', 45000.00),
('El amor en los tiempos del cólera', 1, 'Realismo Mágico', 38000.00),
('Ficciones', 2, 'Fantasía / Ensayo', 32000.00),
('El Aleph', 2, 'Fantasía / Ensayo', 29000.00),
('La casa de los espíritus', 3, 'Realismo Mágico', 41000.00),
('Paula', 3, 'Biografía / Drama', 26000.00),
('Rayuela', 4, 'Novela Experimental', 48000.00),
('Bestiario', 4, 'Realismo Fantástico', 22000.00),
('It (Eso)', 5, 'Terror / Suspenso', 64000.00),
('El Resplandor', 5, 'Terror / Suspenso', 52000.00),
('Misery', 5, 'Terror / Suspenso', 49000.00);

-- Inserción de Usuarios
INSERT INTO `usuarios` (`nombre`, `apellido`, `email`, `fecha_registro`) VALUES
('Juan', 'Gomez', 'juan.gomez@email.com', '2025-01-10'),
('María', 'Rodríguez', 'maria.rod@email.com', '2025-01-15'),
('Javier', 'Lopez', 'javi.lopez@email.com', '2025-02-01'),
('Laura', 'Martínez', 'laura.m@email.com', '2025-02-12'),
('Carlos', 'Sánchez', 'carlos.sanchez@email.com', '2025-03-05');

-- Inserción de Préstamos
-- Nota: Algunos préstamos tienen fecha_devolucion_real (devueltos), otros tienen NULL (prestados)
INSERT INTO `prestamos` (`id_libro`, `id_usuario`, `fecha_prestamo`, `fecha_devolucion_real`, `monto_multa`) VALUES
(1, 1, '2025-02-10', '2025-02-24', 0.00),
(3, 1, '2025-02-15', '2025-03-01', 0.00),
(2, 2, '2025-02-20', NULL, 0.00),         -- Pendiente de devolución
(9, 2, '2025-03-01', '2025-03-25', 1500.00), -- Devuelto con retraso y multa
(5, 3, '2025-03-10', '2025-03-20', 0.00),
(7, 3, '2025-03-15', NULL, 0.00),         -- Pendiente de devolución
(10, 4, '2025-04-02', '2025-04-16', 0.00),
(8, 4, '2025-04-10', NULL, 0.00),         -- Pendiente de devolución
(1, 5, '2025-04-15', '2025-04-29', 0.00),
(11, 5, '2025-05-01', NULL, 0.00),        -- Pendiente de devolución
(4, 1, '2025-05-10', NULL, 0.00);         -- Pendiente de devolución
