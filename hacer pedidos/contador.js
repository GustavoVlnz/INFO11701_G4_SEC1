document.addEventListener("DOMContentLoaded", function() {
    const addButtons = document.querySelectorAll('.add-service');
    const cartList = document.querySelector('.service-cart');

    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceName = this.parentElement.querySelector('.service-info span').textContent;
            const serviceImage = this.parentElement.querySelector('img').src;

            let listItem = Array.from(cartList.querySelectorAll('.cart-item'))
                .find(item => item.querySelector('span').textContent === serviceName);

            if (listItem) {
                const counter = listItem.querySelector('.quantity-control span');
                counter.textContent = parseInt(counter.textContent) + 1;
            } else {
                listItem = document.createElement('div');
                listItem.classList.add('cart-item');
                listItem.innerHTML = `
                    <img src="${serviceImage}" alt="${serviceName}">
                    <span>${serviceName}</span>
                    <div class="quantity-control">
                        <button class="decrement">-</button>
                        <span>1</span>
                        <button class="increment">+</button>
                        <button class="remove-service">Eliminar</button>
                    </div>
                `;
                cartList.appendChild(listItem);
            }

            listItem.querySelector('.increment').addEventListener('click', function() {
                const counter = listItem.querySelector('.quantity-control span');
                counter.textContent = parseInt(counter.textContent) + 1;
            });

            listItem.querySelector('.decrement').addEventListener('click', function() {
                const counter = listItem.querySelector('.quantity-control span');
                if (parseInt(counter.textContent) > 1) {
                    counter.textContent = parseInt(counter.textContent) - 1;
                }
            });

            listItem.querySelector('.remove-service').addEventListener('click', function() {
                listItem.remove();
            });
        });
    });
});
