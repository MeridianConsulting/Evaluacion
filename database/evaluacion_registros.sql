-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 26-09-2025 a las 10:30:19
-- Versión del servidor: 10.6.22-MariaDB-cll-lve
-- Versión de PHP: 8.3.22

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
(5, 'Analista de nomina y contratacion', '', ''),
(6, 'Aprendiz etapa lectiva', '', ''),
(7, 'Aprendiz etapa practica', '', ''),
(8, 'Asesor administrativo', '', ''),
(9, 'Asistente administrativa y de gestión humana', '', ''),
(10, 'Asistente administrativo', '', ''),
(11, 'Asistente contable', '', ''),
(12, 'Asistente de nomina y contratacion', '', ''),
(13, 'Analista de Gestion Humana', '', ''),
(14, 'Asistente logistico administrativo', '', ''),
(15, 'Auxiliar contable', '', ''),
(16, 'Contador junior', '', ''),
(17, 'Contador senior', '', ''),
(18, 'Coordinador contable y financiero', '', ''),
(19, 'Profesional de Gestión Humana', '', ''),
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
(11, 1020733194, 'ELOY GABRIEL GOMEZ REYES', 'CC ', 'Profesional de Gestión Humana', 'ADMINISTRACION', '2023-06-13', 'profesionalgh@meridian.com.co', 'Isabel.2009', 'ADMINISTRACION', NULL, 'empleado'),
(12, 1031145571, 'DIANA MARCELA JACOBO MANCERA', 'CC ', 'Soporte hseq', 'ADMINISTRACION', '2023-08-14', 'soportehseq@meridian.com.co', '1031145571', 'ADMINISTRACION', NULL, 'HSEQ'),
(13, 1121936876, 'LAURA DANIELA SEGURA MORERA', 'CC ', 'Soporte hseq proyectos', 'COMPANY MAN - ADMINISTRACION', '2023-09-05', 'profesionalhseq@meridian.com.co', '1121936876', 'COMPANY MAN', NULL, 'HSEQ'),
(14, 52978024, 'ERIKA LILIANA MANCIPE RODRIGUEZ', 'CC', 'Aprendiz etapa practica', 'ADMINISTRACION', '2023-11-01', 'aprendizhseq@meridian.com.co', '52978024', 'ADMINISTRACION', NULL, 'empleado'),
(15, 1007627524, 'ANDRES CAMILO CARDENAS REYES', 'CC ', 'Profesional soporte it', 'ADMINISTRACION', '2023-12-04', 'soporteit.nivel1@meridian.com.co', '1007627524', 'ADMINISTRACION', NULL, 'empleado'),
(17, 1007647736, 'SONIA STEPHANIA FONSECA LOPEZ', 'CC ', 'Asistente de nomina y contratacion', 'ADMINISTRACION', '2024-05-02', 'contratacion@meridian.com.co', '1007647736', 'ADMINISTRACION', NULL, 'empleado'),
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
(90, 79954907, 'RONALD VASQUEZ ZARATE', 'CC ', 'Analista de nomina y contratacion', 'ADMINISTRACION', '2025-01-27', 'nominas@meridian.com.co', '79954907', 'ADMINISTRACION', '90049530', 'empleado'),
(91, 1136888916, 'DANIEL ANDRES JOYA SAAVEDRA', 'CC ', 'Profesional de proyectos m1', 'FRONTERA - ADMINISTRACION', '2025-02-10', 'proyectos2@meridian.com.co', '1136888916', 'FRONTERA', '90049530', 'empleado'),
(92, 1039448281, 'CRISTINA  CARO VELEZ', 'CC ', 'Profesional junior', 'PETROSERVICIOS', '2025-02-17', 'cristina.caro@meridianecp.com', '1039448281', 'PETROSERVICIOS', '90049431', 'empleado'),
(94, 13740129, 'JULIO CESAR FIGUEROA VEGA', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-03-03', 'julio.figueroa@meridianecp.com', '13740129', 'PETROSERVICIOS', '90049431', 'empleado'),
(96, 1075212439, 'MARIANN LISSETTE MAHECHA LAVERDE', 'CC ', 'Profesional senior', 'PETROSERVICIOS', '2025-03-17', 'mariann.mahecha@meridianecp.com', '1075212439', 'PETROSERVICIOS', '90045724', 'empleado'),
(97, 1000588440, 'LUISA FERNANDA PACHECHO RUBIO', 'C.C.', 'Analista de Gestion Humana', 'ADMINISTRACION', '2025-03-19', 'analistagh@meridian.com.co', '1000588440', 'ADMINISTRACION', '90049330', 'empleado'),
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
(130, 1022347823, 'MIGUEL LEONARDO MARTINEZ SOTO ', 'CC ', 'Lider de gestion humana', 'ADMINISTRACION', '2025-05-05', 'lidergh@meridian.com.co', 'Lg.mlm.2025*', 'ADMINISTRACION', '90049330', 'admin'),
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
(148, 1019136436, 'LADY LORENA VINCHERY SOLANO', 'CC ', 'Aprendiz etapa practica', 'ADMINISTRACION', '2025-07-07', 'auxiliargh@meridian.com.co ', 'lORENA98+', 'ADMINISTRACION', '90048176', 'empleado'),
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
  `categoria_evaluacion` enum('Período de prueba','Trimestral','Anual') DEFAULT 'Anual',
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

--
-- Volcado de datos para la tabla `evaluacion`
--

INSERT INTO `evaluacion` (`id_evaluacion`, `id_empleado`, `fecha_evaluacion`, `periodo_evaluacion`, `categoria_evaluacion`, `observaciones_generales`, `estado_evaluacion`, `id_jefe`, `fecha_creacion`, `fecha_actualizacion`, `fecha_autoevaluacion`, `fecha_evaluacion_jefe`, `fecha_evaluacion_hseq`, `id_evaluador_hseq`, `comentarios_hseq`) VALUES
(2, 146, '2025-09-24 09:35:50', '2025-09', 'Anual', NULL, 'EVALUACION_JEFE_COMPLETADA', 1, '2025-09-24 09:35:50', '2025-09-24 10:49:56', '2025-09-24 09:35:50', '2025-09-24 10:49:56', NULL, NULL, NULL),
(3, 146, '2025-09-24 12:05:44', '2025-09', 'Anual', NULL, 'EVALUACION_JEFE_COMPLETADA', 15, '2025-09-24 12:05:44', '2025-09-24 12:07:19', '2025-09-24 12:05:44', '2025-09-24 12:07:19', NULL, NULL, NULL),
(4, 130, '2025-09-24 12:17:26', '2025-09', 'Anual', NULL, 'EVALUACION_JEFE_COMPLETADA', 1, '2025-09-24 12:17:26', '2025-09-24 12:20:34', '2025-09-24 12:17:26', '2025-09-24 12:20:34', NULL, NULL, NULL),
(5, 90, '2025-09-25 10:39:54', '2025-09', 'Anual', NULL, 'AUTOEVALUACION_COMPLETADA', 130, '2025-09-25 10:39:54', '2025-09-25 10:39:54', '2025-09-25 10:39:54', NULL, NULL, NULL, NULL),
(6, 11, '2025-09-25 14:21:56', '2025-09', 'Anual', NULL, 'AUTOEVALUACION_COMPLETADA', 130, '2025-09-25 14:21:56', '2025-09-25 14:21:56', '2025-09-25 14:21:56', NULL, NULL, NULL, NULL),
(7, 97, '2025-09-26 05:12:40', '2025-09', 'Anual', NULL, 'EVALUACION_JEFE_COMPLETADA', 130, '2025-09-26 05:12:40', '2025-09-26 10:20:56', NULL, NULL, NULL, NULL, NULL),
(8, 146, '2025-09-26 08:14:52', '2025-09', 'Anual', NULL, 'EVALUACION_JEFE_COMPLETADA', 1, '2025-09-26 08:14:52', '2025-09-26 08:19:59', '2025-09-26 08:14:52', '2025-09-26 08:19:59', NULL, NULL, NULL),
(9, 17, '2025-09-26 09:11:28', '2025-09', 'Anual', NULL, 'AUTOEVALUACION_COMPLETADA', 130, '2025-09-26 09:11:28', '2025-09-26 09:11:28', '2025-09-26 09:11:28', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacion_acta_compromiso`
--

CREATE TABLE `evaluacion_acta_compromiso` (
  `id_acta_compromiso` int(11) NOT NULL,
  `id_evaluacion` int(11) NOT NULL,
  `criterio` text NOT NULL,
  `compromiso` text NOT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `evaluacion_acta_compromiso`
--

INSERT INTO `evaluacion_acta_compromiso` (`id_acta_compromiso`, `id_evaluacion`, `criterio`, `compromiso`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(3, 2, 'qweqdasdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'qweqdasdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '2025-09-24 10:49:56', '2025-09-24 10:49:56'),
(5, 3, 'qwwsadddddddddddddddddddddddddddddddddddddddddddddddddddddddddffffffffff', 'qwwsadddddddddddddddddddddddddddddddddddddddddddddddddddddddddffffffffff', '2025-09-24 12:07:19', '2025-09-24 12:07:19'),
(7, 4, 'ssssssssssssss bzbnxbzaz ba<nsznnb xznxnxnxnnxvcbfb', 'ssssssssssssss gs gdd zf nz nxxfg xxnxnxzn', '2025-09-24 12:20:34', '2025-09-24 12:20:34'),
(8, 5, 'Comunicación asertiva y tolerancia ', 'Escucha activa, empatía y manejo de tono de voz ', '2025-09-25 10:39:54', '2025-09-25 10:39:54'),
(9, 6, 'realizar cursos de acutalizacion laboral y nomina ', 'nomina y laboral en el area de gestion humana ', '2025-09-25 14:21:56', '2025-09-25 14:21:56'),
(13, 8, 'wwsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfahg', 'wwsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfahg', '2025-09-26 08:19:59', '2025-09-26 08:19:59'),
(14, 9, 'Realizar los procesos de manera efectiva y ayudar a que sean más rápidos, confiables y organizados ', 'Continuar con la mejor disposición y profesionalismo todos los requerimientos y funciones a cargo ', '2025-09-26 09:11:28', '2025-09-26 09:11:28'),
(15, 7, 'Actualización de conocimientos teórico - Pacticos', 'realizar por lo menos 2 diplomados en las temáticas descritas en necesidad de capacitacion', '2025-09-26 09:35:50', '2025-09-26 09:35:50'),
(16, 7, 'Validación y alineación con Perfil de cargo', 'Validar que funciones tiene asignadas por el perfil de cargo y cuales requieren plan de accion', '2025-09-26 09:35:50', '2025-09-26 09:35:50');

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

--
-- Volcado de datos para la tabla `evaluacion_competencias`
--

INSERT INTO `evaluacion_competencias` (`id_competencia`, `id_evaluacion`, `id_aspecto`, `aspecto`, `calificacion_empleado`, `calificacion_jefe`, `promedio`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(47, 2, 1, 'Utiliza canales de comunicación, en su diversa expresión, con claridad, precisión y tono agradable para el receptor', '4', '4', 4.00, '2025-09-24 10:49:56', '2025-09-24 10:49:56'),
(48, 2, 2, 'Redacta textos, informes, mensajes, cuadros o  gráficas con claridad en la expresión para ser efectiva y sencilla la comprensión', '1', '2', 1.50, '2025-09-24 10:49:56', '2025-09-24 10:49:56'),
(49, 2, 3, 'Mantiene escucha y lectura atenta a efectos de  comprender mejor los mensajes o información recibida.', '2', '2', 2.00, '2025-09-24 10:49:56', '2025-09-24 10:49:56'),
(50, 2, 4, 'Da respuesta a cada comunicación recibida de modo inmediato', '2', '2', 2.00, '2025-09-24 10:49:56', '2025-09-24 10:49:56'),
(51, 2, 5, 'Adopta las decisiones tomadas para ejercer sus actividades individuales y las adoptadas para el trabajo en equipo por preferencia', '2', '2', 2.00, '2025-09-24 10:49:56', '2025-09-24 10:49:56'),
(52, 2, 6, 'Maneja criterios objetivos para analizar las formas a deducir con las personas involucradas.', '2', '2', 2.00, '2025-09-24 10:49:56', '2025-09-24 10:49:56'),
(53, 2, 7, 'Aporta soluciones alternativas en lo que refiere a sus saberes específicos.', '2', '2', 2.00, '2025-09-24 10:49:56', '2025-09-24 10:49:56'),
(54, 2, 8, 'Informa su experiencia especializada en el proceso de toma de decisiones que involucran aspectos de su especialidad.', '2', '2', 2.00, '2025-09-24 10:49:56', '2025-09-24 10:49:56'),
(55, 2, 9, 'Anticipa problemas y posibles soluciones que advierten su carácter de especialista.', '2', '2', 2.00, '2025-09-24 10:49:56', '2025-09-24 10:49:56'),
(56, 2, 10, 'Asume la interdisciplinariedad aprovechando puntos de vista diversos y alternativas al propio, para analizar y proponer soluciones posibles.', '2', '2', 2.00, '2025-09-24 10:49:56', '2025-09-24 10:49:56'),
(57, 2, 11, 'Articula sus actuaciones con las de los demás', '2', '2', 2.00, '2025-09-24 10:49:56', '2025-09-24 10:49:56'),
(58, 2, 12, 'Cumple los compromisos adquiridos', '5', '2', 3.50, '2025-09-24 10:49:56', '2025-09-24 10:49:56'),
(59, 2, 13, 'Facilita la labor de sus supervisores y compañeros de trabajo', '2', '2', 2.00, '2025-09-24 10:49:56', '2025-09-24 10:49:56'),
(60, 2, 14, 'Escucha con interés y capta las necesidades de los demás.', '2', '2', 2.00, '2025-09-24 10:49:56', '2025-09-24 10:49:56'),
(61, 2, 15, 'Transmite la información de forma fidedigna evitando situaciones que puedan generar deterioro en el ambiente laboral.', '2', '2', 2.00, '2025-09-24 10:49:56', '2025-09-24 10:49:56'),
(62, 2, 16, 'Toma la iniciativa en el contacto con clientes internos y externos para dar avisos, citar o respuestas, utilizando un lenguaje claro para los destinatarios.', '2', '2', 2.00, '2025-09-24 10:49:56', '2025-09-24 10:49:56'),
(63, 2, 17, 'Ejecuta sus tareas con los criterios de calidad establecidos.', '2', '2', 2.00, '2025-09-24 10:49:56', '2025-09-24 10:49:56'),
(64, 2, 18, 'Revisa procedimientos e instrumentos para mejorar tiempos y resultados y para anticipar soluciones a problemas.', '3', '2', 2.50, '2025-09-24 10:49:56', '2025-09-24 10:49:56'),
(65, 2, 19, 'Desarrolla las actividades de acuerdo con las pautas y protocolos definidos.', '2', '1', 1.50, '2025-09-24 10:49:56', '2025-09-24 10:49:56'),
(66, 2, 20, 'Cumple de manera consistente y oportuna las funciones específicas asignadas a su cargo.', '3', '2', 2.50, '2025-09-24 10:49:56', '2025-09-24 10:49:56'),
(67, 2, 21, 'Demuestra dominio técnico y procedimental en las tareas críticas del rol.', '4', '2', 3.00, '2025-09-24 10:49:56', '2025-09-24 10:49:56'),
(68, 2, 22, 'Entrega resultados alineados con los estándares y tiempos definidos para su cargo.', '2', '2', 2.00, '2025-09-24 10:49:56', '2025-09-24 10:49:56'),
(69, 2, 23, 'Prioriza y organiza sus funciones para asegurar el cumplimiento sin reprocesos.', '3', '2', 2.50, '2025-09-24 10:49:56', '2025-09-24 10:49:56'),
(93, 3, 1, 'Utiliza canales de comunicación, en su diversa expresión, con claridad, precisión y tono agradable para el receptor', '5', '5', 5.00, '2025-09-24 12:07:19', '2025-09-24 12:07:19'),
(94, 3, 2, 'Redacta textos, informes, mensajes, cuadros o  gráficas con claridad en la expresión para ser efectiva y sencilla la comprensión', '1', '2', 1.50, '2025-09-24 12:07:19', '2025-09-24 12:07:19'),
(95, 3, 3, 'Mantiene escucha y lectura atenta a efectos de  comprender mejor los mensajes o información recibida.', '2', '2', 2.00, '2025-09-24 12:07:19', '2025-09-24 12:07:19'),
(96, 3, 4, 'Da respuesta a cada comunicación recibida de modo inmediato', '2', '2', 2.00, '2025-09-24 12:07:19', '2025-09-24 12:07:19'),
(97, 3, 5, 'Adopta las decisiones tomadas para ejercer sus actividades individuales y las adoptadas para el trabajo en equipo por preferencia', '2', '2', 2.00, '2025-09-24 12:07:19', '2025-09-24 12:07:19'),
(98, 3, 6, 'Maneja criterios objetivos para analizar las formas a deducir con las personas involucradas.', '2', '2', 2.00, '2025-09-24 12:07:19', '2025-09-24 12:07:19'),
(99, 3, 7, 'Aporta soluciones alternativas en lo que refiere a sus saberes específicos.', '2', '2', 2.00, '2025-09-24 12:07:19', '2025-09-24 12:07:19'),
(100, 3, 8, 'Informa su experiencia especializada en el proceso de toma de decisiones que involucran aspectos de su especialidad.', '2', '2', 2.00, '2025-09-24 12:07:19', '2025-09-24 12:07:19'),
(101, 3, 9, 'Anticipa problemas y posibles soluciones que advierten su carácter de especialista.', '3', '2', 2.50, '2025-09-24 12:07:19', '2025-09-24 12:07:19'),
(102, 3, 10, 'Asume la interdisciplinariedad aprovechando puntos de vista diversos y alternativas al propio, para analizar y proponer soluciones posibles.', '2', '2', 2.00, '2025-09-24 12:07:19', '2025-09-24 12:07:19'),
(103, 3, 11, 'Articula sus actuaciones con las de los demás', '2', '2', 2.00, '2025-09-24 12:07:19', '2025-09-24 12:07:19'),
(104, 3, 12, 'Cumple los compromisos adquiridos', '2', '1', 1.50, '2025-09-24 12:07:19', '2025-09-24 12:07:19'),
(105, 3, 13, 'Facilita la labor de sus supervisores y compañeros de trabajo', '2', '2', 2.00, '2025-09-24 12:07:19', '2025-09-24 12:07:19'),
(106, 3, 14, 'Escucha con interés y capta las necesidades de los demás.', '2', '1', 1.50, '2025-09-24 12:07:19', '2025-09-24 12:07:19'),
(107, 3, 15, 'Transmite la información de forma fidedigna evitando situaciones que puedan generar deterioro en el ambiente laboral.', '2', '2', 2.00, '2025-09-24 12:07:19', '2025-09-24 12:07:19'),
(108, 3, 16, 'Toma la iniciativa en el contacto con clientes internos y externos para dar avisos, citar o respuestas, utilizando un lenguaje claro para los destinatarios.', '2', '2', 2.00, '2025-09-24 12:07:19', '2025-09-24 12:07:19'),
(109, 3, 17, 'Ejecuta sus tareas con los criterios de calidad establecidos.', '1', '2', 1.50, '2025-09-24 12:07:19', '2025-09-24 12:07:19'),
(110, 3, 18, 'Revisa procedimientos e instrumentos para mejorar tiempos y resultados y para anticipar soluciones a problemas.', '1', '2', 1.50, '2025-09-24 12:07:19', '2025-09-24 12:07:19'),
(111, 3, 19, 'Desarrolla las actividades de acuerdo con las pautas y protocolos definidos.', '1', '2', 1.50, '2025-09-24 12:07:19', '2025-09-24 12:07:19'),
(112, 3, 20, 'Cumple de manera consistente y oportuna las funciones específicas asignadas a su cargo.', '1', '2', 1.50, '2025-09-24 12:07:19', '2025-09-24 12:07:19'),
(113, 3, 21, 'Demuestra dominio técnico y procedimental en las tareas críticas del rol.', '1', '2', 1.50, '2025-09-24 12:07:19', '2025-09-24 12:07:19'),
(114, 3, 22, 'Entrega resultados alineados con los estándares y tiempos definidos para su cargo.', '1', '1', 1.00, '2025-09-24 12:07:19', '2025-09-24 12:07:19'),
(115, 3, 23, 'Prioriza y organiza sus funciones para asegurar el cumplimiento sin reprocesos.', '1', '1', 1.00, '2025-09-24 12:07:19', '2025-09-24 12:07:19'),
(139, 4, 1, 'Utiliza canales de comunicación, en su diversa expresión, con claridad, precisión y tono agradable para el receptor', '5', '3', 4.00, '2025-09-24 12:20:34', '2025-09-24 12:20:34'),
(140, 4, 2, 'Redacta textos, informes, mensajes, cuadros o  gráficas con claridad en la expresión para ser efectiva y sencilla la comprensión', '5', '3', 4.00, '2025-09-24 12:20:34', '2025-09-24 12:20:34'),
(141, 4, 3, 'Mantiene escucha y lectura atenta a efectos de  comprender mejor los mensajes o información recibida.', '5', '3', 4.00, '2025-09-24 12:20:34', '2025-09-24 12:20:34'),
(142, 4, 4, 'Da respuesta a cada comunicación recibida de modo inmediato', '5', '3', 4.00, '2025-09-24 12:20:34', '2025-09-24 12:20:34'),
(143, 4, 5, 'Adopta las decisiones tomadas para ejercer sus actividades individuales y las adoptadas para el trabajo en equipo por preferencia', '5', '3', 4.00, '2025-09-24 12:20:34', '2025-09-24 12:20:34'),
(144, 4, 6, 'Maneja criterios objetivos para analizar las formas a deducir con las personas involucradas.', '5', '3', 4.00, '2025-09-24 12:20:34', '2025-09-24 12:20:34'),
(145, 4, 7, 'Aporta soluciones alternativas en lo que refiere a sus saberes específicos.', '5', '3', 4.00, '2025-09-24 12:20:34', '2025-09-24 12:20:34'),
(146, 4, 8, 'Informa su experiencia especializada en el proceso de toma de decisiones que involucran aspectos de su especialidad.', '5', '3', 4.00, '2025-09-24 12:20:34', '2025-09-24 12:20:34'),
(147, 4, 9, 'Anticipa problemas y posibles soluciones que advierten su carácter de especialista.', '5', '3', 4.00, '2025-09-24 12:20:34', '2025-09-24 12:20:34'),
(148, 4, 10, 'Asume la interdisciplinariedad aprovechando puntos de vista diversos y alternativas al propio, para analizar y proponer soluciones posibles.', '5', '3', 4.00, '2025-09-24 12:20:34', '2025-09-24 12:20:34'),
(149, 4, 11, 'Articula sus actuaciones con las de los demás', '5', '3', 4.00, '2025-09-24 12:20:34', '2025-09-24 12:20:34'),
(150, 4, 12, 'Cumple los compromisos adquiridos', '5', '3', 4.00, '2025-09-24 12:20:34', '2025-09-24 12:20:34'),
(151, 4, 13, 'Facilita la labor de sus supervisores y compañeros de trabajo', '5', '3', 4.00, '2025-09-24 12:20:34', '2025-09-24 12:20:34'),
(152, 4, 14, 'Escucha con interés y capta las necesidades de los demás.', '5', '3', 4.00, '2025-09-24 12:20:34', '2025-09-24 12:20:34'),
(153, 4, 15, 'Transmite la información de forma fidedigna evitando situaciones que puedan generar deterioro en el ambiente laboral.', '5', '3', 4.00, '2025-09-24 12:20:34', '2025-09-24 12:20:34'),
(154, 4, 16, 'Toma la iniciativa en el contacto con clientes internos y externos para dar avisos, citar o respuestas, utilizando un lenguaje claro para los destinatarios.', '5', '3', 4.00, '2025-09-24 12:20:34', '2025-09-24 12:20:34'),
(155, 4, 17, 'Ejecuta sus tareas con los criterios de calidad establecidos.', '5', '3', 4.00, '2025-09-24 12:20:34', '2025-09-24 12:20:34'),
(156, 4, 18, 'Revisa procedimientos e instrumentos para mejorar tiempos y resultados y para anticipar soluciones a problemas.', '5', '3', 4.00, '2025-09-24 12:20:34', '2025-09-24 12:20:34'),
(157, 4, 19, 'Desarrolla las actividades de acuerdo con las pautas y protocolos definidos.', '5', '3', 4.00, '2025-09-24 12:20:34', '2025-09-24 12:20:34'),
(158, 4, 20, 'Cumple de manera consistente y oportuna las funciones específicas asignadas a su cargo.', '5', '3', 4.00, '2025-09-24 12:20:34', '2025-09-24 12:20:34'),
(159, 4, 21, 'Demuestra dominio técnico y procedimental en las tareas críticas del rol.', '5', '3', 4.00, '2025-09-24 12:20:34', '2025-09-24 12:20:34'),
(160, 4, 22, 'Entrega resultados alineados con los estándares y tiempos definidos para su cargo.', '5', '3', 4.00, '2025-09-24 12:20:34', '2025-09-24 12:20:34'),
(161, 4, 23, 'Prioriza y organiza sus funciones para asegurar el cumplimiento sin reprocesos.', '5', '3', 4.00, '2025-09-24 12:20:34', '2025-09-24 12:20:34'),
(162, 5, 1, 'Utiliza canales de comunicación, en su diversa expresión, con claridad, precisión y tono agradable para el receptor', '3', '', 1.50, '2025-09-25 10:39:54', '2025-09-25 10:39:54'),
(163, 5, 2, 'Redacta textos, informes, mensajes, cuadros o  gráficas con claridad en la expresión para ser efectiva y sencilla la comprensión', '4', '', 2.00, '2025-09-25 10:39:54', '2025-09-25 10:39:54'),
(164, 5, 3, 'Mantiene escucha y lectura atenta a efectos de  comprender mejor los mensajes o información recibida.', '4', '', 2.00, '2025-09-25 10:39:54', '2025-09-25 10:39:54'),
(165, 5, 4, 'Da respuesta a cada comunicación recibida de modo inmediato', '3', '', 1.50, '2025-09-25 10:39:54', '2025-09-25 10:39:54'),
(166, 5, 5, 'Adopta las decisiones tomadas para ejercer sus actividades individuales y las adoptadas para el trabajo en equipo por preferencia', '4', '', 2.00, '2025-09-25 10:39:54', '2025-09-25 10:39:54'),
(167, 5, 6, 'Maneja criterios objetivos para analizar las formas a deducir con las personas involucradas.', '4', '', 2.00, '2025-09-25 10:39:54', '2025-09-25 10:39:54'),
(168, 5, 7, 'Aporta soluciones alternativas en lo que refiere a sus saberes específicos.', '4', '', 2.00, '2025-09-25 10:39:54', '2025-09-25 10:39:54'),
(169, 5, 8, 'Informa su experiencia especializada en el proceso de toma de decisiones que involucran aspectos de su especialidad.', '4', '', 2.00, '2025-09-25 10:39:54', '2025-09-25 10:39:54'),
(170, 5, 9, 'Anticipa problemas y posibles soluciones que advierten su carácter de especialista.', '4', '', 2.00, '2025-09-25 10:39:54', '2025-09-25 10:39:54'),
(171, 5, 10, 'Asume la interdisciplinariedad aprovechando puntos de vista diversos y alternativas al propio, para analizar y proponer soluciones posibles.', '4', '', 2.00, '2025-09-25 10:39:54', '2025-09-25 10:39:54'),
(172, 5, 11, 'Articula sus actuaciones con las de los demás', '3', '', 1.50, '2025-09-25 10:39:54', '2025-09-25 10:39:54'),
(173, 5, 12, 'Cumple los compromisos adquiridos', '3', '', 1.50, '2025-09-25 10:39:54', '2025-09-25 10:39:54'),
(174, 5, 13, 'Facilita la labor de sus supervisores y compañeros de trabajo', '3', '', 1.50, '2025-09-25 10:39:54', '2025-09-25 10:39:54'),
(175, 5, 14, 'Escucha con interés y capta las necesidades de los demás.', '3', '', 1.50, '2025-09-25 10:39:54', '2025-09-25 10:39:54'),
(176, 5, 15, 'Transmite la información de forma fidedigna evitando situaciones que puedan generar deterioro en el ambiente laboral.', '4', '', 2.00, '2025-09-25 10:39:54', '2025-09-25 10:39:54'),
(177, 5, 16, 'Toma la iniciativa en el contacto con clientes internos y externos para dar avisos, citar o respuestas, utilizando un lenguaje claro para los destinatarios.', '4', '', 2.00, '2025-09-25 10:39:54', '2025-09-25 10:39:54'),
(178, 5, 17, 'Ejecuta sus tareas con los criterios de calidad establecidos.', '3', '', 1.50, '2025-09-25 10:39:54', '2025-09-25 10:39:54'),
(179, 5, 18, 'Revisa procedimientos e instrumentos para mejorar tiempos y resultados y para anticipar soluciones a problemas.', '3', '', 1.50, '2025-09-25 10:39:54', '2025-09-25 10:39:54'),
(180, 5, 19, 'Desarrolla las actividades de acuerdo con las pautas y protocolos definidos.', '4', '', 2.00, '2025-09-25 10:39:54', '2025-09-25 10:39:54'),
(181, 5, 20, 'Cumple de manera consistente y oportuna las funciones específicas asignadas a su cargo.', '4', '', 2.00, '2025-09-25 10:39:54', '2025-09-25 10:39:54'),
(182, 5, 21, 'Demuestra dominio técnico y procedimental en las tareas críticas del rol.', '4', '', 2.00, '2025-09-25 10:39:54', '2025-09-25 10:39:54'),
(183, 5, 22, 'Entrega resultados alineados con los estándares y tiempos definidos para su cargo.', '3', '', 1.50, '2025-09-25 10:39:54', '2025-09-25 10:39:54'),
(184, 5, 23, 'Prioriza y organiza sus funciones para asegurar el cumplimiento sin reprocesos.', '3', '', 1.50, '2025-09-25 10:39:54', '2025-09-25 10:39:54'),
(185, 6, 1, 'Utiliza canales de comunicación, en su diversa expresión, con claridad, precisión y tono agradable para el receptor', '4', '', 2.00, '2025-09-25 14:21:56', '2025-09-25 14:21:56'),
(186, 6, 2, 'Redacta textos, informes, mensajes, cuadros o  gráficas con claridad en la expresión para ser efectiva y sencilla la comprensión', '4', '', 2.00, '2025-09-25 14:21:56', '2025-09-25 14:21:56'),
(187, 6, 3, 'Mantiene escucha y lectura atenta a efectos de  comprender mejor los mensajes o información recibida.', '4', '', 2.00, '2025-09-25 14:21:56', '2025-09-25 14:21:56'),
(188, 6, 4, 'Da respuesta a cada comunicación recibida de modo inmediato', '4', '', 2.00, '2025-09-25 14:21:56', '2025-09-25 14:21:56'),
(189, 6, 5, 'Adopta las decisiones tomadas para ejercer sus actividades individuales y las adoptadas para el trabajo en equipo por preferencia', '5', '', 2.50, '2025-09-25 14:21:56', '2025-09-25 14:21:56'),
(190, 6, 6, 'Maneja criterios objetivos para analizar las formas a deducir con las personas involucradas.', '4', '', 2.00, '2025-09-25 14:21:56', '2025-09-25 14:21:56'),
(191, 6, 7, 'Aporta soluciones alternativas en lo que refiere a sus saberes específicos.', '5', '', 2.50, '2025-09-25 14:21:56', '2025-09-25 14:21:56'),
(192, 6, 8, 'Informa su experiencia especializada en el proceso de toma de decisiones que involucran aspectos de su especialidad.', '5', '', 2.50, '2025-09-25 14:21:56', '2025-09-25 14:21:56'),
(193, 6, 9, 'Anticipa problemas y posibles soluciones que advierten su carácter de especialista.', '4', '', 2.00, '2025-09-25 14:21:56', '2025-09-25 14:21:56'),
(194, 6, 10, 'Asume la interdisciplinariedad aprovechando puntos de vista diversos y alternativas al propio, para analizar y proponer soluciones posibles.', '4', '', 2.00, '2025-09-25 14:21:56', '2025-09-25 14:21:56'),
(195, 6, 11, 'Articula sus actuaciones con las de los demás', '4', '', 2.00, '2025-09-25 14:21:56', '2025-09-25 14:21:56'),
(196, 6, 12, 'Cumple los compromisos adquiridos', '5', '', 2.50, '2025-09-25 14:21:56', '2025-09-25 14:21:56'),
(197, 6, 13, 'Facilita la labor de sus supervisores y compañeros de trabajo', '5', '', 2.50, '2025-09-25 14:21:56', '2025-09-25 14:21:56'),
(198, 6, 14, 'Escucha con interés y capta las necesidades de los demás.', '4', '', 2.00, '2025-09-25 14:21:56', '2025-09-25 14:21:56'),
(199, 6, 15, 'Transmite la información de forma fidedigna evitando situaciones que puedan generar deterioro en el ambiente laboral.', '4', '', 2.00, '2025-09-25 14:21:56', '2025-09-25 14:21:56'),
(200, 6, 16, 'Toma la iniciativa en el contacto con clientes internos y externos para dar avisos, citar o respuestas, utilizando un lenguaje claro para los destinatarios.', '4', '', 2.00, '2025-09-25 14:21:56', '2025-09-25 14:21:56'),
(201, 6, 17, 'Ejecuta sus tareas con los criterios de calidad establecidos.', '5', '', 2.50, '2025-09-25 14:21:56', '2025-09-25 14:21:56'),
(202, 6, 18, 'Revisa procedimientos e instrumentos para mejorar tiempos y resultados y para anticipar soluciones a problemas.', '5', '', 2.50, '2025-09-25 14:21:56', '2025-09-25 14:21:56'),
(203, 6, 19, 'Desarrolla las actividades de acuerdo con las pautas y protocolos definidos.', '5', '', 2.50, '2025-09-25 14:21:56', '2025-09-25 14:21:56'),
(204, 6, 20, 'Cumple de manera consistente y oportuna las funciones específicas asignadas a su cargo.', '4', '', 2.00, '2025-09-25 14:21:56', '2025-09-25 14:21:56'),
(205, 6, 21, 'Demuestra dominio técnico y procedimental en las tareas críticas del rol.', '5', '', 2.50, '2025-09-25 14:21:56', '2025-09-25 14:21:56'),
(206, 6, 22, 'Entrega resultados alineados con los estándares y tiempos definidos para su cargo.', '5', '', 2.50, '2025-09-25 14:21:56', '2025-09-25 14:21:56'),
(207, 6, 23, 'Prioriza y organiza sus funciones para asegurar el cumplimiento sin reprocesos.', '5', '', 2.50, '2025-09-25 14:21:56', '2025-09-25 14:21:56'),
(254, 8, 1, 'Utiliza canales de comunicación, en su diversa expresión, con claridad, precisión y tono agradable para el receptor', '5', '5', 5.00, '2025-09-26 08:19:59', '2025-09-26 08:19:59'),
(255, 8, 2, 'Redacta textos, informes, mensajes, cuadros o  gráficas con claridad en la expresión para ser efectiva y sencilla la comprensión', '2', '1', 1.50, '2025-09-26 08:19:59', '2025-09-26 08:19:59'),
(256, 8, 3, 'Mantiene escucha y lectura atenta a efectos de  comprender mejor los mensajes o información recibida.', '3', '3', 3.00, '2025-09-26 08:19:59', '2025-09-26 08:19:59'),
(257, 8, 4, 'Da respuesta a cada comunicación recibida de modo inmediato', '3', '5', 4.00, '2025-09-26 08:19:59', '2025-09-26 08:19:59'),
(258, 8, 5, 'Adopta las decisiones tomadas para ejercer sus actividades individuales y las adoptadas para el trabajo en equipo por preferencia', '2', '2', 2.00, '2025-09-26 08:19:59', '2025-09-26 08:19:59'),
(259, 8, 6, 'Maneja criterios objetivos para analizar las formas a deducir con las personas involucradas.', '3', '2', 2.50, '2025-09-26 08:19:59', '2025-09-26 08:19:59'),
(260, 8, 7, 'Aporta soluciones alternativas en lo que refiere a sus saberes específicos.', '2', '2', 2.00, '2025-09-26 08:19:59', '2025-09-26 08:19:59'),
(261, 8, 8, 'Informa su experiencia especializada en el proceso de toma de decisiones que involucran aspectos de su especialidad.', '2', '2', 2.00, '2025-09-26 08:19:59', '2025-09-26 08:19:59'),
(262, 8, 9, 'Anticipa problemas y posibles soluciones que advierten su carácter de especialista.', '2', '2', 2.00, '2025-09-26 08:19:59', '2025-09-26 08:19:59'),
(263, 8, 10, 'Asume la interdisciplinariedad aprovechando puntos de vista diversos y alternativas al propio, para analizar y proponer soluciones posibles.', '2', '2', 2.00, '2025-09-26 08:19:59', '2025-09-26 08:19:59'),
(264, 8, 11, 'Articula sus actuaciones con las de los demás', '2', '2', 2.00, '2025-09-26 08:19:59', '2025-09-26 08:19:59'),
(265, 8, 12, 'Cumple los compromisos adquiridos', '2', '2', 2.00, '2025-09-26 08:19:59', '2025-09-26 08:19:59'),
(266, 8, 13, 'Facilita la labor de sus supervisores y compañeros de trabajo', '2', '3', 2.50, '2025-09-26 08:19:59', '2025-09-26 08:19:59'),
(267, 8, 14, 'Escucha con interés y capta las necesidades de los demás.', '2', '3', 2.50, '2025-09-26 08:19:59', '2025-09-26 08:19:59'),
(268, 8, 15, 'Transmite la información de forma fidedigna evitando situaciones que puedan generar deterioro en el ambiente laboral.', '2', '1', 1.50, '2025-09-26 08:19:59', '2025-09-26 08:19:59'),
(269, 8, 16, 'Toma la iniciativa en el contacto con clientes internos y externos para dar avisos, citar o respuestas, utilizando un lenguaje claro para los destinatarios.', '2', '2', 2.00, '2025-09-26 08:19:59', '2025-09-26 08:19:59'),
(270, 8, 17, 'Ejecuta sus tareas con los criterios de calidad establecidos.', '2', '1', 1.50, '2025-09-26 08:19:59', '2025-09-26 08:19:59'),
(271, 8, 18, 'Revisa procedimientos e instrumentos para mejorar tiempos y resultados y para anticipar soluciones a problemas.', '2', '1', 1.50, '2025-09-26 08:19:59', '2025-09-26 08:19:59'),
(272, 8, 19, 'Desarrolla las actividades de acuerdo con las pautas y protocolos definidos.', '2', '1', 1.50, '2025-09-26 08:19:59', '2025-09-26 08:19:59'),
(273, 8, 20, 'Cumple de manera consistente y oportuna las funciones específicas asignadas a su cargo.', '2', '1', 1.50, '2025-09-26 08:19:59', '2025-09-26 08:19:59'),
(274, 8, 21, 'Demuestra dominio técnico y procedimental en las tareas críticas del rol.', '2', '2', 2.00, '2025-09-26 08:19:59', '2025-09-26 08:19:59'),
(275, 8, 22, 'Entrega resultados alineados con los estándares y tiempos definidos para su cargo.', '2', '1', 1.50, '2025-09-26 08:19:59', '2025-09-26 08:19:59'),
(276, 8, 23, 'Prioriza y organiza sus funciones para asegurar el cumplimiento sin reprocesos.', '2', '2', 2.00, '2025-09-26 08:19:59', '2025-09-26 08:19:59'),
(277, 9, 1, 'Utiliza canales de comunicación, en su diversa expresión, con claridad, precisión y tono agradable para el receptor', '4', '', 2.00, '2025-09-26 09:11:28', '2025-09-26 09:11:28'),
(278, 9, 2, 'Redacta textos, informes, mensajes, cuadros o  gráficas con claridad en la expresión para ser efectiva y sencilla la comprensión', '4', '', 2.00, '2025-09-26 09:11:28', '2025-09-26 09:11:28'),
(279, 9, 3, 'Mantiene escucha y lectura atenta a efectos de  comprender mejor los mensajes o información recibida.', '4', '', 2.00, '2025-09-26 09:11:28', '2025-09-26 09:11:28'),
(280, 9, 4, 'Da respuesta a cada comunicación recibida de modo inmediato', '4', '', 2.00, '2025-09-26 09:11:28', '2025-09-26 09:11:28'),
(281, 9, 5, 'Adopta las decisiones tomadas para ejercer sus actividades individuales y las adoptadas para el trabajo en equipo por preferencia', '4', '', 2.00, '2025-09-26 09:11:28', '2025-09-26 09:11:28'),
(282, 9, 6, 'Maneja criterios objetivos para analizar las formas a deducir con las personas involucradas.', '4', '', 2.00, '2025-09-26 09:11:28', '2025-09-26 09:11:28'),
(283, 9, 7, 'Aporta soluciones alternativas en lo que refiere a sus saberes específicos.', '4', '', 2.00, '2025-09-26 09:11:28', '2025-09-26 09:11:28'),
(284, 9, 8, 'Informa su experiencia especializada en el proceso de toma de decisiones que involucran aspectos de su especialidad.', '4', '', 2.00, '2025-09-26 09:11:28', '2025-09-26 09:11:28'),
(285, 9, 9, 'Anticipa problemas y posibles soluciones que advierten su carácter de especialista.', '5', '', 2.50, '2025-09-26 09:11:28', '2025-09-26 09:11:28'),
(286, 9, 10, 'Asume la interdisciplinariedad aprovechando puntos de vista diversos y alternativas al propio, para analizar y proponer soluciones posibles.', '4', '', 2.00, '2025-09-26 09:11:28', '2025-09-26 09:11:28'),
(287, 9, 11, 'Articula sus actuaciones con las de los demás', '4', '', 2.00, '2025-09-26 09:11:28', '2025-09-26 09:11:28'),
(288, 9, 12, 'Cumple los compromisos adquiridos', '4', '', 2.00, '2025-09-26 09:11:28', '2025-09-26 09:11:28'),
(289, 9, 13, 'Facilita la labor de sus supervisores y compañeros de trabajo', '4', '', 2.00, '2025-09-26 09:11:28', '2025-09-26 09:11:28'),
(290, 9, 14, 'Escucha con interés y capta las necesidades de los demás.', '4', '', 2.00, '2025-09-26 09:11:28', '2025-09-26 09:11:28'),
(291, 9, 15, 'Transmite la información de forma fidedigna evitando situaciones que puedan generar deterioro en el ambiente laboral.', '4', '', 2.00, '2025-09-26 09:11:28', '2025-09-26 09:11:28'),
(292, 9, 16, 'Toma la iniciativa en el contacto con clientes internos y externos para dar avisos, citar o respuestas, utilizando un lenguaje claro para los destinatarios.', '4', '', 2.00, '2025-09-26 09:11:28', '2025-09-26 09:11:28'),
(293, 9, 17, 'Ejecuta sus tareas con los criterios de calidad establecidos.', '4', '', 2.00, '2025-09-26 09:11:28', '2025-09-26 09:11:28'),
(294, 9, 18, 'Revisa procedimientos e instrumentos para mejorar tiempos y resultados y para anticipar soluciones a problemas.', '4', '', 2.00, '2025-09-26 09:11:28', '2025-09-26 09:11:28'),
(295, 9, 19, 'Desarrolla las actividades de acuerdo con las pautas y protocolos definidos.', '4', '', 2.00, '2025-09-26 09:11:28', '2025-09-26 09:11:28'),
(296, 9, 20, 'Cumple de manera consistente y oportuna las funciones específicas asignadas a su cargo.', '4', '', 2.00, '2025-09-26 09:11:28', '2025-09-26 09:11:28'),
(297, 9, 21, 'Demuestra dominio técnico y procedimental en las tareas críticas del rol.', '4', '', 2.00, '2025-09-26 09:11:28', '2025-09-26 09:11:28'),
(298, 9, 22, 'Entrega resultados alineados con los estándares y tiempos definidos para su cargo.', '4', '', 2.00, '2025-09-26 09:11:28', '2025-09-26 09:11:28'),
(299, 9, 23, 'Prioriza y organiza sus funciones para asegurar el cumplimiento sin reprocesos.', '4', '', 2.00, '2025-09-26 09:11:28', '2025-09-26 09:11:28'),
(300, 7, 1, 'Utiliza canales de comunicación, en su diversa expresión, con claridad, precisión y tono agradable para el receptor', '4', '4', 4.00, '2025-09-26 09:35:50', '2025-09-26 09:35:50'),
(301, 7, 2, 'Redacta textos, informes, mensajes, cuadros o  gráficas con claridad en la expresión para ser efectiva y sencilla la comprensión', '3', '3', 3.00, '2025-09-26 09:35:50', '2025-09-26 09:35:50'),
(302, 7, 3, 'Mantiene escucha y lectura atenta a efectos de  comprender mejor los mensajes o información recibida.', '4', '4', 4.00, '2025-09-26 09:35:50', '2025-09-26 09:35:50'),
(303, 7, 4, 'Da respuesta a cada comunicación recibida de modo inmediato', '4', '3', 3.50, '2025-09-26 09:35:50', '2025-09-26 09:35:50'),
(304, 7, 5, 'Adopta las decisiones tomadas para ejercer sus actividades individuales y las adoptadas para el trabajo en equipo por preferencia', '4', '4', 4.00, '2025-09-26 09:35:50', '2025-09-26 09:35:50'),
(305, 7, 6, 'Maneja criterios objetivos para analizar las formas a deducir con las personas involucradas.', '3', '4', 3.50, '2025-09-26 09:35:50', '2025-09-26 09:35:50'),
(306, 7, 7, 'Aporta soluciones alternativas en lo que refiere a sus saberes específicos.', '4', '5', 4.50, '2025-09-26 09:35:50', '2025-09-26 09:35:50'),
(307, 7, 8, 'Informa su experiencia especializada en el proceso de toma de decisiones que involucran aspectos de su especialidad.', '4', '4', 4.00, '2025-09-26 09:35:50', '2025-09-26 09:35:50'),
(308, 7, 9, 'Anticipa problemas y posibles soluciones que advierten su carácter de especialista.', '3', '3', 3.00, '2025-09-26 09:35:50', '2025-09-26 09:35:50'),
(309, 7, 10, 'Asume la interdisciplinariedad aprovechando puntos de vista diversos y alternativas al propio, para analizar y proponer soluciones posibles.', '3', '3', 3.00, '2025-09-26 09:35:50', '2025-09-26 09:35:50'),
(310, 7, 11, 'Articula sus actuaciones con las de los demás', '4', '5', 4.50, '2025-09-26 09:35:50', '2025-09-26 09:35:50'),
(311, 7, 12, 'Cumple los compromisos adquiridos', '4', '4', 4.00, '2025-09-26 09:35:50', '2025-09-26 09:35:50'),
(312, 7, 13, 'Facilita la labor de sus supervisores y compañeros de trabajo', '4', '5', 4.50, '2025-09-26 09:35:50', '2025-09-26 09:35:50'),
(313, 7, 14, 'Escucha con interés y capta las necesidades de los demás.', '4', '4', 4.00, '2025-09-26 09:35:50', '2025-09-26 09:35:50'),
(314, 7, 15, 'Transmite la información de forma fidedigna evitando situaciones que puedan generar deterioro en el ambiente laboral.', '4', '3', 3.50, '2025-09-26 09:35:50', '2025-09-26 09:35:50'),
(315, 7, 16, 'Toma la iniciativa en el contacto con clientes internos y externos para dar avisos, citar o respuestas, utilizando un lenguaje claro para los destinatarios.', '4', '4', 4.00, '2025-09-26 09:35:50', '2025-09-26 09:35:50'),
(316, 7, 17, 'Ejecuta sus tareas con los criterios de calidad establecidos.', '4', '4', 4.00, '2025-09-26 09:35:50', '2025-09-26 09:35:50'),
(317, 7, 18, 'Revisa procedimientos e instrumentos para mejorar tiempos y resultados y para anticipar soluciones a problemas.', '4', '4', 4.00, '2025-09-26 09:35:50', '2025-09-26 09:35:50'),
(318, 7, 19, 'Desarrolla las actividades de acuerdo con las pautas y protocolos definidos.', '4', '5', 4.50, '2025-09-26 09:35:50', '2025-09-26 09:35:50'),
(319, 7, 20, 'Cumple de manera consistente y oportuna las funciones específicas asignadas a su cargo.', '4', '5', 4.50, '2025-09-26 09:35:50', '2025-09-26 09:35:50'),
(320, 7, 21, 'Demuestra dominio técnico y procedimental en las tareas críticas del rol.', '3', '4', 3.50, '2025-09-26 09:35:50', '2025-09-26 09:35:50'),
(321, 7, 22, 'Entrega resultados alineados con los estándares y tiempos definidos para su cargo.', '4', '5', 4.50, '2025-09-26 09:35:50', '2025-09-26 09:35:50'),
(322, 7, 23, 'Prioriza y organiza sus funciones para asegurar el cumplimiento sin reprocesos.', '3', '4', 3.50, '2025-09-26 09:35:50', '2025-09-26 09:35:50');

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

--
-- Volcado de datos para la tabla `evaluacion_estado_historial`
--

INSERT INTO `evaluacion_estado_historial` (`id_historial`, `id_evaluacion`, `estado_anterior`, `estado_nuevo`, `fecha_cambio`, `id_usuario_cambio`, `comentario`) VALUES
(2, 2, NULL, 'AUTOEVALUACION_COMPLETADA', '2025-09-24 09:35:50', 146, NULL),
(3, 2, 'AUTOEVALUACION_COMPLETADA', 'EVALUACION_JEFE_COMPLETADA', '2025-09-24 10:49:56', NULL, NULL),
(4, 3, NULL, 'AUTOEVALUACION_COMPLETADA', '2025-09-24 12:05:44', 146, NULL),
(5, 3, 'AUTOEVALUACION_COMPLETADA', 'EVALUACION_JEFE_COMPLETADA', '2025-09-24 12:07:19', NULL, NULL),
(6, 4, NULL, 'AUTOEVALUACION_COMPLETADA', '2025-09-24 12:17:26', 130, NULL),
(7, 4, 'AUTOEVALUACION_COMPLETADA', 'EVALUACION_JEFE_COMPLETADA', '2025-09-24 12:20:34', NULL, NULL),
(8, 5, NULL, 'AUTOEVALUACION_COMPLETADA', '2025-09-25 10:39:54', 90, NULL),
(9, 6, NULL, 'AUTOEVALUACION_COMPLETADA', '2025-09-25 14:21:56', 11, NULL),
(10, 7, NULL, 'AUTOEVALUACION_PENDIENTE', '2025-09-26 05:12:40', 97, NULL),
(11, 8, NULL, 'AUTOEVALUACION_COMPLETADA', '2025-09-26 08:14:52', 146, NULL),
(12, 8, 'AUTOEVALUACION_COMPLETADA', 'EVALUACION_JEFE_COMPLETADA', '2025-09-26 08:19:59', NULL, NULL),
(13, 9, NULL, 'AUTOEVALUACION_COMPLETADA', '2025-09-26 09:11:28', 17, NULL);

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

--
-- Volcado de datos para la tabla `evaluacion_firmas`
--

INSERT INTO `evaluacion_firmas` (`id_firma`, `id_evaluacion`, `firma_empleado`, `firma_jefe`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(2, 2, 'uploads/signatures/employee_146_1758731750.png', 'uploads/signatures/boss_upd_2_1758736196.png', '2025-09-24 09:35:50', '2025-09-24 10:49:56'),
(3, 3, 'uploads/signatures/employee_146_1758740744.png', 'uploads/signatures/boss_upd_3_1758740839.png', '2025-09-24 12:05:44', '2025-09-24 12:07:19'),
(4, 4, 'uploads/signatures/employee_130_1758741446.png', 'uploads/signatures/boss_upd_4_1758741634.png', '2025-09-24 12:17:26', '2025-09-24 12:20:34'),
(5, 5, 'uploads/signatures/employee_90_1758821994.png', '', '2025-09-25 10:39:54', '2025-09-25 10:39:54'),
(6, 6, 'uploads/signatures/employee_11_1758835316.png', '', '2025-09-25 14:21:56', '2025-09-25 14:21:56'),
(7, 8, 'uploads/signatures/employee_146_1758899692.png', 'uploads/signatures/boss_upd_8_1758899999.png', '2025-09-26 08:14:52', '2025-09-26 08:19:59'),
(8, 9, 'uploads/signatures/employee_17_1758903088.png', '', '2025-09-26 09:11:28', '2025-09-26 09:11:28'),
(9, 7, '', 'uploads/signatures/boss_upd_7_1758904550.png', '2025-09-26 09:35:50', '2025-09-26 09:35:50');

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
  `necesidades_capacitacion` text DEFAULT NULL,
  `comentarios_jefe` text DEFAULT NULL,
  `fecha_revision_jefe` datetime DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `evaluacion_mejoramiento`
--

INSERT INTO `evaluacion_mejoramiento` (`id_mejoramiento`, `id_evaluacion`, `fortalezas`, `aspectos_mejorar`, `necesidades_capacitacion`, `comentarios_jefe`, `fecha_revision_jefe`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(3, 2, 'qweqdasdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaqw', 'qweqdasdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'qweqdasdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'wqwqwqwq', NULL, '2025-09-24 10:49:56', '2025-09-24 10:49:56'),
(5, 3, 'qwvwsadddddddddddddddddddddddddddddddddddddddddddddddddddddddddffffffffffqw', 'qwwsadddddddddddddddddddddddddddddddddddddddddddddddddddddddddffffffffffqw', 'qwwsadddddddddddddddddddddddddddddddddddddddddddddddddddddddddffffffffffqw', 'asddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd', NULL, '2025-09-24 12:07:19', '2025-09-24 12:07:19'),
(7, 4, 'considero que todo esta perfecto noooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo', 'ssssssssssssssssssssssssssssssssssss f sfsf algo quedo mal', 'sssssssssssssssssssssssssssssssssss sfsf', '', NULL, '2025-09-24 12:20:34', '2025-09-24 12:20:34'),
(8, 5, 'Análisis de nomina y normatividad laboral actualizada, Disciplinado.\n', 'Comunicación asertiva, tolerancia y trabajo en equipo. ', 'Inteligencia artificial, derecho laboral.', '', NULL, '2025-09-25 10:39:54', '2025-09-25 10:39:54'),
(9, 6, 'proactivo- propositivo-eficiente- influenciable-consecuente-sociable- ', 'herramientas ofimáticas como power bi -  acces - desarrollo de aplicaciones- comunicación asertiva ', 'automatización de proceso por aplicaciones - power bi - excel avanzado- analitica de datos ', '', NULL, '2025-09-25 14:21:56', '2025-09-25 14:21:56'),
(12, 8, 'wwsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfahgqw', 'wwsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfahg', 'wwsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfahg', 'wwsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfahg', NULL, '2025-09-26 08:19:59', '2025-09-26 08:19:59'),
(13, 9, 'Análisis, validación , conciliación e interpretación.\n\nSoy una persona comprometida, responsable, dedicada, confiable, reservada, con la disposición de aprender y hacer cosas nuevas.\nTengo la capacidad de adaptarme a las tareas con facilidad, soy atenta, respetuosa y trabajadora ', 'Automatizar procesos para reducir tiempos y reprocesos', 'Capacitación en normatividad, auditoría y legislación.', '', NULL, '2025-09-26 09:11:28', '2025-09-26 09:11:28'),
(14, 7, 'Organización plan de bienestar, seguimiento a las consecución de las vacantes, busco la continua mejora de aspectos relevantes para el bienestar de los procesos.\nCualidades: responsable, organizada, proactiva, versátil.\nlos entregables, cumplimiento de las labores, la colaboración al equipo, las innovación ', 'Comunicación asertiva, atención al detalle, ejecución control y seguimiento de los procesos ya que no se evidencia a la fecha.\n\nApropiación del rol y asumir la responsabilidad de elementos inherentes al cargo.', 'Procesos de selección (análisis psicotécnicos, actualización de entrevista a personal, refuerzo de informe de reclutamiento)\nEntrega de informes gerenciales.\nCapacitación de evaluaciones de clima organizacional.\nCultural organizacional.', 'Seguir con la colaboración al equipo y el mejoramiento continuo de las actividades que hasta el momento se le han asignado', NULL, '2025-09-26 09:35:50', '2025-09-26 09:35:50');

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

--
-- Volcado de datos para la tabla `evaluacion_plan_accion`
--

INSERT INTO `evaluacion_plan_accion` (`id_plan_accion`, `id_evaluacion`, `actividad`, `responsable`, `seguimiento`, `comentarios_jefe`, `aprobado_jefe`, `fecha_revision_jefe`, `fecha`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(3, 2, 'qwqwwqqwasddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd', 'wqwqwasddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd', 'qwasddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd', 'wq', 'PENDIENTE', NULL, '2025-09-24', '2025-09-24 10:49:56', '2025-09-24 10:49:56'),
(5, 3, 'asddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd', 'asddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd', 'asddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd', 'asddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd', 'PENDIENTE', NULL, '2025-09-24', '2025-09-24 12:07:19', '2025-09-24 12:07:19'),
(7, 4, 'FSDFA  F SG SDG SFA gf vsdvvsrgcas vsdfhfhfghvsv chcs gvdafg', ' FADFSDGSDGSGDHD  SG G  GSG SGSGGG G SDZG SS D', 'AFA S GS DGS GSAD GS GSDGASGSGSGZSGZSGSZD', 'GiyGDHGIDHAS HDIH AUIGDujvbf', 'PENDIENTE', NULL, '2025-09-24', '2025-09-24 12:20:34', '2025-09-24 12:20:34'),
(8, 5, '', '', '', '', 'PENDIENTE', NULL, '0000-00-00', '2025-09-25 10:39:54', '2025-09-25 10:39:54'),
(9, 6, '', '', '', '', 'PENDIENTE', NULL, '0000-00-00', '2025-09-25 14:21:56', '2025-09-25 14:21:56'),
(12, 8, 'wwsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfahg', 'wwsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfahg', 'wwsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfahg', 'wwsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfahg', 'PENDIENTE', NULL, '2025-09-26', '2025-09-26 08:19:59', '2025-09-26 08:19:59'),
(13, 9, '', '', '', '', 'PENDIENTE', NULL, '0000-00-00', '2025-09-26 09:11:28', '2025-09-26 09:11:28'),
(14, 7, 'Cursar Diplomados Cursar Diplomados Cursar Diplomados ', 'Luisa Pacheco Luisa Pacheco', '(#de diplomados realizados / # diplomados a cumplir)*100', 'Se validara periódicamente el cumplimiento y se deberá dar actualizaciones periódicas mensuales', 'PENDIENTE', NULL, '2026-04-30', '2025-09-26 09:35:50', '2025-09-26 09:35:50');

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

--
-- Volcado de datos para la tabla `evaluacion_promedios`
--

INSERT INTO `evaluacion_promedios` (`id_promedio`, `id_evaluacion`, `promedio_competencias`, `promedio_hseq`, `promedio_general`, `promedio_comunicacion_efectiva`, `promedio_instrumentalidad_decisiones`, `promedio_aporte_profesional`, `promedio_colaboracion`, `promedio_relaciones_interpersonales`, `promedio_gestion_procedimientos`, `promedio_cumplimiento_funciones`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(3, 2, 2.22, NULL, 2.22, 2.38, 2.00, 2.00, 2.50, 2.00, 2.00, 2.50, '2025-09-24 10:49:56', '2025-09-24 10:49:56'),
(5, 3, 1.89, NULL, 1.89, 2.63, 2.00, 2.13, 1.83, 1.83, 1.50, 1.25, '2025-09-24 12:07:19', '2025-09-24 12:07:19'),
(7, 4, 4.00, NULL, 4.00, 4.00, 4.00, 4.00, 4.00, 4.00, 4.00, 4.00, '2025-09-24 12:20:34', '2025-09-24 12:20:34'),
(8, 5, 3.57, 0.00, 3.57, 3.50, 4.00, 4.00, 3.00, 3.67, 3.33, 3.50, '2025-09-25 10:39:54', '2025-09-25 10:39:54'),
(9, 6, 4.48, 0.00, 4.48, 4.00, 4.50, 4.50, 4.67, 4.00, 5.00, 4.75, '2025-09-25 14:21:56', '2025-09-25 14:21:56'),
(12, 8, 2.17, NULL, 2.17, 3.38, 2.25, 2.00, 2.17, 2.00, 1.50, 1.75, '2025-09-26 08:19:59', '2025-09-26 08:19:59'),
(13, 9, 4.04, 0.00, 4.04, 4.00, 4.00, 4.25, 4.00, 4.00, 4.00, 4.00, '2025-09-26 09:11:28', '2025-09-26 09:11:28'),
(14, 7, 3.89, NULL, 3.89, 3.63, 3.75, 3.63, 4.33, 3.83, 4.17, 4.00, '2025-09-26 09:35:50', '2025-09-26 09:35:50');

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

--
-- Volcado de datos para la tabla `hseq_evaluacion`
--

INSERT INTO `hseq_evaluacion` (`id_hseq_evaluacion`, `id_empleado`, `periodo_evaluacion`, `promedio_hseq`, `estado`, `id_evaluador`, `fecha_evaluacion`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(1, 146, '2025-09', 2.25, 'COMPLETADA', 8, '2025-09-24 12:08:46', '2025-09-24 12:08:46', '2025-09-24 12:08:46'),
(2, 130, '2025-09', 4.00, 'COMPLETADA', 9, '2025-09-24 12:22:23', '2025-09-24 12:22:23', '2025-09-24 12:22:23'),
(3, 9, '2025-09', 1.95, 'COMPLETADA', 9, '2025-09-25 13:18:08', '2025-09-25 13:18:08', '2025-09-25 13:18:08');

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

--
-- Volcado de datos para la tabla `hseq_evaluacion_items`
--

INSERT INTO `hseq_evaluacion_items` (`id_item`, `id_hseq_evaluacion`, `id_responsabilidad`, `responsabilidad`, `calificacion`, `justificacion`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(1, 1, 1, 'Procurar el cuidado integral de su salud.', 5.00, 'qw', '2025-09-24 12:08:46', '2025-09-24 12:08:46'),
(2, 1, 2, 'Suministrar información clara, veraz y completa sobre su estado de salud.', 2.00, '', '2025-09-24 12:08:46', '2025-09-24 12:08:46'),
(3, 1, 3, 'Cumplir las normas, reglamentos e instrucciones del Sistema de Gestión Integral de la empresa.', 2.00, '', '2025-09-24 12:08:46', '2025-09-24 12:08:46'),
(4, 1, 4, 'Informar oportunamente al empleador o contratante acerca de los riesgos y/o peligros latentes en el desempeño de sus funciones y en su sitio de trabajo, colaborando en los planes de acción para sus posibles tratamientos.', 2.00, '', '2025-09-24 12:08:46', '2025-09-24 12:08:46'),
(5, 1, 5, 'Participar en las actividades de capacitación y entrenamiento definidas en el programa de capacitación anual de la compañía y en las demás actividades HSEQ que se realicen mostrando así su compromiso con el Sistema de Gestión Integral de la Compañía.', 2.00, '', '2025-09-24 12:08:46', '2025-09-24 12:08:46'),
(6, 1, 6, 'Participar y contribuir al cumplimiento de los objetivos del Sistema de Gestión Integral.', 2.00, '', '2025-09-24 12:08:46', '2025-09-24 12:08:46'),
(7, 1, 7, 'Conocer, aplicar e interiorizar las políticas HSEQ, demostrando su compromiso con la compañía.', 2.00, '', '2025-09-24 12:08:46', '2025-09-24 12:08:46'),
(8, 1, 8, 'Reportar oportunamente actos y condiciones inseguras que generen accidentes e incidentes laborales y ambientales. Velar para que sus colaboradores realicen los respectivos reportes.', 2.00, '', '2025-09-24 12:08:46', '2025-09-24 12:08:46'),
(9, 1, 9, 'Garantizar el cumplimiento y el control de la información documentada establecida para las diferentes actividades que se generen en la compañía y para el óptimo desarrollo de sus funciones, velando así por la disponibilidad y seguridad de la información.', 2.00, '', '2025-09-24 12:08:46', '2025-09-24 12:08:46'),
(10, 1, 10, 'Garantizar la satisfacción del cliente brindando un alto estándar de calidad en el servicio prestado.', 2.00, '', '2025-09-24 12:08:46', '2025-09-24 12:08:46'),
(11, 1, 11, 'Participar en la evaluación del cumplimiento de los aspectos HSEQ de sus colaboradores.', 2.00, '', '2025-09-24 12:08:46', '2025-09-24 12:08:46'),
(12, 1, 12, 'Portar y utilizar los elementos de protección personal requeridos, velando por su cuidado y la utilización adecuada y permanente de sus colaboradores y reportar cualquier daño en los mismos.', 2.00, '', '2025-09-24 12:08:46', '2025-09-24 12:08:46'),
(13, 1, 13, 'Participar y colaborar con las auditorias (internas y externas) del Sistema Integrado de Gestión de MERIDIAN CONSULTING.', 2.00, '', '2025-09-24 12:08:46', '2025-09-24 12:08:46'),
(14, 1, 14, 'Reducir el consumo de papel en las actividades cotidianas inherentes a su cargo y hacer uso moderado del recurso hídrico y eléctrico, y en general cualquier recurso ambiental demostrando su compromiso con el SGA de MERIDIAN CONSULTING.', 2.00, '', '2025-09-24 12:08:46', '2025-09-24 12:08:46'),
(15, 1, 15, 'Realizar la disposición adecuada de los residuos sólidos y peligrosos generados por su labor de acuerdo con lo establecido por MERIDIAN CONSULTING LTDA. o por el cliente.', 2.00, '', '2025-09-24 12:08:46', '2025-09-24 12:08:46'),
(16, 1, 16, 'Solicitar los recursos económicos, técnicos y humanos para garantizar condiciones óptimas de trabajo, logrando así la protección integral del trabajador y el medio que lo rodea.', 3.00, '', '2025-09-24 12:08:46', '2025-09-24 12:08:46'),
(17, 1, 17, 'Participar cuando se ha requerido en la investigación de los incidentes, accidentes de trabajo y enfermedad laboral asociados a su proyecto.', 1.00, '', '2025-09-24 12:08:46', '2025-09-24 12:08:46'),
(18, 1, 18, 'Participar en simulacros, elección de COPASST y elección de comité de convivencia.', 4.00, '', '2025-09-24 12:08:46', '2025-09-24 12:08:46'),
(19, 1, 19, 'Cumplir con las funciones y responsabilidades asignadas de ser elegido miembro del COPASST, Comité de convivencia laboral y/o comité de emergencias.', 2.00, '', '2025-09-24 12:08:46', '2025-09-24 12:08:46'),
(20, 1, 20, 'Diligenciar el formato de Auto reporte de Condiciones de Trabajo del Tele trabajador con el fin de determinar los peligros presentes en el lugar su trabajo.', 2.00, '', '2025-09-24 12:08:46', '2025-09-24 12:08:46'),
(21, 2, 1, 'Procurar el cuidado integral de su salud.', 4.00, '', '2025-09-24 12:22:23', '2025-09-24 12:22:23'),
(22, 2, 2, 'Suministrar información clara, veraz y completa sobre su estado de salud.', 4.00, '', '2025-09-24 12:22:23', '2025-09-24 12:22:23'),
(23, 2, 3, 'Cumplir las normas, reglamentos e instrucciones del Sistema de Gestión Integral de la empresa.', 4.00, '', '2025-09-24 12:22:23', '2025-09-24 12:22:23'),
(24, 2, 4, 'Informar oportunamente al empleador o contratante acerca de los riesgos y/o peligros latentes en el desempeño de sus funciones y en su sitio de trabajo, colaborando en los planes de acción para sus posibles tratamientos.', 4.00, '', '2025-09-24 12:22:23', '2025-09-24 12:22:23'),
(25, 2, 5, 'Participar en las actividades de capacitación y entrenamiento definidas en el programa de capacitación anual de la compañía y en las demás actividades HSEQ que se realicen mostrando así su compromiso con el Sistema de Gestión Integral de la Compañía.', 4.00, '', '2025-09-24 12:22:23', '2025-09-24 12:22:23'),
(26, 2, 6, 'Participar y contribuir al cumplimiento de los objetivos del Sistema de Gestión Integral.', 3.00, '', '2025-09-24 12:22:23', '2025-09-24 12:22:23'),
(27, 2, 7, 'Conocer, aplicar e interiorizar las políticas HSEQ, demostrando su compromiso con la compañía.', 4.00, '', '2025-09-24 12:22:23', '2025-09-24 12:22:23'),
(28, 2, 8, 'Reportar oportunamente actos y condiciones inseguras que generen accidentes e incidentes laborales y ambientales. Velar para que sus colaboradores realicen los respectivos reportes.', 4.00, '', '2025-09-24 12:22:23', '2025-09-24 12:22:23'),
(29, 2, 9, 'Garantizar el cumplimiento y el control de la información documentada establecida para las diferentes actividades que se generen en la compañía y para el óptimo desarrollo de sus funciones, velando así por la disponibilidad y seguridad de la información.', 5.00, '', '2025-09-24 12:22:23', '2025-09-24 12:22:23'),
(30, 2, 10, 'Garantizar la satisfacción del cliente brindando un alto estándar de calidad en el servicio prestado.', 4.00, '', '2025-09-24 12:22:23', '2025-09-24 12:22:23'),
(31, 2, 11, 'Participar en la evaluación del cumplimiento de los aspectos HSEQ de sus colaboradores.', 4.00, '', '2025-09-24 12:22:23', '2025-09-24 12:22:23'),
(32, 2, 12, 'Portar y utilizar los elementos de protección personal requeridos, velando por su cuidado y la utilización adecuada y permanente de sus colaboradores y reportar cualquier daño en los mismos.', 4.00, '', '2025-09-24 12:22:23', '2025-09-24 12:22:23'),
(33, 2, 13, 'Participar y colaborar con las auditorias (internas y externas) del Sistema Integrado de Gestión de MERIDIAN CONSULTING.', 4.00, '', '2025-09-24 12:22:23', '2025-09-24 12:22:23'),
(34, 2, 14, 'Reducir el consumo de papel en las actividades cotidianas inherentes a su cargo y hacer uso moderado del recurso hídrico y eléctrico, y en general cualquier recurso ambiental demostrando su compromiso con el SGA de MERIDIAN CONSULTING.', 4.00, '', '2025-09-24 12:22:23', '2025-09-24 12:22:23'),
(35, 2, 15, 'Realizar la disposición adecuada de los residuos sólidos y peligrosos generados por su labor de acuerdo con lo establecido por MERIDIAN CONSULTING LTDA. o por el cliente.', 4.00, '', '2025-09-24 12:22:23', '2025-09-24 12:22:23'),
(36, 2, 16, 'Solicitar los recursos económicos, técnicos y humanos para garantizar condiciones óptimas de trabajo, logrando así la protección integral del trabajador y el medio que lo rodea.', 4.00, '', '2025-09-24 12:22:23', '2025-09-24 12:22:23'),
(37, 2, 17, 'Participar cuando se ha requerido en la investigación de los incidentes, accidentes de trabajo y enfermedad laboral asociados a su proyecto.', 4.00, '', '2025-09-24 12:22:23', '2025-09-24 12:22:23'),
(38, 2, 18, 'Participar en simulacros, elección de COPASST y elección de comité de convivencia.', 4.00, '', '2025-09-24 12:22:23', '2025-09-24 12:22:23'),
(39, 2, 19, 'Cumplir con las funciones y responsabilidades asignadas de ser elegido miembro del COPASST, Comité de convivencia laboral y/o comité de emergencias.', 4.00, '', '2025-09-24 12:22:23', '2025-09-24 12:22:23'),
(40, 2, 20, 'Diligenciar el formato de Auto reporte de Condiciones de Trabajo del Tele trabajador con el fin de determinar los peligros presentes en el lugar su trabajo.', 4.00, '', '2025-09-24 12:22:23', '2025-09-24 12:22:23'),
(41, 3, 1, 'Procurar el cuidado integral de su salud.', 1.00, '', '2025-09-25 13:18:08', '2025-09-25 13:18:08'),
(42, 3, 2, 'Suministrar información clara, veraz y completa sobre su estado de salud.', 2.00, '', '2025-09-25 13:18:08', '2025-09-25 13:18:08'),
(43, 3, 3, 'Cumplir las normas, reglamentos e instrucciones del Sistema de Gestión Integral de la empresa.', 2.00, '', '2025-09-25 13:18:08', '2025-09-25 13:18:08'),
(44, 3, 4, 'Informar oportunamente al empleador o contratante acerca de los riesgos y/o peligros latentes en el desempeño de sus funciones y en su sitio de trabajo, colaborando en los planes de acción para sus posibles tratamientos.', 2.00, '', '2025-09-25 13:18:08', '2025-09-25 13:18:08'),
(45, 3, 5, 'Participar en las actividades de capacitación y entrenamiento definidas en el programa de capacitación anual de la compañía y en las demás actividades HSEQ que se realicen mostrando así su compromiso con el Sistema de Gestión Integral de la Compañía.', 1.00, '', '2025-09-25 13:18:08', '2025-09-25 13:18:08'),
(46, 3, 6, 'Participar y contribuir al cumplimiento de los objetivos del Sistema de Gestión Integral.', 2.00, '', '2025-09-25 13:18:08', '2025-09-25 13:18:08'),
(47, 3, 7, 'Conocer, aplicar e interiorizar las políticas HSEQ, demostrando su compromiso con la compañía.', 1.00, '', '2025-09-25 13:18:08', '2025-09-25 13:18:08'),
(48, 3, 8, 'Reportar oportunamente actos y condiciones inseguras que generen accidentes e incidentes laborales y ambientales. Velar para que sus colaboradores realicen los respectivos reportes.', 1.00, '', '2025-09-25 13:18:08', '2025-09-25 13:18:08'),
(49, 3, 9, 'Garantizar el cumplimiento y el control de la información documentada establecida para las diferentes actividades que se generen en la compañía y para el óptimo desarrollo de sus funciones, velando así por la disponibilidad y seguridad de la información.', 1.00, '', '2025-09-25 13:18:08', '2025-09-25 13:18:08'),
(50, 3, 10, 'Garantizar la satisfacción del cliente brindando un alto estándar de calidad en el servicio prestado.', 2.00, '', '2025-09-25 13:18:08', '2025-09-25 13:18:08'),
(51, 3, 11, 'Participar en la evaluación del cumplimiento de los aspectos HSEQ de sus colaboradores.', 4.00, '', '2025-09-25 13:18:08', '2025-09-25 13:18:08'),
(52, 3, 12, 'Portar y utilizar los elementos de protección personal requeridos, velando por su cuidado y la utilización adecuada y permanente de sus colaboradores y reportar cualquier daño en los mismos.', 3.00, '', '2025-09-25 13:18:08', '2025-09-25 13:18:08'),
(53, 3, 13, 'Participar y colaborar con las auditorias (internas y externas) del Sistema Integrado de Gestión de MERIDIAN CONSULTING.', 1.00, '', '2025-09-25 13:18:08', '2025-09-25 13:18:08'),
(54, 3, 14, 'Reducir el consumo de papel en las actividades cotidianas inherentes a su cargo y hacer uso moderado del recurso hídrico y eléctrico, y en general cualquier recurso ambiental demostrando su compromiso con el SGA de MERIDIAN CONSULTING.', 3.00, '', '2025-09-25 13:18:08', '2025-09-25 13:18:08'),
(55, 3, 15, 'Realizar la disposición adecuada de los residuos sólidos y peligrosos generados por su labor de acuerdo con lo establecido por MERIDIAN CONSULTING LTDA. o por el cliente.', 3.00, '', '2025-09-25 13:18:08', '2025-09-25 13:18:08'),
(56, 3, 16, 'Solicitar los recursos económicos, técnicos y humanos para garantizar condiciones óptimas de trabajo, logrando así la protección integral del trabajador y el medio que lo rodea.', 2.00, '', '2025-09-25 13:18:08', '2025-09-25 13:18:08'),
(57, 3, 17, 'Participar cuando se ha requerido en la investigación de los incidentes, accidentes de trabajo y enfermedad laboral asociados a su proyecto.', 2.00, '', '2025-09-25 13:18:08', '2025-09-25 13:18:08'),
(58, 3, 18, 'Participar en simulacros, elección de COPASST y elección de comité de convivencia.', 2.00, '', '2025-09-25 13:18:08', '2025-09-25 13:18:08'),
(59, 3, 19, 'Cumplir con las funciones y responsabilidades asignadas de ser elegido miembro del COPASST, Comité de convivencia laboral y/o comité de emergencias.', 2.00, '', '2025-09-25 13:18:08', '2025-09-25 13:18:08'),
(60, 3, 20, 'Diligenciar el formato de Auto reporte de Condiciones de Trabajo del Tele trabajador con el fin de determinar los peligros presentes en el lugar su trabajo.', 2.00, '', '2025-09-25 13:18:08', '2025-09-25 13:18:08');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cargo`
--
ALTER TABLE `cargo`
  ADD PRIMARY KEY (`id_cargo`);

--
-- Indices de la tabla `detalle_evaluacion`
--
ALTER TABLE `detalle_evaluacion`
  ADD PRIMARY KEY (`id_detalle_evaluacion`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id_empleado`);

--
-- Indices de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  ADD PRIMARY KEY (`id_evaluacion`),
  ADD KEY `fk_evaluacion_empleado` (`id_empleado`),
  ADD KEY `fk_evaluacion_jefe` (`id_jefe`);

--
-- Indices de la tabla `evaluacion_acta_compromiso`
--
ALTER TABLE `evaluacion_acta_compromiso`
  ADD PRIMARY KEY (`id_acta_compromiso`),
  ADD KEY `fk_acta_compromiso_evaluacion` (`id_evaluacion`);

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
  ADD KEY `fk_historial_evaluacion` (`id_evaluacion`);

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
  ADD PRIMARY KEY (`id_hseq`);

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
  ADD PRIMARY KEY (`id_hseq_evaluacion`);

--
-- Indices de la tabla `hseq_evaluacion_items`
--
ALTER TABLE `hseq_evaluacion_items`
  ADD PRIMARY KEY (`id_item`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cargo`
--
ALTER TABLE `cargo`
  MODIFY `id_cargo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `detalle_evaluacion`
--
ALTER TABLE `detalle_evaluacion`
  MODIFY `id_detalle_evaluacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=197;

--
-- AUTO_INCREMENT de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  MODIFY `id_evaluacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `evaluacion_acta_compromiso`
--
ALTER TABLE `evaluacion_acta_compromiso`
  MODIFY `id_acta_compromiso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `evaluacion_competencias`
--
ALTER TABLE `evaluacion_competencias`
  MODIFY `id_competencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=323;

--
-- AUTO_INCREMENT de la tabla `evaluacion_estado_historial`
--
ALTER TABLE `evaluacion_estado_historial`
  MODIFY `id_historial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `evaluacion_firmas`
--
ALTER TABLE `evaluacion_firmas`
  MODIFY `id_firma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `evaluacion_hseq`
--
ALTER TABLE `evaluacion_hseq`
  MODIFY `id_hseq` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `evaluacion_mejoramiento`
--
ALTER TABLE `evaluacion_mejoramiento`
  MODIFY `id_mejoramiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `evaluacion_plan_accion`
--
ALTER TABLE `evaluacion_plan_accion`
  MODIFY `id_plan_accion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `evaluacion_promedios`
--
ALTER TABLE `evaluacion_promedios`
  MODIFY `id_promedio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `hseq_evaluacion`
--
ALTER TABLE `hseq_evaluacion`
  MODIFY `id_hseq_evaluacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `hseq_evaluacion_items`
--
ALTER TABLE `hseq_evaluacion_items`
  MODIFY `id_item` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  ADD CONSTRAINT `fk_evaluacion_empleado` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_evaluacion_jefe` FOREIGN KEY (`id_jefe`) REFERENCES `empleados` (`id_empleado`) ON DELETE SET NULL;

--
-- Filtros para la tabla `evaluacion_acta_compromiso`
--
ALTER TABLE `evaluacion_acta_compromiso`
  ADD CONSTRAINT `fk_acta_compromiso_evaluacion` FOREIGN KEY (`id_evaluacion`) REFERENCES `evaluacion` (`id_evaluacion`) ON DELETE CASCADE;

--
-- Filtros para la tabla `evaluacion_competencias`
--
ALTER TABLE `evaluacion_competencias`
  ADD CONSTRAINT `fk_competencias_evaluacion` FOREIGN KEY (`id_evaluacion`) REFERENCES `evaluacion` (`id_evaluacion`) ON DELETE CASCADE;

--
-- Filtros para la tabla `evaluacion_estado_historial`
--
ALTER TABLE `evaluacion_estado_historial`
  ADD CONSTRAINT `fk_historial_evaluacion` FOREIGN KEY (`id_evaluacion`) REFERENCES `evaluacion` (`id_evaluacion`) ON DELETE CASCADE;

--
-- Filtros para la tabla `evaluacion_firmas`
--
ALTER TABLE `evaluacion_firmas`
  ADD CONSTRAINT `fk_firmas_evaluacion` FOREIGN KEY (`id_evaluacion`) REFERENCES `evaluacion` (`id_evaluacion`) ON DELETE CASCADE;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
