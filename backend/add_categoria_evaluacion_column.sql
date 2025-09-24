-- Script para agregar la columna categoria_evaluacion a la tabla evaluacion
-- Ejecutar este script en la base de datos para agregar la columna faltante

ALTER TABLE `evaluacion` 
ADD COLUMN `categoria_evaluacion` enum('Período de prueba','Trimestral','Anual') DEFAULT 'Anual' 
AFTER `periodo_evaluacion`;

-- Actualizar registros existentes con valor por defecto
UPDATE `evaluacion` 
SET `categoria_evaluacion` = 'Anual' 
WHERE `categoria_evaluacion` IS NULL;
