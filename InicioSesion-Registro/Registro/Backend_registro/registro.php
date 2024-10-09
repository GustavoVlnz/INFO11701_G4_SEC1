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

    // Consulta SQL para insertar los datos en la base de datos
    $sql = "INSERT INTO usuarios (nombres, apellidos, rut, genero, email, password, rol) 
            VALUES ('$nombres', '$apellidos', '$rut', '$genero', '$email', '$password', '$rol')";

    if ($db->query($sql) === TRUE) { #Verifica si se subieron los datos correctamente
        echo "Registro exitoso";
    } else {
        echo "Error: " . $sql . "<br>" . $db->error; #Si no funciona, enseña el error
    }

    if ($rol == 'empresa'){
        header("Location:../../Verificacion/FormVer.html");
        exit();
}
    // Cierra la conexion una vez insertados los datos
    $db->close();
}
?>