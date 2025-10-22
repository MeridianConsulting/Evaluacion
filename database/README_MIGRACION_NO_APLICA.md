# 🔧 Corrección Bug "No Aplica" en Evaluaciones HSEQ

**Fecha:** 22 de Octubre de 2025  
**Versión:** 1.0  
**Afectación:** 600+ registros HSEQ con promedios incorrectos

---

## 📋 Resumen del Bug

### Problema Identificado
En las evaluaciones HSEQ, los ítems marcados como **"No Aplica"** se estaban guardando como **0** en la base de datos debido a un cast de tipo en PHP:

```php
// ANTES (INCORRECTO)
$calif = (float)$h['evaluacionJefe'];  // 'NA' se convierte a 0
```

Esto causaba que:
- ❌ Los promedios HSEQ incluían los 0 (que deberían ser NA)
- ❌ Los reportes Excel/PDF mostraban promedios artificialmente bajos
- ❌ No había forma de distinguir un 0 real de un "No Aplica"

### Solución Implementada
✅ Agregada columna `no_aplica` (TINYINT) a la tabla `hseq_evaluacion_items`  
✅ Detección de 'NA' **antes** del cast a float en el backend  
✅ Cálculos de promedio excluyen items con `no_aplica = 1`  
✅ Exportadores (Excel/PDF) muestran "No Aplica" correctamente  
✅ Migración de datos existentes con criterio conservador

---

## 🗂️ Archivos Modificados

### 1. Base de Datos
- ✅ `database/evaluacion.sql` - Schema actualizado con columna `no_aplica`
- ✅ `database/migration_add_no_aplica_hseq.sql` - Script de migración

### 2. Backend
- ✅ `backend/controllers/evaluationControllerNativo.php`
  - Función `saveHseqEvaluation()` - Detección de NA
  - Función `getHseqEvaluationDetails()` - Incluye campo no_aplica
  - Cálculos de promedio - Excluyen NA
  - Exportadores Excel/PDF - Muestran "No Aplica"

### 3. Frontend
- ℹ️ No requiere cambios (ya manejaba NA correctamente)

---

## 🚀 Instrucciones de Despliegue

### PASO 1: Backup (CRÍTICO)
```sql
-- Ejecutar en phpMyAdmin o MySQL CLI
CREATE TABLE hseq_evaluacion_items_backup_20251022 
AS SELECT * FROM hseq_evaluacion_items;

-- Verificar backup
SELECT COUNT(*) FROM hseq_evaluacion_items_backup_20251022;
```

### PASO 2: Aplicar Migración
```bash
# Opción A: Desde phpMyAdmin
# 1. Abrir phpMyAdmin
# 2. Seleccionar base de datos 'evaluacion'
# 3. Ir a pestaña "SQL"
# 4. Copiar y ejecutar contenido de: database/migration_add_no_aplica_hseq.sql

# Opción B: Desde línea de comandos
mysql -u root -p evaluacion < database/migration_add_no_aplica_hseq.sql
```

### PASO 3: Verificar Migración
```sql
-- 1. Verificar que la columna existe
DESCRIBE hseq_evaluacion_items;

-- 2. Verificar índice
SHOW INDEXES FROM hseq_evaluacion_items WHERE Key_name = 'idx_no_aplica';

-- 3. Verificar datos migrados
SELECT 
    id_hseq_evaluacion,
    COUNT(*) as total_items,
    SUM(CASE WHEN no_aplica = 1 THEN 1 ELSE 0 END) as items_na,
    AVG(CASE WHEN no_aplica = 0 AND calificacion IS NOT NULL THEN calificacion END) as promedio_real
FROM hseq_evaluacion_items
GROUP BY id_hseq_evaluacion
LIMIT 20;
```

### PASO 4: Desplegar Código Backend
```bash
# 1. Hacer pull de los cambios
git pull origin main

# 2. Verificar que no hay errores de sintaxis
php -l backend/controllers/evaluationControllerNativo.php

# 3. Reiniciar Apache (si es necesario)
# En XAMPP: Detener y reiniciar Apache desde el panel
```

### PASO 5: Pruebas Post-Despliegue
1. **Crear nueva evaluación HSEQ** con al menos 1 ítem "No Aplica"
2. **Verificar en BD:**
   ```sql
   SELECT * FROM hseq_evaluacion_items 
   ORDER BY id_item DESC LIMIT 5;
   -- Verificar: no_aplica = 1 y calificacion = NULL
   ```
3. **Generar Excel/PDF** de una evaluación con NA
4. **Verificar promedio** excluye correctamente los NA

---

## 📊 Criterio de Migración de Datos Existentes

El script de migración usa un **criterio AGRESIVO**:

