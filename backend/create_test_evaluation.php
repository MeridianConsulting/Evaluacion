<?php
// Script para crear una evaluación de prueba
require_once __DIR__ . '/config/db.php';

try {
    $db = (new Database())->getConnection();
    
    echo "<h2>Crear Evaluación de Prueba</h2>\n";
    
    // Verificar si ya hay evaluaciones
    $sql = "SELECT COUNT(*) as total FROM evaluacion";
    $result = $db->query($sql);
    $count = $result->fetch_assoc()['total'];
    
    if ($count > 0) {
        echo "<p>Ya existen $count evaluaciones en la base de datos.</p>\n";
    } else {
        // Crear una evaluación de prueba
        // Usar empleado ID 1 (NORA GISELL MORENO MORENO) como empleado
        // Usar empleado ID 2 (WILLIAM AUGUSTO FRANCO CASTELLANOS) como jefe
        
        $sql = "INSERT INTO evaluacion (id_empleado, fecha_evaluacion, periodo_evaluacion, estado_evaluacion, id_jefe) 
                VALUES (1, NOW(), '2025-01', 'AUTOEVALUACION_PENDIENTE', 2)";
        
        if ($db->query($sql)) {
            $evaluationId = $db->insert_id;
            echo "<p style='color: green;'><strong>Evaluación de prueba creada exitosamente con ID: $evaluationId</strong></p>\n";
            echo "<p>Empleado: NORA GISELL MORENO MORENO (ID: 1)</p>\n";
            echo "<p>Jefe: WILLIAM AUGUSTO FRANCO CASTELLANOS (ID: 2)</p>\n";
            echo "<p>Estado: AUTOEVALUACION_PENDIENTE</p>\n";
        } else {
            echo "<p style='color: red;'>Error al crear la evaluación: " . $db->error . "</p>\n";
        }
    }
    
    // Mostrar las evaluaciones actuales
    echo "<h3>Evaluaciones actuales:</h3>\n";
    $sql = "SELECT e.id_evaluacion, e.id_empleado, e.id_jefe, e.estado_evaluacion, 
                   emp.nombre as empleado_nombre, jefe.nombre as jefe_nombre
            FROM evaluacion e
            LEFT JOIN empleados emp ON emp.id_empleado = e.id_empleado
            LEFT JOIN empleados jefe ON jefe.id_empleado = e.id_jefe
            ORDER BY e.id_evaluacion DESC";
    
    $result = $db->query($sql);
    
    echo "<table border='1' style='border-collapse: collapse;'>\n";
    echo "<tr><th>ID Evaluación</th><th>ID Empleado</th><th>Empleado</th><th>ID Jefe</th><th>Jefe</th><th>Estado</th></tr>\n";
    
    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $row['id_evaluacion'] . "</td>";
        echo "<td>" . $row['id_empleado'] . "</td>";
        echo "<td>" . $row['empleado_nombre'] . "</td>";
        echo "<td>" . ($row['id_jefe'] ?? 'NULL') . "</td>";
        echo "<td>" . ($row['jefe_nombre'] ?? 'Sin jefe') . "</td>";
        echo "<td>" . $row['estado_evaluacion'] . "</td>";
        echo "</tr>\n";
    }
    echo "</table>\n";
    
} catch (Exception $e) {
    echo "<p style='color: red;'>Error: " . $e->getMessage() . "</p>\n";
}
?>
