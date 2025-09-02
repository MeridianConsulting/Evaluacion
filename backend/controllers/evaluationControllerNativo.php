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

        $html .= '
            <div class="section">
                <h3>FIRMAS</h3>
                <div class="section-content">
                    <p>Evaluado: _________________________</p>
                    <p>Jefe Directo: _________________________</p>
                    <p>Fecha: _________________________</p>
                </div>
            </div>
        </body>
        </html>';

        return $html;
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
}
// Fin del archivo sin etiqueta de cierre PHP para evitar salida accidental
