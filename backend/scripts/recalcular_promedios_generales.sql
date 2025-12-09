-- ============================================================
-- SCRIPT SQL PARA RECALCULAR PROMEDIOS GENERALES
-- ============================================================
-- Este script recalcula el promedio_general en la tabla evaluacion_promedios
-- usando la fórmula correcta: 20% autoevaluación, 40% jefe, 40% HSEQ
-- 
-- IMPORTANTE: Hacer backup de la base de datos antes de ejecutar
-- ============================================================

-- ============================================================
-- ACTUALIZACIÓN DE PROMEDIOS GENERALES
-- ============================================================
UPDATE evaluacion_promedios ep
INNER JOIN evaluacion e ON ep.id_evaluacion = e.id_evaluacion
LEFT JOIN (
    SELECT 
        id_evaluacion,
        AVG(CASE WHEN calificacion_empleado > 0 THEN calificacion_empleado ELSE NULL END) as promedio_auto
    FROM evaluacion_competencias
    GROUP BY id_evaluacion
) avg_auto ON ep.id_evaluacion = avg_auto.id_evaluacion
LEFT JOIN (
    SELECT 
        id_evaluacion,
        AVG(CASE WHEN calificacion_jefe > 0 THEN calificacion_jefe ELSE NULL END) as promedio_jefe
    FROM evaluacion_competencias
    GROUP BY id_evaluacion
) avg_jefe ON ep.id_evaluacion = avg_jefe.id_evaluacion
LEFT JOIN (
    SELECT 
        h1.id_empleado,
        h1.periodo_evaluacion,
        h1.promedio_hseq
    FROM hseq_evaluacion h1
    INNER JOIN (
        SELECT 
            id_empleado,
            periodo_evaluacion,
            MAX(fecha_evaluacion) as max_fecha
        FROM hseq_evaluacion
        GROUP BY id_empleado, periodo_evaluacion
    ) h2 ON h1.id_empleado = h2.id_empleado 
        AND h1.periodo_evaluacion = h2.periodo_evaluacion
        AND h1.fecha_evaluacion = h2.max_fecha
) hseq ON e.id_empleado = hseq.id_empleado 
    AND e.periodo_evaluacion = hseq.periodo_evaluacion
SET ep.promedio_general = ROUND(
    CASE 
        -- Calcular suma ponderada inicial
        WHEN (
            COALESCE(avg_auto.promedio_auto, 0) > 0 OR 
            COALESCE(avg_jefe.promedio_jefe, 0) > 0 OR 
            COALESCE(hseq.promedio_hseq, 0) > 0
        ) THEN
            -- Suma ponderada
            (
                COALESCE(avg_auto.promedio_auto, 0) * 0.20 +
                COALESCE(avg_jefe.promedio_jefe, 0) * 0.40 +
                COALESCE(hseq.promedio_hseq, 0) * 0.40
            ) / 
            -- Ajustar peso si falta algún componente (reponderar)
            GREATEST(
                (
                    (CASE WHEN COALESCE(avg_auto.promedio_auto, 0) > 0 THEN 0.20 ELSE 0 END) +
                    (CASE WHEN COALESCE(avg_jefe.promedio_jefe, 0) > 0 THEN 0.40 ELSE 0 END) +
                    (CASE WHEN COALESCE(hseq.promedio_hseq, 0) > 0 THEN 0.40 ELSE 0 END)
                ),
                0.0001  -- Evitar división por cero
            )
        ELSE 0
    END,
    2  -- Redondear a 2 decimales
);

-- ============================================================
-- VERIFICACIÓN POST-ACTUALIZACIÓN
-- ============================================================
-- Ver algunos ejemplos de los valores actualizados
SELECT 
    ep.id_evaluacion,
    e.id_empleado,
    e.periodo_evaluacion,
    ROUND(COALESCE(avg_auto.promedio_auto, 0), 2) as promedio_autoevaluacion,
    ROUND(COALESCE(avg_jefe.promedio_jefe, 0), 2) as promedio_jefe,
    ROUND(COALESCE(hseq.promedio_hseq, 0), 2) as promedio_hseq,
    ep.promedio_general as promedio_general_calculado,
    ROUND(
        (
            COALESCE(avg_auto.promedio_auto, 0) * 0.20 +
            COALESCE(avg_jefe.promedio_jefe, 0) * 0.40 +
            COALESCE(hseq.promedio_hseq, 0) * 0.40
        ) / 
        GREATEST(
            (
                (CASE WHEN COALESCE(avg_auto.promedio_auto, 0) > 0 THEN 0.20 ELSE 0 END) +
                (CASE WHEN COALESCE(avg_jefe.promedio_jefe, 0) > 0 THEN 0.40 ELSE 0 END) +
                (CASE WHEN COALESCE(hseq.promedio_hseq, 0) > 0 THEN 0.40 ELSE 0 END)
            ),
            0.0001
        ),
        2
    ) as verificacion_manual
FROM evaluacion_promedios ep
INNER JOIN evaluacion e ON ep.id_evaluacion = e.id_evaluacion
LEFT JOIN (
    SELECT 
        id_evaluacion,
        AVG(CASE WHEN calificacion_empleado > 0 THEN calificacion_empleado ELSE NULL END) as promedio_auto
    FROM evaluacion_competencias
    GROUP BY id_evaluacion
) avg_auto ON ep.id_evaluacion = avg_auto.id_evaluacion
LEFT JOIN (
    SELECT 
        id_evaluacion,
        AVG(CASE WHEN calificacion_jefe > 0 THEN calificacion_jefe ELSE NULL END) as promedio_jefe
    FROM evaluacion_competencias
    GROUP BY id_evaluacion
) avg_jefe ON ep.id_evaluacion = avg_jefe.id_evaluacion
LEFT JOIN (
    SELECT 
        h1.id_empleado,
        h1.periodo_evaluacion,
        h1.promedio_hseq
    FROM hseq_evaluacion h1
    INNER JOIN (
        SELECT 
            id_empleado,
            periodo_evaluacion,
            MAX(fecha_evaluacion) as max_fecha
        FROM hseq_evaluacion
        GROUP BY id_empleado, periodo_evaluacion
    ) h2 ON h1.id_empleado = h2.id_empleado 
        AND h1.periodo_evaluacion = h2.periodo_evaluacion
        AND h1.fecha_evaluacion = h2.max_fecha
) hseq ON e.id_empleado = hseq.id_empleado 
    AND e.periodo_evaluacion = hseq.periodo_evaluacion
ORDER BY ep.id_evaluacion DESC
LIMIT 20;
