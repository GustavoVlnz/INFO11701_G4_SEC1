CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(255) NOT NULL
);

INSERT INTO categorias (id, nombre_categoria) VALUES 
(1, "Hogar y Reparaciones"),
(2, "Eventos y Entretenimiento"),
(3, "Fotografía y Videografía"),
(4, "Tecnología y Desarrollo"),
(5, "Salud y Bienestar"),
(6, "Limpieza y Mantenimiento"),
(7, "Transporte y Mudanza"),
(8, "Consultoría y Asesoría");
