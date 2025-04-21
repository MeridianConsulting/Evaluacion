-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-03-2025 a las 14:57:59
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

--
-- Volcado de datos para la tabla `cargo`
--

INSERT INTO `cargo` (`id_cargo`, `nombre_cargo`, `descripcion_cargo`, `objetivo_cargo`, `proceso_gestion`) VALUES
(1, 'Soporte Operativo Tipo 3A', NULL, '', ''),
(2, 'Asesor Administrativo', NULL, '', ''),
(3, 'Supervisor de Operaciones en Pozos Tipo 3', NULL, '', ''),
(4, 'Supervisor de Operaciones en Pozos Tipo 2', NULL, '', ''),
(5, 'Soporte Operativo Tipo 3B', NULL, '', ''),
(6, 'Profesional Senior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', NULL, '', ''),
(7, 'Director de Proyecto Ecopetrol', NULL, '', ''),
(8, 'Profesional Junior para la ejecucion de actividades de la ODS No. 9532986 del contrato Matriz No. 30', NULL, '', ''),
(9, 'Soporte Operativo Tipo 4A', NULL, '', ''),
(10, 'Profesional Junior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', NULL, '', ''),
(11, 'Supervisor de Operaciones en Pozos Tipo 1', NULL, '', ''),
(12, 'Soporte Operativo Tipo 2', NULL, '', ''),
(13, 'Subgerente', NULL, '', ''),
(14, 'Gerente General', NULL, '', ''),
(15, 'Analista de Gestion Humana y Nomina', NULL, '', ''),
(16, 'Asistente de Logistica', NULL, '', ''),
(17, 'Servicio Especializado Tipo 2 - Integridad', NULL, '', ''),
(18, 'Coordinador Contable y Financiero', NULL, '', ''),
(19, 'Gerente Administrativa Y Financiera', NULL, '', ''),
(20, 'Servicios Generales', NULL, '', ''),
(21, 'Aprendiz Etapa Lectiva', NULL, '', ''),
(22, 'Practicante Universitario', NULL, '', ''),
(23, 'Analista Contable', NULL, '', ''),
(24, 'Profesional de Proyectos', NULL, '', ''),
(25, 'Soporte Hseq', NULL, '', ''),
(26, 'Soporte Hseq II', NULL, '', ''),
(27, 'Programador Aprendiz SENA', NULL, '', ''),
(28, 'Soporte Operativo Tipo 5A', NULL, '', ''),
(29, 'Asistente administrativa y de gestion humana', NULL, '', ''),
(30, 'Asistente Administrativo', NULL, '', ''),
(31, 'Asistente de Nomina y gestion humana', NULL, '', ''),
(32, 'Asistente Contable', NULL, '', ''),
(33, 'Coordinador de Gestion Humana', NULL, '', ''),
(34, 'Tecnico Asistente Administrativa', NULL, '', ''),
(35, 'Asistente de Gestion Humana y Nomina', NULL, '', ''),
(36, 'Ingeniero(a) Asistente de Company Man para operaciones de Perforacion Completamiento y Workover  D1', NULL, '', ''),
(37, 'Ingeniero(a) Asistente de Company Man para operaciones de Perforacion Completamiento y Workover  D3', NULL, '', ''),
(38, 'Profesional B sico para la ejecucion de actividades de la ODS No. 9532986 del contrato Matriz No. 30', NULL, '', ''),
(39, 'Profesional de proyectos M1', NULL, '', ''),
(40, 'Profesional Senior para la ejecucion de actividades de la ODS No. 9532986 del contrato Matriz No. 30', NULL, '', ''),
(41, 'Ingeniero(a) Asistente de Company Man para operaciones de Perforacion Completamiento y Workover D2', NULL, '', ''),
(42, 'Profesional Junior para la ejecucion de actividades de la ODS No.9532986 del contrato Matriz No.303', NULL, '', ''),
(43, 'Profesional Junior para la ejecucion de actividades de la ODS No. 9814358 del contrato Matriz No. 30', NULL, '', ''),
(44, 'Coordinador Hseq', NULL, '', ''),
(45, 'Profesional Administrativa y de Gestion Humana, Proyectos', NULL, '', ''),
(46, 'Profesional Soporte en Campo', NULL, '', ''),
(47, 'Servicio Especializado Tipo 3A', NULL, '', ''),
(48, 'valor exacto del cargo', NULL, '', ''),
(49, 'Supervisor de Operaciones en Pozos Tipo 4', NULL, '', ''),
(50, 'Soporte IT Primer Nivel', NULL, '', ''),
(51, 'Contador Junior', NULL, '', ''),
(52, 'Aprendiz Etapa Practica', NULL, '', ''),
(54, 'Profesional Junior para la ejecucion de actividades de la ODS No.9532986 del contrato Matriz No. 303', NULL, '', ''),
(55, 'Soporte Hseq Proyectos', NULL, '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_evaluacion`
--

CREATE TABLE `detalle_evaluacion` (
  `id_detalle_evaluacion` int(11) NOT NULL,
  `id_evaluacion` int(11) NOT NULL,
  `id_funcion` int(11) NOT NULL,
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
  `id_funcion` int(11) NOT NULL,
  `id_cargo` int(11) NOT NULL,
  `titulo_funcion` varchar(100) NOT NULL,
  `descripcion_funcion` text DEFAULT NULL,
  `tipo_funcion` varchar(50) DEFAULT NULL,
  `hoja_funciones` text NOT NULL,
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
  ADD PRIMARY KEY (`id_funcion`),
  ADD KEY `fk_funciones_cargo` (`id_cargo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cargo`
--
ALTER TABLE `cargo`
  MODIFY `id_cargo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT de la tabla `detalle_evaluacion`
--
ALTER TABLE `detalle_evaluacion`
  MODIFY `id_detalle_evaluacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  MODIFY `id_evaluacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `funciones`
--
ALTER TABLE `funciones`
  MODIFY `id_funcion` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_evaluacion`
--
ALTER TABLE `detalle_evaluacion`
  ADD CONSTRAINT `fk_detalle_eval_evaluacion` FOREIGN KEY (`id_evaluacion`) REFERENCES `evaluacion` (`id_evaluacion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_detalle_eval_funcion` FOREIGN KEY (`id_funcion`) REFERENCES `funciones` (`id_funcion`) ON DELETE CASCADE ON UPDATE CASCADE;

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
