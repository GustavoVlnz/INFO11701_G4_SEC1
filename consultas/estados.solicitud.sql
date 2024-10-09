CREATE TABLE estados_solicitud (
    id_estado INT AUTO_INCREMENT PRIMARY KEY,
    nombre_estado VARCHAR(50) NOT NULL
);

INSERT INTO estados_solicitud (id_estado, nombre_estado) VALUES
(1, 'pendiente'),
(2, 'en progreso'),
(3, 'completado'),
(4, 'cancelado');
