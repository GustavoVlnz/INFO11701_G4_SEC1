// Array de usuarios con datos ampliados
const usuarios = [
    { id: 12345, nombre: 'Lucía Fernández', correo: 'lucia.fernandez@gmail.com', tipo: 'Prestador' },
    { id: 23456, nombre: 'Alejandro Martínez', correo: 'alejandro.martinez@hotmail.com', tipo: 'Cliente' },
    { id: 34567, nombre: 'Sofía Ramírez', correo: 'sofia.ramirez@gmail.com', tipo: 'Prestador' },
    { id: 45678, nombre: 'Diego Torres', correo: 'diego.torres@hotmail.com', tipo: 'Administrador' },
    { id: 56789, nombre: 'Camila Ortega', correo: 'camila.ortega@gmail.com', tipo: 'Prestador' },
    { id: 67890, nombre: 'Mateo Jiménez', correo: 'mateo.jimenez@hotmail.com', tipo: 'Cliente' },
    { id: 78901, nombre: 'Valentina Castro', correo: 'valentina.castro@gmail.com', tipo: 'Prestador' },
    { id: 89012, nombre: 'Bruno Morales', correo: 'bruno.morales@hotmail.com', tipo: 'Prestador' },
    { id: 90123, nombre: 'Isabella Mendoza', correo: 'isabella.mendoza@gmail.com', tipo: 'Cliente' },
    { id: 23457, nombre: 'Natalia Gómez', correo: 'natalia.gomez@gmail.com', tipo: 'Cliente' },
    { id: 34568, nombre: 'Javier Ruiz', correo: 'javier.ruiz@hotmail.com', tipo: 'Prestador' },
    { id: 45679, nombre: 'Mariana Castro', correo: 'mariana.castro@gmail.com', tipo: 'Prestador' },
    { id: 56780, nombre: 'Luis Herrera', correo: 'luis.herrera@hotmail.com', tipo: 'Administrador' },
    { id: 67891, nombre: 'Victoria Díaz', correo: 'victoria.diaz@gmail.com', tipo: 'Cliente' },
    { id: 78902, nombre: 'Gonzalo Pérez', correo: 'gonzalo.perez@hotmail.com', tipo: 'Prestador' },
    // Nuevos usuarios
    { id: 89013, nombre: 'Renata Silva', correo: 'renata.silva@gmail.com', tipo: 'Cliente' },
    { id: 90124, nombre: 'Marco Peña', correo: 'marco.pena@hotmail.com', tipo: 'Prestador' },
    { id: 12347, nombre: 'Ángela Soto', correo: 'angela.soto@gmail.com', tipo: 'Prestador' },
    { id: 23458, nombre: 'Cristian Villanueva', correo: 'cristian.villanueva@hotmail.com', tipo: 'Cliente' },
    { id: 34569, nombre: 'Lina Romero', correo: 'lina.romero@gmail.com', tipo: 'Prestador' },
    { id: 45680, nombre: 'Nicolás Salazar', correo: 'nicolas.salazar@hotmail.com', tipo: 'Prestador' },
    { id: 56781, nombre: 'Carolina Vega', correo: 'carolina.vega@gmail.com', tipo: 'Cliente' },
    { id: 67892, nombre: 'Miguel Ángel Gómez', correo: 'miguel.gomez@hotmail.com', tipo: 'Prestador' },
    { id: 78903, nombre: 'Ana Beltrán', correo: 'ana.beltran@gmail.com', tipo: 'Prestador' },
    { id: 89014, nombre: 'Tomás Fuentes', correo: 'tomas.fuentes@hotmail.com', tipo: 'Cliente' },
    { id: 90125, nombre: 'Clara Hidalgo', correo: 'clara.hidalgo@gmail.com', tipo: 'Prestador' },
    { id: 12348, nombre: 'Pablo López', correo: 'pablo.lopez@hotmail.com', tipo: 'Cliente' },
    { id: 23459, nombre: 'Rosa Navarro', correo: 'rosa.navarro@gmail.com', tipo: 'Prestador' },
    { id: 34570, nombre: 'Esteban Cruz', correo: 'esteban.cruz@hotmail.com', tipo: 'Prestador' },
    { id: 45681, nombre: 'Gabriela Sánchez', correo: 'gabriela.sanchez@gmail.com', tipo: 'Prestador' }
];

// Funciones para estrellas y eficiencia
const generarEstrellas = () => `${Math.floor(Math.random() * 5) + 1} ☆`;
const generarEficiencia = () => Math.floor(Math.random() * 91) + 10;

// Agregar usuarios dinámicamente
const tablaUsuarios = document.querySelector('#tabla-usuarios tbody');
usuarios.forEach(usuario => {
    const fila = document.createElement('tr');
    const eficiencia = usuario.tipo === 'Prestador' ? generarEficiencia() : null;
    fila.innerHTML = `
        <td>${usuario.id}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.correo}</td>
        <td>${usuario.tipo}</td>
        <td>${usuario.tipo === 'Prestador' ? generarEstrellas() : 'N/A'}</td>
        <td>
            ${usuario.tipo === 'Prestador' ? eficiencia + '%' : 'N/A'}
            ${
                usuario.tipo === 'Prestador' && eficiencia < 25
                    ? `<button class="btn btn-success btn-notificar">Notificar ineficiencia</button>`
                    : ''
            }
        </td>
        <td>
            <button class="btn btn-editar">Editar</button>
            <button class="btn btn-eliminar">Eliminar</button>
        </td>
    `;

    // Configuración del botón de ineficiencia
    if (usuario.tipo === 'Prestador' && eficiencia < 25) {
        const botonNotificar = fila.querySelector('.btn-notificar');
        botonNotificar.addEventListener('click', () => {
            botonNotificar.textContent = 'Enviado';
            botonNotificar.disabled = true;
            botonNotificar.classList.remove('btn-success');
            botonNotificar.classList.add('btn-secondary');
            botonNotificar.style.cursor = 'default';
        });
    }

    tablaUsuarios.appendChild(fila);
});
