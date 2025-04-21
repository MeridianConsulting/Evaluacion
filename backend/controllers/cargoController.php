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
        
        // Dividimos el objetivo en frases o segmentos
        $segmentos = preg_split('/[.,;]/', $objetivo);
        
        // Filtramos segmentos vacíos o muy cortos
        $segmentos = array_filter($segmentos, function($segmento) {
            return strlen(trim($segmento)) > 10;
        });
        
        // Convertimos los segmentos en funciones
        $funciones = [];
        foreach ($segmentos as $index => $segmento) {
            if ($index >= 5) break; // Limitamos a 5 funciones máximo
            
            $funciones[] = [
                "id" => $index + 1,
                "descripcion" => trim($segmento)
            ];
        }
        
        return $funciones;
    }
}
?> 