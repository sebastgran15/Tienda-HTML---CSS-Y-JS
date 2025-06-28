document.addEventListener('DOMContentLoaded', () => {
    const productos = Array.from(document.querySelectorAll('.producto'));
    const carritoSection = document.getElementById('carrito');
    let carrito = [];

    function nuevoCarrito() {
        // Limpiar contenido anterior
        carritoSection.innerHTML = `
                <h2>🛒 Carrito</h2>
                <div id="carrito-items"></div>
                <div id="carrito-total"></div>
                <div id="carrito-actions"></div>
            `;

        const itemsDiv = carritoSection.querySelector('#carrito-items');
        const totalDiv = carritoSection.querySelector('#carrito-total');
        const actionsDiv = carritoSection.querySelector('#carrito-actions');

        if (carrito.length === 0) {
            itemsDiv.innerHTML = `<div class="carrito-vacio">No se ha agregado artículos</div>`;
            totalDiv.innerHTML = '';
            actionsDiv.innerHTML = '';
            return;
        }

        // Mostrar productos en el carrito
        itemsDiv.innerHTML = carrito.map((item, idx) => `
                <div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;padding:0.4rem 0;border-bottom:1px solid #e0e0e0;">
                    <span style="flex:1;">${item.nombre} <span style="color:#888;">x${item.cantidad}</span></span>
                    <span style="color:#2d89ef;font-weight:bold;">C$${item.precio * item.cantidad}</span>
                    <button aria-label="Eliminar" style="background:#ff4d4d;color:#fff;border:none;border-radius:3px;padding:0.2rem 0.6rem;cursor:pointer;font-size:1rem;" onclick="window.eliminarDelCarrito(${idx})">✖</button>
                </div>
            `).join('');

        // Calcular total
        const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
        totalDiv.innerHTML = `<div style="text-align:right;font-weight:bold;font-size:1.1rem;margin-top:0.7rem;">Total: C$${total}</div>`;

        // Acciones
        actionsDiv.innerHTML = `
                <button id="vaciar-carrito">Vaciar Carrito</button>
                <button id="realizar-compra">Realizar Compra</button>
            `;

        document.getElementById('vaciar-carrito').onclick = () => {
            carrito = [];
            nuevoCarrito();
        };

        document.getElementById('realizar-compra').onclick = () => {
            alert('¡Gracias por tu compra!');
            carrito = [];
            nuevoCarrito();
        };
    }

    // Hacer la función de eliminar global para el botón X
    window.eliminarDelCarrito = function (idx) {
        carrito.splice(idx, 1);
        nuevoCarrito();
    };

    // Agregar evento a cada botón de producto
    productos.forEach(producto => {
        const btn = producto.querySelector('button');
        btn.addEventListener('click', () => {
            const nombre = producto.querySelector('h3').textContent;
            // Extraer solo el número de la cadena "C$650"
            const precio = parseFloat(producto.querySelector('.precio').textContent.replace('C$', '').replace(',', '').trim());
            const idx = carrito.findIndex(item => item.nombre === nombre);
            if (idx !== -1) {
                carrito[idx].cantidad += 1;
            } else {
                carrito.push({ nombre, precio, cantidad: 1 });
            }
            nuevoCarrito();
        });
    });

    nuevoCarrito();
});