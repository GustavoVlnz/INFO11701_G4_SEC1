const precioServicio = 320000;
const iva = 0.19;
const descuentoInput = document.getElementById('codigo-descuento');
const btnAplicar = document.querySelector('.btn-aplicar');
const totalPago = document.querySelector('.detalle-pago p:nth-of-type(4)'); // Selecciona el párrafo del total
const btnPagar = document.querySelector('.btn-pago');
const metodoPago = document.getElementById('metodo-pago');
const opcionesPago = document.getElementById('opciones-pago');
const tarjetaInfo = document.getElementById('tarjeta-info');
const btnConfirmarPago = document.querySelector('.btn-confirmar-pago');

// Calcular el total con IVA y descuento
function calcularTotal(descuento) {
    const totalConIva = precioServicio + (precioServicio * iva);
    const totalFinal = totalConIva - descuento;
    return totalFinal;
}

// Aplicar descuento
btnAplicar.addEventListener('click', () => {
    const descuento = parseFloat(descuentoInput.value) || 0;
    const totalFinal = calcularTotal(descuento);
    totalPago.textContent = `Total a pagar: $${totalFinal.toFixed(0)} CLP`;
    
    if (descuentoInput.value === "") {
        alert("Por favor, ingresa un código de descuento válido.");
    }
});

// Mostrar las opciones de pago cuando se hace clic en 'Pagar'
btnPagar.addEventListener('click', () => {
    metodoPago.style.display = 'block'; // Muestra las opciones de pago
    metodoPago.scrollIntoView({ behavior: 'smooth' }); // Desplaza suavemente el formulario a la vista
});

// Mostrar u ocultar campos de tarjeta según la selección del método de pago
opcionesPago.addEventListener('change', () => {
    // Ocultar siempre el campo de tarjeta al cambiar de opción
    tarjetaInfo.classList.add('oculto');
    
    // Mostrar el campo de tarjeta si se selecciona tarjeta de débito o crédito
    if (opcionesPago.value === 'tarjeta-debito' || opcionesPago.value === 'tarjeta-credito') {
        tarjetaInfo.classList.remove('oculto');
    }
});

// Confirmar pago con tarjeta
btnConfirmarPago.addEventListener('click', () => {
    const metodoSeleccionado = opcionesPago.value;
    const total = parseFloat(totalPago.textContent.split('$')[1].replace(' CLP', ''));
    
    // Validación de campos de tarjeta
    if ((metodoSeleccionado === 'tarjeta-debito' || metodoSeleccionado === 'tarjeta-credito') &&
        (!document.getElementById('nombre-tarjeta').value ||
         !document.getElementById('numero-tarjeta').value ||
         !document.getElementById('fecha-expiracion').value ||
         !document.getElementById('cvv').value)) {
        
        alert('Por favor, rellene todos los campos de la tarjeta.');
        return;
    }
    
    alert(`Pago confirmado con ${metodoSeleccionado}. Total: $${total} CLP.`);
});
