<?php
// Script de prueba para verificar que el campo categoria_evaluacion funciona correctamente
require_once __DIR__ . '/config/db.php';

try {
    $db = (new Database())->getConnection();
    
    echo "<h2>Prueba de Categoría de Evaluación</h2>\n";
    
    // Verificar que la columna existe
    $sql = "SHOW COLUMNS FROM evaluacion LIKE 'categoria_evaluacion'";
    $result = $db->query($sql);
    
    if ($result->num_rows > 0) {
        echo "<p style='color: green;'><strong>✓ Columna categoria_evaluacion existe en la tabla evaluacion</strong></p>\n";
        
        $column = $result->fetch_assoc();
        echo "<p>Detalles de la columna:</p>\n";
        echo "<ul>\n";
        echo "<li><strong>Tipo:</strong> " . $column['Type'] . "</li>\n";
        echo "<li><strong>Valor por defecto:</strong> " . ($column['Default'] ?? 'NULL') . "</li>\n";
        echo "<li><strong>Permite NULL:</strong> " . $column['Null'] . "</li>\n";
        echo "</ul>\n";
    } else {
        echo "<p style='color: red;'><strong>✗ Columna categoria_evaluacion NO existe en la tabla evaluacion</strong></p>\n";
        echo "<p>Ejecuta el script add_categoria_evaluacion.sql para añadir la columna.</p>\n";
        exit;
    }
    
    // Probar inserción con categoría de evaluación
    echo "<h3>Prueba de Inserción</h3>\n";
    
    $testEmployeeId = 1; // Usar empleado ID 1 para la prueba
    $categoriaPrueba = 'Trimestral';
    
    $sql = "INSERT INTO evaluacion (id_empleado, fecha_evaluacion, categoria_evaluacion, estado_evaluacion) VALUES (?, NOW(), ?, 'AUTOEVALUACION_PENDIENTE')";
    $stmt = $db->prepare($sql);
    $stmt->bind_param('is', $testEmployeeId, $categoriaPrueba);
    
    if ($stmt->execute()) {
        $evaluationId = $stmt->insert_id;
        echo "<p style='color: green;'><strong>✓ Inserción exitosa con categoría '$categoriaPrueba' (ID: $evaluationId)</strong></p>\n";
        
        // Verificar que se insertó correctamente
        $sql = "SELECT id_evaluacion, categoria_evaluacion FROM evaluacion WHERE id_evaluacion = ?";
        $stmt = $db->prepare($sql);
        $stmt->bind_param('i', $evaluationId);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_assoc();
        
        if ($result && $result['categoria_evaluacion'] === $categoriaPrueba) {
            echo "<p style='color: green;'><strong>✓ Verificación exitosa: categoría guardada correctamente</strong></p>\n";
        } else {
            echo "<p style='color: red;'><strong>✗ Error en verificación: categoría no coincide</strong></p>\n";
        }
        
        // Limpiar: eliminar la evaluación de prueba
        $sql = "DELETE FROM evaluacion WHERE id_evaluacion = ?";
        $stmt = $db->prepare($sql);
        $stmt->bind_param('i', $evaluationId);
        $stmt->execute();
        echo "<p>Evaluación de prueba eliminada.</p>\n";
        
    } else {
        echo "<p style='color: red;'><strong>✗ Error en inserción: " . $stmt->error . "</strong></p>\n";
    }
    
    // Probar consulta SELECT
    echo "<h3>Prueba de Consulta SELECT</h3>\n";
    
    $sql = "SELECT id_evaluacion, categoria_evaluacion FROM evaluacion WHERE categoria_evaluacion IS NOT NULL LIMIT 5";
    $result = $db->query($sql);
    
    if ($result && $result->num_rows > 0) {
        echo "<p style='color: green;'><strong>✓ Consulta SELECT exitosa</strong></p>\n";
        echo "<table border='1' style='border-collapse: collapse;'>\n";
        echo "<tr><th>ID Evaluación</th><th>Categoría</th></tr>\n";
        
        while ($row = $result->fetch_assoc()) {
            echo "<tr>";
            echo "<td>" . $row['id_evaluacion'] . "</td>";
            echo "<td>" . ($row['categoria_evaluacion'] ?? 'NULL') . "</td>";
            echo "</tr>\n";
        }
        echo "</table>\n";
    } else {
        echo "<p style='color: orange;'><strong>⚠ No hay evaluaciones con categoría definida</strong></p>\n";
    }
    
    // Probar UPDATE
    echo "<h3>Prueba de UPDATE</h3>\n";
    
    // Buscar una evaluación existente para actualizar
    $sql = "SELECT id_evaluacion FROM evaluacion LIMIT 1";
    $result = $db->query($sql);
    
    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $evaluationId = $row['id_evaluacion'];
        
        $sql = "UPDATE evaluacion SET categoria_evaluacion = 'Período de prueba' WHERE id_evaluacion = ?";
        $stmt = $db->prepare($sql);
        $stmt->bind_param('i', $evaluationId);
        
        if ($stmt->execute()) {
            echo "<p style='color: green;'><strong>✓ UPDATE exitoso en evaluación ID: $evaluationId</strong></p>\n";
            
            // Verificar el cambio
            $sql = "SELECT categoria_evaluacion FROM evaluacion WHERE id_evaluacion = ?";
            $stmt = $db->prepare($sql);
            $stmt->bind_param('i', $evaluationId);
            $stmt->execute();
            $result = $stmt->get_result()->fetch_assoc();
            
            if ($result && $result['categoria_evaluacion'] === 'Período de prueba') {
                echo "<p style='color: green;'><strong>✓ Verificación de UPDATE exitosa</strong></p>\n";
            } else {
                echo "<p style='color: red;'><strong>✗ Error en verificación de UPDATE</strong></p>\n";
            }
        } else {
            echo "<p style='color: red;'><strong>✗ Error en UPDATE: " . $stmt->error . "</strong></p>\n";
        }
    } else {
        echo "<p style='color: orange;'><strong>⚠ No hay evaluaciones para probar UPDATE</strong></p>\n";
    }
    
    echo "<h3>Resumen</h3>\n";
    echo "<p>Las pruebas básicas de la columna <strong>categoria_evaluacion</strong> han sido completadas.</p>\n";
    echo "<p>Si todas las pruebas muestran ✓, el campo está funcionando correctamente.</p>\n";
    
} catch (Exception $e) {
    echo "<p style='color: red;'>Error: " . $e->getMessage() . "</p>\n";
}
?>

