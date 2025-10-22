-- ============================================================================
-- VERIFICACIÓN PRE-MIGRACIÓN: Análisis de items con calificación = 0
-- Ejecutar ANTES de aplicar migration_add_no_aplica_hseq.sql
-- Propósito: Ver cuántos registros se verán afectados por la migración
-- ============================================================================

-- 1. Total de items con calificación = 0
SELECT 
    'Total items con calificación = 0' as Descripcion,
    COUNT(*) as Cantidad
FROM hseq_evaluacion_items
WHERE calificacion = 0;

-- 2. Distribución de 0s por evaluación
SELECT 
    'Evaluaciones que contienen items con 0' as Descripcion,
    COUNT(DISTINCT id_hseq_evaluacion) as Cantidad
FROM hseq_evaluacion_items
WHERE calificacion = 0;

-- 3. Detalle por evaluación (las más afectadas)
SELECT 
    he.id_hseq_evaluacion,
    emp.nombre as empleado,
    emp.cedula,
    he.periodo_evaluacion,
    he.promedio_hseq as promedio_actual,
    COUNT(*) as total_items,
    SUM(CASE WHEN hei.calificacion = 0 THEN 1 ELSE 0 END) as items_con_0,
    SUM(CASE WHEN hei.calificacion > 0 THEN 1 ELSE 0 END) as items_validos,
    AVG(CASE WHEN hei.calificacion > 0 THEN hei.calificacion END) as promedio_sin_0s,
    -- Proyección del nuevo promedio (excluyendo 0s)
    ROUND(AVG(CASE WHEN hei.calificacion > 0 THEN hei.calificacion END), 2) as promedio_despues_migracion
FROM hseq_evaluacion he
INNER JOIN hseq_evaluacion_items hei ON hei.id_hseq_evaluacion = he.id_hseq_evaluacion
INNER JOIN empleados emp ON emp.id_empleado = he.id_empleado
GROUP BY he.id_hseq_evaluacion, emp.nombre, emp.cedula, he.periodo_evaluacion, he.promedio_hseq
HAVING items_con_0 > 0
ORDER BY items_con_0 DESC, he.fecha_evaluacion DESC;

-- 4. Análisis de impacto en promedios
SELECT 
    'Impacto en Promedios' as Analisis,
    COUNT(DISTINCT he.id_hseq_evaluacion) as total_evaluaciones_afectadas,
    AVG(he.promedio_hseq) as promedio_actual_general,
    AVG(CASE WHEN hei.calificacion > 0 THEN hei.calificacion END) as promedio_despues_migracion_general,
    ROUND(AVG(CASE WHEN hei.calificacion > 0 THEN hei.calificacion END) - AVG(he.promedio_hseq), 2) as diferencia_promedio
FROM hseq_evaluacion he
INNER JOIN hseq_evaluacion_items hei ON hei.id_hseq_evaluacion = he.id_hseq_evaluacion
WHERE he.id_hseq_evaluacion IN (
    SELECT DISTINCT id_hseq_evaluacion 
    FROM hseq_evaluacion_items 
    WHERE calificacion = 0
);

-- 5. Top 10 evaluaciones con mayor impacto
SELECT 
    he.id_hseq_evaluacion,
    emp.nombre as empleado,
    he.periodo_evaluacion,
    he.promedio_hseq as antes,
    ROUND(AVG(CASE WHEN hei.calificacion > 0 THEN hei.calificacion END), 2) as despues,
    ROUND(AVG(CASE WHEN hei.calificacion > 0 THEN hei.calificacion END) - he.promedio_hseq, 2) as incremento,
    SUM(CASE WHEN hei.calificacion = 0 THEN 1 ELSE 0 END) as items_0
FROM hseq_evaluacion he
INNER JOIN hseq_evaluacion_items hei ON hei.id_hseq_evaluacion = he.id_hseq_evaluacion
INNER JOIN empleados emp ON emp.id_empleado = he.id_empleado
GROUP BY he.id_hseq_evaluacion, emp.nombre, he.periodo_evaluacion, he.promedio_hseq
HAVING items_0 > 0
ORDER BY incremento DESC
LIMIT 10;

-- 6. Distribución de calificaciones actuales
SELECT 
    CASE 
        WHEN calificacion = 0 THEN 'Calificación 0 (serán NA)'
        WHEN calificacion = 1 THEN 'Calificación 1'
        WHEN calificacion = 2 THEN 'Calificación 2'
        WHEN calificacion = 3 THEN 'Calificación 3'
        WHEN calificacion = 4 THEN 'Calificación 4'
        WHEN calificacion = 5 THEN 'Calificación 5'
        WHEN calificacion IS NULL THEN 'NULL'
        ELSE 'Otros'
    END as rango_calificacion,
    COUNT(*) as cantidad,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM hseq_evaluacion_items), 2) as porcentaje
FROM hseq_evaluacion_items
GROUP BY 
    CASE 
        WHEN calificacion = 0 THEN 'Calificación 0 (serán NA)'
        WHEN calificacion = 1 THEN 'Calificación 1'
        WHEN calificacion = 2 THEN 'Calificación 2'
        WHEN calificacion = 3 THEN 'Calificación 3'
        WHEN calificacion = 4 THEN 'Calificación 4'
        WHEN calificacion = 5 THEN 'Calificación 5'
        WHEN calificacion IS NULL THEN 'NULL'
        ELSE 'Otros'
    END
ORDER BY cantidad DESC;

-- 7. Items específicos con calificación 0 (muestra)
SELECT 
    hei.id_item,
    he.id_hseq_evaluacion,
    emp.nombre as empleado,
    he.periodo_evaluacion,
    hei.id_responsabilidad,
    LEFT(hei.responsabilidad, 80) as responsabilidad_corta,
    hei.calificacion,
    CASE 
        WHEN hei.justificacion IS NULL OR hei.justificacion = '' THEN 'Sin justificación'
        ELSE LEFT(hei.justificacion, 50)
    END as justificacion
FROM hseq_evaluacion_items hei
INNER JOIN hseq_evaluacion he ON he.id_hseq_evaluacion = hei.id_hseq_evaluacion
INNER JOIN empleados emp ON emp.id_empleado = he.id_empleado
WHERE hei.calificacion = 0
ORDER BY he.fecha_evaluacion DESC
LIMIT 20;

-- ============================================================================
-- INTERPRETACIÓN DE RESULTADOS:
-- 
-- Query 1-2: Muestra cuántos items y evaluaciones se verán afectados
-- Query 3: Lista detallada de evaluaciones con 0s y proyección del nuevo promedio
-- Query 4: Impacto general en promedios (antes vs después)
-- Query 5: Top 10 evaluaciones con mayor incremento de promedio
-- Query 6: Distribución actual de calificaciones (para ver proporción de 0s)
-- Query 7: Muestra específica de items con 0 para revisión manual
-- ============================================================================

