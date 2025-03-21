
CREATE TABLE `cargo` (
  `id_cargo` int(11) NOT NULL,
  `nombre_cargo` varchar(100) NOT NULL,
  `descripcion_cargo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `cargo` (`id_cargo`, `nombre_cargo`, `descripcion_cargo`) VALUES
(1, 'Soporte Operativo Tipo 3A', NULL),
(2, 'Asesor Administrativo', NULL),
(3, 'Supervisor de Operaciones en Pozos Tipo 3', NULL),
(4, 'Supervisor de Operaciones en Pozos Tipo 2', NULL),
(5, 'Soporte Operativo Tipo 3B', NULL),
(6, 'Profesional Senior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', NULL),
(7, 'Director de Proyecto Ecopetrol', NULL),
(8, 'Profesional Junior para la ejecucion de actividades de la ODS No. 9532986 del contrato Matriz No. 30', NULL),
(9, 'Soporte Operativo Tipo 4A', NULL),
(10, 'Profesional Junior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', NULL),
(11, 'Supervisor de Operaciones en Pozos Tipo 1', NULL),
(12, 'Soporte Operativo Tipo 2', NULL),
(13, 'Subgerente', NULL),
(14, 'Gerente General', NULL),
(15, 'Analista de Gestion Humana y Nomina', NULL),
(16, 'Asistente de Logistica', NULL),
(17, 'Servicio Especializado Tipo 2 - Integridad', NULL),
(18, 'Coordinador Contable y Financiero', NULL),
(19, 'Gerente Administrativa Y Financiera', NULL),
(20, 'Servicios Generales', NULL),
(21, 'Aprendiz Etapa Lectiva', NULL),
(22, 'Practicante Universitario', NULL),
(23, 'Analista Contable', NULL),
(24, 'Profesional de Proyectos', NULL),
(25, 'Soporte Hseq', NULL),
(26, 'Soporte Hseq II', NULL),
(27, 'Programador Aprendiz SENA', NULL),
(28, 'Soporte Operativo Tipo 5A', NULL),
(29, 'Asistente administrativa y de gestion humana', NULL),
(30, 'Asistente Administrativo', NULL),
(31, 'Asistente de Nomina y gestion humana', NULL),
(32, 'Asistente Contable', NULL),
(33, 'Coordinador de Gestion Humana', NULL),
(34, 'Tecnico Asistente Administrativa', NULL),
(35, 'Asistente de Gestion Humana y Nomina', NULL),
(36, 'Ingeniero(a) Asistente de Company Man para operaciones de Perforacion Completamiento y Workover  D1', NULL),
(37, 'Ingeniero(a) Asistente de Company Man para operaciones de Perforacion Completamiento y Workover  D3', NULL),
(38, 'Profesional B sico para la ejecucion de actividades de la ODS No. 9532986 del contrato Matriz No. 30', NULL),
(39, 'Profesional de proyectos M1', NULL),
(40, 'Profesional Senior para la ejecucion de actividades de la ODS No. 9532986 del contrato Matriz No. 30', NULL),
(41, 'Ingeniero(a) Asistente de Company Man para operaciones de Perforacion Completamiento y Workover D2', NULL),
(42, 'Profesional Junior para la ejecucion de actividades de la ODS No.9532986 del contrato Matriz No.303', NULL),
(43, 'Profesional Junior para la ejecucion de actividades de la ODS No. 9814358 del contrato Matriz No. 30', NULL),
(44, 'Coordinador Hseq', NULL),
(45, 'Profesional Administrativa y de Gestion Humana, Proyectos', NULL),
(46, 'Profesional Soporte en Campo', NULL),
(47, 'Servicio Especializado Tipo 3A', NULL),
(48, 'valor exacto del cargo', NULL),
(49, 'Supervisor de Operaciones en Pozos Tipo 4', NULL),
(50, 'Soporte IT Primer Nivel', NULL),
(51, 'Contador Junior', NULL),
(52, 'Aprendiz Etapa Practica', NULL),
(54, 'Profesional Junior para la ejecucion de actividades de la ODS No.9532986 del contrato Matriz No. 303', NULL),
(55, 'Soporte Hseq Proyectos', NULL);

CREATE TABLE `detalle_evaluacion` (
  `id_detalle_evaluacion` int(11) NOT NULL,
  `id_evaluacion` int(11) NOT NULL,
  `id_funcion` int(11) NOT NULL,
  `comentarios` text DEFAULT NULL,
  `calificacion` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `empleados` (
  `id_empleado` int(11) NOT NULL,
  `cedula` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `cargo` varchar(100) DEFAULT NULL,
  `numero_telefonico` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `compania` varchar(100) DEFAULT NULL,
  `telefono_empresa` varchar(20) DEFAULT NULL,
  `telefono_internacional` varchar(20) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id_empleado`, `cedula`, `nombre`, `cargo`, `numero_telefonico`, `email`, `compania`, `telefono_empresa`, `telefono_internacional`, `contrasena`) VALUES
