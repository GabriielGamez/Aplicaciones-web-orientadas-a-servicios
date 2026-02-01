const URL_API = 'https://dummyjson.com/products';
const contenedorProductos = document.getElementById('productos-contenedor');
const cajaBuscador = document.getElementById('buscador');
const contenedorDetalle = document.getElementById('detalle-producto-contenedor');

let listaProductosLocal = [];

// extraer productos
if (contenedorProductos) {
    fetch(URL_API)
        .then(respuesta => respuesta.json())
        .then(datos => {
            listaProductosLocal = datos.products;
            mostrarProductos(listaProductosLocal);
        });

    function mostrarProductos(productos) {
        contenedorProductos.innerHTML = '';
        productos.forEach(item => {
            const div = document.createElement('div');
            div.className = 'tarjeta-producto';
            div.onclick = () => window.location.href = `detalles.html?id=${item.id}`;

            div.innerHTML = `
                <img src="${item.thumbnail}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p class="producto-categoria">${item.category}</p>
                <p class="producto-precio">$${item.price}</p>
                <p>⭐ ${item.rating}</p>
            `;
            contenedorProductos.appendChild(div);
        });
    }

    // Buscador
    cajaBuscador.addEventListener('input', (evento) => {
        const busqueda = evento.target.value.toLowerCase();
        const filtrados = listaProductosLocal.filter(p =>
            p.title.toLowerCase().includes(busqueda)
        );
        renderizarTarjetas(filtrados);
    });
}
// detalle
if (contenedorDetalle) {
    const parametrosURL = new URLSearchParams(window.location.search);
    const idProducto = parametrosURL.get('id');

    if (idProducto) {
        fetch(`${URL_API}/${idProducto}`)
            .then(res => res.json())
            .then(p => {
                document.getElementById('titulo-pagina-detalle').innerText = p.title;
                contenedorDetalle.innerHTML = `
                    <div style="text-align:center">
                        <img src="${p.thumbnail}" class="detalle-imagen">
                    </div>
                    <h2>${p.title}</h2>
                    <p class="producto-categoria">Categoría: ${p.category}</p>
                    <p><strong>Descripción:</strong> ${p.description}</p>
                    <p class="producto-precio">Precio: $${p.price}</p>
                    <hr>
                    <h3>Opiniones de Clientes</h3>
                    ${p.reviews.map(r => `
                        <div class="resena-caja">
                            <p><strong>${r.reviewerName}</strong> - ⭐ ${r.rating}</p>
                            <p><em>"${r.comment}"</em></p>
                        </div>
                    `).join('')}
                `;
            });
    }
}