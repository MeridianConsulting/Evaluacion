-- Script para añadir la columna categoria_evaluacion a la tabla evaluacion
-- Ejecutar este script en la base de datos para añadir el nuevo campo

ALTER TABLE `evaluacion` 
ADD COLUMN `categoria_evaluacion` ENUM('Período de prueba', 'Trimestral', 'Anual') 
DEFAULT 'Anual' 
COMMENT 'Categoría de la evaluación: Período de prueba, Trimestral o Anual' 
AFTER `periodo_evaluacion`;

-- Actualizar las evaluaciones existentes para que tengan la categoría por defecto
UPDATE `evaluacion` 
SET `categoria_evaluacion` = 'Anual' 
WHERE `categoria_evaluacion` IS NULL;

