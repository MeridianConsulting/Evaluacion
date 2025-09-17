-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-09-2025 a las 18:00:39
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

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
  `objetivo_cargo` text NOT NULL DEFAULT '',
  `proceso_gestion` text NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cargo`
--

INSERT INTO `cargo` (`id_cargo`, `nombre_cargo`, `objetivo_cargo`, `proceso_gestion`) VALUES
(1, 'Gerente general', '', ''),
(2, 'Subgerente', '', ''),
(3, 'Gerente administrativa y financiera', '', ''),
(4, 'Analista contable', '', ''),
(5, 'Analista de nomina y gestion humana', '', ''),
(6, 'Aprendiz etapa lectiva', '', ''),
(7, 'Aprendiz etapa practica', '', ''),
(8, 'Asesor administrativo', '', ''),
(9, 'Asistente administrativa y de gestión humana', '', ''),
(10, 'Asistente administrativo', '', ''),
(11, 'Asistente contable', '', ''),
(12, 'Asistente de nomina y gestion humana', '', ''),
(13, 'Asistente gestión humana y nómina', '', ''),
(14, 'Asistente logistico administrativo', '', ''),
(15, 'Auxiliar contable', '', ''),
(16, 'Contador junior', '', ''),
(17, 'Contador senior', '', ''),
(18, 'Coordinador contable y financiero', '', ''),
(19, 'Coordinador de gestión humana', '', ''),
(20, 'Coordinador de proyectos', '', ''),
(21, 'Coordinador hseq', '', ''),
(22, 'Ingeniero asistente de supervision integral de pozos tipo ii', '', ''),
(23, 'Ingeniero de intervencion a pozos tipo ii', '', ''),
(24, 'Ingeniero de intervencion a pozos tipo iii', '', ''),
(25, 'Ingeniero de intervencion a pozos tipo iv', '', ''),
(26, 'Ingeniero(a) asistente de company man para operaciones de perforación completamiento y workover', '', ''),
(27, 'Ingeniero(a) asistente de company man para operaciones de perforación completamiento y workover d1', '', ''),
(28, 'Lider de gestion humana', '', ''),
(29, 'Profesional administrativa y de gestión humana, proyectos', '', ''),
(30, 'Profesional básico', '', ''),
(31, 'Profesional de proyectos', '', ''),
(32, 'Profesional de proyectos m1', '', ''),
(33, 'Profesional de proyectos m3', '', ''),
(34, 'Profesional especialista', '', ''),
(35, 'Profesional junior', '', ''),
(36, 'Profesional senior', '', ''),
(37, 'Profesional soporte it', '', ''),
(38, 'Servicio especializado en costos de intervencion de pozos tipo i', '', ''),
(39, 'Servicio especializado en costos de intervencion de pozos tipo ii', '', ''),
(40, 'Servicio especializado en integridad de pozos tipo i', '', ''),
(41, 'Servicio especializado en integridad de pozos tipo ii', '', ''),
(42, 'Servicio especializado en intervenciones a pozo tipo ii', '', ''),
(43, 'Servicio soporte en abandono de pozos tipo ii', '', ''),
(44, 'Servicios generales', '', ''),
(45, 'Soporte hseq', '', ''),
(46, 'Soporte hseq ii', '', ''),
(47, 'Soporte hseq proyectos', '', ''),
(48, 'Desarrollador de software', '', ''),
(49, 'Supervisor integral en intervenciones a pozo tipo i', '', ''),
(50, 'Supervisor integral en intervenciones a pozo tipo ii', '', ''),
(51, 'Tecnico asistente administrativa', '', '');

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
  `email` varchar(100) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `proyecto` varchar(100) DEFAULT NULL,
  `ods` varchar(100) DEFAULT NULL,
  `rol` varchar(20) NOT NULL DEFAULT 'empleado'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id_empleado`, `cedula`, `nombre`, `tipo_documento`, `cargo`, `area`, `fecha_inicio_contrato`, `email`, `contrasena`, `proyecto`, `ods`, `rol`) VALUES
