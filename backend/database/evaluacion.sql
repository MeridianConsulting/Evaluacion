-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-03-2025 a las 14:16:09
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
-- Estructura de tabla para la tabla `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`, `created_at`, `updated_at`) VALUES
(1, 'WILLIAM', 'WILLIAM2025*', '2024-12-27 21:13:33', '2025-01-10 20:42:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `Id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `cargo` varchar(100) DEFAULT NULL,
  `numero_telefonico` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `compania` varchar(100) DEFAULT NULL,
  `telefono_empresa` varchar(20) DEFAULT NULL,
  `telefono_internacional` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`Id`, `nombre`, `cargo`, `numero_telefonico`, `email`, `compania`, `telefono_empresa`, `telefono_internacional`) VALUES
(411134, 'RAFAEL ENRIQUE URDANETA MORAN', 'Soporte Operativo Tipo 3A', '3142513696', 'rafael.urdaneta1974@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(2901830, 'GERMAN FRANCO GARCIA', 'Asesor Administrativo', '3212154934', 'ines2048german@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(6165500, 'JOSE DANIEL GONZALEZ OJEDA', 'Soporte Operativo Tipo 3A', '3123494764', 'josegonzalezing1@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(7161987, 'CARLOS SAUL CELIS ACERO', 'Supervisor de Operaciones en Pozos Tipo 3', '3102699509', 'celiscarloss@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(7711125, 'OSCAR FERNANDO OSPINA OSORIO', 'Supervisor de Operaciones en Pozos Tipo 2', '3147010290', 'o.ospinaosorio@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(7723895, 'SERAFIN VANEGAS CARDOSO', 'Soporte Operativo Tipo 3B', '3115061013', 'ingenierovanegas@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(9102183, 'URIEL HERNAN PINEDA GOMEZ', 'Soporte Operativo Tipo 3A', '3135079569', 'upineg@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(12197484, 'HARRIZON ALEXANDER RIVERA ARENAS', 'Soporte Operativo Tipo 3B', '3173825811', 'harrizoning590@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(13700520, 'CESAR AUGUSTO REYES BALLESTEROS', 'Supervisor de Operaciones en Pozos Tipo 2', '3184472139', 'cesarym1@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(13707063, 'MISAEL GONZALEZ RUIZ', 'Supervisor de Operaciones en Pozos Tipo 3', '3158352976', 'misaelgonzalezruiz76@outlook.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(13871188, 'PEDRO RAFAEL CADENA ORDOnEZ', 'Supervisor de Operaciones en Pozos Tipo 3', '3013630130', 'pedro.cadena@outlook.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(13874046, 'JHON FREDDY PABON SANCHEZ', 'Soporte Operativo Tipo 3A', '3165708896', 'jhonfreddypabon@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(13959717, 'DIEGO FERNANDO GALEANO BARRERA', 'Profesional Senior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3212060755', 'diego.galeano@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(17419403, 'FRANCISCO JAVIER VILLABONA TAMAYO', 'Director de Proyecto Ecopetrol', '3102594727', 'coordinadorproyectos@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(20312319, 'BLANCA ATILIA LEITON DE REINA', 'Asesor Administrativo', '3212055243', 'monica_reina@outlook.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(24228529, 'CLAUDIA MARINA ORTIZ AVENDAnO', 'Soporte Operativo Tipo 3A', '3138290925', 'claudiao3740@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(26430509, 'YENNY LOLITA GARCIA BETANCOURT', 'Soporte Operativo Tipo 3A', '3165796537', 'yen289@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(30405867, 'DIANA MARCELA CACERES SALINAS', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9532986 del contrato Matriz No. 30', '3203003436', 'caceres.diana@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(33647141, 'MYRIAM KARINA PAREDES FORERO', 'Soporte Operativo Tipo 4A', '3214417135', 'contador_mkpf@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(37949528, 'OLGA LUCIA RUEDA FIGUEREDO', 'Soporte Operativo Tipo 3A', '3008678859', 'olga.ruedafigueredo@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(43989939, 'SUSANA HERNANDEZ MONTEALEGRE', 'Supervisor de Operaciones en Pozos Tipo 3', '3138306288', 'shernan8@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(51781946, 'GLORIA FERNANDA VIDAL GONZALEZ', 'Profesional Senior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3157805737', 'gloria.vidal@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(52005033, 'ZANDRA PATRICIA MAYORGA GOMEZ', 'Coordinador Contable y Financiero', '3112123257', 'coordinadoracontable@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(52030991, 'NORA GISELL MORENO MORENO', 'Gerente Administrativa Y Financiera', '3134844336', 'nmoreno@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(52147279, 'RUTH MUNOZ CASTILLO', 'Servicios Generales', '3203904580', 'rmunoz@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(52455261, 'ANA MARIA CASTELLANOS BARRETO', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3219970758', 'ana.castellanos@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(52978024, 'ERIKA LILIANAMANCIPE RODRIGUEZ', 'Aprendiz Etapa Lectiva', '3112259821', 'erikamancipe@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(53014035, 'ANDREA PAOLA GUTIERREZ RAMIREZ', 'Soporte Operativo Tipo 4A', '3138692438', 'andreitagutierrez0707@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(53103915, 'MONICA DEL PILAR MARTINEZ VERA', 'Profesional Senior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3028018043', 'monica.martinez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(71376583, 'HUGO FERNANDO RODRIGUEZ', 'Supervisor de Operaciones en Pozos Tipo 3', '3133742742', 'huferod2023@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(73188189, 'CARLOS ANTONIO FONTALVO CARRASCAL', 'Supervisor de Operaciones en Pozos Tipo 3', '3183476222', 'carlosfontalvocarrascal@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(74085101, 'EDWIN FERNANDO HERNANDEZ LADINO', 'Profesional Senior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3118949595', 'edwin.hernandez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(74362501, 'DANIEL SEGURA ESPINOSA', 'Supervisor de Operaciones en Pozos Tipo 1', '3185023626', 'Segura.7305@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(74375671, 'JULIO EDGARDO VILLAMIL MONDRAGON', 'Supervisor de Operaciones en Pozos Tipo 2', '3144637387', 'juedvimon@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(79208337, 'CARLOS ALBERTO RAMIREZ ESCOBAR', 'Soporte Operativo Tipo 2', '3112341274', 'carami70mx@yahoo.com.mx', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(79490148, 'CESAR AUGUSTO URREGO', 'Subgerente', '3102541498', 'currego@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(79613401, 'WILLIAM AUGUSTO FRANCO', 'Gerente General', '3138174046', 'wfranco@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(79902734, 'LUIS FELIPE URIBE PARRA', 'Supervisor de Operaciones en Pozos Tipo 2', '3214552350', 'Lfu1978@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(80100600, 'LUIS GUILLERMO MERCADO RICO', 'Supervisor de Operaciones en Pozos Tipo 3', '3132424793', 'luis.guillermo.mercado@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(80150738, 'WILBER CASTAnEDA CASTAnEDA', 'Soporte Operativo Tipo 1', '3112341274', 'wilbercastaeda@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(80222563, 'DIEGO ALEXANDER RINCON MOLINA', 'Analista de Gestion Humana y Nomina', '3014165956 3054', 'nomina@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(80231602, 'LEONARDO HOYOS MARTINEZ', 'Asistente de Logistica', '3146220409', 'asistentelogistica@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(80748832, 'JAIR ENRIQUE ALDANA PALMA', 'Servicio Especializado Tipo 2 - Integridad', '3508446786', 'Jairmark@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(86042335, 'GUTEMBERG ALAINE GOMEZ RIVERA', 'Supervisor de Operaciones en Pozos Tipo 2', '3142179752', 'gutemberg.gomez@yahoo.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(86057747, 'ALEXANDER RONDON', 'Supervisor de Operaciones en Pozos Tipo 2', '3173773971', 'alexander.rondon@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(86068586, 'SERGIO VELEZ CARDONA', 'Soporte Operativo Tipo 3B', '3124402881', 'servelez80@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(86075700, 'JOSE LUIS VELEZ CARDONA', 'Soporte Operativo Tipo 3A', '3115988198', 'jose.velezcardona@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(86084413, 'CAMILO ANDRES RIAnO GALVIS', 'Soporte Operativo Tipo 3B', '3138880373', 'andres.rianog84@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(87454560, 'HECTOR ANDRES NOGUERA BOLAnOS', 'Supervisor de Operaciones en Pozos Tipo 4', '3117592655', 'andresnoguera111@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(88158913, 'NESTOR ALONSO JAIMES PORTILLA', 'Supervisor de Operaciones en Pozos Tipo 3', '3173381419', 'najp74@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(98398935, 'GUSTAVO LEON DELGADO ZAMBRANO', 'Supervisor de Operaciones en Pozos Tipo 2', '3188015982', 'gustdelz@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1000133308, 'JUAN CAMILO  GRANADOS BUSTAMANTE', 'Practicante Universitario', '3024968549', 'juangrb29@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1000185449, 'NATALIA XIMENA FRANCO REINA', 'Asesor Administrativo', '33769555697', 'nataliaxfranco@gmail.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1000931984, 'KAREN JULIETH CARRANZA RODRIGUEZ', 'Analista Contable', '3053852350', 'krodri8888@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1002691928, 'JUAN CARLOS SAAVEDRA BOHaRQUEZ', 'Soporte Operativo Tipo 4A', '3133199943', 'juancho11.js@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1006823525, 'MARIA CAMILA CARDENAS URIZA', 'Profesional de Proyectos', '3219810231', 'proyectos5@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1007407868, 'NICOLAS URREGO SANDOVAL', 'Asesor Administrativo', '3185179135', 'nicolasurregos@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1007493802, 'MICHAEL STIVEN RUIZ CARO', 'Soporte Hseq II', '3115119407', 'soportehseqproyectos@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1007627524, 'ANDRES CAMILO CARDENAS REYES', 'Soporte IT Primer Nivel', '3138458839', 'soporteit.nivel1@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1007647736, 'SONIA STEPHANIA FONSECA LOPEZ', 'Asistente de Nomina y gestion humana', '3115960601', 'asistentegestionhumana2@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1010104560, 'JUAN DAVIDPRIETO ZAMUDIO', 'Aprendiz Etapa Lectiva', '3174466275', 'prietozamudioj@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1010126883, 'DANNY ALEXANDERPANCHE VICENTES', 'Contador Junior', '3116190555', 'contadorjr@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1010185219, 'AIDA FAISULY AVILA MORALES', 'Soporte Operativo Tipo 3A', '3173672474', 'aidaavilam@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1011202252, 'JOSE MATEO LOPEZ CIFUENTES', 'Programador Aprendiz SENA', '3208023808', 'josemateolopezcifuentes@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1013261036, 'CHRISTIAN CAMILO FRANCO REINA', 'Asistente Administrativo', '3505393712', 'christianfranco688@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1013678265, 'JAVIER EDUARDO ROJAS PRIETO', 'Soporte Operativo Tipo 5A', '3102758817', 'Javierrojas1214@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1014180459, 'SANDRA MILENA FLOREZ PRADO', 'Asistente administrativa y de gestion humana', '3125478393', 'asistenteadministrativo2@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1014251428, 'AURA ALEJANDRA CONTRERAS TORRES', 'Asistente Administrativo', '3103404348', 'asistenteadministrativo1@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1014267683, 'YEIMY KATERINE SALAMANCA CALDERON', 'Profesional de Proyectos', '3125040813', 'proyectos1@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1014663204, 'ANDRES FELIPELOAIZA CAVIEDES', 'Aprendiz Etapa Lectiva', '3245290052', 'loaizaf187@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1016037506, 'PAOLA ANDREA GOMEZ CABRERA', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3168735316', 'paola.gomez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1018516821, 'LUISA MARIA MELO RODRIGUEZ', 'Aprendiz Etapa Practica', '3144735103', 'luisamrdz22@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1019087239, 'JUAN DAVID CASTRO FRANCO', 'Asesor Administrativo', '3158111370', 'juandafranco3@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1019098876, 'YESSICA ANDREA ABELLA RODRIGUEZ', 'Asistente Contable', '3105516135', 'asistentecontable3@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1020733194, 'ELOY GABRIEL GOMEZ REYES', 'Coordinador de Gestion Humana', '3155150570', 'coordinaciongestionhumana@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1021672977, 'DEISY NATHALIA PAEZ MONTAnEZ', 'Aprendiz Etapa Practica', '3226459072', 'paezdeisy88@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1022344726, 'VIVIANA DEL PILAR ALFONSO AVENDAnO', 'Asesor Administrativo', '3053993712', 'Viviana.alfonsoa@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1022407009, 'ANGGIE ESTEFANIA ALONSO RUIZ', 'Tecnico Asistente Administrativa', '3183937371', 'asisdministrativo@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1022942596, 'ANDREA IRENE DEL PILAR PINZON', 'Asistente de Gestion Humana y Nomina', '3176689489', 'asistentegestionhumana@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1024478397, 'KAROL DANIELA SALCEDO ROMERO', 'Aprendiz Etapa Lectiva', '3059257440', 'karoldanielasr12@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1026255124, 'MARIA ALEJANDRA MOJICA ARCINIEGAS', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9532986 del contrato Matriz No. 30', '3166215115', 'alejandra_mojica123@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1026267917, 'WENDY ZAMANDA FONSECA HURTADO', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforacion Completamiento y Workover  D1', '3202302235', 'zamandafh1988@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1026304271, 'DIEGO ANDRES DIAZ QUINTERO', 'Programador aprendiz SENA', '3227143436', 'andress.diazz1998@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1031145571, 'DIANA MARCELA JACOBO MANCERA', 'Soporte Hseq', '3014799855', 'soportehseq@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1031649053, 'EYMER SANTIAGO MONDEZ HERRERA', 'Aprendiz Etapa Lectiva', '3195415213', 'Santiagom202418@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1032446831, 'ELIANA IVETH ALARCON RONDON', 'Profesional de Proyectos', '3178534038', 'proyectos6@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1032461712, 'BRAYAN ALEJANDRO MONROY PINZON', 'Soporte Operativo Tipo 3A', '3208298915', 'b.alejandro1345@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1032467291, 'CHRISTIAN MAURICIO PARDO CARRANZA', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9532986 del contrato Matriz No. 30', '3166969988', 'christian.pardo@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1047451443, 'CARLOS RAFAEL OLMOS CARVAL', 'Profesional B sico para la ejecucion de actividades de la ODS No. 9532986 del contrato Matriz No. 30', '3012392187', 'carlos.olmos@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1053611893, 'ANGY YOLIMA SALCEDO AMADO', 'Profesional de proyectos M1', '3213105102', 'angysalcedo0810@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1053788938, 'GUSTAVO ADOLFO GIRALDO CORREA', 'Profesional de Proyectos', '3102244072', 'ggiraldo@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1056709240, 'IVAN DARIO MOZO MORENO', 'Profesional Senior para la ejecucion de actividades de la ODS No. 9532986 del contrato Matriz No. 30', '3174236296', 'ivan.mozo@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1057580446, 'JUAN PABLO RAMIREZ DIAZ', 'Soporte Operativo Tipo 4A', '3183623525', 'juanpianoo@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1065599609, 'CESAR ELIECER RODRIGUEZ CAMELO', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3005462735', 'cesar.rodriguez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1065810992, 'JOSE CARLOS BAQUERO PEnALOZA', 'Soporte Operativo Tipo 3A', '3007220907', 'Josecarlosbaquero1994@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1075248439, 'MARIA DEL PILAR GOMEZ MORA', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforacion Completamiento y Workover  D1', '3107656528', 'mdpgomezm@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1075271569, 'ALVARO JAVIERQUIMBAYA MONTEALEGRE', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforacion Completamiento y Workover  D3', '3184024785', 'alvarojqm@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1075292422, 'OLMER ANDRES MORALES MORA', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9532986 del contrato Matriz No. 30', '3232847716', 'andres.morales@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1077173073, 'ESTEBAN GARCIA ROJAS', 'Supervisor de Operaciones en Pozos Tipo 3', '3233969196', 'estebangr1987@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1082067533, 'AGUSTIN JOSE RONCALLO CERVANTES', 'Soporte Operativo Tipo 3A', '3012882535', 'roncalloagustin@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1091668362, 'JESUS IVAN PACHECO ROMERO', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3006213973', 'jesus.pacheco@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1095786398, 'AURA MARIA TRASLAVInA PRADA', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3132028099', 'aura.traslavina@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1095826986, 'LIZETH DAYANA BAUTISTA RICO', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9532986 del contrato Matriz No. 30', '3138678621', 'lbautistarico@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1098681773, 'JHON HARVEY CARREnO HERNANDEZ', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3114976619', 'jhon.carreno@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1098683077, 'LUIS CARLOS MONSALVE PARRA', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3187441574', 'luisc.monsalve@outlook.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1098692205, 'BRIGGITE SUSEC CAMACHO JEREZ', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3186506670', 'briggite.camacho@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1098706838, 'JULIAN ANDRES HERNANDEZ PINTO', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3174478283', 'julian.hernandez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1098725794, 'JOSE GABRIEL NASSAR DIAZ', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9532986 del contrato Matriz No. 30', '3166233088', 'jose.nassar@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1098755426, 'JAIME JOSO MARTONEZ VERTEL', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9532986 del contrato Matriz No.303', '3102376098', 'jaime.martinez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1098758681, 'MILTON JULIAN GUALTEROS QUIROGA', 'Profesional Senior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3002755299', 'milton.gualteros@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1098774228, 'ANGELICA MARIA GONZALEZ SANCHEZ', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforacion Completamiento y Workover D2', '3014187370', 'ing.gonzalez.angelica@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1099210462, 'KARLA JINETH CORREDOR MARIN', 'Soporte Operativo Tipo 5A', '3108645694', 'Jinerth.corredor@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1100954344, 'CAMILA FERNANDA MEDINA SANDOVAL', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9814358 del contrato Matriz No. 30', '3155257550', 'camila.medina@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1100961505, 'GEISSON RENO ZAFRA URREA', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3163677407', 'geisson.zafra@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1101692935, 'DIEGO FERNANDO PINTO HERNμNDEZ', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3143794371', 'diego.pinto@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1101693549, 'CESAR EDUARDO GARNICA GOMEZ', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3173374883', 'cesar.garnica@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1102580512, 'FABRYZCIO ANDRES ORTIZ GARCIA', 'Aprendiz Etapa Lectiva', '3025971636', 'Fabryzcioortiz@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1115914145, 'VIANI YORELY RUIZ GALINDO', 'Soporte Operativo Tipo 4A', '3108677402', 'vianiruiz@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1115914517, 'CAMILO ANDRES IBAnEZ ROZO', 'Soporte Operativo Tipo 3A', '3138609005', 'Ingcamilo.ibanez@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1119211830, 'LUIS MIGUEL GUEVARA MARLES', 'Coordinador Hseq', '3102981548', 'hseq@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1121825022, 'CAMILO ANDRES PATARROYO VARON', 'Soporte Operativo Tipo 3A', '3142253275', 'patacam86@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1121848186, 'MARIA SHIRLEY ORDOnEZ CUESTA', 'Profesional Administrativa y de Gestion Humana, Proyectos', '3213766043', 'maria.ocuesta89@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1121869050, 'YENNI PAOLA DONCEL ACHO', 'Soporte Operativo Tipo 3A', '3102190553', 'yenni.doncel08@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1121871041, 'JORGE LEONARDO  MOYANO PEnA', 'Soporte Operativo Tipo 3A', '3125801263', 'jorgeleo-07@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1121913534, 'MARIA MONICA SIERRA CESPEDES', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforacion Completamiento y Workover  D1', '3114694699', 'mariamonicasc@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1121936876, 'LAURA DANIELA SEGURA MORERA', 'Soporte Hseq Proyectos', '3219054383', 'profesionalhseq@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1121941649, 'ALEJANDRO DUVAN LOPEZ ROJAS', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3214472738', 'alejandro.lopez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1122135336, 'MARIA DEL PILAR   RODRIGUEZ SANCHEZ', 'Profesional Soporte en Campo', '3102844018', 'pilar.rodriguez23@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1128433572, 'JHONNATAN VASQUEZ CARDENAS', 'Servicio Especializado Tipo 3A', '3006608443', 'jhonnatan.vasquez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1136887341, 'NIDIA CAROLINA GRANDAS CASTAnEDA', 'Profesional de Proyectos', '3195200943', 'proyectos3@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1136888916, 'DANIEL ANDRES JOYA SAAVEDRA', 'Profesional de Proyectos', '3108612386', 'proyectos2@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113'),
(1140847297, 'DAVID ALEJANDRO GARCIA CORONADO', 'Profesional Senior para la ejecucion de actividades de la ODS No. 9532986 del contrato Matriz No. 30', '3005751696', 'david.garcia@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1140847313;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
