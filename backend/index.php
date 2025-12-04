<?php
// Incluir el middleware CORS primero
require_once __DIR__ . '/middleware/cors.php';

// Configurar el tipo de contenido
header('Content-Type: application/json');

// Incluir los controladores
require_once __DIR__ . '/controllers/adminController.php';
require_once __DIR__ . '/controllers/userController.php';
require_once __DIR__ . '/controllers/cargoController.php';
require_once __DIR__ . '/controllers/employeeController.php';
require_once __DIR__ . '/controllers/evaluationController.php';
require_once __DIR__ . '/controllers/evaluationControllerNativo.php';

// Configurar el manejo de errores
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Base path para producción
define('BASE_PATH', '/backend');

// Captura el método y la ruta de la solicitud
$method = $_SERVER['REQUEST_METHOD'];
$path = trim(str_replace(BASE_PATH, '', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)), "/");

// Debug para verificar la ruta
error_log("Method: $method, Path: $path");

// Manejador de rutas
function handleRequest($method, $path) {
    $path = trim($path, "/");

    // Rutas para empleados
    $controller = null;

    // Rutas para el controlador de cargos
    if ($path === "api/cargos" && $method === "GET") {
        $controller = new CargoController();
        $controller->getAllCargos();
        return;
    } elseif ($path === "api/cargos" && $method === "POST") {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Datos inválidos"]);
            return;
        }
        $controller = new CargoController();
        $controller->createCargo($data);
        return;
    } elseif (preg_match("#^api/cargos/(\d+)$#", $path, $matches) && $method === "GET") {
        $id = $matches[1];
        $controller = new CargoController();
        $controller->getCargoById($id);
        return;
    } elseif (preg_match("#^api/cargos/(\d+)$#", $path, $matches) && $method === "PUT") {
        $id = $matches[1];
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Datos inválidos"]);
            return;
        }
        $controller = new CargoController();
        $controller->updateCargo($id, $data);
        return;
    } elseif (preg_match("#^api/cargos/(\d+)$#", $path, $matches) && $method === "DELETE") {
        $id = $matches[1];
        $controller = new CargoController();
        $controller->deleteCargo($id);
        return;
    }

    // Rutas para evaluaciones
    if ($path === "api/evaluations/save" && $method === "POST") {
        $controller = new EvaluationController();
        $controller->saveEvaluation();
        return;
    }

    // Rutas para evaluaciones con estructura nativa
    if ($path === "api/evaluations/save-native" && $method === "POST") {
        $controller = new EvaluationControllerNativo();
        $controller->saveEvaluation();
        return;
    }
    if ($path === "api/evaluations/update-native" && $method === "POST") {
        $controller = new EvaluationControllerNativo();
        $controller->updateEvaluation();
        return;
    }

    // Ruta para obtener evaluaciones del empleado con detalles
    if (preg_match("#^api/evaluations/employee/(\d+)$#", $path, $matches) && $method === "GET") {
        $employeeId = $matches[1];
        $controller = new EvaluationControllerNativo();
        $controller->getEmployeeEvaluationsWithDetails($employeeId);
        return;
    }

    // Obtener evaluaciones asignadas a un jefe (donde el usuario es jefe inmediato)
    if (preg_match("#^api/evaluations/assigned/(\d+)$#", $path, $matches) && $method === "GET") {
        $bossId = (int)$matches[1];
        $controller = new EvaluationControllerNativo();
        $controller->getEvaluationsAssignedToBoss($bossId);
        return;
    }

    // Ruta para obtener empleados evaluados HSEQ por evaluador y periodo (compat)
    if (preg_match("#^api/evaluations/hseq-evaluated/(\d+)/(\d{4}-\d{2})$#", $path, $matches) && $method === "GET") {
        $bossId = (int)$matches[1];
        $periodo = $matches[2];
        $controller = new EvaluationControllerNativo();
        $controller->getHseqEvaluatedForBossAndPeriod($bossId, $periodo);
        return;
    }

    // Ruta para obtener último registro HSEQ por empleado (sin filtrar por período)
    if ($path === "api/evaluations/hseq-evaluated/all" && $method === "GET") {
        $controller = new EvaluationControllerNativo();
        $controller->getHseqEvaluatedForPeriod('all');
        return;
    }

    // Ruta para obtener estado HSEQ del período (última por empleado)
    if (preg_match("#^api/evaluations/hseq-evaluated/(\d{4}-\d{2})$#", $path, $matches) && $method === "GET") {
        $periodo = $matches[1];
        $controller = new EvaluationControllerNativo();
        $controller->getHseqEvaluatedForPeriod($periodo);
        return;
    }

    // Ruta para obtener todas las evaluaciones HSEQ de un empleado específico
    if (preg_match("#^api/evaluations/hseq/employee/(\d+)$#", $path, $matches) && $method === "GET") {
        $employeeId = (int)$matches[1];
        $controller = new EvaluationControllerNativo();
        $controller->getHseqEvaluationsByEmployee($employeeId);
        return;
    }

    // Ruta para obtener detalles de una evaluación HSEQ específica
    if (preg_match("#^api/evaluations/hseq/(\d+)$#", $path, $matches) && $method === "GET") {
        $hseqEvaluationId = (int)$matches[1];
        $controller = new EvaluationControllerNativo();
        $controller->getHseqEvaluationDetails($hseqEvaluationId);
        return;
    }

    // Ruta para diagnóstico HSEQ
    if (preg_match("#^api/evaluations/hseq/diagnostic/(\d+)$#", $path, $matches) && $method === "GET") {
        $employeeId = (int)$matches[1];
        $controller = new EvaluationControllerNativo();
        $controller->diagnosticHseqData($employeeId);
        return;
    }

    // Reportes HSEQ independientes
    if (preg_match("#^api/hseq/evaluations/(\d+)/pdf$#", $path, $matches) && $method === "GET") {
        $hseqEvalId = (int)$matches[1];
        $controller = new EvaluationControllerNativo();
        $controller->downloadHseqPDF($hseqEvalId);
        return;
    }
    if (preg_match("#^api/hseq/evaluations/(\d+)/excel$#", $path, $matches) && $method === "GET") {
        $hseqEvalId = (int)$matches[1];
        $controller = new EvaluationControllerNativo();
        $controller->downloadHseqExcel($hseqEvalId);
        return;
    }

    // Ruta para descargar PDF de evaluación HSEQ por empleado y período
    if (preg_match("#^api/hseq/employee/(\d+)/pdf(?:/(\d{4}-\d{2}))?$#", $path, $matches) && $method === "GET") {
        $employeeId = (int)$matches[1];
        $periodo = isset($matches[2]) ? $matches[2] : null;
        $controller = new EvaluationControllerNativo();
        $controller->downloadHseqPDFByEmployee($employeeId, $periodo);
        return;
    }

    // Ruta para obtener evaluación completa con firmas
    if (preg_match("#^api/evaluations/(\d+)/complete/(\d+)$#", $path, $matches) && $method === "GET") {
        $evaluationId = $matches[1];
        $employeeId = $matches[2];
        $controller = new EvaluationControllerNativo();
        $controller->getEvaluationComplete($evaluationId, $employeeId);
        return;
    }

    // Ruta para descargar PDF de evaluación
    if (preg_match("#^api/evaluations/(\d+)/pdf/(\d+)$#", $path, $matches) && $method === "GET") {
        $evaluationId = $matches[1];
        $employeeId = $matches[2];
        $controller = new EvaluationControllerNativo();
        $controller->downloadEvaluationPDF($evaluationId, $employeeId);
        return;
    }

    // Ruta para descargar Excel de evaluación
    if (preg_match("#^api/evaluations/(\d+)/excel/(\d+)$#", $path, $matches) && $method === "GET") {
        $evaluationId = $matches[1];
        $employeeId = $matches[2];
        $controller = new EvaluationControllerNativo();
        $controller->downloadEvaluationExcel($evaluationId, $employeeId);
        return;
    }

    // Ruta para exportar todas las evaluaciones normales a Excel
    if ($path === "api/evaluations/export-all-excel" && $method === "GET") {
        $controller = new EvaluationControllerNativo();
        $controller->exportAllEvaluationsToExcel();
        return;
    }

    // Ruta para listar todas las evaluaciones normales (JSON)
    if ($path === "api/evaluations/all" && $method === "GET") {
        $controller = new EvaluationControllerNativo();
        $controller->getAllEvaluations();
        return;
    }

    // Ruta para listar todas las evaluaciones con calificaciones detalladas (JSON)
    if ($path === "api/evaluations/all-with-details" && $method === "GET") {
        $controller = new EvaluationControllerNativo();
        $controller->getAllEvaluationsWithDetails();
        return;
    }

    // Ruta para guardar evaluación HSEQ
    if ($path === "api/evaluations/save-hseq" && $method === "POST") {
        $controller = new EvaluationControllerNativo();
        $controller->saveHseqEvaluation();
        return;
    }

    // Ruta para servir imágenes de firmas con CORS habilitado
    if (preg_match("#^api/signatures/(.+)$#", $path, $matches) && $method === "GET") {
        $imagePath = $matches[1];
        $fullPath = __DIR__ . '/uploads/signatures/' . $imagePath;
        
        if (file_exists($fullPath)) {
            // Habilitar CORS para imágenes
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: GET');
            header('Access-Control-Allow-Headers: Content-Type');
            
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mimeType = finfo_file($finfo, $fullPath);
            finfo_close($finfo);
            
            header('Content-Type: ' . $mimeType);
            header('Content-Length: ' . filesize($fullPath));
            header('Cache-Control: public, max-age=86400');
            
            readfile($fullPath);
            return;
        } else {
            http_response_code(404);
            echo json_encode(["success" => false, "message" => "Imagen no encontrada"]);
            return;
        }
    }

    // Rutas para el controlador de funciones - Eliminadas

    // Rutas para el controlador de empleados
    if ($path === "api/employees" && $method === "GET") {
        $controller = new EmployeeController();
        $controller->getAllEmployees();
        return;
    } elseif ($path === "api/employees" && $method === "POST") {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Datos inválidos"]);
            return;
        }
        $controller = new EmployeeController();
        $controller->createEmployee($data);
        return;
    } elseif (preg_match("#^api/employees/(\d+)$#", $path, $matches) && $method === "GET") {
        $id = $matches[1];
        $controller = new EmployeeController();
        $controller->getEmployeeById($id);
        return;
    } elseif (preg_match("#^api/employees/(\d+)$#", $path, $matches) && $method === "PUT") {
        $id = $matches[1];
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Datos inválidos"]);
            return;
        }
        $controller = new EmployeeController();
        $controller->updateEmployee($id, $data);
        return;
    } elseif (preg_match("#^api/employees/(\d+)$#", $path, $matches) && $method === "DELETE") {
        $id = $matches[1];
        $controller = new EmployeeController();
        $controller->deleteEmployee($id);
        return;
    } elseif ($path === "api/employees/cargos" && $method === "GET") {
        $controller = new EmployeeController();
        $controller->getAllCargos();
        return;
    }

    // Rutas existentes
    if ($path === "employees" && $method === "POST") {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data) {
            http_response_code(400);
            echo json_encode(["message" => "Datos inválidos"]);
            return;
        }
        $controller = new UserController();
        $controller->agregarEmpleado($data);

    } elseif (preg_match("#^employees/(\d+)$#", $path, $matches) && $method === "GET") {
        $id = $matches[1];
        $controller = new UserController();
        $controller->obtenerEmpleadoPorId($id);

    } elseif ($path === "login" && $method === "POST") {
        // Ruta para login de empleados
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data) {
            http_response_code(400);
            echo json_encode(["message" => "Datos inválidos"]);
            return;
        }
        $controller = new UserController();
        $controller->loginEmpleado($data);

    } elseif ($path === "admin/employees" && $method === "GET") {
        $controller = new AdminController();
        $controller->getEmployees();

    } elseif ($path === "admin/employees/statistics" && $method === "GET") {
        $controller = new AdminController();
        $controller->getEmployeeStatistics();

    } elseif ($path === "admin/employees/search" && $method === "GET") {
        $queryParams = [];
        parse_str(parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY), $queryParams);
        $controller = new AdminController();
        $controller->searchEmployeesByName($queryParams);

    } elseif (preg_match('#^admin/employees/(\d+)$#', $path, $matches) && $method === "PUT") {
        $id = $matches[1];
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data) {
            http_response_code(400);
            echo json_encode(["message" => "Datos inválidos"]);
            return;
        }
        $controller = new AdminController();
        $controller->updateEmployee($id, $data);

    } elseif (preg_match('#^admin/employees/(\d+)$#', $path, $matches) && $method === "DELETE") {
        $id = $matches[1];
        $controller = new AdminController();
        $controller->deleteEmployee($id);

    } elseif ($path === "admin/login" && $method === "POST") {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data) {
            http_response_code(400);
            echo json_encode(["message" => "Datos inválidos"]);
            return;
        }
        $controller = new AdminController();
        $controller->validateLogin($data);

    } elseif (preg_match('/\/cargo-info\/(.+)/', $path, $matches) && $method === 'GET') {
        $nombreCargo = urldecode($matches[1]);
        $cargoController = new CargoController();
        $cargoController->obtenerInfoCargo($nombreCargo);
        exit;

    } elseif (preg_match('#^empleado-funciones/(\d+)$#', $path, $matches) && $method === 'GET') {
        $idEmpleado = $matches[1];
        $cargoController = new CargoController();
        $cargoController->obtenerFuncionesPorEmpleadoId($idEmpleado);
        exit;

    } elseif ($path === "api/evaluations/completar-hseq" && $method === "POST") {
        $controller = new EvaluationControllerNativo();
        $controller->completarEvaluacionHseq();

    } elseif ($path === "api/evaluations/finalizar" && $method === "POST") {
        $controller = new EvaluationControllerNativo();
        $controller->finalizarEvaluacion();

    } elseif (preg_match('#^api/evaluations/historial-estados/(\d+)$#', $path, $matches) && $method === 'GET') {
        $evaluationId = $matches[1];
        $controller = new EvaluationControllerNativo();
        $controller->getHistorialEstados($evaluationId);

    } else {
        http_response_code(404);
        echo json_encode(["success" => false, "message" => "Ruta no encontrada"]);
    }
}

// Llamada al manejador de rutas
handleRequest($method, $path);
?>
