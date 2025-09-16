<?php
// Archivo de prueba para verificar la configuración
header('Content-Type: application/json');

try {
    echo json_encode(["success" => true, "message" => "Servidor funcionando"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
?>
