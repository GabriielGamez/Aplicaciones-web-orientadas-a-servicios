const coordenadas = document.getElementById("parrafo")
const enlace = document.getElementById("enlace")

const obtener=()=>{
    //verificacion de compatibilidad
    if(navigator.geolocation){
        coordenadas.innerText="Localizando..."
        
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                const longitud = position.coords.longitude 
                const latitud = position.coords.latitude

                coordenadas.innerText="Latitud=" + latitud + ",  longitud=" + longitud;
                enlace.href="https://www.google.com/maps?q="+latitud+","+longitud
                enlace.style.display="block"
            })
    }else{
        coordenadas.innerText="No se pudo localizar"
    }
}