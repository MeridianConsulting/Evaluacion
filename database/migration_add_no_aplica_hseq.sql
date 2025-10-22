-- ============================================================================
-- MIGRACIÓN: Agregar columna no_aplica a hseq_evaluacion_items
-- Fecha: 2025-10-22
-- Propósito: Corregir bug donde "No Aplica" se guardaba como 0
-- ============================================================================

-- PASO 1: Crear backup de la tabla
CREATE TABLE IF NOT EXISTS hseq_evaluacion_items_backup_20251022 
AS SELECT * FROM hseq_evaluacion_items;

-- PASO 2: Agregar columna no_aplica
ALTER TABLE hseq_evaluacion_items
  ADD COLUMN no_aplica TINYINT(1) NOT NULL DEFAULT 0
  AFTER calificacion;

-- PASO 3: Crear índice para optimizar consultas
CREATE INDEX idx_no_aplica ON hseq_evaluacion_items(no_aplica);

-- PASO 4: Migración de datos existentes
-- MIGRACIÓN AGRESIVA: Convertir TODOS los 0 a "No Aplica"
-- Justificación: En el formulario HSEQ no existe opción de calificar con 0
-- Por lo tanto, TODOS los 0 en BD son "No Aplica" mal guardados por el bug

UPDATE hseq_evaluacion_items
SET 
    no_aplica = 1,
    calificacion = NULL
WHERE 
    calificacion = 0;

-- PASO 5: Recalcular promedios en tabla maestra
UPDATE hseq_evaluacion he
INNER JOIN (
    SELECT 
        id_hseq_evaluacion,
        AVG(calificacion) as nuevo_promedio
    FROM hseq_evaluacion_items
    WHERE no_aplica = 0 
      AND calificacion IS NOT NULL
    GROUP BY id_hseq_evaluacion
) nuevos_promedios ON nuevos_promedios.id_hseq_evaluacion = he.id_hseq_evaluacion
SET he.promedio_hseq = nuevos_promedios.nuevo_promedio;

-- PASO 6: Verificación post-migración
SELECT 
    'Total de registros migrados' as Descripcion,
    COUNT(*) as Cantidad
FROM hseq_evaluacion_items
WHERE no_aplica = 1

UNION ALL

SELECT 
    'Items con calificación válida' as Descripcion,
    COUNT(*) as Cantidad
FROM hseq_evaluacion_items
WHERE no_aplica = 0 AND calificacion IS NOT NULL

UNION ALL

SELECT 
    'Evaluaciones afectadas (promedio recalculado)' as Descripcion,
    COUNT(DISTINCT id_hseq_evaluacion) as Cantidad
FROM hseq_evaluacion_items
WHERE no_aplica = 1;

-- PASO 7: Detalle por evaluación
SELECT 
    he.id_hseq_evaluacion,
    emp.nombre as empleado,
    he.periodo_evaluacion,
    he.promedio_hseq as nuevo_promedio,
    COUNT(*) as total_items,
    SUM(CASE WHEN hei.no_aplica = 1 THEN 1 ELSE 0 END) as items_na,
    SUM(CASE WHEN hei.no_aplica = 0 AND hei.calificacion IS NOT NULL THEN 1 ELSE 0 END) as items_validos,
    AVG(CASE WHEN hei.no_aplica = 0 AND hei.calificacion IS NOT NULL THEN hei.calificacion END) as promedio_calculado
FROM hseq_evaluacion he
INNER JOIN hseq_evaluacion_items hei ON hei.id_hseq_evaluacion = he.id_hseq_evaluacion
INNER JOIN empleados emp ON emp.id_empleado = he.id_empleado
GROUP BY he.id_hseq_evaluacion, emp.nombre, he.periodo_evaluacion, he.promedio_hseq
ORDER BY he.fecha_evaluacion DESC
LIMIT 50;

-- ============================================================================
-- NOTAS IMPORTANTES:
-- 1. Se creó backup automático en hseq_evaluacion_items_backup_20251022
-- 2. Para revertir cambios: DROP COLUMN no_aplica y restaurar desde backup
-- 3. MIGRACIÓN AGRESIVA: Convierte TODOS los 0 a "No Aplica"
-- 4. Justificación: El formulario HSEQ no permite calificar con 0 (solo 1-5 o NA)
-- 5. Por lo tanto, TODOS los 0 en BD son errores causados por el bug
-- ============================================================================

