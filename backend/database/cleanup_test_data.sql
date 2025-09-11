-- Script para limpiar datos de prueba
-- Mantiene solo las tablas empleados y cargo
-- Resetea los contadores de IDs

-- Deshabilitar verificación de claves foráneas temporalmente
SET FOREIGN_KEY_CHECKS = 0;

-- Vaciar tablas de evaluación (usar DELETE para tablas con claves foráneas)
DELETE FROM `evaluacion_competencias`;
DELETE FROM `evaluacion_estado_historial`;
DELETE FROM `evaluacion_firmas`;
DELETE FROM `evaluacion_hseq`;
DELETE FROM `evaluacion_mejoramiento`;
DELETE FROM `evaluacion_plan_accion`;
DELETE FROM `evaluacion_promedios`;
DELETE FROM `evaluacion`;

-- Vaciar tablas HSEQ
DELETE FROM `hseq_evaluacion_items`;
DELETE FROM `hseq_evaluacion`;

-- Vaciar tabla de detalles de evaluación
DELETE FROM `detalle_evaluacion`;

-- Habilitar verificación de claves foráneas
SET FOREIGN_KEY_CHECKS = 1;

-- Resetear contadores de IDs
ALTER TABLE `evaluacion` AUTO_INCREMENT = 1;
ALTER TABLE `evaluacion_competencias` AUTO_INCREMENT = 1;
ALTER TABLE `evaluacion_estado_historial` AUTO_INCREMENT = 1;
ALTER TABLE `evaluacion_firmas` AUTO_INCREMENT = 1;
ALTER TABLE `evaluacion_hseq` AUTO_INCREMENT = 1;
ALTER TABLE `evaluacion_mejoramiento` AUTO_INCREMENT = 1;
ALTER TABLE `evaluacion_plan_accion` AUTO_INCREMENT = 1;
ALTER TABLE `evaluacion_promedios` AUTO_INCREMENT = 1;
ALTER TABLE `hseq_evaluacion` AUTO_INCREMENT = 1;
ALTER TABLE `hseq_evaluacion_items` AUTO_INCREMENT = 1;
ALTER TABLE `detalle_evaluacion` AUTO_INCREMENT = 1;

-- Verificar que las tablas están vacías
SELECT 'evaluacion' as tabla, COUNT(*) as registros FROM evaluacion
UNION ALL
SELECT 'evaluacion_competencias', COUNT(*) FROM evaluacion_competencias
UNION ALL
SELECT 'evaluacion_estado_historial', COUNT(*) FROM evaluacion_estado_historial
UNION ALL
SELECT 'evaluacion_firmas', COUNT(*) FROM evaluacion_firmas
UNION ALL
SELECT 'evaluacion_hseq', COUNT(*) FROM evaluacion_hseq
UNION ALL
SELECT 'evaluacion_mejoramiento', COUNT(*) FROM evaluacion_mejoramiento
UNION ALL
SELECT 'evaluacion_plan_accion', COUNT(*) FROM evaluacion_plan_accion
UNION ALL
SELECT 'evaluacion_promedios', COUNT(*) FROM evaluacion_promedios
UNION ALL
SELECT 'hseq_evaluacion', COUNT(*) FROM hseq_evaluacion
UNION ALL
SELECT 'hseq_evaluacion_items', COUNT(*) FROM hseq_evaluacion_items
UNION ALL
SELECT 'detalle_evaluacion', COUNT(*) FROM detalle_evaluacion;
