-- Script de Creación y Carga de Datos: db_empresa.sql
-- Compatible con phpMyAdmin, MySQL y MariaDB

CREATE DATABASE IF NOT EXISTS `empresa_ejercicio` CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
USE `empresa_ejercicio`;

-- 1. Estructura de la Tabla: departamentos
CREATE TABLE IF NOT EXISTS `departamentos` (
  `id_departamento` INT AUTO_INCREMENT,
  `nombre_depto` VARCHAR(50) NOT NULL,
  `presupuesto` DECIMAL(12, 2) NOT NULL,
  `ubicacion` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_departamento`)
) ENGINE=InnoDB;

-- 2. Estructura de la Tabla: empleados
CREATE TABLE IF NOT EXISTS `empleados` (
  `id_empleado` INT AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `apellido` VARCHAR(50) NOT NULL,
  `salario` DECIMAL(10, 2) NOT NULL,
  `fecha_ingreso` DATE NOT NULL,
  `id_departamento` INT DEFAULT NULL,
  PRIMARY KEY (`id_empleado`),
  KEY `fk_empleados_departamentos` (`id_departamento`)
) ENGINE=InnoDB;

-- 3. Estructura de la Tabla: proyectos
CREATE TABLE IF NOT EXISTS `proyectos` (
  `id_proyecto` INT AUTO_INCREMENT,
  `nombre_proyecto` VARCHAR(100) NOT NULL,
  `presupuesto` DECIMAL(12, 2) NOT NULL,
  `id_lider` INT DEFAULT NULL, -- Empleado que lidera el proyecto
  PRIMARY KEY (`id_proyecto`),
  KEY `fk_proyectos_empleados` (`id_lider`)
) ENGINE=InnoDB;

-- 4. Estructura de la Tabla: empleados_proyectos (Tabla de unión Muchos a Muchos)
CREATE TABLE IF NOT EXISTS `empleados_proyectos` (
  `id_empleado` INT NOT NULL,
  `id_proyecto` INT NOT NULL,
  `horas_dedicadas` INT NOT NULL,
  PRIMARY KEY (`id_empleado`, `id_proyecto`),
  KEY `fk_ep_proyectos` (`id_proyecto`)
) ENGINE=InnoDB;


-- --------------------------------------------------------
-- Restricciones de Integridad Referencial (Foreign Keys)
-- --------------------------------------------------------
ALTER TABLE `empleados`
  ADD CONSTRAINT `fk_empleados_departamentos` FOREIGN KEY (`id_departamento`) REFERENCES `departamentos` (`id_departamento`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `proyectos`
  ADD CONSTRAINT `fk_proyectos_empleados` FOREIGN KEY (`id_lider`) REFERENCES `empleados` (`id_empleado`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `empleados_proyectos`
  ADD CONSTRAINT `fk_ep_empleados` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_ep_proyectos` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id_proyecto`) ON DELETE CASCADE ON UPDATE CASCADE;


-- --------------------------------------------------------
-- Carga de Datos de Prueba (Semillas Corporativas)
-- --------------------------------------------------------

-- Inserción de Departamentos (5 Departamentos)
-- Nota: "Investigación y Desarrollo" no tendrá ningún empleado asignado para pruebas de EXISTS / NOT EXISTS
INSERT INTO `departamentos` (`nombre_depto`, `presupuesto`, `ubicacion`) VALUES
('Sistemas', 15000000.00, 'Piso 3 - Ala Norte'),
('Ventas', 8000000.00, 'Piso 1 - Ala Sur'),
('Recursos Humanos', 3500000.00, 'Piso 2 - Ala Este'),
('Administración', 5000000.00, 'Piso 1 - Ala Este'),
('Investigación y Desarrollo', 12000000.00, 'Laboratorio 1');

-- Inserción de Empleados (11 Empleados con salarios variados)
INSERT INTO `empleados` (`nombre`, `apellido`, `salario`, `fecha_ingreso`, `id_departamento`) VALUES
('Rodolfo', 'Gimenez', 950000.00, '2020-03-01', 1),   -- Sistemas (Jefe)
('Marta', 'Fischer', 450000.00, '2022-06-15', 1),     -- Sistemas
('Hugo', 'Benitez', 380000.00, '2023-01-10', 1),       -- Sistemas
('Laura', 'Peralta', 820000.00, '2021-05-12', 2),     -- Ventas (Gerente)
('Javier', 'Sosa', 350000.00, '2023-08-01', 2),        -- Ventas
('Daniela', 'Flores', 310000.00, '2024-02-15', 2),     -- Ventas
('Valeria', 'Ruiz', 580000.00, '2021-11-20', 3),       -- RRHH (Jefe)
('Enzo', 'Martinez', 280000.00, '2024-01-10', 3),      -- RRHH
('Mónica', 'Carrizo', 650000.00, '2019-10-01', 4),     -- Administración (Jefe)
('Pedro', 'Vazquez', 340000.00, '2023-04-12', 4),      -- Administración
('Lucas', 'Romero', 180000.00, '2025-02-01', 1);       -- Sistemas (Junior)

-- Inserción de Proyectos (4 Proyectos)
INSERT INTO `proyectos` (`nombre_proyecto`, `presupuesto`, `id_lider`) VALUES
('Sistema de Gestión ERP', 2500000.00, 1),             -- Liderado por Rodolfo
('Expansión Comercial de Sucursales', 1200000.00, 4),   -- Liderado por Laura
('Auditoría Integral de Procesos', 350000.00, 7),       -- Liderado por Valeria
('Migración de Infraestructura Cloud', 8000000.00, 1);  -- Liderado por Rodolfo (Proyecto Millonario)

-- Asignación de Empleados a Proyectos (Relación N:M)
INSERT INTO `empleados_proyectos` (`id_empleado`, `id_proyecto`, `horas_dedicadas`) VALUES
(1, 1, 40), -- Rodolfo en ERP
(2, 1, 80), -- Marta en ERP
(3, 1, 60), -- Hugo en ERP
(4, 2, 30), -- Laura en Expansión
(5, 2, 90), -- Javier en Expansión
(6, 2, 70), -- Daniela en Expansión
(7, 3, 20), -- Valeria en Auditoría
(8, 3, 40), -- Enzo en Auditoría
(9, 3, 10), -- Mónica colabora en Auditoría
(1, 4, 50), -- Rodolfo en Cloud
(2, 4, 120),-- Marta en Cloud (Esfuerzo alto)
(3, 4, 90); -- Hugo en Cloud
