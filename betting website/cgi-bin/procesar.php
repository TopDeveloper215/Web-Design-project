<?php
session_start();

$wallet_address = $_POST['wallet'];

// Validar la dirección de BNB utilizando una expresión regular
if (!preg_match('/^bnb[a-z0-9]{39}$/i', $wallet_address)) {
  die('La dirección de BNB no es válida');
}

// Conectar a la base de datos
$conn = mysqli_connect("localhost", "usuario", "contraseña", "basededatos");

// Verificar si la dirección de la billetera está registrada
$sql = "SELECT * FROM users WHERE wallet_address = '$wallet_address'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
  // La dirección de la billetera está registrada, pedir contraseña
  $_SESSION['wallet_address'] = $wallet_address;
  header('Location: ingresar_contraseña.php');
} else {
  // La dirección de la billetera no está registrada, pedir crear contraseña
  $_SESSION['wallet_address'] = $wallet_address;
  header('Location: crear_contraseña.php');
}

mysqli_close($conn);
?>
