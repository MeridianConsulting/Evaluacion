<?php
require_once __DIR__ . '/../config/db.php';

class CargoController {
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