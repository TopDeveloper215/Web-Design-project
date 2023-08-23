<?php

$db_host = 'localhost';
$db_name = 'mineizal_usuarios';
$db_user = 'mineizal_usua';
$db_pass = 'Crisis2021';

include 'database_functions.php';

$action = $_POST['action'] ?? '';

switch ($action) {
    case 'check_wallet':
        $wallet_address = $_POST['wallet'] ?? '';
        // Verifica si la dirección de la billetera existe en la base de datos
        $password_hash = getPasswordHash($wallet_address);
        if ($password_hash) {
            echo 'pedir_contraseña';
        } else {
            echo 'crear_contraseña';
        }
        break;
        
         case 'create_password':
        $wallet_address = $_POST['wallet'] ?? '';
        $password = $_POST['password'] ?? '';

        // Validación de datos aquí (si es necesario)

        $result = createPassword($wallet_address, $password);
        if ($result) {
            echo 'password_created';
        } else {
            echo 'error_creating_password';
        }
        break;

    case 'verify_password':
        $wallet_address = $_POST['wallet'] ?? '';
        $password = $_POST['password'] ?? '';

        // Validación de datos aquí (si es necesario)

        $is_valid = verifyPassword($wallet_address, $password);
        if ($is_valid) {
            echo 'password_valid';
        } else {
            echo 'password_invalid';
        }
        break;
        
    
}

// Después de insertar un nuevo usuario en la base de datos
function getDepositoInicial($wallet_address) {
    global $conn;
    $query = "SELECT deposito_inicial FROM usuarios WHERE wallet_address = '$wallet_address'";
    $result = mysqli_query($conn, $query);
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        return $row['deposito_inicial'];
    }
    return 0;
    
}

function calcularInteresDiario($deposito_inicial) {
    return $deposito_inicial * 0.001; // 0.1% de interés diario
}





