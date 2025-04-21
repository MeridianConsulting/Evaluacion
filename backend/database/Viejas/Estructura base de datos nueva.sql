-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-03-2025 a las 17:23:07
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `evaluacion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargo`
--

CREATE TABLE `cargo` (
  `id_cargo` int(11) NOT NULL,
  `nombre_cargo` varchar(100) NOT NULL,
  `descripcion_cargo` varchar(255) DEFAULT NULL,
  `objetivo_cargo` text NOT NULL DEFAULT '',
  `proceso_gestion` text NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_evaluacion`
--

CREATE TABLE `detalle_evaluacion` (
  `id_detalle_evaluacion` int(11) NOT NULL,
  `id_evaluacion` int(11) NOT NULL,
  `id_funcion` varchar(255) NOT NULL,
  `comentarios` text DEFAULT NULL,
  `calificacion` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id_empleado` int(11) NOT NULL,
  `cedula` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `tipo_documento` varchar(50) NOT NULL,
  `cargo` varchar(100) DEFAULT NULL,
  `area` varchar(100) NOT NULL,
  `fecha_inicio_contrato` date NOT NULL,
  `reporta_directamente` varchar(100) NOT NULL,
  `nivel` varchar(50) NOT NULL,
  `numero_telefonico` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `compania` varchar(100) DEFAULT NULL,
  `telefono_empresa` varchar(20) DEFAULT NULL,
  `telefono_internacional` varchar(20) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `proyecto` varchar(100) DEFAULT NULL,
  `ods` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacion`
--

CREATE TABLE `evaluacion` (
  `id_evaluacion` int(11) NOT NULL,
  `id_empleado` int(11) NOT NULL,
  `fecha_evaluacion` datetime NOT NULL,
  `observaciones_generales` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `funciones`
--

CREATE TABLE `funciones` (
  `id_cargo` int(11) NOT NULL,
  `titulo_funcion` varchar(100) NOT NULL,
  `descripcion_funcion` text DEFAULT NULL,
  `tipo_funcion` varchar(50) DEFAULT NULL,
  `hoja_funciones` varchar(255) NOT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cargo`
--
ALTER TABLE `cargo`
  ADD PRIMARY KEY (`id_cargo`),
  ADD UNIQUE KEY `uk_nombre_cargo` (`nombre_cargo`);

--
-- Indices de la tabla `detalle_evaluacion`
--
ALTER TABLE `detalle_evaluacion`
  ADD PRIMARY KEY (`id_detalle_evaluacion`),
  ADD KEY `fk_detalle_eval_evaluacion` (`id_evaluacion`),
  ADD KEY `fk_detalle_eval_funcion` (`id_funcion`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id_empleado`),
  ADD UNIQUE KEY `uk_cedula` (`cedula`),
  ADD KEY `fk_empleados_cargo` (`cargo`);

--
-- Indices de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  ADD PRIMARY KEY (`id_evaluacion`),
  ADD KEY `fk_evaluacion_empleado` (`id_empleado`);

--
-- Indices de la tabla `funciones`
--
ALTER TABLE `funciones`
  ADD PRIMARY KEY (`hoja_funciones`),
  ADD KEY `fk_funciones_cargo` (`id_cargo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cargo`
--
ALTER TABLE `cargo`
  MODIFY `id_cargo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT de la tabla `detalle_evaluacion`
--
ALTER TABLE `detalle_evaluacion`
  MODIFY `id_detalle_evaluacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=793;

--
-- AUTO_INCREMENT de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  MODIFY `id_evaluacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_evaluacion`
--
ALTER TABLE `detalle_evaluacion`
  ADD CONSTRAINT `fk_detalle_eval_evaluacion` FOREIGN KEY (`id_evaluacion`) REFERENCES `evaluacion` (`id_evaluacion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_detalle_eval_funcion` FOREIGN KEY (`id_funcion`) REFERENCES `funciones` (`hoja_funciones`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD CONSTRAINT `fk_empleados_cargo` FOREIGN KEY (`cargo`) REFERENCES `cargo` (`nombre_cargo`);

--
-- Filtros para la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  ADD CONSTRAINT `fk_evaluacion_empleado` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `funciones`
--
ALTER TABLE `funciones`
  ADD CONSTRAINT `fk_funciones_cargo` FOREIGN KEY (`id_cargo`) REFERENCES `cargo` (`id_cargo`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
