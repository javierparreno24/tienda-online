<?php
    //Configuración de cabeceras 
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *'); //Permitir solicitudes desde cualquier origen
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); 
    header('Access-Control-Allow-Headers: Content-Type, Authorization');

    //Incluir archivo de FUNCIONES COMUNES
    require_once 'config.php';

    //Obtener los datos de entrada
    $input_data = json_decode(file_get_contents('php://input'), true);

    //Validar que se recibieron los datos necesarios
    if (!isset($input_data['username']) || !isset($input_data['password'])) {
        http_response_code(400); //Bad Request
        echo json_encode(["success" => false, "error" => "Faltan datos de entrada"]);
        exit();
    }

    $username = $input_data['username'];
    $password = $input_data['password'];

    //Cargar datos de usuarios y tienda
    $usuarios=loadJsonData('usuarios.json');
    $tienda_info=loadJsonData('tienda.json');

    //Autenticar usuario
    $authenticated = false;
    foreach ($usuarios as $usuario) {
        if ($usuario['username'] === $username &&  $usuario['password']=== $password) { 
            $authenticated = true;
            break;
        }
    }

    //Preparar respuesta
    if ($authenticated) {
        http_response_code(200); //OK
        echo json_encode([
            "success" => true,
            "token"=>AUTH_TOKEN,
            "tiendaData" => $tienda_info
        ]);
    } else {
        http_response_code(401); //Unauthorized
        echo json_encode(["success" => false, "error" => "Credenciales incorrectas"]);
    }
?>