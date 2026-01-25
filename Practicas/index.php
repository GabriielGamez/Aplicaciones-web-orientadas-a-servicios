<?php 
  $ruta = "../"; 
  include '../includes/header.php'; 
?>
    <main class="main-content">
    <section class="practicas-hero">
        <div class="container">
            <h1 class="reveal-text">MIS <span>PRÁCTICAS</span></h1>
            <p>Repaso detallado de los proyectos desarrollados en la UTHH.</p>
        </div>
    </section>
    <section class="practicas-grid-container awos-section">
        
        <h2 class="category-title">Ejercicios <span>(AWOS)</span></h2>
        <p class="section-desc">Aplicaciones Web Orientadas a Servicios - Tareas y prácticas de clase.</p>
        
        <div class="cards-grid">
            <div class="practice-card awos-card">
                <div class="card-image">
                    <img src="https://img.freepik.com/vector-premium/iconos-geolocalizacion-fondo-negro-conjunto-iconos-codigo-pin-lineal-mapa-geolocalizacion_166116-6078.jpg" alt="Tarea AWOS">
                    <div class="card-overlay">
                        <a href="Geolocalizacion2/index.html"><span class="view-more">VER TAREA</span></a></div>
                </div>
                <div class="card-info">
                    <span class="card-tag">SOA / Web Services</span>
                    <h3>Geolocalización 2</h3>
                    <p>Práctica de Geolocalización con coordenadas estaticas.</p>
                </div>
            </div>
            
            </div>
    </section>
    <section class="practicas-grid-container">
        <h2 class="category-title">Proyectos <span>Destacados</span></h2>
        <div class="cards-grid">
            <div class="practice-card">
                <div class="card-image">
                    <img src="../assets/registech.jpg" alt="RegisTech Project">
                    <div class="card-overlay"><span class="view-more">VER PROYECTO</span></div>
                </div>
                <div class="card-info">
                    <span class="card-tag">C# / MariaDB</span>
                    <h3>RegisTech Desktop</h3>
                    <p>Gestión de inventarios para la estadía técnica.</p>
                </div>
            </div>
            <div class="practice-card">
                <div class="card-image">
                    <img src="../assets/pcstatus.jpg" alt="PC Status Project">
                    <div class="card-overlay"><span class="view-more">VER PROYECTO</span></div>
                </div>
                <div class="card-info">
                    <span class="card-tag">Kotlin / MVP</span>
                    <h3>PC Status Mobile</h3>
                    <p>Monitoreo de hardware con arquitectura MVP.</p>
                </div>
            </div>
        </div>
    </section>

    
</main>

<?php include 'includes/footer.php'; ?>