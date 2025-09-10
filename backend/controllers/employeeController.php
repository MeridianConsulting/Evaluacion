<?php
require_once __DIR__ . '/../config/db.php';

class EmployeeController {
    private $db;
    
    public function __construct() {
        $this->db = (new Database())->getConnection();
    }
    
    // Obtener todos los empleados
    public function getAllEmployees() {
        $sql = 'SELECT id_empleado, cedula, nombre, cargo, area, 
                email, rol, proyecto 
                FROM empleados ORDER BY id_empleado DESC';
        
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
            $empleados = $result->fetch_all(MYSQLI_ASSOC);
            echo json_encode(["success" => true, "data" => $empleados]);
        } else {
            echo json_encode(["success" => true, "data" => []]);
        }
        
        $stmt->close();
    }
    
    // Obtener un empleado por ID
    public function getEmployeeById($id) {
        $sql = 'SELECT id_empleado, cedula, nombre, tipo_documento, cargo, area, 
                fecha_inicio_contrato, 
                email, 
                proyecto, ods, rol FROM empleados WHERE id_empleado = ?';
                
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
        
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows === 0) {
            http_response_code(404);
            echo json_encode(["success" => false, "message" => "Empleado no encontrado"]);
        } else {
            $empleado = $result->fetch_assoc();
            echo json_encode(["success" => true, "data" => $empleado]);
        }
        
        $stmt->close();
    }
    
    // Crear un nuevo empleado
    public function createEmployee($data) {
        $sql = 'INSERT INTO empleados (cedula, nombre, tipo_documento, cargo, area, 
                fecha_inicio_contrato, 
                email, contrasena, 
                proyecto, ods, rol) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                
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
        
        // Establecer contraseña por defecto si no se proporciona
        if (empty($data['contrasena'])) {
            $data['contrasena'] = '123456';
        }
        
        // Valores por defecto
        $tipoDocumento = isset($data['tipo_documento']) ? $data['tipo_documento'] : 'Cédula de Ciudadanía';
        $area = isset($data['area']) ? $data['area'] : 'Administracion';
        $fechaInicio = isset($data['fecha_inicio_contrato']) ? $data['fecha_inicio_contrato'] : date('Y-m-d');
        $proyecto = isset($data['proyecto']) ? $data['proyecto'] : '';
        $ods = isset($data['ods']) ? $data['ods'] : '';
        $rol = isset($data['rol']) ? $data['rol'] : 'empleado';
        
        $stmt->bind_param(
            "issssisssss",
            $data['cedula'],
            $data['nombre'],
            $tipoDocumento,
            $data['cargo'],
            $area,
            $fechaInicio,
            $data['email'],
            $data['contrasena'],
            $proyecto,
            $ods,
            $rol
        );
        
        if ($stmt->execute()) {
            $insertId = $stmt->insert_id;
            http_response_code(201);
            echo json_encode([
                "success" => true, 
                "message" => "Empleado creado exitosamente", 
                "id" => $insertId
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "success" => false, 
                "message" => "Error al crear el empleado", 
                "error" => $stmt->error
            ]);
        }
        
        $stmt->close();
    }
    
    // Actualizar un empleado existente
    public function updateEmployee($id, $data) {
        // Primero verificamos si el empleado existe
        $checkSql = 'SELECT id_empleado FROM empleados WHERE id_empleado = ?';
        $checkStmt = $this->db->prepare($checkSql);
        $checkStmt->bind_param("i", $id);
        $checkStmt->execute();
        $checkResult = $checkStmt->get_result();
        
        if ($checkResult->num_rows === 0) {
            http_response_code(404);
            echo json_encode(["success" => false, "message" => "Empleado no encontrado"]);
            $checkStmt->close();
            return;
        }
        $checkStmt->close();
        
        // Construir la consulta SQL dinámicamente
        $sql = 'UPDATE empleados SET ';
        $params = [];
        $types = '';
        
        // Campos que pueden actualizarse
        $fields = [
            'cedula' => 'i',
            'nombre' => 's',
            'tipo_documento' => 's',
            'cargo' => 's',
            'area' => 's',
            'fecha_inicio_contrato' => 's',
            'email' => 's',
            'contrasena' => 's',
            'proyecto' => 's',
            'ods' => 's',
            'rol' => 's'
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
        
        if (empty($updates)) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "No se proporcionaron datos para actualizar"]);
            return;
        }
        
        $sql .= implode(', ', $updates);
        $sql .= ' WHERE id_empleado = ?';
        $params[] = $id;
        $types .= 'i';
        
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
        
        // Bind parameters dynamically
        $bindParams = array_merge([$types], $params);
        $bindParams = array_values($bindParams);
        $refBindParams = [];
        
        foreach ($bindParams as $key => &$value) {
            $refBindParams[$key] = &$value;
        }
        
        call_user_func_array([$stmt, 'bind_param'], $refBindParams);
        
        if ($stmt->execute()) {
            echo json_encode([
                "success" => true, 
                "message" => "Empleado actualizado exitosamente",
                "id" => $id
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "success" => false, 
                "message" => "Error al actualizar el empleado", 
                "error" => $stmt->error
            ]);
        }
        
        $stmt->close();
    }
    
    // Eliminar un empleado
    public function deleteEmployee($id) {
        $sql = 'DELETE FROM empleados WHERE id_empleado = ?';
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
        
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                echo json_encode([
                    "success" => true, 
                    "message" => "Empleado eliminado exitosamente"
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    "success" => false, 
                    "message" => "Empleado no encontrado"
                ]);
            }
        } else {
            http_response_code(500);
            echo json_encode([
                "success" => false, 
                "message" => "Error al eliminar el empleado", 
                "error" => $stmt->error
            ]);
        }
        
        $stmt->close();
    }
    
    // Método para autenticación de empleados (ya existente)
    public function loginEmpleado($data) {
        if (!isset($data['cedula']) || !isset($data['contrasena'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Faltan datos"]);
            return;
        }
        
        $cedula = $data['cedula'];
        $contrasena = $data['contrasena'];
        
        $sql = "SELECT * FROM empleados WHERE cedula = ? AND contrasena = ?";
        $stmt = $this->db->prepare($sql);
        if (!$stmt) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Error en la preparación de la consulta", "detalle" => $this->db->error]);
            return;
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
    }
    
    // Obtener todos los cargos disponibles para el dropdown
    public function getAllCargos() {
        $sql = 'SELECT id_cargo, nombre_cargo FROM cargo 
                WHERE nombre_cargo IS NOT NULL 
                AND nombre_cargo != ""
                AND nombre_cargo NOT REGEXP "^[0-9]+E?$"
                AND nombre_cargo NOT LIKE "Funciones_%"
                AND LENGTH(nombre_cargo) > 3
                AND nombre_cargo NOT REGEXP "^[A-Z_]+$"
                ORDER BY nombre_cargo ASC';
        
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
            $cargos = $result->fetch_all(MYSQLI_ASSOC);
            echo json_encode(["success" => true, "data" => $cargos]);
        } else {
            echo json_encode(["success" => true, "data" => []]);
        }
        
        $stmt->close();
    }
}
?> 