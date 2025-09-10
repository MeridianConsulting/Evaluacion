-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-09-2025 a las 17:13:35
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
(56, 'Asistente de Gestión Humana y Nómina', 'Apoyar al Coordinador(a) contable y financiero(a) a analizar, ajustar e interpretar la información financiera de la empresa, sus Consorcios y uniones temporales con el plan de cuentas,  las políticas y normas legalmente establecidas conforme a la aplicación contable en Colombia y Las Normas Internacionales de Información Financiera NIIF.', 'Gestión Humana'),
(57, 'Soporte IT Primer Nivel', 'Apoyar la labor Administrativa de MERIDIAN CONSULTINGLTOA por medio de actividades asistenciales', 'Gestión Administrativa'),
(58, 'Asistente Administrativo', 'Apoyar la labor Administrativa de MERIDIAN CONSULTING LTOA por medio de actividades asistenciales aplicando las normas y procedimientos establecidos, garantizando asi la prestacion efectiva del servicio.', 'Gestión Administrativa'),
(59, 'Subgerente', 'Supervisar y tomar decisiones en conjunto con el Gerente general, acerca de problemas que tengan que ver con los clientes o al interior de la empresa. Planificar, coordinar y supervisar las actividades, recursos, infraestructura y desempeño de la Organización; analizando el desempeño de las diferentes áreas y sus procesos, elaborando e implementando en forma coordinada con los respetivos jefes de áreas: programas, presupuestos, políticas, procedimientos y métodos de evaluación y seguimiento; con el fin  que la Organización tenga un eficiente desempeño y se cumpla con los objetivos y metas estratégicas.', 'Gestión Estratégica'),
(60, 'Contador Junior', 'Apoyar al Coordinador(a) contable y financiero(a) a analizar, ajustar e interpretar la información financiera de la empresa, sus Consorcios y uniones temporales con el plan de cuentas,  las políticas y normas legalmente establecidas conforme a la aplicación contable en Colombia y Las Normas Internacionales de Información Financiera NIIF.', 'Gestión Contable'),
(61, 'Soporte Hseq', 'Apoyar en la implementación, mantenimiento y mejora de el Sistema de Gestión Integral HSEQ dentro de la Empresa', 'Gestión HSEQ'),
(62, 'Coordinador de Gestión Humana', 'Planear, ejecutar y dirigir el área de gestión humana de MERIDIAN CONSULTING LTDA., con el fin de asegurar el funcionamiento óptimo de cada uno de los procesos relacionados con el área conforme a las políticas y procedimientos establecidos por la Compañía.', 'Gestión Humana'),
(63, 'Coordinador Hseq', 'Diseñar, establecer, implementar, mantener y mejorar el Sistema de Gestión Integral HSEQ dentro de la Empresa', 'Gestión HSEQ'),
(64, 'Gerente Administrativa Y Financiera', 'Planear, ejecutar y dirigir la gestión administrativa y financiera de MERIDIAN CONSULTING LTDA., con el fin de asegurar el funcionamiento óptimo de todas las áreas conforme a las políticas y objetivos de la Compañía.', 'Gestión Estratégica'),
(65, 'Servicios Generales', 'Realizar las labores de aseo, limpieza y cafetería, para brindar comodidad a los funcionarios y visitantes en los sitios de trabajo del área a la cual está prestando los servicios, conforme a las normas y procedimientos vigentes de la compañía.', 'Gestión Administrativa'),
(66, 'Asistente de Nomina y gestion humana', 'Apoyar al Coordinador(a) contable y financiero(a) a analizar, ajustar e interpretar la información financiera de la empresa, sus Consorcios y uniones temporales con el plan de cuentas,  las políticas y normas legalmente establecidas conforme a la aplicación contable en Colombia y Las Normas Internacionales de Información Financiera NIIF.', 'Gestión Humana'),
(67, 'Gerente General', '1). Representar a la sociedad ante los socios, terceros y toda clase de autoridades del orden administrativo o jurisdiccional, en los alcances definidos por la junta de socios, cumplir y hacer cumplir las determinaciones, órdenes o instrucciones de la Junta de Socios.\r\n2). Planificar, organizar, controlar, desarrollar y liderar la  compañía, con el fin de que la organización tenga un eficiente desempeño y se cumpla con los objetivos y metas estratégicas.', 'Gestión Estratégica'),
(68, 'Coordinador Contable y Financiero', 'Analizar, ajustar e interpretar la información financiera de la empresa, sus Consorcios y Uniones Temporales con el plan de cuentas,  las políticas y normas legalmente establecidas conforme a la aplicación contable en Colombia y Las Normas Internacionales de Información Financiera NIIF.', 'Gestión Contable'),
(69, 'Asistente Contable', 'Recopilar informacion contable y financiera de la empresa, sus Consorcios y uniones temporales con el plan de cuentas,  las políticas y normas legalmente establecidas conforme a la aplicación contable en Colombia y Las Normas Internacionales de Información Financiera NIIF y en apoyo al  Coordinador(a) contable y financiero(a) analizarla, ajustarla e interpretarla, a fin de garantizar la presentacion de  estados financieros confiables y oportunos.', 'Gestión Contable'),
(70, 'Analista Contable', 'Recopilar informacion contable y financiera de la empresa, sus Consorcios y uniones temporales con el plan de cuentas,  las políticas y normas legalmente establecidas conforme a la aplicación contable en Colombia y Las Normas Internacionales de Información Financiera NIIF y en apoyo al  Coordinador(a) contable y financiero(a) analizarla, ajustarla e interpretarla, a fin de garantizar la presentacion de  estados financieros confiables y oportunos.', 'Gestión Contable'),
(71, 'Profesional Especialista', 'Servicio para la caracterización y Gestión del Yacimiento, y/o la construcción de escenarios de subsuelo y/o la planeación lntegrada del desarrollo, y/o la Integración y análisis de oportunidades de desarrollo y el Análisis de resultados y acciones de mejora al plan integrado de desarrollo en las disciplinas de geología, petrofísica, Ingenieria de yacimientos, data analytics y modelador PID para la gerencia de desarrollo socios y offshore GAC.', 'Gestión de Proyectos'),
(72, 'Profesional Senior', 'Servicio para la caracterización y Gestión del Yacimiento, y/o la construcción de escenarios de subsuelo y/o la planeación lntegrada del desarrollo, y/o la Integración y análisis de oportunidades de desarrollo y el Análisis de resultados y acciones de mejora al plan integrado de desarrollo en las disciplinas de geología, petrofísica, Ingenieria de yacimientos, data analytics y modelador PID para la gerencia de desarrollo socios y offshore GAC.', 'Gestión de Proyectos'),
(73, 'Profesional Junior', 'Servicio para la caracterización y gestión del yacimiento, y/o la construcción de escenarios de subsuelo y/o la planeación integrada del desarrollo, y/o la integración y análisis de oportunidades de desarrollo y el análisis de resultados y acciones de mejora al plan integrado de desarrollo de activos GOR y GPA', 'Gestión de Proyectos'),
(74, 'Profesional Basico', 'Servicio para la caracterización y gestión del yacimiento, y/o la construcción de escenarios de subsuelo y/o la planeación integrada del desarrollo, y/o la integración y análisis de oportunidades de desarrollo y el análisis de resultados y acciones de mejora al plan integrado de desarrollo de activos GOR y GPA', 'Gestión de Proyectos'),
(75, 'Soporte Operativo T5A', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestión de Proyectos'),
(76, 'Supervisor de Operaciones en Pozos T4', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestión de Proyectos'),
(77, 'Soporte Operativo T4A', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestión de Proyectos'),
(78, 'Supervisor de Operaciones en Pozos T2', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestión de Proyectos'),
(79, 'Supervisor de Operaciones en Pozos T3', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestión de Proyectos'),
(80, 'Supervisor de Operaciones en Pozos T1', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestión de Proyectos'),
(81, 'Soporte Operativo T3B', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestión de Proyectos'),
(82, 'Profesional HSEQ', 'Implementar, mantener y promover la mejora continua de el Sistema de Gestión Integral HSEQ dentro de la Empresa', 'Gestión HSEQ'),
(83, 'PROF. DE PROYECTO EN ENTRENAMIENTO', '', ''),
(84, 'SOPORTE OPERATIVO 4A', '', ''),
(85, 'SOPORTE OPERATIVO 5A', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestión de Proyectos'),
(86, 'Profesional Senior para la ejecución de actividades de la ODS No. 9770807 del contrato Matriz No. 30', 'SERVICIO PARA MONITOREO DE YACIMIENTOS, CONSTRUCCIÓN DE ESCENARIOS DE SUBSUELO Y SOPORTE A LOS PLANES INTEGRADOS DE DESARROLLO, MADURACIÓN DE OPORTUNIDADES DE DESARROLLO EN EL CORTO Y LARGO PLAZO, A LOS PROYECTOS EN MADURACIÓN Y EJECUCIÓN QUE SOPORTA LA GERENCIA DE DESARROLLO ORINOQUIA EN LOS CAMPOS DE LA VRO – DURANTE EL 2do SEMESTRE DE 2024', 'Gestión de Proyectos'),
(87, 'Director de Proyecto Ecopetrol', 'Planificar, dirigir, ejecutar y controlar el desarrollo del proyecto involucrando a todas las areas de la compañía', 'Gestion proyectos'),
(88, 'Profesional de Proyectos', 'Ejecutar junto con el Director del proyecto, el plan de trabajo de cada proyecto teniendo en cuenta los requerimientos contractuales, los aspectos logísticos, administrativos, financieros y técnicos.', 'Gestion proyectos'),
(89, 'Profesional Administrativa y de Gestión Humana, Proyectos', 'Apoyar las laboresde  Gestion Administrativa y de Gestión Humana de MERIDIAN CONSULTING LTDA por medio de actividades que aseguren su optimo funcionamiento y cumplimiento de objetivos de la compañia, aplicando las normas y procedimientos establecidos, garantizando así la prestación efectiva del servicio,', 'Gestión Administrativa'),
(90, 'Soporte Hseq II', 'Apoyar en la implementación, mantenimiento y mejora de el Sistema de Gestión Integral HSEQ dentro de la Empresa', 'Gestión HSEQ'),
(91, 'Tecnico Asistente Administrativa', 'Apoyar la labor Administrativa de MERIDIAN CONSULTINGLTOA por medio de actividades asistenciales aplicando las normas y procedimientos establecidos, garantizando así la prestación efectiva del servicio', 'Gestion proyectos'),
(92, 'Supervisor de Operaciones en Pozos Tipo 4', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestion proyectos'),
(93, 'Soporte Operativo Tipo 3A', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestion proyectos'),
(94, 'Soporte Operativo Tipo 3B', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestion proyectos'),
(95, 'Soporte Operativo Tipo 4A', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestion proyectos'),
(96, 'Supervisor de Operaciones en Pozos Tipo 2', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestion proyectos'),
(97, 'Supervisor de Operaciones en Pozos Tipo 3', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestion proyectos'),
(98, 'Soporte Operativo Tipo 5A', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestion proyectos'),
(99, 'Soporte Operativo Tipo 4B', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestion proyectos'),
(100, 'Profesional Soporte en Campo', 'Ejecutar junto con el Director del proyecto y/o el Coordinador de proyecto y/o el gerente general, el plan de trabajo de cada proyecto teniendo en cuenta los requerimientos contractuales, los aspectos logísticos, administrativos, técnicos,servicios de supervision y/o soporte integral de operaciones de pozos (Estandar API)', 'Gestion proyectos'),
(101, 'Supervisor de Operaciones en Pozos Tipo 1', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestion proyectos'),
(102, 'Soporte Operativo Tipo 1', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestion proyectos'),
(103, 'Soporte Operativo Tipo 2', 'SERVICIOS DE SUPERVISION INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL', 'Gestion proyectos'),
(104, 'Profesional de proyectos M1', 'Coordinar junto con el Director del proyecto la ejecucion del mismo  teniendo en cuenta la parte logística, administrativa y técnica.', 'Gestion proyectos'),
(105, 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D3', 'Soporte de ingeniería y operaciones en campo', 'Gestion proyectos'),
(106, 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D2', 'Soporte de ingeniería y operaciones en campo', 'Gestion proyectos'),
(107, 'Profesional de Proyectos A1', 'Coordinar junto con el Director del proyecto la ejecución del mismo teniendo en cuenta la parte logística, administrativa y técnica.', 'Gestion proyectos'),
(108, 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D1', 'Soporte de ingeniería y operaciones en campo', 'Gestion proyectos'),
(109, 'Profesional de Proyectos B1', 'Ejecutar junto con el Director del proyecto y/o el Coordinador de proyecto y/o el gerente general, el plan de trabajo de cada proyecto teniendo en cuenta los requerimientos contractuales, los aspectos logísticos, administrativos, financieros y técnicos.', 'Gestion proyectos'),
(110, '1016037506E', '', ''),
(111, 'Funciones_Asistente_Contable', '', ''),
(112, '1121936876', '', ''),
(113, '1014180459', '', ''),
(114, '43728382E', '', ''),
(115, '1014216060E', '', ''),
(116, '52967140E', '', ''),
(117, '52844528E', '', ''),
(118, '1032414423E', '', ''),
(119, '478731E', '', ''),
(120, '1128452509E', '', ''),
(121, '1010056001E', '', ''),
(122, '40936668E', '', ''),
(123, '1128474161E', '', ''),
(124, '80883010E', '', ''),
(125, '80170660E', '', ''),
(126, '1075284985E', '', ''),
(127, '83042295E', '', ''),
(128, '1152210959E', '', ''),
(129, '1022380991E', '', ''),
(130, '1115069820E', '', ''),
(131, '331789E', '', ''),
(132, '1151954545E', '', ''),
(133, '1019011177E', '', ''),
(134, '1047451443E', '', ''),
(135, '1032467291E', '', ''),
(136, '1140847297E', '', ''),
(137, '30405867E', '', ''),
(138, '1095826986E', '', ''),
(139, '1026255124E', '', ''),
(140, '1075292422E', '', ''),
(141, '1056709240E', '', ''),
(142, '53103915E', '', ''),
(143, '1098725794E', '', ''),
(144, '1075292404E', '', ''),
(145, '1098755426E', '', ''),
(146, '1110502030E', '', ''),
(147, '30400528E', '', ''),
(148, '1026292916E', '', ''),
(149, '52969518E', '', ''),
(150, '1075293846E', '', ''),
(151, '1049619319E', '', ''),
(152, '1091660311E', '', ''),
(153, '1010167959E', '', ''),
(154, '1098739269E', '', ''),
(155, '63527981E', '', ''),
(156, '1085247861E', '', ''),
(157, '91520047E', '', ''),
(158, '10297751E', '', ''),
(159, '1026267749E', '', ''),
(160, '1098782789E', '', ''),
(161, '13740129E', '', ''),
(162, '1012387614E', '', ''),
(163, '37514608E', '', ''),
(164, '1075286382E', '', ''),
(165, '1098697791E', '', ''),
(166, '13720871E', '', ''),
(167, '1023961699E', '', ''),
(168, '1098733967E', '', ''),
(169, '1072699593E', '', ''),
(170, '1007555164E', '', ''),
(171, '63540751E', '', ''),
(172, '1143327261E', '', ''),
(173, '80777836E', '', ''),
(174, '1018455383E', '', ''),
(175, '1098745210E', '', ''),
(176, '1016597E', '', ''),
(177, '1013633604E', '', ''),
(178, '1003934174E', '', ''),
(179, '91524899E', '', ''),
(180, '1045706790E', '', ''),
(181, '1040746072E', '', ''),
(182, '1014262113E', '', ''),
(183, '37546080E', '', ''),
(184, '1075212439E', '', ''),
(185, '1098726424E', '', ''),
(186, '1087047704E', '', ''),
(187, '1098663949E', '', ''),
(188, '1032398017E', '', ''),
(189, '506169E', '', ''),
(190, '80074517E', '', ''),
(191, '1013629348E', '', ''),
(192, '91514446E', '', ''),
(193, '1053792535E', '', ''),
(194, '79686130E', '', ''),
(195, '1098605467E', '', ''),
(196, '1098795831E', '', ''),
(197, '1098610954E', '', ''),
(198, '1101693549E', '', ''),
(199, '1098692205E', '', ''),
(200, '1065599609E', '', ''),
(201, '1098758681E', '', ''),
(202, '1098706838E', '', ''),
(203, '91527985E', '', ''),
(204, '1098681773E', '', ''),
(205, '1091668362E', '', ''),
(206, '51781946E', '', ''),
(207, '1100961505E', '', ''),
(208, '74085101E', '', ''),
(209, '1101692935E', '', ''),
(210, '13959717E', '', ''),
(211, '52455261E', '', ''),
(212, '1121941649E', '', ''),
(213, 'Funciones_Profe_Proyecto_Ii', '', ''),
(214, 'A_Company_Man_D1', '', ''),
(215, 'A_Company_Man_D2', '', ''),
(216, 'A_Company_Man_D3', '', ''),
(217, 'Supervisor_Operaciones_Tipo_1', '', ''),
(218, 'Supervisor_Operaciones_Tipo_2', '', ''),
(219, 'Supervisor_Operaciones_Tipo_3', '', ''),
(220, 'Supervisor_Operaciones_Tipo_4', '', ''),
(221, 'Supervisor_Operaciones_Tipo_5', '', ''),
(222, 'Supervisor_Operaciones_Tipo_6', '', ''),
(223, 'Soporte_Operativo_Tipo_1', '', ''),
(224, 'Soporte_Operativo_Tipo_2', '', ''),
(225, 'Soporte_Operativo_Tipo_3A', '', ''),
(226, 'Soporte_Operativo_Tipo_3B', '', ''),
(227, 'Sop_Ope_Tipo_3A_Conductores', '', ''),
(228, 'Soporte_Operativo_Tipo_4A', '', ''),
(229, 'Soporte_Operativo_Tipo_4B', '', ''),
(230, 'Sop_Ope_Tipo_4A_Conductores', '', ''),
(231, 'Soporte_Operativo_Tipo_5A', '', ''),
(232, 'Soporte_Operativo_Tipo_5B', '', ''),
(233, 'Sop_Ope_Tipo_5A_Conductores', '', ''),
(234, 'Pro Especialista Helman', '', ''),
(235, 'Funciones_Analista_Contable', '', ''),
(236, 'Profesional Senior Juan -3', '', ''),
(237, 'Profesional Senior Edisson', '', ''),
(238, 'Profesional Junior Edgar', '', ''),
(239, 'Profesional Basico Denissary', '', ''),
(240, 'Profesional Senior Caroly', '', ''),
(241, 'Profesional Senior Manuel', '', ''),
(242, 'Profesional Senior Eduar', '', ''),
(243, 'Profesional Senior  Willliam', '', ''),
(244, 'Profesional Senior Carlos', '', ''),
(245, 'Profesional Junior Juan -3', '', ''),
(246, 'Profesional Junior  Dilan', '', ''),
(247, 'Profesional Basico Laura', '', ''),
(248, 'Profesional Basico  Sonia', '', ''),
(249, 'Profesional Especialista Carlos', '', ''),
(250, 'Profesional Senior Jose', '', ''),
(251, 'Profesional Senior Victor', '', ''),
(252, 'Profesional Senior Gloria', '', ''),
(253, 'Profesional Junior Juan -2', '', ''),
(254, 'Profesional Junior Jhan', '', ''),
(255, 'Profesional Junior Gerardo', '', ''),
(256, 'Profesional Junior Angie', '', ''),
(257, 'Profesional Junior Christian', '', ''),
(258, 'Profesional Junior Xiomara', '', ''),
(259, 'Profesional Junior Gustavo', '', ''),
(260, 'Profesional Senior Maria M', '', ''),
(261, 'Profesional Junior Carlos -3', '', ''),
(262, 'Profesional Junior Alberto', '', ''),
(263, '1032446831E', '', ''),
(264, 'Profesional Junior Jean', '', ''),
(265, 'Profesional Junior Yohan', '', ''),
(266, 'Profesional Junior Jose A', '', ''),
(267, 'Profesional Especialista Mario', '', ''),
(268, 'Profesional Especialista Jorge', '', ''),
(269, 'Profesional Especialista Gladys', '', ''),
(270, 'Profesional Especialista Oscar', '', ''),
(271, 'Profe Especialista Alexander', '', ''),
(272, 'Profesional Senior Angelica', '', ''),
(273, 'Profesional Senior Gabriel', '', ''),
(274, 'Profesional Senior Mariann', '', ''),
(275, 'Profesional Senior Diana', '', ''),
(276, 'Profesional Senior Juan', '', ''),
(277, 'Profesional Especialista Ruben', '', ''),
(278, 'Profesional Senior Gilberto', '', ''),
(279, 'Profesional Senior Leidy', '', ''),
(280, 'Profesional Senior Jorge', '', ''),
(281, 'Profesional Junior William', '', ''),
(282, 'Profesional Senior Max', '', ''),
(283, 'Profesional Junior Andres', '', ''),
(284, 'Profesional Junior Lady', '', ''),
(285, 'Profesional Junior Ana', '', ''),
(286, 'Profesional Junior Luisa', '', ''),
(287, 'Profesional Junior Julian', '', ''),
(288, 'Profesional Junior Alexandra', '', ''),
(289, 'Profesional Junior Maylin', '', ''),
(290, 'Profesional Junior Karen', '', ''),
(291, 'Profesional Junior Carlos -2', '', ''),
(292, 'Profesional Senior Camila', '', ''),
(293, 'Profesional Senior Ruben G', '', ''),
(294, 'Profesional Senior Oscar', '', ''),
(295, 'Profesional Senior Ivan', '', ''),
(296, 'Profesional Senior Daniel', '', ''),
(297, 'Profesional Junior Ruben Ortiz', '', ''),
(298, 'Profesional Junior Juan', '', ''),
(299, 'Profesional Junior Jose', '', ''),
(300, 'Profesional Basico Camilo', '', ''),
(301, 'Profesional Basico Fernanda', '', ''),
(302, 'Profesional Basico Nicolas', '', ''),
(303, 'Profesional Senior Eduardo', '', ''),
(304, 'Profesional Senior Alejandro', '', ''),
(305, 'Profesional Senior Carolina', '', ''),
(306, 'Profesional Basico  Daniela', '', ''),
(307, 'Pro Especialista Adriana', '', ''),
(308, 'Funciones_Soporte_It', '', ''),
(309, 'Profesional Senior Mario', '', ''),
(310, 'Profesional Junior Liz', '', ''),
(311, 'Prof_ Soporte Op_Campo', '', ''),
(312, 'Funciones_Sop_Hseqcm', '', ''),
(313, 'Funciones_Asis_Admon_Cm', '', ''),
(314, 'Funciones_Gerente_General', '', ''),
(315, 'Funciones_Subgerente', '', ''),
(316, 'Funciones_Gerente_Administratvo', '', ''),
(317, 'Funciones_Director_Proyectos', '', ''),
(318, 'Funciones_Coordinador_Hseq', '', ''),
(319, 'Funciones_Coordinador_Contable', '', ''),
(320, 'Funciones_Coordinador_Gh', '', ''),
(321, 'Funciones_Profesional_Hseq', '', ''),
(322, 'Funciones_Prof_Proye_Mb', '', ''),
(323, 'Funciones_Contador_Junior', '', ''),
(324, 'Funciones_Contador_Junior_Al', '', ''),
(325, 'Funciones_Soporte_Hseq_Adm', '', ''),
(326, 'Funciones_Asistente_Gh', '', ''),
(327, 'Funciones_Analista_Nomina', '', ''),
(328, 'Funciones_Asistente_Adm_Dis', '', ''),
(329, 'Funciones_Asistente_Adm_Dis_Ii', '', ''),
(330, 'Funciones_Asistente_Adm', '', ''),
(331, 'Funciones_Asistente_Logistica', '', ''),
(332, 'Funciones_Servicios_Generales', '', ''),
(333, 'Funciones_Prof_Proye_Alta', '', ''),
(334, 'Funciones_Asistente_Licitacione', '', ''),
(335, 'Profesional Admon_Gh_Cm', '', ''),
(336, 'Aprendiz Programacion', '', '');

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
  `numero_telefonico` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefono_empresa` varchar(20) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `proyecto` varchar(100) DEFAULT NULL,
  `ods` varchar(100) DEFAULT NULL,
  `rol` varchar(20) NOT NULL DEFAULT 'empleado'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id_empleado`, `cedula`, `nombre`, `tipo_documento`, `cargo`, `area`, `fecha_inicio_contrato`, `numero_telefonico`, `email`, `telefono_empresa`, `contrasena`, `proyecto`, `ods`, `rol`) VALUES
(581, 1022942596, 'ANDREA IRENE DEL PILAR PINZON', 'Cédula de Ciudadanía', 'Asistente de Gestión Humana y Nómina', 'Administracion', '2024-08-13', '000000', 'asistentegestionhumana@meridian.com.co', '000000', '1022942596', 'ADMINISTRACION', '', 'empleado'),
(582, 1007627524, 'ANDRES CAMILO CARDENAS REYES', 'Cédula de Ciudadanía', 'Soporte IT Primer Nivel', 'Administracion', '2023-12-04', '000000', 'soporteit.nivel1@meridian.com.co', '000000', '1007627524', 'ADMINISTRACION', '', 'empleado'),
(583, 1014251428, 'AURA ALEJANDRA CONTRERAS TORRES', 'Cédula de Ciudadanía', 'Asistente Administrativo', 'Administracion', '2020-12-01', '000000', 'asistenteadministrativo1@meridian.com.co', '000000', '1014251428', 'ADMINISTRACION', '', 'empleado'),
(584, 79490148, 'CESAR AUGUSTO URREGO AVENDAÑO', 'Cédula de Ciudadanía', 'Subgerente', 'Administracion', '2009-08-01', '000000', 'currego@meridian.com.co', '000000', '79490148', '', '', 'empleado'),
(585, 1010126883, 'DANNY ALEXANDERPANCHE VICENTES', 'Cédula de Ciudadanía', 'Contador Junior', 'Administracion', '2020-07-16', '000000', 'contadorjr@meridian.com.co', '000000', '1010126883', '', '', 'empleado'),
(586, 1031145571, 'DIANA MARCELA JACOBO MANCERA', 'Cédula de Ciudadanía', 'Soporte Hseq', 'Administracion', '2023-08-14', '000000', 'soportehseq@meridian.com.co', '000000', '1031145571', 'ADMINISTRACION', '', 'empleado'),
(587, 1020733194, 'ELOY GABRIEL GOMEZ REYES', 'Cédula de Ciudadanía', 'Coordinador de Gestión Humana', 'Administracion', '2023-06-13', '000000', 'coordinaciongestionhumana@meridian.com.co', '000000', '1020733194', 'ADMINISTRACION', '', 'empleado'),
(588, 1119211830, 'LUIS MIGUEL GUEVARA MARLES', 'Cédula de Ciudadanía', 'Coordinador Hseq', 'Administracion', '2022-11-22', '000000', 'hseq@meridian.com.co', '000000', '1119211830', 'ADMINISTRACION', '', 'empleado'),
(589, 52030991, 'NORA GISELL MORENO MORENO', 'Cédula de Ciudadanía', 'Gerente Administrativa Y Financiera', 'Administracion', '2009-01-01', '000000', 'nmoreno@meridian.com.co', '000000', '52030991', '', '', 'empleado'),
(590, 52147279, 'RUTH MUÑOZ CASTILLO', 'Cédula de Ciudadanía', 'Servicios Generales', 'Administracion', '2011-06-13', '000000', 'rmunoz@meridian.com.co', '000000', '52147279', 'ADMINISTRACION', '', 'empleado'),
(591, 1014180459, 'SANDRA MILENA FLOREZ PRADO', 'Cédula de Ciudadanía', 'Asistente Administrativo', 'Administracion', '2023-05-02', '000000', 'asistenteadministrativo2@meridian.com.co', '000000', '1014180459', 'ADMINISTRACION', '', 'empleado'),
(592, 1007647736, 'SONIA STEPHANIA FONSECA LOPEZ', 'Cédula de Ciudadanía', 'Asistente de Nomina y gestion humana', 'Administracion', '2024-05-02', '000000', 'asistentegestionhumana2@meridian.com.co', '000000', '1007647736', 'ADMINISTRACION', '', 'empleado'),
(593, 79613401, 'WILLIAM AUGUSTO FRANCO CASTELLANOS', 'Cédula de Ciudadanía', 'Gerente General', 'Administracion', '2009-08-01', '000000', 'wfranco@meridian.com.co', '000000', '79613401', 'ADMINISTRACION', '', 'empleado'),
(594, 52005033, 'ZANDRA PATRICIA MAYORGA GOMEZ', 'Cédula de Ciudadanía', 'Coordinador Contable y Financiero', 'Administracion', '2018-01-23', '000000', 'coordinadoracontable@meridian.com.co', '000000', '52005033', 'ADMINISTRACION', '', 'empleado'),
(595, 1019098876, 'YESSICA ANDREA ABELLA RODRIGUEZ', 'Cédula de Ciudadanía', 'Asistente Contable', 'Administracion', '2024-10-21', '000000', '', '000000', '1019098876', 'ADMINISTRACION', '', 'empleado'),
(596, 1000931984, 'KAREN JULIETH CARRANZA RODRIGUEZ', 'Cédula de Ciudadanía', 'Analista Contable', 'Administracion', '2024-10-21', '000000', '', '000000', '1000931984', 'ADMINISTRACION', '', 'empleado'),
(597, 43728382, 'ALEXANDRA ISABEL MESA CARDENAS', 'Cédula de Ciudadanía', 'Profesional Especialista', 'Gestión de Proyectos', '2024-01-03', '000000', 'alexandramesa85@gmail.com', '000000', '43728382', 'PROYECTO PETROSERVICIOS', '9135816', 'empleado'),
(598, 1014216060, 'CARLOS ALEJANDRO FORERO PEÑA', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-03', '000000', 'forero_c05@hotmail.com', '000000', '1014216060', 'PROYECTO PETROSERVICIOS', '9135816', 'empleado'),
(599, 52967140, 'DIANA PAOLA SOLANO SUA', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-03', '000000', 'dianapsolano.2017@gmail.com', '000000', '52967140', 'PROYECTO PETROSERVICIOS', '9135816', 'empleado'),
(600, 52844528, 'EDNA MILED NIÑO OROZCO', 'Cédula de Ciudadanía', 'Profesional Especialista', 'Gestión de Proyectos', '2024-01-03', '000000', 'miledn7@yahoo.com.mx', '000000', '52844528', 'PROYECTO PETROSERVICIOS', '9135816', 'empleado'),
(601, 1032414423, 'LAURA MARIA HERNANDEZ RIVEROS', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-03', '000000', 'lhernandez@utexas.edu', '000000', '1032414423', 'PROYECTO PETROSERVICIOS', '9119211', 'empleado'),
(602, 478731, 'ZENAIDA DEL VALLE MARCANO DE VILLARROEL', 'Cédula de extranjeria', 'Profesional Senior', 'PROYECTO PETROSERVICIOS', '2024-01-09', '000000', 'marcanozdelvalle@gmail.com', '000000', '478731', 'PROYECTO PETROSERVICIOS', '9186546', 'empleado'),
(603, 1128452509, 'CINDY NATALIA ISAZA TORO', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-09', '000000', 'natiisaza@hotmail.com', '000000', '1128452509', 'PROYECTO PETROSERVICIOS', '9135816', 'empleado'),
(604, 1010056001, 'EMELI YOHANA YACELGA CHITAN', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-09', '000000', 'Emeli.yacelga@gmail.com', '000000', '1010056001', 'PROYECTO PETROSERVICIOS', '9135816', 'empleado'),
(605, 40936668, 'ESPERANZA DE JESUS COTES LEON', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-09', '000000', 'esperanza.cotes@gmail.com', '000000', '40936668', 'PROYECTO PETROSERVICIOS', '9135816', 'empleado'),
(606, 1128474161, 'LEIDY LAURA ALVAREZ BERRIO', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-09', '000000', 'alvarezlaura08@gmail.com', '000000', '1128474161', 'PROYECTO PETROSERVICIOS', '9135816', 'empleado'),
(607, 80883010, 'OVEIMAR SANTAMARIA TORRES', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-09', '000000', 'oveimar.santamaria@gmail.com', '000000', '80883010', 'PROYECTO PETROSERVICIOS', '9135816', 'empleado'),
(608, 80170660, 'RUBEN HERNAN CASTRO GARCIA', 'Cédula de Ciudadanía', 'Profesional Especialista', 'Gestión de Proyectos', '2024-01-09', '000000', 'rubencastrogarcia83@gmail.com', '000000', '80170660', 'PROYECTO PETROSERVICIOS', '9135816', 'empleado'),
(609, 1075284985, 'SEBASTIAN LLANOS GALLO', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-09', '000000', 'sllanosg@unal.edu.co', '000000', '1075284985', 'PROYECTO PETROSERVICIOS', '9135816', 'empleado'),
(610, 83042295, 'WILLIAM CABRERA CASTRO', 'Cédula de Ciudadanía', 'Profesional Senior', 'PROYECTO PETROSERVICIOS', '2024-01-09', '000000', 'williamcabreracastro@gmail.com', '000000', '83042295', 'PROYECTO PETROSERVICIOS', '9318805', 'empleado'),
(611, 1152210959, 'CARLOS JOSE URZOLA EBRATT', 'Cédula de Ciudadanía', 'Profesional Basico', 'Gestión de Proyectos', '2024-06-25', '000000', 'carlosjose.ue@gmail.com', '000000', '1152210959', 'PROYECTO PETROSERVICIOS', '9135816', 'empleado'),
(612, 1022380991, 'DIEGO FERNANDO CASTILLO BAYONA', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-09', '000000', 'diegocastillok8@gmail.com', '000000', '1022380991', 'PROYECTO PETROSERVICIOS', '9135816', 'empleado'),
(613, 1115069820, 'GABRIEL EDUARDO VELEZ BARRERA', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-09', '000000', 'gabrielvelezb6@gmail.com', '000000', '1115069820', 'PROYECTO PETROSERVICIOS', '9135816', 'empleado'),
(614, 331789, 'GLADYS EVANGELINA TABARES PEREZ', 'Cédula de extranjeria', 'Profesional Especialista', 'Gestión de Proyectos', '2024-01-09', '000000', 'tabaresgt@hotmail.com', '000000', '331789', 'PROYECTO PETROSERVICIOS', '9135816', 'empleado'),
(615, 1151954545, 'JUAN MATEO CORDOBA WAGNER', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-09', '000000', 'jmcordobaw@gmail.com', '000000', '1151954545', 'PROYECTO PETROSERVICIOS', '9139035', 'empleado'),
(616, 1019011177, 'LEIDY JOHANNA BELLO AREVALO', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-09', '000000', 'johanna.bello@gmail.com', '000000', '1019011177', 'PROYECTO PETROSERVICIOS', '9139035', 'empleado'),
(617, 1047451443, 'CARLOS RAFAEL OLMOS CARVAL', 'Cédula de Ciudadanía', 'Profesional Basico', 'Gestión de Proyectos', '2024-01-10', '000000', 'carlosolmosc@outlook.com', '000000', '1047451443', 'PROYECTO PETROSERVICIOS', '9108440', 'empleado'),
(618, 1032467291, 'CHRISTIAN MAURICIO PARDO CARRANZA', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-10', '000000', 'christianmauriciopardo@gmail.com', '000000', '1032467291', 'PROYECTO PETROSERVICIOS', '9108440', 'empleado'),
(619, 1140847297, 'DAVID ALEJANDRO GARCIA CORONADO', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-10', '000000', 'Alejandro_7269@hotmail.com', '000000', '1140847297', 'PROYECTO PETROSERVICIOS', '9108440', 'empleado'),
(620, 30405867, 'DIANA MARCELA CACERES SALINAS', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-10', '000000', 'caceres.diana@gmail.com', '000000', '30405867', 'PROYECTO PETROSERVICIOS', '9108440', 'empleado'),
(621, 1095826986, 'LIZETH DAYANA BAUTISTA RICO', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-10', '000000', 'lbautistarico@gmail.com', '000000', '1095826986', 'PROYECTO PETROSERVICIOS', '9108440', 'empleado'),
(622, 1026255124, 'MARIA ALEJANDRA MOJICA ARCINIEGAS', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-10', '000000', 'alejandra_mojica123@hotmail.com', '000000', '1026255124', 'PROYECTO PETROSERVICIOS', '9183859-4', 'empleado'),
(623, 1075292422, 'OLMER ANDRES MORALES MORA', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-10', '000000', 'andresmoralesmora95@gmail.com', '000000', '1075292422', 'PROYECTO PETROSERVICIOS', '9183859-4', 'empleado'),
(624, 1056709240, 'IVAN DARIO MOZO MORENO', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-02-26', '000000', 'mozoivan@gmail.com', '000000', '1056709240', 'PROYECTO PETROSERVICIOS', '9135816', 'empleado'),
(625, 53103915, 'MONICA DEL PILAR MARTINEZ VERA', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-03-04', '000000', 'monamartinez28@hotmail.com', '000000', '53103915', 'PROYECTO PETROSERVICIOS', '9135816', 'empleado'),
(626, 1098725794, 'JOSE GABRIEL NASSAR DIAZ', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-04-01', '000000', 'josse.nazzar@gmail.com', '000000', '1098725794', 'PROYECTO PETROSERVICIOS', '9119211', 'empleado'),
(627, 1075292404, 'FRANCISCO JOSE AMADO IRIARTE', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-04-15', '000000', 'franciscoamado95@gmail.com', '000000', '1075292404', 'PROYECTO PETROSERVICIOS', '9142407', 'empleado'),
(628, 1098755426, 'JAIME JOSÉ MARTÍNEZ VERTEL', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-05-21', '000000', 'jaimemartinez12345@gmail.com', '000000', '1098755426', 'PROYECTO PETROSERVICIOS', '9142407', 'empleado'),
(629, 1110502030, 'DIANA MARIA HERNANDEZ CASTRO', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-15', '000000', 'd.mhernandezcastro@hotmail.com', '000000', '1110502030', 'PROYECTO PETROSERVICIOS', '9142407', 'empleado'),
(630, 30400528, 'BLANCA OFFIR HURTADO LOPERA', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-16', '000000', 'hurtadoblanca@yahoo.com', '000000', '30400528', 'PROYECTO PETROSERVICIOS', '9142407', 'empleado'),
(631, 1026292916, 'CAMILO ANDRES SANTANA OTALORA', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-16', '000000', 'camilo.santana@hotmail.com', '000000', '1026292916', 'PROYECTO PETROSERVICIOS', '9142407', 'empleado'),
(632, 52969518, 'CAROLINA LEON VANEGAS', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-16', '000000', 'karitoleon@gmail.com; carleonvan@unal.edu.co', '000000', '52969518', 'PROYECTO PETROSERVICIOS', '9135816', 'empleado'),
(633, 1075293846, 'DANIELA MOLINA LANDINEZ', 'Cédula de Ciudadanía', 'Profesional Especialista', 'Gestión de Proyectos', '2024-01-16', '000000', 'danimolina19@gmail.com', '000000', '1075293846', 'PROYECTO PETROSERVICIOS', '9108440', 'empleado'),
(634, 1049619319, 'DIEGO ARMANDO VANEGAS ARAQUE', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-16', '000000', 'diegov14@hotmail.com', '000000', '1049619319', 'PROYECTO PETROSERVICIOS', '9139035', 'empleado'),
(635, 1091660311, 'EDUAR ERNESTO PEREZ ROJAS', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-16', '000000', 'ingeduar10@hotmail.com', '000000', '1091660311', 'PROYECTO PETROSERVICIOS', '9139035', 'empleado'),
(636, 1010167959, 'FRANKLIN ALEJANDRO BOTERO RIVERA', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-16', '000000', 'alejandro.botero1120@gmail.com', '000000', '1010167959', 'PROYECTO PETROSERVICIOS', '9139035', 'empleado'),
(637, 1098739269, 'GUSTAVO ADOLFO MORENO BELTRAN', 'Cédula de extranjeria', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-16', '000000', 'gustavo.moreno.beltran@gmail.com', '000000', '1098739269', 'PROYECTO PETROSERVICIOS', '9325490', 'empleado'),
(638, 63527981, 'INA YADITH SERRANO LASTRE', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-16', '000000', 'inaserrano@gmail.com', '000000', '63527981', 'PROYECTO PETROSERVICIOS', '9139035', 'empleado'),
(639, 1085247861, 'IVAN DARIO MONCAYO RIASCOS', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-16', '000000', 'idmoncay@gmail.com', '000000', '1085247861', 'PROYECTO PETROSERVICIOS', '9135816', 'empleado'),
(640, 91520047, 'JESUS DAVID ARENAS NAVARRO', 'Cédula de Ciudadanía', 'Profesional junior', 'Gestión de Proyectos', '2024-01-16', '000000', 'ajbdavidgeo@gmail.com', '000000', '91520047', 'PROYECTO PETROSERVICIOS', '9135816', 'empleado'),
(641, 10297751, 'JOSE MANUEL GARCIA OROZCO', 'Cédula de Ciudadanía', 'Profesional Básico', 'Gestión de Proyectos', '2024-01-16', '000000', 'garciaorozcojosemanuel@gmail.com', '000000', '10297751', 'PROYECTO PETROSERVICIOS', '9135816', 'empleado'),
(642, 1026267749, 'JUAN DAVID ARISTIZABAL MARULANDA', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-16', '000000', 'juancheing@hotmail.com', '000000', '1026267749', 'PROYECTO PETROSERVICIOS', '9135816', 'empleado'),
(643, 1098782789, 'JUAN SEBASTIAN AVILA PARRA', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-16', '000000', 'juansebastian964@gmail.com', '000000', '1098782789', 'PROYECTO PETROSERVICIOS', '9325490', 'empleado'),
(644, 13740129, 'JULIO CESAR FIGUEROA VEGA', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-16', '000000', 'Juliofigue@hotmail.com', '000000', '13740129', 'PROYECTO PETROSERVICIOS', '9186547', 'empleado'),
(645, 1012387614, 'LEONARDO SANTOS MATEUS BAEZ', 'Cédula de Ciudadanía', 'Profesional Especialista', 'Gestión de Proyectos', '2024-01-16', '000000', 'lsmateusb@gmail.com', '000000', '1012387614', 'PROYECTO PETROSERVICIOS', '9119211', 'empleado'),
(646, 37514608, 'LUCIA MARIA ACERO LIZCANO', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-16', '000000', 'luciaacero@gmail.com', '000000', '37514608', 'PROYECTO PETROSERVICIOS', '9142407', 'empleado'),
(647, 1075286382, 'MARIA ALEJANDRA CABRERA GARCIA', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-16', '000000', 'alejacabrera2211@gmail.com', '000000', '1075286382', 'PROYECTO PETROSERVICIOS', '9135816', 'empleado'),
(648, 1098697791, 'MARIA ALEJANDRA JOYA RINCON', 'Cédula de Ciudadanía', 'Profesional Básico', 'Gestión de Proyectos', '2024-01-16', '000000', 'Alejandra.joya@gmail.com', '000000', '1098697791', 'PROYECTO PETROSERVICIOS', '9135816', 'empleado'),
(649, 13720871, 'MARIO AUGUSTO MORENO CASTELLANOS', 'Cédula de Ciudadanía', 'Profesional Básico', 'Gestión de Proyectos', '2024-01-16', '000000', 'geomario@hotmail.com', '000000', '13720871', 'PROYECTO PETROSERVICIOS', '9186547', 'empleado'),
(650, 1023961699, 'NICOLAS AVENDAÑO VASQUEZ', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-16', '000000', 'nav2052@hotmail.com', '000000', '1023961699', 'PROYECTO PETROSERVICIOS', '9135816', 'empleado'),
(651, 1098733967, 'OSCAR FABIAN SUAREZ SUAREZ', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-16', '000000', 'oscarsuarez93@hotmail.com', '000000', '1098733967', 'PROYECTO PETROSERVICIOS', '9139035', 'empleado'),
(652, 1072699593, 'RUBEN DARIO ORTIZ MURCIA', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-01-16', '000000', 'ruben_ortiz07@hotmail.com', '000000', '1072699593', 'PROYECTO PETROSERVICIOS', '9142407', 'empleado'),
(653, 1007555164, 'SERGIO FERNANDO POVEDA SALAZAR', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-01-16', '000000', 'sf.poveda@uniandes.edu.co', '000000', '1007555164', 'PROYECTO PETROSERVICIOS', '9139035', 'empleado'),
(654, 1143327261, 'GIOVANNI MARTINEZ LEONES', 'Cédula de extranjeria', 'Profesional Especialista', 'Gestión de Proyectos', '2024-05-31', '000000', 'gio.martinez.leones@hotmail.com', '000000', '1143327261', 'PROYECTO PETROSERVICIOS', '9183859-4', 'empleado'),
(655, 63540751, 'ADRIANA PATRICIA DUEÑES GARCÉS', 'Cédula de Ciudadanía', 'Profesional Junior', 'Gestión de Proyectos', '2024-06-01', '000000', 'adriana_geologia@hotmail.com', '000000', '63540751', 'PROYECTO PETROSERVICIOS', '9139035', 'empleado'),
(656, 80777836, 'JOHN JAIRO MORA SOTO', 'Cédula de Ciudadanía', 'Profesional Senior', 'Gestión de Proyectos', '2024-07-22', '000000', 'jjmoras1@gmail.com', '000000', '80777836', 'PROYECTO PETROSERVICIOS', '9325490', 'empleado'),
(657, 1018455383, 'YELTSIN PARMENIO VEGA NIÑO', 'Cédula de Ciudadanía', 'Soporte Operativo T5A', 'Gestión de Proyectos', '2024-08-08', '000000', 'ypvegan@unal.edu.co', '000000', '1018455383', 'COMPANY ANTIGUO', '', 'empleado'),
(658, 80192577, 'LUIS ANDRES MORENO MEDINA', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T4', 'Gestión de Proyectos', '2023-09-16', '000000', 'ing.andmoreno@gmail.com', '000000', '80192577', 'COMPANY ANTIGUO', '', 'empleado'),
(659, 1098777543, 'Clara Yineth Velasquez Diaz', 'Cédula de Ciudadanía', 'Soporte Operativo T5A', 'Gestión de Proyectos', '2023-07-11', '000000', 'clara.velasquez@ecopetrol.com.co', '000000', '1098777543', 'COMPANY ANTIGUO', '', 'empleado'),
(660, 1075234956, 'Ingrid Yeset Sanchez Perez', 'Cédula de Ciudadanía', 'Soporte Operativo T4A', 'Gestión de Proyectos', '2023-07-11', '000000', 'ingrid.sanchez@ecopetrol.com.co', '000000', '1075234956', 'COMPANY ANTIGUO', '', 'empleado'),
(661, 7729226, 'OSCAR EDUARDO IBAGON MORERA', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T2', 'Gestión de Proyectos', '2023-08-20', '000000', 'oscar_ibagon@hotmail.com', '000000', '7729226', 'COMPANY ANTIGUO', '', 'empleado'),
(662, 1130585053, 'CHRISTIAN JOSE PUPIALES FERNANDEZ', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T3', 'Gestión de Proyectos', '2023-09-16', '000000', 'cristianpupiales@hotmail.com', '000000', '1130585053', 'COMPANY ANTIGUO', '', 'empleado'),
(663, 12126203, 'OMAR GAONA CABRERA', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T1', 'Gestión de Proyectos', '2023-09-16', '000000', 'omargaonacabrera2021@gmail.com', '000000', '12126203', 'COMPANY ANTIGUO', '', 'empleado'),
(664, 79459664, 'FRANCISCO SANTOS SANTACRUZ', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T1', 'Gestión de Proyectos', '2023-09-20', '000000', 'fco_santos_4@yahoo.com', '000000', '79459664', 'COMPANY ANTIGUO', '', 'empleado'),
(665, 91285174, 'Fernando Jose Aparicio Becerra', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T3', 'Gestión de Proyectos', '2022-07-02', '000000', 'fernando.aparicio@ecopetrol.com.co', '000000', '91285174', 'COMPANY ANTIGUO', '', 'empleado'),
(666, 80842868, 'OSCAR MAURICIO PRIETO VARGAS', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T4', 'Gestión de Proyectos', '2023-09-20', '000000', 'prieto556g@gmail.com', '000000', '80842868', 'COMPANY ANTIGUO', '', 'empleado'),
(667, 1098614427, 'JUAN CAMILO CORTÉS ROJAS', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T3', 'Gestión de Proyectos', '2023-09-27', '000000', 'juancamilocortesr@gmail.com', '000000', '1098614427', 'COMPANY ANTIGUO', '', 'empleado'),
(668, 79902734, 'Luis Felipe Uribe Parra', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T2', 'Gestión de Proyectos', '2023-07-27', '000000', 'Luis.Uribe@ecopetrol.com.co', '000000', '79902734', 'COMPANY ANTIGUO', '', 'empleado'),
(669, 87454560, 'HECTOR ANDRES NOGUERA BOLAÑOS', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T4', 'Gestión de Proyectos', '2023-09-20', '000000', 'andresnoguera111@hotmail.com', '000000', '87454560', 'COMPANY ANTIGUO', '', 'empleado'),
(670, 9659943, 'JORGE LUIS SEGURA SANABRIA', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T2', 'Gestión de Proyectos', '2023-09-16', '000000', 'jlsegura01@gmail.com', '000000', '9659943', 'COMPANY ANTIGUO', '', 'empleado'),
(671, 91207387, 'FERNANDO LOPEZ PRADA', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T2', 'Gestión de Proyectos', '2023-09-16', '000000', 'ferlopra@gmail.com', '000000', '91207387', 'COMPANY ANTIGUO', '', 'empleado'),
(672, 24228529, 'Claudia Marina Ortiz Avendaño', 'Cédula de Ciudadanía', 'Soporte Operativo T3B', 'Gestión de Proyectos', '2022-07-01', '000000', 'claudia.ortiz@ecopetrol.com.co', '000000', '24228529', 'COMPANY ANTIGUO', '', 'empleado'),
(673, 88158913, 'Nestor Alonso Jaimes Portilla', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T3', 'Gestión de Proyectos', '2022-07-07', '000000', 'nestor.jaimes@ecopetrol.com.co', '000000', '88158913', 'COMPANY ANTIGUO', '', 'empleado'),
(674, 91524026, 'Oscar Mauricio Gomez Camacho', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T3', 'Gestión de Proyectos', '2023-07-13', '000000', 'oscarma.gomez@ecopetrol.com.co', '000000', '91524026', 'COMPANY ANTIGUO', '', 'empleado'),
(675, 1121936876, 'LAURA DANIELA SEGURA MORERA', 'Cédula de Ciudadanía', 'Profesional HSEQ', 'Administracion', '2023-09-05', '000000', 'profesionalhseq@meridian.com.co', '000000', '1121936876', 'COMPANY MAN', '', 'empleado'),
(676, 1053611893, 'ANGY YOLIMA SALCEDO AMADO', 'Cédula de Ciudadanía', 'PROF. DE PROYECTO EN ENTRENAMIENTO', 'Gestión de Proyectos', '2023-10-02', '000000', 'angysalcedo0810@hotmail.com', '000000', '1053611893', '', '', 'empleado'),
(677, 1115914145, 'VIANI YRELI RUIZ GALINDO', 'Cédula de Ciudadanía', 'SOPORTE OPERATIVO 4A', 'Gestión de Proyectos', '2023-10-02', '000000', 'vianiruiz@gmail.com', '000000', '1115914145', '', '', 'empleado'),
(678, 26421498, 'ERIKA ANDREA LOPEZ CORDOBA', 'Cédula de Ciudadanía', 'SOPORTE OPERATIVO 4A', 'Gestión de Proyectos', '2023-07-11', '000000', 'erika.lopezcordoba@gmail.com', '000000', '26421498', 'COMPANY ANTIGUO', '', 'empleado'),
(679, 1098717872, 'MARBERT SHARIN MARTINEZ ARANDA', 'Cédula de Ciudadanía', 'SOPORTE OPERATIVO 4A', 'Gestión de Proyectos', '2023-07-11', '000000', 'sharin0207@hotmail.com', '000000', '1098717872', 'COMPANY ANTIGUO', '', 'empleado'),
(680, 33647141, 'MYRIAM KARINA PAREDES FORERO', 'Cédula de Ciudadanía', 'SOPORTE OPERATIVO 4A', 'Gestión de Proyectos', '2023-10-02', '000000', 'contador_mkpf@hotmail.es', '000000', '33647141', '', '', 'empleado'),
(681, 1090509220, 'LUIS ALEJANDRO HELLAL PORRAS', 'Cédula de Ciudadanía', 'SOPORTE OPERATIVO 5A', 'Gestión de Proyectos', '2023-07-11', '000000', 'alejandrohellal@gmail.com', '000000', '1090509220', 'COMPANY ANTIGUO', '', 'empleado'),
(682, 88281896, 'JULIO CESAR ROMERO AREVALO', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T2', 'Gestión de Proyectos', '2023-10-01', '000000', 'julioromeroar@hotmail.com', '000000', '88281896', 'COMPANY ANTIGUO', '', 'empleado'),
(683, 1106394070, 'EDGAR ANDRES MURILLO ANDRADE', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T3', 'Gestión de Proyectos', '2023-07-11', '000000', 'ing_andresmurillo2@hotmail.com', '000000', '1106394070', 'COMPANY ANTIGUO', '', 'empleado'),
(684, 1020786562, 'CAMILO ANDRES TORRES RESTREPO', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T4', 'Gestión de Proyectos', '2023-07-18', '000000', 'calomi0212@hotmail.com', '000000', '1020786562', 'COMPANY ANTIGUO', '', 'empleado'),
(685, 1075233230, 'SERGIO LEONARDO VERGARA SUAREZ', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos T4', 'Gestión de Proyectos', '2023-07-11', '000000', 'selves24@hotmail.com', '000000', '1075233230', 'COMPANY ANTIGUO', '', 'empleado'),
(686, 1098745210, 'ESTEFANY LIZETH VELANDIA JAIMES', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-01-22', '000000', 'gestefanyvelandia@gmail.com', '000000', '1098745210', 'PROYECTO PETROSERVICIOS', '9186547', 'empleado'),
(687, 1013633604, 'GUSTAVO ANDRES BAUTISTA VELANDIA', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-01-22', '000000', 'andresbautistavelandia@gmail.com', '000000', '1013633604', 'PROYECTO PETROSERVICIOS', '9186547', 'empleado'),
(688, 1016597, 'JEAN PABLO CEDEÑO ORFILA', 'Cédula de Ciudadanía', 'Profesional Senior', 'PROYECTO PETROSERVICIOS', '2024-01-22', '000000', 'jeanpablocorfila@gmail.com', '000000', '1016597', 'PROYECTO PETROSERVICIOS', '9186547', 'empleado'),
(689, 1003934174, 'JHON ABELARDO CUESTA ASPRILLA', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-01-22', '000000', 'jhcuestaa@gmail.com', '000000', '1003934174', 'PROYECTO PETROSERVICIOS', '9135816', 'empleado'),
(690, 91524899, 'JOSE ANDRES ANAYA MANCIPE', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-01-22', '000000', 'anayamancipe_04@hotmail.com', '000000', '91524899', 'PROYECTO PETROSERVICIOS', '9186547', 'empleado'),
(691, 1045706790, 'JOSE CARLOS GARCIA RUEDA', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-01-22', '000000', 'josecarlosgarcia92@gmail.com', '000000', '1045706790', 'PROYECTO PETROSERVICIOS', '9186547', 'empleado'),
(692, 1040746072, 'KELLY LORENA DIEZ HERNANDEZ', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-01-22', '000000', 'kldiezhdz@gmail.com', '000000', '1040746072', 'PROYECTO PETROSERVICIOS', '9186547', 'empleado'),
(693, 1014262113, 'MARIA ANGELICA PRADA FONSECA', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-01-22', '000000', 'prada.angelica@hotmail.com', '000000', '1014262113', 'PROYECTO PETROSERVICIOS', '9119211', 'empleado'),
(694, 37546080, 'MARIA HIMELDA MURILLO LOPEZ', 'Cédula de Ciudadanía', 'Profesional Senior', 'PROYECTO PETROSERVICIOS', '2024-01-22', '000000', 'pauegip_12@hotmail.com', '000000', '37546080', 'PROYECTO PETROSERVICIOS', '9119211', 'empleado'),
(695, 1075212439, 'MARIANN LISSETTE MAHECHA LAVERDE', 'Cédula de Ciudadanía', 'Profesional Senior', 'PROYECTO PETROSERVICIOS', '2024-01-22', '000000', 'malimagen@hotmail.com', '000000', '1075212439', 'PROYECTO PETROSERVICIOS', '9186546', 'empleado'),
(696, 1098726424, 'EMMANUEL ROBLES ALBARRACIN', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-01-24', '000000', 'emmanuel_robles17@hotmail.com', '000000', '1098726424', 'PROYECTO PETROSERVICIOS', '9186547', 'empleado'),
(697, 1087047704, 'YUBER RODRIGUEZ ARTURO', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-03-14', '000000', 'yuberrodriguezarturo@gmail.com', '000000', '1087047704', 'PROYECTO PETROSERVICIOS', '9186546', 'empleado'),
(698, 1098663949, 'LAURA YANETH OSMA MARIN', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-04-22', '000000', 'laura.osma@hotmail.com', '000000', '1098663949', 'PROYECTO PETROSERVICIOS', '9183859-3', 'empleado'),
(699, 1032398017, 'HERNÁN ALBEYRO FULA BOHÓRQUEZ', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-05-14', '000000', 'hernanfula@gmail.com', '000000', '1032398017', 'PROYECTO PETROSERVICIOS', '9146960', 'empleado'),
(700, 506169, 'CLAUDIA CAROPRESE GARCIA', 'Cédula de Ciudadanía', 'Profesional Senior', 'PROYECTO PETROSERVICIOS', '2024-04-02', '000000', 'caropresec@gmail.com', '000000', '506169', 'PROYECTO PETROSERVICIOS', '9183859', 'empleado'),
(701, 80074517, 'CRISTIAN PEÑAFORT GAVIRIA', 'Cédula de Ciudadanía', 'Profesional Especialista', 'PROYECTO PETROSERVICIOS', '2024-04-02', '000000', 'cpenafortg@hotmail.com', '000000', '80074517', 'PROYECTO PETROSERVICIOS', '9183859-3', 'empleado'),
(702, 1013629348, 'CHRISTIAN CAMILO RIVERA SANCHEZ', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-04-22', '000000', 'chris911205@gmail.com', '000000', '1013629348', 'PROYECTO PETROSERVICIOS', '9183859-4', 'empleado'),
(703, 91514446, 'GERMAN DARIO OREJARENA ESCOBAR', 'Cédula de Ciudadanía', 'Profesional Senior', 'PROYECTO PETROSERVICIOS', '2024-04-22', '000000', 'german18224@yahoo.com', '000000', '91514446', 'PROYECTO PETROSERVICIOS', '9183859-4', 'empleado'),
(704, 1053792535, 'LEIDI MARCELA QUINTERO GIRALDO', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-04-22', '000000', 'lquinterogiraldo@gmail.com', '000000', '1053792535', 'PROYECTO PETROSERVICIOS', '9135816', 'empleado'),
(705, 79686130, 'RICARDO GAVIRIA GARCIA', 'Cédula de Ciudadanía', 'Profesional Senior', 'PROYECTO PETROSERVICIOS', '2024-04-22', '000000', 'ricardo.gaviria@outlook.com', '000000', '79686130', 'PROYECTO PETROSERVICIOS', '9183859-4', 'empleado'),
(706, 1098610954, 'JORGE LUIS CORONADO NAVARRO', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-04-25', '000000', 'jorge.coronadobv03@gmail.com', '000000', '1098610954', 'PROYECTO PETROSERVICIOS', '9183859-4', 'empleado'),
(707, 1098605467, 'MAX BRADLEY GOMEZ GUALDRON', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-04-25', '000000', 'maxmbg@gmail.com', '000000', '1098605467', 'PROYECTO PETROSERVICIOS', '9135816', 'empleado'),
(708, 1098795831, 'SONIA ALEJANDRAQUINTERO ANTOLÍNEZ', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-04-25', '000000', 'soniaaquinteroa@gmail.com', '000000', '1098795831', 'PROYECTO PETROSERVICIOS', '9108440', 'empleado'),
(709, 1121941649, 'ALEJANDRO DUVAN LOPEZ ROJAS', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-07-02', '000000', 'alejandro_.lopez@hotmail.com', '000000', '1121941649', 'PROYECTO PETROSERVICIOS', '9770807', 'empleado'),
(710, 52455261, 'ANA MARÍA CASTELLANOS BARRETO', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-07-02', '000000', 'amariacast@yahoo.com', '000000', '52455261', 'PROYECTO PETROSERVICIOS', '9770807', 'empleado'),
(711, 13959717, 'DIEGO FERNANDO GALEANO BARRERA', 'Cédula de Ciudadanía', 'Profesional Senior', 'PROYECTO PETROSERVICIOS', '2024-07-02', '000000', 'diego581@yahoo.com', '000000', '13959717', 'PROYECTO PETROSERVICIOS', '9770807', 'empleado'),
(712, 1101692935, 'DIEGO FERNANDO PINTO HERNÁNDEZ', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-07-02', '000000', 'diegopintoh.uis@gmail.com', '000000', '1101692935', 'PROYECTO PETROSERVICIOS', '9770807', 'empleado'),
(713, 74085101, 'EDWIN FERNANDO HERNANDEZ LADINO', 'Cédula de Ciudadanía', 'Profesional Senior para la ejecución de actividades de la ODS No. 9770807 del contrato Matriz No. 30', 'PROYECTO PETROSERVICIOS', '2024-07-02', '000000', 'edwin.hernandez.l@outlook.com', '000000', '74085101', 'PROYECTO PETROSERVICIOS', '9770807', 'empleado'),
(714, 1100961505, 'GEISSON RENÉ ZAFRA URREA', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-07-02', '000000', 'jason920619@hotmail.com', '000000', '1100961505', 'PROYECTO PETROSERVICIOS', '9770807', 'empleado'),
(715, 51781946, 'GLORIA FERNANDA VIDAL GONZALEZ', 'Cédula de Ciudadanía', 'Profesional Senior', 'PROYECTO PETROSERVICIOS', '2024-07-02', '000000', 'gloriavidal25@hotmail.com', '000000', '51781946', 'PROYECTO PETROSERVICIOS', '9770807', 'empleado'),
(716, 1091668362, 'JESUS IVAN PACHECO ROMERO', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-07-02', '000000', 'jesus.pacheco.rom@gmail.com', '000000', '1091668362', 'PROYECTO PETROSERVICIOS', '9770807', 'empleado'),
(717, 1098681773, 'JHON HARVEY CARREÑO HERNANDEZ', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-07-02', '000000', 'jhocar_1990@hotmail.com', '000000', '1098681773', 'PROYECTO PETROSERVICIOS', '9770807', 'empleado'),
(718, 91527985, 'JOHN FABIAN ROJAS ADARRAGA', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-07-02', '000000', 'Jonfabi@hotmail.com', '000000', '91527985', 'PROYECTO PETROSERVICIOS', '9770807', 'empleado'),
(719, 1098706838, 'JULIAN ANDRES HERNANDEZ PINTO', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-07-02', '000000', 'julianh.9128@gmail.com', '000000', '1098706838', 'PROYECTO PETROSERVICIOS', '9770807', 'empleado'),
(720, 1098758681, 'MILTON JULIAN GUALTEROS QUIROGA', 'Cédula de Ciudadanía', 'Profesional Senior', 'PROYECTO PETROSERVICIOS', '2024-07-02', '000000', 'juliangualteros31@hotmail.com', '000000', '1098758681', 'PROYECTO PETROSERVICIOS', '9770807', 'empleado'),
(721, 1065599609, 'CESAR ELIECER RODRIGUEZ CAMELO', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-07-08', '000000', 'cesarstam84@hotmail.com', '000000', '1065599609', 'PROYECTO PETROSERVICIOS', '9770807', 'empleado'),
(722, 1098692205, 'BRIGGITE SUSEC CAMACHO JEREZ', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-07-08', '000000', 'briggite.camachoj@gmail.com', '000000', '1098692205', 'PROYECTO PETROSERVICIOS', '9770807', 'empleado'),
(723, 1101693549, 'CESAR EDUARDO GARNICA GOMEZ', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-07-11', '000000', 'cesar.garnica94@gmail.com', '000000', '1101693549', 'PROYECTO PETROSERVICIOS', '9770807', 'empleado'),
(724, 1016037506, 'PAOLA ANDREA GOMEZ CABRERA', 'Cédula de Ciudadanía', 'Profesional Junior', 'PROYECTO PETROSERVICIOS', '2024-08-06', '000000', 'paolago40@gmail.com', '000000', '1016037506', 'PROYECTO PETROSERVICIOS', '9770807', 'empleado'),
(725, 17419403, 'FRANCISCO JAVIER VILLABONA TAMAYO', 'Cédula de Ciudadanía', 'Director de Proyecto Ecopetrol', 'COMPANY MAN', '2022-06-22', '000000', 'francisco.villabona@outlook.com', '000000', '17419403', 'COMPANY MAN', '', 'empleado'),
(726, 1006823525, 'MARIA CAMILA CARDENAS URIZA', 'Cédula de Ciudadanía', 'Profesional de Proyectos', 'COMPANY MAN', '2023-09-19', '000000', 'mariaccu@hotmail.es', '000000', '1006823525', 'COMPANY MAN', '', 'empleado'),
(727, 1121848186, 'MARIA SHIRLEY ORDOÑEZ CUESTA', 'Cédula de Ciudadanía', 'Profesional Administrativa y de Gestión Humana, Proyectos', 'COMPANY MAN', '2024-05-14', '000000', 'maria.ocuesta89@gmail.com', '000000', '1121848186', 'COMPANY MAN', '', 'empleado'),
(728, 1007493802, 'MICHAEL STIVEN RUIZ CARO', 'Cédula de Ciudadanía', 'Soporte Hseq II', 'COMPANY MAN', '2022-05-02', '000000', 'maikolruizc10@gmail.com', '000000', '1007493802', 'COMPANY MAN', '', 'empleado'),
(729, 1136887341, 'NIDIA CAROLINA GRANDAS CASTAÑEDA', 'Cédula de Ciudadanía', 'Profesional de Proyectos', 'COMPANY MAN', '2022-06-01', '000000', 'carograndas@outlook.com', '000000', '1136887341', 'COMPANY MAN', '', 'empleado'),
(730, 1004346165, 'SABRINA SALOME SANJUANELO SALAS', 'Cédula de Ciudadanía', 'Profesional de Proyectos', 'COMPANY MAN', '2023-07-12', '000000', 'sabrinasanjuane@hotmail.com', '000000', '1004346165', 'COMPANY MAN', '', 'empleado'),
(731, 1022407009, 'ANGGIE ESTEFANIA ALONSO RUIZ', 'Cédula de Ciudadanía', 'Tecnico Asistente Administrativa', 'COMPANY MAN', '2024-09-16', '000000', 'angieestefaniaalonso@gmail.com', '000000', '1022407009', 'COMPANY MAN', '', 'empleado'),
(732, 1121869050, 'YENNI PAOLA DONCEL ACHO', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3A', 'COMPANY MAN', '2024-08-01', '000000', 'yenni.doncel08@hotmail.com', '000000', '1121869050', 'COMPANY MAN', '', 'empleado'),
(733, 9102183, 'URIEL HERNAN PINEDA GOMEZ', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3A', 'COMPANY MAN', '2024-08-01', '000000', 'upineg@hotmail.com', '000000', '9102183', 'COMPANY MAN', '', 'empleado'),
(734, 26430509, 'YENNY LOLITA GARCIA BETANCOURT', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3A', 'COMPANY MAN', '2024-08-01', '000000', 'yen289@hotmail.com', '000000', '26430509', 'COMPANY MAN', '', 'empleado'),
(735, 1121825022, 'CAMILO ANDRES PATARROYO VARON', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3A', 'COMPANY MAN', '2024-08-01', '000000', 'patacam86@hotmail.com', '000000', '1121825022', 'COMPANY MAN', '', 'empleado'),
(736, 1121871041, 'JORGE LEONARDO  MOYANO PEÑA', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3A', 'COMPANY MAN', '2024-08-01', '000000', 'jorgeleo-07@hotmail.com', '000000', '1121871041', 'COMPANY MAN', '', 'empleado'),
(737, 6165500, 'JOSE DANIEL GONZALEZ OJEDA', 'PPT', 'Soporte Operativo Tipo 3A', 'COMPANY MAN', '2024-08-01', '000000', 'josegonzalezing1@gmail.com', '000000', '6165500', 'COMPANY MAN', '', 'empleado'),
(738, 411134, 'RAFAEL ENRIQUE URDANETA MORAN', 'PPT', 'Soporte Operativo Tipo 3A', 'COMPANY MAN', '2024-08-01', '000000', 'rafael.urdaneta1974@gmail.com', '000000', '411134', 'COMPANY MAN', '', 'empleado'),
(739, 13874046, 'JHON FREDDY PABON SANCHEZ', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3A', 'COMPANY MAN', '2024-08-01', '000000', 'jhonfreddypabon@hotmail.com', '000000', '13874046', 'COMPANY MAN', '', 'empleado'),
(740, 1010185219, 'AIDA FAISULY AVILA MORALES', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3A', 'COMPANY MAN', '2024-08-01', '000000', 'aidaavilam@gmail.com', '000000', '1010185219', 'COMPANY MAN', '', 'empleado'),
(741, 37949528, 'OLGA LUCIA RUEDA FIGUEREDO', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3A', 'COMPANY MAN', '2024-08-01', '000000', 'olga.ruedafigueredo@gmail.com', '000000', '37949528', 'COMPANY MAN', '', 'empleado'),
(742, 7723895, 'SERAFIN VANEGAS CARDOSO', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3B', 'COMPANY MAN', '2024-08-03', '000000', 'ingenierovanegas@gmail.com', '000000', '7723895', 'COMPANY MAN', '', 'empleado'),
(743, 86084413, 'CAMILO ANDRES RIAÑO GALVIS', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3B', 'COMPANY MAN', '2024-08-01', '000000', 'andres.rianog84@gmail.com', '000000', '86084413', 'COMPANY MAN', '', 'empleado'),
(744, 86068586, 'SERGIO VELEZ CARDONA', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3B', 'COMPANY MAN', '2024-08-03', '000000', 'servelez80@hotmail.com', '000000', '86068586', 'COMPANY MAN', '', 'empleado'),
(745, 12197484, 'HARRIZON ALEXANDER RIVERA ARENAS', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3B', 'COMPANY MAN', '2024-08-01', '000000', 'harrizoning590@hotmail.com', '000000', '12197484', 'COMPANY MAN', '', 'empleado'),
(746, 53014035, 'ANDREA PAOLA GUTIERREZ RAMIREZ', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 4A', 'COMPANY MAN', '2024-08-01', '000000', 'andreitagutierrez0707@gmail.com', '000000', '53014035', 'COMPANY MAN', '', 'empleado'),
(747, 1057580446, 'JUAN PABLO RAMIREZ DIAZ', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 4A', 'COMPANY MAN', '2024-08-01', '000000', 'juanpianoo@gmail.com', '000000', '1057580446', 'COMPANY MAN', '', 'empleado'),
(748, 1055313459, 'EDWARD FABIAN GALINDO VEGA', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 4A', 'COMPANY MAN', '2024-08-01', '000000', 'edwgv14@hotmail.com', '000000', '1055313459', 'COMPANY MAN', '', 'empleado'),
(749, 74375671, 'JULIO EDGARDO VILLAMIL MONDRAGON', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 2', 'COMPANY MAN', '2024-08-01', '000000', 'juedvimon@hotmail.com', '000000', '74375671', 'COMPANY MAN', '', 'empleado'),
(750, 98398935, 'GUSTAVO LEON DELGADO ZAMBRANO', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 2', 'COMPANY MAN', '2024-08-07', '000000', 'gustdelz@hotmail.com', '000000', '98398935', 'COMPANY MAN', '', 'empleado'),
(751, 71376583, 'HUGO FERNANDO RODRIGUEZ', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 3', 'COMPANY MAN', '2024-08-01', '000000', 'huferod2023@gmail.com', '000000', '71376583', 'COMPANY MAN', '', 'empleado'),
(752, 86057747, 'ALEXANDER RONDON', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 3', 'COMPANY MAN', '2024-08-01', '000000', 'alexro29@yahoo.com', '000000', '86057747', 'COMPANY MAN', '', 'empleado'),
(753, 1098622402, 'JUAN GABRIEL ESTERLIN', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 4', 'COMPANY MAN', '2024-08-07', '000000', 'juangabrielesterlin@hotmail.com', '000000', '1098622402', 'COMPANY MAN', '', 'empleado'),
(754, 7711125, 'OSCAR FERNANDO OSPINA OSORIO', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 2', 'COMPANY MAN', '2024-08-17', '000000', 'o.ospinaosorio@hotmail.com', '000000', '7711125', 'COMPANY MAN', '', 'empleado'),
(755, 1082067533, 'AGUSTIN JOSE RONCALLO CERVANTES', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3B', 'COMPANY MAN', '2024-09-02', '000000', 'roncalloagustin@gmail.com', '000000', '1082067533', 'COMPANY MAN', '', 'empleado'),
(756, 42116896, 'ANGELA MARIA HERNANDEZ TAPIAS', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 2', 'COMPANY MAN', '2024-10-21', '000000', 'anmaheta@hotmail.com', '000000', '42116896', 'COMPANY MAN', '', 'empleado'),
(757, 86042335, 'GUTEMBERG ALAINEGOMEZ RIVERA', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 3', 'COMPANY MAN', '2024-02-17', '000000', 'gutemberg.gomez@yahoo.com', '000000', '86042335', 'COMPANY MAN', '', 'empleado'),
(758, 1002691928, 'JUAN CARLOSSAAVEDRA BOHORQUEZ', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 5A', 'COMPANY MAN', '2024-02-17', '000000', 'juancho811.js@gmail.com', '000000', '1002691928', 'COMPANY MAN', '', 'empleado'),
(759, 1019099925, 'ANGIE PAOLA LONDOÑO CADENA', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 4B', 'COMPANY MAN', '2024-02-19', '000000', 'angie.londono.cadena@gmail.com', '000000', '1019099925', 'COMPANY MAN', '', 'empleado'),
(760, 1013678265, 'JAVIER EDUARDOROJAS PRIETO', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 5A', 'COMPANY MAN', '2024-02-19', '000000', 'javierrojas1214@gmail.com', '000000', '1013678265', 'COMPANY MAN', '', 'empleado'),
(761, 86075700, 'JOSE LUISVELEZ CARDONA', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3B', 'COMPANY MAN', '2024-02-19', '000000', 'jose.velezcardona@hotmail.com', '000000', '86075700', 'COMPANY MAN', '', 'empleado'),
(762, 12136584, 'GUSTAVO CESAR FIERRO GUALY', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 2', 'COMPANY MAN', '2024-08-14', '000000', 'gfierro968@gmail.com', '000000', '12136584', 'COMPANY MAN', '', 'empleado'),
(763, 13707063, 'MISAEL GONZALEZ RUIZ', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 3', 'COMPANY MAN', '2024-08-23', '000000', 'misaelgonzalezruiz76@outlook.com', '000000', '13707063', 'COMPANY MAN', '', 'empleado'),
(764, 1122135336, 'MARIA DEL PILAR   RODRIGUEZ SANCHEZ', 'Cédula de Ciudadanía', 'Profesional Soporte en Campo', 'COMPANY MAN', '2024-09-02', '000000', 'pilar.rodriguez23@hotmail.com', '000000', '1122135336', 'COMPANY MAN', '', 'empleado'),
(765, 1065810992, 'JOSE CARLOS BAQUERO PEÑALOZA', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 4B', 'COMPANY MAN', '2024-09-10', '000000', 'Josecarlosbaquero1994@gmail.com', '000000', '1065810992', 'COMPANY MAN', '', 'empleado'),
(766, 13700520, 'CESAR AUGUSTO REYES BALLESTEROS', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 2', 'COMPANY MAN', '2024-10-01', '000000', 'cesarym1@hotmail.com', '000000', '13700520', 'COMPANY MAN', '', 'empleado'),
(767, 1077173073, 'ESTEBAN GARCIA ROJAS', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 3', 'COMPANY MAN', '2024-10-01', '000000', 'estebangr1987@gmail.com', '000000', '1077173073', 'COMPANY MAN', '', 'empleado'),
(768, 86072643, 'BERARDO GIRALDO GAITAN', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 3', 'COMPANY MAN', '2024-10-01', '000000', 'lordberar@hotmail.com', '000000', '86072643', 'COMPANY MAN', '', 'empleado'),
(769, 7161987, 'CARLOS SAUL CELIS ACERO', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 3', 'COMPANY MAN', '2024-10-01', '000000', 'celiscarloss@gmail.com', '000000', '7161987', 'COMPANY MAN', '', 'empleado'),
(770, 11189101, 'JOSE MAURICIO APONTE ABRIL', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 3', 'COMPANY MAN', '2024-10-01', '000000', 'mauricioaponte@hotmail.com', '000000', '11189101', 'COMPANY MAN', '', 'empleado'),
(771, 13871188, 'PEDRO RAFAEL CADENA ORDOÑEZ', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 3', 'COMPANY MAN', '2024-10-03', '000000', 'pedro.cadena@outlook.com', '000000', '13871188', 'COMPANY MAN', '', 'empleado'),
(772, 13481943, 'JUAN CARLOS DURAN ZAPATA', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 1', 'COMPANY MAN', '2024-10-01', '000000', 'juducaza@hotmail.com', '000000', '13481943', 'COMPANY MAN', '', 'empleado'),
(773, 74362501, 'DANIEL SEGURA ESPINOSA', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 1', 'COMPANY MAN', '2024-10-01', '000000', 'Segura.7305@gmail.com', '000000', '74362501', 'COMPANY MAN', '', 'empleado'),
(774, 80150738, 'WILBER CASTAÑEDA CASTAÑEDA', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 1', 'COMPANY MAN', '2024-10-01', '000000', 'wilbercastaeda@gmail.com', '000000', '80150738', 'COMPANY MAN', '', 'empleado'),
(775, 79208337, 'CARLOS ALBERTO RAMIREZ ESCOBAR', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 2', 'COMPANY MAN', '2024-10-01', '000000', 'carami70mx@yahoo.com.mx', '000000', '79208337', 'COMPANY MAN', '', 'empleado'),
(776, 1032461712, 'BRAYAN ALEJANDRO MONROY PINZON', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3A', 'COMPANY MAN', '2024-10-01', '000000', 'b.alejandro1345@hotmail.com', '000000', '1032461712', 'COMPANY MAN', '', 'empleado'),
(777, 1115914517, 'CAMILO ANDRES IBAÑEZ ROZO', 'Cédula de Ciudadanía', 'Soporte Operativo Tipo 3A', 'COMPANY MAN', '2024-10-01', '000000', 'Ingcamilo.ibanez@gmail.com', '000000', '1115914517', 'COMPANY MAN', '', 'empleado'),
(778, 80100600, 'LUIS GUILLERMO MERCADO RICO', 'Cédula de Ciudadanía', 'Supervisor de Operaciones en Pozos Tipo 3', 'COMPANY MAN', '2024-10-01', '000000', 'luis.guillermo.mercado@gmail.com', '000000', '80100600', 'COMPANY MAN', '', 'empleado'),
(779, 1075271569, 'ALVARO JAVIERQUIMBAYA MONTEALEGRE', 'Cédula de Ciudadanía', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D3', 'FRONTERA', '2024-03-22', '000000', 'alvarojqm@gmail.com', '000000', '1075271569', 'FRONTERA', '', 'empleado'),
(780, 1098774228, 'ANGELICA MARIA GONZALEZ SANCHEZ', 'Cédula de Ciudadanía', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D2', 'FRONTERA', '2024-07-08', '000000', 'ing.gonzalez.angelica@gmail.com', '000000', '1098774228', 'FRONTERA', '', 'empleado'),
(781, 1053788938, 'GUSTAVO ADOLFO GIRALDO CORREA', 'Cédula de Ciudadanía', 'Profesional de Proyectos A1', 'FRONTERA', '2019-11-01', '000000', 'ggiraldocorrea@gmail.com', '000000', '1053788938', 'FRONTERA', '', 'empleado'),
(782, 1075248439, 'MARIA DEL PILAR GOMEZ MORA', 'Cédula de Ciudadanía', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D1', 'FRONTERA', '2024-12-03', '000000', 'mdpgomezm@gmail.com', '000000', '1075248439', 'FRONTERA', '', 'empleado'),
(783, 1121913534, 'MARIA MONICA SIERRA CESPEDES', 'Cédula de Ciudadanía', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D1', 'FRONTERA', '2024-03-22', '000000', 'mariamonicasc@hotmail.com', '000000', '1121913534', 'FRONTERA', '', 'empleado'),
(784, 1026267917, 'WENDY ZAMANDA FONSECA HURTADO', 'Cédula de Ciudadanía', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D1', 'FRONTERA', '2024-02-09', '000000', 'zamandafh1988@gmail.com', '000000', '1026267917', 'FRONTERA', '', 'empleado'),
(785, 1098712563, 'WILMAN ENRIQUE ALVAREZ QUIROZ', 'Cédula de Ciudadanía', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D1', 'FRONTERA', '2023-09-26', '000000', 'wilman.alvarez1@hotmail.com', '000000', '1098712563', 'FRONTERA', '', 'empleado'),
(786, 1076660759, 'OSCAR FERNANDO BELLO RODRIGUEZ', 'Cédula de Ciudadanía', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D3', 'FRONTERA', '2024-03-15', '000000', 'osk_b@hotmail.com', '000000', '1076660759', 'FRONTERA', '', 'empleado'),
(787, 1019133012, 'DARIO ALEXANDER POMARE ORTEGA', 'Cédula de Ciudadanía', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D2', 'FRONTERA', '2024-01-26', '000000', 'dariopomare20@gmail.com', '000000', '1019133012', 'FRONTERA', '', 'empleado');
INSERT INTO `empleados` (`id_empleado`, `cedula`, `nombre`, `tipo_documento`, `cargo`, `area`, `fecha_inicio_contrato`, `numero_telefonico`, `email`, `telefono_empresa`, `contrasena`, `proyecto`, `ods`, `rol`) VALUES
(788, 1096955344, 'DANNY KARINA ORTIZ ORTIZ', 'Cédula de Ciudadanía', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D2', 'FRONTERA', '2024-03-01', '000000', 'dannykarina07@gmail.com', '000000', '1096955344', 'FRONTERA', '', 'empleado'),
(789, 1075295727, 'MIGUEL OCTAVIO FIERRO CASTRO', 'Cédula de Ciudadanía', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D1', 'FRONTERA', '2024-07-13', '000000', 'mfierrocastro@gmail.com', '000000', '1075295727', 'FRONTERA', '', 'empleado'),
(790, 1015449004, 'RICARDO ANDRES VARGAS CORREDOR', 'Cédula de Ciudadanía', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D1', 'FRONTERA', '2024-07-02', '000000', 'ricardoanvaco@gmail.com', '000000', '1015449004', 'FRONTERA', '', 'empleado'),
(791, 1019152161, 'DIEGO ALEJANDRO ACUÑA QUINTERO', 'Cédula de Ciudadanía', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforación Completamiento y Workover D3', 'FRONTERA', '2024-07-12', '000000', 'dacua8@gmail.com', '000000', '1019152161', 'FRONTERA', '', 'empleado'),
(792, 1032446831, 'ELIANA IVETH ALARCON RONDON', 'Cédula de Ciudadanía', 'Profesional de Proyectos B1', 'PETROSERVICIOS', '2024-08-22', '000000', 'nana.alarcon08@hotmail.com', '000000', '1032446831', 'PETROSERVICIOS', '', 'jefe'),
(794, 1011202252, 'JOSE MATEO LOPEZ CIFUENTES', 'Cédula de Ciudadanía', 'Aprendiz Programacion', 'Administrativa ', '2024-12-23', '3208023808', 'josemateolopezcifuentes@gmail.com', NULL, '1011202252', NULL, NULL, 'admin');

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
  `estado_evaluacion` enum('BORRADOR','COMPLETADA','APROBADA') DEFAULT 'BORRADOR',
  `id_jefe` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `evaluacion`
--

INSERT INTO `evaluacion` (`id_evaluacion`, `id_empleado`, `fecha_evaluacion`, `periodo_evaluacion`, `observaciones_generales`, `estado_evaluacion`, `id_jefe`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(2, 794, '2025-09-08 14:15:09', '2025-09', NULL, 'BORRADOR', 589, '2025-09-08 14:15:09', '2025-09-08 14:15:09'),
(3, 794, '2025-09-08 14:34:39', '2025-09', NULL, 'BORRADOR', 589, '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(4, 794, '2025-09-08 14:41:08', '2025-09', NULL, 'BORRADOR', 589, '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(5, 794, '2025-09-08 14:44:10', '2025-09', NULL, 'BORRADOR', 589, '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(6, 794, '2025-09-08 14:54:28', '2025-09', NULL, 'BORRADOR', 589, '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(7, 794, '2025-09-08 14:58:28', '2025-09', NULL, 'BORRADOR', 773, '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(8, 794, '2025-09-08 15:14:16', '2025-09', NULL, 'BORRADOR', 589, '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(9, 794, '2025-09-08 15:29:41', '2025-09', NULL, 'BORRADOR', 589, '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(10, 794, '2025-09-09 11:11:55', '2025-09', NULL, 'COMPLETADA', 589, '2025-09-09 11:11:55', '2025-09-10 08:52:52'),
(11, 794, '2025-09-09 15:09:50', '2025-09', NULL, 'BORRADOR', 590, '2025-09-09 15:09:50', '2025-09-09 15:09:50');

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
(1, 2, 1, 'Utiliza canales de comunicación, en su diversa expresión, con claridad, precisión y tono agradable para el receptor', '5', '', 2.50, '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(2, 2, 2, 'Redacta textos, informes, mensajes, cuadros o  gráficas con claridad en la expresión para ser efectiva y sencilla la comprensión', '5', '', 2.50, '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(3, 2, 3, 'Mantiene escucha y lectura atenta a efectos de  comprender mejor los mensajes o información recibida.', '5', '', 2.50, '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(4, 2, 4, 'Da respuesta a cada comunicación recibida de modo inmediato', '4', '', 2.00, '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(5, 2, 5, 'Adopta las decisiones tomadas para ejercer sus actividades individuales y las adoptadas para el trabajo en equipo por preferencia', '5', '', 2.50, '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(6, 2, 6, 'Maneja criterios objetivos para analizar las formas a deducir con las personas involucradas.', '4', '', 2.00, '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(7, 2, 7, 'Aporta soluciones alternativas en lo que refiere a sus saberes específicos.', '2', '', 1.00, '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(8, 2, 8, 'Informa su experiencia especializada en el proceso de toma de decisiones que involucran aspectos de su especialidad.', '5', '', 2.50, '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(9, 2, 9, 'Anticipa problemas y posibles que advierten su carácter de especialista.', '4', '', 2.00, '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(10, 2, 10, 'Asume la interdisciplinariedad aprovechando puntos de vista diversos y alternativa al propio, para analizar y proponer soluciones posibles.', '4', '', 2.00, '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(11, 2, 11, 'Articula sus actuaciones con las de los demás', '2', '', 1.00, '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(12, 2, 12, 'Cumple los compromisos adquiridos', '3', '', 1.50, '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(13, 2, 13, 'Facilita la labor de sus supervisores y compañeros de trabajo', '4', '', 2.00, '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(14, 2, 14, 'Escucha con interés y capta las necesidades de los demás.', '3', '', 1.50, '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(15, 2, 15, 'Transmite la información de forma fidedigna evitando situaciones que puedan generar deterioro en el ambiente laboral.', '5', '', 2.50, '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(16, 2, 16, 'Toma la iniciativa en el contacto con cliente interno y externo para dar avisos, citar o respuestas, utilizando un lenguaje claro para los destinatarios.', '5', '', 2.50, '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(17, 2, 17, 'Ejecuta sus tareas con los criterios de calidad establecidos.', '5', '', 2.50, '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(18, 2, 18, 'Revisa procedimientos e instrumentos para mejorar tiempos y resultados y para anticipar soluciones a problemas.', '3', '', 1.50, '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(19, 2, 19, 'Desarrolla las actividades de acuerdo con las pautas y protocolos definidos.', '4', '', 2.00, '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(20, 2, 20, 'Cumple de manera consistente y oportuna las funciones específicas asignadas a su cargo.', '5', '', 2.50, '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(21, 2, 21, 'Demuestra dominio técnico y procedimental en las tareas críticas del rol.', '5', '', 2.50, '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(22, 2, 22, 'Entrega resultados alineados con los estándares y tiempos definidos para su cargo.', '5', '', 2.50, '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(23, 2, 23, 'Prioriza y organiza sus funciones para asegurar cumplimiento sin reprocesos.', '4', '', 2.00, '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(24, 3, 1, 'Utiliza canales de comunicación, en su diversa expresión, con claridad, precisión y tono agradable para el receptor', '5', '', 2.50, '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(25, 3, 2, 'Redacta textos, informes, mensajes, cuadros o  gráficas con claridad en la expresión para ser efectiva y sencilla la comprensión', '5', '', 2.50, '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(26, 3, 3, 'Mantiene escucha y lectura atenta a efectos de  comprender mejor los mensajes o información recibida.', '5', '', 2.50, '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(27, 3, 4, 'Da respuesta a cada comunicación recibida de modo inmediato', '4', '', 2.00, '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(28, 3, 5, 'Adopta las decisiones tomadas para ejercer sus actividades individuales y las adoptadas para el trabajo en equipo por preferencia', '5', '', 2.50, '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(29, 3, 6, 'Maneja criterios objetivos para analizar las formas a deducir con las personas involucradas.', '4', '', 2.00, '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(30, 3, 7, 'Aporta soluciones alternativas en lo que refiere a sus saberes específicos.', '2', '', 1.00, '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(31, 3, 8, 'Informa su experiencia especializada en el proceso de toma de decisiones que involucran aspectos de su especialidad.', '5', '', 2.50, '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(32, 3, 9, 'Anticipa problemas y posibles que advierten su carácter de especialista.', '4', '', 2.00, '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(33, 3, 10, 'Asume la interdisciplinariedad aprovechando puntos de vista diversos y alternativa al propio, para analizar y proponer soluciones posibles.', '4', '', 2.00, '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(34, 3, 11, 'Articula sus actuaciones con las de los demás', '2', '', 1.00, '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(35, 3, 12, 'Cumple los compromisos adquiridos', '3', '', 1.50, '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(36, 3, 13, 'Facilita la labor de sus supervisores y compañeros de trabajo', '4', '', 2.00, '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(37, 3, 14, 'Escucha con interés y capta las necesidades de los demás.', '3', '', 1.50, '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(38, 3, 15, 'Transmite la información de forma fidedigna evitando situaciones que puedan generar deterioro en el ambiente laboral.', '5', '', 2.50, '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(39, 3, 16, 'Toma la iniciativa en el contacto con cliente interno y externo para dar avisos, citar o respuestas, utilizando un lenguaje claro para los destinatarios.', '5', '', 2.50, '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(40, 3, 17, 'Ejecuta sus tareas con los criterios de calidad establecidos.', '5', '', 2.50, '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(41, 3, 18, 'Revisa procedimientos e instrumentos para mejorar tiempos y resultados y para anticipar soluciones a problemas.', '3', '', 1.50, '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(42, 3, 19, 'Desarrolla las actividades de acuerdo con las pautas y protocolos definidos.', '4', '', 2.00, '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(43, 3, 20, 'Cumple de manera consistente y oportuna las funciones específicas asignadas a su cargo.', '5', '', 2.50, '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(44, 3, 21, 'Demuestra dominio técnico y procedimental en las tareas críticas del rol.', '5', '', 2.50, '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(45, 3, 22, 'Entrega resultados alineados con los estándares y tiempos definidos para su cargo.', '5', '', 2.50, '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(46, 3, 23, 'Prioriza y organiza sus funciones para asegurar cumplimiento sin reprocesos.', '4', '', 2.00, '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(47, 4, 1, 'Utiliza canales de comunicación, en su diversa expresión, con claridad, precisión y tono agradable para el receptor', '5', '', 2.50, '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(48, 4, 2, 'Redacta textos, informes, mensajes, cuadros o  gráficas con claridad en la expresión para ser efectiva y sencilla la comprensión', '4', '', 2.00, '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(49, 4, 3, 'Mantiene escucha y lectura atenta a efectos de  comprender mejor los mensajes o información recibida.', '2', '', 1.00, '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(50, 4, 4, 'Da respuesta a cada comunicación recibida de modo inmediato', '4', '', 2.00, '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(51, 4, 5, 'Adopta las decisiones tomadas para ejercer sus actividades individuales y las adoptadas para el trabajo en equipo por preferencia', '2', '', 1.00, '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(52, 4, 6, 'Maneja criterios objetivos para analizar las formas a deducir con las personas involucradas.', '3', '', 1.50, '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(53, 4, 7, 'Aporta soluciones alternativas en lo que refiere a sus saberes específicos.', '4', '', 2.00, '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(54, 4, 8, 'Informa su experiencia especializada en el proceso de toma de decisiones que involucran aspectos de su especialidad.', '5', '', 2.50, '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(55, 4, 9, 'Anticipa problemas y posibles que advierten su carácter de especialista.', '3', '', 1.50, '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(56, 4, 10, 'Asume la interdisciplinariedad aprovechando puntos de vista diversos y alternativa al propio, para analizar y proponer soluciones posibles.', '4', '', 2.00, '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(57, 4, 11, 'Articula sus actuaciones con las de los demás', '4', '', 2.00, '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(58, 4, 12, 'Cumple los compromisos adquiridos', '3', '', 1.50, '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(59, 4, 13, 'Facilita la labor de sus supervisores y compañeros de trabajo', '2', '', 1.00, '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(60, 4, 14, 'Escucha con interés y capta las necesidades de los demás.', '3', '', 1.50, '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(61, 4, 15, 'Transmite la información de forma fidedigna evitando situaciones que puedan generar deterioro en el ambiente laboral.', '3', '', 1.50, '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(62, 4, 16, 'Toma la iniciativa en el contacto con cliente interno y externo para dar avisos, citar o respuestas, utilizando un lenguaje claro para los destinatarios.', '4', '', 2.00, '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(63, 4, 17, 'Ejecuta sus tareas con los criterios de calidad establecidos.', '4', '', 2.00, '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(64, 4, 18, 'Revisa procedimientos e instrumentos para mejorar tiempos y resultados y para anticipar soluciones a problemas.', '3', '', 1.50, '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(65, 4, 19, 'Desarrolla las actividades de acuerdo con las pautas y protocolos definidos.', '2', '', 1.00, '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(66, 4, 20, 'Cumple de manera consistente y oportuna las funciones específicas asignadas a su cargo.', '2', '', 1.00, '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(67, 4, 21, 'Demuestra dominio técnico y procedimental en las tareas críticas del rol.', '3', '', 1.50, '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(68, 4, 22, 'Entrega resultados alineados con los estándares y tiempos definidos para su cargo.', '5', '', 2.50, '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(69, 4, 23, 'Prioriza y organiza sus funciones para asegurar cumplimiento sin reprocesos.', '5', '', 2.50, '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(70, 5, 1, 'Utiliza canales de comunicación, en su diversa expresión, con claridad, precisión y tono agradable para el receptor', '5', '', 2.50, '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(71, 5, 2, 'Redacta textos, informes, mensajes, cuadros o  gráficas con claridad en la expresión para ser efectiva y sencilla la comprensión', '4', '', 2.00, '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(72, 5, 3, 'Mantiene escucha y lectura atenta a efectos de  comprender mejor los mensajes o información recibida.', '2', '', 1.00, '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(73, 5, 4, 'Da respuesta a cada comunicación recibida de modo inmediato', '4', '', 2.00, '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(74, 5, 5, 'Adopta las decisiones tomadas para ejercer sus actividades individuales y las adoptadas para el trabajo en equipo por preferencia', '2', '', 1.00, '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(75, 5, 6, 'Maneja criterios objetivos para analizar las formas a deducir con las personas involucradas.', '3', '', 1.50, '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(76, 5, 7, 'Aporta soluciones alternativas en lo que refiere a sus saberes específicos.', '4', '', 2.00, '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(77, 5, 8, 'Informa su experiencia especializada en el proceso de toma de decisiones que involucran aspectos de su especialidad.', '5', '', 2.50, '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(78, 5, 9, 'Anticipa problemas y posibles que advierten su carácter de especialista.', '3', '', 1.50, '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(79, 5, 10, 'Asume la interdisciplinariedad aprovechando puntos de vista diversos y alternativa al propio, para analizar y proponer soluciones posibles.', '4', '', 2.00, '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(80, 5, 11, 'Articula sus actuaciones con las de los demás', '4', '', 2.00, '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(81, 5, 12, 'Cumple los compromisos adquiridos', '3', '', 1.50, '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(82, 5, 13, 'Facilita la labor de sus supervisores y compañeros de trabajo', '2', '', 1.00, '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(83, 5, 14, 'Escucha con interés y capta las necesidades de los demás.', '3', '', 1.50, '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(84, 5, 15, 'Transmite la información de forma fidedigna evitando situaciones que puedan generar deterioro en el ambiente laboral.', '3', '', 1.50, '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(85, 5, 16, 'Toma la iniciativa en el contacto con cliente interno y externo para dar avisos, citar o respuestas, utilizando un lenguaje claro para los destinatarios.', '4', '', 2.00, '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(86, 5, 17, 'Ejecuta sus tareas con los criterios de calidad establecidos.', '4', '', 2.00, '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(87, 5, 18, 'Revisa procedimientos e instrumentos para mejorar tiempos y resultados y para anticipar soluciones a problemas.', '3', '', 1.50, '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(88, 5, 19, 'Desarrolla las actividades de acuerdo con las pautas y protocolos definidos.', '2', '', 1.00, '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(89, 5, 20, 'Cumple de manera consistente y oportuna las funciones específicas asignadas a su cargo.', '2', '', 1.00, '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(90, 5, 21, 'Demuestra dominio técnico y procedimental en las tareas críticas del rol.', '3', '', 1.50, '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(91, 5, 22, 'Entrega resultados alineados con los estándares y tiempos definidos para su cargo.', '5', '', 2.50, '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(92, 5, 23, 'Prioriza y organiza sus funciones para asegurar cumplimiento sin reprocesos.', '5', '', 2.50, '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(93, 6, 1, 'Utiliza canales de comunicación, en su diversa expresión, con claridad, precisión y tono agradable para el receptor', '4', '', 2.00, '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(94, 6, 2, 'Redacta textos, informes, mensajes, cuadros o  gráficas con claridad en la expresión para ser efectiva y sencilla la comprensión', '2', '', 1.00, '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(95, 6, 3, 'Mantiene escucha y lectura atenta a efectos de  comprender mejor los mensajes o información recibida.', '2', '', 1.00, '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(96, 6, 4, 'Da respuesta a cada comunicación recibida de modo inmediato', '1', '', 0.50, '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(97, 6, 5, 'Adopta las decisiones tomadas para ejercer sus actividades individuales y las adoptadas para el trabajo en equipo por preferencia', '5', '', 2.50, '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(98, 6, 6, 'Maneja criterios objetivos para analizar las formas a deducir con las personas involucradas.', '3', '', 1.50, '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(99, 6, 7, 'Aporta soluciones alternativas en lo que refiere a sus saberes específicos.', '2', '', 1.00, '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(100, 6, 8, 'Informa su experiencia especializada en el proceso de toma de decisiones que involucran aspectos de su especialidad.', '2', '', 1.00, '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(101, 6, 9, 'Anticipa problemas y posibles que advierten su carácter de especialista.', '2', '', 1.00, '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(102, 6, 10, 'Asume la interdisciplinariedad aprovechando puntos de vista diversos y alternativa al propio, para analizar y proponer soluciones posibles.', '2', '', 1.00, '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(103, 6, 11, 'Articula sus actuaciones con las de los demás', '2', '', 1.00, '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(104, 6, 12, 'Cumple los compromisos adquiridos', '3', '', 1.50, '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(105, 6, 13, 'Facilita la labor de sus supervisores y compañeros de trabajo', '2', '', 1.00, '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(106, 6, 14, 'Escucha con interés y capta las necesidades de los demás.', '3', '', 1.50, '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(107, 6, 15, 'Transmite la información de forma fidedigna evitando situaciones que puedan generar deterioro en el ambiente laboral.', '3', '', 1.50, '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(108, 6, 16, 'Toma la iniciativa en el contacto con cliente interno y externo para dar avisos, citar o respuestas, utilizando un lenguaje claro para los destinatarios.', '3', '', 1.50, '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(109, 6, 17, 'Ejecuta sus tareas con los criterios de calidad establecidos.', '3', '', 1.50, '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(110, 6, 18, 'Revisa procedimientos e instrumentos para mejorar tiempos y resultados y para anticipar soluciones a problemas.', '2', '', 1.00, '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(111, 6, 19, 'Desarrolla las actividades de acuerdo con las pautas y protocolos definidos.', '3', '', 1.50, '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(112, 6, 20, 'Cumple de manera consistente y oportuna las funciones específicas asignadas a su cargo.', '3', '', 1.50, '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(113, 6, 21, 'Demuestra dominio técnico y procedimental en las tareas críticas del rol.', '4', '', 2.00, '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(114, 6, 22, 'Entrega resultados alineados con los estándares y tiempos definidos para su cargo.', '5', '', 2.50, '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(115, 6, 23, 'Prioriza y organiza sus funciones para asegurar cumplimiento sin reprocesos.', '5', '', 2.50, '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(116, 7, 1, 'Utiliza canales de comunicación, en su diversa expresión, con claridad, precisión y tono agradable para el receptor', '5', '', 2.50, '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(117, 7, 2, 'Redacta textos, informes, mensajes, cuadros o  gráficas con claridad en la expresión para ser efectiva y sencilla la comprensión', '2', '', 1.00, '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(118, 7, 3, 'Mantiene escucha y lectura atenta a efectos de  comprender mejor los mensajes o información recibida.', '4', '', 2.00, '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(119, 7, 4, 'Da respuesta a cada comunicación recibida de modo inmediato', '2', '', 1.00, '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(120, 7, 5, 'Adopta las decisiones tomadas para ejercer sus actividades individuales y las adoptadas para el trabajo en equipo por preferencia', '5', '', 2.50, '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(121, 7, 6, 'Maneja criterios objetivos para analizar las formas a deducir con las personas involucradas.', '3', '', 1.50, '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(122, 7, 7, 'Aporta soluciones alternativas en lo que refiere a sus saberes específicos.', '4', '', 2.00, '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(123, 7, 8, 'Informa su experiencia especializada en el proceso de toma de decisiones que involucran aspectos de su especialidad.', '5', '', 2.50, '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(124, 7, 9, 'Anticipa problemas y posibles que advierten su carácter de especialista.', '4', '', 2.00, '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(125, 7, 10, 'Asume la interdisciplinariedad aprovechando puntos de vista diversos y alternativa al propio, para analizar y proponer soluciones posibles.', '4', '', 2.00, '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(126, 7, 11, 'Articula sus actuaciones con las de los demás', '4', '', 2.00, '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(127, 7, 12, 'Cumple los compromisos adquiridos', '4', '', 2.00, '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(128, 7, 13, 'Facilita la labor de sus supervisores y compañeros de trabajo', '5', '', 2.50, '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(129, 7, 14, 'Escucha con interés y capta las necesidades de los demás.', '4', '', 2.00, '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(130, 7, 15, 'Transmite la información de forma fidedigna evitando situaciones que puedan generar deterioro en el ambiente laboral.', '4', '', 2.00, '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(131, 7, 16, 'Toma la iniciativa en el contacto con cliente interno y externo para dar avisos, citar o respuestas, utilizando un lenguaje claro para los destinatarios.', '4', '', 2.00, '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(132, 7, 17, 'Ejecuta sus tareas con los criterios de calidad establecidos.', '4', '', 2.00, '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(133, 7, 18, 'Revisa procedimientos e instrumentos para mejorar tiempos y resultados y para anticipar soluciones a problemas.', '4', '', 2.00, '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(134, 7, 19, 'Desarrolla las actividades de acuerdo con las pautas y protocolos definidos.', '5', '', 2.50, '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(135, 7, 20, 'Cumple de manera consistente y oportuna las funciones específicas asignadas a su cargo.', '5', '', 2.50, '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(136, 7, 21, 'Demuestra dominio técnico y procedimental en las tareas críticas del rol.', '5', '', 2.50, '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(137, 7, 22, 'Entrega resultados alineados con los estándares y tiempos definidos para su cargo.', '4', '', 2.00, '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(138, 7, 23, 'Prioriza y organiza sus funciones para asegurar cumplimiento sin reprocesos.', '4', '', 2.00, '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(139, 8, 1, 'Utiliza canales de comunicación, en su diversa expresión, con claridad, precisión y tono agradable para el receptor', '5', '', 2.50, '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(140, 8, 2, 'Redacta textos, informes, mensajes, cuadros o  gráficas con claridad en la expresión para ser efectiva y sencilla la comprensión', '1', '', 0.50, '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(141, 8, 3, 'Mantiene escucha y lectura atenta a efectos de  comprender mejor los mensajes o información recibida.', '1', '', 0.50, '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(142, 8, 4, 'Da respuesta a cada comunicación recibida de modo inmediato', '1', '', 0.50, '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(143, 8, 5, 'Adopta las decisiones tomadas para ejercer sus actividades individuales y las adoptadas para el trabajo en equipo por preferencia', '4', '', 2.00, '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(144, 8, 6, 'Maneja criterios objetivos para analizar las formas a deducir con las personas involucradas.', '4', '', 2.00, '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(145, 8, 7, 'Aporta soluciones alternativas en lo que refiere a sus saberes específicos.', '4', '', 2.00, '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(146, 8, 8, 'Informa su experiencia especializada en el proceso de toma de decisiones que involucran aspectos de su especialidad.', '3', '', 1.50, '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(147, 8, 9, 'Anticipa problemas y posibles que advierten su carácter de especialista.', '3', '', 1.50, '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(148, 8, 10, 'Asume la interdisciplinariedad aprovechando puntos de vista diversos y alternativa al propio, para analizar y proponer soluciones posibles.', '2', '', 1.00, '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(149, 8, 11, 'Articula sus actuaciones con las de los demás', '4', '', 2.00, '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(150, 8, 12, 'Cumple los compromisos adquiridos', '3', '', 1.50, '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(151, 8, 13, 'Facilita la labor de sus supervisores y compañeros de trabajo', '3', '', 1.50, '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(152, 8, 14, 'Escucha con interés y capta las necesidades de los demás.', '5', '', 2.50, '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(153, 8, 15, 'Transmite la información de forma fidedigna evitando situaciones que puedan generar deterioro en el ambiente laboral.', '4', '', 2.00, '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(154, 8, 16, 'Toma la iniciativa en el contacto con cliente interno y externo para dar avisos, citar o respuestas, utilizando un lenguaje claro para los destinatarios.', '4', '', 2.00, '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(155, 8, 17, 'Ejecuta sus tareas con los criterios de calidad establecidos.', '4', '', 2.00, '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(156, 8, 18, 'Revisa procedimientos e instrumentos para mejorar tiempos y resultados y para anticipar soluciones a problemas.', '4', '', 2.00, '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(157, 8, 19, 'Desarrolla las actividades de acuerdo con las pautas y protocolos definidos.', '5', '', 2.50, '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(158, 8, 20, 'Cumple de manera consistente y oportuna las funciones específicas asignadas a su cargo.', '3', '', 1.50, '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(159, 8, 21, 'Demuestra dominio técnico y procedimental en las tareas críticas del rol.', '5', '', 2.50, '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(160, 8, 22, 'Entrega resultados alineados con los estándares y tiempos definidos para su cargo.', '4', '', 2.00, '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(161, 8, 23, 'Prioriza y organiza sus funciones para asegurar cumplimiento sin reprocesos.', '5', '', 2.50, '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(162, 9, 1, 'Utiliza canales de comunicación, en su diversa expresión, con claridad, precisión y tono agradable para el receptor', '4', '', 2.00, '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(163, 9, 2, 'Redacta textos, informes, mensajes, cuadros o  gráficas con claridad en la expresión para ser efectiva y sencilla la comprensión', '2', '', 1.00, '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(164, 9, 3, 'Mantiene escucha y lectura atenta a efectos de  comprender mejor los mensajes o información recibida.', '2', '', 1.00, '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(165, 9, 4, 'Da respuesta a cada comunicación recibida de modo inmediato', '2', '', 1.00, '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(166, 9, 5, 'Adopta las decisiones tomadas para ejercer sus actividades individuales y las adoptadas para el trabajo en equipo por preferencia', '2', '', 1.00, '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(167, 9, 6, 'Maneja criterios objetivos para analizar las formas a deducir con las personas involucradas.', '2', '', 1.00, '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(168, 9, 7, 'Aporta soluciones alternativas en lo que refiere a sus saberes específicos.', '1', '', 0.50, '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(169, 9, 8, 'Informa su experiencia especializada en el proceso de toma de decisiones que involucran aspectos de su especialidad.', '2', '', 1.00, '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(170, 9, 9, 'Anticipa problemas y posibles que advierten su carácter de especialista.', '2', '', 1.00, '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(171, 9, 10, 'Asume la interdisciplinariedad aprovechando puntos de vista diversos y alternativa al propio, para analizar y proponer soluciones posibles.', '1', '', 0.50, '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(172, 9, 11, 'Articula sus actuaciones con las de los demás', '1', '', 0.50, '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(173, 9, 12, 'Cumple los compromisos adquiridos', '2', '', 1.00, '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(174, 9, 13, 'Facilita la labor de sus supervisores y compañeros de trabajo', '1', '', 0.50, '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(175, 9, 14, 'Escucha con interés y capta las necesidades de los demás.', '1', '', 0.50, '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(176, 9, 15, 'Transmite la información de forma fidedigna evitando situaciones que puedan generar deterioro en el ambiente laboral.', '1', '', 0.50, '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(177, 9, 16, 'Toma la iniciativa en el contacto con cliente interno y externo para dar avisos, citar o respuestas, utilizando un lenguaje claro para los destinatarios.', '1', '', 0.50, '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(178, 9, 17, 'Ejecuta sus tareas con los criterios de calidad establecidos.', '1', '', 0.50, '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(179, 9, 18, 'Revisa procedimientos e instrumentos para mejorar tiempos y resultados y para anticipar soluciones a problemas.', '2', '', 1.00, '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(180, 9, 19, 'Desarrolla las actividades de acuerdo con las pautas y protocolos definidos.', '2', '', 1.00, '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(181, 9, 20, 'Cumple de manera consistente y oportuna las funciones específicas asignadas a su cargo.', '2', '', 1.00, '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(182, 9, 21, 'Demuestra dominio técnico y procedimental en las tareas críticas del rol.', '2', '', 1.00, '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(183, 9, 22, 'Entrega resultados alineados con los estándares y tiempos definidos para su cargo.', '3', '', 1.50, '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(184, 9, 23, 'Prioriza y organiza sus funciones para asegurar cumplimiento sin reprocesos.', '1', '', 0.50, '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(208, 11, 1, 'Utiliza canales de comunicación, en su diversa expresión, con claridad, precisión y tono agradable para el receptor', '5', '', 2.50, '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(209, 11, 2, 'Redacta textos, informes, mensajes, cuadros o  gráficas con claridad en la expresión para ser efectiva y sencilla la comprensión', '2', '', 1.00, '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(210, 11, 3, 'Mantiene escucha y lectura atenta a efectos de  comprender mejor los mensajes o información recibida.', '2', '', 1.00, '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(211, 11, 4, 'Da respuesta a cada comunicación recibida de modo inmediato', '2', '', 1.00, '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(212, 11, 5, 'Adopta las decisiones tomadas para ejercer sus actividades individuales y las adoptadas para el trabajo en equipo por preferencia', '4', '', 2.00, '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(213, 11, 6, 'Maneja criterios objetivos para analizar las formas a deducir con las personas involucradas.', '4', '', 2.00, '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(214, 11, 7, 'Aporta soluciones alternativas en lo que refiere a sus saberes específicos.', '2', '', 1.00, '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(215, 11, 8, 'Informa su experiencia especializada en el proceso de toma de decisiones que involucran aspectos de su especialidad.', '5', '', 2.50, '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(216, 11, 9, 'Anticipa problemas y posibles que advierten su carácter de especialista.', '1', '', 0.50, '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(217, 11, 10, 'Asume la interdisciplinariedad aprovechando puntos de vista diversos y alternativa al propio, para analizar y proponer soluciones posibles.', '2', '', 1.00, '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(218, 11, 11, 'Articula sus actuaciones con las de los demás', '2', '', 1.00, '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(219, 11, 12, 'Cumple los compromisos adquiridos', '3', '', 1.50, '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(220, 11, 13, 'Facilita la labor de sus supervisores y compañeros de trabajo', '4', '', 2.00, '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(221, 11, 14, 'Escucha con interés y capta las necesidades de los demás.', '4', '', 2.00, '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(222, 11, 15, 'Transmite la información de forma fidedigna evitando situaciones que puedan generar deterioro en el ambiente laboral.', '3', '', 1.50, '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(223, 11, 16, 'Toma la iniciativa en el contacto con cliente interno y externo para dar avisos, citar o respuestas, utilizando un lenguaje claro para los destinatarios.', '5', '', 2.50, '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(224, 11, 17, 'Ejecuta sus tareas con los criterios de calidad establecidos.', '2', '', 1.00, '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(225, 11, 18, 'Revisa procedimientos e instrumentos para mejorar tiempos y resultados y para anticipar soluciones a problemas.', '5', '', 2.50, '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(226, 11, 19, 'Desarrolla las actividades de acuerdo con las pautas y protocolos definidos.', '3', '', 1.50, '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(227, 11, 20, 'Cumple de manera consistente y oportuna las funciones específicas asignadas a su cargo.', '3', '', 1.50, '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(228, 11, 21, 'Demuestra dominio técnico y procedimental en las tareas críticas del rol.', '5', '', 2.50, '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(229, 11, 22, 'Entrega resultados alineados con los estándares y tiempos definidos para su cargo.', '3', '', 1.50, '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(230, 11, 23, 'Prioriza y organiza sus funciones para asegurar cumplimiento sin reprocesos.', '5', '', 2.50, '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(231, 10, 1, 'Utiliza canales de comunicación, en su diversa expresión, con claridad, precisión y tono agradable para el receptor', '5', '4', 4.50, '2025-09-10 08:52:52', '2025-09-10 08:52:52'),
(232, 10, 2, 'Redacta textos, informes, mensajes, cuadros o  gráficas con claridad en la expresión para ser efectiva y sencilla la comprensión', '4', '2', 3.00, '2025-09-10 08:52:52', '2025-09-10 08:52:52'),
(233, 10, 3, 'Mantiene escucha y lectura atenta a efectos de  comprender mejor los mensajes o información recibida.', '4', '5', 4.50, '2025-09-10 08:52:52', '2025-09-10 08:52:52'),
(234, 10, 4, 'Da respuesta a cada comunicación recibida de modo inmediato', '5', '2', 3.50, '2025-09-10 08:52:52', '2025-09-10 08:52:52'),
(235, 10, 5, 'Adopta las decisiones tomadas para ejercer sus actividades individuales y las adoptadas para el trabajo en equipo por preferencia', '1', '2', 1.50, '2025-09-10 08:52:52', '2025-09-10 08:52:52'),
(236, 10, 6, 'Maneja criterios objetivos para analizar las formas a deducir con las personas involucradas.', '3', '3', 3.00, '2025-09-10 08:52:52', '2025-09-10 08:52:52'),
(237, 10, 7, 'Aporta soluciones alternativas en lo que refiere a sus saberes específicos.', '4', '3', 3.50, '2025-09-10 08:52:52', '2025-09-10 08:52:52'),
(238, 10, 8, 'Informa su experiencia especializada en el proceso de toma de decisiones que involucran aspectos de su especialidad.', '4', '2', 3.00, '2025-09-10 08:52:52', '2025-09-10 08:52:52'),
(239, 10, 9, 'Anticipa problemas y posibles que advierten su carácter de especialista.', '5', '1', 3.00, '2025-09-10 08:52:52', '2025-09-10 08:52:52'),
(240, 10, 10, 'Asume la interdisciplinariedad aprovechando puntos de vista diversos y alternativa al propio, para analizar y proponer soluciones posibles.', '5', '3', 4.00, '2025-09-10 08:52:52', '2025-09-10 08:52:52'),
(241, 10, 11, 'Articula sus actuaciones con las de los demás', '4', '3', 3.50, '2025-09-10 08:52:52', '2025-09-10 08:52:52'),
(242, 10, 12, 'Cumple los compromisos adquiridos', '1', '2', 1.50, '2025-09-10 08:52:52', '2025-09-10 08:52:52'),
(243, 10, 13, 'Facilita la labor de sus supervisores y compañeros de trabajo', '4', '2', 3.00, '2025-09-10 08:52:52', '2025-09-10 08:52:52'),
(244, 10, 14, 'Escucha con interés y capta las necesidades de los demás.', '4', '3', 3.50, '2025-09-10 08:52:52', '2025-09-10 08:52:52'),
(245, 10, 15, 'Transmite la información de forma fidedigna evitando situaciones que puedan generar deterioro en el ambiente laboral.', '5', '3', 4.00, '2025-09-10 08:52:52', '2025-09-10 08:52:52'),
(246, 10, 16, 'Toma la iniciativa en el contacto con cliente interno y externo para dar avisos, citar o respuestas, utilizando un lenguaje claro para los destinatarios.', '5', '3', 4.00, '2025-09-10 08:52:52', '2025-09-10 08:52:52'),
(247, 10, 17, 'Ejecuta sus tareas con los criterios de calidad establecidos.', '4', '3', 3.50, '2025-09-10 08:52:52', '2025-09-10 08:52:52'),
(248, 10, 18, 'Revisa procedimientos e instrumentos para mejorar tiempos y resultados y para anticipar soluciones a problemas.', '4', '4', 4.00, '2025-09-10 08:52:52', '2025-09-10 08:52:52'),
(249, 10, 19, 'Desarrolla las actividades de acuerdo con las pautas y protocolos definidos.', '5', '5', 5.00, '2025-09-10 08:52:52', '2025-09-10 08:52:52'),
(250, 10, 20, 'Cumple de manera consistente y oportuna las funciones específicas asignadas a su cargo.', '4', '4', 4.00, '2025-09-10 08:52:52', '2025-09-10 08:52:52'),
(251, 10, 21, 'Demuestra dominio técnico y procedimental en las tareas críticas del rol.', '4', '5', 4.50, '2025-09-10 08:52:52', '2025-09-10 08:52:52'),
(252, 10, 22, 'Entrega resultados alineados con los estándares y tiempos definidos para su cargo.', '4', '4', 4.00, '2025-09-10 08:52:52', '2025-09-10 08:52:52'),
(253, 10, 23, 'Prioriza y organiza sus funciones para asegurar cumplimiento sin reprocesos.', '4', '3', 3.50, '2025-09-10 08:52:52', '2025-09-10 08:52:52');

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
(2, 11, 'uploads/signatures/employee_794_1757448590.png', '', '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(3, 10, '', 'uploads/signatures/boss_upd_10_1757512372.png', '2025-09-10 08:52:52', '2025-09-10 08:52:52');

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
  `autoevaluacion` varchar(10) DEFAULT NULL,
  `evaluacion_jefe` varchar(10) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `evaluacion_hseq`
--

INSERT INTO `evaluacion_hseq` (`id_hseq`, `id_evaluacion`, `id_responsabilidad`, `responsabilidad`, `calificacion`, `autoevaluacion`, `evaluacion_jefe`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(1, 2, 1, 'Procurar el cuidado integral de su salud.', '', '', '', '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(2, 2, 2, 'Suministrar información clara, veraz y completa sobre su estado de salud.', '', '', '', '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(3, 2, 3, 'Cumplir las normas, reglamentos e instrucciones del Sistema de Gestión Integral de la empresa.', '', '', '', '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(4, 2, 4, 'Informar oportunamente al empleador o contratante acerca de los riesgos y/o peligros latentes en el desempeño de sus funciones y en su sitio de trabajo, colaborando en los planes de acción para sus posibles tratamientos.', '', '', '', '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(5, 2, 5, 'Participar en las actividades de capacitación y entrenamiento definidas en el programa de capacitación anual de la compañía y en las demás actividades HSEQ que se realicen mostrando así su compromiso con el Sistema de Gestión Integral de la Compañía.', '', '', '', '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(6, 2, 6, 'Participar y contribuir al cumplimiento de los objetivos del Sistema de Gestión Integral.', '', '', '', '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(7, 2, 7, 'Conocer, aplicar e interiorizar las políticas HSEQ, demostrando su compromiso con la compañía.', '', '', '', '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(8, 2, 8, 'Reportar oportunamente actos y condiciones inseguras que generen accidentes e incidentes laborales y ambientales. Velar para que sus colaboradores realicen los respectivos reportes.', '', '', '', '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(9, 2, 9, 'Garantizar el cumplimiento y el control de la información documentada establecida para las diferentes actividades que se generen en la compañía y para el óptimo desarrollo de sus funciones, velando así por la disponibilidad y seguridad de la información.', '', '', '', '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(10, 2, 10, 'Garantizar la satisfacción del cliente brindando un alto estándar de calidad en el servicio prestado.', '', '', '', '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(11, 2, 11, 'Participar en la evaluación del cumplimiento de los aspectos HSEQ de sus colaboradores.', '', '', '', '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(12, 2, 12, 'Portar y utilizar los elementos de protección personal requeridos, velando por su cuidado y la utilización adecuada y permanente de sus colaboradores y reportar cualquier daño en los mismos.', '', '', '', '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(13, 2, 13, 'Participar y colaborar con las auditorias (internas y externas) del Sistema Integrado de Gestión de MERIDIAN CONSULTING.', '', '', '', '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(14, 2, 14, 'Reducir el consumo de papel en las actividades cotidianas inherentes a su cargo y hacer uso moderado del recurso hídrico y eléctrico, y en general cualquier recurso ambiental demostrando su compromiso con el SGA de MERIDIAN CONSULTING.', '', '', '', '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(15, 2, 15, 'Realizar la disposición adecuada de los residuos sólidos y peligrosos generados por su labor de acuerdo con lo establecido por MERIDIAN CONSULTING LTDA. o por el cliente.', '', '', '', '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(16, 2, 16, 'Solicitar los recursos económicos, técnicos y humanos para garantizar condiciones óptimas de trabajo, logrando así la protección integral del trabajador y el medio que lo rodea.', '', '', '', '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(17, 2, 17, 'Participar cuando se ha requerido en la investigación de los incidentes, accidentes de trabajo y enfermedad laboral asociados a su proyecto.', '', '', '', '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(18, 2, 18, 'Participar en simulacros, elección de COPASST y elección de comité de convivencia.', '', '', '', '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(19, 2, 19, 'Cumplir con las funciones y responsabilidades asignadas de ser elegido miembro del COPASST, Comité de convivencia laboral y/o comité de emergencias.', '', '', '', '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(20, 2, 20, 'Diligenciar el formato de Auto reporte de Condiciones de Trabajo del Tele trabajador con el fin de determinar los peligros presentes en el lugar su trabajo.', '', '', '', '2025-09-08 14:15:10', '2025-09-08 14:15:10'),
(21, 3, 1, 'Procurar el cuidado integral de su salud.', '', '', '', '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(22, 3, 2, 'Suministrar información clara, veraz y completa sobre su estado de salud.', '', '', '', '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(23, 3, 3, 'Cumplir las normas, reglamentos e instrucciones del Sistema de Gestión Integral de la empresa.', '', '', '', '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(24, 3, 4, 'Informar oportunamente al empleador o contratante acerca de los riesgos y/o peligros latentes en el desempeño de sus funciones y en su sitio de trabajo, colaborando en los planes de acción para sus posibles tratamientos.', '', '', '', '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(25, 3, 5, 'Participar en las actividades de capacitación y entrenamiento definidas en el programa de capacitación anual de la compañía y en las demás actividades HSEQ que se realicen mostrando así su compromiso con el Sistema de Gestión Integral de la Compañía.', '', '', '', '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(26, 3, 6, 'Participar y contribuir al cumplimiento de los objetivos del Sistema de Gestión Integral.', '', '', '', '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(27, 3, 7, 'Conocer, aplicar e interiorizar las políticas HSEQ, demostrando su compromiso con la compañía.', '', '', '', '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(28, 3, 8, 'Reportar oportunamente actos y condiciones inseguras que generen accidentes e incidentes laborales y ambientales. Velar para que sus colaboradores realicen los respectivos reportes.', '', '', '', '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(29, 3, 9, 'Garantizar el cumplimiento y el control de la información documentada establecida para las diferentes actividades que se generen en la compañía y para el óptimo desarrollo de sus funciones, velando así por la disponibilidad y seguridad de la información.', '', '', '', '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(30, 3, 10, 'Garantizar la satisfacción del cliente brindando un alto estándar de calidad en el servicio prestado.', '', '', '', '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(31, 3, 11, 'Participar en la evaluación del cumplimiento de los aspectos HSEQ de sus colaboradores.', '', '', '', '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(32, 3, 12, 'Portar y utilizar los elementos de protección personal requeridos, velando por su cuidado y la utilización adecuada y permanente de sus colaboradores y reportar cualquier daño en los mismos.', '', '', '', '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(33, 3, 13, 'Participar y colaborar con las auditorias (internas y externas) del Sistema Integrado de Gestión de MERIDIAN CONSULTING.', '', '', '', '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(34, 3, 14, 'Reducir el consumo de papel en las actividades cotidianas inherentes a su cargo y hacer uso moderado del recurso hídrico y eléctrico, y en general cualquier recurso ambiental demostrando su compromiso con el SGA de MERIDIAN CONSULTING.', '', '', '', '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(35, 3, 15, 'Realizar la disposición adecuada de los residuos sólidos y peligrosos generados por su labor de acuerdo con lo establecido por MERIDIAN CONSULTING LTDA. o por el cliente.', '', '', '', '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(36, 3, 16, 'Solicitar los recursos económicos, técnicos y humanos para garantizar condiciones óptimas de trabajo, logrando así la protección integral del trabajador y el medio que lo rodea.', '', '', '', '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(37, 3, 17, 'Participar cuando se ha requerido en la investigación de los incidentes, accidentes de trabajo y enfermedad laboral asociados a su proyecto.', '', '', '', '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(38, 3, 18, 'Participar en simulacros, elección de COPASST y elección de comité de convivencia.', '', '', '', '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(39, 3, 19, 'Cumplir con las funciones y responsabilidades asignadas de ser elegido miembro del COPASST, Comité de convivencia laboral y/o comité de emergencias.', '', '', '', '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(40, 3, 20, 'Diligenciar el formato de Auto reporte de Condiciones de Trabajo del Tele trabajador con el fin de determinar los peligros presentes en el lugar su trabajo.', '', '', '', '2025-09-08 14:34:39', '2025-09-08 14:34:39'),
(41, 4, 1, 'Procurar el cuidado integral de su salud.', '', '', '', '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(42, 4, 2, 'Suministrar información clara, veraz y completa sobre su estado de salud.', '', '', '', '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(43, 4, 3, 'Cumplir las normas, reglamentos e instrucciones del Sistema de Gestión Integral de la empresa.', '', '', '', '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(44, 4, 4, 'Informar oportunamente al empleador o contratante acerca de los riesgos y/o peligros latentes en el desempeño de sus funciones y en su sitio de trabajo, colaborando en los planes de acción para sus posibles tratamientos.', '', '', '', '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(45, 4, 5, 'Participar en las actividades de capacitación y entrenamiento definidas en el programa de capacitación anual de la compañía y en las demás actividades HSEQ que se realicen mostrando así su compromiso con el Sistema de Gestión Integral de la Compañía.', '', '', '', '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(46, 4, 6, 'Participar y contribuir al cumplimiento de los objetivos del Sistema de Gestión Integral.', '', '', '', '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(47, 4, 7, 'Conocer, aplicar e interiorizar las políticas HSEQ, demostrando su compromiso con la compañía.', '', '', '', '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(48, 4, 8, 'Reportar oportunamente actos y condiciones inseguras que generen accidentes e incidentes laborales y ambientales. Velar para que sus colaboradores realicen los respectivos reportes.', '', '', '', '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(49, 4, 9, 'Garantizar el cumplimiento y el control de la información documentada establecida para las diferentes actividades que se generen en la compañía y para el óptimo desarrollo de sus funciones, velando así por la disponibilidad y seguridad de la información.', '', '', '', '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(50, 4, 10, 'Garantizar la satisfacción del cliente brindando un alto estándar de calidad en el servicio prestado.', '', '', '', '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(51, 4, 11, 'Participar en la evaluación del cumplimiento de los aspectos HSEQ de sus colaboradores.', '', '', '', '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(52, 4, 12, 'Portar y utilizar los elementos de protección personal requeridos, velando por su cuidado y la utilización adecuada y permanente de sus colaboradores y reportar cualquier daño en los mismos.', '', '', '', '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(53, 4, 13, 'Participar y colaborar con las auditorias (internas y externas) del Sistema Integrado de Gestión de MERIDIAN CONSULTING.', '', '', '', '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(54, 4, 14, 'Reducir el consumo de papel en las actividades cotidianas inherentes a su cargo y hacer uso moderado del recurso hídrico y eléctrico, y en general cualquier recurso ambiental demostrando su compromiso con el SGA de MERIDIAN CONSULTING.', '', '', '', '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(55, 4, 15, 'Realizar la disposición adecuada de los residuos sólidos y peligrosos generados por su labor de acuerdo con lo establecido por MERIDIAN CONSULTING LTDA. o por el cliente.', '', '', '', '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(56, 4, 16, 'Solicitar los recursos económicos, técnicos y humanos para garantizar condiciones óptimas de trabajo, logrando así la protección integral del trabajador y el medio que lo rodea.', '', '', '', '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(57, 4, 17, 'Participar cuando se ha requerido en la investigación de los incidentes, accidentes de trabajo y enfermedad laboral asociados a su proyecto.', '', '', '', '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(58, 4, 18, 'Participar en simulacros, elección de COPASST y elección de comité de convivencia.', '', '', '', '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(59, 4, 19, 'Cumplir con las funciones y responsabilidades asignadas de ser elegido miembro del COPASST, Comité de convivencia laboral y/o comité de emergencias.', '', '', '', '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(60, 4, 20, 'Diligenciar el formato de Auto reporte de Condiciones de Trabajo del Tele trabajador con el fin de determinar los peligros presentes en el lugar su trabajo.', '', '', '', '2025-09-08 14:41:08', '2025-09-08 14:41:08'),
(61, 5, 1, 'Procurar el cuidado integral de su salud.', '', '', '', '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(62, 5, 2, 'Suministrar información clara, veraz y completa sobre su estado de salud.', '', '', '', '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(63, 5, 3, 'Cumplir las normas, reglamentos e instrucciones del Sistema de Gestión Integral de la empresa.', '', '', '', '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(64, 5, 4, 'Informar oportunamente al empleador o contratante acerca de los riesgos y/o peligros latentes en el desempeño de sus funciones y en su sitio de trabajo, colaborando en los planes de acción para sus posibles tratamientos.', '', '', '', '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(65, 5, 5, 'Participar en las actividades de capacitación y entrenamiento definidas en el programa de capacitación anual de la compañía y en las demás actividades HSEQ que se realicen mostrando así su compromiso con el Sistema de Gestión Integral de la Compañía.', '', '', '', '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(66, 5, 6, 'Participar y contribuir al cumplimiento de los objetivos del Sistema de Gestión Integral.', '', '', '', '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(67, 5, 7, 'Conocer, aplicar e interiorizar las políticas HSEQ, demostrando su compromiso con la compañía.', '', '', '', '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(68, 5, 8, 'Reportar oportunamente actos y condiciones inseguras que generen accidentes e incidentes laborales y ambientales. Velar para que sus colaboradores realicen los respectivos reportes.', '', '', '', '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(69, 5, 9, 'Garantizar el cumplimiento y el control de la información documentada establecida para las diferentes actividades que se generen en la compañía y para el óptimo desarrollo de sus funciones, velando así por la disponibilidad y seguridad de la información.', '', '', '', '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(70, 5, 10, 'Garantizar la satisfacción del cliente brindando un alto estándar de calidad en el servicio prestado.', '', '', '', '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(71, 5, 11, 'Participar en la evaluación del cumplimiento de los aspectos HSEQ de sus colaboradores.', '', '', '', '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(72, 5, 12, 'Portar y utilizar los elementos de protección personal requeridos, velando por su cuidado y la utilización adecuada y permanente de sus colaboradores y reportar cualquier daño en los mismos.', '', '', '', '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(73, 5, 13, 'Participar y colaborar con las auditorias (internas y externas) del Sistema Integrado de Gestión de MERIDIAN CONSULTING.', '', '', '', '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(74, 5, 14, 'Reducir el consumo de papel en las actividades cotidianas inherentes a su cargo y hacer uso moderado del recurso hídrico y eléctrico, y en general cualquier recurso ambiental demostrando su compromiso con el SGA de MERIDIAN CONSULTING.', '', '', '', '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(75, 5, 15, 'Realizar la disposición adecuada de los residuos sólidos y peligrosos generados por su labor de acuerdo con lo establecido por MERIDIAN CONSULTING LTDA. o por el cliente.', '', '', '', '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(76, 5, 16, 'Solicitar los recursos económicos, técnicos y humanos para garantizar condiciones óptimas de trabajo, logrando así la protección integral del trabajador y el medio que lo rodea.', '', '', '', '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(77, 5, 17, 'Participar cuando se ha requerido en la investigación de los incidentes, accidentes de trabajo y enfermedad laboral asociados a su proyecto.', '', '', '', '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(78, 5, 18, 'Participar en simulacros, elección de COPASST y elección de comité de convivencia.', '', '', '', '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(79, 5, 19, 'Cumplir con las funciones y responsabilidades asignadas de ser elegido miembro del COPASST, Comité de convivencia laboral y/o comité de emergencias.', '', '', '', '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(80, 5, 20, 'Diligenciar el formato de Auto reporte de Condiciones de Trabajo del Tele trabajador con el fin de determinar los peligros presentes en el lugar su trabajo.', '', '', '', '2025-09-08 14:44:10', '2025-09-08 14:44:10'),
(81, 6, 1, 'Procurar el cuidado integral de su salud.', '', '', '', '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(82, 6, 2, 'Suministrar información clara, veraz y completa sobre su estado de salud.', '', '', '', '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(83, 6, 3, 'Cumplir las normas, reglamentos e instrucciones del Sistema de Gestión Integral de la empresa.', '', '', '', '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(84, 6, 4, 'Informar oportunamente al empleador o contratante acerca de los riesgos y/o peligros latentes en el desempeño de sus funciones y en su sitio de trabajo, colaborando en los planes de acción para sus posibles tratamientos.', '', '', '', '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(85, 6, 5, 'Participar en las actividades de capacitación y entrenamiento definidas en el programa de capacitación anual de la compañía y en las demás actividades HSEQ que se realicen mostrando así su compromiso con el Sistema de Gestión Integral de la Compañía.', '', '', '', '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(86, 6, 6, 'Participar y contribuir al cumplimiento de los objetivos del Sistema de Gestión Integral.', '', '', '', '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(87, 6, 7, 'Conocer, aplicar e interiorizar las políticas HSEQ, demostrando su compromiso con la compañía.', '', '', '', '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(88, 6, 8, 'Reportar oportunamente actos y condiciones inseguras que generen accidentes e incidentes laborales y ambientales. Velar para que sus colaboradores realicen los respectivos reportes.', '', '', '', '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(89, 6, 9, 'Garantizar el cumplimiento y el control de la información documentada establecida para las diferentes actividades que se generen en la compañía y para el óptimo desarrollo de sus funciones, velando así por la disponibilidad y seguridad de la información.', '', '', '', '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(90, 6, 10, 'Garantizar la satisfacción del cliente brindando un alto estándar de calidad en el servicio prestado.', '', '', '', '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(91, 6, 11, 'Participar en la evaluación del cumplimiento de los aspectos HSEQ de sus colaboradores.', '', '', '', '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(92, 6, 12, 'Portar y utilizar los elementos de protección personal requeridos, velando por su cuidado y la utilización adecuada y permanente de sus colaboradores y reportar cualquier daño en los mismos.', '', '', '', '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(93, 6, 13, 'Participar y colaborar con las auditorias (internas y externas) del Sistema Integrado de Gestión de MERIDIAN CONSULTING.', '', '', '', '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(94, 6, 14, 'Reducir el consumo de papel en las actividades cotidianas inherentes a su cargo y hacer uso moderado del recurso hídrico y eléctrico, y en general cualquier recurso ambiental demostrando su compromiso con el SGA de MERIDIAN CONSULTING.', '', '', '', '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(95, 6, 15, 'Realizar la disposición adecuada de los residuos sólidos y peligrosos generados por su labor de acuerdo con lo establecido por MERIDIAN CONSULTING LTDA. o por el cliente.', '', '', '', '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(96, 6, 16, 'Solicitar los recursos económicos, técnicos y humanos para garantizar condiciones óptimas de trabajo, logrando así la protección integral del trabajador y el medio que lo rodea.', '', '', '', '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(97, 6, 17, 'Participar cuando se ha requerido en la investigación de los incidentes, accidentes de trabajo y enfermedad laboral asociados a su proyecto.', '', '', '', '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(98, 6, 18, 'Participar en simulacros, elección de COPASST y elección de comité de convivencia.', '', '', '', '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(99, 6, 19, 'Cumplir con las funciones y responsabilidades asignadas de ser elegido miembro del COPASST, Comité de convivencia laboral y/o comité de emergencias.', '', '', '', '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(100, 6, 20, 'Diligenciar el formato de Auto reporte de Condiciones de Trabajo del Tele trabajador con el fin de determinar los peligros presentes en el lugar su trabajo.', '', '', '', '2025-09-08 14:54:28', '2025-09-08 14:54:28'),
(101, 7, 1, 'Procurar el cuidado integral de su salud.', '', '', '', '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(102, 7, 2, 'Suministrar información clara, veraz y completa sobre su estado de salud.', '', '', '', '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(103, 7, 3, 'Cumplir las normas, reglamentos e instrucciones del Sistema de Gestión Integral de la empresa.', '', '', '', '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(104, 7, 4, 'Informar oportunamente al empleador o contratante acerca de los riesgos y/o peligros latentes en el desempeño de sus funciones y en su sitio de trabajo, colaborando en los planes de acción para sus posibles tratamientos.', '', '', '', '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(105, 7, 5, 'Participar en las actividades de capacitación y entrenamiento definidas en el programa de capacitación anual de la compañía y en las demás actividades HSEQ que se realicen mostrando así su compromiso con el Sistema de Gestión Integral de la Compañía.', '', '', '', '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(106, 7, 6, 'Participar y contribuir al cumplimiento de los objetivos del Sistema de Gestión Integral.', '', '', '', '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(107, 7, 7, 'Conocer, aplicar e interiorizar las políticas HSEQ, demostrando su compromiso con la compañía.', '', '', '', '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(108, 7, 8, 'Reportar oportunamente actos y condiciones inseguras que generen accidentes e incidentes laborales y ambientales. Velar para que sus colaboradores realicen los respectivos reportes.', '', '', '', '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(109, 7, 9, 'Garantizar el cumplimiento y el control de la información documentada establecida para las diferentes actividades que se generen en la compañía y para el óptimo desarrollo de sus funciones, velando así por la disponibilidad y seguridad de la información.', '', '', '', '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(110, 7, 10, 'Garantizar la satisfacción del cliente brindando un alto estándar de calidad en el servicio prestado.', '', '', '', '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(111, 7, 11, 'Participar en la evaluación del cumplimiento de los aspectos HSEQ de sus colaboradores.', '', '', '', '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(112, 7, 12, 'Portar y utilizar los elementos de protección personal requeridos, velando por su cuidado y la utilización adecuada y permanente de sus colaboradores y reportar cualquier daño en los mismos.', '', '', '', '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(113, 7, 13, 'Participar y colaborar con las auditorias (internas y externas) del Sistema Integrado de Gestión de MERIDIAN CONSULTING.', '', '', '', '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(114, 7, 14, 'Reducir el consumo de papel en las actividades cotidianas inherentes a su cargo y hacer uso moderado del recurso hídrico y eléctrico, y en general cualquier recurso ambiental demostrando su compromiso con el SGA de MERIDIAN CONSULTING.', '', '', '', '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(115, 7, 15, 'Realizar la disposición adecuada de los residuos sólidos y peligrosos generados por su labor de acuerdo con lo establecido por MERIDIAN CONSULTING LTDA. o por el cliente.', '', '', '', '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(116, 7, 16, 'Solicitar los recursos económicos, técnicos y humanos para garantizar condiciones óptimas de trabajo, logrando así la protección integral del trabajador y el medio que lo rodea.', '', '', '', '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(117, 7, 17, 'Participar cuando se ha requerido en la investigación de los incidentes, accidentes de trabajo y enfermedad laboral asociados a su proyecto.', '', '', '', '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(118, 7, 18, 'Participar en simulacros, elección de COPASST y elección de comité de convivencia.', '', '', '', '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(119, 7, 19, 'Cumplir con las funciones y responsabilidades asignadas de ser elegido miembro del COPASST, Comité de convivencia laboral y/o comité de emergencias.', '', '', '', '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(120, 7, 20, 'Diligenciar el formato de Auto reporte de Condiciones de Trabajo del Tele trabajador con el fin de determinar los peligros presentes en el lugar su trabajo.', '', '', '', '2025-09-08 14:58:28', '2025-09-08 14:58:28'),
(121, 8, 1, 'Procurar el cuidado integral de su salud.', '', '', '', '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(122, 8, 2, 'Suministrar información clara, veraz y completa sobre su estado de salud.', '', '', '', '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(123, 8, 3, 'Cumplir las normas, reglamentos e instrucciones del Sistema de Gestión Integral de la empresa.', '', '', '', '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(124, 8, 4, 'Informar oportunamente al empleador o contratante acerca de los riesgos y/o peligros latentes en el desempeño de sus funciones y en su sitio de trabajo, colaborando en los planes de acción para sus posibles tratamientos.', '', '', '', '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(125, 8, 5, 'Participar en las actividades de capacitación y entrenamiento definidas en el programa de capacitación anual de la compañía y en las demás actividades HSEQ que se realicen mostrando así su compromiso con el Sistema de Gestión Integral de la Compañía.', '', '', '', '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(126, 8, 6, 'Participar y contribuir al cumplimiento de los objetivos del Sistema de Gestión Integral.', '', '', '', '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(127, 8, 7, 'Conocer, aplicar e interiorizar las políticas HSEQ, demostrando su compromiso con la compañía.', '', '', '', '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(128, 8, 8, 'Reportar oportunamente actos y condiciones inseguras que generen accidentes e incidentes laborales y ambientales. Velar para que sus colaboradores realicen los respectivos reportes.', '', '', '', '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(129, 8, 9, 'Garantizar el cumplimiento y el control de la información documentada establecida para las diferentes actividades que se generen en la compañía y para el óptimo desarrollo de sus funciones, velando así por la disponibilidad y seguridad de la información.', '', '', '', '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(130, 8, 10, 'Garantizar la satisfacción del cliente brindando un alto estándar de calidad en el servicio prestado.', '', '', '', '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(131, 8, 11, 'Participar en la evaluación del cumplimiento de los aspectos HSEQ de sus colaboradores.', '', '', '', '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(132, 8, 12, 'Portar y utilizar los elementos de protección personal requeridos, velando por su cuidado y la utilización adecuada y permanente de sus colaboradores y reportar cualquier daño en los mismos.', '', '', '', '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(133, 8, 13, 'Participar y colaborar con las auditorias (internas y externas) del Sistema Integrado de Gestión de MERIDIAN CONSULTING.', '', '', '', '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(134, 8, 14, 'Reducir el consumo de papel en las actividades cotidianas inherentes a su cargo y hacer uso moderado del recurso hídrico y eléctrico, y en general cualquier recurso ambiental demostrando su compromiso con el SGA de MERIDIAN CONSULTING.', '', '', '', '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(135, 8, 15, 'Realizar la disposición adecuada de los residuos sólidos y peligrosos generados por su labor de acuerdo con lo establecido por MERIDIAN CONSULTING LTDA. o por el cliente.', '', '', '', '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(136, 8, 16, 'Solicitar los recursos económicos, técnicos y humanos para garantizar condiciones óptimas de trabajo, logrando así la protección integral del trabajador y el medio que lo rodea.', '', '', '', '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(137, 8, 17, 'Participar cuando se ha requerido en la investigación de los incidentes, accidentes de trabajo y enfermedad laboral asociados a su proyecto.', '', '', '', '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(138, 8, 18, 'Participar en simulacros, elección de COPASST y elección de comité de convivencia.', '', '', '', '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(139, 8, 19, 'Cumplir con las funciones y responsabilidades asignadas de ser elegido miembro del COPASST, Comité de convivencia laboral y/o comité de emergencias.', '', '', '', '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(140, 8, 20, 'Diligenciar el formato de Auto reporte de Condiciones de Trabajo del Tele trabajador con el fin de determinar los peligros presentes en el lugar su trabajo.', '', '', '', '2025-09-08 15:14:16', '2025-09-08 15:14:16'),
(141, 9, 1, 'Procurar el cuidado integral de su salud.', '', '', '', '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(142, 9, 2, 'Suministrar información clara, veraz y completa sobre su estado de salud.', '', '', '', '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(143, 9, 3, 'Cumplir las normas, reglamentos e instrucciones del Sistema de Gestión Integral de la empresa.', '', '', '', '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(144, 9, 4, 'Informar oportunamente al empleador o contratante acerca de los riesgos y/o peligros latentes en el desempeño de sus funciones y en su sitio de trabajo, colaborando en los planes de acción para sus posibles tratamientos.', '', '', '', '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(145, 9, 5, 'Participar en las actividades de capacitación y entrenamiento definidas en el programa de capacitación anual de la compañía y en las demás actividades HSEQ que se realicen mostrando así su compromiso con el Sistema de Gestión Integral de la Compañía.', '', '', '', '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(146, 9, 6, 'Participar y contribuir al cumplimiento de los objetivos del Sistema de Gestión Integral.', '', '', '', '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(147, 9, 7, 'Conocer, aplicar e interiorizar las políticas HSEQ, demostrando su compromiso con la compañía.', '', '', '', '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(148, 9, 8, 'Reportar oportunamente actos y condiciones inseguras que generen accidentes e incidentes laborales y ambientales. Velar para que sus colaboradores realicen los respectivos reportes.', '', '', '', '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(149, 9, 9, 'Garantizar el cumplimiento y el control de la información documentada establecida para las diferentes actividades que se generen en la compañía y para el óptimo desarrollo de sus funciones, velando así por la disponibilidad y seguridad de la información.', '', '', '', '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(150, 9, 10, 'Garantizar la satisfacción del cliente brindando un alto estándar de calidad en el servicio prestado.', '', '', '', '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(151, 9, 11, 'Participar en la evaluación del cumplimiento de los aspectos HSEQ de sus colaboradores.', '', '', '', '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(152, 9, 12, 'Portar y utilizar los elementos de protección personal requeridos, velando por su cuidado y la utilización adecuada y permanente de sus colaboradores y reportar cualquier daño en los mismos.', '', '', '', '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(153, 9, 13, 'Participar y colaborar con las auditorias (internas y externas) del Sistema Integrado de Gestión de MERIDIAN CONSULTING.', '', '', '', '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(154, 9, 14, 'Reducir el consumo de papel en las actividades cotidianas inherentes a su cargo y hacer uso moderado del recurso hídrico y eléctrico, y en general cualquier recurso ambiental demostrando su compromiso con el SGA de MERIDIAN CONSULTING.', '', '', '', '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(155, 9, 15, 'Realizar la disposición adecuada de los residuos sólidos y peligrosos generados por su labor de acuerdo con lo establecido por MERIDIAN CONSULTING LTDA. o por el cliente.', '', '', '', '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(156, 9, 16, 'Solicitar los recursos económicos, técnicos y humanos para garantizar condiciones óptimas de trabajo, logrando así la protección integral del trabajador y el medio que lo rodea.', '', '', '', '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(157, 9, 17, 'Participar cuando se ha requerido en la investigación de los incidentes, accidentes de trabajo y enfermedad laboral asociados a su proyecto.', '', '', '', '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(158, 9, 18, 'Participar en simulacros, elección de COPASST y elección de comité de convivencia.', '', '', '', '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(159, 9, 19, 'Cumplir con las funciones y responsabilidades asignadas de ser elegido miembro del COPASST, Comité de convivencia laboral y/o comité de emergencias.', '', '', '', '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(160, 9, 20, 'Diligenciar el formato de Auto reporte de Condiciones de Trabajo del Tele trabajador con el fin de determinar los peligros presentes en el lugar su trabajo.', '', '', '', '2025-09-08 15:29:41', '2025-09-08 15:29:41'),
(181, 11, 1, 'Procurar el cuidado integral de su salud.', '', '', '', '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(182, 11, 2, 'Suministrar información clara, veraz y completa sobre su estado de salud.', '', '', '', '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(183, 11, 3, 'Cumplir las normas, reglamentos e instrucciones del Sistema de Gestión Integral de la empresa.', '', '', '', '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(184, 11, 4, 'Informar oportunamente al empleador o contratante acerca de los riesgos y/o peligros latentes en el desempeño de sus funciones y en su sitio de trabajo, colaborando en los planes de acción para sus posibles tratamientos.', '', '', '', '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(185, 11, 5, 'Participar en las actividades de capacitación y entrenamiento definidas en el programa de capacitación anual de la compañía y en las demás actividades HSEQ que se realicen mostrando así su compromiso con el Sistema de Gestión Integral de la Compañía.', '', '', '', '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(186, 11, 6, 'Participar y contribuir al cumplimiento de los objetivos del Sistema de Gestión Integral.', '', '', '', '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(187, 11, 7, 'Conocer, aplicar e interiorizar las políticas HSEQ, demostrando su compromiso con la compañía.', '', '', '', '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(188, 11, 8, 'Reportar oportunamente actos y condiciones inseguras que generen accidentes e incidentes laborales y ambientales. Velar para que sus colaboradores realicen los respectivos reportes.', '', '', '', '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(189, 11, 9, 'Garantizar el cumplimiento y el control de la información documentada establecida para las diferentes actividades que se generen en la compañía y para el óptimo desarrollo de sus funciones, velando así por la disponibilidad y seguridad de la información.', '', '', '', '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(190, 11, 10, 'Garantizar la satisfacción del cliente brindando un alto estándar de calidad en el servicio prestado.', '', '', '', '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(191, 11, 11, 'Participar en la evaluación del cumplimiento de los aspectos HSEQ de sus colaboradores.', '', '', '', '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(192, 11, 12, 'Portar y utilizar los elementos de protección personal requeridos, velando por su cuidado y la utilización adecuada y permanente de sus colaboradores y reportar cualquier daño en los mismos.', '', '', '', '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(193, 11, 13, 'Participar y colaborar con las auditorias (internas y externas) del Sistema Integrado de Gestión de MERIDIAN CONSULTING.', '', '', '', '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(194, 11, 14, 'Reducir el consumo de papel en las actividades cotidianas inherentes a su cargo y hacer uso moderado del recurso hídrico y eléctrico, y en general cualquier recurso ambiental demostrando su compromiso con el SGA de MERIDIAN CONSULTING.', '', '', '', '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(195, 11, 15, 'Realizar la disposición adecuada de los residuos sólidos y peligrosos generados por su labor de acuerdo con lo establecido por MERIDIAN CONSULTING LTDA. o por el cliente.', '', '', '', '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(196, 11, 16, 'Solicitar los recursos económicos, técnicos y humanos para garantizar condiciones óptimas de trabajo, logrando así la protección integral del trabajador y el medio que lo rodea.', '', '', '', '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(197, 11, 17, 'Participar cuando se ha requerido en la investigación de los incidentes, accidentes de trabajo y enfermedad laboral asociados a su proyecto.', '', '', '', '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(198, 11, 18, 'Participar en simulacros, elección de COPASST y elección de comité de convivencia.', '', '', '', '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(199, 11, 19, 'Cumplir con las funciones y responsabilidades asignadas de ser elegido miembro del COPASST, Comité de convivencia laboral y/o comité de emergencias.', '', '', '', '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(200, 11, 20, 'Diligenciar el formato de Auto reporte de Condiciones de Trabajo del Tele trabajador con el fin de determinar los peligros presentes en el lugar su trabajo.', '', '', '', '2025-09-09 15:09:50', '2025-09-09 15:09:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacion_mejoramiento`
--

CREATE TABLE `evaluacion_mejoramiento` (
  `id_mejoramiento` int(11) NOT NULL,
  `id_evaluacion` int(11) NOT NULL,
  `fortalezas` text DEFAULT NULL,
  `aspectos_mejorar` text DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `evaluacion_mejoramiento`
--

INSERT INTO `evaluacion_mejoramiento` (`id_mejoramiento`, `id_evaluacion`, `fortalezas`, `aspectos_mejorar`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(2, 11, 'test', 'test', '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(3, 10, 'test', 'test', '2025-09-10 08:52:52', '2025-09-10 08:52:52');

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
  `fecha` date DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `evaluacion_plan_accion`
--

INSERT INTO `evaluacion_plan_accion` (`id_plan_accion`, `id_evaluacion`, `actividad`, `responsable`, `seguimiento`, `fecha`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(2, 11, '', '', '', '0000-00-00', '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(3, 10, 'test', 'test', 'test', '2025-09-10', '2025-09-10 08:52:52', '2025-09-10 08:52:52');

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
(2, 11, 3.30, 0.00, 3.30, 2.75, 4.00, 2.50, 3.00, 4.00, 3.33, 4.00, '2025-09-09 15:09:50', '2025-09-09 15:09:50'),
(3, 10, 3.54, 0.00, 3.54, 3.88, 2.25, 3.38, 2.67, 3.83, 4.17, 4.00, '2025-09-10 08:52:52', '2025-09-10 08:52:52');

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
  ADD KEY `idx_evaluacion_id_jefe` (`id_jefe`);

--
-- Indices de la tabla `evaluacion_competencias`
--
ALTER TABLE `evaluacion_competencias`
  ADD PRIMARY KEY (`id_competencia`),
  ADD KEY `fk_competencias_evaluacion` (`id_evaluacion`);

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
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cargo`
--
ALTER TABLE `cargo`
  MODIFY `id_cargo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=337;

--
-- AUTO_INCREMENT de la tabla `detalle_evaluacion`
--
ALTER TABLE `detalle_evaluacion`
  MODIFY `id_detalle_evaluacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=795;

--
-- AUTO_INCREMENT de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  MODIFY `id_evaluacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `evaluacion_competencias`
--
ALTER TABLE `evaluacion_competencias`
  MODIFY `id_competencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=254;

--
-- AUTO_INCREMENT de la tabla `evaluacion_firmas`
--
ALTER TABLE `evaluacion_firmas`
  MODIFY `id_firma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `evaluacion_hseq`
--
ALTER TABLE `evaluacion_hseq`
  MODIFY `id_hseq` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201;

--
-- AUTO_INCREMENT de la tabla `evaluacion_mejoramiento`
--
ALTER TABLE `evaluacion_mejoramiento`
  MODIFY `id_mejoramiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `evaluacion_plan_accion`
--
ALTER TABLE `evaluacion_plan_accion`
  MODIFY `id_plan_accion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `evaluacion_promedios`
--
ALTER TABLE `evaluacion_promedios`
  MODIFY `id_promedio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  ADD CONSTRAINT `fk_evaluacion_empleado` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `evaluacion_competencias`
--
ALTER TABLE `evaluacion_competencias`
  ADD CONSTRAINT `fk_competencias_evaluacion` FOREIGN KEY (`id_evaluacion`) REFERENCES `evaluacion` (`id_evaluacion`) ON DELETE CASCADE;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
