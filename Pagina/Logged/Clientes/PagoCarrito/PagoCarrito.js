const precioServicio = 320000; 
const iva = 0.19;
const descuentoInput = document.getElementById('codigo-descuento');
const btnAplicar = document.querySelector('.btn-aplicar');
const totalPago = document.querySelector('.detalle-pago p:nth-of-type(4)'); // Selecciona el párrafo del total
const btnPagar = document.querySelector('.btn-pago');

// Función para calcular el total con IVA y descuento
function calcularTotal(descuento) {
    const totalConIva = precioServicio + (precioServicio * iva);
    const totalFinal = totalConIva - descuento;
    return totalFinal;
}

// Evento para aplicar el descuento
btnAplicar.addEventListener('click', () => {
    const descuento = parseFloat(descuentoInput.value) || 0;
    const totalFinal = calcularTotal(descuento);

    totalPago.textContent = `Total a pagar: $${totalFinal.toFixed(0)} CLP`;
    
    if (descuentoInput.value === "") {
        alert("Por favor, ingresa un código de descuento válido.");
    }
});

// Evento para realizar el pago, mostrar el toast y redirigir
btnPagar.addEventListener('click', () => {
    const total = parseFloat(totalPago.textContent.split('$')[1].replace(' CLP', ''));
    
    // Mostrar notificación toast
    const toastElement = document.getElementById('liveToast');
    const toast = new bootstrap.Toast(toastElement);
    toast.show();

    // Redirigir después de un tiempo
    setTimeout(() => {
        window.location.href = '../progreso y detalles/progresoPedido.html'; // Cambia por la URL a donde quieres redirigir
    }, 3000); // 3 segundos antes de redirigir
});
