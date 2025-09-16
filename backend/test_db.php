<?php
// Archivo de prueba para verificar la conexión a la base de datos
header('Content-Type: application/json');

try {
    require_once __DIR__ . '/config/db.php';
    echo json_encode(["success" => true, "message" => "Base de datos conectada correctamente"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error de base de datos: " . $e->getMessage()]);
}
?>
