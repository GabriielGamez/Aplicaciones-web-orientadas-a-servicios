const API_URL = 'https://pcextreme.grupoctic.com/appMovil/PCStatus/Api/apiServicios.php'
const contenedorServicios = document.getElementById("servicios-container")


const cargarServicios = ()=>{
    contenedorServicios.innerHTML=`
        <div class="loaging">
        <div class="spinner"></div>
        <p>Cargando servicios...</p>
        </div>
    `

    fetch(API_URL)
    .then(respuesta => respuesta.json())
    .then(data=>{
        const servicios = data

        console.log("Datos recibidos:", servicios)
        mostrarServicios(servicios)
    })
    .catch(error =>{
        console.log("Error al cargar los servicios:", error)
        contenedorServicios.innerHTML= `<p class="error"> Ocurrió un error al cargar los datos, revisa la consola" </p>`
    })
}

mostrarServicios=(servicios)=>{
    contenedorServicios.innerHTML = ""

    servicios.forEach(servicio => {
        const tarjeta = document.createElement("div")

        tarjeta.classList.add("card")
        tarjeta.innerHTML=`
        <img src="https://pcextreme.grupoctic.com/appWeb/aseets/${servicio.imagen}" alt="${servicio.titulo}" >
        <div class="card-content">
        <h2>${servicio.titulo}</h2>
        <p>${servicio.descripcion}</p>
        </div>
        `
        contenedorServicios.appendChild(tarjeta)
    });
}

cargarServicios()