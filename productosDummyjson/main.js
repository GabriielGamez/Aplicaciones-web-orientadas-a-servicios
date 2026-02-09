const URL_API = 'https://dummyjson.com/products';
const contenedorProductos = document.getElementById('productos-contenedor');
const cajaBuscador = document.getElementById('buscador');
const contenedorDetalle = document.getElementById('detalle-producto-contenedor');


if (contenedorProductos) {
    fetch(URL_API)
        .then(res => res.json())
        .then(data => mostrarProductos(data.products));

    // Buscador 
    cajaBuscador.addEventListener('input', (e) => {
        const query = e.target.value;
        if (query.length > 0) {
            fetch(`${URL_API}/search?q=${query}`)
                .then(res => res.json())
                .then(data => mostrarProductos(data.products));
        } else {
            // Si está vacío, volvemos a cargar todos
            fetch(URL_API).then(res => res.json()).then(data => mostrarProductos(data.products));
        }
    });
}

function mostrarProductos(productos) {
    contenedorProductos.innerHTML = '';
    productos.forEach(p => {
        const card = document.createElement('div');
        card.className = 'tarjeta-producto';
        card.onclick = () => window.location.href = `detalles.html?id=${p.id}`;
        card.innerHTML = `
            <img src="${p.thumbnail}" alt="${p.title}">
            <p class="producto-categoria">${p.category}</p>
            <h3>${p.title}</h3>
            <p class="producto-precio">$${p.price}</p>
            <p>⭐ ${p.rating}</p>
        `;
        contenedorProductos.appendChild(card);
    });
}

// Detalle de producto
if (contenedorDetalle) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (id) {
        fetch(`${URL_API}/${id}`)
            .then(res => res.json())
            .then(p => {
                document.getElementById('titulo-pagina-detalle').innerText = p.title;
                contenedorDetalle.innerHTML = `
                    <img src="${p.thumbnail}" class="detalle-imagen">
                    <h2>${p.title}</h2>
                    <p class="producto-categoria">${p.category}</p>
                    <p>${p.description}</p>
                    <p class="producto-precio">Precio: $${p.price}</p>
                    <h3>Reseñas</h3>
                    ${p.reviews.map(r => `
                        <div class="resena-caja">
                            <p><strong>${r.reviewerName}</strong> (⭐ ${r.rating})</p>
                            <p>"${r.comment}"</p>
                        </div>
                    `).join('')}
                `;
            });
    }
}