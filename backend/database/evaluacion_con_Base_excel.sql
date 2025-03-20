-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-03-2025 a las 17:09:21
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
(56, 'Asistente de Gestión Humana y Nómina', '', 'Apoyar al Coordinador(a) contable y financiero(a) a analizar, ajustar e interpretar la información financiera de la empresa, sus Consorcios y uniones temporales con el plan de cuentas,  las políticas y normas legalmente establecidas conforme a la aplicación contable en Colombia y Las Normas Internacionales de Información Financiera NIIF.', 'Gestión Humana'),
(57, 'Soporte IT Primer Nivel', '', 'Apoyar la labor Administrativa de MERIDIAN CONSULTINGLTOA por medio de actividades asistenciales', 'Gestión Administrativa'),
(58, 'Asistente Administrativo', '', 'Apoyar la labor Administrativa de MERIDIAN CONSULTING LTOA por medio de actividades asistenciales aplicando las normas y procedimientos establecidos, garantizando asi la prestacion efectiva del servicio.', 'Gestión Administrativa'),
(59, 'Subgerente', '', 'Supervisar y tomar decisiones en conjunto con el Gerente general, acerca de problemas que tengan que ver con los clientes o al interior de la empresa. Planificar, coordinar y supervisar las actividades, recursos, infraestructura y desempeño de la Organización; analizando el desempeño de las diferentes áreas y sus procesos, elaborando e implementando en forma coordinada con los respetivos jefes de áreas: programas, presupuestos, políticas, procedimientos y métodos de evaluación y seguimiento; con el fin  que la Organización tenga un eficiente desempeño y se cumpla con los objetivos y metas estratégicas.', 'Gestión Estratégica'),
(60, 'Contador Junior', '', 'Apoyar al Coordinador(a) contable y financiero(a) a analizar, ajustar e interpretar la información financiera de la empresa, sus Consorcios y uniones temporales con el plan de cuentas,  las políticas y normas legalmente establecidas conforme a la aplicación contable en Colombia y Las Normas Internacionales de Información Financiera NIIF.', 'Gestión Contable'),
(61, 'Soporte Hseq', '', 'Apoyar en la implementación, mantenimiento y mejora de el Sistema de Gestión Integral HSEQ dentro de la Empresa', 'Gestión HSEQ'),
(62, 'Coordinador de Gestión Humana', '', 'Planear, ejecutar y dirigir el área de gestión humana de MERIDIAN CONSULTING LTDA., con el fin de asegurar el funcionamiento óptimo de cada uno de los procesos relacionados con el área conforme a las políticas y procedimientos establecidos por la Compañía.', 'Gestión Humana'),
(63, 'Coordinador Hseq', '', 'Diseñar, establecer, implementar, mantener y mejorar el Sistema de Gestión Integral HSEQ dentro de la Empresa', 'Gestión HSEQ'),
(64, 'Gerente Administrativa Y Financiera', '', 'Planear, ejecutar y dirigir la gestión administrativa y financiera de MERIDIAN CONSULTING LTDA., con el fin de asegurar el funcionamiento óptimo de todas las áreas conforme a las políticas y objetivos de la Compañía.', 'Gestión Estratégica'),
(65, 'Servicios Generales', '', 'Realizar las labores de aseo, limpieza y cafetería, para brindar comodidad a los funcionarios y visitantes en los sitios de trabajo del área a la cual está prestando los servicios, conforme a las normas y procedimientos vigentes de la compañía.', 'Gestión Administrativa'),
(66, 'Asistente de Nomina y gestion humana', '', 'Apoyar al Coordinador(a) contable y financiero(a) a analizar, ajustar e interpretar la información financiera de la empresa, sus Consorcios y uniones temporales con el plan de cuentas,  las políticas y normas legalmente establecidas conforme a la aplicación contable en Colombia y Las Normas Internacionales de Información Financiera NIIF.', 'Gestión Humana'),
(67, 'Gerente General', '', '1). Representar a la sociedad ante los socios, terceros y toda clase de autoridades del orden administrativo o jurisdiccional, en los alcances definidos por la junta de socios, cumplir y hacer cumplir las determinaciones, órdenes o instrucciones de la Junta de Socios.\r\n2). Planificar, organizar, controlar, desarrollar y liderar la  compañía, con el fin de que la organización tenga un eficiente desempeño y se cumpla con los objetivos y metas estratégicas.', 'Gestión Estratégica'),
(68, 'Coordinador Contable y Financiero', '', 'Analizar, ajustar e interpretar la información financiera de la empresa, sus Consorcios y Uniones Temporales con el plan de cuentas,  las políticas y normas legalmente establecidas conforme a la aplicación contable en Colombia y Las Normas Internacionales de Información Financiera NIIF.', 'Gestión Contable'),
(69, 'Asistente Contable', '', 'Recopilar informacion contable y financiera de la empresa, sus Consorcios y uniones temporales con el plan de cuentas,  las políticas y normas legalmente establecidas conforme a la aplicación contable en Colombia y Las Normas Internacionales de Información Financiera NIIF y en apoyo al  Coordinador(a) contable y financiero(a) analizarla, ajustarla e interpretarla, a fin de garantizar la presentacion de  estados financieros confiables y oportunos.', 'Gestión Contable'),
(70, 'Analista Contable', '', 'Recopilar informacion contable y financiera de la empresa, sus Consorcios y uniones temporales con el plan de cuentas,  las políticas y normas legalmente establecidas conforme a la aplicación contable en Colombia y Las Normas Internacionales de Información Financiera NIIF y en apoyo al  Coordinador(a) contable y financiero(a) analizarla, ajustarla e interpretarla, a fin de garantizar la presentacion de  estados financieros confiables y oportunos.', 'Gestión Contable'),
(71, 'Profesional Especialista', '', 'Servicio para la caracterización y Gestión del Yacimiento, y/o la construcción de escenarios de subsuelo y/o la planeación lntegrada del desarrollo, y/o la Integración y análisis de oportunidades de desarrollo y el Análisis de resultados y acciones de mejora al plan integrado de desarrollo en las disciplinas de geología, petrofísica, Ingenieria de yacimientos, data analytics y modelador PID para la gerencia de desarrollo socios y offshore GAC.', 'Gestión de Proyectos'),
(72, 'Profesional Senior', '', 'Servicio para la caracterización y Gestión del Yacimiento, y/o la construcción de escenarios de subsuelo y/o la planeación lntegrada del desarrollo, y/o la Integración y análisis de oportunidades de desarrollo y el Análisis de resultados y acciones de mejora al plan integrado de desarrollo en las disciplinas de geología, petrofísica, Ingenieria de yacimientos, data analytics y modelador PID para la gerencia de desarrollo socios y offshore GAC.', 'Gestión de Proyectos'),
(73, 'Profesional Junior', '', 'Servicio para la caracterización y gestión del yacimiento, y/o la construcción de escenarios de subsuelo y/o la planeación integrada del desarrollo, y/o la integración y análisis de oportunidades de desarrollo y el análisis de resultados y acciones de mejora al plan integrado de desarrollo de activos GOR y GPA', 'Gestión de Proyectos'),
(74, 'Profesional Basico', '', 'Servicio para la caracterización y gestión del yacimiento, y/o la construcción de escenarios de subsuelo y/o la planeación integrada del desarrollo, y/o la integración y análisis de oportunidades de desarrollo y el análisis de resultados y acciones de mejora al plan integrado de desarrollo de activos GOR y GPA', 'Gestión de Proyectos'),
(75, 'Soporte Operativo T5A', '', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestión de Proyectos'),
(76, 'Supervisor de Operaciones en Pozos T4', '', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestión de Proyectos'),
(77, 'Soporte Operativo T4A', '', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestión de Proyectos'),
(78, 'Supervisor de Operaciones en Pozos T2', '', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestión de Proyectos'),
(79, 'Supervisor de Operaciones en Pozos T3', '', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestión de Proyectos'),
(80, 'Supervisor de Operaciones en Pozos T1', '', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestión de Proyectos'),
(81, 'Soporte Operativo T3B', '', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestión de Proyectos'),
(82, 'Profesional HSEQ', '', 'Implementar, mantener y promover la mejora continua de el Sistema de Gestión Integral HSEQ dentro de la Empresa', 'Gestión HSEQ'),
(83, 'PROF. DE PROYECTO EN ENTRENAMIENTO', '', '', ''),
(84, 'SOPORTE OPERATIVO 4A', '', '', ''),
(85, 'SOPORTE OPERATIVO 5A', '', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestión de Proyectos'),
(86, 'Profesional Senior para la ejecución de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '', 'SERVICIO PARA MONITOREO DE YACIMIENTOS, CONSTRUCCIÓN DE ESCENARIOS DE SUBSUELO Y SOPORTE A LOS PLANES INTEGRADOS DE DESARROLLO, MADURACIÓN DE OPORTUNIDADES DE DESARROLLO EN EL CORTO Y LARGO PLAZO, A LOS PROYECTOS EN MADURACIÓN Y EJECUCIÓN QUE SOPORTA LA GERENCIA DE DESARROLLO ORINOQUIA EN LOS CAMPOS DE LA VRO – DURANTE EL 2do SEMESTRE DE 2024', 'Gestión de Proyectos'),
(87, 'Director de Proyecto Ecopetrol', '', 'Planificar, dirigir, ejecutar y controlar el desarrollo del proyecto involucrando a todas las areas de la compañía', 'Gestion proyectos'),
(88, 'Profesional de Proyectos', '', 'Ejecutar junto con el Director del proyecto, el plan de trabajo de cada proyecto teniendo en cuenta los requerimientos contractuales, los aspectos logísticos, administrativos, financieros y técnicos.', 'Gestion proyectos'),
(89, 'Profesional Administrativa y de Gestión Humana, Proyectos', '', 'Apoyar las laboresde  Gestion Administrativa y de Gestión Humana de MERIDIAN CONSULTING LTDA por medio de actividades que aseguren su optimo funcionamiento y cumplimiento de objetivos de la compañia, aplicando las normas y procedimientos establecidos, garantizando así la prestación efectiva del servicio,', 'Gestión Administrativa'),
(90, 'Soporte Hseq II', '', 'Apoyar en la implementación, mantenimiento y mejora de el Sistema de Gestión Integral HSEQ dentro de la Empresa', 'Gestión HSEQ'),
(91, 'Tecnico Asistente Administrativa', '', 'Apoyar la labor Administrativa de MERIDIAN CONSULTINGLTOA por medio de actividades asistenciales aplicando las normas y procedimientos establecidos, garantizando así la prestación efectiva del servicio', 'Gestion proyectos'),
(92, 'Supervisor de Operaciones en Pozos Tipo 4', '', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestion proyectos'),
(93, 'Soporte Operativo Tipo 3A', '', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestion proyectos'),
(94, 'Soporte Operativo Tipo 3B', '', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestion proyectos'),
(95, 'Soporte Operativo Tipo 4A', '', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestion proyectos'),
(96, 'Supervisor de Operaciones en Pozos Tipo 2', '', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestion proyectos'),
(97, 'Supervisor de Operaciones en Pozos Tipo 3', '', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestion proyectos'),
(98, 'Soporte Operativo Tipo 5A', '', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestion proyectos'),
(99, 'Soporte Operativo Tipo 4B', '', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestion proyectos'),
(100, 'Profesional Soporte en Campo', '', 'Ejecutar junto con el Director del proyecto y/o el Coordinador de proyecto y/o el gerente general, el plan de trabajo de cada proyecto teniendo en cuenta los requerimientos contractuales, los aspectos logísticos, administrativos, técnicos,servicios de supervision y/o soporte integral de operaciones de pozos (Estandar API)', 'Gestion proyectos'),
(101, 'Supervisor de Operaciones en Pozos Tipo 1', '', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestion proyectos'),
(102, 'Soporte Operativo Tipo 1', '', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestion proyectos'),
(103, 'Soporte Operativo Tipo 2', '', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestion proyectos'),
(104, 'Profesional de proyectos M1', '', 'Coordinar junto con el Director del proyecto la ejecucion del mismo  teniendo en cuenta la parte logística, administrativa y técnica.', 'Gestion proyectos'),
(105, 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D3', '', 'Soporte de ingeniería y operaciones en campo', 'Gestion proyectos'),
(106, 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D2', '', 'Soporte de ingeniería y operaciones en campo', 'Gestion proyectos'),
(107, 'Profesional de Proyectos A1', '', 'Coordinar junto con el Director del proyecto la ejecución del mismo teniendo en cuenta la parte logística, administrativa y técnica.', 'Gestion proyectos'),
(108, 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D1', '', 'Soporte de ingeniería y operaciones en campo', 'Gestion proyectos'),
(109, 'Profesional de Proyectos B1', '', 'Ejecutar junto con el Director del proyecto y/o el Coordinador de proyecto y/o el gerente general, el plan de trabajo de cada proyecto teniendo en cuenta los requerimientos contractuales, los aspectos logísticos, administrativos, financieros y técnicos.', 'Gestion proyectos');

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

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id_empleado`, `cedula`, `nombre`, `tipo_documento`, `cargo`, `area`, `fecha_inicio_contrato`, `reporta_directamente`, `nivel`, `numero_telefonico`, `email`, `compania`, `telefono_empresa`, `telefono_internacional`, `contrasena`, `proyecto`, `ods`) VALUES
(581, 1022942596, 'ANDREA IRENE DEL PILAR PINZON', 'Cédula de Ciudadanía', 'Asistente de Gestión Humana y Nómina', 'Administracion', '2024-08-13', 'Coordinador (a) de Gestión Humana', '4', '000000', 'asistentegestionhumana@meridian.com.co', 'Desconocida', '000000', 'N/A', '123456', 'ADMINISTRACION', ''),
(582, 1007627524, 'ANDRES CAMILO CARDENAS REYES', 'Cédula de Ciudadanía', 'Soporte IT Primer Nivel', 'Administracion', '2023-12-04', 'Gerente Administrativo(a) y Financiero(a)', '4', '000000', 'soporteit.nivel1@meridian.com.co', 'Desconocida', '000000', 'N/A', '123456', 'ADMINISTRACION', ''),
(583, 1014251428, 'AURA ALEJANDRA CONTRERAS TORRES', 'Cédula de Ciudadanía', 'Asistente Administrativo', 'Administracion', '2020-12-01', 'Gerente Administrativo(a) y Financiero(a)', '4', '000000', 'asistenteadministrativo1@meridian.com.co', 'Desconocida', '000000', 'N/A', '123456', 'ADMINISTRACION', ''),
(584, 79490148, 'CESAR AUGUSTO URREGO AVENDAÑO', 'Cédula de Ciudadanía', 'Subgerente', 'Administracion', '2009-08-01', 'Gerente General', '1', '000000', 'currego@meridian.com.co', 'Desconocida', '000000', 'N/A', '123456', '', ''),
(585, 1010126883, 'DANNY ALEXANDERPANCHE VICENTES', 'Cédula de Ciudadanía', 'Contador Junior', 'Administracion', '2020-07-16', 'Coordinador(a) Contable y Financiero(a)', '3', '000000', 'contadorjr@meridian.com.co', 'Desconocida', '000000', 'N/A', '123456', '', ''),
(586, 1031145571, 'DIANA MARCELA JACOBO MANCERA', 'Cédula de Ciudadanía', 'Soporte Hseq', 'Administracion', '2023-08-14', 'Coordinador HSEQ', '4', '000000', 'soportehseq@meridian.com.co', 'Desconocida', '000000', 'N/A', '123456', 'ADMINISTRACION', ''),
(587, 1020733194, 'ELOY GABRIEL GOMEZ REYES', 'Cédula de Ciudadanía', 'Coordinador de Gestión Humana', 'Administracion', '2023-06-13', 'Gerente Administrativo(a) y Financiero(a)', '2', '000000', 'coordinaciongestionhumana@meridian.com.co', 'Desconocida', '000000', 'N/A', '123456', 'ADMINISTRACION', ''),
(588, 1119211830, 'LUIS MIGUEL GUEVARA MARLES', 'Cédula de Ciudadanía', 'Coordinador Hseq', 'Administracion', '2022-11-22', 'Gerente General', '2', '000000', 'hseq@meridian.com.co', 'Desconocida', '000000', 'N/A', '123456', 'ADMINISTRACION', ''),
(589, 52030991, 'NORA GISELL MORENO MORENO', 'Cédula de Ciudadanía', 'Gerente Administrativa Y Financiera', 'Administracion', '2009-01-01', 'Gerente General', '1', '000000', 'nmoreno@meridian.com.co', 'Desconocida', '000000', 'N/A', '123456', '', ''),
(590, 52147279, 'RUTH MUÑOZ CASTILLO', 'Cédula de Ciudadanía', 'Servicios Generales', 'Administracion', '2011-06-13', 'Gerente Administrativo(a) y Financiero(a)', '5', '000000', 'rmunoz@meridian.com.co', 'Desconocida', '000000', 'N/A', '123456', 'ADMINISTRACION', ''),
(591, 1014180459, 'SANDRA MILENA FLOREZ PRADO', 'Cédula de Ciudadanía', 'Asistente Administrativo', 'Administracion', '2023-05-02', 'Gerente Administrativo(a) y Financiero(a)', '4', '000000', 'asistenteadministrativo2@meridian.com.co', 'Desconocida', '000000', 'N/A', '123456', 'ADMINISTRACION', ''),
(592, 1007647736, 'SONIA STEPHANIA FONSECA LOPEZ', 'Cédula de Ciudadanía', 'Asistente de Nomina y gestion humana', 'Administracion', '2024-05-02', 'Coordinador (a) de Gestión Humana', '4', '000000', 'asistentegestionhumana2@meridian.com.co', 'Desconocida', '000000', 'N/A', '123456', 'ADMINISTRACION', ''),
(593, 79613401, 'WILLIAM AUGUSTO FRANCO CASTELLANOS', 'Cédula de Ciudadanía', 'Gerente General', 'Administracion', '2009-08-01', 'Junta de Socios', '1', '000000', 'wfranco@meridian.com.co', 'Desconocida', '000000', 'N/A', '123456', 'ADMINISTRACION', ''),
(594, 52005033, 'ZANDRA PATRICIA MAYORGA GOMEZ', 'Cédula de Ciudadanía', 'Coordinador Contable y Financiero', 'Administracion', '2018-01-23', 'Gerente Administrativo(a) y Financiero(a)', '2', '000000', 'coordinadoracontable@meridian.com.co', 'Desconocida', '000000', 'N/A', '123456', 'ADMINISTRACION', ''),
(595, 1019098876, 'YESSICA ANDREA ABELLA RODRIGUEZ', 'Cédula de Ciudadanía', 'Asistente Contable', 'Administracion', '2024-10-21', 'Coordinador(a) Contable y Financiero(a)', '4', '000000', '', 'Desconocida', '000000', 'N/A', '123456', 'ADMINISTRACION', ''),
(596, 1000931984, 'KAREN JULIETH CARRANZA RODRIGUEZ', 'Cédula de Ciudadanía', 'Analista Contable', 'Administracion', '2024-10-21', 'Coordinador(a) Contable y Financiero(a)', '3', '000000', '', 'Desconocida', '000000', 'N/A', '123456', 'ADMINISTRACION', ''),
(597, 43728382, 'ALEXANDRA ISABEL MESA CARDENAS', 'Cédula de Ciudadanía', 'Profesional Especialista', 'Gestión de Proyectos', '2024-01-03', 'Coordinador de proyectos', '3', '000000', 'alexandramesa85@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9135816'),
(598, 1014216060, 'CARLOS ALEJANDRO FORERO PEÑA', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-03', 'Coordinador de proyectos', '3', '000000', 'forero_c05@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9135816'),
(599, 52967140, 'DIANA PAOLA SOLANO SUA', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-03', 'Coordinador de proyectos', '3', '000000', 'dianapsolano.2017@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9135816'),
(600, 52844528, 'EDNA MILED NIÑO OROZCO', 'Cédula de Ciudadanía', 'Profesional Especialista', 'Gestión de Proyectos', '2024-01-03', 'Coordinador de proyectos', '3', '000000', 'miledn7@yahoo.com.mx', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9135816'),
(601, 1032414423, 'LAURA MARIA HERNANDEZ RIVEROS', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-03', 'Coordinador de proyectos', '3', '000000', 'lhernandez@utexas.edu', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9119211'),
(602, 478731, 'ZENAIDA DEL VALLE MARCANO DE VILLARROEL', 'Cédula de extranjeria', 'Profesional Senior', 'PROYECTO PETROSERVICIOS', '2024-01-09', 'Coordinador de proyectos', '3', '000000', 'marcanozdelvalle@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9186546'),
(603, 1128452509, 'CINDY NATALIA ISAZA TORO', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-09', 'Coordinador de proyectos', '3', '000000', 'natiisaza@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9135816'),
(604, 1010056001, 'EMELI YOHANA YACELGA CHITAN', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-09', 'Coordinador de proyectos', '3', '000000', 'Emeli.yacelga@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9135816'),
(605, 40936668, 'ESPERANZA DE JESUS COTES LEON', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-09', 'Coordinador de proyectos', '3', '000000', 'esperanza.cotes@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9135816'),
(606, 1128474161, 'LEIDY LAURA ALVAREZ BERRIO', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-09', 'Coordinador de proyectos', '3', '000000', 'alvarezlaura08@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9135816'),
(607, 80883010, 'OVEIMAR SANTAMARIA TORRES', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-09', 'Coordinador de proyectos', '3', '000000', 'oveimar.santamaria@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9135816'),
(608, 80170660, 'RUBEN HERNAN CASTRO GARCIA', 'Cédula de Ciudadanía', 'Profesional Especialista', 'Gestión de Proyectos', '2024-01-09', 'Coordinador de proyectos', '3', '000000', 'rubencastrogarcia83@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9135816'),
(609, 1075284985, 'SEBASTIAN LLANOS GALLO', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-09', 'Coordinador de proyectos', '3', '000000', 'sllanosg@unal.edu.co', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9135816'),
(610, 83042295, 'WILLIAM CABRERA CASTRO', 'Cédula de Ciudadanía', 'Profesional Senior', 'PROYECTO PETROSERVICIOS', '2024-01-09', 'Coordinador de proyectos', '3', '000000', 'williamcabreracastro@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9318805'),
(611, 1152210959, 'CARLOS JOSE URZOLA EBRATT', 'Cédula de Ciudadanía', 'Profesional Basico', 'Gestión de Proyectos', '2024-06-25', 'Coordinador de proyectos', '3', '000000', 'carlosjose.ue@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9135816'),
(612, 1022380991, 'DIEGO FERNANDO CASTILLO BAYONA', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-09', 'Coordinador de proyectos', '3', '000000', 'diegocastillok8@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9135816'),
(613, 1115069820, 'GABRIEL EDUARDO VELEZ BARRERA', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-09', 'Coordinador de proyectos', '3', '000000', 'gabrielvelezb6@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9135816'),
(614, 331789, 'GLADYS EVANGELINA TABARES PEREZ', 'Cédula de extranjeria', 'Profesional Especialista', 'Gestión de Proyectos', '2024-01-09', 'Coordinador de proyectos', '3', '000000', 'tabaresgt@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9135816'),
(615, 1151954545, 'JUAN MATEO CORDOBA WAGNER', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-09', 'Coordinador de proyectos', '3', '000000', 'jmcordobaw@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9139035'),
(616, 1019011177, 'LEIDY JOHANNA BELLO AREVALO', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-09', 'Coordinador de proyectos', '3', '000000', 'johanna.bello@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9139035'),
(617, 1047451443, 'CARLOS RAFAEL OLMOS CARVAL', 'Cédula de Ciudadanía', 'Profesional Basico', 'Gestión de Proyectos', '2024-01-10', 'Coordinador de proyectos', '3', '000000', 'carlosolmosc@outlook.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9108440'),
(618, 1032467291, 'CHRISTIAN MAURICIO PARDO CARRANZA', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-10', 'Coordinador de proyectos', '3', '000000', 'christianmauriciopardo@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9108440'),
(619, 1140847297, 'DAVID ALEJANDRO GARCIA CORONADO', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-10', 'Coordinador de proyectos', '3', '000000', 'Alejandro_7269@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9108440'),
(620, 30405867, 'DIANA MARCELA CACERES SALINAS', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-10', 'Coordinador de proyectos', '3', '000000', 'caceres.diana@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9108440'),
(621, 1095826986, 'LIZETH DAYANA BAUTISTA RICO', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-10', 'Coordinador de proyectos', '3', '000000', 'lbautistarico@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9108440'),
(622, 1026255124, 'MARIA ALEJANDRA MOJICA ARCINIEGAS', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-10', 'Coordinador de proyectos', '3', '000000', 'alejandra_mojica123@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9183859-4'),
(623, 1075292422, 'OLMER ANDRES MORALES MORA', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-10', 'Coordinador de proyectos', '3', '000000', 'andresmoralesmora95@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9183859-4'),
(624, 1056709240, 'IVAN DARIO MOZO MORENO', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-02-26', 'Coordinador de proyectos', '3', '000000', 'mozoivan@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9135816'),
(625, 53103915, 'MONICA DEL PILAR MARTINEZ VERA', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-03-04', 'Coordinador de proyectos', '3', '000000', 'monamartinez28@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9135816'),
(626, 1098725794, 'JOSE GABRIEL NASSAR DIAZ', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-04-01', 'Coordinador de proyectos', '3', '000000', 'josse.nazzar@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9119211'),
(627, 1075292404, 'FRANCISCO JOSE AMADO IRIARTE', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-04-15', 'Coordinador de proyectos', '3', '000000', 'franciscoamado95@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9142407'),
(628, 1098755426, 'JAIME JOSÉ MARTÍNEZ VERTEL', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-05-21', 'Coordinador de proyectos', '3', '000000', 'jaimemartinez12345@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9142407'),
(629, 1110502030, 'DIANA MARIA HERNANDEZ CASTRO', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-15', 'Coordinador de proyectos', '3', '000000', 'd.mhernandezcastro@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9142407'),
(630, 30400528, 'BLANCA OFFIR HURTADO LOPERA', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-16', 'Coordinador de proyectos', '3', '000000', 'hurtadoblanca@yahoo.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9142407'),
(631, 1026292916, 'CAMILO ANDRES SANTANA OTALORA', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-16', 'Coordinador de proyectos', '3', '000000', 'camilo.santana@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9142407'),
(632, 52969518, 'CAROLINA LEON VANEGAS', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-16', 'Coordinador de proyectos', '3', '000000', 'karitoleon@gmail.com; carleonvan@unal.edu.co', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9135816'),
(633, 1075293846, 'DANIELA MOLINA LANDINEZ', 'Cédula de Ciudadanía', 'Profesional Especialista', 'Gestión de Proyectos', '2024-01-16', 'Coordinador de proyectos', '3', '000000', 'danimolina19@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9108440'),
(634, 1049619319, 'DIEGO ARMANDO VANEGAS ARAQUE', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-16', 'Coordinador de proyectos', '3', '000000', 'diegov14@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9139035'),
(635, 1091660311, 'EDUAR ERNESTO PEREZ ROJAS', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-16', 'Coordinador de proyectos', '3', '000000', 'ingeduar10@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9139035'),
(636, 1010167959, 'FRANKLIN ALEJANDRO BOTERO RIVERA', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-16', 'Coordinador de proyectos', '3', '000000', 'alejandro.botero1120@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9139035'),
(637, 1098739269, 'GUSTAVO ADOLFO MORENO BELTRAN', 'Cédula de extranjeria', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-16', 'Coordinador de proyectos', '3', '000000', 'gustavo.moreno.beltran@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9325490'),
(638, 63527981, 'INA YADITH SERRANO LASTRE', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-16', 'Coordinador de proyectos', '3', '000000', 'inaserrano@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9139035'),
(639, 1085247861, 'IVAN DARIO MONCAYO RIASCOS', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-16', 'Coordinador de proyectos', '3', '000000', 'idmoncay@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9135816'),
(640, 91520047, 'JESUS DAVID ARENAS NAVARRO', 'Cédula de Ciudadanía', 'Profesional junior', 'Gestión de Proyectos', '2024-01-16', 'Coordinador de proyectos', '3', '000000', 'ajbdavidgeo@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9135816'),
(641, 10297751, 'JOSE MANUEL GARCIA OROZCO', 'Cédula de Ciudadanía', 'Profesional Básico', 'Gestión de Proyectos', '2024-01-16', 'Coordinador de proyectos', '3', '000000', 'garciaorozcojosemanuel@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9135816'),
(642, 1026267749, 'JUAN DAVID ARISTIZABAL MARULANDA', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-16', 'Coordinador de proyectos', '3', '000000', 'juancheing@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9135816'),
(643, 1098782789, 'JUAN SEBASTIAN AVILA PARRA', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-16', 'Coordinador de proyectos', '3', '000000', 'juansebastian964@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9325490'),
(644, 13740129, 'JULIO CESAR FIGUEROA VEGA', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-16', 'Coordinador de proyectos', '3', '000000', 'Juliofigue@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9186547'),
(645, 1012387614, 'LEONARDO SANTOS MATEUS BAEZ', 'Cédula de Ciudadanía', 'Profesional Especialista', 'Gestión de Proyectos', '2024-01-16', 'Coordinador de proyectos', '3', '000000', 'lsmateusb@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9119211'),
(646, 37514608, 'LUCIA MARIA ACERO LIZCANO', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-16', 'Coordinador de proyectos', '3', '000000', 'luciaacero@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9142407'),
(647, 1075286382, 'MARIA ALEJANDRA CABRERA GARCIA', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-16', 'Coordinador de proyectos', '3', '000000', 'alejacabrera2211@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9135816'),
(648, 1098697791, 'MARIA ALEJANDRA JOYA RINCON', 'Cédula de Ciudadanía', 'Profesional Básico', 'Gestión de Proyectos', '2024-01-16', 'Coordinador de proyectos', '3', '000000', 'Alejandra.joya@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9135816'),
(649, 13720871, 'MARIO AUGUSTO MORENO CASTELLANOS', 'Cédula de Ciudadanía', 'Profesional Básico', 'Gestión de Proyectos', '2024-01-16', 'Coordinador de proyectos', '3', '000000', 'geomario@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9186547'),
(650, 1023961699, 'NICOLAS AVENDAÑO VASQUEZ', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-16', 'Coordinador de proyectos', '3', '000000', 'nav2052@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9135816'),
(651, 1098733967, 'OSCAR FABIAN SUAREZ SUAREZ', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-16', 'Coordinador de proyectos', '3', '000000', 'oscarsuarez93@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9139035'),
(652, 1072699593, 'RUBEN DARIO ORTIZ MURCIA', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-16', 'Coordinador de proyectos', '3', '000000', 'ruben_ortiz07@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9142407'),
(653, 1007555164, 'SERGIO FERNANDO POVEDA SALAZAR', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-16', 'Coordinador de proyectos', '3', '000000', 'sf.poveda@uniandes.edu.co', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9139035'),
(654, 1143327261, 'GIOVANNI MARTINEZ LEONES', 'Cédula de extranjeria', 'Profesional Especialista', 'Gestión de Proyectos', '2024-05-31', 'Coordinador de proyectos', '3', '000000', 'gio.martinez.leones@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9183859-4'),
(655, 63540751, 'ADRIANA PATRICIA DUEÑES GARCÉS', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-06-01', 'Coordinador de proyectos', '3', '000000', 'adriana_geologia@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9139035'),
(656, 80777836, 'JOHN JAIRO MORA SOTO', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-07-22', 'Coordinador de proyectos', '3', '000000', 'jjmoras1@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9325490'),
(657, 1018455383, 'YELTSIN PARMENIO VEGA NIÑO', 'Cédula de Ciudadanía', 'Soporte Operativo T5A', 'Gestión de Proyectos', '2024-08-08', 'Coordinador de proyectos', '3', '000000', 'ypvegan@unal.edu.co', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY ANTIGUO', ''),
(658, 80192577, 'LUIS ANDRES MORENO MEDINA', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T4', 'Gestión de Proyectos', '2023-09-16', 'Coordinador de proyectos', '3', '000000', 'ing.andmoreno@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY ANTIGUO', ''),
(659, 1098777543, 'Clara Yineth Velasquez Diaz', 'Cédula de Ciudadanía', 'Soporte Operativo T5A', 'Gestión de Proyectos', '2023-07-11', 'Coordinador de proyectos', '3', '000000', 'clara.velasquez@ecopetrol.com.co', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY ANTIGUO', ''),
(660, 1075234956, 'Ingrid Yeset Sanchez Perez', 'Cédula de Ciudadanía', 'Soporte Operativo T4A', 'Gestión de Proyectos', '2023-07-11', 'Coordinador de proyectos', '3', '000000', 'ingrid.sanchez@ecopetrol.com.co', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY ANTIGUO', ''),
(661, 7729226, 'OSCAR EDUARDO IBAGON MORERA', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T2', 'Gestión de Proyectos', '2023-08-20', 'Coordinador de proyectos', '3', '000000', 'oscar_ibagon@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY ANTIGUO', ''),
(662, 1130585053, 'CHRISTIAN JOSE PUPIALES FERNANDEZ', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T3', 'Gestión de Proyectos', '2023-09-16', 'Coordinador de proyectos', '3', '000000', 'cristianpupiales@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY ANTIGUO', ''),
(663, 12126203, 'OMAR GAONA CABRERA', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T1', 'Gestión de Proyectos', '2023-09-16', 'Coordinador de proyectos', '3', '000000', 'omargaonacabrera2021@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY ANTIGUO', ''),
(664, 79459664, 'FRANCISCO SANTOS SANTACRUZ', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T1', 'Gestión de Proyectos', '2023-09-20', 'Coordinador de proyectos', '3', '000000', 'fco_santos_4@yahoo.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY ANTIGUO', ''),
(665, 91285174, 'Fernando Jose Aparicio Becerra', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T3', 'Gestión de Proyectos', '2022-07-02', 'Coordinador de proyectos', '3', '000000', 'fernando.aparicio@ecopetrol.com.co', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY ANTIGUO', ''),
(666, 80842868, 'OSCAR MAURICIO PRIETO VARGAS', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T4', 'Gestión de Proyectos', '2023-09-20', 'Coordinador de proyectos', '3', '000000', 'prieto556g@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY ANTIGUO', ''),
(667, 1098614427, 'JUAN CAMILO CORTÉS ROJAS', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T3', 'Gestión de Proyectos', '2023-09-27', 'Coordinador de proyectos', '3', '000000', 'juancamilocortesr@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY ANTIGUO', ''),
(668, 79902734, 'Luis Felipe Uribe Parra', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T2', 'Gestión de Proyectos', '2023-07-27', 'Coordinador de proyectos', '3', '000000', 'Luis.Uribe@ecopetrol.com.co', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY ANTIGUO', ''),
(669, 87454560, 'HECTOR ANDRES NOGUERA BOLAÑOS', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T4', 'Gestión de Proyectos', '2023-09-20', 'Coordinador de proyectos', '3', '000000', 'andresnoguera111@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY ANTIGUO', ''),
(670, 9659943, 'JORGE LUIS SEGURA SANABRIA', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T2', 'Gestión de Proyectos', '2023-09-16', 'Coordinador de proyectos', '3', '000000', 'jlsegura01@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY ANTIGUO', ''),
(671, 91207387, 'FERNANDO LOPEZ PRADA', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T2', 'Gestión de Proyectos', '2023-09-16', 'Coordinador de proyectos', '3', '000000', 'ferlopra@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY ANTIGUO', ''),
(672, 24228529, 'Claudia Marina Ortiz Avendaño', 'Cédula de Ciudadanía', 'Soporte Operativo T3B', 'Gestión de Proyectos', '2022-07-01', 'Coordinador de proyectos', '3', '000000', 'claudia.ortiz@ecopetrol.com.co', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY ANTIGUO', ''),
(673, 88158913, 'Nestor Alonso Jaimes Portilla', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T3', 'Gestión de Proyectos', '2022-07-07', 'Coordinador de proyectos', '3', '000000', 'nestor.jaimes@ecopetrol.com.co', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY ANTIGUO', ''),
(674, 91524026, 'Oscar Mauricio Gomez Camacho', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T3', 'Gestión de Proyectos', '2023-07-13', 'Coordinador de proyectos', '3', '000000', 'oscarma.gomez@ecopetrol.com.co', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY ANTIGUO', ''),
(675, 1121936876, 'LAURA DANIELA SEGURA MORERA', 'Cédula de Ciudadanía', 'Profesional HSEQ', 'Administracion', '2023-09-05', 'Coordinador HSEQ', '3', '000000', 'profesionalhseq@meridian.com.co', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(676, 1053611893, 'ANGY YOLIMA SALCEDO AMADO', 'Cédula de Ciudadanía', 'PROF. DE PROYECTO EN ENTRENAMIENTO', 'Gestión de Proyectos', '2023-10-02', 'Coordinador de proyectos', '3', '000000', 'angysalcedo0810@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', '', ''),
(677, 1115914145, 'VIANI YRELI RUIZ GALINDO', 'Cédula de Ciudadanía', 'SOPORTE OPERATIVO 4A', 'Gestión de Proyectos', '2023-10-02', 'Coordinador de proyectos', '3', '000000', 'vianiruiz@gmail.com', 'Desconocida', '000000', 'N/A', '123456', '', ''),
(678, 26421498, 'ERIKA ANDREA LOPEZ CORDOBA', 'Cédula de Ciudadanía', 'SOPORTE OPERATIVO 4A', 'Gestión de Proyectos', '2023-07-11', 'Coordinador de proyectos', '3', '000000', 'erika.lopezcordoba@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY ANTIGUO', ''),
(679, 1098717872, 'MARBERT SHARIN MARTINEZ ARANDA', 'Cédula de Ciudadanía', 'SOPORTE OPERATIVO 4A', 'Gestión de Proyectos', '2023-07-11', 'Coordinador de proyectos', '3', '000000', 'sharin0207@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY ANTIGUO', ''),
(680, 33647141, 'MYRIAM KARINA PAREDES FORERO', 'Cédula de Ciudadanía', 'SOPORTE OPERATIVO 4A', 'Gestión de Proyectos', '2023-10-02', 'Coordinador de proyectos', '3', '000000', 'contador_mkpf@hotmail.es', 'Desconocida', '000000', 'N/A', '123456', '', ''),
(681, 1090509220, 'LUIS ALEJANDRO HELLAL PORRAS', 'Cédula de Ciudadanía', 'SOPORTE OPERATIVO 5A', 'Gestión de Proyectos', '2023-07-11', 'Coordinador de proyectos', '3', '000000', 'alejandrohellal@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY ANTIGUO', ''),
(682, 88281896, 'JULIO CESAR ROMERO AREVALO', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T2', 'Gestión de Proyectos', '2023-10-01', 'Coordinador de proyectos', '3', '000000', 'julioromeroar@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY ANTIGUO', ''),
(683, 1106394070, 'EDGAR ANDRES MURILLO ANDRADE', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T3', 'Gestión de Proyectos', '2023-07-11', 'Coordinador de proyectos', '3', '000000', 'ing_andresmurillo2@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY ANTIGUO', ''),
(684, 1020786562, 'CAMILO ANDRES TORRES RESTREPO', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T4', 'Gestión de Proyectos', '2023-07-18', 'Coordinador de proyectos', '3', '000000', 'calomi0212@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY ANTIGUO', ''),
(685, 1075233230, 'SERGIO LEONARDO VERGARA SUAREZ', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T4', 'Gestión de Proyectos', '2023-07-11', 'Coordinador de proyectos', '3', '000000', 'selves24@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY ANTIGUO', ''),
(686, 1098745210, 'ESTEFANY LIZETH VELANDIA JAIMES', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-01-22', 'Coordinador de proyectos', '3', '000000', 'gestefanyvelandia@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9186547'),
(687, 1013633604, 'GUSTAVO ANDRES BAUTISTA VELANDIA', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-01-22', 'Coordinador de proyectos', '3', '000000', 'andresbautistavelandia@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9186547'),
(688, 1016597, 'JEAN PABLO CEDEÑO ORFILA', 'Cédula de Ciudadanía', 'Profesional Senior', 'PROYECTO PETROSERVICIOS', '2024-01-22', 'Coordinador de proyectos', '3', '000000', 'jeanpablocorfila@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9186547'),
(689, 1003934174, 'JHON ABELARDO CUESTA ASPRILLA', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-01-22', 'Coordinador de proyectos', '3', '000000', 'jhcuestaa@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9135816'),
(690, 91524899, 'JOSE ANDRES ANAYA MANCIPE', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-01-22', 'Coordinador de proyectos', '3', '000000', 'anayamancipe_04@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9186547'),
(691, 1045706790, 'JOSE CARLOS GARCIA RUEDA', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-01-22', 'Coordinador de proyectos', '3', '000000', 'josecarlosgarcia92@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9186547'),
(692, 1040746072, 'KELLY LORENA DIEZ HERNANDEZ', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-01-22', 'Coordinador de proyectos', '3', '000000', 'kldiezhdz@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9186547'),
(693, 1014262113, 'MARIA ANGELICA PRADA FONSECA', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-01-22', 'Coordinador de proyectos', '3', '000000', 'prada.angelica@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9119211'),
(694, 37546080, 'MARIA HIMELDA MURILLO LOPEZ', 'Cédula de Ciudadanía', 'Profesional Senior', 'PROYECTO PETROSERVICIOS', '2024-01-22', 'Coordinador de proyectos', '3', '000000', 'pauegip_12@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9119211'),
(695, 1075212439, 'MARIANN LISSETTE MAHECHA LAVERDE', 'Cédula de Ciudadanía', 'Profesional Senior', 'PROYECTO PETROSERVICIOS', '2024-01-22', 'Coordinador de proyectos', '3', '000000', 'malimagen@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9186546'),
(696, 1098726424, 'EMMANUEL ROBLES ALBARRACIN', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-01-24', 'Coordinador de proyectos', '3', '000000', 'emmanuel_robles17@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9186547'),
(697, 1087047704, 'YUBER RODRIGUEZ ARTURO', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-03-14', 'Coordinador de proyectos', '3', '000000', 'yuberrodriguezarturo@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9186546'),
(698, 1098663949, 'LAURA YANETH OSMA MARIN', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-04-22', 'Coordinador de proyectos', '3', '000000', 'laura.osma@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9183859-3'),
(699, 1032398017, 'HERNÁN ALBEYRO FULA BOHÓRQUEZ', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-05-14', 'Coordinador de proyectos', '3', '000000', 'hernanfula@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9146960'),
(700, 506169, 'CLAUDIA CAROPRESE GARCIA', 'Cédula de Ciudadanía', 'Profesional Senior', 'PROYECTO PETROSERVICIOS', '2024-04-02', 'Coordinador de proyectos', '3', '000000', 'caropresec@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9183859'),
(701, 80074517, 'CRISTIAN PEÑAFORT GAVIRIA', 'Cédula de Ciudadanía', 'Profesional Especialista', 'PROYECTO PETROSERVICIOS', '2024-04-02', 'Coordinador de proyectos', '3', '000000', 'cpenafortg@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9183859-3'),
(702, 1013629348, 'CHRISTIAN CAMILO RIVERA SANCHEZ', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-04-22', 'Coordinador de proyectos', '3', '000000', 'chris911205@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9183859-4'),
(703, 91514446, 'GERMAN DARIO OREJARENA ESCOBAR', 'Cédula de Ciudadanía', 'Profesional Senior', 'PROYECTO PETROSERVICIOS', '2024-04-22', 'Coordinador de proyectos', '3', '000000', 'german18224@yahoo.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9183859-4'),
(704, 1053792535, 'LEIDI MARCELA QUINTERO GIRALDO', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-04-22', 'Coordinador de proyectos', '3', '000000', 'lquinterogiraldo@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9135816'),
(705, 79686130, 'RICARDO GAVIRIA GARCIA', 'Cédula de Ciudadanía', 'Profesional Senior', 'PROYECTO PETROSERVICIOS', '2024-04-22', 'Coordinador de proyectos', '3', '000000', 'ricardo.gaviria@outlook.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9183859-4'),
(706, 1098610954, 'JORGE LUIS CORONADO NAVARRO', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-04-25', 'Coordinador de proyectos', '3', '000000', 'jorge.coronadobv03@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9183859-4'),
(707, 1098605467, 'MAX BRADLEY GOMEZ GUALDRON', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-04-25', 'Coordinador de proyectos', '3', '000000', 'maxmbg@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9135816'),
(708, 1098795831, 'SONIA ALEJANDRAQUINTERO ANTOLÍNEZ', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-04-25', 'Coordinador de proyectos', '3', '000000', 'soniaaquinteroa@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9108440'),
(709, 1121941649, 'ALEJANDRO DUVAN LOPEZ ROJAS', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-07-02', 'Coordinador de proyectos', '3', '000000', 'alejandro_.lopez@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9770807'),
(710, 52455261, 'ANA MARÍA CASTELLANOS BARRETO', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-07-02', 'Coordinador de proyectos', '3', '000000', 'amariacast@yahoo.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9770807'),
(711, 13959717, 'DIEGO FERNANDO GALEANO BARRERA', 'Cédula de Ciudadanía', 'Profesional Senior', 'PROYECTO PETROSERVICIOS', '2024-07-02', 'Coordinador de proyectos', '3', '000000', 'diego581@yahoo.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9770807'),
(712, 1101692935, 'DIEGO FERNANDO PINTO HERNÁNDEZ', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-07-02', 'Coordinador de proyectos', '3', '000000', 'diegopintoh.uis@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9770807'),
(713, 74085101, 'EDWIN FERNANDO HERNANDEZ LADINO', 'Cédula de Ciudadanía', 'Profesional Senior para la ejecución de actividades de la ODS No. 9770807 del contrato Matriz No. 30', 'PROYECTO PETROSERVICIOS', '2024-07-02', 'Coordinador de proyectos', '3', '000000', 'edwin.hernandez.l@outlook.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9770807'),
(714, 1100961505, 'GEISSON RENÉ ZAFRA URREA', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-07-02', 'Coordinador de proyectos', '3', '000000', 'jason920619@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9770807'),
(715, 51781946, 'GLORIA FERNANDA VIDAL GONZALEZ', 'Cédula de Ciudadanía', 'Profesional Senior', 'PROYECTO PETROSERVICIOS', '2024-07-02', 'Coordinador de proyectos', '3', '000000', 'gloriavidal25@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9770807'),
(716, 1091668362, 'JESUS IVAN PACHECO ROMERO', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-07-02', 'Coordinador de proyectos', '3', '000000', 'jesus.pacheco.rom@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9770807'),
(717, 1098681773, 'JHON HARVEY CARREÑO HERNANDEZ', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-07-02', 'Coordinador de proyectos', '3', '000000', 'jhocar_1990@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9770807'),
(718, 91527985, 'JOHN FABIAN ROJAS ADARRAGA', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-07-02', 'Coordinador de proyectos', '3', '000000', 'Jonfabi@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9770807'),
(719, 1098706838, 'JULIAN ANDRES HERNANDEZ PINTO', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-07-02', 'Coordinador de proyectos', '3', '000000', 'julianh.9128@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9770807'),
(720, 1098758681, 'MILTON JULIAN GUALTEROS QUIROGA', 'Cédula de Ciudadanía', 'Profesional Senior', 'PROYECTO PETROSERVICIOS', '2024-07-02', 'Coordinador de proyectos', '3', '000000', 'juliangualteros31@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9770807'),
(721, 1065599609, 'CESAR ELIECER RODRIGUEZ CAMELO', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-07-08', 'Coordinador de proyectos', '3', '000000', 'cesarstam84@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9770807'),
(722, 1098692205, 'BRIGGITE SUSEC CAMACHO JEREZ', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-07-08', 'Coordinador de proyectos', '3', '000000', 'briggite.camachoj@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9770807'),
(723, 1101693549, 'CESAR EDUARDO GARNICA GOMEZ', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-07-11', 'Coordinador de proyectos', '3', '000000', 'cesar.garnica94@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9770807'),
(724, 1016037506, 'PAOLA ANDREA GOMEZ CABRERA', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-08-06', 'Coordinador de proyectos', '3', '000000', 'paolago40@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PROYECTO PETROSERVICIOS', '9770807'),
(725, 17419403, 'FRANCISCO JAVIER VILLABONA TAMAYO', 'Cédula de Ciudadanía', 'Director de Proyecto Ecopetrol', 'COMPANY MAN', '2022-06-22', 'Gerente General', '2', '000000', 'francisco.villabona@outlook.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(726, 1006823525, 'MARIA CAMILA CARDENAS URIZA', 'Cédula de Ciudadanía', 'Profesional de Proyectos', 'COMPANY MAN', '2023-09-19', 'Director de proyecto', '3', '000000', 'mariaccu@hotmail.es', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(727, 1121848186, 'MARIA SHIRLEY ORDOÑEZ CUESTA', 'Cédula de Ciudadanía', 'Profesional Administrativa y de Gestión Humana, Proyectos', 'COMPANY MAN', '2024-05-14', 'Director de proyecto', '3', '000000', 'maria.ocuesta89@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(728, 1007493802, 'MICHAEL STIVEN RUIZ CARO', 'Cédula de Ciudadanía', 'Soporte Hseq II', 'COMPANY MAN', '2022-05-02', 'Coordinador HSEQ', '3', '000000', 'maikolruizc10@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(729, 1136887341, 'NIDIA CAROLINA GRANDAS CASTAÑEDA', 'Cédula de Ciudadanía', 'Profesional de Proyectos', 'COMPANY MAN', '2022-06-01', 'Director de proyecto', '3', '000000', 'carograndas@outlook.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(730, 1004346165, 'SABRINA SALOME SANJUANELO SALAS', 'Cédula de Ciudadanía', 'Profesional de Proyectos', 'COMPANY MAN', '2023-07-12', 'Director de proyecto', '3', '000000', 'sabrinasanjuane@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(731, 1022407009, 'ANGGIE ESTEFANIA ALONSO RUIZ', 'Cédula de Ciudadanía', 'Tecnico Asistente Administrativa', 'COMPANY MAN', '2024-09-16', 'Director de proyecto', '3', '000000', 'angieestefaniaalonso@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(732, 1121869050, 'YENNI PAOLA DONCEL ACHO', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3A', 'COMPANY MAN', '2024-08-01', 'Director de proyecto', '3', '000000', 'yenni.doncel08@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(733, 9102183, 'URIEL HERNAN PINEDA GOMEZ', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3A', 'COMPANY MAN', '2024-08-01', 'Director de proyecto', '3', '000000', 'upineg@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(734, 26430509, 'YENNY LOLITA GARCIA BETANCOURT', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3A', 'COMPANY MAN', '2024-08-01', 'Director de proyecto', '3', '000000', 'yen289@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(735, 1121825022, 'CAMILO ANDRES PATARROYO VARON', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3A', 'COMPANY MAN', '2024-08-01', 'Director de proyecto', '3', '000000', 'patacam86@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(736, 1121871041, 'JORGE LEONARDO  MOYANO PEÑA', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3A', 'COMPANY MAN', '2024-08-01', 'Director de proyecto', '3', '000000', 'jorgeleo-07@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(737, 6165500, 'JOSE DANIEL GONZALEZ OJEDA', 'PPT', 'Soporte Operativo Tipo 3A', 'COMPANY MAN', '2024-08-01', 'Director de proyecto', '3', '000000', 'josegonzalezing1@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(738, 411134, 'RAFAEL ENRIQUE URDANETA MORAN', 'PPT', 'Soporte Operativo Tipo 3A', 'COMPANY MAN', '2024-08-01', 'Director de proyecto', '3', '000000', 'rafael.urdaneta1974@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(739, 13874046, 'JHON FREDDY PABON SANCHEZ', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3A', 'COMPANY MAN', '2024-08-01', 'Director de proyecto', '3', '000000', 'jhonfreddypabon@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(740, 1010185219, 'AIDA FAISULY AVILA MORALES', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3A', 'COMPANY MAN', '2024-08-01', 'Director de proyecto', '3', '000000', 'aidaavilam@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(741, 37949528, 'OLGA LUCIA RUEDA FIGUEREDO', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3A', 'COMPANY MAN', '2024-08-01', 'Director de proyecto', '3', '000000', 'olga.ruedafigueredo@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(742, 7723895, 'SERAFIN VANEGAS CARDOSO', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3B', 'COMPANY MAN', '2024-08-03', 'Director de proyecto', '3', '000000', 'ingenierovanegas@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(743, 86084413, 'CAMILO ANDRES RIAÑO GALVIS', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3B', 'COMPANY MAN', '2024-08-01', 'Director de proyecto', '3', '000000', 'andres.rianog84@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(744, 86068586, 'SERGIO VELEZ CARDONA', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3B', 'COMPANY MAN', '2024-08-03', 'Director de proyecto', '3', '000000', 'servelez80@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(745, 12197484, 'HARRIZON ALEXANDER RIVERA ARENAS', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3B', 'COMPANY MAN', '2024-08-01', 'Director de proyecto', '3', '000000', 'harrizoning590@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(746, 53014035, 'ANDREA PAOLA GUTIERREZ RAMIREZ', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 4A', 'COMPANY MAN', '2024-08-01', 'Director de proyecto', '3', '000000', 'andreitagutierrez0707@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(747, 1057580446, 'JUAN PABLO RAMIREZ DIAZ', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 4A', 'COMPANY MAN', '2024-08-01', 'Director de proyecto', '3', '000000', 'juanpianoo@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(748, 1055313459, 'EDWARD FABIAN GALINDO VEGA', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 4A', 'COMPANY MAN', '2024-08-01', 'Director de proyecto', '3', '000000', 'edwgv14@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(749, 74375671, 'JULIO EDGARDO VILLAMIL MONDRAGON', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 2', 'COMPANY MAN', '2024-08-01', 'Director de proyecto', '3', '000000', 'juedvimon@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(750, 98398935, 'GUSTAVO LEON DELGADO ZAMBRANO', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 2', 'COMPANY MAN', '2024-08-07', 'Director de proyecto', '3', '000000', 'gustdelz@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(751, 71376583, 'HUGO FERNANDO RODRIGUEZ', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 3', 'COMPANY MAN', '2024-08-01', 'Director de proyecto', '3', '000000', 'huferod2023@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(752, 86057747, 'ALEXANDER RONDON', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 3', 'COMPANY MAN', '2024-08-01', 'Director de proyecto', '3', '000000', 'alexro29@yahoo.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(753, 1098622402, 'JUAN GABRIEL ESTERLIN', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 4', 'COMPANY MAN', '2024-08-07', 'Director de proyecto', '3', '000000', 'juangabrielesterlin@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(754, 7711125, 'OSCAR FERNANDO OSPINA OSORIO', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 2', 'COMPANY MAN', '2024-08-17', 'Director de proyecto', '3', '000000', 'o.ospinaosorio@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(755, 1082067533, 'AGUSTIN JOSE RONCALLO CERVANTES', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3B', 'COMPANY MAN', '2024-09-02', 'Director de proyecto', '3', '000000', 'roncalloagustin@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(756, 42116896, 'ANGELA MARIA HERNANDEZ TAPIAS', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 2', 'COMPANY MAN', '2024-10-21', 'Director de proyecto', '3', '000000', 'anmaheta@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(757, 86042335, 'GUTEMBERG ALAINEGOMEZ RIVERA', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 3', 'COMPANY MAN', '2024-02-17', 'Director de proyecto', '3', '000000', 'gutemberg.gomez@yahoo.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(758, 1002691928, 'JUAN CARLOSSAAVEDRA BOHORQUEZ', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 5A', 'COMPANY MAN', '2024-02-17', 'Director de proyecto', '3', '000000', 'juancho811.js@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', '');
INSERT INTO `empleados` (`id_empleado`, `cedula`, `nombre`, `tipo_documento`, `cargo`, `area`, `fecha_inicio_contrato`, `reporta_directamente`, `nivel`, `numero_telefonico`, `email`, `compania`, `telefono_empresa`, `telefono_internacional`, `contrasena`, `proyecto`, `ods`) VALUES
(759, 1019099925, 'ANGIE PAOLA LONDOÑO CADENA', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 4B', 'COMPANY MAN', '2024-02-19', 'Director de proyecto', '3', '000000', 'angie.londono.cadena@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(760, 1013678265, 'JAVIER EDUARDOROJAS PRIETO', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 5A', 'COMPANY MAN', '2024-02-19', 'Director de proyecto', '3', '000000', 'javierrojas1214@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(761, 86075700, 'JOSE LUISVELEZ CARDONA', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3B', 'COMPANY MAN', '2024-02-19', 'Director de proyecto', '3', '000000', 'jose.velezcardona@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(762, 12136584, 'GUSTAVO CESAR FIERRO GUALY', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 2', 'COMPANY MAN', '2024-08-14', 'Director de proyecto', '3', '000000', 'gfierro968@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(763, 13707063, 'MISAEL GONZALEZ RUIZ', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 3', 'COMPANY MAN', '2024-08-23', 'Director de proyecto', '3', '000000', 'misaelgonzalezruiz76@outlook.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(764, 1122135336, 'MARIA DEL PILAR   RODRIGUEZ SANCHEZ', 'Cédula de Ciudadanía', 'Profesional Soporte en Campo', 'COMPANY MAN', '2024-09-02', 'Director de proyecto', '3', '000000', 'pilar.rodriguez23@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(765, 1065810992, 'JOSE CARLOS BAQUERO PEÑALOZA', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 4B', 'COMPANY MAN', '2024-09-10', 'Director de proyecto', '3', '000000', 'Josecarlosbaquero1994@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(766, 13700520, 'CESAR AUGUSTO REYES BALLESTEROS', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 2', 'COMPANY MAN', '2024-10-01', 'Director de proyecto', '3', '000000', 'cesarym1@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(767, 1077173073, 'ESTEBAN GARCIA ROJAS', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 3', 'COMPANY MAN', '2024-10-01', 'Director de proyecto', '3', '000000', 'estebangr1987@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(768, 86072643, 'BERARDO GIRALDO GAITAN', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 3', 'COMPANY MAN', '2024-10-01', 'Director de proyecto', '3', '000000', 'lordberar@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(769, 7161987, 'CARLOS SAUL CELIS ACERO', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 3', 'COMPANY MAN', '2024-10-01', 'Director de proyecto', '3', '000000', 'celiscarloss@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(770, 11189101, 'JOSE MAURICIO APONTE ABRIL', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 3', 'COMPANY MAN', '2024-10-01', 'Director de proyecto', '3', '000000', 'mauricioaponte@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(771, 13871188, 'PEDRO RAFAEL CADENA ORDOÑEZ', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 3', 'COMPANY MAN', '2024-10-03', 'Director de proyecto', '3', '000000', 'pedro.cadena@outlook.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(772, 13481943, 'JUAN CARLOS DURAN ZAPATA', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 1', 'COMPANY MAN', '2024-10-01', 'Director de proyecto', '3', '000000', 'juducaza@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(773, 74362501, 'DANIEL SEGURA ESPINOSA', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 1', 'COMPANY MAN', '2024-10-01', 'Director de proyecto', '3', '000000', 'Segura.7305@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(774, 80150738, 'WILBER CASTAÑEDA CASTAÑEDA', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 1', 'COMPANY MAN', '2024-10-01', 'Director de proyecto', '3', '000000', 'wilbercastaeda@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(775, 79208337, 'CARLOS ALBERTO RAMIREZ ESCOBAR', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 2', 'COMPANY MAN', '2024-10-01', 'Director de proyecto', '3', '000000', 'carami70mx@yahoo.com.mx', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(776, 1032461712, 'BRAYAN ALEJANDRO MONROY PINZON', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3A', 'COMPANY MAN', '2024-10-01', 'Director de proyecto', '3', '000000', 'b.alejandro1345@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(777, 1115914517, 'CAMILO ANDRES IBAÑEZ ROZO', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3A', 'COMPANY MAN', '2024-10-01', 'Director de proyecto', '3', '000000', 'Ingcamilo.ibanez@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(778, 80100600, 'LUIS GUILLERMO MERCADO RICO', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 3', 'COMPANY MAN', '2024-10-01', 'Director de proyecto', '3', '000000', 'luis.guillermo.mercado@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'COMPANY MAN', ''),
(779, 1075271569, 'ALVARO JAVIERQUIMBAYA MONTEALEGRE', 'Cédula de Ciudadanía', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D3', 'FRONTERA', '2024-03-22', 'Coordinador de proyectos', '3', '000000', 'alvarojqm@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'FRONTERA', ''),
(780, 1098774228, 'ANGELICA MARIA GONZALEZ SANCHEZ', 'Cédula de Ciudadanía', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D2', 'FRONTERA', '2024-07-08', 'Coordinador de proyectos', '3', '000000', 'ing.gonzalez.angelica@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'FRONTERA', ''),
(781, 1053788938, 'GUSTAVO ADOLFO GIRALDO CORREA', 'Cédula de Ciudadanía', 'Profesional de Proyectos A1', 'FRONTERA', '2019-11-01', 'Coordinador de proyectos', '3', '000000', 'ggiraldocorrea@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'FRONTERA', ''),
(782, 1075248439, 'MARIA DEL PILAR GOMEZ MORA', 'Cédula de Ciudadanía', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D1', 'FRONTERA', '2024-12-03', 'Coordinador de proyectos', '3', '000000', 'mdpgomezm@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'FRONTERA', ''),
(783, 1121913534, 'MARIA MONICA SIERRA CESPEDES', 'Cédula de Ciudadanía', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D1', 'FRONTERA', '2024-03-22', 'Coordinador de proyectos', '3', '000000', 'mariamonicasc@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'FRONTERA', ''),
(784, 1026267917, 'WENDY ZAMANDA FONSECA HURTADO', 'Cédula de Ciudadanía', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D1', 'FRONTERA', '2024-02-09', 'Coordinador de proyectos', '3', '000000', 'zamandafh1988@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'FRONTERA', ''),
(785, 1098712563, 'WILMAN ENRIQUE ALVAREZ QUIROZ', 'Cédula de Ciudadanía', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D1', 'FRONTERA', '2023-09-26', 'Coordinador de proyectos', '3', '000000', 'wilman.alvarez1@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'FRONTERA', ''),
(786, 1076660759, 'OSCAR FERNANDO BELLO RODRIGUEZ', 'Cédula de Ciudadanía', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D3', 'FRONTERA', '2024-03-15', 'Coordinador de proyectos', '3', '000000', 'osk_b@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'FRONTERA', ''),
(787, 1019133012, 'DARIO ALEXANDER POMARE ORTEGA', 'Cédula de Ciudadanía', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D2', 'FRONTERA', '2024-01-26', 'Coordinador de proyectos', '3', '000000', 'dariopomare20@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'FRONTERA', ''),
(788, 1096955344, 'DANNY KARINA ORTIZ ORTIZ', 'Cédula de Ciudadanía', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D2', 'FRONTERA', '2024-03-01', 'Coordinador de proyectos', '3', '000000', 'dannykarina07@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'FRONTERA', ''),
(789, 1075295727, 'MIGUEL OCTAVIO FIERRO CASTRO', 'Cédula de Ciudadanía', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D1', 'FRONTERA', '2024-07-13', 'Coordinador de proyectos', '3', '000000', 'mfierrocastro@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'FRONTERA', ''),
(790, 1015449004, 'RICARDO ANDRES VARGAS CORREDOR', 'Cédula de Ciudadanía', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D1', 'FRONTERA', '2024-07-02', 'Coordinador de proyectos', '3', '000000', 'ricardoanvaco@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'FRONTERA', ''),
(791, 1019152161, 'DIEGO ALEJANDRO ACUÑA QUINTERO', 'Cédula de Ciudadanía', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D3', 'FRONTERA', '2024-07-12', 'Coordinador de proyectos', '3', '000000', 'dacua8@gmail.com', 'Desconocida', '000000', 'N/A', '123456', 'FRONTERA', ''),
(792, 1032446831, 'ELIANA IVETH ALARCON RONDON', 'Cédula de Ciudadanía', 'Profesional de Proyectos B1', 'PETROSERVICIOS', '2024-08-22', 'Coordinador de proyectos', '3', '000000', 'nana.alarcon08@hotmail.com', 'Desconocida', '000000', 'N/A', '123456', 'PETROSERVICIOS', '');

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
-- Volcado de datos para la tabla `funciones`
--

INSERT INTO `funciones` (`id_cargo`, `titulo_funcion`, `descripcion_funcion`, `tipo_funcion`, `hoja_funciones`, `fecha_creacion`, `fecha_actualizacion`, `estado`) VALUES
(71, '', '', 'Específica', '', '2025-03-20 10:59:23', '2025-03-20 10:59:24', 'ACTIVO'),
(109, '1032446831E', '', 'Específica', '1032446831E', '2025-03-20 10:59:25', '2025-03-20 10:59:25', 'ACTIVO'),
(82, '1121936876', '', 'Específica', '1121936876', '2025-03-20 10:59:24', '2025-03-20 10:59:24', 'ACTIVO'),
(108, 'A_COMPANY_MAN_D1', '', 'Específica', 'A_COMPANY_MAN_D1', '2025-03-20 10:59:25', '2025-03-20 10:59:25', 'ACTIVO'),
(106, 'A_COMPANY_MAN_D2', '', 'Específica', 'A_COMPANY_MAN_D2', '2025-03-20 10:59:25', '2025-03-20 10:59:25', 'ACTIVO'),
(105, 'A_COMPANY_MAN_D3', '', 'Específica', 'A_COMPANY_MAN_D3', '2025-03-20 10:59:25', '2025-03-20 10:59:25', 'ACTIVO'),
(70, 'Funciones_Analista_Contable', '', 'Específica', 'Funciones_Analista_Contable', '2025-03-20 10:59:23', '2025-03-20 10:59:23', 'ACTIVO'),
(58, 'Funciones_Asistente_Adm', '', 'Específica', 'Funciones_Asistente_Adm', '2025-03-20 10:59:23', '2025-03-20 10:59:23', 'ACTIVO'),
(58, 'Funciones_Asistente_Adm_Dis', '', 'Específica', 'Funciones_Asistente_Adm_Dis', '2025-03-20 10:59:23', '2025-03-20 10:59:23', 'ACTIVO'),
(69, 'Funciones_Asistente_Contable', '', 'Específica', 'Funciones_Asistente_Contable', '2025-03-20 10:59:23', '2025-03-20 10:59:23', 'ACTIVO'),
(56, 'Funciones_Asistente_GH', '', 'Específica', 'Funciones_Asistente_GH', '2025-03-20 10:59:23', '2025-03-20 10:59:23', 'ACTIVO'),
(91, 'Funciones_asis_admon_cm', '', 'Específica', 'Funciones_asis_admon_cm', '2025-03-20 10:59:24', '2025-03-20 10:59:24', 'ACTIVO'),
(60, 'Funciones_Contador_Junior', '', 'Específica', 'Funciones_Contador_Junior', '2025-03-20 10:59:23', '2025-03-20 10:59:23', 'ACTIVO'),
(68, 'Funciones_Coordinador_Contable', '', 'Específica', 'Funciones_Coordinador_Contable', '2025-03-20 10:59:23', '2025-03-20 10:59:23', 'ACTIVO'),
(62, 'Funciones_Coordinador_GH', '', 'Específica', 'Funciones_Coordinador_GH', '2025-03-20 10:59:23', '2025-03-20 10:59:23', 'ACTIVO'),
(63, 'Funciones_Coordinador_HSEQ', '', 'Específica', 'Funciones_Coordinador_HSEQ', '2025-03-20 10:59:23', '2025-03-20 10:59:23', 'ACTIVO'),
(87, 'Funciones_Director_Proyectos', '', 'Específica', 'Funciones_Director_Proyectos', '2025-03-20 10:59:24', '2025-03-20 10:59:24', 'ACTIVO'),
(64, 'Funciones_Gerente_Administratvo', '', 'Específica', 'Funciones_Gerente_Administratvo', '2025-03-20 10:59:23', '2025-03-20 10:59:23', 'ACTIVO'),
(67, 'Funciones_Gerente_General', '', 'Específica', 'Funciones_Gerente_General', '2025-03-20 10:59:23', '2025-03-20 10:59:23', 'ACTIVO'),
(88, 'Funciones_Prof_Proye_alta', '', 'Específica', 'Funciones_Prof_Proye_alta', '2025-03-20 10:59:24', '2025-03-20 10:59:25', 'ACTIVO'),
(104, 'Funciones_Prof_Proye_m1', '', 'Específica', 'Funciones_Prof_Proye_m1', '2025-03-20 10:59:25', '2025-03-20 10:59:25', 'ACTIVO'),
(88, 'Funciones_Prof_Proye_mb', '', 'Específica', 'Funciones_Prof_Proye_mb', '2025-03-20 10:59:24', '2025-03-20 10:59:24', 'ACTIVO'),
(65, 'Funciones_Servicios_Generales', '', 'Específica', 'Funciones_Servicios_Generales', '2025-03-20 10:59:23', '2025-03-20 10:59:23', 'ACTIVO'),
(61, 'Funciones_Soporte_HSEQ_adm', '', 'Específica', 'Funciones_Soporte_HSEQ_adm', '2025-03-20 10:59:23', '2025-03-20 10:59:23', 'ACTIVO'),
(57, 'Funciones_Soporte_IT', '', 'Específica', 'Funciones_Soporte_IT', '2025-03-20 10:59:23', '2025-03-20 10:59:23', 'ACTIVO'),
(90, 'Funciones_Sop_hseqcm', '', 'Específica', 'Funciones_Sop_hseqcm', '2025-03-20 10:59:24', '2025-03-20 10:59:24', 'ACTIVO'),
(59, 'Funciones_Subgerente', '', 'Específica', 'Funciones_Subgerente', '2025-03-20 10:59:23', '2025-03-20 10:59:23', 'ACTIVO'),
(83, 'PROF. DE PROYECTO EN ENTRENAMIENTO', '', 'Específica', 'PROF. DE PROYECTO EN ENTRENAMIENTO', '2025-03-20 10:59:24', '2025-03-20 10:59:24', 'ACTIVO'),
(89, 'Profesional admon_GH_CM', '', 'Específica', 'Profesional admon_GH_CM', '2025-03-20 10:59:24', '2025-03-20 10:59:24', 'ACTIVO'),
(100, 'Prof_ Soporte Op_Campo', '', 'Específica', 'Prof_ Soporte Op_Campo', '2025-03-20 10:59:25', '2025-03-20 10:59:25', 'ACTIVO'),
(103, 'SOPORTE_OPERATIVO_TIPO_2', '', 'Específica', 'SOPORTE_OPERATIVO_TIPO_2', '2025-03-20 10:59:25', '2025-03-20 10:59:25', 'ACTIVO'),
(93, 'SOPORTE_OPERATIVO_TIPO_3A', '', 'Específica', 'SOPORTE_OPERATIVO_TIPO_3A', '2025-03-20 10:59:24', '2025-03-20 10:59:25', 'ACTIVO'),
(81, 'SOPORTE_OPERATIVO_TIPO_3B', '', 'Específica', 'SOPORTE_OPERATIVO_TIPO_3B', '2025-03-20 10:59:24', '2025-03-20 10:59:25', 'ACTIVO'),
(77, 'SOPORTE_OPERATIVO_TIPO_4A', '', 'Específica', 'SOPORTE_OPERATIVO_TIPO_4A', '2025-03-20 10:59:24', '2025-03-20 10:59:25', 'ACTIVO'),
(99, 'SOPORTE_OPERATIVO_TIPO_4B', '', 'Específica', 'SOPORTE_OPERATIVO_TIPO_4B', '2025-03-20 10:59:25', '2025-03-20 10:59:25', 'ACTIVO'),
(75, 'SOPORTE_OPERATIVO_TIPO_5A', '', 'Específica', 'SOPORTE_OPERATIVO_TIPO_5A', '2025-03-20 10:59:24', '2025-03-20 10:59:25', 'ACTIVO'),
(80, 'SUPERVISOR_OPERACIONES_TIPO_1', '', 'Específica', 'SUPERVISOR_OPERACIONES_TIPO_1', '2025-03-20 10:59:24', '2025-03-20 10:59:25', 'ACTIVO'),
(78, 'SUPERVISOR_OPERACIONES_TIPO_2', '', 'Específica', 'SUPERVISOR_OPERACIONES_TIPO_2', '2025-03-20 10:59:24', '2025-03-20 10:59:25', 'ACTIVO'),
(79, 'SUPERVISOR_OPERACIONES_TIPO_3', '', 'Específica', 'SUPERVISOR_OPERACIONES_TIPO_3', '2025-03-20 10:59:24', '2025-03-20 10:59:25', 'ACTIVO'),
(76, 'SUPERVISOR_OPERACIONES_TIPO_4', '', 'Específica', 'SUPERVISOR_OPERACIONES_TIPO_4', '2025-03-20 10:59:24', '2025-03-20 10:59:25', 'ACTIVO');

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
