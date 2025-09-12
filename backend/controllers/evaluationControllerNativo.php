<?php
// Autoload de Composer (para PhpSpreadsheet si está instalado)
if (file_exists(__DIR__ . '/../vendor/autoload.php')) {
    require_once __DIR__ . '/../vendor/autoload.php';
}

// Configurar manejo de errores
error_reporting(E_ALL);
ini_set('display_errors', 0);
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

// Incluir TCPDF si está disponible
if (file_exists(__DIR__ . '/../vendor/tcpdf/tcpdf.php')) {
    require_once __DIR__ . '/../vendor/tcpdf/tcpdf.php';
}

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
            $planAccion = json_decode(($_POST['planesAccion'] ?? ($_POST['planAccion'] ?? 'null')), true);
            $promedioCompetencias = isset($_POST['promedioCompetencias']) ? (float)$_POST['promedioCompetencias'] : null;
            $hseqAverage = isset($_POST['hseqAverage']) ? (float)$_POST['hseqAverage'] : null;
            $generalAverage = isset($_POST['generalAverage']) ? (float)$_POST['generalAverage'] : null;
            $groupAverages = json_decode($_POST['groupAverages'] ?? 'null', true);
            $periodoEvaluacion = $_POST['periodoEvaluacion'] ?? null;
            $bossId = isset($_POST['bossId']) ? (int)$_POST['bossId'] : null;
            
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
                $insertEvalSql = 'INSERT INTO evaluacion (id_empleado, fecha_evaluacion, periodo_evaluacion, estado_evaluacion, id_jefe) VALUES (?, NOW(), ?, ?, ?)';
                $stmtEval = $this->db->prepare($insertEvalSql);
                if (!$stmtEval) {
                    throw new Exception('Error al preparar INSERT evaluacion: ' . $this->db->error);
                }
                // Determinar estado según el flujo de trabajo
                $estado = $this->determinarEstadoEvaluacion($employeeSignaturePath, $bossSignaturePath, false, null);
                $stmtEval->bind_param('issi', $employeeId, $periodoEvaluacion, $estado, $bossId);
                if (!$stmtEval->execute()) {
                    throw new Exception('Error al ejecutar INSERT evaluacion: ' . $stmtEval->error);
                }
                $evaluationId = $stmtEval->insert_id;
                $stmtEval->close();

                error_log("Evaluación principal creada con ID: $evaluationId");

                // Registrar el estado inicial en el historial
                $this->registrarCambioEstadoConAnterior($evaluationId, null, $estado, $employeeId);

                // 2. Guardar datos de mejoramiento
                if ($mejoramiento) {
                    $this->saveMejoramiento($evaluationId, $mejoramiento);
                }

                // 3. Guardar plan de acción
                if ($planAccion) {
                    $this->savePlanAccion($evaluationId, $planAccion);
                }

                // 4. Guardar datos HSEQ
                // HSEQ se gestiona en tablas independientes, no guardar aquí

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
     * Actualiza una evaluación existente (uso del JEFE para completar)
     */
    public function updateEvaluation() {
        try {
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                http_response_code(405);
                echo json_encode(["success" => false, "message" => "Método no permitido"]);
                return;
            }

            $evaluationId = isset($_POST['evaluationId']) ? (int)$_POST['evaluationId'] : 0;
            if (!$evaluationId) {
                http_response_code(400);
                echo json_encode(["success" => false, "message" => "evaluationId es requerido"]);
                return;
            }

            $competenciasData = json_decode($_POST['competenciasData'] ?? '[]', true);
            $hseqData = json_decode($_POST['hseqData'] ?? '[]', true);
            $mejoramiento = json_decode($_POST['mejoramiento'] ?? 'null', true);
            $planAccion = json_decode($_POST['planesAccion'] ?? 'null', true);
            $promedioCompetencias = isset($_POST['promedioCompetencias']) ? (float)$_POST['promedioCompetencias'] : null;
            $hseqAverage = isset($_POST['hseqAverage']) ? (float)$_POST['hseqAverage'] : null;
            $generalAverage = isset($_POST['generalAverage']) ? (float)$_POST['generalAverage'] : null;
            $groupAverages = json_decode($_POST['groupAverages'] ?? 'null', true);

            $employeeSignaturePath = null;
            $bossSignaturePath = null;

            $uploadDir = __DIR__ . '/../uploads/signatures/';
            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }
            if (isset($_FILES['employeeSignature']) && $_FILES['employeeSignature']['error'] === UPLOAD_ERR_OK) {
                $tempFile = $_FILES['employeeSignature']['tmp_name'];
                $fileName = 'employee_upd_' . $evaluationId . '_' . time() . '.png';
                $targetFile = $uploadDir . $fileName;
                if (move_uploaded_file($tempFile, $targetFile)) {
                    $employeeSignaturePath = 'uploads/signatures/' . $fileName;
                }
            }
            if (isset($_FILES['bossSignature']) && $_FILES['bossSignature']['error'] === UPLOAD_ERR_OK) {
                $tempFile = $_FILES['bossSignature']['tmp_name'];
                $fileName = 'boss_upd_' . $evaluationId . '_' . time() . '.png';
                $targetFile = $uploadDir . $fileName;
                if (move_uploaded_file($tempFile, $targetFile)) {
                    $bossSignaturePath = 'uploads/signatures/' . $fileName;
                }
            }

            $this->db->begin_transaction();
            try {
                // Obtener el estado anterior ANTES de actualizarlo
                $stmtAnterior = $this->db->prepare("SELECT estado_evaluacion FROM evaluacion WHERE id_evaluacion = ?");
                $stmtAnterior->bind_param('i', $evaluationId);
                $stmtAnterior->execute();
                $resultAnterior = $stmtAnterior->get_result();
                $estadoAnterior = $resultAnterior->fetch_assoc()['estado_evaluacion'] ?? null;
                $stmtAnterior->close();
                
                // Determinar nuevo estado según el flujo de trabajo (basado en firmas existentes o adjuntas)
                $estado = $this->determinarEstadoEvaluacion($employeeSignaturePath, $bossSignaturePath, true, $evaluationId);
                $stmt = $this->db->prepare("UPDATE evaluacion SET estado_evaluacion = ?, fecha_actualizacion = NOW() WHERE id_evaluacion = ?");
                $stmt->bind_param('si', $estado, $evaluationId);
                $stmt->execute();
                $stmt->close();
                
                // Registrar cambio de estado en el historial con el estado anterior correcto
                $usuarioCambioId = isset($_POST['usuarioId']) ? (int)$_POST['usuarioId'] : (isset($_POST['bossId']) ? (int)$_POST['bossId'] : null);
                $this->registrarCambioEstadoConAnterior($evaluationId, $estadoAnterior, $estado, $usuarioCambioId);

                // Limpiar y reinsertar detalles para reflejar la última edición
                $this->db->query("DELETE FROM evaluacion_competencias WHERE id_evaluacion = " . (int)$evaluationId);
                $this->db->query("DELETE FROM evaluacion_hseq WHERE id_evaluacion = " . (int)$evaluationId);
                $this->db->query("DELETE FROM evaluacion_mejoramiento WHERE id_evaluacion = " . (int)$evaluationId);
                $this->db->query("DELETE FROM evaluacion_plan_accion WHERE id_evaluacion = " . (int)$evaluationId);
                $this->db->query("DELETE FROM evaluacion_promedios WHERE id_evaluacion = " . (int)$evaluationId);

                if ($mejoramiento) { $this->saveMejoramiento($evaluationId, $mejoramiento); }
                if ($planAccion)   { $this->savePlanAccion($evaluationId, $planAccion); }
                // HSEQ se gestiona en tablas independientes, no guardar aquí
                if ($competenciasData) { $this->saveCompetencias($evaluationId, $competenciasData); }
                $this->savePromedios($evaluationId, $promedioCompetencias, $hseqAverage, $generalAverage, $groupAverages);

                // Actualizar firmas: mantener la firma del empleado existente y actualizar solo la del jefe
                if ($bossSignaturePath) {
                    // Primero verificar si ya existe un registro de firmas para esta evaluación
                    $stmtCheck = $this->db->prepare("SELECT id_firma, firma_empleado FROM evaluacion_firmas WHERE id_evaluacion = ?");
                    $stmtCheck->bind_param('i', $evaluationId);
                    $stmtCheck->execute();
                    $result = $stmtCheck->get_result()->fetch_assoc();
                    $stmtCheck->close();
                    
                    if ($result) {
                        // Actualizar el registro existente, manteniendo la firma del empleado
                        $stmtUpdate = $this->db->prepare("UPDATE evaluacion_firmas SET firma_jefe = ? WHERE id_evaluacion = ?");
                        if (!$stmtUpdate) {
                            throw new Exception('Error al preparar UPDATE de firma del jefe: ' . $this->db->error);
                        }
                        $stmtUpdate->bind_param('si', $bossSignaturePath, $evaluationId);
                        $stmtUpdate->execute();
                        $stmtUpdate->close();
                    } else {
                        // Insertar nuevo registro con solo la firma del jefe (la del empleado se agregará después)
                        $stmtInsert = $this->db->prepare("INSERT INTO evaluacion_firmas (id_evaluacion, firma_jefe) VALUES (?, ?)");
                        if (!$stmtInsert) {
                            throw new Exception('Error al preparar INSERT de firma del jefe: ' . $this->db->error);
                        }
                        $stmtInsert->bind_param('is', $evaluationId, $bossSignaturePath);
                        $stmtInsert->execute();
                        $stmtInsert->close();
                    }
                }

                $this->db->commit();
                echo json_encode(["success" => true, "message" => "Evaluación actualizada", "id_evaluacion" => $evaluationId]);
            } catch (Exception $e) {
                $this->db->rollback();
                http_response_code(500);
                echo json_encode(["success" => false, "message" => "Error al actualizar", "error" => $e->getMessage()]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Error general", "error" => $e->getMessage()]);
        }
    }

    /**
     * Lista evaluaciones asignadas a un jefe
     */
    public function getAssignedToBoss($bossId) {
        try {
            $stmt = $this->db->prepare("
                SELECT e.id_evaluacion, e.id_empleado, e.periodo_evaluacion, e.estado_evaluacion,
                       emp.nombre, emp.cargo, emp.area
                FROM evaluacion e
                JOIN empleados emp ON emp.id_empleado = e.id_empleado
                WHERE e.id_jefe = ?
                ORDER BY e.fecha_evaluacion DESC
            ");
            $stmt->bind_param('i', $bossId);
            $stmt->execute();
            $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            $stmt->close();

            echo json_encode(["success" => true, "data" => $rows]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Error al listar asignaciones", "error" => $e->getMessage()]);
        }
    }

    /**
     * Lista empleados que tienen evaluación HSEQ en un período dado para un jefe
     */
    public function getHseqEvaluatedForBossAndPeriod($bossId, $periodo) {
        try {
            $sql = "
                SELECT he.id_empleado,
                       emp.nombre AS empleado_nombre,
                       he.id_hseq_evaluacion AS id_evaluacion,
                       he.estado AS estado_evaluacion,
                       he.fecha_evaluacion,
                       he.id_evaluador AS evaluador_id,
                       ev.nombre AS evaluador_nombre
                FROM hseq_evaluacion he
                INNER JOIN empleados emp ON emp.id_empleado = he.id_empleado
                LEFT JOIN empleados ev ON ev.id_empleado = he.id_evaluador
                WHERE he.id_evaluador = ? AND he.periodo_evaluacion = ?
                AND he.id_hseq_evaluacion = (
                    SELECT MAX(he2.id_hseq_evaluacion)
                    FROM hseq_evaluacion he2
                    WHERE he2.id_empleado = he.id_empleado AND he2.periodo_evaluacion = ? AND he2.id_evaluador = he.id_evaluador
                )
                ORDER BY emp.nombre ASC
            ";
            $stmt = $this->db->prepare($sql);
            if (!$stmt) {
                throw new Exception('Error al preparar consulta: ' . $this->db->error);
            }
            $stmt->bind_param('iss', $bossId, $periodo, $periodo);
            $stmt->execute();
            $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            $stmt->close();

            echo json_encode(["success" => true, "data" => $rows]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Error al obtener evaluados HSEQ", "error" => $e->getMessage()]);
        }
    }

    /**
     * Lista evaluaciones asignadas a un jefe (donde el usuario es jefe inmediato)
     */
    public function getEvaluationsAssignedToBoss($bossId) {
        try {
            $sql = "
                SELECT e.id_evaluacion,
                       e.id_empleado,
                       emp.nombre,
                       emp.cargo,
                       emp.area,
                       e.estado_evaluacion,
                       e.periodo_evaluacion,
                       e.fecha_creacion,
                       e.fecha_autoevaluacion,
                       e.fecha_evaluacion_jefe,
                       e.fecha_evaluacion_hseq
                FROM evaluacion e
                INNER JOIN empleados emp ON emp.id_empleado = e.id_empleado
                WHERE e.id_jefe = ?
                ORDER BY e.fecha_creacion DESC, emp.nombre ASC
            ";
            $stmt = $this->db->prepare($sql);
            if (!$stmt) {
                throw new Exception('Error al preparar consulta: ' . $this->db->error);
            }
            $stmt->bind_param('i', $bossId);
            $stmt->execute();
            $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            $stmt->close();

            echo json_encode(["success" => true, "data" => $rows]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Error al obtener evaluaciones asignadas", "error" => $e->getMessage()]);
        }
    }

    /**
     * Lista empleados evaluados HSEQ del período (última evaluación por empleado) con evaluador
     */
    public function getHseqEvaluatedForPeriod($periodo) {
        try {
            $sql = "
                SELECT he.id_empleado,
                       emp.nombre AS empleado_nombre,
                       he.id_hseq_evaluacion AS id_evaluacion,
                       he.estado AS estado_evaluacion,
                       he.fecha_evaluacion,
                       he.id_evaluador AS evaluador_id,
                       ev.nombre AS evaluador_nombre
                FROM hseq_evaluacion he
                INNER JOIN empleados emp ON emp.id_empleado = he.id_empleado
                LEFT JOIN empleados ev ON ev.id_empleado = he.id_evaluador
                WHERE he.periodo_evaluacion = ?
                AND he.id_hseq_evaluacion = (
                    SELECT MAX(he2.id_hseq_evaluacion)
                    FROM hseq_evaluacion he2
                    WHERE he2.id_empleado = he.id_empleado AND he2.periodo_evaluacion = ?
                )
                ORDER BY emp.nombre ASC
            ";
            $stmt = $this->db->prepare($sql);
            if (!$stmt) {
                throw new Exception('Error al preparar consulta: ' . $this->db->error);
            }
            $stmt->bind_param('ss', $periodo, $periodo);
            $stmt->execute();
            $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            $stmt->close();

            echo json_encode(["success" => true, "data" => $rows]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Error al obtener estado HSEQ del período", "error" => $e->getMessage()]);
        }
    }

    /**
     * Obtiene todas las evaluaciones HSEQ de un empleado específico
     */
    public function getHseqEvaluationsByEmployee($employeeId) {
        try {
            $sql = "
                SELECT he.id_empleado,
                       emp.nombre AS empleado_nombre,
                       he.id_hseq_evaluacion AS id_evaluacion,
                       he.periodo_evaluacion,
                       he.estado AS estado_evaluacion,
                       he.fecha_evaluacion,
                       he.id_evaluador AS evaluador_id,
                       ev.nombre AS evaluador_nombre,
                       he.promedio_hseq
                FROM hseq_evaluacion he
                INNER JOIN empleados emp ON emp.id_empleado = he.id_empleado
                LEFT JOIN empleados ev ON ev.id_empleado = he.id_evaluador
                WHERE he.id_empleado = ?
                ORDER BY he.fecha_evaluacion DESC
            ";
            $stmt = $this->db->prepare($sql);
            if (!$stmt) {
                throw new Exception('Error al preparar consulta: ' . $this->db->error);
            }
            $stmt->bind_param('i', $employeeId);
            $stmt->execute();
            $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            $stmt->close();

            echo json_encode(["success" => true, "data" => $rows]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Error al obtener evaluaciones HSEQ del empleado", "error" => $e->getMessage()]);
        }
    }

    /**
     * Obtiene los datos detallados de una evaluación HSEQ específica
     */
    public function getHseqEvaluationDetails($hseqEvaluationId) {
        try {
            // Obtener información básica de la evaluación
            $sql = "
                SELECT he.id_hseq_evaluacion,
                       he.id_empleado,
                       emp.nombre AS empleado_nombre,
                       he.periodo_evaluacion,
                       he.estado AS estado_evaluacion,
                       he.fecha_evaluacion,
                       he.id_evaluador AS evaluador_id,
                       ev.nombre AS evaluador_nombre,
                       he.promedio_hseq
                FROM hseq_evaluacion he
                INNER JOIN empleados emp ON emp.id_empleado = he.id_empleado
                LEFT JOIN empleados ev ON ev.id_empleado = he.id_evaluador
                WHERE he.id_hseq_evaluacion = ?
            ";
            $stmt = $this->db->prepare($sql);
            if (!$stmt) {
                throw new Exception('Error al preparar consulta: ' . $this->db->error);
            }
            $stmt->bind_param('i', $hseqEvaluationId);
            $stmt->execute();
            $evaluacion = $stmt->get_result()->fetch_assoc();
            $stmt->close();

            if (!$evaluacion) {
                throw new Exception('Evaluación HSEQ no encontrada');
            }

            // Obtener criterios de la evaluación
            $sqlCriterios = "
                SELECT hei.id_item,
                       hei.id_responsabilidad,
                       hei.responsabilidad,
                       1 AS peso,
                       hei.calificacion,
                       hei.justificacion AS observaciones,
                       hei.calificacion AS puntuacion
                FROM hseq_evaluacion_items hei
                WHERE hei.id_hseq_evaluacion = ?
                ORDER BY hei.id_item
            ";
            $stmtCriterios = $this->db->prepare($sqlCriterios);
            if (!$stmtCriterios) {
                throw new Exception('Error al preparar consulta de criterios: ' . $this->db->error);
            }
            $stmtCriterios->bind_param('i', $hseqEvaluationId);
            $stmtCriterios->execute();
            $criterios = $stmtCriterios->get_result()->fetch_all(MYSQLI_ASSOC);
            $stmtCriterios->close();

            // Calcular totales
            $totalPuntos = 0;
            $totalPeso = 0;
            foreach ($criterios as $criterio) {
                $totalPuntos += $criterio['calificacion'];
                $totalPeso += $criterio['peso'];
            }
            $promedioFinal = $totalPeso > 0 ? ($totalPuntos / $totalPeso) : 0;

            $resultado = [
                'id_hseq_evaluacion' => $evaluacion['id_hseq_evaluacion'],
                'id_empleado' => $evaluacion['id_empleado'],
                'empleado_nombre' => $evaluacion['empleado_nombre'],
                'periodo_evaluacion' => $evaluacion['periodo_evaluacion'],
                'estado_evaluacion' => $evaluacion['estado_evaluacion'],
                'fecha_evaluacion' => $evaluacion['fecha_evaluacion'],
                'evaluador_id' => $evaluacion['evaluador_id'],
                'evaluador_nombre' => $evaluacion['evaluador_nombre'],
                'promedio_hseq' => $evaluacion['promedio_hseq'],
                'criterios' => $criterios,
                'total_puntos' => round($totalPuntos, 2),
                'total_peso' => $totalPeso,
                'promedio_final' => round($promedioFinal, 2)
            ];

            echo json_encode(["success" => true, "data" => $resultado]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Error al obtener detalles de la evaluación HSEQ", "error" => $e->getMessage()]);
        }
    }

    /**
     * Guarda datos de mejoramiento
     */
    private function saveMejoramiento($evaluationId, $mejoramiento) {
        $stmt = $this->db->prepare("
            INSERT INTO evaluacion_mejoramiento 
            (id_evaluacion, fortalezas, aspectos_mejorar, comentarios_jefe) 
            VALUES (?, ?, ?, ?)
        ");
        if (!$stmt) {
            throw new Exception('Error al preparar INSERT mejoramiento: ' . $this->db->error);
        }
        $fortalezas = $mejoramiento['fortalezas'] ?? '';
        $aspectosMejorar = $mejoramiento['aspectosMejorar'] ?? '';
        $comentariosJefe = $mejoramiento['comentariosJefe'] ?? '';
        $stmt->bind_param('isss', 
            $evaluationId,
            $fortalezas,
            $aspectosMejorar,
            $comentariosJefe
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
            (id_evaluacion, actividad, responsable, seguimiento, fecha, comentarios_jefe) 
            VALUES (?, ?, ?, ?, ?, ?)
        ");
        $actividad = $planAccion['actividad'] ?? '';
        $responsable = $planAccion['responsable'] ?? '';
        $seguimiento = $planAccion['seguimiento'] ?? '';
        $fecha = $planAccion['fecha'] ?? '';
        $comentariosJefe = $planAccion['comentariosJefe'] ?? '';
        $stmt->bind_param('isssss', 
            $evaluationId,
            $actividad,
            $responsable,
            $seguimiento,
            $fecha,
            $comentariosJefe
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
            (id_evaluacion, id_responsabilidad, responsabilidad, calificacion, evaluacion_jefe) 
            VALUES (?, ?, ?, ?, ?)
        ");
        
        foreach ($hseqData as $hseq) {
            $id = $hseq['id'] ?? 0;
            $responsabilidad = $hseq['responsabilidad'] ?? '';
            $calificacion = $hseq['calificacion'] ?? '';
            $evaluacionJefe = $hseq['evaluacionJefe'] ?? '';
            $stmt->bind_param('iisss', 
                $evaluationId,
                $id,
                $responsabilidad,
                $calificacion,
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
     * Genera y descarga un PDF de una evaluación HSEQ independiente
     */
    public function downloadHseqPDF($hseqEvalId) {
        try {
            // Traer maestro HSEQ
            $stmt = $this->db->prepare("SELECT he.*, emp.nombre AS empleado_nombre, emp.cargo AS empleado_cargo, emp.area AS empleado_area, ev.nombre AS evaluador_nombre FROM hseq_evaluacion he INNER JOIN empleados emp ON emp.id_empleado = he.id_empleado LEFT JOIN empleados ev ON ev.id_empleado = he.id_evaluador WHERE he.id_hseq_evaluacion = ?");
            $stmt->bind_param('i', $hseqEvalId);
            $stmt->execute();
            $hseq = $stmt->get_result()->fetch_assoc();
            $stmt->close();

            if (!$hseq) {
                http_response_code(404);
                echo json_encode(["success" => false, "message" => "HSEQ no encontrada"]);
                return;
            }

            // Traer items
            $stmt2 = $this->db->prepare("SELECT * FROM hseq_evaluacion_items WHERE id_hseq_evaluacion = ? ORDER BY id_responsabilidad");
            $stmt2->bind_param('i', $hseqEvalId);
            $stmt2->execute();
            $items = $stmt2->get_result()->fetch_all(MYSQLI_ASSOC);
            $stmt2->close();

            $html = $this->generateHseqHTML($hseq, $items);

            $this->generatePDF($html);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Error al generar PDF HSEQ", "error" => $e->getMessage()]);
        }
    }

    /**
     * Genera y descarga un PDF de evaluación HSEQ por empleado y período
     */
    public function downloadHseqPDFByEmployee($employeeId, $periodo = null) {
        try {
            // Si no se proporciona período, usar el actual
            if (!$periodo) {
                $periodo = date('Y-m');
            }

            // Buscar evaluación HSEQ del empleado para el período
            $stmt = $this->db->prepare("
                SELECT he.*, emp.nombre AS empleado_nombre, emp.cargo AS empleado_cargo, 
                       emp.area AS empleado_area, emp.cedula AS empleado_cedula,
                       ev.nombre AS evaluador_nombre, ev.cargo AS evaluador_cargo
                FROM hseq_evaluacion he 
                INNER JOIN empleados emp ON emp.id_empleado = he.id_empleado 
                LEFT JOIN empleados ev ON ev.id_empleado = he.id_evaluador 
                WHERE he.id_empleado = ? AND he.periodo_evaluacion = ?
                ORDER BY he.fecha_evaluacion DESC 
                LIMIT 1
            ");
            $stmt->bind_param('is', $employeeId, $periodo);
            $stmt->execute();
            $hseq = $stmt->get_result()->fetch_assoc();
            $stmt->close();

            if (!$hseq) {
                http_response_code(404);
                echo json_encode(["success" => false, "message" => "No se encontró evaluación HSEQ para el empleado en el período especificado"]);
                return;
            }

            // Traer items HSEQ
            $stmt2 = $this->db->prepare("SELECT * FROM hseq_evaluacion_items WHERE id_hseq_evaluacion = ? ORDER BY id_responsabilidad");
            $stmt2->bind_param('i', $hseq['id_hseq_evaluacion']);
            $stmt2->execute();
            $items = $stmt2->get_result()->fetch_all(MYSQLI_ASSOC);
            $stmt2->close();

            $html = $this->generateHseqHTML($hseq, $items);

            $this->generatePDF($html);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Error al generar PDF HSEQ", "error" => $e->getMessage()]);
        }
    }

    /**
     * Genera y descarga un Excel/CSV de una evaluación HSEQ independiente
     */
    public function downloadHseqExcel($hseqEvalId) {
        try {
            $stmt = $this->db->prepare("SELECT he.*, emp.nombre AS empleado_nombre, emp.cargo AS empleado_cargo, emp.area AS empleado_area, ev.nombre AS evaluador_nombre FROM hseq_evaluacion he INNER JOIN empleados emp ON emp.id_empleado = he.id_empleado LEFT JOIN empleados ev ON ev.id_empleado = he.id_evaluador WHERE he.id_hseq_evaluacion = ?");
            $stmt->bind_param('i', $hseqEvalId);
            $stmt->execute();
            $hseq = $stmt->get_result()->fetch_assoc();
            $stmt->close();

            if (!$hseq) {
                http_response_code(404);
                echo json_encode(["success" => false, "message" => "HSEQ no encontrada"]);
                return;
            }

            $stmt2 = $this->db->prepare("SELECT * FROM hseq_evaluacion_items WHERE id_hseq_evaluacion = ? ORDER BY id_responsabilidad");
            $stmt2->bind_param('i', $hseqEvalId);
            $stmt2->execute();
            $items = $stmt2->get_result()->fetch_all(MYSQLI_ASSOC);
            $stmt2->close();

            // XLSX si está PhpSpreadsheet
            if (class_exists('\\PhpOffice\\PhpSpreadsheet\\Spreadsheet')) {
                $spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
                $sheet = $spreadsheet->getActiveSheet();
                $sheet->setTitle('HSEQ');

                $row = 1;
                $sheet->setCellValue('A'.$row, 'EVALUACIÓN HSEQ'); $row += 2;
                $sheet->setCellValue('A'.$row, 'Empleado'); $sheet->setCellValue('B'.$row, (string)($hseq['empleado_nombre'] ?? '')); $row++;
                $sheet->setCellValue('A'.$row, 'Cargo'); $sheet->setCellValue('B'.$row, (string)($hseq['empleado_cargo'] ?? '')); $row++;
                $sheet->setCellValue('A'.$row, 'Área'); $sheet->setCellValue('B'.$row, (string)($hseq['empleado_area'] ?? '')); $row++;
                $sheet->setCellValue('A'.$row, 'Período'); $sheet->setCellValue('B'.$row, (string)($hseq['periodo_evaluacion'] ?? '')); $row++;
                $sheet->setCellValue('A'.$row, 'Evaluador HSEQ'); $sheet->setCellValue('B'.$row, (string)($hseq['evaluador_nombre'] ?? '')); $row++;
                $sheet->setCellValue('A'.$row, 'Promedio HSEQ'); $sheet->setCellValue('B'.$row, (string)($hseq['promedio_hseq'] ?? '0')); $row += 2;

                $sheet->fromArray(['ID Resp.', 'Responsabilidad', 'Calificación', 'Justificación'], NULL, 'A'.$row);
                $row++;
                foreach ($items as $it) {
                    $sheet->setCellValue('A'.$row, (string)($it['id_responsabilidad'] ?? ''));
                    $sheet->setCellValue('B'.$row, (string)($it['responsabilidad'] ?? ''));
                    $sheet->setCellValue('C'.$row, (string)($it['calificacion'] ?? ''));
                    $sheet->setCellValue('D'.$row, (string)($it['justificacion'] ?? ''));
                    $row++;
                }

                header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                header('Content-Disposition: attachment; filename="hseq_'.$hseqEvalId.'.xlsx"');
                header('Cache-Control: max-age=0');
                $writer = new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($spreadsheet);
                $writer->save('php://output');
                return;
            }

            // CSV fallback
            $filename = 'hseq_'.$hseqEvalId.'.csv';
            header('Content-Type: text/csv; charset=UTF-8');
            header('Content-Disposition: attachment; filename="'.$filename.'"');
            $out = fopen('php://output', 'w');
            fprintf($out, chr(0xEF).chr(0xBB).chr(0xBF));
            fputcsv($out, ['EVALUACIÓN HSEQ']);
            fputcsv($out, []);
            fputcsv($out, ['Empleado', (string)($hseq['empleado_nombre'] ?? '')]);
            fputcsv($out, ['Cargo', (string)($hseq['empleado_cargo'] ?? '')]);
            fputcsv($out, ['Área', (string)($hseq['empleado_area'] ?? '')]);
            fputcsv($out, ['Período', (string)($hseq['periodo_evaluacion'] ?? '')]);
            fputcsv($out, ['Evaluador HSEQ', (string)($hseq['evaluador_nombre'] ?? '')]);
            fputcsv($out, ['Promedio HSEQ', (string)($hseq['promedio_hseq'] ?? '0')]);
            fputcsv($out, []);
            fputcsv($out, ['ID Resp.', 'Responsabilidad', 'Calificación', 'Justificación']);
            foreach ($items as $it) {
                fputcsv($out, [
                    (string)($it['id_responsabilidad'] ?? ''),
                    (string)($it['responsabilidad'] ?? ''),
                    (string)($it['calificacion'] ?? ''),
                    (string)($it['justificacion'] ?? ''),
                ]);
            }
            fclose($out);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Error al generar Excel HSEQ", "error" => $e->getMessage()]);
        }
    }

    /**
     * Genera HTML para HSEQ independiente
     */
    private function generateHseqHTML($hseq, $items) {
        $empleado = $hseq['empleado_nombre'] ?? '';
        $cargo = $hseq['empleado_cargo'] ?? '';
        $area = $hseq['empleado_area'] ?? '';
        $periodo = $hseq['periodo_evaluacion'] ?? '';
        $evaluador = $hseq['evaluador_nombre'] ?? '';
        $promedio = $hseq['promedio_hseq'] ?? 0;

        $html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Evaluación HSEQ</title>
        <style>body{font-family:Arial,sans-serif;margin:20px}.header{text-align:center;margin-bottom:20px}.section{margin-bottom:18px}.section h3{background:#f0f0f0;padding:8px;margin:0}.section-content{padding:12px;border:1px solid #ddd}table{width:100%;border-collapse:collapse;margin:10px 0}th,td{border:1px solid #ddd;padding:8px;text-align:left}th{background:#f2f2f2}.prom{font-weight:700;color:#1F3B73}</style>
        </head><body>';
        $html .= '<div class="header"><h1>EVALUACIÓN HSEQ</h1></div>';
        $html .= '<div class="section"><h3>DATOS</h3><div class="section-content">'
               . '<p><strong>Empleado:</strong> '.htmlspecialchars($empleado).'</p>'
               . '<p><strong>Cargo:</strong> '.htmlspecialchars($cargo).'</p>'
               . '<p><strong>Área:</strong> '.htmlspecialchars($area).'</p>'
               . '<p><strong>Período:</strong> '.htmlspecialchars($periodo).'</p>'
               . '<p><strong>Evaluador HSEQ:</strong> '.htmlspecialchars($evaluador).'</p>'
               . '<p><strong>Promedio HSEQ:</strong> <span class="prom">'.htmlspecialchars((string)$promedio).'</span></p>'
               . '</div></div>';

        $html .= '<div class="section"><h3>RESPONSABILIDADES</h3><div class="section-content"><table><tr><th>ID</th><th>Responsabilidad</th><th>Calificación</th><th>Justificación</th></tr>';
        foreach ($items as $it) {
            $html .= '<tr>'
                  . '<td>'.htmlspecialchars((string)($it['id_responsabilidad'] ?? '')).'</td>'
                  . '<td>'.htmlspecialchars($it['responsabilidad'] ?? '').'</td>'
                  . '<td>'.htmlspecialchars((string)($it['calificacion'] ?? '')).'</td>'
                  . '<td>'.htmlspecialchars($it['justificacion'] ?? '').'</td>'
                  . '</tr>';
        }
        $html .= '</table></div></div>';
        $html .= '</body></html>';
        return $html;
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

    /**
     * Obtiene una evaluación completa con todos sus datos incluyendo firmas
     */
    public function getEvaluationComplete($evaluationId, $employeeId) {
        try {
            // Verificar que la evaluación pertenece al empleado y obtener todos los datos del empleado
            $stmt = $this->db->prepare("
                SELECT e.id_evaluacion, e.fecha_evaluacion, e.periodo_evaluacion, e.observaciones_generales, e.estado_evaluacion, e.fecha_creacion, e.fecha_actualizacion,
                       emp.id_empleado, emp.cedula, emp.nombre, emp.tipo_documento, emp.cargo, emp.area, emp.fecha_inicio_contrato, 
                       emp.email, 
                       emp.proyecto, emp.ods, emp.rol
                FROM evaluacion e 
                JOIN empleados emp ON e.id_empleado = emp.id_empleado 
                WHERE e.id_evaluacion = ? AND e.id_empleado = ?
            ");
            $stmt->bind_param('ii', $evaluationId, $employeeId);
            $stmt->execute();
            $evaluacion = $stmt->get_result()->fetch_assoc();
            $stmt->close();
            

            if (!$evaluacion) {
                http_response_code(404);
                echo json_encode([
                    'success' => false,
                    'message' => 'Evaluación no encontrada o no autorizada'
                ]);
                return;
            }

            // Obtener datos del jefe inmediato
            $jefeData = null;
            if ($evaluacion['id_jefe']) {
                $stmtJefe = $this->db->prepare("
                    SELECT id_empleado, nombre, cargo, area 
                    FROM empleados 
                    WHERE id_empleado = ?
                ");
                $stmtJefe->bind_param('i', $evaluacion['id_jefe']);
                $stmtJefe->execute();
                $jefeData = $stmtJefe->get_result()->fetch_assoc();
                $stmtJefe->close();
            }

            // Obtener firmas y convertirlas a base64
            $firmas = $this->getFirmas($evaluationId);
            $firmasBase64 = [];
            
            if ($firmas) {
                // Convertir firma del empleado a base64
                if (!empty($firmas['firma_empleado'])) {
                    $firmaPath = __DIR__ . '/../' . $firmas['firma_empleado'];
                    if (file_exists($firmaPath)) {
                        // Detectar automáticamente el tipo de imagen
                        $imageInfo = getimagesize($firmaPath);
                        $mimeType = $imageInfo ? $imageInfo['mime'] : 'image/png';
                        $firmasBase64['firma_empleado'] = 'data:' . $mimeType . ';base64,' . base64_encode(file_get_contents($firmaPath));
                    }
                }
                
                // Convertir firma del jefe a base64
                if (!empty($firmas['firma_jefe'])) {
                    $firmaPath = __DIR__ . '/../' . $firmas['firma_jefe'];
                    if (file_exists($firmaPath)) {
                        // Detectar automáticamente el tipo de imagen
                        $imageInfo = getimagesize($firmaPath);
                        $mimeType = $imageInfo ? $imageInfo['mime'] : 'image/png';
                        $firmasBase64['firma_jefe'] = 'data:' . $mimeType . ';base64,' . base64_encode(file_get_contents($firmaPath));
                    }
                }
            }

            // Obtener todos los datos relacionados
            $evaluacionCompleta = [
                'empleado' => [
                    'id_empleado' => $evaluacion['id_empleado'],
                    'cedula' => $evaluacion['cedula'],
                    'nombre' => $evaluacion['nombre'],
                    'tipo_documento' => $evaluacion['tipo_documento'],
                    'cargo' => $evaluacion['cargo'],
                    'area' => $evaluacion['area'],
                    'fecha_inicio_contrato' => $evaluacion['fecha_inicio_contrato'],
                    'email' => $evaluacion['email'],
                    'proyecto' => $evaluacion['proyecto'],
                    'ods' => $evaluacion['ods'],
                    'rol' => $evaluacion['rol']
                ],
                'evaluacion' => [
                    'id_evaluacion' => $evaluacion['id_evaluacion'],
                    'fecha_evaluacion' => $evaluacion['fecha_evaluacion'],
                    'periodo_evaluacion' => $evaluacion['periodo_evaluacion'],
                    'estado_evaluacion' => $evaluacion['estado_evaluacion']
                ],
                'datos_generales' => [
                    'fecha_ingreso' => $evaluacion['fecha_inicio_contrato'] ?? '',
                    'nombreEvaluador' => $jefeData ? $jefeData['nombre'] : '',
                    'cargoEvaluador' => $jefeData ? $jefeData['cargo'] : '',
                    'areaEvaluador' => $jefeData ? $jefeData['area'] : '',
                    'idEvaluador' => $jefeData ? $jefeData['id_empleado'] : ''
                ],
                'mejoramiento' => $this->getMejoramiento($evaluationId),
                'plan_accion' => $this->getPlanAccion($evaluationId),
                'hseq_data' => $this->getHseqData($evaluationId),
                'competencias' => $this->getCompetencias($evaluationId),
                'promedios' => $this->getPromedios($evaluationId),
                'firmas' => $firmasBase64
            ];

            
            echo json_encode([
                'success' => true,
                'data' => $evaluacionCompleta
            ], JSON_UNESCAPED_UNICODE);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error al obtener la evaluación completa',
                'error' => $e->getMessage(),
            ], JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * Obtiene evaluaciones con datos completos para mostrar en resultados
     */
    public function getEmployeeEvaluationsWithDetails($employeeId) {
        try {
            // Verificar que el empleado existe
            $stmt = $this->db->prepare("SELECT * FROM empleados WHERE id_empleado = ?");
            $stmt->bind_param('i', $employeeId);
            $stmt->execute();
            $employee = $stmt->get_result()->fetch_assoc();
            $stmt->close();

            if (!$employee) {
                http_response_code(404);
                echo json_encode([
                    'success' => false,
                    'message' => 'Empleado no encontrado'
                ]);
                return;
            }

            // Obtener evaluaciones básicas
            $stmt = $this->db->prepare("
                SELECT e.*, emp.nombre, emp.cargo, emp.area 
                FROM evaluacion e 
                JOIN empleados emp ON e.id_empleado = emp.id_empleado 
                WHERE e.id_empleado = ? 
                ORDER BY e.fecha_evaluacion DESC
            ");
            $stmt->bind_param('i', $employeeId);
            $stmt->execute();
            $evaluaciones = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            $stmt->close();

            // Para cada evaluación, obtener los datos completos
            $evaluacionesCompletas = [];
            foreach ($evaluaciones as $evaluacion) {
                $evaluacionId = $evaluacion['id_evaluacion'];
                
                // Obtener promedios
                $promedios = $this->getPromedios($evaluacionId);
                
                // Crear objeto de evaluación con datos resumidos
                $evaluacionCompleta = [
                    'id_evaluacion' => $evaluacionId,
                    'fecha_evaluacion' => $evaluacion['fecha_evaluacion'],
                    'periodo_evaluacion' => $evaluacion['periodo_evaluacion'],
                    'estado_evaluacion' => $evaluacion['estado_evaluacion'],
                    'empleado' => [
                        'nombre' => $evaluacion['nombre'],
                        'cargo' => $evaluacion['cargo'],
                        'area' => $evaluacion['area']
                    ],
                    'promedios' => $promedios
                ];
                
                $evaluacionesCompletas[] = $evaluacionCompleta;
            }

            echo json_encode([
                'success' => true,
                'evaluaciones' => $evaluacionesCompletas,
                'total' => count($evaluacionesCompletas)
            ], JSON_UNESCAPED_UNICODE);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error al obtener las evaluaciones',
                'error' => $e->getMessage(),
            ], JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * Genera y descarga un PDF de la evaluación
     */
    public function downloadEvaluationPDF($evaluationId, $employeeId) {
        try {
            // Verificar que la evaluación pertenece al empleado
            $stmt = $this->db->prepare("
                SELECT e.*, emp.nombre, emp.cargo, emp.area 
                FROM evaluacion e 
                JOIN empleados emp ON e.id_empleado = emp.id_empleado 
                WHERE e.id_evaluacion = ? AND e.id_empleado = ?
            ");
            $stmt->bind_param('ii', $evaluationId, $employeeId);
            $stmt->execute();
            $evaluacion = $stmt->get_result()->fetch_assoc();
            $stmt->close();

            if (!$evaluacion) {
                http_response_code(404);
                echo json_encode([
                    'success' => false,
                    'message' => 'Evaluación no encontrada o no autorizada'
                ]);
                return;
            }

            // Obtener todos los datos de la evaluación
            $evaluacionCompleta = [
                'evaluacion' => $evaluacion,
                'mejoramiento' => $this->getMejoramiento($evaluationId),
                'plan_accion' => $this->getPlanAccion($evaluationId),
                'hseq_data' => $this->getHseqData($evaluationId),
                'competencias' => $this->getCompetencias($evaluationId),
                'promedios' => $this->getPromedios($evaluationId),
                'firmas' => $this->getFirmas($evaluationId)
            ];

            // Generar HTML para el PDF
            $html = $this->generateEvaluationHTML($evaluacionCompleta);

            // Generar PDF usando TCPDF (necesitarás instalar la librería)
            $this->generatePDF($html);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error al generar el PDF',
                'error' => $e->getMessage(),
            ], JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * Genera y descarga un Excel (XLSX o CSV fallback) de la evaluación
     * Incluye SIEMPRE los datos del empleado con alias para evitar campos vacíos.
     */
    public function downloadEvaluationExcel($evaluationId, $employeeId) {
        try {
            // Verificar que la evaluación pertenece al empleado y traer datos con ALIAS
            $stmt = $this->db->prepare("
                SELECT 
                    e.*,
                    emp.cedula                           AS empleado_cedula,
                    emp.nombre                           AS empleado_nombre,
                    emp.tipo_documento                   AS empleado_tipo_documento,
                    emp.cargo                            AS empleado_cargo,
                    emp.area                             AS empleado_area,
                    emp.email                            AS empleado_email,
                    emp.fecha_inicio_contrato            AS empleado_fecha_inicio_contrato,
                    emp.proyecto                         AS empleado_proyecto,
                    emp.ods                              AS empleado_ods,
                    emp.rol                              AS empleado_rol
                FROM evaluacion e
                JOIN empleados emp ON e.id_empleado = emp.id_empleado
                WHERE e.id_evaluacion = ? AND e.id_empleado = ?
            ");
            $stmt->bind_param('ii', $evaluationId, $employeeId);
            $stmt->execute();
            $evaluacion = $stmt->get_result()->fetch_assoc();
            $stmt->close();

            if (!$evaluacion) {
                http_response_code(404);
                echo json_encode([
                    'success' => false,
                    'message' => 'Evaluación no encontrada o no autorizada'
                ], JSON_UNESCAPED_UNICODE);
                return;
            }

            // Traer demás datos
            $promedios     = $this->getPromedios($evaluationId) ?: [];
            $competencias  = $this->getCompetencias($evaluationId) ?: [];
            $hseqData      = $this->getHseqData($evaluationId) ?: [];
            $mejoramiento  = $this->getMejoramiento($evaluationId) ?: [];
            $planAccion    = $this->getPlanAccion($evaluationId) ?: [];

            // Normaliza campos del empleado (con fallback "N/D")
            $emp = [
                'Nombre'            => $evaluacion['empleado_nombre']            ?? 'N/D',
                'Cédula'            => $evaluacion['empleado_cedula']            ?? 'N/D',
                'Tipo documento'    => $evaluacion['empleado_tipo_documento']    ?? 'N/D',
                'Cargo'             => $evaluacion['empleado_cargo']             ?? 'N/D',
                'Área'              => $evaluacion['empleado_area']              ?? 'N/D',
                'Email'             => $evaluacion['empleado_email']             ?? 'N/D',
                'Fecha inicio'      => $evaluacion['empleado_fecha_inicio_contrato'] ?? 'N/D',
                'Proyecto'          => $evaluacion['empleado_proyecto']          ?? 'N/D',
                'ODS'               => $evaluacion['empleado_ods']               ?? 'N/D',
                'Rol'               => $evaluacion['empleado_rol']               ?? 'N/D',
            ];

            // Datos de evaluación
            $eval = [
                'ID Evaluación'     => $evaluacion['id_evaluacion'] ?? 'N/D',
                'Fecha evaluación'  => !empty($evaluacion['fecha_evaluacion']) ? date('d/m/Y', strtotime($evaluacion['fecha_evaluacion'])) : 'N/D',
                'Período'           => $evaluacion['periodo_evaluacion'] ?? 'N/D',
                'Estado'            => $evaluacion['estado_evaluacion'] ?? 'N/D',
            ];

            // Intentar XLSX con PhpSpreadsheet, de lo contrario CSV
            if (class_exists('\PhpOffice\PhpSpreadsheet\Spreadsheet')) {
                $spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();

                // -------- Hoja Resumen --------
                $sheet = $spreadsheet->getActiveSheet();
                $sheet->setTitle('Resumen');

                $row = 1;
                $sheet->setCellValue('A'.$row, 'EVALUACIÓN DE DESEMPEÑO - MERIDIAN CONSULTING LTDA'); $row += 2;

                // Bloque Empleado
                $sheet->setCellValue('A'.$row, 'DATOS DEL EMPLEADO'); $row++;
                foreach ($emp as $k => $v) {
                    $sheet->setCellValue('A'.$row, $k);
                    $sheet->setCellValue('B'.$row, (string)$v);
                    $row++;
                }
                $row++;

                // Bloque Evaluación
                $sheet->setCellValue('A'.$row, 'DATOS DE LA EVALUACIÓN'); $row++;
                foreach ($eval as $k => $v) {
                    $sheet->setCellValue('A'.$row, $k);
                    $sheet->setCellValue('B'.$row, (string)$v);
                    $row++;
                }
                $row++;

                // Resumen de calificaciones
                if (!empty($promedios)) {
                    $sheet->setCellValue('A'.$row, 'RESUMEN DE CALIFICACIONES'); $row++;
                    $sheet->setCellValue('A'.$row, 'Promedio Competencias');
                    $sheet->setCellValue('B'.$row, $promedios['promedio_competencias'] ?? 0); $row++;
                    $sheet->setCellValue('A'.$row, 'Promedio HSEQ');
                    $sheet->setCellValue('B'.$row, $promedios['promedio_hseq'] ?? 0); $row++;
                    $sheet->setCellValue('A'.$row, 'Promedio General');
                    $sheet->setCellValue('B'.$row, $promedios['promedio_general'] ?? 0); $row += 2;

                    // Por apartado (si existen)
                    $labels = [
                        'promedio_comunicacion_efectiva'        => 'Comunicación efectiva',
                        'promedio_instrumentalidad_decisiones'  => 'Instrumentalidad de decisiones',
                        'promedio_aporte_profesional'           => 'Aporte profesional',
                        'promedio_colaboracion'                  => 'Colaboración',
                        'promedio_relaciones_interpersonales'   => 'Relaciones interpersonales',
                        'promedio_gestion_procedimientos'       => 'Gestión de procedimientos',
                        'promedio_cumplimiento_funciones'       => 'Cumplimiento de funciones del cargo',
                    ];
                    $sheet->setCellValue('A'.$row, 'Promedios por apartado'); $row++;
                    foreach ($labels as $key => $label) {
                        if (isset($promedios[$key])) {
                            $sheet->setCellValue('A'.$row, $label);
                            $sheet->setCellValue('B'.$row, $promedios[$key]);
                            $row++;
                        }
                    }
                    $row++;
                }

                // Mejoramiento y Plan de Acción (si existen)
                if (!empty($mejoramiento)) {
                    $sheet->setCellValue('A'.$row, 'MEJORAMIENTO Y DESARROLLO'); $row++;
                    $sheet->setCellValue('A'.$row, 'Fortalezas'); 
                    $sheet->setCellValue('B'.$row, (string)($mejoramiento['fortalezas'] ?? ''));
                    $row++;
                    $sheet->setCellValue('A'.$row, 'Aspectos a Mejorar'); 
                    $sheet->setCellValue('B'.$row, (string)($mejoramiento['aspectos_mejorar'] ?? ($mejoramiento['aspectosMejorar'] ?? '')));
                    $row += 2;
                }
                if (!empty($planAccion)) {
                    $sheet->setCellValue('A'.$row, 'PLAN DE ACCIÓN'); $row++;
                    $sheet->setCellValue('A'.$row, 'Actividad');   $sheet->setCellValue('B'.$row, (string)($planAccion['actividad'] ?? '')); $row++;
                    $sheet->setCellValue('A'.$row, 'Responsable'); $sheet->setCellValue('B'.$row, (string)($planAccion['responsable'] ?? '')); $row++;
                    $sheet->setCellValue('A'.$row, 'Seguimiento'); $sheet->setCellValue('B'.$row, (string)($planAccion['seguimiento'] ?? '')); $row++;
                    $sheet->setCellValue('A'.$row, 'Fecha');       $sheet->setCellValue('B'.$row, (string)($planAccion['fecha'] ?? '')); $row++;
                }

                // -------- Hoja Competencias --------
                $sheet2 = $spreadsheet->createSheet();
                $sheet2->setTitle('Competencias');
                $sheet2->fromArray(['Aspecto', 'Calificación Empleado', 'Calificación Jefe', 'Promedio'], NULL, 'A1');
                $r = 2;
                foreach ($competencias as $c) {
                    $sheet2->setCellValue('A'.$r, (string)($c['aspecto'] ?? ''));
                    $sheet2->setCellValue('B'.$r, (string)($c['calificacion_empleado'] ?? ''));
                    $sheet2->setCellValue('C'.$r, (string)($c['calificacion_jefe'] ?? ''));
                    $sheet2->setCellValue('D'.$r, (string)($c['promedio'] ?? ''));
                    $r++;
                }

                // -------- Hoja HSEQ --------
                $sheet3 = $spreadsheet->createSheet();
                $sheet3->setTitle('HSEQ');
                $sheet3->fromArray(['ID Resp.', 'Responsabilidad', 'Calificación', 'Evaluación Jefe'], NULL, 'A1');
                $r = 2;
                foreach ($hseqData as $h) {
                    $sheet3->setCellValue('A'.$r, (string)($h['id_responsabilidad'] ?? ''));
                    $sheet3->setCellValue('B'.$r, (string)($h['responsabilidad'] ?? ''));
                    $sheet3->setCellValue('C'.$r, (string)($h['calificacion'] ?? ''));
                    $sheet3->setCellValue('D'.$r, (string)($h['evaluacion_jefe'] ?? ''));
                    $r++;
                }

                // Salida XLSX
                header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                header('Content-Disposition: attachment; filename="evaluacion_'.$evaluationId.'.xlsx"');
                header('Cache-Control: max-age=0');

                $writer = new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($spreadsheet);
                $writer->save('php://output');
                return;

            } else {
                // Fallback a CSV simple (una sola hoja "Resumen" con los datos del empleado y evaluación)
                $filename = 'evaluacion_'.$evaluationId.'.csv';
                header('Content-Type: text/csv; charset=UTF-8');
                header('Content-Disposition: attachment; filename="'.$filename.'"');
                $out = fopen('php://output', 'w');

                // BOM para Excel en Windows
                fprintf($out, chr(0xEF).chr(0xBB).chr(0xBF));

                fputcsv($out, ['EVALUACIÓN DE DESEMPEÑO - MERIDIAN CONSULTING LTDA']);
                fputcsv($out, []);
                fputcsv($out, ['DATOS DEL EMPLEADO']);
                foreach ($emp as $k => $v) {
                    fputcsv($out, [$k, $v]);
                }
                fputcsv($out, []);
                fputcsv($out, ['DATOS DE LA EVALUACIÓN']);
                foreach ($eval as $k => $v) {
                    fputcsv($out, [$k, $v]);
                }
                if (!empty($promedios)) {
                    fputcsv($out, []);
                    fputcsv($out, ['RESUMEN DE CALIFICACIONES']);
                    fputcsv($out, ['Promedio Competencias', $promedios['promedio_competencias'] ?? 0]);
                    fputcsv($out, ['Promedio HSEQ', $promedios['promedio_hseq'] ?? 0]);
                    fputcsv($out, ['Promedio General', $promedios['promedio_general'] ?? 0]);
                }
                fclose($out);
                return;
            }

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error al generar el Excel',
                'error'   => $e->getMessage(),
            ], JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * Genera HTML para la evaluación
     */
    private function generateEvaluationHTML($data) {
        $evaluacion = $data['evaluacion'];
        $promedios = $data['promedios'];
        $competencias = $data['competencias'];
        $hseqData = $data['hseq_data'];
        $mejoramiento = $data['mejoramiento'];
        $planAccion = $data['plan_accion'];

        $html = '
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Evaluación de Desempeño</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .section { margin-bottom: 25px; }
                .section h3 { background-color: #f0f0f0; padding: 10px; margin: 0; }
                .section-content { padding: 15px; border: 1px solid #ddd; }
                table { width: 100%; border-collapse: collapse; margin: 10px 0; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                .promedio { font-weight: bold; color: #2c5aa0; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>EVALUACIÓN DE DESEMPEÑO</h1>
                <h2>MERIDIAN CONSULTING LTDA</h2>
            </div>

            <div class="section">
                <h3>DATOS DEL EMPLEADO</h3>
                <div class="section-content">
                    <p><strong>Nombre:</strong> ' . htmlspecialchars($evaluacion['nombre']) . '</p>
                    <p><strong>Cargo:</strong> ' . htmlspecialchars($evaluacion['cargo']) . '</p>
                    <p><strong>Área:</strong> ' . htmlspecialchars($evaluacion['area']) . '</p>
                    <p><strong>Fecha de Evaluación:</strong> ' . date('d/m/Y', strtotime($evaluacion['fecha_evaluacion'])) . '</p>
                    <p><strong>Período:</strong> ' . htmlspecialchars($evaluacion['periodo_evaluacion']) . '</p>
                </div>
            </div>';

        if ($promedios) {
            $html .= '
            <div class="section">
                <h3>RESUMEN DE CALIFICACIONES</h3>
                <div class="section-content">
                    <table>
                        <tr><th>Concepto</th><th>Calificación</th></tr>
                        <tr><td>Promedio Competencias</td><td class="promedio">' . $promedios['promedio_competencias'] . '</td></tr>
                        <tr><td>Promedio HSEQ</td><td class="promedio">' . $promedios['promedio_hseq'] . '</td></tr>
                        <tr><td>Promedio General</td><td class="promedio">' . $promedios['promedio_general'] . '</td></tr>
                    </table>
                </div>
            </div>';
        }

        if ($competencias && count($competencias) > 0) {
            $html .= '
            <div class="section">
                <h3>COMPETENCIAS</h3>
                <div class="section-content">
                    <table>
                        <tr><th>Aspecto</th><th>Calificación Empleado</th><th>Calificación Jefe</th><th>Promedio</th></tr>';
            
            foreach ($competencias as $competencia) {
                $html .= '<tr>
                    <td>' . htmlspecialchars($competencia['aspecto']) . '</td>
                    <td>' . $competencia['calificacion_empleado'] . '</td>
                    <td>' . $competencia['calificacion_jefe'] . '</td>
                    <td>' . $competencia['promedio'] . '</td>
                </tr>';
            }
            
            $html .= '</table></div></div>';
        }

        if ($mejoramiento) {
            $html .= '
            <div class="section">
                <h3>MEJORAMIENTO Y DESARROLLO</h3>
                <div class="section-content">
                    <p><strong>Fortalezas:</strong><br>' . htmlspecialchars($mejoramiento['fortalezas']) . '</p>
                    <p><strong>Aspectos a Mejorar:</strong><br>' . htmlspecialchars($mejoramiento['aspectos_mejorar']) . '</p>
                </div>
            </div>';
        }

        if ($planAccion) {
            $html .= '
            <div class="section">
                <h3>PLAN DE ACCIÓN</h3>
                <div class="section-content">
                    <p><strong>Actividad:</strong> ' . htmlspecialchars($planAccion['actividad']) . '</p>
                    <p><strong>Responsable:</strong> ' . htmlspecialchars($planAccion['responsable']) . '</p>
                    <p><strong>Seguimiento:</strong> ' . htmlspecialchars($planAccion['seguimiento']) . '</p>
                    <p><strong>Fecha:</strong> ' . htmlspecialchars($planAccion['fecha']) . '</p>
                </div>
            </div>';
        }

        // Sección de firmas con imágenes reales
        $html .= '
            <div class="section">
                <h3>FIRMAS</h3>
                <div class="section-content">';
        
        // Firma del empleado
        if (isset($data['firmas']['firma_empleado']) && !empty($data['firmas']['firma_empleado'])) {
            $firmaEmpleadoPath = __DIR__ . '/../' . $data['firmas']['firma_empleado'];
            if (file_exists($firmaEmpleadoPath)) {
                $html .= '<p><strong>Evaluado:</strong></p>';
                $html .= '<img src="' . $firmaEmpleadoPath . '" style="max-width: 200px; height: auto; border: 1px solid #ccc;" />';
            } else {
                $html .= '<p><strong>Evaluado:</strong> _________________________</p>';
            }
        } else {
            $html .= '<p><strong>Evaluado:</strong> _________________________</p>';
        }
        
        // Firma del jefe
        if (isset($data['firmas']['firma_jefe']) && !empty($data['firmas']['firma_jefe'])) {
            $firmaJefePath = __DIR__ . '/../' . $data['firmas']['firma_jefe'];
            if (file_exists($firmaJefePath)) {
                $html .= '<p><strong>Jefe Directo:</strong></p>';
                $html .= '<img src="' . $firmaJefePath . '" style="max-width: 200px; height: auto; border: 1px solid #ccc;" />';
            } else {
                $html .= '<p><strong>Jefe Directo:</strong> _________________________</p>';
            }
        } else {
            $html .= '<p><strong>Jefe Directo:</strong> _________________________</p>';
        }
        
        $html .= '
                    <p><strong>Fecha:</strong> ' . date('d/m/Y') . '</p>
                </div>
            </div>
        </body>
        </html>';

        return $html;
    }

    /**
     * Guarda una evaluación HSEQ específica
     */
    public function saveHseqEvaluation() {
        try {
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                http_response_code(405);
                echo json_encode(["success" => false, "message" => "Método no permitido"]);
                return;
            }

            // Obtener los datos de la evaluación HSEQ
            $employeeId = $_POST['employeeId'] ?? null;
            $hseqData = json_decode($_POST['hseqData'] ?? '[]', true);
            $promedioHseq = isset($_POST['promedioHseq']) ? (float)$_POST['promedioHseq'] : 0;
            $periodoEvaluacion = $_POST['periodoEvaluacion'] ?? null;
            $evaluatorId = isset($_POST['evaluatorId']) ? (int)$_POST['evaluatorId'] : (isset($_POST['bossId']) ? (int)$_POST['bossId'] : null);

            if (!$employeeId) {
                http_response_code(400);
                echo json_encode(["success" => false, "message" => "ID de empleado no proporcionado"]);
                return;
            }

            if (empty($hseqData)) {
                http_response_code(400);
                echo json_encode(["success" => false, "message" => "Datos HSEQ no proporcionados"]);
                return;
            }

            error_log("Guardando evaluación HSEQ (independiente) - EmployeeId: $employeeId, Periodo: $periodoEvaluacion, Promedio: $promedioHseq");

            // Guardar evaluación HSEQ en tablas dedicadas
            $this->db->begin_transaction();
            try {
                // 1. Insertar maestro HSEQ
                $stmt = $this->db->prepare('INSERT INTO hseq_evaluacion (id_empleado, periodo_evaluacion, promedio_hseq, estado, id_evaluador, fecha_evaluacion) VALUES (?, ?, ?, ?, ?, NOW())');
                if (!$stmt) {
                    throw new Exception('Error al preparar INSERT hseq_evaluacion: ' . $this->db->error);
                }
                $estado = 'COMPLETADA';
                $stmt->bind_param('isdsi', $employeeId, $periodoEvaluacion, $promedioHseq, $estado, $evaluatorId);
                if (!$stmt->execute()) {
                    throw new Exception('Error al ejecutar INSERT hseq_evaluacion: ' . $stmt->error);
                }
                $hseqEvalId = $stmt->insert_id;
                $stmt->close();

                // 2. Insertar items HSEQ
                $stmtItem = $this->db->prepare('INSERT INTO hseq_evaluacion_items (id_hseq_evaluacion, id_responsabilidad, responsabilidad, calificacion, justificacion) VALUES (?, ?, ?, ?, ?)');
                if (!$stmtItem) {
                    throw new Exception('Error al preparar INSERT hseq_evaluacion_items: ' . $this->db->error);
                }
                foreach ($hseqData as $h) {
                    $idResp = isset($h['id']) ? (int)$h['id'] : 0;
                    $resp = $h['responsabilidad'] ?? '';
                    $calif = isset($h['calificacion']) ? (float)$h['calificacion'] : (isset($h['evaluacionJefe']) ? (float)$h['evaluacionJefe'] : null);
                    $just = $h['justificacion'] ?? ($h['justificacionJefe'] ?? null);
                    $stmtItem->bind_param('iisds', $hseqEvalId, $idResp, $resp, $calif, $just);
                    if (!$stmtItem->execute()) {
                        throw new Exception('Error al ejecutar INSERT hseq_evaluacion_items: ' . $stmtItem->error);
                    }
                }
                $stmtItem->close();

                $this->db->commit();

                echo json_encode([
                    'success' => true,
                    'message' => 'Evaluación HSEQ guardada exitosamente',
                    'id_evaluacion' => $hseqEvalId,
                ], JSON_UNESCAPED_UNICODE);
                return;

            } catch (Exception $e) {
                $this->db->rollback();
                error_log('Error en transacción HSEQ (independiente): ' . $e->getMessage());
                http_response_code(500);
                echo json_encode([
                    'success' => false,
                    'message' => 'Error al guardar la evaluación HSEQ',
                    'error' => $e->getMessage(),
                ], JSON_UNESCAPED_UNICODE);
                return;
            }

        } catch (Exception $e) {
            error_log("Error general en saveHseqEvaluation: " . $e->getMessage());
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error general al procesar la evaluación HSEQ',
                'error' => $e->getMessage(),
            ], JSON_UNESCAPED_UNICODE);
            return;
        }
    }

    /**
     * Genera PDF usando TCPDF
     */
    private function generatePDF($html) {
        try {
            // Verificar si TCPDF está disponible
            if (class_exists('TCPDF')) {
                // Asegurar que no haya salida previa y desactivar compresión que pueda interferir
                if (ini_get('zlib.output_compression')) {
                    @ini_set('zlib.output_compression', 'Off');
                }
                while (ob_get_level() > 0) {
                    @ob_end_clean();
                }
                // Crear instancia de TCPDF
                $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
                
                // Configurar documento
                $pdf->SetCreator('Sistema de Evaluación Meridian');
                $pdf->SetAuthor('Meridian Consulting LTDA');
                $pdf->SetTitle('Evaluación de Desempeño');
                $pdf->SetSubject('Reporte de Evaluación');
                
                // Configurar márgenes
                $pdf->SetMargins(15, 15, 15);
                $pdf->SetHeaderMargin(5);
                $pdf->SetFooterMargin(10);
                
                // Configurar auto page breaks
                $pdf->SetAutoPageBreak(TRUE, 25);
                
                // Agregar página
                $pdf->AddPage();
                
                // Escribir HTML
                $pdf->writeHTML($html, true, false, true, false, '');
                
                // Salida del PDF (descarga)
                $pdf->Output('evaluacion_' . date('Y-m-d') . '.pdf', 'D');
            } else {
                // Si TCPDF no está disponible, devolver HTML
                header('Content-Type: text/html; charset=UTF-8');
                echo $html;
            }
        } catch (Exception $e) {
            // En caso de error, devolver HTML
            header('Content-Type: text/html; charset=UTF-8');
            echo $html;
        }
    }

    /**
     * Determina el estado de la evaluación según el flujo de trabajo
     * 1. Autoevaluación del Colaborador
     * 2. Evaluación del Líder Inmediato
     * 3. Evaluación HSEQ Institucional
     */
    private function determinarEstadoEvaluacion($employeeSignaturePath, $bossSignaturePath, $isUpdate = false, $evaluationId = null) {
        // Si es una actualización, verificar el estado actual de la evaluación
        if ($isUpdate) {
            // Obtener el estado actual de la evaluación
            $stmt = $this->db->prepare("SELECT estado_evaluacion FROM evaluacion WHERE id_evaluacion = ?");
            $stmt->bind_param('i', $evaluationId);
            $stmt->execute();
            $result = $stmt->get_result();
            $estadoActual = $result->fetch_assoc()['estado_evaluacion'] ?? 'AUTOEVALUACION_PENDIENTE';
            $stmt->close();

            // Consultar firmas ya existentes en BD para esta evaluación
            $stmtF = $this->db->prepare("SELECT firma_empleado, firma_jefe FROM evaluacion_firmas WHERE id_evaluacion = ?");
            $stmtF->bind_param('i', $evaluationId);
            $stmtF->execute();
            $resF = $stmtF->get_result()->fetch_assoc();
            $stmtF->close();

            $hasEmployeeSignature = !empty($employeeSignaturePath) || (!empty($resF['firma_empleado'] ?? ''));
            $hasBossSignature     = !empty($bossSignaturePath)      || (!empty($resF['firma_jefe'] ?? ''));

            // Lógica de progresión de estados basada en firmas (no retroceder estados)
            if ($hasEmployeeSignature && $hasBossSignature) {
                return 'EVALUACION_JEFE_COMPLETADA'; // 60%
            }
            if ($hasEmployeeSignature && !$hasBossSignature) {
                // Autoevaluación lista, pendiente jefe
                return 'EVALUACION_JEFE_PENDIENTE'; // 40%
            }
            // Sin firma de empleado => pendiente autoevaluación
            return 'AUTOEVALUACION_PENDIENTE'; // 20%
        } else {
            // Para nuevas evaluaciones
            if ($employeeSignaturePath && $bossSignaturePath) {
                return 'EVALUACION_JEFE_COMPLETADA'; // Listo para HSEQ
            } elseif ($employeeSignaturePath) {
                // Para nuevas, se permite marcar autoevaluación como completada
                return 'AUTOEVALUACION_COMPLETADA'; // Pendiente del jefe
            } else {
                return 'AUTOEVALUACION_PENDIENTE'; // Pendiente autoevaluación
            }
        }
    }

    /**
     * Registra un cambio de estado en el historial
     */
    private function registrarCambioEstado($evaluationId, $nuevoEstado, $usuarioId) {
        try {
            // Obtener el estado anterior
            $stmt = $this->db->prepare("SELECT estado_evaluacion FROM evaluacion WHERE id_evaluacion = ?");
            $stmt->bind_param('i', $evaluationId);
            $stmt->execute();
            $result = $stmt->get_result();
            $estadoAnterior = $result->fetch_assoc()['estado_evaluacion'] ?? null;
            $stmt->close();

            // Insertar en el historial
            $stmtHist = $this->db->prepare("INSERT INTO evaluacion_estado_historial (id_evaluacion, estado_anterior, estado_nuevo, id_usuario_cambio) VALUES (?, ?, ?, ?)");
            $stmtHist->bind_param('issi', $evaluationId, $estadoAnterior, $nuevoEstado, $usuarioId);
            $stmtHist->execute();
            $stmtHist->close();

            // Actualizar fechas específicas según el estado
            $this->actualizarFechasEstado($evaluationId, $nuevoEstado);
        } catch (Exception $e) {
            error_log("Error al registrar cambio de estado: " . $e->getMessage());
        }
    }

    /**
     * Registra un cambio de estado en el historial con el estado anterior ya conocido
     */
    private function registrarCambioEstadoConAnterior($evaluationId, $estadoAnterior, $nuevoEstado, $usuarioId) {
        try {
            // Solo registrar si el estado realmente cambió
            if ($estadoAnterior !== $nuevoEstado) {
                // Insertar en el historial
                $stmtHist = $this->db->prepare("INSERT INTO evaluacion_estado_historial (id_evaluacion, estado_anterior, estado_nuevo, id_usuario_cambio) VALUES (?, ?, ?, ?)");
                $stmtHist->bind_param('issi', $evaluationId, $estadoAnterior, $nuevoEstado, $usuarioId);
                $stmtHist->execute();
                $stmtHist->close();
            }

            // Actualizar fechas específicas según el estado
            $this->actualizarFechasEstado($evaluationId, $nuevoEstado);
        } catch (Exception $e) {
            error_log("Error al registrar cambio de estado: " . $e->getMessage());
        }
    }

    /**
     * Actualiza las fechas específicas según el estado de la evaluación
     */
    private function actualizarFechasEstado($evaluationId, $estado) {
        try {
            $campoFecha = null;
            switch ($estado) {
                case 'AUTOEVALUACION_COMPLETADA':
                    $campoFecha = 'fecha_autoevaluacion';
                    break;
                case 'EVALUACION_JEFE_COMPLETADA':
                    $campoFecha = 'fecha_evaluacion_jefe';
                    break;
                case 'HSEQ_COMPLETADA':
                    $campoFecha = 'fecha_evaluacion_hseq';
                    break;
            }

            if ($campoFecha) {
                $stmt = $this->db->prepare("UPDATE evaluacion SET {$campoFecha} = NOW() WHERE id_evaluacion = ?");
                $stmt->bind_param('i', $evaluationId);
                $stmt->execute();
                $stmt->close();
            }
        } catch (Exception $e) {
            error_log("Error al actualizar fechas de estado: " . $e->getMessage());
        }
    }

    /**
     * Marca una evaluación como completada en HSEQ
     */
    public function completarEvaluacionHseq() {
        try {
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                http_response_code(405);
                echo json_encode(["success" => false, "message" => "Método no permitido"]);
                return;
            }

            $evaluationId = isset($_POST['evaluationId']) ? (int)$_POST['evaluationId'] : 0;
            $evaluadorHseqId = isset($_POST['evaluadorHseqId']) ? (int)$_POST['evaluadorHseqId'] : 0;
            $comentariosHseq = $_POST['comentariosHseq'] ?? '';

            if (!$evaluationId || !$evaluadorHseqId) {
                http_response_code(400);
                echo json_encode(["success" => false, "message" => "ID de evaluación y evaluador HSEQ son requeridos"]);
                return;
            }

            $this->db->begin_transaction();
            try {
                // Actualizar estado a HSEQ_COMPLETADA
                $stmt = $this->db->prepare("UPDATE evaluacion SET estado_evaluacion = 'HSEQ_COMPLETADA', id_evaluador_hseq = ?, comentarios_hseq = ?, fecha_evaluacion_hseq = NOW() WHERE id_evaluacion = ?");
                $stmt->bind_param('isi', $evaluadorHseqId, $comentariosHseq, $evaluationId);
                $stmt->execute();
                $stmt->close();

                // Registrar en el historial
                $this->registrarCambioEstado($evaluationId, 'HSEQ_COMPLETADA', $evaluadorHseqId);

                $this->db->commit();
                echo json_encode(["success" => true, "message" => "Evaluación HSEQ completada"]);
            } catch (Exception $e) {
                $this->db->rollback();
                throw $e;
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Error al completar evaluación HSEQ", "error" => $e->getMessage()]);
        }
    }

    /**
     * Finaliza completamente una evaluación (marca como EVALUACION_FINALIZADA)
     */
    public function finalizarEvaluacion() {
        try {
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                http_response_code(405);
                echo json_encode(["success" => false, "message" => "Método no permitido"]);
                return;
            }

            $evaluationId = isset($_POST['evaluationId']) ? (int)$_POST['evaluationId'] : 0;
            $usuarioId = isset($_POST['usuarioId']) ? (int)$_POST['usuarioId'] : 0;

            if (!$evaluationId) {
                http_response_code(400);
                echo json_encode(["success" => false, "message" => "ID de evaluación es requerido"]);
                return;
            }

            $this->db->begin_transaction();
            try {
                // Actualizar estado a EVALUACION_FINALIZADA
                $stmt = $this->db->prepare("UPDATE evaluacion SET estado_evaluacion = 'EVALUACION_FINALIZADA' WHERE id_evaluacion = ?");
                $stmt->bind_param('i', $evaluationId);
                $stmt->execute();
                $stmt->close();

                // Registrar en el historial
                $this->registrarCambioEstado($evaluationId, 'EVALUACION_FINALIZADA', $usuarioId);

                $this->db->commit();
                echo json_encode(["success" => true, "message" => "Evaluación finalizada completamente"]);
            } catch (Exception $e) {
                $this->db->rollback();
                throw $e;
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Error al finalizar evaluación", "error" => $e->getMessage()]);
        }
    }

    /**
     * Obtiene el historial de estados de una evaluación
     */
    public function getHistorialEstados($evaluationId) {
        try {
            $stmt = $this->db->prepare("
                SELECT 
                    h.*,
                    u.nombre as nombre_usuario,
                    u.cargo as cargo_usuario
                FROM evaluacion_estado_historial h
                LEFT JOIN empleados u ON h.id_usuario_cambio = u.id_empleado
                WHERE h.id_evaluacion = ?
                ORDER BY h.fecha_cambio ASC
            ");
            $stmt->bind_param('i', $evaluationId);
            $stmt->execute();
            $result = $stmt->get_result();
            $historial = [];
            while ($row = $result->fetch_assoc()) {
                $historial[] = $row;
            }
            $stmt->close();

            echo json_encode(["success" => true, "historial" => $historial]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Error al obtener historial", "error" => $e->getMessage()]);
        }
    }
}
// Fin del archivo sin etiqueta de cierre PHP para evitar salida accidental
