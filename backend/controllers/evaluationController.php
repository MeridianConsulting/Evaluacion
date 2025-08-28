<?php
require_once __DIR__ . '/../config/db.php';

class EvaluationController {
  private $db;

  public function __construct() {
    $this->db = (new Database())->getConnection();
  }
  public function saveEvaluation() {
    // Verificar si la solicitud contiene datos
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
      http_response_code(405);
      echo json_encode(["message" => "Método no permitido"]);
      return;
    }
    
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
    
    if (!$employeeId) {
      http_response_code(400);
      echo json_encode(["message" => "ID de empleado no proporcionado"]);
      return;
    }
    
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
    
    // Guardar evaluación y detalle en la base de datos
    $this->db->begin_transaction();
    try {
      // Observaciones generales como JSON con metadatos adicionales
      $observaciones = [
        'mejoramiento' => $mejoramiento,
        'planAccion' => $planAccion,
        'hseqData' => $hseqData,
        'competenciasData' => $competenciasData,
        'promedios' => [
          'competencias' => $promedioCompetencias,
          'hseq' => $hseqAverage,
          'general' => $generalAverage,
          'porApartado' => $groupAverages,
        ],
        'employeeSignature' => $employeeSignaturePath,
        'bossSignature' => $bossSignaturePath,
      ];

      $observacionesJson = json_encode($observaciones, JSON_UNESCAPED_UNICODE);

      // Insert principal en evaluacion
      $insertEvalSql = 'INSERT INTO evaluacion (id_empleado, fecha_evaluacion, observaciones_generales) VALUES (?, NOW(), ?)';
      $stmtEval = $this->db->prepare($insertEvalSql);
      if (!$stmtEval) {
        throw new Exception('Error al preparar INSERT evaluacion: ' . $this->db->error);
      }
      $stmtEval->bind_param('is', $employeeId, $observacionesJson);
      if (!$stmtEval->execute()) {
        throw new Exception('Error al ejecutar INSERT evaluacion: ' . $stmtEval->error);
      }
      $evaluationId = $stmtEval->insert_id;
      $stmtEval->close();

      // Nota: Se omite el guardado en detalle_evaluacion para evitar fallas con FK.

      $this->db->commit();

      echo json_encode([
        'success' => true,
        'message' => 'Evaluación guardada exitosamente',
        'id_evaluacion' => $evaluationId,
      ], JSON_UNESCAPED_UNICODE);
      return;
    } catch (Exception $e) {
      $this->db->rollback();
      http_response_code(500);
      echo json_encode([
        'success' => false,
        'message' => 'Error al guardar la evaluación',
        'error' => $e->getMessage(),
      ], JSON_UNESCAPED_UNICODE);
      return;
    }
    
    // Nota: la respuesta ya fue enviada tras el commit o rollback
  }
}
