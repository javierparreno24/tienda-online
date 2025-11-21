<?php
    define('AUTH_TOKEN', '123456789ABCDEF');

    function loadJsonData($filename) {
        if (!file_exists($filename)) {
            http_response_code(500); //Internal Server Error
            echo json_encode(["success" => false, "error" => "Archivo no encontrado: $filename"]);
            exit();
        }
        $json_content = file_get_contents($filename);
        $data = json_decode($json_content, true);
        
        return $data;
    }
    function checkToken(){
        //Obtener token de la cabecera Authorization
        $headers = getallheaders();
        $token= $headers['Authorization'] ?? null;

        if ($token && strpos($token, 'Bearer ') === 0) {
            $token = substr($token, 7); //Eliminar 'Bearer ' del inicio
        } 
        //Validar token
        if ($token !== AUTH_TOKEN) {
            http_response_code(401); //Unauthorized
            echo json_encode(["success" => false, "error" => "Token de autenticación inválido"]);
            exit();
        }

        return true;
    }
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400'); // 1 día
    }
    
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        }
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
            header('Access-Control-Allow-Headers: ' . $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']);
        }
        exit(0);
    }
?>