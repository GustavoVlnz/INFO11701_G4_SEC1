// Array de usuarios de ejemplo
const usuarios = [
    { id: 12345, nombre: 'Lucía Fernández', correo: 'lucia.fernandez@gmail.com' },
    { id: 23456, nombre: 'Alejandro Martínez', correo: 'alejandro.martinez@hotmail.com' },
    { id: 34567, nombre: 'Sofía Ramírez', correo: 'sofia.ramirez@gmail.com' },
    { id: 45678, nombre: 'Diego Torres', correo: 'diego.torres@hotmail.com' },
    { id: 56789, nombre: 'Camila Ortega', correo: 'camila.ortega@gmail.com' },
    { id: 67890, nombre: 'Mateo Jiménez', correo: 'mateo.jimenez@hotmail.com' },
    { id: 78901, nombre: 'Valentina Castro', correo: 'valentina.castro@gmail.com' },
    { id: 89012, nombre: 'Bruno Morales', correo: 'bruno.morales@hotmail.com' },
    { id: 90123, nombre: 'Isabella Mendoza', correo: 'isabella.mendoza@gmail.com' },
    { id: 12346, nombre: 'Felipe Ríos', correo: 'felipe.rios@hotmail.com' },
    { id: 23457, nombre: 'Natalia Gómez', correo: 'natalia.gomez@gmail.com' },
    { id: 34568, nombre: 'Javier Ruiz', correo: 'javier.ruiz@hotmail.com' },
    { id: 45679, nombre: 'Mariana Castro', correo: 'mariana.castro@gmail.com' },
    { id: 56780, nombre: 'Luis Herrera', correo: 'luis.herrera@hotmail.com' },
    { id: 67891, nombre: 'Victoria Díaz', correo: 'victoria.diaz@gmail.com' },
    { id: 78902, nombre: 'Gonzalo Pérez', correo: 'gonzalo.perez@hotmail.com' },
    { id: 89013, nombre: 'Renata Silva', correo: 'renata.silva@gmail.com' },
    { id: 90124, nombre: 'Marco Peña', correo: 'marco.pena@hotmail.com' },
    { id: 12347, nombre: 'Ángela Soto', correo: 'angela.soto@gmail.com' },
    { id: 23458, nombre: 'Cristian Villanueva', correo: 'cristian.villanueva@hotmail.com' },
    { id: 34569, nombre: 'Lina Romero', correo: 'lina.romero@gmail.com' },
    { id: 45680, nombre: 'Nicolás Salazar', correo: 'nicolas.salazar@hotmail.com' }
];

const tablaUsuarios = document.querySelector('#tabla-usuarios tbody');

usuarios.forEach(usuario => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${usuario.id}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.correo}</td>
        <td>
            <button class="btn btn-editar">Editar</button>
            <button class="btn btn-eliminar">Eliminar</button>
        </td>
    `;
    tablaUsuarios.appendChild(fila);
});