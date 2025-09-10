<?php
require_once __DIR__ . '/../config/db.php';
class AdminController {
    private $db;
    public function __construct() {
        $this->db = (new Database())->getConnection();
    }
    public function validateLogin($data) {
        if (!isset($data['username'], $data['password'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Username y password son requeridos."]);
            return;
        }

        try {
            $stmt = $this->db->prepare("SELECT id, password FROM admins WHERE username = ? AND password = ?");
            $stmt->bind_param("ss", $data['username'], $data['password']);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows === 0) {
                http_response_code(401);
                echo json_encode(["success" => false, "message" => "Credenciales incorrectas."]);
                return;
            }

            http_response_code(200);
            echo json_encode(["success" => true, "message" => "Login exitoso."]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => $e->getMessage()]);
        }
    }    
    // Obtener todos los empleados
    public function getEmployees() {
        global $db;
        $sql = 'SELECT * FROM empleados';
        $stmt = $db->prepare($sql);
    
        if (!$stmt) {
            http_response_code(500);
            echo json_encode(["error" => "Error al preparar la consulta", "detalle" => $db->error]);
            return;
        }
    
        $stmt->execute();
        $result = $stmt->get_result();
    
        if ($result->num_rows === 0) {
            http_response_code(404);
            echo json_encode(["error" => "No se encontraron empleados"]);
        } else {
            $empleados = $result->fetch_all(MYSQLI_ASSOC);
            echo json_encode($empleados);
        }
    
        $stmt->close();
    }
    // Obtener un empleado por ID
    public static function getEmployeeById($id) {
        $query = "SELECT * FROM empleados WHERE id = ?";
        $stmt = $GLOBALS['db']->prepare($query);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 0) {
            http_response_code(404);
            echo json_encode(["message" => "Empleado no encontrado"]);
            return;
        }

        echo json_encode($result->fetch_assoc());
    }
    // Crear un empleado
    public function crearEmpleado($data) {
        global $db;
        
        $sql = 'INSERT INTO empleados (nombre, cargo, email) 
                VALUES (?, ?, ?)';

        $stmt = $db->prepare($sql);
        if (!$stmt) {
            http_response_code(500);
            echo json_encode(["success" => false, "error" => "Error al preparar la consulta", "detalle" => $db->error]);
            return;
        }

        $stmt->bind_param("sss", 
            $data['nombre'], 
            $data['cargo'], 
            $data['email']
        );

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["success" => true, "message" => "Empleado creado exitosamente", "id" => $stmt->insert_id]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "error" => "Error al insertar empleado", "detalle" => $stmt->error]);
        }

        $stmt->close();
    }
    // Actualizar un empleado
    public static function updateEmployee($id, $request) {
        $query = "UPDATE empleados SET nombre = ?, cargo = ?, email = ? WHERE id = ?";
        $stmt = $GLOBALS['db']->prepare($query);

        $stmt->bind_param(
            "sssi",
            $request['nombre'],
            $request['cargo'],
            $request['email'],
            $id
        );

        if (!$stmt->execute()) {
            http_response_code(500);
            echo json_encode(["message" => "Error al actualizar el empleado"]);
            return;
        }

        if ($stmt->affected_rows === 0) {
            http_response_code(404);
            echo json_encode(["message" => "Empleado no encontrado"]);
            return;
        }

        echo json_encode(["message" => "Empleado actualizado con éxito", "id" => $id]);
    }
    // Eliminar un empleado
    public static function deleteEmployee($id) {
        $query = "DELETE FROM empleados WHERE id = ?";
        $stmt = $GLOBALS['db']->prepare($query);
        $stmt->bind_param("i", $id);

        if (!$stmt->execute()) {
            http_response_code(500);
            echo json_encode(["message" => "Error al eliminar el empleado"]);
            return;
        }

        if ($stmt->affected_rows === 0) {
            http_response_code(404);
            echo json_encode(["message" => "Empleado no encontrado"]);
            return;
        }

        echo json_encode(["message" => "Empleado eliminado con éxito"]);
    }
    // Obtener estadísticas de empleados
    public static function getEmployeeStatistics() {
        $query = "SELECT puesto, COUNT(*) as count, AVG(salario) as avgSalary FROM empleados GROUP BY puesto";
        $result = $GLOBALS['db']->query($query);

        if (!$result) {
            http_response_code(500);
            echo json_encode(["message" => "Error al obtener estadísticas"]);
            return;
        }

        echo json_encode($result->fetch_all(MYSQLI_ASSOC));
    }
}
?>
