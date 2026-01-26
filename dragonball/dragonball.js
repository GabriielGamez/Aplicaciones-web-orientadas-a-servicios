const urlApi = "https://dragonball-api.com/api/characters"

const cargarPersonajes = ()=> {
    fetch(urlApi)
    .then (respuesta => respuesta.json())
    .then(data => {
        const personajes = data.items;

        console.log("Datos recibidos:", personajes);
        mostrarPersonajes(personajes);
    })
    .catch(error => {
        console.log("Error al cargar los personajes:", error);
        alert("Hubo un error al cargar los datos, revisa la consola");
    })
}

mostrarPersonajes= (personajes)=>{
const contenedorPersonajes = document.getElementById("contenedor-personajes")
contenedorPersonajes.innerHTML = ""

personajes.forEach(personaje => {
    const tarjeta = document.createElement("div")

    tarjeta.classList.add("practice-card")

    tarjeta.innerHTML = `
    <img src="${personaje.image}" alt="${personaje.name}" width="100%" style="object-fit: contain; height: 300px;" >
    <h3 class="practice-title">${personaje.name}</h3>
    <p class="practice-description">${personaje.description}</p>
    <p><strong>Ki:</strong>${personaje.ki}</p>
    <p><strong>Genero:</strong>${personaje.gender}</p>
    <p><strong>Raza:</strong>${personaje.race}</p>
     
    `

    contenedorPersonajes.appendChild(tarjeta)
}
)}
