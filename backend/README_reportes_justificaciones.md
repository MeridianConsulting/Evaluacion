# Actualización de Reportes con Justificaciones

## Cambios Realizados en los Controladores de Reportes

### Archivo Modificado
- `backend/controllers/evaluationControllerNativo.php`

### Funciones Actualizadas

#### 1. **downloadEvaluationExcel()** - Líneas 1790-1800
**Cambio**: Agregadas columnas de justificación en la hoja "Competencias" del Excel

**Antes**:
```php
$sheet2->fromArray(['Aspecto', 'Calificación Empleado', 'Calificación Jefe', 'Promedio'], NULL, 'A1');
```

**Después**:
```php
$sheet2->fromArray(['Aspecto', 'Calificación Empleado', 'Justificación Empleado', 'Calificación Jefe', 'Justificación Jefe', 'Promedio'], NULL, 'A1');
```

**Datos agregados**:
- Columna C: `$c['justificacion_empleado']`
- Columna E: `$c['justificacion_jefe']`

#### 2. **generateEvaluationHTML()** - Líneas 1934-1944
**Cambio**: Agregadas columnas de justificación en la tabla de competencias del PDF

**Antes**:
```html
<tr><th>Aspecto</th><th>Calificación Empleado</th><th>Calificación Jefe</th><th>Promedio</th></tr>
```

**Después**:
```html
<tr><th>Aspecto</th><th>Calificación Empleado</th><th>Justificación Empleado</th><th>Calificación Jefe</th><th>Justificación Jefe</th><th>Promedio</th></tr>
```

**Datos agregados**:
- `<td>' . htmlspecialchars($competencia['justificacion_empleado'] ?? '') . '</td>`
- `<td>' . htmlspecialchars($competencia['justificacion_jefe'] ?? '') . '</td>`

### Funciones que NO Requirieron Cambios

#### 1. **getCompetencias()** - Línea 1288
- Ya usa `SELECT *` por lo que automáticamente incluye los nuevos campos
- No requiere modificación

#### 2. **exportAllEvaluationsToExcel()**
- Solo exporta datos generales de evaluaciones, no competencias detalladas
- No requiere modificación

## Funcionalidad Preservada

✅ **Excel Individual**: Las justificaciones aparecen en columnas separadas
✅ **PDF Individual**: Las justificaciones aparecen en columnas separadas  
✅ **Compatibilidad**: Los reportes existentes siguen funcionando
✅ **Seguridad**: Se usa `htmlspecialchars()` para prevenir XSS
✅ **Fallback**: Se usa `?? ''` para manejar valores nulos

## Estructura de Reportes Actualizada

### Excel (Hoja Competencias)
| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Aspecto | Calificación Empleado | **Justificación Empleado** | Calificación Jefe | **Justificación Jefe** | Promedio |

### PDF (Tabla Competencias)
| Aspecto | Calificación Empleado | **Justificación Empleado** | Calificación Jefe | **Justificación Jefe** | Promedio |

## Notas Importantes

1. **Base de Datos**: Asegúrate de ejecutar el script `add_justificaciones_competencias.sql` antes de usar los reportes
2. **Compatibilidad**: Los reportes funcionan tanto con evaluaciones nuevas (con justificaciones) como antiguas (sin justificaciones)
3. **Formato**: Las justificaciones se muestran como texto plano en los reportes
4. **Validación**: No se agregó validación adicional ya que las justificaciones son opcionales excepto para calificaciones 1, 2 y 5
