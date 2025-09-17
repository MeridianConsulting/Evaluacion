<?php
class Database {
    private $host = "localhost";
    private $port = 3306;
    private $db_name = "evaluacion";
    private $username = "evaluacion";
    private $password = "5I}*77tf%-[E";
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new mysqli($this->host, $this->username, $this->password, $this->db_name, $this->port);
            if ($this->conn->connect_error) {
                throw new Exception("Conexión fallida: " . $this->conn->connect_error);
            }
            // Configurar charset UTF8MB4
            $this->conn->set_charset("utf8mb4");
        } catch (Exception $exception) {
            die("Error: " . $exception->getMessage());
        }
        return $this->conn;
    }
}

$db = (new Database())->getConnection();
?>
