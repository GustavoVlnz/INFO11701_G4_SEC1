CREATE TABLE servicios (
    id_servicio INT AUTO_INCREMENT PRIMARY KEY,
    nombre_servicio VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    id_categoria INT,
    id_pago INT,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id),
    FOREIGN KEY (id_pago) REFERENCES pagos(id)
);

--Categoria Hogar y Reparaciones
INSERT INTO servicios (id_servicio, nombre_servicio, descripcion, id_categoria, id_pago) VALUES
(1, "Reparación de Electrodomésticos", "Reparación de electrodomésticos en el hogar del cliente", 1, 101),
(2, "Servicio de Fontanería", "Reparaciones y mantenimientos de plomería a domicilio", 1, 102),
(3, "Electricista", "Servicios eléctricos a domicilio", 1, 103),
(4, "Instalación de Sistemas de Seguridad", "Instalación de cámaras de seguridad y alarmas en el hogar", 1, 104);

--Categoria Eventos y Entretencion
INSERT INTO servicios (id_servicio, nombre_servicio, descripcion, id_categoria, id_pago) VALUES
(5, "Organización de Fiestas", "Planificación de eventos privados en el hogar del cliente", 2, 105),
(6, "Animación Infantil a Domicilio", "Servicios de entretenimiento para fiestas infantiles a domicilio", 2, 106),
(7, "Alquiler de Equipo de Karaoke", "Alquiler e instalación de equipo de karaoke en el domicilio del cliente", 2, 107),
(8, "Decoración de Eventos en Casa", "Decoración temática de eventos realizados en casa", 2, 108);

--Categoria de Fotografia y Videografia
INSERT INTO servicios (id_servicio, nombre_servicio, descripcion, id_categoria, id_pago) VALUES
(9, "Sesión de Fotos a Domicilio", "Sesiones fotográficas en el hogar o en exteriores cercanos al domicilio del cliente", 3, 109),
(10, "Videografía de Eventos", "Cobertura de eventos realizados en casa o en espacios privados", 3, 110),
(11, "Edición de Videos a Domicilio", "Servicio de edición de videos en casa o con recogida y entrega a domicilio", 3, 111),
(12, "Fotografía Familiar", "Sesiones fotográficas familiares realizadas en casa", 3, 112);

--Categoria de Tecnologia y Desarollo
INSERT INTO servicios (id_servicio, nombre_servicio, descripcion, id_categoria, id_pago) VALUES
(13, "Soporte Técnico", "Solución de problemas técnicos en equipos informáticos a domicilio", 4, 113),
(14, "Instalación de Redes Domésticas", "Configuración e instalación de redes de internet en casa", 4, 114),
(15, "Mantenimiento de Computadoras a Domicilio", "Mantenimiento y reparación de computadoras en el domicilio", 4, 115),
(16, "Instalación de Smart Home", "Instalación de sistemas de hogar inteligente en el domicilio del cliente", 4, 116);

--Categoria de Salud y Bienestar
INSERT INTO servicios (id_servicio, nombre_servicio, descripcion, id_categoria, id_pago) VALUES
(17, "Entrenador Personal a Domicilio", "Entrenamiento físico personalizado en el domicilio del cliente", 5, 117),
(18, "Terapia Física a Domicilio", "Sesiones de fisioterapia a domicilio", 5, 118),
(19, "Masajes Relajantes a Domicilio", "Masajes terapéuticos o relajantes en casa", 5, 119),
(20, "Cuidado de Adultos Mayores", "Servicio de asistencia para adultos mayores en su hogar", 5, 120);

--Categoria de Limpieza y Mantencion
INSERT INTO servicios (id_servicio, nombre_servicio, descripcion, id_categoria, id_pago) VALUES
(21, "Limpieza de Casas", "Servicio de limpieza general y profunda en el hogar", 6, 121),
(22, "Limpieza de Ventanas", "Limpieza especializada de ventanas en el domicilio", 6, 122),
(23, "Mantenimiento de Jardines", "Cuidado y mantenimiento de jardines en casa", 6, 123),
(24, "Limpieza de Alfombras a Domicilio", "Servicio de limpieza de alfombras en el hogar", 6, 124);

--Categorias de Transporte y Mudanza
INSERT INTO servicios (id_servicio, nombre_servicio, descripcion, id_categoria, id_pago) VALUES
(25, "Mudanza de Casas", "Servicio de mudanzas de bienes del hogar a domicilio", 7, 125),
(26, "Transporte de Muebles", "Transporte de muebles y electrodomésticos a domicilio", 7, 126),
(27, "Mudanza Exprés", "Servicio de mudanzas rápidas a domicilio", 7, 127),
(28, "Transporte de Paquetería a Domicilio", "Transporte y entrega de paquetes a domicilio", 7, 128);

--Categorias de Consultoria y Asesoria
INSERT INTO servicios (id_servicio, nombre_servicio, descripcion, id_categoria, id_pago) VALUES
(29, "Consultoría Financiera a Domicilio", "Asesoramiento financiero en el domicilio del cliente", 8, 129),
(30, "Asesoría Legal a Domicilio", "Asesoría jurídica en la casa del cliente", 8, 130),
(31, "Consultoría en Marketing Digital a Domicilio", "Asesoramiento en estrategias de marketing desde el hogar", 8, 131),
(32, "Consultoría en Recursos Humanos a Domicilio", "Asesoría en gestión de personal en el domicilio del cliente", 8, 132);





