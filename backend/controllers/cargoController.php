<?php
require_once __DIR__ . '/../config/db.php';

class CargoController {
    private $db;
    
    public function __construct() {
        $this->db = (new Database())->getConnection();
    }
    
    // Obtener todos los cargos
    public function getAllCargos() {
        $sql = 'SELECT id_cargo, nombre_cargo, descripcion_cargo, objetivo_cargo, proceso_gestion 
                FROM cargo ORDER BY id_cargo DESC';
        
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
    
    // Obtener un cargo por ID
    public function getCargoById($id) {
        $sql = 'SELECT id_cargo, nombre_cargo, descripcion_cargo, objetivo_cargo, proceso_gestion 
                FROM cargo WHERE id_cargo = ?';
                
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
            echo json_encode(["success" => false, "message" => "Cargo no encontrado"]);
        } else {
            $cargo = $result->fetch_assoc();
            echo json_encode(["success" => true, "data" => $cargo]);
        }
        
        $stmt->close();
    }
    
    // Crear un nuevo cargo
    public function createCargo($data) {
        // Verificar si ya existe un cargo con ese nombre
        $checkSql = 'SELECT id_cargo FROM cargo WHERE nombre_cargo = ?';
        $checkStmt = $this->db->prepare($checkSql);
        $checkStmt->bind_param("s", $data['nombre_cargo']);
        $checkStmt->execute();
        $checkResult = $checkStmt->get_result();
        
        if ($checkResult->num_rows > 0) {
            http_response_code(409); // Conflict
            echo json_encode([
                "success" => false, 
                "message" => "Ya existe un cargo con ese nombre"
            ]);
            $checkStmt->close();
            return;
        }
        $checkStmt->close();
        
        $sql = 'INSERT INTO cargo (nombre_cargo, descripcion_cargo, objetivo_cargo, proceso_gestion) 
                VALUES (?, ?, ?, ?)';
                
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
        
        // Valores por defecto para campos opcionales
        $descripcion = isset($data['descripcion_cargo']) ? $data['descripcion_cargo'] : '';
        $objetivo = isset($data['objetivo_cargo']) ? $data['objetivo_cargo'] : '';
        $proceso = isset($data['proceso_gestion']) ? $data['proceso_gestion'] : '';
        
        $stmt->bind_param(
            "ssss",
            $data['nombre_cargo'],
            $descripcion,
            $objetivo,
            $proceso
        );
        
        if ($stmt->execute()) {
            $insertId = $stmt->insert_id;
            http_response_code(201);
            echo json_encode([
                "success" => true, 
                "message" => "Cargo creado exitosamente", 
                "id" => $insertId
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "success" => false, 
                "message" => "Error al crear el cargo", 
                "error" => $stmt->error
            ]);
        }
        
        $stmt->close();
    }
    
