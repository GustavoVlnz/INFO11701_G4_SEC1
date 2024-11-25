document.addEventListener("DOMContentLoaded", function () {
    const tbody = document.querySelector("#tabla-usuarios tbody");

    // Cargar los usuarios desde el servidor
    fetch("MostrarUsuarios.php")
        .then(response => response.json())
        .then(data => {
            tbody.innerHTML = ""; // Limpia el tbody antes de insertar datos
            data.forEach(usuario => {
                // Crear la fila principal del usuario
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${usuario.idUsuarios}</td>
                    <td>${usuario.nombres}</td>
                    <td>${usuario.apellidos}</td>
                    <td>${usuario.email}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="mostrarFormulario(${usuario.idUsuarios}, '${usuario.nombres}', '${usuario.apellidos}', '${usuario.email}')">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${usuario.idUsuarios})">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(row);

                // Crear la fila oculta para el formulario de edición
                const formRow = document.createElement("tr");
                formRow.style.display = "none";
                formRow.setAttribute("form-row", "true"); // Etiqueta para identificar las filas de formularios
                formRow.innerHTML = `
                    <td colspan="5">
                        <form id="form-editar-${usuario.idUsuarios}" onsubmit="guardarCambios(event, ${usuario.idUsuarios})">
                            <div class="mb-2">
                                <label>Nombre:</label>
                                <input type="text" name="nombres" value="${usuario.nombres}" class="form-control" required>
                            </div>
                            <div class="mb-2">
                                <label>Apellidos:</label>
                                <input type="text" name="apellidos" value="${usuario.apellidos}" class="form-control" required>
                            </div>
                            <div class="mb-2">
                                <label>Correo:</label>
                                <input type="email" name="email" value="${usuario.email}" class="form-control" required>
                            </div>
                            <button type="submit" class="btn btn-success btn-sm">Guardar</button>
                            <button type="button" class="btn btn-secondary btn-sm" onclick="ocultarFormulario(${usuario.idUsuarios})">Cancelar</button>
                        </form>
                    </td>
                `;
                tbody.appendChild(formRow);
            });
        })
        .catch(error => console.error("Error al cargar los usuarios:", error));
});

function mostrarNotificacion(mensaje) {
    const toastBody = document.querySelector('#liveToast .toast-body');
    toastBody.textContent = mensaje;

    const toastEl = document.getElementById('liveToast');
    const toast = new bootstrap.Toast(toastEl, { delay: 3000 }); // Configura un retraso de 3 segundos
    toast.show();
}

mostrarNotificacion("Notificación de prueba");


// Función para mostrar el formulario de edición
function mostrarFormulario(id, nombres, apellidos, email) {
    // Oculta cualquier formulario visible
    document.querySelectorAll("tr[form-row]").forEach(row => {
        row.style.display = "none";
    });

    // Muestra el formulario específico para el usuario
    const formRow = document.querySelector(`#form-editar-${id}`).parentNode.parentNode;
    formRow.style.display = "table-row";
}

// Función para ocultar el formulario de edición
function ocultarFormulario(id) {
    const formRow = document.querySelector(`#form-editar-${id}`).parentNode.parentNode;
    if (formRow) {
        formRow.style.display = "none"; // Oculta la fila del formulario
    }
}

// Función para guardar los cambios realizados en el formulario
function guardarCambios(event, id) {
    event.preventDefault();

    const form = document.querySelector(`#form-editar-${id}`);
    const formData = new FormData(form);

    formData.append("idUsuarios", id);

    fetch("ActualizarUsuario.php", {
        method: "POST",
        body: new URLSearchParams(formData)
    })
        .then(response => response.text())
        .then(data => {
            mostrarNotificacion(data);

            if (data.includes("Usuario actualizado correctamente")) {
                // Actualiza la tabla con los nuevos datos
                const filas = document.querySelectorAll("#tabla-usuarios tbody tr");
                filas.forEach(fila => {
                    const idCelda = fila.querySelector("td:first-child").textContent;
                    if (idCelda == id) {
                        fila.children[1].textContent = formData.get("nombres");
                        fila.children[2].textContent = formData.get("apellidos");
                        fila.children[3].textContent = formData.get("email");
                    }
                });

                ocultarFormulario(id); // Oculta el formulario al finalizar
            }
        })
        .catch(error => console.error("Error al actualizar el usuario:", error));
        mostrarNotificacion("Hubo un error al actualizar el usuario."); // Notificación en caso de error
}

function eliminarUsuario(id) {
    if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
        return;
    }

    console.log("Eliminando usuario con ID:", id); // Verifica que el ID es correcto

    fetch("eliminarUsuario.php", {
        method: "POST",
        body: new URLSearchParams({ idUsuarios: id })
    })
        .then(response => response.text())
        .then(data => {
            console.log("Respuesta del servidor:", data); // Verifica la respuesta del servidor
            mostrarNotificacion(data);

            if (data.includes("Usuario eliminado correctamente")) {
                document.querySelectorAll("#tabla-usuarios tbody tr").forEach(fila => {
                    if (fila.querySelector("td:first-child").textContent == id) {
                        fila.remove();
                    }
                });
            }
        })
        .catch(error => {
            console.error("Error al eliminar el usuario:", error);
            mostrarNotificacion("Hubo un error al eliminar el usuario.");
        });
}

function recargarTabla() {
    setTimeout(() => {
        // Lógica para cargar los datos de la tabla
        cargarDatosTabla();
    }, 3000); // Espera 3 segundos antes de recargar la tabla
}