(1, 52030991, 'NORA GISELL MORENO MORENO', 'CC ', 'Gerente administrativa y financiera', 'ADMINISTRACION', '2009-01-01', 'nmoreno@meridian.com.co', '52030991', 'ADMINISTRACION', NULL, 'admin'),
(2, 79613401, 'WILLIAM AUGUSTO FRANCO CASTELLANOS', 'CC ', 'Gerente general', 'ADMINISTRACION', '2009-08-01', 'wfranco@meridian.com.co', '79613401', 'ADMINISTRACION', NULL, 'admin'),
(3, 79490148, 'CESAR AUGUSTO URREGO AVENDAÑO', 'CC ', 'Subgerente', 'ADMINISTRACION', '2009-08-01', 'currego@meridian.com.co', '79490148', 'ADMINISTRACION', NULL, 'admin'),
(4, 52147279, 'RUTH MUÑOZ CASTILLO', 'CC ', 'Servicios generales', 'ADMINISTRACION', '2011-06-13', 'rmunoz@meridian.com.co', '52147279', 'ADMINISTRACION', NULL, 'empleado'),
(5, 52005033, 'ZANDRA PATRICIA MAYORGA GOMEZ', 'CC ', 'Coordinador contable y financiero', 'ADMINISTRACION', '2018-01-23', 'coordinadoracontable@meridian.com.co', '52005033', 'ADMINISTRACION', NULL, 'empleado'),
(6, 1053788938, 'GUSTAVO ADOLFO GIRALDO CORREA', 'CC ', 'Profesional de proyectos', 'FRONTERA - ADMINISTRACION', '2019-11-01', 'ggiraldo@meridian.com.co', '1053788938', 'FRONTERA', NULL, 'empleado'),
(7, 1014251428, 'AURA ALEJANDRA CONTRERAS TORRES', 'CC ', 'Asistente administrativo', 'ADMINISTRACION', '2020-12-01', 'asistenteadministrativo1@meridian.com.co ', '1014251428', 'ADMINISTRACION', NULL, 'empleado'),
(8, 1007493802, 'MICHAEL STIVEN RUIZ CARO', 'CC ', 'Soporte hseq ii', 'COMPANY MAN - ADMINISTRACION', '2022-05-02', 'soportehseqproyectos@meridian.com.co', '1007493802', 'COMPANY MAN', NULL, ' HSEQ'),
(9, 1119211830, 'LUIS MIGUEL GUEVARA MARLES', 'CC ', 'Coordinador hseq', 'ADMINISTRACION', '2022-11-22', 'hseq@meridian.com.co', '1119211830', 'ADMINISTRACION', NULL, 'HSEQ'),
(10, 1014180459, 'SANDRA MILENA FLOREZ PRADO', 'CC ', 'Asistente administrativa y de gestión humana', 'ADMINISTRACION', '2023-05-02', 'asistenteadministrativo2@meridian.com.co ', '1014180459', 'ADMINISTRACION', NULL, 'empleado'),
(11, 1020733194, 'ELOY GABRIEL GOMEZ REYES', 'CC ', 'Coordinador de gestión humana', 'ADMINISTRACION', '2023-06-13', 'profesionalgh@meridian.com.co', '1020733194', 'ADMINISTRACION', NULL, 'empleado'),
(12, 1031145571, 'DIANA MARCELA JACOBO MANCERA', 'CC ', 'Soporte hseq', 'ADMINISTRACION', '2023-08-14', 'soportehseq@meridian.com.co', '1031145571', 'ADMINISTRACION', NULL, 'HSEQ'),
(13, 1121936876, 'LAURA DANIELA SEGURA MORERA', 'CC ', 'Soporte hseq proyectos', 'COMPANY MAN - ADMINISTRACION', '2023-09-05', 'profesionalhseq@meridian.com.co', '1121936876', 'COMPANY MAN', NULL, 'HSEQ'),
(14, 52978024, 'ERIKA LILIANA MANCIPE RODRIGUEZ', 'CC', 'Aprendiz etapa practica', 'ADMINISTRACION', '2023-11-01', 'aprendizhseq@meridian.com.co', '52978024', 'ADMINISTRACION', NULL, 'HSEQ'),
(15, 1007627524, 'ANDRES CAMILO CARDENAS REYES', 'CC ', 'Profesional soporte it', 'ADMINISTRACION', '2023-12-04', 'soporteit.nivel1@meridian.com.co', '1007627524', 'ADMINISTRACION', NULL, 'empleado'),
(17, 1007647736, 'SONIA STEPHANIA FONSECA LOPEZ', 'CC ', 'Asistente de nomina y gestion humana', 'ADMINISTRACION', '2024-05-02', 'contratacion@meridian.com.co', '1007647736', 'ADMINISTRACION', NULL, 'empleado'),
(18, 1121848186, 'MARIA SHIRLEY ORDOÑEZ CUESTA', 'CC ', 'Profesional administrativa y de gestión humana, proyectos', 'COMPANY MAN - ADMINISTRACION', '2024-05-14', 'profesionaladministrativoproyectos@meridian.com.co', '1121848186', 'COMPANY MAN', NULL, 'empleado'),
(19, 1102580512, 'FABRYZCIO ANDRES ORTIZ GARCIA', 'CC ', 'Aprendiz etapa lectiva', 'ADMINISTRACION', '2024-06-04', 'Fabryzcioortiz@gmail.com', '1102580512', 'ADMINISTRACION', NULL, 'empleado'),
(20, 1031649053, 'EYMER SANTIAGO MÉNDEZ HERRERA', 'CC ', 'Aprendiz etapa lectiva', 'ADMINISTRACION', '2024-06-04', 'Santiagom202418@gmail.com ', '1031649053', 'ADMINISTRACION', NULL, 'empleado'),
(21, 1032446831, 'ELIANA IVETH ALARCON RONDON ', 'CC ', 'Profesional de proyectos m1', 'PETROSERVICIOS - ADMINISTRACION', '2024-08-22', 'proyectos6@meridian.com.co', '1032446831', 'PETROSERVICIOS', NULL, 'empleado'),
(22, 1100954344, 'CAMILA FERNANDA MEDINA SANDOVAL  ', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2024-09-02', 'camila.medina@meridianecp.com', '1100954344', 'PETROSERVICIOS', NULL, 'empleado'),
(23, 1022407009, 'ANGGIE ESTEFANIA ALONSO RUIZ', 'CC ', 'Tecnico asistente administrativa', 'COMPANY MAN - ADMINISTRACION', '2024-09-16', 'angieestefaniaalonso@gmail.com', '1022407009', 'COMPANY MAN', '5500006789-5500006806', 'empleado'),
(24, 1000931984, 'KAREN JULIETH CARRANZA RODRIGUEZ', 'CC ', 'Analista contable', 'ADMINISTRACION', '2024-10-21', 'analistacontable@meridian.com.co', '1000931984', 'ADMINISTRACION', '5500006789-5500006806', 'empleado'),
(25, 1095786398, 'AURA MARIA TRASLAVIÑA PRADA', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2024-10-25', 'aura.traslavina@meridianecp.com', '1095786398', 'PETROSERVICIOS', NULL, 'empleado'),
(26, 1022344726, 'VIVIANA DEL PILAR ALFONSO AVENDAÑO', 'CC ', 'Asesor administrativo', 'ADMINISTRACION - STAFF', '2024-12-02', 'Viviana.alfonsoa@gmail.com', '1022344726', 'ADMINISTRACION - STAFF', NULL, 'empleado'),
(27, 1007407868, 'NICOLAS URREGO SANDOVAL', 'CC ', 'Asesor administrativo', 'ADMINISTRACION - STAFF', '2024-12-02', 'nicolasurregos@gmail.com', '1007407868', 'ADMINISTRACION - STAFF', NULL, 'empleado'),
(28, 1000185449, 'NATALIA XIMENA FRANCO REINA', 'CC ', 'Asesor administrativo', 'ADMINISTRACION - STAFF', '2024-12-02', 'nataliaxfranco@gmail.com', '1000185449', 'ADMINISTRACION - STAFF', NULL, 'empleado'),
(29, 1019087239, 'JUAN DAVID CASTRO FRANCO', 'CC ', 'Asesor administrativo', 'ADMINISTRACION - STAFF', '2024-12-02', 'juandafranco3@gmail.com', '1019087239', 'ADMINISTRACION - STAFF', NULL, 'empleado'),
(30, 2901830, 'GERMAN FRANCO GARCIA', 'CC ', 'Asesor administrativo', 'ADMINISTRACION - STAFF', '2024-12-02', 'ines2048german@hotmail.com', '2901830', 'ADMINISTRACION - STAFF', '2024-3046906-VRO-GDA-004', 'empleado'),
(31, 1013261036, 'CHRISTIAN CAMILO FRANCO REINA', 'CC ', 'Asistente administrativo', 'ADMINISTRACION - STAFF', '2024-12-02', 'christianfranco688@gmail.com', '1013261036', 'ADMINISTRACION - STAFF', '2024-3046906-VRO-GDA-004', 'empleado'),
(32, 20312319, 'BLANCA ATILIA LEITON DE REINA', 'CC ', 'Asesor administrativo', 'ADMINISTRACION - STAFF', '2024-12-02', 'monica_reina@outlook.com', '20312319', 'ADMINISTRACION - STAFF', '2024-3046906-VRO-GDA-004', 'empleado'),
(33, 1024478397, 'KAROL DANIELA SALCEDO ROMERO', 'CC ', 'Aprendiz etapa lectiva', 'ADMINISTRACION', '2024-12-09', 'karoldanielasr12@gmail.com', '1024478397', 'ADMINISTRACION', '2024-3046906-VRO-GDA-004', 'empleado'),
(34, 79686130, 'RICARDO GAVIRIA GARCIA', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-01-09', 'ricardo.gaviria@meridianecp.com', '79686130', 'PETROSERVICIOS', '2024-3046906-VRO-GDA-004', 'empleado'),
(35, 91514446, 'GERMAN DARIO OREJARENA ESCOBAR', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-01-09', 'german.orejarena@meridianecp.com', '91514446', 'PETROSERVICIOS', '2024-3046906-VRO-GDA-004', 'empleado'),
(36, 331789, 'GLADYS EVANGELINA TABARES PEREZ', 'CE ', 'Profesional senior', 'PETROSERVICIOS', '2025-01-13', 'gladys.tabares@meridianecp.com', '331789', 'PETROSERVICIOS', '2024-3046906-VRO-GDA-004', 'empleado'),
(37, 1115069820, 'GABRIEL EDUARDO VELEZ BARRERA', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-01-13', 'gabriel.velez@meridianecp.com', '1115069820', 'PETROSERVICIOS', '2024-3046906-VRO-GDA-004', 'empleado'),
(38, 1022380991, 'DIEGO FERNANDO CASTILLO BAYONA', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-01-13', 'diego.castillo@meridianecp.com', '1022380991', 'PETROSERVICIOS', '2024-3046906-VRO-GDA-004', 'empleado'),
(39, 1098663190, 'YESSICA DEL CARMEN MATEUS TARAZONA', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-01-16', 'yessica.tarazona@meridianecp.com', '1098663190', 'PETROSERVICIOS', '2024-3046906-VRO-GDA-004', 'empleado'),
(40, 83042295, 'WILLIAM CABRERA CASTRO', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-01-16', 'wcabrera@meridianecp.com', '83042295', 'PETROSERVICIOS', '2024-3046906-VRO-GDA-004', 'empleado'),
(41, 1007555164, 'SERGIO FERNANDO POVEDA SALAZAR', 'CC ', 'Profesional básico', 'PETROSERVICIOS', '2025-01-16', 'sergio.poveda@meridianecp.com', '1007555164', 'PETROSERVICIOS', '2024-3046906-VRO-GDA-004', 'empleado'),
(42, 1075284985, 'SEBASTIAN LLANOS GALLO', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-01-16', 'sebastian.llanos@meridianecp.com', '1075284985', 'PETROSERVICIOS', '2024-3046906-VRO-GDA-004', 'empleado'),
(43, 1072699593, 'RUBEN DARIO ORTIZ MURCIA', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-01-16', 'ruben.ortiz@meridianecp.com', '1072699593', 'PETROSERVICIOS', '2024-3046906-VRO-GDA-004', 'empleado'),
(44, 1015449004, 'RICARDO ANDRES VARGAS CORREDOR', 'CC ', 'Ingeniero(a) asistente de company man para operaciones de perforación completamiento y workover d1', 'FRONTERA', '2025-01-16', 'ricardoanvaco@gmail.com', '1015449004', 'FRONTERA', '2024-3046906-VRO-GDA-004', 'empleado'),
(45, 80883010, 'OVEIMAR SANTAMARIA TORRES', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-01-16', 'oveimar.santamaria@meridianecp.com', '80883010', 'PETROSERVICIOS', '2024-3046906-VRO-GDA-004', 'empleado'),
(46, 1023961699, 'NICOLAS AVENDAÑO VASQUEZ', 'CC ', 'Profesional básico', 'PETROSERVICIOS', '2025-01-16', 'nicolas.avendano@meridianecp.com', '1023961699', 'PETROSERVICIOS', '2024-3046906-VRO-GDA-004', 'empleado'),
(47, 1098697791, 'MARIA ALEJANDRA JOYA RINCON', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-01-16', 'alejandra.joya@meridianecp.com', '1098697791', 'PETROSERVICIOS', '2024-3046906-VRO-GDA-004', 'empleado'),
(48, 1075286382, 'MARIA ALEJANDRA CABRERA GARCIA', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-01-16', 'mariaalejandra.cabrera@meridianecp.com', '1075286382', 'PETROSERVICIOS', NULL, 'empleado'),
(49, 37514608, 'LUCIA MARIA ACERO LIZCANO', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-01-16', 'lucia.acero@meridianecp.com', '37514608', 'PETROSERVICIOS', '2024-3046906-VRO-GDT-003', 'empleado'),
(50, 31429767, 'LINA MARIA RENDON CARDONA', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-01-16', 'lina.rendon@meridianecp.com', '31429767', 'PETROSERVICIOS', '90045724', 'empleado'),
(51, 1032414423, 'LAURA MARIA HERNANDEZ RIVEROS', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-01-16', 'laura.hernandez@meridianecp.com', '1032414423', 'PETROSERVICIOS', NULL, 'empleado'),
(52, 1100950373, 'LADY MILENA LOPEZ ROJAS', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-01-16', 'lady.lopez@meridian.com.co', '1100950373', 'PETROSERVICIOS', '3047761-4', 'empleado'),
(53, 1075286613, 'JULLY ALEXANDRA VARGAS QUINTERO', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-01-16', 'jully.vargas@meridianecp.com', '1075286613', 'PETROSERVICIOS', '3047761-4', 'empleado'),
(54, 1098782789, 'JUAN SEBASTIAN AVILA PARRA', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-01-16', 'juan.avila@meridianecp.com', '1098782789', 'PETROSERVICIOS', '3047761-4', 'empleado'),
(55, 1026267749, 'JUAN DAVID ARISTIZABAL MARULANDA', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-01-16', 'juandavid.aristizabal@meridianecp.com', '1026267749', 'PETROSERVICIOS', '2024-3046906-VRO-GDA-004', 'empleado'),
(56, 1098610954, 'JORGE LUIS CORONADO NAVARRO', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-01-16', 'jorge.coronado@meridianecp.com', '1098610954', 'PETROSERVICIOS', '3047761-4', 'empleado'),
(57, 1075263195, 'JESUS ERNESTO COQUECO VARGAS', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-01-16', 'jesusccvargas@meridianecp.com', '1075263195', 'PETROSERVICIOS', '3047761-4', 'empleado'),
(58, 63527981, 'INA YADITH SERRANO LASTRE', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-01-16', 'ina.serrano@meridianecp.com', '63527981', 'PETROSERVICIOS', '3047761-4', 'empleado'),
(59, 1098739269, 'GUSTAVO ADOLFO MORENO BELTRAN', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-01-16', 'gustavo.moreno@meridianecp.com', '1098739269', 'PETROSERVICIOS', '3047761-4', 'empleado'),
(60, 1143327261, 'GIOVANNI MARTINEZ LEONES', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-01-16', 'giovanni.martinez@meridianecp.com', '1143327261', 'PETROSERVICIOS', '3047761-4', 'empleado'),
(61, 1010167959, 'FRANKLIN ALEJANDRO BOTERO RIVERA', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-01-16', 'alejandro.botero@meridianecp.com', '1010167959', 'PETROSERVICIOS', '3047761-4', 'empleado'),
(62, 40936668, 'ESPERANZA DE JESUS COTES LEON', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-01-16', 'esperanza.cotes@meridianecp.com', '40936668', 'PETROSERVICIOS', '3047761-4', 'empleado'),
(63, 1010056001, 'EMELI YOHANA YACELGA CHITAN', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-01-16', 'Emeli.yacelga@meridianecp.com', '1010056001', 'PETROSERVICIOS', '3047761-4', 'empleado'),
(64, 52844528, 'EDNA MILED NIÑO OROZCO', 'CC ', 'Profesional especialista', 'PETROSERVICIOS', '2025-01-16', 'edna.nino@meridianecp.com', '52844528', 'PETROSERVICIOS', '3047761-4', 'empleado'),
(65, 52967140, 'DIANA PAOLA SOLANO SUA', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-01-16', 'diana.solano@meridianecp.com', '52967140', 'PETROSERVICIOS', NULL, 'empleado'),
(66, 1075293846, 'DANIELA MOLINA LANDINEZ', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-01-16', 'daniela.molina@meridianecp.com', '1075293846', 'PETROSERVICIOS', '90141005', 'empleado'),
(67, 1128452509, 'CINDY NATALIA ISAZA TORO', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-01-16', 'cindy.isaza@meridianecp.com', '1128452509', 'PETROSERVICIOS', '2024-3046906-VRO-GDA-004', 'empleado'),
(68, 1152210959, 'CARLOS JOSE URZOLA EBRATT', 'CC ', 'Profesional básico', 'PETROSERVICIOS', '2025-01-16', 'carlos.urzola@meridianecp.com', '1152210959', 'PETROSERVICIOS', '2024-3046906-VRO-GDA-004', 'empleado'),
(69, 1014216060, 'CARLOS ALEJANDRO FORERO PEÑA', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-01-16', 'carlos.forero@meridianecp.com', '1014216060', 'PETROSERVICIOS', NULL, 'empleado'),
(70, 1026292916, 'CAMILO ANDRES SANTANA OTALORA', 'CC ', 'Profesional básico', 'PETROSERVICIOS', '2025-01-16', 'camilo.santana@meridianecp.com', '1026292916', 'PETROSERVICIOS', NULL, 'empleado'),
(71, 30400528, 'BLANCA OFFIR HURTADO LOPERA', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-01-16', 'blanca.hurtado@meridianecp.com', '30400528', 'PETROSERVICIOS', NULL, 'empleado'),
(72, 43728382, 'ALEXANDRA ISABEL MESA CARDENAS ', 'CC ', 'Profesional especialista', 'PETROSERVICIOS', '2025-01-16', 'alexandra.mesa@meridianecp.com', '43728382', 'PETROSERVICIOS', NULL, 'empleado'),
(73, 43578774, 'ALEJANDRA ARBELAEZ LONDOÑO', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-01-16', 'alejandra.arbelaez@meridianecp.com', '43578774', 'PETROSERVICIOS', NULL, 'empleado'),
(74, 63540751, 'ADRIANA PATRICIA DUEÑES GARCÉS', 'CC ', 'Profesional especialista', 'PETROSERVICIOS', '2025-01-16', 'adriana.duenes@meridianecp.com', '63540751', 'PETROSERVICIOS', NULL, 'empleado'),
(75, 1098712563, 'WILMAN ENRIQUE ALVAREZ QUIROZ', 'CC ', 'Ingeniero(a) asistente de company man para operaciones de perforación completamiento y workover d1', 'FRONTERA', '2025-01-17', 'wilman.alvarez1@hotmail.com', '1098712563', 'FRONTERA', '2024-3046906-VRO-GDA-004', 'empleado'),
(76, 1014262113, 'MARÍA ANGÉLICA PRADA FONSECA', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-01-20', 'angelica.prada@meridianecp.com', '1014262113', 'PETROSERVICIOS', NULL, 'empleado'),
(77, 7729979, 'LEONARDO   FRANCO GRAJALES', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-01-20', 'leonardo.franco@meridianecp.com', '7729979', 'PETROSERVICIOS', '2024-3046906-VRO-GDA-004', 'empleado'),
(78, 1019011177, 'LEIDY JOHANNA BELLO AREVALO', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-01-20', ' leidy.bello@meridianecp.com', '1019011177', 'PETROSERVICIOS', NULL, 'empleado'),
(79, 1040746072, 'KELLY LORENA DIEZ HERNANDEZ', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-01-20', 'kldiezhdz@gmail.com', '1040746072', 'PETROSERVICIOS', '2025-3046906-VRO-GLC-005', 'empleado'),
(80, 1151954545, 'JUAN MATEO CORDOBA WAGNER', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-01-20', 'juanmateo.cordoba@meridianecp.com', '1151954545', 'PETROSERVICIOS', '2025-3046906-VRO-GLC-005', 'empleado'),
(81, 1045706790, 'JOSE CARLOS GARCIA RUEDA', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-01-20', 'jose.garcia@meridianecp.com', '1045706790', 'PETROSERVICIOS', '2024-3046906-VRO-GDA-004', 'empleado'),
(82, 91524899, 'JOSÉ ANDRÉS ANAYA MANCIPE', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-01-20', 'andres.anaya@meridianecp.com', '91524899', 'PETROSERVICIOS', '2025-3046906-VRO-GLC-005', 'empleado'),
(83, 1003934174, 'JHON ABELARDO CUESTA ASPRILLA', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-01-20', 'jhon.cuesta@meridianecp.com', '1003934174', 'PETROSERVICIOS', '2025-3046906-VRO-GLC-005', 'empleado'),
(84, 1032398017, 'HERNÁN ALBEYRO FULA BOHÓRQUEZ', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-01-20', 'hernan.fula@meridianecp.com', '1032398017', 'PETROSERVICIOS', '2025-3046906-VRO-GLC-005', 'empleado'),
(85, 1013633604, 'GUSTAVO ANDRES  BAUTISTA VELANDIA', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-01-20', 'andresbautistavelandia@gmail.com', '1013633604', 'PETROSERVICIOS', '2025-3046906-VRO-GLC-005', 'empleado'),
(86, 1098745210, 'ESTEFANY LIZETH VELANDIA JAIMES', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-01-20', 'gestefanyvelandia@gmail.com', '1098745210', 'PETROSERVICIOS', '2025-3046906-VRO-GLC-005', 'empleado'),
(87, 1098726424, 'EMMANUEL ROBLES ALBARRACIN', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-01-20', 'emmanuel.robles@meridianecp.com', '1098726424', 'PETROSERVICIOS', '3047761-4', 'empleado'),
(88, 1095918218, 'WILMAR ANDRES DE LA HOZ GAMBOA', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-01-22', 'wilmar.delahoz@meridianecp.com', '1095918218', 'PETROSERVICIOS', '2025-3046906-VRO-GLC-005', 'empleado'),
(89, 478731, 'ZENAIDA DEL VALLE MARCANO DE VILLARROEL', 'CE', 'Profesional senior', 'PETROSERVICIOS', '2025-01-27', 'zenaida.marcano@meridianecp.com', '478731', 'PETROSERVICIOS', '2024-3046906-VRO-GDA-004', 'empleado'),
(90, 79954907, 'RONALD VASQUEZ ZARATE', 'CC ', 'Analista de nomina y gestion humana', 'ADMINISTRACION', '2025-01-27', 'nominas@meridian.com.co', '79954907', 'ADMINISTRACION', '90049530', 'empleado'),
(91, 1136888916, 'DANIEL ANDRES JOYA SAAVEDRA', 'CC ', 'Profesional de proyectos m1', 'FRONTERA - ADMINISTRACION', '2025-02-10', 'proyectos2@meridian.com.co', '1136888916', 'FRONTERA', '90049530', 'empleado'),
(92, 1039448281, 'CRISTINA  CARO VELEZ', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-02-17', 'cristina.caro@meridianecp.com', '1039448281', 'PETROSERVICIOS', '90049431', 'empleado'),
(94, 13740129, 'JULIO CESAR FIGUEROA VEGA', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-03-03', 'julio.figueroa@meridianecp.com', '13740129', 'PETROSERVICIOS', '90049431', 'empleado'),
(96, 1075212439, 'MARIANN LISSETTE MAHECHA LAVERDE', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-03-17', 'mariann.mahecha@meridianecp.com', '1075212439', 'PETROSERVICIOS', '90045724', 'empleado'),
(97, 1000588440, 'LUISA FERNANDA PACHECHO RUBIO', 'C.C.', 'Asistente gestión humana y nómina', 'ADMINISTRACION', '2025-03-19', 'analistagh@meridian.com.co', '1000588440', 'ADMINISTRACION', '90049330', 'empleado'),
(98, 75101511, 'JORGE EDUARDO PAIBA ALZATE', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-03-20', 'jorge.paiba@meridianecp.com', '75101511', 'PETROSERVICIOS', '90045724', 'empleado'),
(99, 56078704, 'MARIA CLAUDIA OROZCO CUJIA\n', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-03-31', 'maria.orozco@meridianecp.com', '56078704', 'PETROSERVICIOS', '90049330', 'empleado'),
(100, 1016037506, 'PAOLA ANDREA GOMEZ CABRERA', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-04-01', 'paola.gomez@meridianecp.com', '1016037506', 'PETROSERVICIOS', '90045724', 'empleado'),
(101, 1075292422, 'OLMER ANDRES MORALES MORA', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-04-01', 'andres.morales@meridianecp.com', '1075292422', 'PETROSERVICIOS', '5500006789-5500006806', 'empleado'),
(102, 52423689, 'NUBIA SOLANLLY REYES ÁVILA', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-04-01', 'nubia.reyes@meridianecp.com', '52423689', 'PETROSERVICIOS', '90049330', 'empleado'),
(103, 53103915, 'MONICA DEL PILAR MARTINEZ VERA', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-04-01', 'monica.martinez@meridianecp.com', '53103915', 'PETROSERVICIOS', '90045724', 'empleado'),
(104, 1098758681, 'MILTON JULIAN GUALTEROS QUIROGA', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-04-01', 'milton.gualteros@meridianecp.com', '1098758681', 'PETROSERVICIOS', '90045724', 'empleado'),
(105, 1026255124, 'MARIA ALEJANDRA MOJICA ARCINIEGAS', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-04-01', 'maria.mojica@meridianecp.com', '1026255124', 'PETROSERVICIOS', '90045724', 'empleado'),
(106, 1098683077, 'LUIS CARLOS MONSALVE PARRA', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-04-01', 'luis.monsalve@meridianecp.com', '1098683077', 'PETROSERVICIOS', '90045724', 'empleado'),
(107, 1095826986, 'LIZETH DAYANA BAUTISTA RICO', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-04-01', 'lizeth.bautista@meridianecp.com', '1095826986', 'PETROSERVICIOS', '90045724', 'empleado'),
(108, 1098706838, 'JULIÁN ANDRÉS HERNÁNDEZ PINTO', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-04-01', 'julian.hernandez@meridianecp.com', '1098706838', 'PETROSERVICIOS', '90045724', 'empleado'),
(109, 1098725794, 'JOSE GABRIEL NASSAR DIAZ', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-04-01', 'jose.nassar@meridianecp.com', '1098725794', 'PETROSERVICIOS', '90049498', 'empleado'),
(110, 1098681773, 'JHON HARVEY CARREÑO HERNANDEZ', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-04-01', 'jhon.carreno@meridianecp.com', '1098681773', 'PETROSERVICIOS', '90049330', 'empleado'),
(111, 1091668362, 'JESÚS IVÁN PACHECO ROMERO', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-04-01', 'jesus.pacheco@meridianecp.com', '1091668362', 'PETROSERVICIOS', '90049330', 'empleado'),
(112, 1098755426, 'JAIME JOSÉ MARTÍNEZ VERTEL', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-04-01', 'jaime.martinez@meridianecp.com', '1098755426', 'PETROSERVICIOS', '90045724', 'empleado'),
(113, 1056709240, 'IVAN DARIO MOZO MORENO', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-04-01', 'ivan.mozo@meridianecp.com', '1056709240', 'PETROSERVICIOS', '90045724', 'empleado'),
(114, 51781946, 'GLORIA FERNANDA VIDAL GONZALEZ ', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-04-01', 'gloria.vidal@meridianecp.com', '51781946', 'PETROSERVICIOS', '90045724', 'empleado'),
(115, 1100961505, 'GEISSON RENÉ ZAFRA URREA', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-04-01', 'geisson.zafra@meridianecp.com', '1100961505', 'PETROSERVICIOS', '90049330', 'empleado'),
(116, 1101692935, 'DIEGO FERNANDO PINTO HERNÁNDEZ', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-04-01', 'diego.pinto@meridianecp.com', '1101692935', 'PETROSERVICIOS', '90045724', 'empleado'),
(117, 13959717, 'DIEGO FERNANDO GALEANO BARRERA', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-04-01', 'diego.galeano@meridianecp.com', '13959717', 'PETROSERVICIOS', '90045724', 'empleado'),
(118, 1140847297, 'DAVID ALEJANDRO GARCIA CORONADO', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-04-01', 'david.garcia@meridianecp.com', '1140847297', 'PETROSERVICIOS', '90045724', 'empleado'),
(119, 1032467291, 'CHRISTIAN MAURICIO PARDO CARRANZA  ', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-04-01', 'christian.pardo@meridianecp.com', '1032467291', 'PETROSERVICIOS', '90045724', 'empleado'),
(120, 1082981742, 'CHRISTIAN DAVID MENDOZA RAMIREZ', 'CC ', 'Profesional básico', 'PETROSERVICIOS', '2025-04-01', 'christian.mendoza@meridianecp.com', '1082981742', 'PETROSERVICIOS', '90045724', 'empleado'),
(121, 1065599609, 'CESAR ELIECER RODRIGUEZ CAMELO', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-04-01', 'cesar.rodriguez@meridianecp.com', '1065599609', 'PETROSERVICIOS', '90045724', 'empleado'),
(122, 1101693549, 'CESAR EDUARDO GARNICA GOMEZ', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-04-01', 'cesar.garnica@meridianecp.com', '1101693549', 'PETROSERVICIOS', '90049330', 'empleado'),
(123, 1047451443, 'CARLOS RAFAEL OLMOS CARVAL', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-04-01', 'carlos.olmos@meridianecp.com', '1047451443', 'PETROSERVICIOS', '90049330', 'empleado'),
(124, 1098692205, 'BRIGGITE SUSEC CAMACHO JEREZ', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-04-01', 'briggite.camacho@meridianecp.com', '1098692205', 'PETROSERVICIOS', '90045724', 'empleado'),
(125, 52455261, 'ANA MARIA CASTELLANOS BARRETO', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-04-01', 'ana.castellanos@meridianecp.com', '52455261', 'PETROSERVICIOS', '90049498', 'empleado'),
(126, 1121941649, 'ALEJANDRO DUVAN LOPEZ ROJAS', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-04-01', 'alejandro.lopez@meridianecp.com', '1121941649', 'PETROSERVICIOS', '90045724', 'empleado'),
(127, 1018411794, 'JENNYFER PAOLA SANCHEZ PINZON', 'CC ', 'Asistente contable', 'ADMINISTRACION', '2025-04-02', 'asistentecontable1@meridian.com.co', '1018411794', 'ADMINISTRACION', '90049498', 'empleado'),
(128, 1098639151, 'CARLOS ESPINOSA LEON', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-04-22', 'carlos.espinosa@meridianecp.com', '1098639151', 'PETROSERVICIOS', '90045724', 'empleado'),
(129, 98772810, 'OSCAR FABIAN RAMIREZ JARAMILLO', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-05-05', 'oscar.ramirez@meridianecp.com', '98772810', 'PETROSERVICIOS', '90049330', 'empleado'),
(130, 1022347823, 'MIGUEL LEONARDO MARTINEZ SOTO ', 'CC ', 'Lider de gestion humana', 'ADMINISTRACION', '2025-05-05', 'lidergh@meridian.com.co', '1022347823', 'ADMINISTRACION', '90049330', 'admin'),
(131, 30405867, 'DIANA MARCELA CÁCERES SALINAS', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-05-05', 'diana.caceres@meridianecp.com', '30405867', 'PETROSERVICIOS', '90049498', 'empleado'),
(132, 1098800508, 'CLAUDIA ALEJANDRA  CAJICÁ TRILLOS', 'CC ', 'Profesional básico', 'PETROSERVICIOS', '2025-05-05', 'claudia.cajica@meridianecp.com', '1098800508', 'PETROSERVICIOS', '90045724', 'empleado'),
(133, 1140916030, 'DIEGO ALEJANDRO BARRETO HERNANDEZ', 'CC ', 'Aprendiz etapa practica', 'ADMINISTRACION', '2025-05-12', 'dbarretohernandez13@gmail.com', '1140916030', 'ADMINISTRACION', '90045724', 'empleado'),
(134, 63536247, 'JULLY MARCELA ORTEGON BARRERA', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-05-16', 'jully.ortegon@meridianecp.com', '63536247', 'PETROSERVICIOS', '90049498', 'empleado'),
(135, 1010174163, 'JORGE ARMANDO PACHECO COLLAZOS', 'CC ', 'Asistente logistico administrativo', 'ZIRCON ', '2025-05-19', 'asistentelogistica@meridian.com.co', '1010174163', 'ZIRCON ', '90045724', 'empleado'),
(136, 1160627, 'DANIEL CLAUDIO PEREZ', 'CE ', 'Profesional senior', 'PETROSERVICIOS', '2025-05-19', 'daniel.perez@meridianecp.com', '1160627', 'PETROSERVICIOS', '90045724', 'empleado'),
(137, 1010222610, 'JESSICA ALEXANDRA ALAVA CHAVEZ', 'CC ', 'Aprendiz etapa lectiva', 'ADMINISTRACION', '2025-05-20', 'jessica.a.alava@hotmail.com', '1010222610', 'ADMINISTRACION', '5500006789-5500006806', 'empleado'),
(138, 1098631939, 'JEFFERSON JULIAN SANABRIA AMAYA', 'CC ', 'Ingeniero(a) asistente de company man para operaciones de perforación completamiento y workover', 'FRONTERA', '2025-05-20', 'Jeffersanabria@hotmail.com', '1098631939', 'FRONTERA', '90048176', 'empleado'),
(139, 1013634120, 'EDWIN FABIAN MAYORGA LOPEZ', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-05-23', 'edwin.mayorga@meridianecp.com', '1013634120', 'PETROSERVICIOS', '90048176', 'empleado'),
(140, 1033776515, 'DIEGO ANDREY LOPEZ CALDERON', 'CC ', 'Aprendiz etapa practica', 'ADMINISTRACION', '2025-05-29', 'andrey.1995@outlook.es', '1033776515', 'ADMINISTRACION', '90049330', 'empleado'),
(141, 80243783, 'DIEGO MAURICIO MARTINEZ BRAVO', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-06-13', 'diego.martinez@meridianecp.com', '80243783', 'PETROSERVICIOS', '90049431', 'empleado'),
(142, 13720871, 'MARIO AUGUSTO MORENO CASTELLANOS', 'CC ', 'Profesional especialista', 'PETROSERVICIOS', '2025-06-16', 'mario.moreno@meridianecp.com', '13720871', 'PETROSERVICIOS', '90048176', 'empleado'),
(143, 39949703, 'ANA EBELIA GAMEZ FIGUEREDO', 'CC ', 'Contador senior', 'ADMINISTRACION', '2025-06-24', 'contador@meridian.com.co', '39949703', 'ADMINISTRACION', '90049431', 'empleado'),
(145, 1000514435, 'ANGIE PAOLA FORERO MÉNDEZ', 'CC ', 'Asistente contable', 'ADMINISTRACION', '2025-06-24', 'apfm514@hotmail.com', '1000514435', 'ADMINISTRACION', '90048176', 'empleado'),
(146, 1011202252, 'JOSÉ MATEO LÓPEZ CIFUENTES', 'CC ', 'Desarrollador de software', 'ADMINISTRACION', '2025-07-01', 'desarrolloit@meridian.com.co', '1011202252', 'ADMINISTRACION', '90048176', 'admin'),
(147, 1018516821, 'LUISA MARIA MELO RODRÍGUEZ', 'CC ', 'Auxiliar contable', 'ADMINISTRACION', '2025-07-01', 'luisamrdz22@gmail.com', '1018516821', 'ADMINISTRACION', '90048176', 'empleado'),
(148, 1019136436, 'LADY LORENA VINCHERY SOLANO', 'CC ', 'Aprendiz etapa practica', 'ADMINISTRACION', '2025-07-07', 'auxiliargh@meridian.com.co ', '1019136436', 'ADMINISTRACION', '90048176', 'empleado'),
(149, 1033703338, 'CRISTIAN ANDRES MURILLO', 'CC ', 'Aprendiz etapa lectiva', 'ADMINISTRACION', '2025-07-08', 'andresmurillo163@gmail.com', '1033703338', 'ADMINISTRACION', '90048176', 'empleado'),
(150, 1070750164, 'DARWIN YAMID GARZON RODRIGUEZ', 'CC ', 'Aprendiz etapa practica', 'ADMINISTRACION', '2025-07-09', 'dgarzon162@gmail.com', '1070750164', 'ADMINISTRACION', '90048176', 'empleado'),
(151, 1035854640, 'CANDIDA PATRICIA MARQUEZ BRUN', 'CC ', 'Ingeniero(a) asistente de company man para operaciones de perforación completamiento y workover', 'FRONTERA ', '2025-07-15', 'candidapmb@gmail.com', '1035854640', 'FRONTERA', '90049330', 'empleado'),
(152, 37949169, 'JENNY ANDREA CIPAGAUTA CARDOZO', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-07-17', 'andrea.cipagauta@meridianecp.com', '37949169', 'PETROSERVICIOS', '2024-3046906-VRO-GDA-004', 'empleado'),
(153, 91520047, 'JESUS DAVID ARENAS NAVARRO', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-07-17', 'jesus.arenas@meridianecp.com', '91520047', 'PETROSERVICIOS', '5500006789-5500006806', 'empleado'),
(154, 1098761186, 'ALEXANDRA KATHERINE LONDOÑO CAMACHO', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-08-01', 'alexandra.londoño@meridianecp.com', '1098761186', 'PETROSERVICIOS', '3047761-4', 'empleado'),
(155, 1020792684, 'JORGE FELIPE ALARCON TORRES', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-08-01', 'jorge.alarcon@meridianecp.com', '1020792684', 'PETROSERVICIOS', '3047761-4', 'empleado'),
(156, 52786386, 'PAOLA ADRIANA GIL CHIPATECUA', 'CC ', 'Coordinador de proyectos', 'COMPANY MAN - ADMINISTRACION', '2025-08-04', 'cordinadorproyectos@meridian.com ', '52786386', 'COMPANY MAN', '90049507', 'empleado'),
(157, 1024486676, 'YOHANA ROCIO GOMEZ VARGAS', 'CC ', 'Contador junior', 'ADMINISTRACION', '2025-08-04', 'contadorjunior@meridian.com.co', '1024486676', 'ADMINISTRACION', NULL, 'empleado'),
(158, 1075213439, 'JESSICA PAOLA MOSQUERA LOZANO', 'CC ', 'Ingeniero(a) asistente de company man para operaciones de perforación completamiento y workover d1', 'FRONTERA', '2025-08-04', 'JESHIKA.MOSQUERA@OUTLOOK.ES', '1075213439', 'FRONTERA', '5500006789-5500006806', 'empleado'),
(159, 1026301759, 'JESSICA ASTRID MAYORGA BARRERA', 'CC', 'Profesional de proyectos m3', 'COMPANY MAN - ADMINISTRACION', '2025-08-06', ' jessicamayorgabarrera@gmail.com', '1026301759', 'COMPANY MAN', '5500006789-5500006806', 'empleado'),
(160, 1089599089, 'JUAN ESTEBAN LOPEZ OSORIO', 'CC ', 'Aprendiz etapa lectiva', 'ADMINISTRACION', '2025-08-12', 'Juan12@hotmail.com', '1089599089', 'ADMINISTRACION', '5500006789-5500006806', 'empleado'),
(161, 1075248439, 'MARIA DEL PILAR GOMEZ MORA', 'CC ', 'Ingeniero(a) asistente de company man para operaciones de perforación completamiento y workover d1', 'FRONTERA', '2025-08-19', 'mdpgomezm@gmail.com', '1075248439', 'FRONTERA', '5500006789-5500006806', 'empleado'),
(162, 1017211010, 'MARIA ALEJANDRA  GIRALDO MUÑOZ', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-08-20', 'maria.giraldo@meridianecp.com', '1017211010', 'PETROSERVICIOS', NULL, 'empleado'),
(163, 1087047704, 'YUBER RODRIGUEZ ARTURO', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-08-20', 'yuber.rodriguez@meridianecp.com', '1087047704', 'PETROSERVICIOS', '2024-3046906-VRO-GDA-004', 'empleado'),
(164, 1098733967, 'OSCAR FABIAN SUAREZ SUAREZ', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-09-03', 'oscar.suarez@meridianecp.com', '1098733967', 'PETROSERVICIOS', '5500006789-5500006806', 'empleado'),
(165, 506169, 'CLAUDIA CAROPRESE GARCIA', 'CE ', 'Profesional senior', 'PETROSERVICIOS', '2025-09-03', 'claudia.caroprese@meridianecp.com', '506169', 'PETROSERVICIOS', '90048176', 'empleado'),
(166, 91532360, 'MAURICIO ANDRES VASQUEZ PINTO', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '0000-00-00', 'mauricio.vasquez@meridianecp.com', '91532360', 'PETROSERVICIOS', '90087618', 'empleado'),
(167, 1014181943, 'ANDRES MAURICIO GONZALEZ HERRERA', 'CC', 'Ingeniero de intervencion a pozos tipo iii', 'COMPANY CW281880 - CANTAGALLO', '0000-00-00', 'amaogh@gmail.com', '1014181943', 'COMPANY MAN', '90087618', 'empleado'),
(168, 63501053, 'MARYLUZ SANTAMARIA BECERRA', 'CC', 'Servicio especializado en costos de intervencion de pozos tipo i', 'COMPANY CW281880 -  YONDO', '0000-00-00', 'maryluzsantamaria@hotmail.com', '63501053', 'COMPANY MAN', '90049431', 'empleado'),
(169, 1115914145, 'VIANI YORELY RUIZ GALINDO', 'CC', 'Servicio especializado en costos de intervencion de pozos tipo ii', 'COMPANY CW281880 -  YONDO', '0000-00-00', 'VIANIRUIZ@GMAIL.COM', '1115914145', 'COMPANY MAN', '3047761-4', 'empleado'),
(170, 1101695749, 'JULIO CESAR RODRIGUEZ APARICIO', 'CC', 'Servicio especializado en intervenciones a pozo tipo ii', 'COMPANY CW281880 -  YONDO', '0000-00-00', 'cesarjuliocesar1997@gmail.com', '1101695749', 'COMPANY MAN', '90052461', 'empleado'),
(171, 1096202008, 'JHONATAN ALEXANDER TORRES RODRIGUEZ', 'CC', 'Servicio especializado en intervenciones a pozo tipo ii', 'COMPANY CW281880 -  YONDO', '0000-00-00', 'jhonatantorresrdr@gmail.com', '1096202008', 'COMPANY MAN', NULL, 'empleado'),
(172, 1015475289, 'MIGUEL ANGEL RIAÑO MOLINA', 'CC', 'Ingeniero asistente de supervision integral de pozos tipo ii', 'COMPANY CW281880 -  YONDO', '0000-00-00', 'miguelmolinave@gmail.com', '1015475289', 'COMPANY MAN', '90109695', 'empleado'),
(173, 1143388273, 'LAURA VANESSA CASTRO CARMONA', 'CC', 'Servicio especializado en intervenciones a pozo tipo ii', 'COMPANY CW281880 -  YONDO', '0000-00-00', 'laucastro212011@gmail.com', '1143388273', 'COMPANY MAN', '2024-3046906-VRO-GDA-004', 'empleado'),
(174, 88278069, 'EDGARD MAURICIO ALVAREZ FRANCO', 'CC', 'Servicio especializado en costos de intervencion de pozos tipo ii', 'COMPANY CW281880 -  YONDO', '0000-00-00', 'GENIOALV@GMAIL.COM', '88278069', 'COMPANY MAN', '90048176', 'empleado'),
(175, 1002465061, 'DIANIS CHAVEZ CAMPUZANO', 'CC', 'Servicio especializado en integridad de pozos tipo ii', 'COMPANY CW281880 -  YONDO', '0000-00-00', '01dianischavez@gmail.com', '1002465061', 'COMPANY MAN', '90141005', 'empleado'),
(176, 1098681142, 'LAURA MARCELA ARENAS PEREZ', 'CC', 'Ingeniero de intervencion a pozos tipo iv', 'COMPANY CW281880 -  YONDO', '0000-00-00', 'lamarcela1289@gmail.com', '1098681142', 'COMPANY MAN', '90141005', 'empleado'),
(177, 7317575, 'YORGUIN DANIEL PEÑA LUGO', 'CC', 'Supervisor integral en intervenciones a pozo tipo ii', 'COMPANY CW281880 -  YONDO', '0000-00-00', 'yorguinp@hotmail.com', '7317575', 'COMPANY MAN', '90141005', 'empleado'),
(178, 1037580568, 'ANGELA MARIA TORO PATERNINA', 'CC', 'Servicio soporte en abandono de pozos tipo ii', 'COMPANY CW281880 -  YONDO', '0000-00-00', 'amtorop90@hotmail.com', '1037580568', 'COMPANY MAN', '90141005', 'empleado'),
(179, 1022348859, 'EDGAR KELLYN ORDOÑEZ', 'CC', 'Ingeniero de intervencion a pozos tipo iii', 'COMPANY CW281880 -  YONDO', '0000-00-00', 'ekobogota@hotmail.com', '1022348859', 'COMPANY MAN', '90141005', 'empleado'),
(180, 1075234956, 'INGRID YISET SANCHEZ PEREZ', 'CC', 'Servicio especializado en costos de intervencion de pozos tipo i', 'COMPANY CW281880 -  YONDO', '0000-00-00', 'ingridyisedsanchez@outlook.es', '1075234956', 'COMPANY MAN', '90141005', 'empleado'),
(181, 1042212691, 'YOJAN GIL GONZALEZ', 'CC', 'Servicio especializado en costos de intervencion de pozos tipo i', 'COMPANY CW281880 -  YONDO', '0000-00-00', 'yojan35@hotmail.com', '1042212691', 'COMPANY MAN', '90141005', 'empleado'),
(182, 1096245598, 'MAIRA ALEJANDRA VASQUEZ CORREA', 'CC', 'Servicio especializado en costos de intervencion de pozos tipo i', 'COMPANY CW281880 -  YONDO', '0000-00-00', 'aleja.2017@outlook.es', '1096245598', 'COMPANY MAN', '90141005', 'empleado'),
(183, 1064838225, 'JORGE ENRIQUE NIÑO SANTOS', 'CC', 'Servicio especializado en costos de intervencion de pozos tipo i', 'COMPANY CW281880 -  YONDO', '0000-00-00', 'datolo90@hotmail.com', '1064838225', 'COMPANY MAN', '90141005', 'empleado'),
(184, 1115914517, 'CAMILO ANRES IBAÑEZ ROZO', 'CC', 'Servicio especializado en costos de intervencion de pozos tipo i', 'COMPANY CW281880 -  YONDO', '0000-00-00', 'ingcamilo.ibanez@gmail.com', '1115914517', 'COMPANY MAN', '90141005', 'empleado'),
(185, 1096208135, 'YESSICA VANESSA ALBA BELEÑO', 'CC', 'Servicio especializado en costos de intervencion de pozos tipo i', 'COMPANY CW281880 -  YONDO', '0000-00-00', 'yessica.alba19@gmail.com', '1096208135', 'COMPANY MAN', '90141005', 'empleado'),
(186, 80076686, 'ALEX JHOAN GONZALEZ MORA', 'CC', 'Ingeniero de intervencion a pozos tipo ii', 'COMPANY CW281880 -  YONDO', '0000-00-00', 'ing.alexgonzalez@hotmail.com', '80076686', 'COMPANY MAN', '90141005', 'empleado'),
(187, 1101687575, 'MIGUEL ANGEL AYALA PINZON', 'CC', 'Servicio especializado en integridad de pozos tipo ii', 'COMPANY CW281880 -  YONDO', '0000-00-00', 'ing.ayala19@gmail.com', '1101687575', 'COMPANY MAN', '90141005', 'empleado'),
(188, 1020427784, 'JUAN SEBASTIAN VALENCIA ORTEGA', 'CC', 'Servicio especializado en integridad de pozos tipo ii', 'COMPANY CW281880 -  YONDO', '0000-00-00', 'Juanseb89@hotmail.com', '1020427784', 'COMPANY MAN', '90141005', 'empleado'),
(189, 1098727333, 'PERLA MELISSA PINZÓN AGUDELO', 'CC', 'Ingeniero de intervencion a pozos tipo iii', 'COMPANY CW281880 - CANTAGALLO', '0000-00-00', 'perlameli_92@hotmail.com', '1098727333', 'COMPANY MAN', '90141005', 'empleado'),
(190, 1077173073, 'ESTEBAN GARCIA ROJAS', 'CC', 'Supervisor integral en intervenciones a pozo tipo ii', 'COMPANY CW281880 - PIEDEMONTE', '0000-00-00', 'estebangr1987@gmail.com', '1077173073', 'COMPANY MAN', '90141005', 'empleado'),
(191, 13871188, 'PEDRO RAFAEL CADENA ORDOÑEZ', 'CC', 'Supervisor integral en intervenciones a pozo tipo i', 'COMPANY CW281880 - PIEDEMONTE', '0000-00-00', 'pedro.cadena@outlook.com', '13871188', 'COMPANY MAN', '90141005', 'empleado'),
(192, 7161987, 'CARLOS SAUL CELIS ACERO', 'CC', 'Supervisor integral en intervenciones a pozo tipo i', 'COMPANY CW281880 - PIEDEMONTE', '0000-00-00', 'celiscarloss@gmail.com', '7161987', 'COMPANY MAN', '90141005', 'empleado'),
(193, 80150738, 'WILBER CASTAÑEDA CASTAÑEDA', 'CC', 'Servicio especializado en integridad de pozos tipo i', 'COMPANY CW281880 - PIEDEMONTE', '0000-00-00', 'wilbercastaeda@gmail.com', '80150738', 'COMPANY MAN', '90141005', 'empleado'),
(194, 80100600, 'LUIS GUILLERMO MERCADO RICO', 'CC', 'Supervisor integral en intervenciones a pozo tipo ii', 'COMPANY CW281880 - PROVINCIA ', '0000-00-00', 'luis.guillermo.mercado@gmail.com', '80100600', 'COMPANY MAN', '90141005', 'empleado'),
(195, 18760161, 'RICARDO JOSÉ CORREA CERRO', 'CC ', 'Supervisor integral en intervenciones a pozo tipo ii', 'COMPANY CW281880 - PROVINCIA ', '0000-00-00', 'ricardocorreacerro@gmail.com', '18760161', 'COMPANY MAN', '90141005', 'empleado'),
(196, 12126698, 'JOSE ALBERTO TORO MONDRAGON', 'CC', 'Supervisor integral en intervenciones a pozo tipo i', 'COMPANY CW281880 - GIBRALTAR ', '0000-00-00', 'joseal74@hotmail.com', '12126698', 'COMPANY MAN', '90141005', 'empleado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacion`
--

CREATE TABLE `evaluacion` (
  `id_evaluacion` int(11) NOT NULL,
  `id_empleado` int(11) NOT NULL,
  `fecha_evaluacion` datetime NOT NULL,
  `periodo_evaluacion` varchar(50) DEFAULT NULL,
  `observaciones_generales` longtext DEFAULT NULL,
  `estado_evaluacion` enum('AUTOEVALUACION_PENDIENTE','AUTOEVALUACION_COMPLETADA','EVALUACION_JEFE_PENDIENTE','EVALUACION_JEFE_COMPLETADA','HSEQ_PENDIENTE','HSEQ_COMPLETADA','EVALUACION_FINALIZADA','BORRADOR','COMPLETADA','APROBADA') DEFAULT 'AUTOEVALUACION_PENDIENTE',
  `id_jefe` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fecha_autoevaluacion` datetime DEFAULT NULL COMMENT 'Fecha cuando el empleado completó su autoevaluación',
  `fecha_evaluacion_jefe` datetime DEFAULT NULL COMMENT 'Fecha cuando el jefe completó su evaluación',
  `fecha_evaluacion_hseq` datetime DEFAULT NULL COMMENT 'Fecha cuando se completó la evaluación HSEQ',
  `id_evaluador_hseq` int(11) DEFAULT NULL COMMENT 'ID del evaluador HSEQ institucional',
  `comentarios_hseq` text DEFAULT NULL COMMENT 'Comentarios de la evaluación HSEQ institucional'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacion_competencias`
--

CREATE TABLE `evaluacion_competencias` (
  `id_competencia` int(11) NOT NULL,
  `id_evaluacion` int(11) NOT NULL,
  `id_aspecto` int(11) NOT NULL,
  `aspecto` text NOT NULL,
  `calificacion_empleado` varchar(10) DEFAULT NULL,
  `calificacion_jefe` varchar(10) DEFAULT NULL,
  `promedio` decimal(3,2) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacion_estado_historial`
--

CREATE TABLE `evaluacion_estado_historial` (
  `id_historial` int(11) NOT NULL,
  `id_evaluacion` int(11) NOT NULL,
  `estado_anterior` varchar(50) DEFAULT NULL,
  `estado_nuevo` varchar(50) NOT NULL,
  `fecha_cambio` datetime DEFAULT current_timestamp(),
  `id_usuario_cambio` int(11) DEFAULT NULL,
  `comentario` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacion_firmas`
--

CREATE TABLE `evaluacion_firmas` (
  `id_firma` int(11) NOT NULL,
  `id_evaluacion` int(11) NOT NULL,
  `firma_empleado` varchar(500) DEFAULT NULL,
  `firma_jefe` varchar(500) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacion_hseq`
--

CREATE TABLE `evaluacion_hseq` (
  `id_hseq` int(11) NOT NULL,
  `id_evaluacion` int(11) NOT NULL,
  `id_responsabilidad` int(11) NOT NULL,
  `responsabilidad` text NOT NULL,
  `calificacion` varchar(10) DEFAULT NULL,
  `evaluacion_jefe` varchar(10) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacion_mejoramiento`
--

CREATE TABLE `evaluacion_mejoramiento` (
  `id_mejoramiento` int(11) NOT NULL,
  `id_evaluacion` int(11) NOT NULL,
  `fortalezas` text DEFAULT NULL,
  `aspectos_mejorar` text DEFAULT NULL,
  `comentarios_jefe` text DEFAULT NULL,
  `fecha_revision_jefe` datetime DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacion_plan_accion`
--

CREATE TABLE `evaluacion_plan_accion` (
  `id_plan_accion` int(11) NOT NULL,
  `id_evaluacion` int(11) NOT NULL,
  `actividad` text NOT NULL,
  `responsable` varchar(255) NOT NULL,
  `seguimiento` text DEFAULT NULL,
  `comentarios_jefe` text DEFAULT NULL,
  `aprobado_jefe` enum('PENDIENTE','APROBADO','RECHAZADO') DEFAULT 'PENDIENTE',
  `fecha_revision_jefe` datetime DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacion_promedios`
--

CREATE TABLE `evaluacion_promedios` (
  `id_promedio` int(11) NOT NULL,
  `id_evaluacion` int(11) NOT NULL,
  `promedio_competencias` decimal(3,2) DEFAULT NULL,
  `promedio_hseq` decimal(3,2) DEFAULT NULL,
  `promedio_general` decimal(3,2) DEFAULT NULL,
  `promedio_comunicacion_efectiva` decimal(3,2) DEFAULT NULL,
  `promedio_instrumentalidad_decisiones` decimal(3,2) DEFAULT NULL,
  `promedio_aporte_profesional` decimal(3,2) DEFAULT NULL,
  `promedio_colaboracion` decimal(3,2) DEFAULT NULL,
  `promedio_relaciones_interpersonales` decimal(3,2) DEFAULT NULL,
  `promedio_gestion_procedimientos` decimal(3,2) DEFAULT NULL,
  `promedio_cumplimiento_funciones` decimal(3,2) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hseq_evaluacion`
--

CREATE TABLE `hseq_evaluacion` (
  `id_hseq_evaluacion` int(11) NOT NULL,
  `id_empleado` int(11) NOT NULL,
  `periodo_evaluacion` varchar(50) DEFAULT NULL,
  `promedio_hseq` decimal(5,2) DEFAULT NULL,
  `estado` enum('BORRADOR','COMPLETADA') DEFAULT 'COMPLETADA',
  `id_evaluador` int(11) DEFAULT NULL,
  `fecha_evaluacion` datetime DEFAULT current_timestamp(),
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hseq_evaluacion_items`
--

CREATE TABLE `hseq_evaluacion_items` (
  `id_item` int(11) NOT NULL,
  `id_hseq_evaluacion` int(11) NOT NULL,
  `id_responsabilidad` int(11) NOT NULL,
  `responsabilidad` text NOT NULL,
  `calificacion` decimal(5,2) DEFAULT NULL,
  `justificacion` text DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_evaluaciones_estado`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `v_evaluaciones_estado` (
`id_evaluacion` int(11)
,`id_empleado` int(11)
,`nombre_empleado` varchar(100)
,`cargo_empleado` varchar(100)
,`area_empleado` varchar(100)
,`estado_evaluacion` enum('AUTOEVALUACION_PENDIENTE','AUTOEVALUACION_COMPLETADA','EVALUACION_JEFE_PENDIENTE','EVALUACION_JEFE_COMPLETADA','HSEQ_PENDIENTE','HSEQ_COMPLETADA','EVALUACION_FINALIZADA','BORRADOR','COMPLETADA','APROBADA')
,`fecha_autoevaluacion` datetime
,`fecha_evaluacion_jefe` datetime
,`fecha_evaluacion_hseq` datetime
,`periodo_evaluacion` varchar(50)
,`fecha_evaluacion` datetime
,`fecha_creacion` datetime
,`fecha_actualizacion` datetime
,`nombre_jefe` varchar(100)
,`cargo_jefe` varchar(100)
,`nombre_evaluador_hseq` varchar(100)
,`cargo_evaluador_hseq` varchar(100)
,`estado_descripcion` varchar(26)
,`progreso_porcentaje` int(3)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `v_evaluaciones_estado`
--
DROP TABLE IF EXISTS `v_evaluaciones_estado`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_evaluaciones_estado`  AS SELECT `e`.`id_evaluacion` AS `id_evaluacion`, `e`.`id_empleado` AS `id_empleado`, `emp`.`nombre` AS `nombre_empleado`, `emp`.`cargo` AS `cargo_empleado`, `emp`.`area` AS `area_empleado`, `e`.`estado_evaluacion` AS `estado_evaluacion`, `e`.`fecha_autoevaluacion` AS `fecha_autoevaluacion`, `e`.`fecha_evaluacion_jefe` AS `fecha_evaluacion_jefe`, `e`.`fecha_evaluacion_hseq` AS `fecha_evaluacion_hseq`, `e`.`periodo_evaluacion` AS `periodo_evaluacion`, `e`.`fecha_evaluacion` AS `fecha_evaluacion`, `e`.`fecha_creacion` AS `fecha_creacion`, `e`.`fecha_actualizacion` AS `fecha_actualizacion`, `jefe`.`nombre` AS `nombre_jefe`, `jefe`.`cargo` AS `cargo_jefe`, `hseq_eval`.`nombre` AS `nombre_evaluador_hseq`, `hseq_eval`.`cargo` AS `cargo_evaluador_hseq`, CASE WHEN `e`.`estado_evaluacion` = 'AUTOEVALUACION_PENDIENTE' THEN 'Pendiente Autoevaluación' WHEN `e`.`estado_evaluacion` = 'AUTOEVALUACION_COMPLETADA' THEN 'Pendiente Evaluación Jefe' WHEN `e`.`estado_evaluacion` = 'EVALUACION_JEFE_PENDIENTE' THEN 'Pendiente Evaluación Jefe' WHEN `e`.`estado_evaluacion` = 'EVALUACION_JEFE_COMPLETADA' THEN 'Pendiente Evaluación HSEQ' WHEN `e`.`estado_evaluacion` = 'HSEQ_PENDIENTE' THEN 'Pendiente Evaluación HSEQ' WHEN `e`.`estado_evaluacion` = 'HSEQ_COMPLETADA' THEN 'Evaluación HSEQ Completada' WHEN `e`.`estado_evaluacion` = 'EVALUACION_FINALIZADA' THEN 'Evaluación Finalizada' ELSE `e`.`estado_evaluacion` END AS `estado_descripcion`, CASE WHEN `e`.`estado_evaluacion` = 'AUTOEVALUACION_PENDIENTE' THEN 20 WHEN `e`.`estado_evaluacion` = 'AUTOEVALUACION_COMPLETADA' THEN 40 WHEN `e`.`estado_evaluacion` = 'EVALUACION_JEFE_PENDIENTE' THEN 40 WHEN `e`.`estado_evaluacion` = 'EVALUACION_JEFE_COMPLETADA' THEN 60 WHEN `e`.`estado_evaluacion` = 'HSEQ_PENDIENTE' THEN 60 WHEN `e`.`estado_evaluacion` = 'HSEQ_COMPLETADA' THEN 80 WHEN `e`.`estado_evaluacion` = 'EVALUACION_FINALIZADA' THEN 100 ELSE 0 END AS `progreso_porcentaje` FROM (((`evaluacion` `e` left join `empleados` `emp` on(`e`.`id_empleado` = `emp`.`id_empleado`)) left join `empleados` `jefe` on(`e`.`id_jefe` = `jefe`.`id_empleado`)) left join `empleados` `hseq_eval` on(`e`.`id_evaluador_hseq` = `hseq_eval`.`id_empleado`)) ;

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
  ADD KEY `fk_detalle_eval_evaluacion` (`id_evaluacion`);

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
  ADD KEY `fk_evaluacion_empleado` (`id_empleado`),
  ADD KEY `idx_evaluacion_empleado_fecha` (`id_empleado`,`fecha_evaluacion`),
  ADD KEY `idx_evaluacion_estado` (`estado_evaluacion`),
  ADD KEY `idx_evaluacion_id_jefe` (`id_jefe`),
  ADD KEY `idx_evaluacion_hseq_evaluador` (`id_evaluador_hseq`);

--
-- Indices de la tabla `evaluacion_competencias`
--
ALTER TABLE `evaluacion_competencias`
  ADD PRIMARY KEY (`id_competencia`),
  ADD KEY `fk_competencias_evaluacion` (`id_evaluacion`);

--
-- Indices de la tabla `evaluacion_estado_historial`
--
ALTER TABLE `evaluacion_estado_historial`
  ADD PRIMARY KEY (`id_historial`),
  ADD KEY `fk_historial_evaluacion` (`id_evaluacion`),
  ADD KEY `fk_historial_usuario` (`id_usuario_cambio`);

--
-- Indices de la tabla `evaluacion_firmas`
--
ALTER TABLE `evaluacion_firmas`
  ADD PRIMARY KEY (`id_firma`),
  ADD KEY `fk_firmas_evaluacion` (`id_evaluacion`);

--
-- Indices de la tabla `evaluacion_hseq`
--
ALTER TABLE `evaluacion_hseq`
  ADD PRIMARY KEY (`id_hseq`),
  ADD KEY `fk_hseq_evaluacion` (`id_evaluacion`);

--
-- Indices de la tabla `evaluacion_mejoramiento`
--
ALTER TABLE `evaluacion_mejoramiento`
  ADD PRIMARY KEY (`id_mejoramiento`),
  ADD KEY `fk_mejoramiento_evaluacion` (`id_evaluacion`);

--
-- Indices de la tabla `evaluacion_plan_accion`
--
ALTER TABLE `evaluacion_plan_accion`
  ADD PRIMARY KEY (`id_plan_accion`),
  ADD KEY `fk_plan_accion_evaluacion` (`id_evaluacion`);

--
-- Indices de la tabla `evaluacion_promedios`
--
ALTER TABLE `evaluacion_promedios`
  ADD PRIMARY KEY (`id_promedio`),
  ADD KEY `fk_promedios_evaluacion` (`id_evaluacion`);

--
-- Indices de la tabla `hseq_evaluacion`
--
ALTER TABLE `hseq_evaluacion`
  ADD PRIMARY KEY (`id_hseq_evaluacion`),
  ADD KEY `idx_hseq_empleado_periodo` (`id_empleado`,`periodo_evaluacion`),
  ADD KEY `idx_hseq_evaluador` (`id_evaluador`);

--
-- Indices de la tabla `hseq_evaluacion_items`
--
ALTER TABLE `hseq_evaluacion_items`
  ADD PRIMARY KEY (`id_item`),
  ADD KEY `fk_hseq_item_eval` (`id_hseq_evaluacion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cargo`
--
ALTER TABLE `cargo`
  MODIFY `id_cargo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=338;

--
-- AUTO_INCREMENT de la tabla `detalle_evaluacion`
--
ALTER TABLE `detalle_evaluacion`
  MODIFY `id_detalle_evaluacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=796;

--
-- AUTO_INCREMENT de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  MODIFY `id_evaluacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `evaluacion_competencias`
--
ALTER TABLE `evaluacion_competencias`
  MODIFY `id_competencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `evaluacion_estado_historial`
--
ALTER TABLE `evaluacion_estado_historial`
  MODIFY `id_historial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `evaluacion_firmas`
--
ALTER TABLE `evaluacion_firmas`
  MODIFY `id_firma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `evaluacion_hseq`
--
ALTER TABLE `evaluacion_hseq`
  MODIFY `id_hseq` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `evaluacion_mejoramiento`
--
ALTER TABLE `evaluacion_mejoramiento`
  MODIFY `id_mejoramiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `evaluacion_plan_accion`
--
ALTER TABLE `evaluacion_plan_accion`
  MODIFY `id_plan_accion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `evaluacion_promedios`
--
ALTER TABLE `evaluacion_promedios`
  MODIFY `id_promedio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `hseq_evaluacion`
--
ALTER TABLE `hseq_evaluacion`
  MODIFY `id_hseq_evaluacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `hseq_evaluacion_items`
--
ALTER TABLE `hseq_evaluacion_items`
  MODIFY `id_item` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_evaluacion`
--
ALTER TABLE `detalle_evaluacion`
  ADD CONSTRAINT `fk_detalle_eval_evaluacion` FOREIGN KEY (`id_evaluacion`) REFERENCES `evaluacion` (`id_evaluacion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD CONSTRAINT `fk_empleados_cargo` FOREIGN KEY (`cargo`) REFERENCES `cargo` (`nombre_cargo`);

--
-- Filtros para la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  ADD CONSTRAINT `fk_evaluacion_empleado` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_evaluacion_hseq_evaluador` FOREIGN KEY (`id_evaluador_hseq`) REFERENCES `empleados` (`id_empleado`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `evaluacion_competencias`
--
ALTER TABLE `evaluacion_competencias`
  ADD CONSTRAINT `fk_competencias_evaluacion` FOREIGN KEY (`id_evaluacion`) REFERENCES `evaluacion` (`id_evaluacion`) ON DELETE CASCADE;

--
-- Filtros para la tabla `evaluacion_estado_historial`
--
ALTER TABLE `evaluacion_estado_historial`
  ADD CONSTRAINT `fk_historial_evaluacion` FOREIGN KEY (`id_evaluacion`) REFERENCES `evaluacion` (`id_evaluacion`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_historial_usuario` FOREIGN KEY (`id_usuario_cambio`) REFERENCES `empleados` (`id_empleado`) ON DELETE SET NULL;

--
-- Filtros para la tabla `evaluacion_firmas`
--
ALTER TABLE `evaluacion_firmas`
  ADD CONSTRAINT `fk_firmas_evaluacion` FOREIGN KEY (`id_evaluacion`) REFERENCES `evaluacion` (`id_evaluacion`) ON DELETE CASCADE;

--
-- Filtros para la tabla `evaluacion_hseq`
--
ALTER TABLE `evaluacion_hseq`
  ADD CONSTRAINT `fk_hseq_evaluacion` FOREIGN KEY (`id_evaluacion`) REFERENCES `evaluacion` (`id_evaluacion`) ON DELETE CASCADE;

--
-- Filtros para la tabla `evaluacion_mejoramiento`
--
ALTER TABLE `evaluacion_mejoramiento`
  ADD CONSTRAINT `fk_mejoramiento_evaluacion` FOREIGN KEY (`id_evaluacion`) REFERENCES `evaluacion` (`id_evaluacion`) ON DELETE CASCADE;

--
-- Filtros para la tabla `evaluacion_plan_accion`
--
ALTER TABLE `evaluacion_plan_accion`
  ADD CONSTRAINT `fk_plan_accion_evaluacion` FOREIGN KEY (`id_evaluacion`) REFERENCES `evaluacion` (`id_evaluacion`) ON DELETE CASCADE;

--
-- Filtros para la tabla `evaluacion_promedios`
--
ALTER TABLE `evaluacion_promedios`
  ADD CONSTRAINT `fk_promedios_evaluacion` FOREIGN KEY (`id_evaluacion`) REFERENCES `evaluacion` (`id_evaluacion`) ON DELETE CASCADE;

--
-- Filtros para la tabla `hseq_evaluacion`
--
ALTER TABLE `hseq_evaluacion`
  ADD CONSTRAINT `fk_hseq_eval_empleado` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_hseq_eval_evaluador` FOREIGN KEY (`id_evaluador`) REFERENCES `empleados` (`id_empleado`);

--
-- Filtros para la tabla `hseq_evaluacion_items`
--
ALTER TABLE `hseq_evaluacion_items`
  ADD CONSTRAINT `fk_hseq_item_eval` FOREIGN KEY (`id_hseq_evaluacion`) REFERENCES `hseq_evaluacion` (`id_hseq_evaluacion`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
