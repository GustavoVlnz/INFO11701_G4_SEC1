<?php

include 'conexion.php'; // Hace la conexion con la base de datos

// Verificar si el formulario ha sido enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Recibe los datos del formulario
    $nombres = $_POST['username'];
    $apellidos = $_POST['apellido'];
    $rut = $_POST['rut'];
    $genero = $_POST['genero'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $rol = $_POST['Rol'];

<<<<<<< HEAD
    // Verificar si el IDuser (RUT) o el Correo ya existen
    $sql_check = "SELECT * FROM usuarios WHERE IDuser = ? OR Correo = ?";
    $stmt_check = $db->prepare($sql_check);
    $stmt_check->bind_param("ss", $rut, $email);
    $stmt_check->execute();
    $result = $stmt_check->get_result();
=======
    // Consulta SQL para insertar los datos en la base de datos
    $sql = "INSERT INTO usuarios (nombres, apellidos, rut, genero, email, password, rol) 
            VALUES ('$nombres', '$apellidos', '$rut', '$genero', '$email', '$password', '$rol')";
>>>>>>> origin/developer

    if ($result->num_rows > 0) {
        // Si ya existe el RUT o el correo, mostrar un mensaje de error
        echo "El RUT o el Correo ya están registrados.";
    } else {
        // Si no existen, inserta los nuevos datos
        $sql_insert = "INSERT INTO usuarios (Nombres, Apellidos, IDuser, genero, Correo, password, rol) 
                       VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt_insert = $db->prepare($sql_insert);
        $stmt_insert->bind_param("sssssss", $nombres, $apellidos, $rut, $genero, $email, $password, $rol); //cada s indica que el dato es string

<<<<<<< HEAD
        if ($stmt_insert->execute()) {
            echo "Registro exitoso";
        } else {
            echo "Error al registrar: " . htmlspecialchars($stmt_insert->error);
        }

        // Cerrar la sentencia de inserción
        $stmt_insert->close();
    }
=======
    if ($rol == 'empresa'){
        header("Location:../../../Logged/Clientes/HomeLogeado/home.html");
        exit();
}
>>>>>>> origin/developer
    // Cierra la conexion una vez insertados los datos
    $stmt_check->close();
    $db->close();
}
?>