<?php
// Script de debug para verificar evaluaciones en la base de datos
require_once __DIR__ . '/config/db.php';

try {
    $db = (new Database())->getConnection();
    
    echo "<h2>Debug de Evaluaciones</h2>\n";
    
    // Verificar si hay evaluaciones en la tabla
    $sql = "SELECT COUNT(*) as total FROM evaluacion";
    $result = $db->query($sql);
    $count = $result->fetch_assoc()['total'];
    echo "<p>Total de evaluaciones en la base de datos: <strong>$count</strong></p>\n";
    
    if ($count > 0) {
        // Mostrar todas las evaluaciones
        $sql = "SELECT e.id_evaluacion, e.id_empleado, e.id_jefe, e.estado_evaluacion, 
                       emp.nombre as empleado_nombre, jefe.nombre as jefe_nombre
                FROM evaluacion e
                LEFT JOIN empleados emp ON emp.id_empleado = e.id_empleado
                LEFT JOIN empleados jefe ON jefe.id_empleado = e.id_jefe
                ORDER BY e.id_evaluacion DESC";
        
        $result = $db->query($sql);
        
        echo "<h3>Evaluaciones existentes:</h3>\n";
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
        
        // Verificar empleados que son jefes
        echo "<h3>Empleados que son jefes (tienen evaluaciones asignadas):</h3>\n";
        $sql = "SELECT DISTINCT e.id_jefe, jefe.nombre, jefe.cargo, COUNT(*) as evaluaciones_asignadas
                FROM evaluacion e
                LEFT JOIN empleados jefe ON jefe.id_empleado = e.id_jefe
                WHERE e.id_jefe IS NOT NULL
                GROUP BY e.id_jefe, jefe.nombre, jefe.cargo
                ORDER BY evaluaciones_asignadas DESC";
        
        $result = $db->query($sql);
        
        echo "<table border='1' style='border-collapse: collapse;'>\n";
        echo "<tr><th>ID Jefe</th><th>Nombre</th><th>Cargo</th><th>Evaluaciones Asignadas</th></tr>\n";
        
        while ($row = $result->fetch_assoc()) {
            echo "<tr>";
            echo "<td>" . $row['id_jefe'] . "</td>";
            echo "<td>" . $row['nombre'] . "</td>";
            echo "<td>" . $row['cargo'] . "</td>";
            echo "<td>" . $row['evaluaciones_asignadas'] . "</td>";
            echo "</tr>\n";
        }
        echo "</table>\n";
        
    } else {
        echo "<p style='color: red;'><strong>No hay evaluaciones en la base de datos.</strong></p>\n";
        echo "<p>Para crear una evaluación de prueba, ejecuta el siguiente SQL:</p>\n";
        echo "<pre>\n";
        echo "INSERT INTO evaluacion (id_empleado, fecha_evaluacion, periodo_evaluacion, estado_evaluacion, id_jefe) \n";
        echo "VALUES (1, NOW(), '2025-01', 'AUTOEVALUACION_PENDIENTE', 2);\n";
        echo "</pre>\n";
    }
    
} catch (Exception $e) {
    echo "<p style='color: red;'>Error: " . $e->getMessage() . "</p>\n";
}
?>
