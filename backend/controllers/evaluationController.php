<?php

class EvaluationController {
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
    $funcionesData = json_decode($_POST['funcionesData'] ?? '[]', true);
    $hseqData = json_decode($_POST['hseqData'] ?? '[]', true);
    
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
    
    // Aquí guardarías la evaluación en la base de datos, incluyendo las rutas de las firmas
    
    // Devolver respuesta
    echo json_encode([
      "success" => true,
      "message" => "Evaluación guardada exitosamente"
    ]);
  }
}
