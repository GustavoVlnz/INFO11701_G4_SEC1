CREATE TABLE pagosMOVO (
    id_pago INT PRIMARY KEY,
    metodo_pago VARCHAR(255),
    precio DECIMAL(10, 2),
    detalles VARCHAR(200)
);
