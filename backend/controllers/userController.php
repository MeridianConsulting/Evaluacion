<?php
require_once __DIR__ . '/../config/db.php';

class UserController {
    // ... otros métodos existentes ...

    public function loginEmpleado($data) {
        global $db;
        
        // Verifica que se envíen los datos necesarios
        if (!isset($data['correo']) || !isset($data['contrasena'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Faltan datos"]);
            return;
        }
        
        $correo = $data['correo'];
        $contrasena = $data['contrasena'];
        
        // Consulta para validar que exista un empleado con el email y la contraseña proporcionados
        $sql = "SELECT * FROM empleados WHERE email = ? AND contrasena = ?";
        $stmt = $db->prepare($sql);
        if (!$stmt) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Error en la preparación de la consulta", "detalle" => $db->error]);
            return;
        }
        
        $stmt->bind_param("ss", $correo, $contrasena);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $empleado = $result->fetch_assoc();
            // Aquí podrías iniciar sesión, establecer variables de sesión, etc.
            echo json_encode(["success" => true, "message" => "Login exitoso", "empleado" => $empleado]);
        } else {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Credenciales incorrectas"]);
        }
        
        $stmt->close();
    }
    

    public function agregarEmpleado($data) {
        global $db; 
        $sql = 'INSERT INTO empleados (nombre, cargo, numero_telefonico, email, compania, telefono_empresa, telefono_internacional) 
                VALUES (?, ?, ?, ?, ?, ?, ?)';
        $stmt = $db->prepare($sql);
        if (!$stmt) {
            http_response_code(500);
            echo json_encode(["success" => false, "error" => "Error al preparar la consulta", "detalle" => $db->error]);
            return;
        }
        $stmt->bind_param("sssssss", $data['nombre'], $data['cargo'], $data['numero_telefonico'], $data['email'], $data['compania'], $data['telefono_empresa'], $data['telefono_internacional']);
        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["success" => true, "message" => "Empleado agregado exitosamente", "id" => $stmt->insert_id]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "error" => "Error al insertar empleado", "detalle" => $stmt->error]);
        }
        $stmt->close();
    }

    public function obtenerEmpleadoPorId($id) {
        global $db;
        $sql = 'SELECT * FROM empleados WHERE id = ?';
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
