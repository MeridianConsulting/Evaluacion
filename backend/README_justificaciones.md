# Implementación de Justificaciones en Competencias

## Cambios Realizados

### 1. Base de Datos
- **Archivo**: `backend/add_justificaciones_competencias.sql`
- **Cambio**: Agregados campos `justificacion_empleado` y `justificacion_jefe` a la tabla `evaluacion_competencias`

### 2. Backend
- **Archivo**: `backend/controllers/evaluationControllerNativo.php`
- **Función**: `saveCompetencias()`
- **Cambios**:
  - Agregados campos de justificación al INSERT
  - Modificado el bind_param para incluir las justificaciones
  - Los datos se obtienen de `$competencia['justificacionTrabajador']` y `$competencia['justificacionJefe']`

### 3. Frontend
- **Archivo**: `frontend/src/pages/PerformanceEvaluation.js`
- **Estado**: Ya estaba correctamente implementado
- **Funcionalidad**:
  - Los campos `justificacionTrabajador` y `justificacionJefe` se envían en `competenciasData`
  - Se mapean correctamente desde la base de datos (`justificacion_empleado` y `justificacion_jefe`)
  - Las validaciones ya estaban implementadas para calificaciones 1, 2 y 5

## Instrucciones de Instalación

1. **Ejecutar el script SQL**:
   ```sql
   -- Ejecutar en la base de datos
   source backend/add_justificaciones_competencias.sql
   ```

2. **Verificar la estructura de la tabla**:
   ```sql
   DESCRIBE evaluacion_competencias;
   ```

## Funcionalidad

- Las justificaciones son **obligatorias** para calificaciones 1, 2 y 5
- Se guardan tanto las justificaciones del empleado como del jefe
- Se mantienen en la base de datos para consultas posteriores
- Se cargan correctamente al editar evaluaciones existentes

## Campos Agregados

- `justificacion_empleado` (TEXT): Justificación del empleado para su autoevaluación
- `justificacion_jefe` (TEXT): Justificación del jefe para su evaluación del empleado
