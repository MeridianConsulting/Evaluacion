<?php
// Archivo de prueba para verificar el modo hosting
header('Content-Type: application/json');

// Forzar modo hosting
putenv('DB_MODE=hosting');

try {
    require_once __DIR__ . '/config/db.php';
    echo json_encode(["success" => true, "message" => "Modo hosting funcionando correctamente"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error en modo hosting: " . $e->getMessage()]);
}
?>
