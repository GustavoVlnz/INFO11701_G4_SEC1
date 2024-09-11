CREATE TABLE Usuario (
    IDuser INT PRIMARY KEY AUTO_INCREMENT,
    Nombres CHAR(45),
    Apellidos CHAR(45),
    Correo CHAR(50),
    Telefono INT
);

CREATE TABLE Cliente (
    IDcliente INT PRIMARY KEY AUTO_INCREMENT,
    IDuser INT,
    Direccion VARCHAR(255),
    FOREIGN KEY (IDuser) REFERENCES Usuario(IDuser)
);

CREATE TABLE Proveedor (
    IDProv INT PRIMARY KEY AUTO_INCREMENT,
    Verificado BOOL,
    NOMemp CHAR(45),
    IDuser INT,
    FOREIGN KEY (IDuser) REFERENCES Usuario(IDuser)
);

CREATE TABLE Categoria (
    IDcat INT PRIMARY KEY AUTO_INCREMENT,
    NomCat CHAR(45)
);

CREATE TABLE MetodoPago (
    IDPago INT PRIMARY KEY AUTO_INCREMENT,
    TipoPago CHAR(30),
    Detalles VARCHAR(255)
);

CREATE TABLE Contrato (
    IDcontrato INT PRIMARY KEY AUTO_INCREMENT,
    IDProv INT,
    IDcliente INT,
    IDcat INT,
    Descripcion VARCHAR(255),
    PrecioUnitario INT,
    Estado CHAR(25),
    FOREIGN KEY (IDProv) REFERENCES Proveedor(IDProv),
    FOREIGN KEY (IDcliente) REFERENCES Cliente(IDcliente),
    FOREIGN KEY (IDcat) REFERENCES Categoria(IDcat)
);

CREATE TABLE DetalleServicio (
    IDdetalle INT PRIMARY KEY AUTO_INCREMENT,
    IDcontrato INT,
    Cantidad INT,
    IDPago INT,
    FOREIGN KEY (IDcontrato) REFERENCES Contrato(IDcontrato),
    FOREIGN KEY (IDPago) REFERENCES MetodoPago(IDPago)
);

CREATE TABLE Admin (
    IDadmin INT PRIMARY KEY AUTO_INCREMENT,
    IDuser INT,
    FOREIGN KEY (IDuser) REFERENCES Usuario(IDuser)
);
mermer