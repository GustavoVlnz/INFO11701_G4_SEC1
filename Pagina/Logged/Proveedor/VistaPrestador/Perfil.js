// Función para mostrar el formulario de edición
function editarPerfil() {
    document.getElementById('form-editar').style.display = 'block';  // Mostrar el formulario
    document.getElementById('editar-btn').style.display = 'none';   // Ocultar el botón de editar

    // Rellenar el formulario con los valores actuales
    document.getElementById('nombre').value = document.getElementById('nombre-display').textContent;
    document.getElementById('telefono').value = document.getElementById('telefono-display').textContent;
    document.getElementById('correo').value = document.getElementById('correo-display').textContent;
}

// Función para guardar los cambios (en un entorno real, se enviaría al servidor)
function guardarPerfil() {
    // Aquí se pueden agregar validaciones antes de guardar los datos.

    // Obtener los nuevos valores
    const nuevoNombre = document.getElementById('nombre').value;
    const nuevoTelefono = document.getElementById('telefono').value;
    const nuevoCorreo = document.getElementById('correo').value;

    // Actualizar la información en la pantalla (en un entorno real, se enviaría al servidor)
    document.getElementById('nombre-display').textContent = nuevoNombre;
    document.getElementById('telefono-display').textContent = nuevoTelefono;
    document.getElementById('correo-display').textContent = nuevoCorreo;

    // Ocultar el formulario y mostrar el botón de editar de nuevo
    document.getElementById('form-editar').style.display = 'none';
    document.getElementById('editar-btn').style.display = 'inline';
}

// Función para activar la selección de imagen
function cargarImagen() {
    document.getElementById('input-imagen').click();
}

// Función para previsualizar la imagen seleccionada
function previsualizarImagen(event) {
    const archivo = event.target.files[0];
    const lector = new FileReader();

    lector.onload = function(e) {
        document.getElementById('foto-perfil').src = e.target.result;  // Cambiar la imagen de perfil
    }

    lector.readAsDataURL(archivo);  // Leer el archivo de imagen como una URL
}
