const cloudname = "dq63gma00";
const present = "APLICACIONES WEB";

const inpuntform = document.getElementById("inputfile");
const ver = document.getElementById("ver");
const image = document.getElementById("imagen");
const btnSubir = document.getElementById("btnSubir");
const txtSubir = document.getElementById("textoSubir");
const spin = document.getElementById("spinner");
const btnReiniciar = document.getElementById("btnReiniciar");

btnSubir.addEventListener('click', () => {
    const archivo = inpuntform.files[0];

    if (!archivo) {
        alert("Selecciona una imagen primero.");
        return;
    }

    btnSubir.disabled = true;
    spin.style.display = "block";
    txtSubir.innerHTML = "<strong>Subiendo...</strong>";

    const formData = new FormData();
    formData.append('file', archivo);
    formData.append('upload_preset', present);

    fetch(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const transformaciones = "w_300,h_300,c_fill,e_grayscale,r_30";
        const urlTransformada = data.secure_url.replace("/upload/", `/upload/${transformaciones}/`);

        image.src = urlTransformada;
        txtSubir.innerHTML = "<span style='color: green;'><strong>¡Listo!</strong></span>";
        // reinicio
        btnReiniciar.style.display = "inline-block";
        btnSubir.style.display = "none"; 
    })
    .catch(error => {
        txtSubir.innerHTML = "<span style='color: red;'>Error al subir.</span>";
    })
    .finally(() => {
        spin.style.display = "none";
    });
});

btnReiniciar.addEventListener('click', () => {
    //  limpiamos
    inpuntform.value = ""; 
    image.src = "";
    txtSubir.innerHTML = "";
    btnReiniciar.style.display = "none";
    btnSubir.style.display = "inline-block";
    btnSubir.disabled = false;
});