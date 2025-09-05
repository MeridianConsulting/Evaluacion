<?php
require_once __DIR__ . '/../config/db.php';

class UserController {
    // ... otros métodos existentes ...

    public function loginEmpleado($data) {
        global $db;
        
        if (!isset($data['cedula']) || !isset($data['contrasena'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Faltan datos"]);
            return;
        }
        
        $cedula = $data['cedula'];
        $contrasena = $data['contrasena'];
        
        $sql = "SELECT * FROM empleados WHERE cedula = ? AND contrasena = ?";
        $stmt = $db->prepare($sql);
        if (!$stmt) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Error en la preparación de la consulta", "detalle" => $db->error]);
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
    

    public function agregarEmpleado($data) {
        global $db; 
    
        // Verifica que se envíen todos los datos obligatorios
        if (
            !isset(
                $data['cedula'], 
                $data['nombre'], 
                $data['cargo'], 
                $data['numero_telefonico'], 
                $data['email'], 
                $data['compania'], 
                $data['telefono_empresa'], 
                $data['telefono_internacional'], 
                $data['contrasena']
            )
        ) {
            http_response_code(400);
            echo json_encode([
                "success" => false, 
                "message" => "Faltan datos obligatorios"
            ]);
            return;
        }
        
        // Prepara la consulta considerando todos los campos de la tabla
        $sql = 'INSERT INTO empleados 
                (cedula, nombre, cargo, numero_telefonico, email, compania, telefono_empresa, telefono_internacional, contrasena) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        
        $stmt = $db->prepare($sql);
        if (!$stmt) {
            http_response_code(500);
            echo json_encode([
                "success" => false, 
                "error" => "Error al preparar la consulta", 
                "detalle" => $db->error
            ]);
            return;
        }
        
        // cedula es un entero y los demás campos son cadenas de texto
        $stmt->bind_param(
            "issssssss", 
            $data['cedula'], 
            $data['nombre'], 
            $data['cargo'], 
            $data['numero_telefonico'], 
            $data['email'], 
            $data['compania'], 
            $data['telefono_empresa'], 
            $data['telefono_internacional'], 
            $data['contrasena']
        );
        
        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode([
                "success" => true, 
                "message" => "Empleado agregado exitosamente", 
                "id" => $stmt->insert_id
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "success" => false, 
                "error" => "Error al insertar empleado", 
                "detalle" => $stmt->error
            ]);
        }
        
        $stmt->close();
    }
        

    public function obtenerEmpleadoPorId($id) {
        global $db;
        $sql = 'SELECT id_empleado, cedula, nombre, cargo, area, numero_telefonico, email, compania, 
                telefono_empresa, telefono_internacional, rol FROM empleados WHERE id_empleado = ?';
        $stmt = $db->prepare($sql);
        if (!$stmt) {
            http_response_code(500);
            echo json_encode(["error" => "Error al preparar la consulta", "detalle" => $db->error]);
            return;
        }
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows === 0) {
            http_response_code(404);
            echo json_encode(["error" => "Empleado no encontrado"]);
        } else {
            $empleado = $result->fetch_assoc();
            if (!isset($empleado['email']) || !isset($empleado['numero_telefonico'])) {
                http_response_code(500);
                echo json_encode(["error" => "Faltan datos necesarios en la respuesta"]);
            } else {
                echo json_encode($empleado);
            }
        }
        $stmt->close();
    }
}
?>
