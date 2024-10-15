CREATE TABLE reseñasMOVO (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(100) NOT NULL,
    comentario TEXT NOT NULL,
    calificacion DECIMAL(2,1) NOT NULL,
    fecha DATE NOT NULL
);