    // Actualizar un cargo existente
    public function updateCargo($id, $data) {
        // Primero verificamos si el cargo existe
        $checkSql = 'SELECT id_cargo FROM cargo WHERE id_cargo = ?';
        $checkStmt = $this->db->prepare($checkSql);
        $checkStmt->bind_param("i", $id);
        $checkStmt->execute();
        $checkResult = $checkStmt->get_result();
        
        if ($checkResult->num_rows === 0) {
            http_response_code(404);
            echo json_encode(["success" => false, "message" => "Cargo no encontrado"]);
            $checkStmt->close();
            return;
        }
        $checkStmt->close();
        
        // Verificar si ya existe otro cargo con el mismo nombre
        if (isset($data['nombre_cargo'])) {
            $checkNameSql = 'SELECT id_cargo FROM cargo WHERE nombre_cargo = ? AND id_cargo != ?';
            $checkNameStmt = $this->db->prepare($checkNameSql);
            $checkNameStmt->bind_param("si", $data['nombre_cargo'], $id);
            $checkNameStmt->execute();
            $checkNameResult = $checkNameStmt->get_result();
            
            if ($checkNameResult->num_rows > 0) {
                http_response_code(409); // Conflict
                echo json_encode([
                    "success" => false, 
                    "message" => "Ya existe otro cargo con ese nombre"
                ]);
                $checkNameStmt->close();
                return;
            }
            $checkNameStmt->close();
        }
        
        // Construir la consulta SQL dinámicamente
        $sql = 'UPDATE cargo SET ';
        $params = [];
        $types = '';
        
        // Campos que pueden actualizarse
        $fields = [
            'nombre_cargo' => 's',
            'descripcion_cargo' => 's',
            'objetivo_cargo' => 's',
            'proceso_gestion' => 's'
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
        $sql .= ' WHERE id_cargo = ?';
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
                "message" => "Cargo actualizado exitosamente",
                "id" => $id
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "success" => false, 
                "message" => "Error al actualizar el cargo", 
                "error" => $stmt->error
            ]);
        }
        
        $stmt->close();
    }
    
    // Eliminar un cargo
    public function deleteCargo($id) {
        // Verificar si el cargo existe
        $checkSql = 'SELECT id_cargo FROM cargo WHERE id_cargo = ?';
        $checkStmt = $this->db->prepare($checkSql);
        $checkStmt->bind_param("i", $id);
        $checkStmt->execute();
        $checkResult = $checkStmt->get_result();
        
        if ($checkResult->num_rows === 0) {
            http_response_code(404);
            echo json_encode(["success" => false, "message" => "Cargo no encontrado"]);
            $checkStmt->close();
            return;
        }
        $checkStmt->close();
        
        // Verificar si hay empleados asignados a este cargo
        $checkEmpSql = 'SELECT COUNT(*) as count FROM empleados WHERE cargo = (SELECT nombre_cargo FROM cargo WHERE id_cargo = ?)';
        $checkEmpStmt = $this->db->prepare($checkEmpSql);
        $checkEmpStmt->bind_param("i", $id);
        $checkEmpStmt->execute();
        $checkEmpResult = $checkEmpStmt->get_result();
        $empCount = $checkEmpResult->fetch_assoc()['count'];
        $checkEmpStmt->close();
        
        if ($empCount > 0) {
            http_response_code(409); // Conflict
            echo json_encode([
                "success" => false, 
                "message" => "No se puede eliminar el cargo porque hay empleados asignados a él"
            ]);
            return;
        }
        
        // Eliminar el cargo
        $sql = 'DELETE FROM cargo WHERE id_cargo = ?';
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
                    "message" => "Cargo eliminado exitosamente"
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    "success" => false, 
                    "message" => "No se encontró el cargo o ya ha sido eliminado"
                ]);
            }
        } else {
            http_response_code(500);
            echo json_encode([
                "success" => false, 
                "message" => "Error al eliminar el cargo", 
                "error" => $stmt->error
            ]);
        }
        
        $stmt->close();
    }
    
    // Obtener información de un cargo por su nombre
    public function obtenerInfoCargo($nombreCargo) {
        global $db;
        
        $sql = "SELECT * FROM cargo WHERE nombre_cargo = ?";
        $stmt = $db->prepare($sql);
        
        if (!$stmt) {
            http_response_code(500);
            echo json_encode([
                "success" => false, 
                "message" => "Error al preparar la consulta", 
                "detalle" => $db->error
            ]);
            return;
        }
        
        $stmt->bind_param("s", $nombreCargo);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows === 0) {
            // Intentamos buscar por coincidencia parcial
            $stmt->close();
            
            $nombreCargoLike = "%$nombreCargo%";
            $sql = "SELECT * FROM cargo WHERE nombre_cargo LIKE ?";
            $stmt = $db->prepare($sql);
            
            if (!$stmt) {
                http_response_code(500);
                echo json_encode([
                    "success" => false, 
                    "message" => "Error al preparar la consulta", 
                    "detalle" => $db->error
                ]);
                return;
            }
            
            $stmt->bind_param("s", $nombreCargoLike);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows === 0) {
                http_response_code(404);
                echo json_encode([
                    "success" => false, 
                    "message" => "Cargo no encontrado"
                ]);
                $stmt->close();
                return;
            }
        }
        
        $cargo = $result->fetch_assoc();
        $stmt->close();
        
        // Obtenemos las funciones específicas para este cargo
        $funciones = $this->obtenerFuncionesPorCargo($cargo['id_cargo']);
        
        // Añadimos las funciones a la respuesta
        $cargo['funciones'] = $funciones;
        
        echo json_encode($cargo);
    }
    
    // Función interna para obtener funciones específicas de un cargo
    private function obtenerFuncionesPorCargo($idCargo) {
        global $db;
        
        // Esta función debe adaptarse a tu estructura de base de datos
        // Aquí estoy generando funciones basadas en el objetivo del cargo
        
        $sql = "SELECT objetivo_cargo FROM cargo WHERE id_cargo = ?";
        $stmt = $db->prepare($sql);
        
        if (!$stmt) {
            return [];
        }
        
        $stmt->bind_param("i", $idCargo);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows === 0) {
            $stmt->close();
            return [];
        }
        
        $datos = $result->fetch_assoc();
        $stmt->close();
        
        $objetivo = $datos['objetivo_cargo'];
        
        // Si no hay objetivo definido, devolvemos un array vacío
        if (empty($objetivo)) {
            return [];
        }
        
        // En lugar de dividir por puntuación, consideramos el texto completo como una función
        // o dividimos por saltos de línea si los hay
        $lineas = preg_split('/\R/', $objetivo);
        
        // Filtramos líneas vacías
        $lineas = array_filter($lineas, function($linea) {
            return !empty(trim($linea));
        });
        
        // Si después de filtrar no hay líneas, usamos el objetivo completo
        if (empty($lineas)) {
            return [
                [
                    "id" => 1,
                    "descripcion" => trim($objetivo)
                ]
            ];
        }
        
        // Convertimos las líneas en funciones
        $funciones = [];
        foreach ($lineas as $index => $linea) {
            $funciones[] = [
                "id" => $index + 1,
                "descripcion" => trim($linea)
            ];
        }
        
        return $funciones;
    }
    
    // Nueva función para obtener funciones por ID de empleado
    public function obtenerFuncionesPorEmpleadoId($idEmpleado) {
        global $db;
        
        // Primero obtenemos el cargo del empleado
        $sql = "SELECT cargo FROM empleados WHERE id_empleado = ?";
        $stmt = $db->prepare($sql);
        
        if (!$stmt) {
            http_response_code(500);
            echo json_encode([
                "success" => false, 
                "message" => "Error al preparar la consulta", 
                "detalle" => $db->error
            ]);
            return;
        }
        
        $stmt->bind_param("i", $idEmpleado);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows === 0) {
            http_response_code(404);
            echo json_encode([
                "success" => false, 
                "message" => "Empleado no encontrado"
            ]);
            $stmt->close();
            return;
        }
        
        $empleado = $result->fetch_assoc();
        $nombreCargo = $empleado['cargo'];
        $stmt->close();
        
        // Ahora obtenemos el ID del cargo
        $sql = "SELECT id_cargo FROM cargo WHERE nombre_cargo = ?";
        $stmt = $db->prepare($sql);
        
        if (!$stmt) {
            http_response_code(500);
            echo json_encode([
                "success" => false, 
                "message" => "Error al preparar la consulta", 
                "detalle" => $db->error
            ]);
            return;
        }
        
        $stmt->bind_param("s", $nombreCargo);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows === 0) {
            http_response_code(404);
            echo json_encode([
                "success" => false, 
                "message" => "Cargo no encontrado"
            ]);
            $stmt->close();
            return;
        }
        
        $cargo = $result->fetch_assoc();
        $idCargo = $cargo['id_cargo'];
        $stmt->close();
        
        // Buscamos funciones específicas en la tabla funciones
        $sql = "SELECT * FROM funciones WHERE id_cargo = ?";
        $stmt = $db->prepare($sql);
        
        if (!$stmt) {
            http_response_code(500);
            echo json_encode([
                "success" => false, 
                "message" => "Error al preparar la consulta", 
                "detalle" => $db->error
            ]);
            return;
        }
        
        $stmt->bind_param("i", $idCargo);
        $stmt->execute();
        $result = $stmt->get_result();
        $funciones = [];
        
        if ($result->num_rows > 0) {
            // Si encontramos funciones específicas, las usamos
            while ($row = $result->fetch_assoc()) {
                $funciones[] = [
                    "id" => count($funciones) + 1,
                    "descripcion" => $row['descripcion_funcion'] ?: $row['titulo_funcion']
                ];
            }
        } else {
            // Si no hay funciones específicas, generamos desde el objetivo del cargo
            $funciones = $this->generarFuncionesDesdeCargo($idCargo);
        }
        
        $stmt->close();
        
        // Devolvemos las funciones
        echo json_encode([
            "success" => true,
            "nombre_cargo" => $nombreCargo,
            "funciones" => $funciones
        ]);
    }
    
    // Función para generar funciones a partir del objetivo del cargo
    private function generarFuncionesDesdeCargo($idCargo) {
        global $db;
        
        $sql = "SELECT objetivo_cargo FROM cargo WHERE id_cargo = ?";
        $stmt = $db->prepare($sql);
        
        if (!$stmt) {
            return [];
        }
        
        $stmt->bind_param("i", $idCargo);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows === 0) {
            $stmt->close();
            return [];
        }
        
        $datos = $result->fetch_assoc();
        $stmt->close();
        
        $objetivo = $datos['objetivo_cargo'];
        
        // Si no hay objetivo definido, devolvemos un array vacío
        if (empty($objetivo)) {
            return [];
        }
        
        // En lugar de dividir por puntuación, consideramos el texto completo como una función
        // o dividimos por saltos de línea si los hay
        $lineas = preg_split('/\R/', $objetivo);
        
        // Filtramos líneas vacías
        $lineas = array_filter($lineas, function($linea) {
            return !empty(trim($linea));
        });
        
        // Si después de filtrar no hay líneas, usamos el objetivo completo
        if (empty($lineas)) {
            return [
                [
                    "id" => 1,
                    "descripcion" => trim($objetivo)
                ]
            ];
        }
        
        // Convertimos las líneas en funciones
        $funciones = [];
        foreach ($lineas as $index => $linea) {
            $funciones[] = [
                "id" => $index + 1,
                "descripcion" => trim($linea)
            ];
        }
        
        return $funciones;
    }

    // Función pública para obtener funciones del empleado (para usar desde otros controladores)
    public function obtenerFuncionesEmpleado($idEmpleado, $nombreCargo) {
        global $db;
        
        // Obtenemos el ID del cargo a partir del nombre
        $sql = "SELECT id_cargo FROM cargo WHERE nombre_cargo = ?";
        $stmt = $db->prepare($sql);
        
        if (!$stmt) {
            return [];
        }
        
        $stmt->bind_param("s", $nombreCargo);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows === 0) {
            $stmt->close();
            return [];
        }
        
        $cargo = $result->fetch_assoc();
        $idCargo = $cargo['id_cargo'];
        $stmt->close();
        
        // Primero, intentamos obtener funciones completas de la tabla "funciones"
        $sql = "SELECT * FROM funciones WHERE id_cargo = ?";
        $stmt = $db->prepare($sql);
        
        if (!$stmt) {
            return [];
        }
        
        $stmt->bind_param("i", $idCargo);
        $stmt->execute();
        $result = $stmt->get_result();
        $funciones = [];
        
        if ($result->num_rows > 0) {
            // Si encontramos funciones específicas, las usamos
            while ($row = $result->fetch_assoc()) {
                if (!empty($row['descripcion_funcion'])) {
                    $funciones[] = [
                        "id" => count($funciones) + 1,
                        "descripcion" => $row['descripcion_funcion']
                    ];
                } else if (!empty($row['titulo_funcion'])) {
                    $funciones[] = [
                        "id" => count($funciones) + 1,
                        "descripcion" => $row['titulo_funcion']
                    ];
                }
            }
        }
        
        // Si no encontramos funciones en la tabla, intentamos usar el objetivo del cargo como un todo
        if (empty($funciones)) {
            $sql = "SELECT objetivo_cargo FROM cargo WHERE id_cargo = ?";
            $stmt = $db->prepare($sql);
            
            if ($stmt) {
                $stmt->bind_param("i", $idCargo);
                $stmt->execute();
                $result = $stmt->get_result();
                
                if ($result->num_rows > 0) {
                    $datos = $result->fetch_assoc();
                    $objetivo = $datos['objetivo_cargo'];
                    
                    if (!empty($objetivo)) {
                        // Dividir por puntos, pero manteniendo oraciones completas
                        $pattern = '/(?<=[.!?])\s+/';
                        $oraciones = preg_split($pattern, $objetivo, -1, PREG_SPLIT_NO_EMPTY);
                        
                        foreach ($oraciones as $index => $oracion) {
                            if (strlen(trim($oracion)) > 10) {
                                $funciones[] = [
                                    "id" => $index + 1,
                                    "descripcion" => trim($oracion)
                                ];
                            }
                        }
                    }
                }
                $stmt->close();
            }
        }
        
        // Si aún no tenemos funciones, usamos el método de generación de funciones
        if (empty($funciones)) {
            $funciones = $this->generarFuncionesDesdeCargo($idCargo);
        }
        
        return $funciones;
    }
}
?> 