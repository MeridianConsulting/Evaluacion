-- Script para eliminar todas las tablas de la base de datos 'evaluacion'
-- Este script maneja las llaves foráneas de manera segura

-- Deshabilitar verificación de llaves foráneas temporalmente
SET FOREIGN_KEY_CHECKS = 0;

-- Eliminar la vista primero (si existe)
DROP VIEW IF EXISTS `v_evaluaciones_estado`;

-- Eliminar todas las tablas en orden inverso a sus dependencias
-- Tablas que dependen de otras (tablas hijas)
DROP TABLE IF EXISTS `hseq_evaluacion_items`;
DROP TABLE IF EXISTS `hseq_evaluacion`;
DROP TABLE IF EXISTS `evaluacion_promedios`;
DROP TABLE IF EXISTS `evaluacion_plan_accion`;
DROP TABLE IF EXISTS `evaluacion_mejoramiento`;
DROP TABLE IF EXISTS `evaluacion_hseq`;
DROP TABLE IF EXISTS `evaluacion_firmas`;
DROP TABLE IF EXISTS `evaluacion_estado_historial`;
DROP TABLE IF EXISTS `evaluacion_competencias`;
DROP TABLE IF EXISTS `detalle_evaluacion`;

-- Tablas principales (tablas padre)
DROP TABLE IF EXISTS `evaluacion`;
DROP TABLE IF EXISTS `empleados`;
DROP TABLE IF EXISTS `cargo`;

-- Rehabilitar verificación de llaves foráneas
SET FOREIGN_KEY_CHECKS = 1;

-- Mensaje de confirmación
SELECT 'Todas las tablas han sido eliminadas exitosamente' AS mensaje;
