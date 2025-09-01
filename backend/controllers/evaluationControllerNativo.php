<?php
// Configurar manejo de errores
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);

// Capturar errores fatales
register_shutdown_function(function() {
    $error = error_get_last();
    if ($error && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Error fatal del servidor',
            'error' => $error['message']
        ], JSON_UNESCAPED_UNICODE);
    }
});

require_once __DIR__ . '/../config/db.php';

class EvaluationControllerNativo {
    private $db;

    public function __construct() {
        try {
            $this->db = (new Database())->getConnection();
            if (!$this->db) {
                throw new Exception("No se pudo establecer conexión con la base de datos");
            }
        } catch (Exception $e) {
            error_log("Error en constructor EvaluationControllerNativo: " . $e->getMessage());
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error de conexión a la base de datos',
                'error' => $e->getMessage()
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    /**
     * Guarda una evaluación usando la nueva estructura nativa
     */
    public function saveEvaluation() {
        try {
            // Verificar si la solicitud contiene datos
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                http_response_code(405);
                echo json_encode(["message" => "Método no permitido"]);
                return;
            }
            
            // Log para debugging
            error_log("POST data recibido: " . print_r($_POST, true));
            error_log("FILES data recibido: " . print_r($_FILES, true));
            
            // Obtener los datos de la evaluación
            $employeeId = $_POST['employeeId'] ?? null;
            $competenciasData = json_decode($_POST['competenciasData'] ?? '[]', true);
            $hseqData = json_decode($_POST['hseqData'] ?? '[]', true);
            $mejoramiento = json_decode($_POST['mejoramiento'] ?? 'null', true);
            $planAccion = json_decode($_POST['planAccion'] ?? 'null', true);
            $promedioCompetencias = isset($_POST['promedioCompetencias']) ? (float)$_POST['promedioCompetencias'] : null;
            $hseqAverage = isset($_POST['hseqAverage']) ? (float)$_POST['hseqAverage'] : null;
            $generalAverage = isset($_POST['generalAverage']) ? (float)$_POST['generalAverage'] : null;
            $groupAverages = json_decode($_POST['groupAverages'] ?? 'null', true);
            $periodoEvaluacion = $_POST['periodoEvaluacion'] ?? null;
            
            if (!$employeeId) {
                http_response_code(400);
                echo json_encode(["message" => "ID de empleado no proporcionado"]);
                return;
            }
            
            error_log("Datos procesados - EmployeeId: $employeeId, Periodo: $periodoEvaluacion");
        
        // Procesar firmas
        $employeeSignaturePath = null;
        $bossSignaturePath = null;
        
        // Directorio para guardar las firmas
        $uploadDir = __DIR__ . '/../uploads/signatures/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        
        // Procesar firma del empleado
        if (isset($_FILES['employeeSignature']) && $_FILES['employeeSignature']['error'] === UPLOAD_ERR_OK) {
            $tempFile = $_FILES['employeeSignature']['tmp_name'];
            $fileName = 'employee_' . $employeeId . '_' . time() . '.png';
            $targetFile = $uploadDir . $fileName;
            
            if (move_uploaded_file($tempFile, $targetFile)) {
                $employeeSignaturePath = 'uploads/signatures/' . $fileName;
            }
        }
        
        // Procesar firma del jefe
        if (isset($_FILES['bossSignature']) && $_FILES['bossSignature']['error'] === UPLOAD_ERR_OK) {
            $tempFile = $_FILES['bossSignature']['tmp_name'];
            $fileName = 'boss_' . $employeeId . '_' . time() . '.png';
            $targetFile = $uploadDir . $fileName;
            
            if (move_uploaded_file($tempFile, $targetFile)) {
                $bossSignaturePath = 'uploads/signatures/' . $fileName;
            }
        }
        
            // Guardar evaluación usando la nueva estructura nativa
            $this->db->begin_transaction();
            try {
                // 1. Insertar evaluación principal
                $insertEvalSql = 'INSERT INTO evaluacion (id_empleado, fecha_evaluacion, periodo_evaluacion, estado_evaluacion) VALUES (?, NOW(), ?, ?)';
                $stmtEval = $this->db->prepare($insertEvalSql);
                if (!$stmtEval) {
                    throw new Exception('Error al preparar INSERT evaluacion: ' . $this->db->error);
                }
                $estado = 'COMPLETADA';
                $stmtEval->bind_param('iss', $employeeId, $periodoEvaluacion, $estado);
                if (!$stmtEval->execute()) {
                    throw new Exception('Error al ejecutar INSERT evaluacion: ' . $stmtEval->error);
                }
                $evaluationId = $stmtEval->insert_id;
                $stmtEval->close();

                error_log("Evaluación principal creada con ID: $evaluationId");

                // 2. Guardar datos de mejoramiento
                if ($mejoramiento) {
                    $this->saveMejoramiento($evaluationId, $mejoramiento);
                }

                // 3. Guardar plan de acción
                if ($planAccion) {
                    $this->savePlanAccion($evaluationId, $planAccion);
                }

                // 4. Guardar datos HSEQ
                if ($hseqData) {
                    $this->saveHseqData($evaluationId, $hseqData);
                }

                // 5. Guardar competencias
                if ($competenciasData) {
                    $this->saveCompetencias($evaluationId, $competenciasData);
                }

                // 6. Guardar promedios
                $this->savePromedios($evaluationId, $promedioCompetencias, $hseqAverage, $generalAverage, $groupAverages);

                // 7. Guardar firmas
                if ($employeeSignaturePath || $bossSignaturePath) {
                    $this->saveFirmas($evaluationId, $employeeSignaturePath, $bossSignaturePath);
                }

                $this->db->commit();

                echo json_encode([
                    'success' => true,
                    'message' => 'Evaluación guardada exitosamente',
                    'id_evaluacion' => $evaluationId,
                ], JSON_UNESCAPED_UNICODE);
                return;

            } catch (Exception $e) {
                $this->db->rollback();
                error_log("Error en transacción: " . $e->getMessage());
                http_response_code(500);
                echo json_encode([
                    'success' => false,
                    'message' => 'Error al guardar la evaluación',
                    'error' => $e->getMessage(),
                ], JSON_UNESCAPED_UNICODE);
                return;
            }
            
        } catch (Exception $e) {
            error_log("Error general en saveEvaluation: " . $e->getMessage());
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error general al procesar la evaluación',
                'error' => $e->getMessage(),
            ], JSON_UNESCAPED_UNICODE);
            return;
        }
    }

    /**
     * Guarda datos de mejoramiento
     */
    private function saveMejoramiento($evaluationId, $mejoramiento) {
        $stmt = $this->db->prepare("
            INSERT INTO evaluacion_mejoramiento 
            (id_evaluacion, fortalezas, aspectos_mejorar) 
            VALUES (?, ?, ?)
        ");
        if (!$stmt) {
            throw new Exception('Error al preparar INSERT mejoramiento: ' . $this->db->error);
        }
        $fortalezas = $mejoramiento['fortalezas'] ?? '';
        $aspectosMejorar = $mejoramiento['aspectosMejorar'] ?? '';
        $stmt->bind_param('iss', 
            $evaluationId,
            $fortalezas,
            $aspectosMejorar
        );
        if (!$stmt->execute()) {
            throw new Exception('Error al ejecutar INSERT mejoramiento: ' . $stmt->error);
        }
        $stmt->close();
    }

    /**
     * Guarda plan de acción
     */
    private function savePlanAccion($evaluationId, $planAccion) {
        $stmt = $this->db->prepare("
            INSERT INTO evaluacion_plan_accion 
            (id_evaluacion, actividad, responsable, seguimiento, fecha) 
            VALUES (?, ?, ?, ?, ?)
        ");
        $actividad = $planAccion['actividad'] ?? '';
        $responsable = $planAccion['responsable'] ?? '';
        $seguimiento = $planAccion['seguimiento'] ?? '';
        $fecha = $planAccion['fecha'] ?? '';
        $stmt->bind_param('issss', 
            $evaluationId,
            $actividad,
            $responsable,
            $seguimiento,
            $fecha
        );
        $stmt->execute();
        $stmt->close();
    }

    /**
     * Guarda datos HSEQ
     */
    private function saveHseqData($evaluationId, $hseqData) {
        $stmt = $this->db->prepare("
            INSERT INTO evaluacion_hseq 
            (id_evaluacion, id_responsabilidad, responsabilidad, calificacion, autoevaluacion, evaluacion_jefe) 
            VALUES (?, ?, ?, ?, ?, ?)
        ");
        
        foreach ($hseqData as $hseq) {
            $id = $hseq['id'] ?? 0;
            $responsabilidad = $hseq['responsabilidad'] ?? '';
            $calificacion = $hseq['calificacion'] ?? '';
            $autoevaluacion = $hseq['autoevaluacion'] ?? '';
            $evaluacionJefe = $hseq['evaluacionJefe'] ?? '';
            $stmt->bind_param('iissss', 
                $evaluationId,
                $id,
                $responsabilidad,
                $calificacion,
                $autoevaluacion,
                $evaluacionJefe
            );
            $stmt->execute();
        }
        $stmt->close();
    }

    /**
     * Guarda competencias
     */
    private function saveCompetencias($evaluationId, $competenciasData) {
        $stmt = $this->db->prepare("
            INSERT INTO evaluacion_competencias 
            (id_evaluacion, id_aspecto, aspecto, calificacion_empleado, calificacion_jefe, promedio) 
            VALUES (?, ?, ?, ?, ?, ?)
        ");
        
        foreach ($competenciasData as $competencia) {
            $id = $competencia['id'] ?? 0;
            $aspecto = $competencia['aspecto'] ?? '';
            $worker = $competencia['worker'] ?? '';
            $boss = $competencia['boss'] ?? '';
            $average = $competencia['average'] ?? '';
            $stmt->bind_param('iissss', 
                $evaluationId,
                $id,
                $aspecto,
                $worker,
                $boss,
                $average
            );
            $stmt->execute();
        }
        $stmt->close();
    }

    /**
     * Guarda promedios
     */
    private function savePromedios($evaluationId, $promedioCompetencias, $hseqAverage, $generalAverage, $groupAverages) {
        $stmt = $this->db->prepare("
            INSERT INTO evaluacion_promedios 
            (id_evaluacion, promedio_competencias, promedio_hseq, promedio_general,
             promedio_comunicacion_efectiva, promedio_instrumentalidad_decisiones,
             promedio_aporte_profesional, promedio_colaboracion,
             promedio_relaciones_interpersonales, promedio_gestion_procedimientos,
             promedio_cumplimiento_funciones) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $porApartado = $groupAverages ?? [];
        
        $comunicacion = $porApartado['Comunicacion efectiva'] ?? 0;
        $instrumentalidad = $porApartado['Instrumentalidad de decisiones'] ?? 0;
        $aporte = $porApartado['Aporte profesional'] ?? 0;
        $colaboracion = $porApartado['Colaboracion'] ?? 0;
        $relaciones = $porApartado['Relaciones interpersonales'] ?? 0;
        $gestion = $porApartado['Gestion de procedimientos'] ?? 0;
        $cumplimiento = $porApartado['Cumplimiento de funciones del cargo'] ?? 0;
        
        $stmt->bind_param('idddddddddd', 
            $evaluationId,
            $promedioCompetencias,
            $hseqAverage,
            $generalAverage,
            $comunicacion,
            $instrumentalidad,
            $aporte,
            $colaboracion,
            $relaciones,
            $gestion,
            $cumplimiento
        );
        $stmt->execute();
        $stmt->close();
    }

    /**
     * Guarda firmas
     */
    private function saveFirmas($evaluationId, $employeeSignaturePath, $bossSignaturePath) {
        $stmt = $this->db->prepare("
            INSERT INTO evaluacion_firmas 
            (id_evaluacion, firma_empleado, firma_jefe) 
            VALUES (?, ?, ?)
        ");
        $firmaEmpleado = $employeeSignaturePath ?? '';
        $firmaJefe = $bossSignaturePath ?? '';
        $stmt->bind_param('iss', $evaluationId, $firmaEmpleado, $firmaJefe);
        $stmt->execute();
        $stmt->close();
    }

    /**
     * Obtiene una evaluación completa con todos sus datos
     */
    public function getEvaluation($evaluationId) {
        try {
            // Obtener datos básicos de la evaluación
            $stmt = $this->db->prepare("
                SELECT e.*, emp.nombre, emp.cargo, emp.area 
                FROM evaluacion e 
                JOIN empleados emp ON e.id_empleado = emp.id_empleado 
                WHERE e.id_evaluacion = ?
            ");
            $stmt->bind_param('i', $evaluationId);
            $stmt->execute();
            $evaluation = $stmt->get_result()->fetch_assoc();
            $stmt->close();

            if (!$evaluation) {
                http_response_code(404);
                echo json_encode(["message" => "Evaluación no encontrada"]);
                return;
            }

            // Obtener datos relacionados
            $evaluation['mejoramiento'] = $this->getMejoramiento($evaluationId);
            $evaluation['plan_accion'] = $this->getPlanAccion($evaluationId);
            $evaluation['hseq_data'] = $this->getHseqData($evaluationId);
            $evaluation['competencias'] = $this->getCompetencias($evaluationId);
            $evaluation['promedios'] = $this->getPromedios($evaluationId);
            $evaluation['firmas'] = $this->getFirmas($evaluationId);

            echo json_encode($evaluation, JSON_UNESCAPED_UNICODE);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error al obtener la evaluación',
                'error' => $e->getMessage(),
            ], JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * Obtiene datos de mejoramiento
     */
    private function getMejoramiento($evaluationId) {
        $stmt = $this->db->prepare("SELECT * FROM evaluacion_mejoramiento WHERE id_evaluacion = ?");
        $stmt->bind_param('i', $evaluationId);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_assoc();
        $stmt->close();
        return $result;
    }

    /**
     * Obtiene plan de acción
     */
    private function getPlanAccion($evaluationId) {
        $stmt = $this->db->prepare("SELECT * FROM evaluacion_plan_accion WHERE id_evaluacion = ?");
        $stmt->bind_param('i', $evaluationId);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_assoc();
        $stmt->close();
        return $result;
    }

    /**
     * Obtiene datos HSEQ
     */
    private function getHseqData($evaluationId) {
        $stmt = $this->db->prepare("SELECT * FROM evaluacion_hseq WHERE id_evaluacion = ? ORDER BY id_responsabilidad");
        $stmt->bind_param('i', $evaluationId);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();
        return $result;
    }

    /**
     * Obtiene competencias
     */
    private function getCompetencias($evaluationId) {
        $stmt = $this->db->prepare("SELECT * FROM evaluacion_competencias WHERE id_evaluacion = ? ORDER BY id_aspecto");
        $stmt->bind_param('i', $evaluationId);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();
        return $result;
    }

    /**
     * Obtiene promedios
     */
    private function getPromedios($evaluationId) {
        $stmt = $this->db->prepare("SELECT * FROM evaluacion_promedios WHERE id_evaluacion = ?");
        $stmt->bind_param('i', $evaluationId);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_assoc();
        $stmt->close();
        return $result;
    }

    /**
     * Obtiene firmas
     */
    private function getFirmas($evaluationId) {
        $stmt = $this->db->prepare("SELECT * FROM evaluacion_firmas WHERE id_evaluacion = ?");
        $stmt->bind_param('i', $evaluationId);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_assoc();
        $stmt->close();
        return $result;
    }

    /**
     * Obtiene todas las evaluaciones de un empleado
     */
    public function getEmployeeEvaluations($employeeId) {
        try {
            $stmt = $this->db->prepare("
                SELECT e.*, emp.nombre, emp.cargo, emp.area 
                FROM evaluacion e 
                JOIN empleados emp ON e.id_empleado = emp.id_empleado 
                WHERE e.id_empleado = ? 
                ORDER BY e.fecha_evaluacion DESC
            ");
            $stmt->bind_param('i', $employeeId);
            $stmt->execute();
            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            $stmt->close();

            echo json_encode($result, JSON_UNESCAPED_UNICODE);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error al obtener las evaluaciones',
                'error' => $e->getMessage(),
            ], JSON_UNESCAPED_UNICODE);
        }
    }
}
?>
