// ejemplo de datos iniciales (Eliminar si los datos se cargan desde una API o base de datos)
const services = [
    { id: 1, name: 'Limpieza', category: 'Hogar' },
    { id: 2, name: 'Cocina', category: 'Gastronomía' }
];

document.addEventListener('DOMContentLoaded', () => {
    const servicesTable = document.getElementById('services-table').getElementsByTagName('tbody')[0];
    // Funcion para actualizar la tabla con los datos de los servicios
    function updateTable() {
        servicesTable.innerHTML = '';
        services.forEach(service => {
            const row = servicesTable.insertRow();
            row.insertCell(0).textContent = service.id;
            row.insertCell(1).textContent = service.name;
            row.insertCell(2).textContent = service.category;
            const actionsCell = row.insertCell(3);
            actionsCell.innerHTML = `
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Eliminar</button>
            `;
        });
    }

    updateTable();
});
