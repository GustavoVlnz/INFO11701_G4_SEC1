// Simulamos un conjunto de solicitudes para la tabla
const solicitudes = [
    { id: 8124, nombre: "Juan Pérez", servicio: "Chef a domicilio", descripcion: "Especializado en cocina gourmet", paga: "$ 20.000 CLP", estado: "---" },
    { id: 5231, nombre: "María Gómez", servicio: "Plomero", descripcion: "Reparación de instalaciones de agua", paga: "$ 15.000 CLP", estado: "---" },
    { id: 9634, nombre: "Carlos Méndez", servicio: "Electricista", descripcion: "Instalación y reparación eléctrica", paga: "$ 18.000 CLP", estado: "---" },
    { id: 8417, nombre: "Lucía Rodríguez", servicio: "Diseñadora gráfica", descripcion: "Diseño de branding y logos", paga: "$ 22.000 CLP", estado: "---" },
    { id: 3741, nombre: "David Fernández", servicio: "Carpintero", descripcion: "Fabricación de muebles a medida", paga: "$ 25.000 CLP", estado: "---" },
    { id: 1023, nombre: "Ana López", servicio: "Jardinería", descripcion: "Mantenimiento y diseño de jardines", paga: "$ 12.000 CLP", estado: "---" },
    { id: 1104, nombre: "Luis García", servicio: "Fontanero", descripcion: "Instalación de sistemas de fontanería", paga: "$ 16.000 CLP", estado: "---" },
    { id: 7654, nombre: "Sandra Morales", servicio: "Abogada", descripcion: "Asesoría legal en derecho civil", paga: "$ 30.000 CLP", estado: "---" },
    { id: 4321, nombre: "José Rodríguez", servicio: "Plomería", descripcion: "Reparación de tuberías y desagües", paga: "$ 14.000 CLP", estado: "---" },
    { id: 6789, nombre: "Elena Martínez", servicio: "Peluquería", descripcion: "Corte y peinado de cabello", paga: "$ 11.000 CLP", estado: "---" },
    { id: 2457, nombre: "Felipe Silva", servicio: "Mecánico", descripcion: "Reparación de vehículos automóviles", paga: "$ 22.000 CLP", estado: "---" },
    { id: 9876, nombre: "Claudia Torres", servicio: "Contadora", descripcion: "Asesoría contable para pequeñas empresas", paga: "$ 27.000 CLP", estado: "---" },
    { id: 5432, nombre: "Pablo González", servicio: "Arquitecto", descripcion: "Diseño de planos arquitectónicos", paga: "$ 35.000 CLP", estado: "---" },
    { id: 2658, nombre: "Raquel Pérez", servicio: "Asesoría fiscal", descripcion: "Planificación fiscal y tributaria", paga: "$ 20.000 CLP", estado: "---" },
    { id: 1532, nombre: "Miguel Sánchez", servicio: "Programador", descripcion: "Desarrollo de software a medida", paga: "$ 28.000 CLP", estado: "---" },
    { id: 8743, nombre: "Verónica López", servicio: "Diseñadora web", descripcion: "Desarrollo de páginas web y aplicaciones", paga: "$ 22.000 CLP", estado: "---" },
    { id: 7652, nombre: "Ricardo Díaz", servicio: "Chef personal", descripcion: "Chef especializado en cocina internacional", paga: "$ 35.000 CLP", estado: "---" },
    { id: 9461, nombre: "Marta Hernández", servicio: "Profesor de inglés", descripcion: "Clases de inglés para principiantes", paga: "$ 13.000 CLP", estado: "---" },
    { id: 3571, nombre: "Carmen García", servicio: "Técnico en informática", descripcion: "Reparación de computadoras y redes", paga: "$ 17.000 CLP", estado: "---" },
    { id: 6310, nombre: "Roberto Sánchez", servicio: "Abogado de familia", descripcion: "Asesoría legal en divorcios y custodias", paga: "$ 25.000 CLP", estado: "---" },
    { id: 2849, nombre: "Gloria Fernández", servicio: "Consultora de marketing", descripcion: "Estrategias de marketing para pequeñas empresas", paga: "$ 23.000 CLP", estado: "---" },
    { id: 9302, nombre: "Julio Díaz", servicio: "Plomero", descripcion: "Reparación y mantenimiento de sistemas de fontanería", paga: "$ 16.000 CLP", estado: "---" },
    { id: 1845, nombre: "Sofía Sánchez", servicio: "Entrenadora personal", descripcion: "Sesiones de entrenamiento físico personalizadas", paga: "$ 19.000 CLP", estado: "---" },
    { id: 3842, nombre: "Carlos Peña", servicio: "Electricista", descripcion: "Instalación de cableado eléctrico", paga: "$ 22.000 CLP", estado: "---" }
];

// Función para cambiar el estado de una solicitud
function cambiarEstado(id, nuevoEstado) {
    const solicitud = solicitudes.find(s => s.id === id);  // Buscar solicitud por ID
    if (solicitud) {
        solicitud.estado = nuevoEstado;  // Actualizar estado

        // Actualizar la tabla después de cambiar el estado
        actualizarTabla();
    }
}

// Función para actualizar la tabla con el estado
function actualizarTabla() {
    const tableBody = document.querySelector("#solicitudesTable");
    tableBody.innerHTML = "";  // Limpiar tabla

    solicitudes.forEach(solicitud => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${solicitud.id}</td>
            <td>${solicitud.nombre}</td>
            <td>${solicitud.servicio}</td>
            <td>${solicitud.descripcion}</td>
            <td>${solicitud.paga}</td>
            <td class="estado">${solicitud.estado}</td>
            <td>
                <button class="btn btn-aceptar" onclick="cambiarEstado(${solicitud.id}, 'aceptado')">Aceptar</button>
                <button class="btn btn-rechazar" onclick="cambiarEstado(${solicitud.id}, 'rechazado')">Rechazar</button>
                <button class="btn btn-pendiente" onclick="cambiarEstado(${solicitud.id}, 'pendiente')">Pendiente</button>
            </td>
        `;

        tableBody.appendChild(tr);
    });
}

// Llamada inicial para llenar la tabla con el estado "---"
actualizarTabla();