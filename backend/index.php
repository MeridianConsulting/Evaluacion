<?php
require_once __DIR__ . '/controllers/adminController.php';
require_once __DIR__ . '/controllers/userController.php';
require_once __DIR__ . '/middleware/cors.php';

header("Content-Type: application/json");
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Base path
define('BASE_PATH', '/Evaluacion/backend');

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

    } elseif (preg_match("#^admin/employees/(\d+)$#", $path, $matches) && $method === "PUT") {
        $id = $matches[1];
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data) {
            http_response_code(400);
            echo json_encode(["message" => "Datos inválidos"]);
            return;
        }
        $controller = new AdminController();
        $controller->updateEmployee($id, $data);

    } elseif (preg_match("#^admin/employees/(\d+)$#", $path, $matches) && $method === "DELETE") {
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

    } else {
        http_response_code(404);
        echo json_encode(["message" => "Ruta no encontrada"]);
    }
}

// Llamada al manejador de rutas
handleRequest($method, $path);
?>
