document.querySelectorAll('.detalles_btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const detallesDiv = this.closest('.agenda').querySelector('.detalles');
        detallesDiv.style.display = detallesDiv.style.display === 'none' ? 'block' : 'none';
    });
});

document.querySelectorAll('.aceptar_btn').forEach(btn => {
    btn.addEventListener('click', function() {
        alert("Servicio añadido a tu agenda");
    });
});

document.querySelectorAll('.rechazar_btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const razon = prompt("Por favor, especifica la razón del rechazo:");
        if (razon) {
            alert("Razón de rechazo: " + razon);
        }
    });
});
