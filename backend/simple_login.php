<?php
// Login simplificado para debugging
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://evaluacion.meridianltda.com');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // Conexión directa a la base de datos
    $host = 'localhost';
    $dbname = 'evaluacion';
    $username = 'evaluacion';
    $password = 'C%]Mwn+[@0hk';
    
    $conn = new mysqli($host, $username, $password, $dbname);
    
    if ($conn->connect_error) {
        throw new Exception("Conexión fallida: " . $conn->connect_error);
    }
    
    $conn->set_charset('utf8mb4');
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input || !isset($input['cedula']) || !isset($input['contrasena'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Faltan datos"]);
            exit();
        }
        
        $cedula = $input['cedula'];
        $contrasena = $input['contrasena'];
        
        $sql = "SELECT * FROM empleados WHERE cedula = ? AND contrasena = ?";
        $stmt = $conn->prepare($sql);
        
        if (!$stmt) {
            throw new Exception("Error en preparación: " . $conn->error);
        }
        
        $stmt->bind_param("ss", $cedula, $contrasena);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $empleado = $result->fetch_assoc();
            echo json_encode(["success" => true, "message" => "Login exitoso", "empleado" => $empleado]);
        } else {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Credenciales incorrectas"]);
        }
        
        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "Método no permitido"]);
    }
    
    $conn->close();
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
?>
