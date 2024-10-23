CREATE TABLE FormVerificacionMOVO (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    nombre_tienda VARCHAR(255) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    contacto VARCHAR(20) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    redes_sociales VARCHAR(255)
);