(161, 411134, 'RAFAEL ENRIQUE URDANETA MORAN', 'Soporte Operativo Tipo 3A', '3142513696', 'rafael.urdaneta1974@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC411134'),
(162, 2901830, 'GERMAN FRANCO GARCIA', 'Asesor Administrativo', '3212154934', 'ines2048german@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC2901830'),
(163, 6165500, 'JOSE DANIEL GONZALEZ OJEDA', 'Soporte Operativo Tipo 3A', '3123494764', 'josegonzalezing1@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC6165500'),
(164, 7161987, 'CARLOS SAUL CELIS ACERO', 'Supervisor de Operaciones en Pozos Tipo 3', '3102699509', 'celiscarloss@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC7161987'),
(165, 7711125, 'OSCAR FERNANDO OSPINA OSORIO', 'Supervisor de Operaciones en Pozos Tipo 2', '3147010290', 'o.ospinaosorio@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC7711125'),
(166, 7723895, 'SERAFIN VANEGAS CARDOSO', 'Soporte Operativo Tipo 3B', '3115061013', 'ingenierovanegas@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC7723895'),
(167, 9102183, 'URIEL HERNAN PINEDA GOMEZ', 'Soporte Operativo Tipo 3A', '3135079569', 'upineg@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC9102183'),
(168, 12197484, 'HARRIZON ALEXANDER RIVERA ARENAS', 'Soporte Operativo Tipo 3B', '3173825811', 'harrizoning590@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC12197484'),
(169, 13700520, 'CESAR AUGUSTO REYES BALLESTEROS', 'Supervisor de Operaciones en Pozos Tipo 2', '3184472139', 'cesarym1@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC13700520'),
(170, 13707063, 'MISAEL GONZALEZ RUIZ', 'Supervisor de Operaciones en Pozos Tipo 3', '3158352976', 'misaelgonzalezruiz76@outlook.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC13707063'),
(171, 13871188, 'PEDRO RAFAEL CADENA ORDOnEZ', 'Supervisor de Operaciones en Pozos Tipo 3', '3013630130', 'pedro.cadena@outlook.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC13871188'),
(172, 13874046, 'JHON FREDDY PABON SANCHEZ', 'Soporte Operativo Tipo 3A', '3165708896', 'jhonfreddypabon@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC13874046'),
(173, 13959717, 'DIEGO FERNANDO GALEANO BARRERA', 'Profesional Senior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3212060755', 'diego.galeano@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC13959717'),
(174, 17419403, 'FRANCISCO JAVIER VILLABONA TAMAYO', 'Director de Proyecto Ecopetrol', '3102594727', 'coordinadorproyectos@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC17419403'),
(175, 20312319, 'BLANCA ATILIA LEITON DE REINA', 'Asesor Administrativo', '3212055243', 'monica_reina@outlook.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC20312319'),
(176, 24228529, 'CLAUDIA MARINA ORTIZ AVENDAnO', 'Soporte Operativo Tipo 3A', '3138290925', 'claudiao3740@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC24228529'),
(177, 26430509, 'YENNY LOLITA GARCIA BETANCOURT', 'Soporte Operativo Tipo 3A', '3165796537', 'yen289@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC26430509'),
(178, 30405867, 'DIANA MARCELA CACERES SALINAS', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9532986 del contrato Matriz No. 30', '3203003436', 'caceres.diana@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC30405867'),
(179, 33647141, 'MYRIAM KARINA PAREDES FORERO', 'Soporte Operativo Tipo 4A', '3214417135', 'contador_mkpf@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC33647141'),
(180, 37949528, 'OLGA LUCIA RUEDA FIGUEREDO', 'Soporte Operativo Tipo 3A', '3008678859', 'olga.ruedafigueredo@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC37949528'),
(181, 43989939, 'SUSANA HERNANDEZ MONTEALEGRE', 'Supervisor de Operaciones en Pozos Tipo 3', '3138306288', 'shernan8@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC43989939'),
(182, 51781946, 'GLORIA FERNANDA VIDAL GONZALEZ', 'Profesional Senior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3157805737', 'gloria.vidal@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC51781946'),
(183, 52005033, 'ZANDRA PATRICIA MAYORGA GOMEZ', 'Coordinador Contable y Financiero', '3112123257', 'coordinadoracontable@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC52005033'),
(184, 52030991, 'NORA GISELL MORENO MORENO', 'Gerente Administrativa Y Financiera', '3134844336', 'nmoreno@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC52030991'),
(185, 52147279, 'RUTH MUNOZ CASTILLO', 'Servicios Generales', '3203904580', 'rmunoz@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC52147279'),
(186, 52455261, 'ANA MARIA CASTELLANOS BARRETO', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3219970758', 'ana.castellanos@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC52455261'),
(187, 52978024, 'ERIKA LILIANAMANCIPE RODRIGUEZ', 'Aprendiz Etapa Lectiva', '3112259821', 'erikamancipe@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC52978024'),
(188, 53014035, 'ANDREA PAOLA GUTIERREZ RAMIREZ', 'Soporte Operativo Tipo 4A', '3138692438', 'andreitagutierrez0707@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC53014035'),
(189, 53103915, 'MONICA DEL PILAR MARTINEZ VERA', 'Profesional Senior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3028018043', 'monica.martinez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC53103915'),
(190, 71376583, 'HUGO FERNANDO RODRIGUEZ', 'Supervisor de Operaciones en Pozos Tipo 3', '3133742742', 'huferod2023@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC71376583'),
(191, 73188189, 'CARLOS ANTONIO FONTALVO CARRASCAL', 'Supervisor de Operaciones en Pozos Tipo 3', '3183476222', 'carlosfontalvocarrascal@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC73188189'),
(192, 74085101, 'EDWIN FERNANDO HERNANDEZ LADINO', 'Profesional Senior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3118949595', 'edwin.hernandez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC74085101'),
(193, 74362501, 'DANIEL SEGURA ESPINOSA', 'Supervisor de Operaciones en Pozos Tipo 1', '3185023626', 'Segura.7305@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC74362501'),
(194, 74375671, 'JULIO EDGARDO VILLAMIL MONDRAGON', 'Supervisor de Operaciones en Pozos Tipo 2', '3144637387', 'juedvimon@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC74375671'),
(195, 79208337, 'CARLOS ALBERTO RAMIREZ ESCOBAR', 'Soporte Operativo Tipo 2', '3112341274', 'carami70mx@yahoo.com.mx', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC79208337'),
(196, 79490148, 'CESAR AUGUSTO URREGO', 'Subgerente', '3102541498', 'currego@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC79490148'),
(197, 79613401, 'WILLIAM AUGUSTO FRANCO', 'Gerente General', '3138174046', 'wfranco@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC79613401'),
(198, 79902734, 'LUIS FELIPE URIBE PARRA', 'Supervisor de Operaciones en Pozos Tipo 2', '3214552350', 'Lfu1978@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC79902734'),
(199, 80100600, 'LUIS GUILLERMO MERCADO RICO', 'Supervisor de Operaciones en Pozos Tipo 3', '3132424793', 'luis.guillermo.mercado@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC80100600'),
(200, 80150738, 'WILBER CASTAnEDA CASTAnEDA', 'Supervisor de Operaciones en Pozos Tipo 1', '3112341274', 'wilbercastaeda@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC80150738'),
(201, 80222563, 'DIEGO ALEXANDER RINCON MOLINA', 'Analista de Gestion Humana y Nomina', '3014165956 3054', 'nomina@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC80222563'),
(202, 80231602, 'LEONARDO HOYOS MARTINEZ', 'Asistente de Logistica', '3146220409', 'asistentelogistica@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC80231602'),
(203, 80748832, 'JAIR ENRIQUE ALDANA PALMA', 'Servicio Especializado Tipo 2 - Integridad', '3508446786', 'Jairmark@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC80748832'),
(204, 86042335, 'GUTEMBERG ALAINE GOMEZ RIVERA', 'Supervisor de Operaciones en Pozos Tipo 2', '3142179752', 'gutemberg.gomez@yahoo.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC86042335'),
(205, 86057747, 'ALEXANDER RONDON', 'Supervisor de Operaciones en Pozos Tipo 2', '3173773971', 'alexander.rondon@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC86057747'),
(206, 86068586, 'SERGIO VELEZ CARDONA', 'Soporte Operativo Tipo 3B', '3124402881', 'servelez80@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC86068586'),
(207, 86075700, 'JOSE LUIS VELEZ CARDONA', 'Soporte Operativo Tipo 3A', '3115988198', 'jose.velezcardona@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC86075700'),
(208, 86084413, 'CAMILO ANDRES RIAnO GALVIS', 'Soporte Operativo Tipo 3B', '3138880373', 'andres.rianog84@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC86084413'),
(209, 88158913, 'NESTOR ALONSO JAIMES PORTILLA', 'Supervisor de Operaciones en Pozos Tipo 3', '3173381419', 'najp74@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC88158913'),
(210, 98398935, 'GUSTAVO LEON DELGADO ZAMBRANO', 'Supervisor de Operaciones en Pozos Tipo 2', '3188015982', 'gustdelz@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC98398935'),
(211, 1000133308, 'JUAN CAMILO  GRANADOS BUSTAMANTE', 'Practicante Universitario', '3024968549', 'juangrb29@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1000133308'),
(212, 1000185449, 'NATALIA XIMENA FRANCO REINA', 'Asesor Administrativo', '33769555697', 'nataliaxfranco@gmail.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1000185449'),
(213, 1000931984, 'KAREN JULIETH CARRANZA RODRIGUEZ', 'Analista Contable', '3053852350', 'krodri8888@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1000931984'),
(214, 1002691928, 'JUAN CARLOS SAAVEDRA BOHaRQUEZ', 'Soporte Operativo Tipo 4A', '3133199943', 'juancho11.js@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1002691928'),
(215, 1006823525, 'MARIA CAMILA CARDENAS URIZA', 'Profesional de Proyectos', '3219810231', 'proyectos5@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1006823525'),
(216, 1007407868, 'NICOLAS URREGO SANDOVAL', 'Asesor Administrativo', '3185179135', 'nicolasurregos@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1007407868'),
(217, 1007493802, 'MICHAEL STIVEN RUIZ CARO', 'Soporte Hseq II', '3115119407', 'soportehseqproyectos@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1007493802'),
(218, 1007647736, 'SONIA STEPHANIA FONSECA LOPEZ', 'Asistente de Nomina y gestion humana', '3115960601', 'asistentegestionhumana2@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1007647736'),
(219, 1010104560, 'JUAN DAVIDPRIETO ZAMUDIO', 'Aprendiz Etapa Lectiva', '3174466275', 'prietozamudioj@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1010104560'),
(220, 1010185219, 'AIDA FAISULY AVILA MORALES', 'Soporte Operativo Tipo 3A', '3173672474', 'aidaavilam@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1010185219'),
(221, 1011202252, 'JOSE MATEO LOPEZ CIFUENTES', 'Programador Aprendiz SENA', '3208023808', 'josemateolopezcifuentes@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1011202252'),
(222, 1013261036, 'CHRISTIAN CAMILO FRANCO REINA', 'Asistente Administrativo', '3505393712', 'christianfranco688@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1013261036'),
(223, 1013678265, 'JAVIER EDUARDO ROJAS PRIETO', 'Soporte Operativo Tipo 5A', '3102758817', 'Javierrojas1214@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1013678265'),
(224, 1014180459, 'SANDRA MILENA FLOREZ PRADO', 'Asistente administrativa y de gestion humana', '3125478393', 'asistenteadministrativo2@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1014180459'),
(225, 1014251428, 'AURA ALEJANDRA CONTRERAS TORRES', 'Asistente Administrativo', '3103404348', 'asistenteadministrativo1@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1014251428'),
(226, 1014267683, 'YEIMY KATERINE SALAMANCA CALDERON', 'Profesional de Proyectos', '3125040813', 'proyectos1@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1014267683'),
(227, 1014663204, 'ANDRES FELIPELOAIZA CAVIEDES', 'Aprendiz Etapa Lectiva', '3245290052', 'loaizaf187@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1014663204'),
(228, 1016037506, 'PAOLA ANDREA GOMEZ CABRERA', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3168735316', 'paola.gomez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1016037506'),
(229, 1019087239, 'JUAN DAVID CASTRO FRANCO', 'Asesor Administrativo', '3158111370', 'juandafranco3@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1019087239'),
(230, 1019098876, 'YESSICA ANDREA ABELLA RODRIGUEZ', 'Asistente Contable', '3105516135', 'asistentecontable3@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1019098876'),
(231, 1020733194, 'ELOY GABRIEL GOMEZ REYES', 'Coordinador de Gestion Humana', '3155150570', 'coordinaciongestionhumana@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1020733194'),
(232, 1022344726, 'VIVIANA DEL PILAR ALFONSO AVENDAnO', 'Asesor Administrativo', '3053993712', 'Viviana.alfonsoa@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1022344726'),
(233, 1022407009, 'ANGGIE ESTEFANIA ALONSO RUIZ', 'Tecnico Asistente Administrativa', '3183937371', 'asisdministrativo@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1022407009'),
(234, 1022942596, 'ANDREA IRENE DEL PILAR PINZON', 'Asistente de Gestion Humana y Nomina', '3176689489', 'asistentegestionhumana@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1022942596'),
(235, 1024478397, 'KAROL DANIELA SALCEDO ROMERO', 'Aprendiz Etapa Lectiva', '3059257440', 'karoldanielasr12@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1024478397'),
(236, 1026255124, 'MARIA ALEJANDRA MOJICA ARCINIEGAS', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9532986 del contrato Matriz No. 30', '3166215115', 'alejandra_mojica123@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1026255124'),
(237, 1026267917, 'WENDY ZAMANDA FONSECA HURTADO', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforacion Completamiento y Workover  D1', '3202302235', 'zamandafh1988@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1026267917'),
(238, 1031145571, 'DIANA MARCELA JACOBO MANCERA', 'Soporte Hseq', '3014799855', 'soportehseq@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1031145571'),
(239, 1031649053, 'EYMER SANTIAGO MONDEZ HERRERA', 'Aprendiz Etapa Lectiva', '3195415213', 'Santiagom202418@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1031649053'),
(240, 1032446831, 'ELIANA IVETH ALARCON RONDON', 'Profesional de Proyectos', '3178534038', 'proyectos6@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1032446831'),
(241, 1032461712, 'BRAYAN ALEJANDRO MONROY PINZON', 'Soporte Operativo Tipo 3A', '3208298915', 'b.alejandro1345@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1032461712'),
(242, 1032467291, 'CHRISTIAN MAURICIO PARDO CARRANZA', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9532986 del contrato Matriz No. 30', '3166969988', 'christian.pardo@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1032467291'),
(243, 1047451443, 'CARLOS RAFAEL OLMOS CARVAL', 'Profesional B sico para la ejecucion de actividades de la ODS No. 9532986 del contrato Matriz No. 30', '3012392187', 'carlos.olmos@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1047451443'),
(244, 1053611893, 'ANGY YOLIMA SALCEDO AMADO', 'Profesional de proyectos M1', '3213105102', 'angysalcedo0810@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1053611893'),
(245, 1053788938, 'GUSTAVO ADOLFO GIRALDO CORREA', 'Profesional de Proyectos', '3102244072', 'ggiraldo@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1053788938'),
(246, 1056709240, 'IVAN DARIO MOZO MORENO', 'Profesional Senior para la ejecucion de actividades de la ODS No. 9532986 del contrato Matriz No. 30', '3174236296', 'ivan.mozo@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1056709240'),
(247, 1057580446, 'JUAN PABLO RAMIREZ DIAZ', 'Soporte Operativo Tipo 4A', '3183623525', 'juanpianoo@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1057580446'),
(248, 1065599609, 'CESAR ELIECER RODRIGUEZ CAMELO', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3005462735', 'cesar.rodriguez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1065599609'),
(249, 1065810992, 'JOSE CARLOS BAQUERO PEnALOZA', 'Soporte Operativo Tipo 3A', '3007220907', 'Josecarlosbaquero1994@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1065810992'),
(250, 1075248439, 'MARIA DEL PILAR GOMEZ MORA', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforacion Completamiento y Workover  D1', '3107656528', 'mdpgomezm@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1075248439'),
(251, 1075271569, 'ALVARO JAVIERQUIMBAYA MONTEALEGRE', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforacion Completamiento y Workover  D3', '3184024785', 'alvarojqm@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1075271569'),
(252, 1075292422, 'OLMER ANDRES MORALES MORA', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9532986 del contrato Matriz No. 30', '3232847716', 'andres.morales@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1075292422'),
(253, 1077173073, 'ESTEBAN GARCIA ROJAS', 'Supervisor de Operaciones en Pozos Tipo 3', '3233969196', 'estebangr1987@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1077173073'),
(254, 1082067533, 'AGUSTIN JOSE RONCALLO CERVANTES', 'Soporte Operativo Tipo 3A', '3012882535', 'roncalloagustin@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1082067533'),
(255, 1091668362, 'JESUS IVAN PACHECO ROMERO', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3006213973', 'jesus.pacheco@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1091668362'),
(256, 1095786398, 'AURA MARIA TRASLAVInA PRADA', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3132028099', 'aura.traslavina@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1095786398'),
(257, 1095826986, 'LIZETH DAYANA BAUTISTA RICO', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9532986 del contrato Matriz No. 30', '3138678621', 'lbautistarico@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1095826986'),
(258, 1098681773, 'JHON HARVEY CARREnO HERNANDEZ', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3114976619', 'jhon.carreno@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1098681773'),
(259, 1098683077, 'LUIS CARLOS MONSALVE PARRA', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3187441574', 'luisc.monsalve@outlook.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1098683077'),
(260, 1098692205, 'BRIGGITE SUSEC CAMACHO JEREZ', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3186506670', 'briggite.camacho@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1098692205'),
(261, 1098706838, 'JULIAN ANDRES HERNANDEZ PINTO', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3174478283', 'julian.hernandez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1098706838'),
(262, 1098725794, 'JOSE GABRIEL NASSAR DIAZ', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9532986 del contrato Matriz No. 30', '3166233088', 'jose.nassar@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1098725794'),
(263, 1098758681, 'MILTON JULIAN GUALTEROS QUIROGA', 'Profesional Senior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3002755299', 'milton.gualteros@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1098758681'),
(264, 1098774228, 'ANGELICA MARIA GONZALEZ SANCHEZ', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforacion Completamiento y Workover D2', '3014187370', 'ing.gonzalez.angelica@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1098774228'),
(265, 1099210462, 'KARLA JINETH CORREDOR MARIN', 'Soporte Operativo Tipo 5A', '3108645694', 'Jinerth.corredor@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1099210462'),
(266, 1100954344, 'CAMILA FERNANDA MEDINA SANDOVAL', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9814358 del contrato Matriz No. 30', '3155257550', 'camila.medina@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1100954344'),
(267, 1100961505, 'GEISSON RENO ZAFRA URREA', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3163677407', 'geisson.zafra@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1100961505'),
(268, 1101692935, 'DIEGO FERNANDO PINTO HERNμNDEZ', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3143794371', 'diego.pinto@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1101692935'),
(269, 1101693549, 'CESAR EDUARDO GARNICA GOMEZ', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3173374883', 'cesar.garnica@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1101693549'),
(270, 1102580512, 'FABRYZCIO ANDRES ORTIZ GARCIA', 'Aprendiz Etapa Lectiva', '3025971636', 'Fabryzcioortiz@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1102580512'),
(271, 1115914145, 'VIANI YORELY RUIZ GALINDO', 'Soporte Operativo Tipo 4A', '3108677402', 'vianiruiz@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1115914145'),
(272, 1115914517, 'CAMILO ANDRES IBAnEZ ROZO', 'Soporte Operativo Tipo 3A', '3138609005', 'Ingcamilo.ibanez@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1115914517'),
(273, 1119211830, 'LUIS MIGUEL GUEVARA MARLES', 'Coordinador Hseq', '3102981548', 'hseq@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1119211830'),
(274, 1121825022, 'CAMILO ANDRES PATARROYO VARON', 'Soporte Operativo Tipo 3A', '3142253275', 'patacam86@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1121825022'),
(275, 1121848186, 'MARIA SHIRLEY ORDOnEZ CUESTA', 'Profesional Administrativa y de Gestion Humana, Proyectos', '3213766043', 'maria.ocuesta89@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1121848186'),
(276, 1121869050, 'YENNI PAOLA DONCEL ACHO', 'Soporte Operativo Tipo 3A', '3102190553', 'yenni.doncel08@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1121869050'),
(277, 1121871041, 'JORGE LEONARDO  MOYANO PEnA', 'Soporte Operativo Tipo 3A', '3125801263', 'jorgeleo-07@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1121871041'),
(278, 1121913534, 'MARIA MONICA SIERRA CESPEDES', 'Ingeniero(a) Asistente de Company Man para operaciones de Perforacion Completamiento y Workover  D1', '3114694699', 'mariamonicasc@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1121913534'),
(279, 1121941649, 'ALEJANDRO DUVAN LOPEZ ROJAS', 'Profesional Junior para la ejecucion de actividades de la ODS No. 9770807 del contrato Matriz No. 30', '3214472738', 'alejandro.lopez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1121941649'),
(280, 1122135336, 'MARIA DEL PILAR   RODRIGUEZ SANCHEZ', 'Profesional Soporte en Campo', '3102844018', 'pilar.rodriguez23@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1122135336'),
(281, 1128433572, 'JHONNATAN VASQUEZ CARDENAS', 'Servicio Especializado Tipo 3A', '3006608443', 'jhonnatan.vasquez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1128433572'),
(282, 1136887341, 'NIDIA CAROLINA GRANDAS CASTAnEDA', 'Profesional de Proyectos', '3195200943', 'proyectos3@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1136887341'),
(283, 1136888916, 'DANIEL ANDRES JOYA SAAVEDRA', 'Profesional de Proyectos', '3108612386', 'proyectos2@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1136888916'),
(284, 1140847297, 'DAVID ALEJANDRO GARCIA CORONADO', 'Profesional Senior para la ejecucion de actividades de la ODS No. 9532986 del contrato Matriz No. 30', '3005751696', 'david.garcia@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1140847297'),
(286, 87454560, 'HECTOR ANDRES NOGUERA BOLAnOS', 'Supervisor de Operaciones en Pozos Tipo 4', '3117592655', 'andresnoguera111@hotmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC87454560'),
(287, 1007627524, 'ANDRES CAMILO CARDENAS REYES', 'Soporte IT Primer Nivel', '3138458839', 'soporteit.nivel1@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1007627524'),
(288, 1010126883, 'DANNY ALEXANDERPANCHE VICENTES', 'Contador Junior', '3116190555', 'contadorjr@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1010126883'),
(289, 1018516821, 'LUISA MARIA MELO RODRIGUEZ', 'Aprendiz Etapa Practica', '3144735103', 'luisamrdz22@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1018516821'),
(290, 1021672977, 'DEISY NATHALIA PAEZ MONTAnEZ', 'Aprendiz Etapa Practica', '3226459072', 'paezdeisy88@gmail.com', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1021672977'),
(291, 1121936876, 'LAURA DANIELA SEGURA MORERA', 'Soporte Hseq Proyectos', '3219054383', 'profesionalhseq@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '(57) 313 817 4046', '(1) 713 623 1113', 'CC1121936876');

CREATE TABLE `evaluacion` (
  `id_evaluacion` int(11) NOT NULL,
  `id_empleado` int(11) NOT NULL,
  `fecha_evaluacion` datetime NOT NULL,
  `observaciones_generales` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `funciones` (
  `id_funcion` int(11) NOT NULL,
  `id_cargo` int(11) NOT NULL,
  `titulo_funcion` varchar(100) NOT NULL,
  `descripcion_funcion` text DEFAULT NULL,
  `tipo_funcion` varchar(50) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `cargo`
  ADD PRIMARY KEY (`id_cargo`),
  ADD UNIQUE KEY `uk_nombre_cargo` (`nombre_cargo`);

ALTER TABLE `detalle_evaluacion`
  ADD PRIMARY KEY (`id_detalle_evaluacion`),
  ADD KEY `fk_detalle_eval_evaluacion` (`id_evaluacion`),
  ADD KEY `fk_detalle_eval_funcion` (`id_funcion`);

ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id_empleado`),
  ADD UNIQUE KEY `uk_cedula` (`cedula`),
  ADD KEY `fk_empleados_cargo` (`cargo`);

ALTER TABLE `evaluacion`
  ADD PRIMARY KEY (`id_evaluacion`),
  ADD KEY `fk_evaluacion_empleado` (`id_empleado`);

ALTER TABLE `funciones`
  ADD PRIMARY KEY (`id_funcion`),
  ADD KEY `fk_funciones_cargo` (`id_cargo`);

ALTER TABLE `cargo`
  MODIFY `id_cargo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

ALTER TABLE `detalle_evaluacion`
  MODIFY `id_detalle_evaluacion` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `empleados`
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=292;

ALTER TABLE `evaluacion`
  MODIFY `id_evaluacion` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `funciones`
  MODIFY `id_funcion` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `detalle_evaluacion`
  ADD CONSTRAINT `fk_detalle_eval_evaluacion` FOREIGN KEY (`id_evaluacion`) REFERENCES `evaluacion` (`id_evaluacion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_detalle_eval_funcion` FOREIGN KEY (`id_funcion`) REFERENCES `funciones` (`id_funcion`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `empleados`
  ADD CONSTRAINT `fk_empleados_cargo` FOREIGN KEY (`cargo`) REFERENCES `cargo` (`nombre_cargo`);

ALTER TABLE `evaluacion`
  ADD CONSTRAINT `fk_evaluacion_empleado` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `funciones`
  ADD CONSTRAINT `fk_funciones_cargo` FOREIGN KEY (`id_cargo`) REFERENCES `cargo` (`id_cargo`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
