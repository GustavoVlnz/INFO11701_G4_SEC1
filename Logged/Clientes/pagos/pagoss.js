const precioServicio = 320000;  // Precio del servicio
const iva = 0.19;  // IVA aplicable
const descuentoInput = document.getElementById('codigo-descuento');  // Input para el código de descuento
const btnAplicar = document.querySelector('.btn-aplicar');  // Botón para aplicar descuento
const totalPago = document.querySelector('.detalle-pago p:nth-of-type(4)');  // Elemento donde se muestra el total
const btnPagar = document.querySelector('.btn-pago');  // Botón de pago
const metodoPago = document.getElementById('metodo-pago');  // Div con las opciones de pago
const opcionesPago = document.getElementById('opciones-pago');  // Selector de métodos de pago
const tarjetaInfo = document.getElementById('tarjeta-info');  // Información de tarjeta
const btnConfirmarPago = document.querySelector('.btn-confirmar-pago');  // Botón para confirmar el pago

// Calcular el total con IVA y descuento
function calcularTotal(descuento) {
    const totalConIva = precioServicio + (precioServicio * iva);  // Total con IVA
    const totalFinal = totalConIva - descuento;  // Total final con descuento
    return totalFinal;
}

// Aplicar descuento
btnAplicar.addEventListener('click', () => {
    const descuento = parseFloat(descuentoInput.value) || 0;  // Obtener descuento (si no es válido, usar 0)
    const totalFinal = calcularTotal(descuento);  // Calcular el total con el descuento
    totalPago.textContent = `Total a pagar: $${totalFinal.toFixed(0)} CLP`;  // Mostrar el total
    
    if (descuentoInput.value === "") {
        alert("Por favor, ingresa un código de descuento válido.");
    }
});

// Mostrar las opciones de pago cuando se hace clic en 'Pagar'
btnPagar.addEventListener('click', () => {
    metodoPago.style.display = 'block';  // Muestra las opciones de pago
    metodoPago.scrollIntoView({ behavior: 'smooth' });  // Desplazamiento suave al formulario de pago
});

// Mostrar u ocultar campos de tarjeta según la selección del método de pago
opcionesPago.addEventListener('change', () => {
    tarjetaInfo.classList.add('oculto');  // Ocultar siempre el campo de tarjeta
    
    // Mostrar el campo de tarjeta si se selecciona tarjeta de débito o crédito
    if (opcionesPago.value === 'tarjeta-debito' || opcionesPago.value === 'tarjeta-credito') {
        tarjetaInfo.classList.remove('oculto');
    }
});

// Confirmar pago con tarjeta
btnConfirmarPago.addEventListener('click', () => {
    const metodoSeleccionado = opcionesPago.value;  // Método de pago seleccionado
    const total = parseFloat(totalPago.textContent.split('$')[1].replace(' CLP', ''));  // Obtener el total del pago
    
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
