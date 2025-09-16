<?php
// Archivo de prueba para verificar el login
header('Content-Type: application/json');

try {
    require_once __DIR__ . '/config/db.php';
    require_once __DIR__ . '/controllers/userController.php';
    
    // Datos de prueba
    $testData = [
        'cedula' => '123456',
        'contrasena' => 'test'
    ];
    
    $controller = new UserController();
    $controller->loginEmpleado($testData);
    
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error en login: " . $e->getMessage()]);
}
?>
