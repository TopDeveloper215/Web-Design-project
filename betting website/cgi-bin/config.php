// Conectar a la base de datos
$db_host = 'localhost';
$db_name = 'tu_base_de_datos';
$db_user = 'tu_usuario';
$db_pass = 'tu_contraseña';

try {
    $db = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Error al conectar a la base de datos: ' . $e->getMessage();
    exit;
}

// Ejemplo de consulta para insertar un nuevo usuario
function createUser($wallet_address, $password_hash) {
    global $db;

    $sql = "INSERT INTO users (wallet_address, password_hash) VALUES (:wallet_address, :password_hash)";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':wallet_address', $wallet_address);
    $stmt->bindParam(':password_hash', $password_hash);

    try {
        $stmt->execute();
    } catch (PDOException $e) {
        echo 'Error al crear el usuario: ' . $e->getMessage();
        exit;
    }
}

// Ejemplo de consulta para obtener el hash de la contraseña de un usuario por su dirección de billetera
function getPasswordHash($wallet_address) {
    global $db;

    $sql = "SELECT password_hash FROM users WHERE wallet_address = :wallet_address";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':wallet_address', $wallet_address);

    try {
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['password_hash'] ?? null;
    } catch (PDOException $e) {
        echo 'Error al obtener el hash de la contraseña: ' . $e->getMessage();
        exit;
    }
}
