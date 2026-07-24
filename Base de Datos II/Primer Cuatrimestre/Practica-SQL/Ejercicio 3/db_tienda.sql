-- Script de Creación y Carga de Datos: db_tienda.sql
-- Compatible con phpMyAdmin, MySQL y MariaDB

CREATE DATABASE IF NOT EXISTS `tienda_ejercicio` CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
USE `tienda_ejercicio`;

-- 1. Estructura de la Tabla: clientes
CREATE TABLE IF NOT EXISTS `clientes` (
  `id_cliente` INT AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `apellido` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `ciudad` VARCHAR(50) NOT NULL,
  `fecha_registro` DATE NOT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB;

-- 2. Estructura de la Tabla: productos
CREATE TABLE IF NOT EXISTS `productos` (
  `id_producto` INT AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `categoria` VARCHAR(50) NOT NULL,
  `precio` DECIMAL(10, 2) NOT NULL,
  `stock` INT NOT NULL,
  PRIMARY KEY (`id_producto`)
) ENGINE=InnoDB;

-- 3. Estructura de la Tabla: pedidos
CREATE TABLE IF NOT EXISTS `pedidos` (
  `id_pedido` INT AUTO_INCREMENT,
  `id_cliente` INT NOT NULL,
  `fecha_pedido` DATE NOT NULL,
  `monto_total` DECIMAL(10, 2) NOT NULL,
  `estado` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id_pedido`)
) ENGINE=InnoDB;


-- --------------------------------------------------------
-- Carga de Datos de Prueba (Semillas)
-- --------------------------------------------------------

-- Inserción de Clientes
INSERT INTO `clientes` (`nombre`, `apellido`, `email`, `ciudad`, `fecha_registro`) VALUES
('Juan', 'Gomez', 'juan.gomez@email.com', 'Paraná', '2025-01-10'),
('María', 'Rodríguez', 'maria.rod@email.com', 'Oro Verde', '2025-01-15'),
('Javier', 'Lopez', 'javi.lopez@email.com', 'Paraná', '2025-02-01'),
('Laura', 'Martínez', 'laura.m@email.com', 'Santa Fe', '2025-02-12'),
('Carlos', 'Sánchez', 'carlos.sanchez@email.com', 'Crespo', '2025-03-05'),
('Ana', 'Fernández', 'ana.fer@email.com', 'Paraná', '2025-03-20'),
('José', 'Pérez', 'jose.perez@email.com', 'Santa Fe', '2025-04-02'),
('Sofía', 'Díaz', 'sofia.diaz@email.com', 'Oro Verde', '2025-04-18');

-- Inserción de Productos
INSERT INTO `productos` (`nombre`, `categoria`, `precio`, `stock`) VALUES
('Smart TV 55" 4K', 'Electrónica', 850000.00, 15),
('Notebook Intel i5 16GB', 'Electrónica', 1200000.00, 8),
('Smartphone Android 128GB', 'Electrónica', 450000.00, 25),
('Auriculares Bluetooth Over-Ear', 'Electrónica', 65000.00, 50),
('Cafetera de Filtro Eléctrica', 'Electrodomésticos', 78000.00, 12),
('Licuadora Americana 1.5L', 'Electrodomésticos', 92000.00, 5),
('Microondas Digital 20L', 'Electrodomésticos', 185000.00, 0), -- Sin Stock
('Zapatillas Deportivas Running', 'Calzado', 120000.00, 30),
('Zapatos de Vestir Cuero', 'Calzado', 180000.00, 10),
('Remera Algodón Básica', 'Indumentaria', 22000.00, 100),
('Pantalón Jean Clásico', 'Indumentaria', 55000.00, 45),
('Campera de Abrigo Impermeable', 'Indumentaria', 210000.00, 3), -- Stock Crítico
('Escritorio de Madera Moderno', 'Hogar', 240000.00, 6),
('Silla Ergonómica de Oficina', 'Hogar', 320000.00, 14),
('Lámpara de Escritorio LED', 'Hogar', 28000.00, 40),
('Teclado Mecánico RGB', 'Electrónica', 95000.00, 18);

-- Inserción de Pedidos
INSERT INTO `pedidos` (`id_cliente`, `fecha_pedido`, `monto_total`, `estado`) VALUES
(1, '2025-02-05', 850000.00, 'Entregado'),
(2, '2025-02-18', 65000.00, 'Entregado'),
(3, '2025-02-22', 1292000.00, 'Entregado'), -- Compró Notebook + Licuadora
(4, '2025-03-01', 22000.00, 'Cancelado'),
(5, '2025-03-10', 450000.00, 'Entregado'),
(6, '2025-03-24', 92000.00, 'Pendiente'),
(1, '2025-04-05', 185000.00, 'Entregado'),
(2, '2025-04-12', 240000.00, 'Pendiente'),
(7, '2025-04-20', 142000.00, 'Entregado'), -- Compró Remera + Zapatillas
(8, '2025-05-02', 320000.00, 'Pendiente'),
(3, '2025-05-15', 65000.00, 'Entregado'),
(4, '2025-05-20', 850000.00, 'Pendiente');
