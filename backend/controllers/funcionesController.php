<?php
require_once __DIR__ . '/../config/db.php';

class FuncionesController {
    private $db;
    
    public function __construct() {
        $this->db = (new Database())->getConnection();
    }
    
    // Obtener todas las funciones
    public function getAllFunciones() {
        $sql = 'SELECT id_cargo, titulo_funcion, descripcion_funcion, tipo_funcion, 
                hoja_funciones, fecha_creacion, fecha_actualizacion, estado 
                FROM funciones ORDER BY id_cargo DESC';
        
        $stmt = $this->db->prepare($sql);
        if (!$stmt) {
            http_response_code(500);
            echo json_encode([
                "success" => false, 
                "message" => "Error al preparar la consulta", 
                "error" => $this->db->error
            ]);
            return;
        }
        
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $funciones = $result->fetch_all(MYSQLI_ASSOC);
            echo json_encode(["success" => true, "data" => $funciones]);
        } else {
            echo json_encode(["success" => true, "data" => []]);
        }
        
        $stmt->close();
    }
    
    // Obtener funciones por ID de cargo
    public function getFuncionesByCargo($idCargo) {
        $sql = 'SELECT id_cargo, titulo_funcion, descripcion_funcion, tipo_funcion, 
                hoja_funciones, fecha_creacion, fecha_actualizacion, estado 
                FROM funciones WHERE id_cargo = ?';
                
        $stmt = $this->db->prepare($sql);
        if (!$stmt) {
            http_response_code(500);
            echo json_encode([
                "success" => false, 
                "message" => "Error al preparar la consulta", 
                "error" => $this->db->error
            ]);
            return;
        }
        
        $stmt->bind_param("i", $idCargo);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows === 0) {
            echo json_encode(["success" => true, "data" => []]);
        } else {
            $funciones = $result->fetch_all(MYSQLI_ASSOC);
            echo json_encode(["success" => true, "data" => $funciones]);
        }
        
        $stmt->close();
    }
    
    // Obtener función por hoja de funciones
    public function getFuncionByHoja($hojaFunciones) {
        $sql = 'SELECT id_cargo, titulo_funcion, descripcion_funcion, tipo_funcion, 
                hoja_funciones, fecha_creacion, fecha_actualizacion, estado 
                FROM funciones WHERE hoja_funciones = ?';
                
        $stmt = $this->db->prepare($sql);
        if (!$stmt) {
            http_response_code(500);
            echo json_encode([
                "success" => false, 
                "message" => "Error al preparar la consulta", 
                "error" => $this->db->error
            ]);
            return;
        }
        
        $stmt->bind_param("s", $hojaFunciones);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows === 0) {
            http_response_code(404);
            echo json_encode(["success" => false, "message" => "Función no encontrada"]);
        } else {
            $funcion = $result->fetch_assoc();
            echo json_encode(["success" => true, "data" => $funcion]);
        }
        
        $stmt->close();
    }
    
    // Crear una nueva función
    public function createFuncion($data) {
        $sql = 'INSERT INTO funciones (id_cargo, titulo_funcion, descripcion_funcion, tipo_funcion, 
                hoja_funciones, fecha_creacion, fecha_actualizacion, estado) 
                VALUES (?, ?, ?, ?, ?, NOW(), NOW(), ?)';
                
        $stmt = $this->db->prepare($sql);
        if (!$stmt) {
            http_response_code(500);
            echo json_encode([
                "success" => false, 
                "message" => "Error al preparar la consulta", 
                "error" => $this->db->error
            ]);
            return;
        }
        
        // Valores por defecto
        $tipoFuncion = isset($data['tipo_funcion']) ? $data['tipo_funcion'] : 'Específica';
        $estado = isset($data['estado']) ? $data['estado'] : 'ACTIVO';
        
        // Generar la hoja de funciones (combinación del ID de cargo y un contador)
        $hojaFunciones = $this->generarHojaFunciones($data['id_cargo']);
        
        $stmt->bind_param(
            "isssss",
            $data['id_cargo'],
            $data['titulo_funcion'],
            $data['descripcion_funcion'],
            $tipoFuncion,
            $hojaFunciones,
            $estado
        );
        
        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode([
                "success" => true, 
                "message" => "Función creada exitosamente", 
                "hoja_funciones" => $hojaFunciones
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "success" => false, 
                "message" => "Error al crear la función", 
                "error" => $stmt->error
            ]);
        }
        
        $stmt->close();
    }
    
    // Actualizar una función existente
    public function updateFuncion($hojaFunciones, $data) {
        // Primero verificamos si la función existe
        $checkSql = 'SELECT hoja_funciones FROM funciones WHERE hoja_funciones = ?';
        $checkStmt = $this->db->prepare($checkSql);
        $checkStmt->bind_param("s", $hojaFunciones);
        $checkStmt->execute();
        $checkResult = $checkStmt->get_result();
        
        if ($checkResult->num_rows === 0) {
            http_response_code(404);
            echo json_encode(["success" => false, "message" => "Función no encontrada"]);
            $checkStmt->close();
            return;
        }
        $checkStmt->close();
        
        // Construir la consulta SQL dinámicamente
        $sql = 'UPDATE funciones SET ';
        $params = [];
        $types = '';
        
        // Campos que pueden actualizarse
        $fields = [
            'id_cargo' => 'i',
            'titulo_funcion' => 's',
            'descripcion_funcion' => 's',
            'tipo_funcion' => 's',
            'estado' => 's'
        ];
        
        // Agregar campos a actualizar
        $updates = [];
        foreach ($fields as $field => $type) {
            if (isset($data[$field])) {
                $updates[] = "$field = ?";
                $params[] = $data[$field];
                $types .= $type;
            }
        }
        
        // Añadir fecha de actualización
        $updates[] = "fecha_actualizacion = NOW()";
        
        if (empty($updates)) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "No se proporcionaron datos para actualizar"]);
            return;
        }
        
        $sql .= implode(', ', $updates);
        $sql .= ' WHERE hoja_funciones = ?';
        $params[] = $hojaFunciones;
        $types .= 's';
        
        $stmt = $this->db->prepare($sql);
        if (!$stmt) {
            http_response_code(500);
            echo json_encode([
                "success" => false, 
                "message" => "Error al preparar la consulta", 
                "error" => $this->db->error
            ]);
            return;
        }
        
        // Binding dinámico de parámetros
        if (!empty($params)) {
            $bindParams = array_merge([$types], $params);
            $bindParams = array_values($bindParams);
            $refBindParams = [];
            
            foreach ($bindParams as $key => &$value) {
                $refBindParams[$key] = &$value;
            }
            
            call_user_func_array([$stmt, 'bind_param'], $refBindParams);
        }
        
        if ($stmt->execute()) {
            echo json_encode([
                "success" => true, 
                "message" => "Función actualizada exitosamente",
                "hoja_funciones" => $hojaFunciones
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "success" => false, 
                "message" => "Error al actualizar la función", 
                "error" => $stmt->error
            ]);
        }
        
        $stmt->close();
    }
    
    // Eliminar una función
    public function deleteFuncion($hojaFunciones) {
        // Verificar si la función existe
        $checkSql = 'SELECT hoja_funciones FROM funciones WHERE hoja_funciones = ?';
        $checkStmt = $this->db->prepare($checkSql);
        $checkStmt->bind_param("s", $hojaFunciones);
        $checkStmt->execute();
        $checkResult = $checkStmt->get_result();
        
        if ($checkResult->num_rows === 0) {
            http_response_code(404);
            echo json_encode(["success" => false, "message" => "Función no encontrada"]);
            $checkStmt->close();
            return;
        }
        $checkStmt->close();
        
        // Eliminar la función
        $sql = 'DELETE FROM funciones WHERE hoja_funciones = ?';
        $stmt = $this->db->prepare($sql);
        
        if (!$stmt) {
            http_response_code(500);
            echo json_encode([
                "success" => false, 
                "message" => "Error al preparar la consulta", 
                "error" => $this->db->error
            ]);
            return;
        }
        
        $stmt->bind_param("s", $hojaFunciones);
        
        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                echo json_encode([
                    "success" => true, 
                    "message" => "Función eliminada exitosamente"
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    "success" => false, 
                    "message" => "No se encontró la función o ya ha sido eliminada"
                ]);
            }
        } else {
            http_response_code(500);
            echo json_encode([
                "success" => false, 
                "message" => "Error al eliminar la función", 
                "error" => $stmt->error
            ]);
        }
        
        $stmt->close();
    }
    
    // Generar hoja de funciones (ID único para cada función)
    private function generarHojaFunciones($idCargo) {
        // Contar cuantas funciones tiene este cargo actualmente
        $sql = 'SELECT COUNT(*) as total FROM funciones WHERE id_cargo = ?';
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param("i", $idCargo);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $count = $row['total'] + 1;
        $stmt->close();
        
        // Formato: idCargo_numFuncion
        return $idCargo . 'E_' . $count;
    }
}
?>
