document.addEventListener("DOMContentLoaded", function () {
    const tbody = document.querySelector("#tabla-servicios tbody");

    // Cargar los servicios desde el servidor
    fetch("servicios.php")
        .then(response => response.json())
        .then(data => {
            tbody.innerHTML = ""; // Limpia el tbody antes de insertar datos
            data.forEach(servicio => {
                // Crear la fila principal del servicio
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${servicio.id_servicio}</td>
                    <td>${servicio.nombre_servicio}</td>
                    <td>${servicio.descripcion_corta}</td>
                    <td>${servicio.precio_servicio}</td>
                    <td>
                        <button class="btn btn-editar" onclick="mostrarFormularioServicio(${servicio.id_servicio}, '${servicio.nombre_servicio}', '${servicio.descripcion_corta}', ${servicio.precio_servicio})">Editar</button>
                    </td>
                `;
                tbody.appendChild(row);

                // Crear la fila oculta para el formulario de edición
                const formRow = document.createElement("tr");
                formRow.style.display = "none";
                formRow.setAttribute("form-row", "true"); // Etiqueta para identificar las filas de formularios
                formRow.innerHTML = `
                    <td colspan="5">
                        <form id="form-editar-servicio-${servicio.id_servicio}" onsubmit="guardarCambiosServicio(event, ${servicio.id_servicio})" style="width: 100%; padding: 15px; box-sizing: border-box;">
                            <div class="mb-2">
                                <label>Nombre:</label>
                                <input type="text" name="nombre" value="${servicio.nombre_servicio}" class="form-control" required>
                            </div>
                            <div class="mb-2">
                                <label>Detalle:</label>
                                <input type="text" name="descripcion" value="${servicio.descripcion_corta}" class="form-control" required>
                            </div>
                            <div class="mb-2">
                                <label>Precio:</label>
                                <input type="number" name="precio" value="${servicio.precio_servicio}" class="form-control" required>
                            </div>
                            <div class="form-group" style="display: flex; justify-content: space-between;">
                                <button type="submit" class="btn btn-success btn-sm">Guardar</button>
                                <button type="button" class="btn btn-secondary btn-sm" onclick="ocultarFormularioServicio(${servicio.id_servicio})">Cancelar</button>
                            </div>
                        </form>
                    </td>
                `;
                tbody.appendChild(formRow);
            });
        })
        .catch(error => console.error("Error al cargar los servicios:", error));
});

// Función para mostrar el formulario de edición de servicio
function mostrarFormularioServicio(id, nombre, descripcion, precio) {
    // Oculta cualquier formulario visible
    document.querySelectorAll("tr[form-row]").forEach(row => {
        row.style.display = "none";
    });

    // Muestra el formulario específico para el servicio
    const formRow = document.querySelector(`#form-editar-servicio-${id}`).parentNode.parentNode;
    formRow.style.display = "table-row";

    // Llenar los campos con la información actual del servicio
    const form = document.querySelector(`#form-editar-servicio-${id}`);
    form.querySelector('[name="nombre"]').value = nombre;
    form.querySelector('[name="descripcion"]').value = descripcion;
    form.querySelector('[name="precio"]').value = precio;
}

// Función para ocultar el formulario de edición de servicio
function ocultarFormularioServicio(id) {
    const formRow = document.querySelector(`#form-editar-servicio-${id}`).parentNode.parentNode;
    if (formRow) {
        formRow.style.display = "none"; // Oculta la fila del formulario
    }
}

function guardarCambiosServicio(event, id) {
    event.preventDefault();

    const form = event.target; // Utilizamos `event.target` porque esta función se ejecuta en el evento `onsubmit`.

    // Validar si es un formulario
    if (!(form instanceof HTMLFormElement)) {
        console.error("El formulario seleccionado no es válido");
        return;
    }

    const formData = new FormData(form);

    // Convertir FormData en URLSearchParams
    const urlParams = new URLSearchParams();
    formData.forEach((value, key) => {
        urlParams.append(key, value);
    });
    urlParams.append("id_servicio", id); // Asegurarse de que el id_servicio sea enviado correctamente

    fetch("ActualizarServicio.php", {
        method: "POST",
        body: urlParams,
    })
        .then((response) => response.text())
        .then((data) => {
            alert(data);

            if (data.includes("Servicio actualizado correctamente")) {
                // Actualiza la tabla con los nuevos datos
                const filas = document.querySelectorAll("#tabla-servicios tbody tr");
                filas.forEach((fila) => {
                    const idCelda = fila.querySelector("td:first-child").textContent;
                    if (idCelda == id) {
                        fila.children[1].textContent = formData.get("nombre");
                        fila.children[2].textContent = formData.get("detalle");
                        fila.children[3].textContent = formData.get("precio");
                    }
                });

                ocultarFormularioServicio(id); // Oculta el formulario al finalizar
            }
        })
        .catch((error) => console.error("Error al actualizar el servicio:", error));
}
