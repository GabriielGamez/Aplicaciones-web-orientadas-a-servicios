let lat
let lon 

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
        (respuesta)=>{
            lat = respuesta.coords.latitude
            lon = respuesta.coords.longitude
            //alert(lat + " ," +lon)
            const coordenadas = [lat,lon] 
            let map = L.map('map').setView(coordenadas,16)

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            let marcador = L.marker(coordenadas).addTo(map)
            marcador.bindPopup('<b>Estoy aqui...<br>mis cordenadas son: <br>' + lat + '<br> '+ lon ).openPopup()
        },
        (error)=>{}
    )
}else{

}