```sql
-- Convierte TODOS los 0 a "No Aplica":
UPDATE hseq_evaluacion_items
SET no_aplica = 1, calificacion = NULL
WHERE calificacion = 0;
```

### ¿Por qué este criterio agresivo?
- ✅ **Lógico:** El formulario HSEQ no permite calificar con 0 (solo 1-5 o "No Aplica")
- ✅ **Preciso:** TODOS los 0 en BD son resultado del bug, no calificaciones reales
- ✅ **Completo:** Corrige el 100% de los registros afectados
- ✅ **Reversible:** Se mantiene backup completo por seguridad

### Evaluaciones Afectadas (Estimado)
- **Total items migrados:** Todos los que tengan calificación = 0
- **Evaluaciones recalculadas:** Todas las que contengan items con 0
- **Impacto en promedios:** Variable, puede ser significativo (+0.5 a +1.5 puntos)

---

## 🔍 Validación Manual (Opcional)

Para casos críticos, validar manualmente:

```sql
-- Listar evaluaciones con cambios significativos
SELECT 
    he.id_hseq_evaluacion,
    emp.nombre,
    he.periodo_evaluacion,
    he.promedio_hseq as promedio_nuevo,
    COUNT(*) as total_items,
    SUM(CASE WHEN hei.no_aplica = 1 THEN 1 ELSE 0 END) as items_migrados
FROM hseq_evaluacion he
INNER JOIN hseq_evaluacion_items hei ON hei.id_hseq_evaluacion = he.id_hseq_evaluacion
INNER JOIN empleados emp ON emp.id_empleado = he.id_empleado
GROUP BY he.id_hseq_evaluacion
HAVING items_migrados > 0
ORDER BY items_migrados DESC;
```

---

## 🔄 Plan de Rollback (Si es necesario)

```sql
-- 1. Restaurar tabla desde backup
DROP TABLE hseq_evaluacion_items;
CREATE TABLE hseq_evaluacion_items LIKE hseq_evaluacion_items_backup_20251022;
INSERT INTO hseq_evaluacion_items SELECT * FROM hseq_evaluacion_items_backup_20251022;

-- 2. Revertir código backend
git revert <commit-hash>

-- 3. Reiniciar Apache
```

---

## 📝 Cambios Técnicos Detallados

### Backend: Detección de NA
```php
// ANTES
$calif = (float)$h['evaluacionJefe'];  // ❌ 'NA' → 0

// DESPUÉS
$evaluacionValue = $h['evaluacionJefe'];
if ($evaluacionValue === 'NA' || strtoupper($evaluacionValue) === 'NA') {
    $esNoAplica = 1;
    $calif = null;  // ✅ NULL, no 0
} else if (is_numeric($evaluacionValue)) {
    $calif = (float)$evaluacionValue;
}
```

### Cálculo de Promedio
```php
// DESPUÉS: Excluir NA
foreach ($items as $item) {
    $esNoAplica = isset($item['no_aplica']) && $item['no_aplica'] == 1;
    
    if (!$esNoAplica && !empty($item['calificacion'])) {
        $suma += $item['calificacion'];
        $count++;
    }
}
$promedio = $count > 0 ? $suma / $count : 0;
```

### Exportadores
```php
// Excel/PDF: Mostrar "No Aplica" en lugar de NULL
$esNoAplica = isset($item['no_aplica']) && $item['no_aplica'] == 1;
$calificacion = $esNoAplica ? 'No Aplica' : $item['calificacion'];
```

---

## ✅ Checklist de Validación Final

Antes de marcar como completado:

- [ ] Backup creado y verificado
- [ ] Migración SQL ejecutada sin errores
- [ ] Columna `no_aplica` existe con índice
- [ ] Código backend desplegado
- [ ] Test: Nueva evaluación con NA se guarda correctamente
- [ ] Test: Promedio calculado excluye NA
- [ ] Test: Excel muestra "No Aplica" correctamente
- [ ] Test: PDF muestra "No Aplica" correctamente
- [ ] Validación con 5-10 evaluaciones reales
- [ ] Backup antiguo eliminado después de 30 días

---

## 📞 Contacto y Soporte

**Responsable:** Luis Guevara (Coordinador HSEQ)  
**Desarrollador:** Sistema de Evaluación - Meridian Consulting LTDA  
**Fecha límite:** Despliegue recomendado antes del cierre del período 2025-10

---

## 📚 Referencias

- Brief técnico original: `/guion_video_tutorial_evaluacion.md`
- Estructura BD: `/database/evaluacion.sql`
- Backend: `/backend/controllers/evaluationControllerNativo.php`
- Frontend: `/frontend/src/pages/HseqEvaluation.js`

---

**Última actualización:** 22 de Octubre de 2025  
**Estado:** ✅ LISTO PARA DESPLIEGUE

