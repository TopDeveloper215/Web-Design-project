<?php

function connectDatabase() {
    global $db_host, $db_name, $db_user, $db_pass;
    $connection = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
    return $connection;
}

function getPasswordHash($wallet_address) {
    $connection = connectDatabase();
    if (!$connection) {
        return false;
    }

    // Realiza la consulta para obtener el hash de la contraseña
    // Asume que hay una tabla 'users' con campos 'wallet_address' y 'password_hash'
    $query = "SELECT password_hash FROM users WHERE wallet_address = ?";
    $stmt = mysqli_prepare($connection, $query);
    mysqli_stmt_bind_param($stmt, "s", $wallet_address);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_bind_result($stmt, $password_hash);
    mysqli_stmt_fetch($stmt);
    mysqli_stmt_close($stmt);
    mysqli_close($connection);

    return $password_hash;
}

function createPassword($wallet_address, $password) {
    global $conn;
    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    $deposito_inicial = 0.30000;
    $interes_diario = calcularInteresDiario($deposito_inicial);
    $query = "INSERT INTO usuarios (wallet_address, password, deposito_inicial, interes_diario) VALUES ('$wallet_address', '$password_hash', $deposito_inicial, $interes_diario)";
    return mysqli_query($conn, $query);
    mysqli_stmt_close($stmt);
    mysqli_close($connection);

    return $result;
}

function verifyPassword($wallet_address, $password) {
    $password_hash = getPasswordHash($wallet_address);
    if (!$password_hash) {
        return false;
    }

    return password_verify($password, $password_hash);
}
