const URL_BASE = 'https://dummyjson.com/products';

let omitir = 0;
const limite = 10;
let totalResultados = 0;

document.addEventListener('DOMContentLoaded', () => {
    const cuerpoTabla = document.getElementById('cuerpoTabla');
    if (cuerpoTabla) {
        llenarCategoriasFiltro();
        obtenerProductos();
        configurarEventosTablero();
    }

    const selectFormulario = document.getElementById('categoria');
    const formularioNuevo = document.getElementById('formularioNuevo');
    
    if (selectFormulario && formularioNuevo) {
        llenarCategoriasFormulario(selectFormulario);
        configurarEnvioFormulario(formularioNuevo);
    }
});

async function obtenerProductos(filtros = {}) {
    let url = `${URL_BASE}?limit=${limite}&skip=${omitir}`;
    
    const categoria = document.getElementById('filtroCategoria').value;
    const busqueda = filtros.busqueda || document.getElementById('busquedaInput').value;

    if (busqueda) {
        url = `${URL_BASE}/search?q=${busqueda}&limit=${limite}&skip=${omitir}`;
    } else if (categoria) {
        url = `${URL_BASE}/category/${categoria}?limit=${limite}&skip=${omitir}`;
    }

    // Aplicar ordenamiento
    const [campo, orden] = document.getElementById('filtroOrden').value.split('-');
    url += `&sortBy=${campo}&order=${orden}`;

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        totalResultados = datos.total;
        dibujarTabla(datos.products);
        actualizarPaginacion();
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
}

function dibujarTabla(productos) {
    const tabla = document.getElementById('cuerpoTabla');
    tabla.innerHTML = '';

    productos.forEach(p => {
        const fila = document.createElement('tr');
        fila.id = `fila-${p.id}`;
        fila.innerHTML = `
            <td>${p.id}</td>
            <td><img src="${p.thumbnail}" width="50" style="border-radius:5px"></td>
            <td style="font-weight:bold">${p.title}</td>
            <td style="color:#FF0000">$${p.price}</td>
            <td>
                <button onclick="borrarProducto(${p.id})" style="cursor:pointer; background:none; border:none; font-size:1.2rem;">🗑️</button>
            </td>
        `;
        tabla.appendChild(fila);
    });

    // Actualizar tarjetas
    document.getElementById('totalProductos').textContent = totalResultados;
    document.getElementById('categoriaActual').textContent = document.getElementById('filtroCategoria').value || "Todas";
}

async function llenarCategoriasFiltro() {
    const res = await fetch(`${URL_BASE}/category-list`);
    const lista = await res.json();
    const combo = document.getElementById('filtroCategoria');
    lista.forEach(cat => {
        const opcion = document.createElement('option');
        opcion.value = cat;
        opcion.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        combo.appendChild(opcion);
    });
}

function configurarEventosTablero() {
    // Paginación
    document.getElementById('siguienteBtn').onclick = () => {
        if (omitir + limite < totalResultados) {
            omitir += limite;
            obtenerProductos();
        }
    };

    document.getElementById('anteriorBtn').onclick = () => {
        if (omitir > 0) {
            omitir -= limite;
            obtenerProductos();
        }
    };

    // Buscador
    document.getElementById('busquedaInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            omitir = 0;
            obtenerProductos();
        }
    });

    // Filtros de categoría y orden
    document.getElementById('filtroCategoria').onchange = () => { omitir = 0; obtenerProductos(); };
    document.getElementById('filtroOrden').onchange = () => obtenerProductos();
}

async function borrarProducto(id) {
    if (confirm("¿Deseas eliminar este registro del inventario?")) {
        await fetch(`${URL_BASE}/${id}`, { method: 'DELETE' });
        document.getElementById(`fila-${id}`).style.opacity = '0.3';
        alert("Simulación de borrado exitosa.");
    }
}

async function llenarCategoriasFormulario(selectElement) {
    const res = await fetch(`${URL_BASE}/category-list`);
    const categorias = await res.json();
    selectElement.innerHTML = ''; 
    categorias.forEach(cat => {
        const opcion = document.createElement('option');
        opcion.value = cat;
        opcion.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        selectElement.appendChild(opcion);
    });
}

function configurarEnvioFormulario(formulario) {
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();
        const productoData = {
            title: document.getElementById('titulo').value,
            price: parseFloat(document.getElementById('precio').value),
            category: document.getElementById('categoria').value,
            description: document.getElementById('descripcion').value
        };

        const respuesta = await fetch(`${URL_BASE}/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productoData)
        });
        const data = await respuesta.json();
        
        const cajaMensaje = document.getElementById('cajaMensaje');
        cajaMensaje.style.display = 'block';
        cajaMensaje.style.color = '#00FF00';
        cajaMensaje.innerHTML = `<strong>Éxito:</strong> Producto "${data.title}" creado con ID ${data.id}`;
    });
}

function actualizarPaginacion() {
    document.getElementById('textoPaginacion').textContent = `Página ${Math.floor(omitir / limite) + 1}`;
    document.getElementById('anteriorBtn').disabled = (omitir === 0);
    document.getElementById('siguienteBtn').disabled = (omitir + limite >= totalResultados);
}