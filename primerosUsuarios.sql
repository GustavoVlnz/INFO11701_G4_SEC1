CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    rut VARCHAR(12) NOT NULL UNIQUE,
    genero ENUM("Masculino", "Femenino", "Otro") NOT NULL,
    correo_electronico VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    tipo_usuario ENUM("cliente", "administrador", "proveedor") NOT NULL
);

INSERT INTO usuarios (nombre, apellidos, rut, genero, correo_electronico, contraseña, tipo_usuario) VALUES
("Juan", "Pérez García", "12345678-9", "Masculino", "juan.perez@gmail.com", MD5("contraseña123"), "cliente"),
("Ana", "López Díaz", "98765432-1", "Femenino", "ana.lopez@gmail.com", MD5("contraseña123"), "cliente"),
("Carlos", "Fernández Soto", "12312312-3", "Masculino", "carlos.fernandez@gmail.com", MD5("contraseña123"), "proveedor"),
("María", "Gómez Torres", "45678901-2", "Femenino", "maria.gomez@gmail.com", MD5("contraseña123"), "cliente"),
("Pedro", "Martínez Pérez", "98765433-4", "Masculino", "pedro.martinez@gmail.com", MD5("contraseña123"), "proveedor"),
("Lucía", "Ríos Vega", "11111111-1", "Femenino", "lucia.rios@gmail.com", MD5("contraseña123"), "cliente"),
("Jorge", "Vásquez Castro", "22222222-2", "Masculino", "jorge.vasquez@gmail.com", MD5("contraseña123"), "cliente"),
("Sofía", "Hernández López", "33333333-3", "Femenino", "sofia.hernandez@gmail.com", MD5("contraseña123"), "proveedor"),
("Raúl", "Ramírez Silva", "44444444-4", "Masculino", "raul.ramirez@gmail.com", MD5("contraseña123"), "cliente"),
("Elena", "Castro Reyes", "55555555-5", "Femenino", "elena.castro@gmail.com", MD5("contraseña123"), "proveedor");
