-- Script para agregar campos de justificación a la tabla evaluacion_competencias
-- Ejecutar este script en la base de datos para agregar los campos faltantes

ALTER TABLE `evaluacion_competencias` 
ADD COLUMN `justificacion_empleado` TEXT DEFAULT NULL 
AFTER `calificacion_empleado`;

ALTER TABLE `evaluacion_competencias` 
ADD COLUMN `justificacion_jefe` TEXT DEFAULT NULL 
AFTER `calificacion_jefe`;

-- Verificar que los campos se agregaron correctamente
DESCRIBE `evaluacion_competencias`;
