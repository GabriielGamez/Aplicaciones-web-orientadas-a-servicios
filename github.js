const MI_USUARIO = "gabriielgamez"; // Reemplaza con tu usuario real
const API_URL = `https://api.github.com/users/${MI_USUARIO}`;

document.addEventListener('DOMContentLoaded', () => {
    consultarPerfil();
    consultarRepositorios();
    consultarSeguidores();
});

// Perfil
async function consultarPerfil() {
    const res = await fetch(API_URL);
    const d = await res.json();
    
    document.getElementById('perfil-contenedor').innerHTML = `
        <img src="${d.avatar_url}" alt="Avatar" class="avatar-grande">
        <div class="perfil-texto">
            <h2>${d.name || d.login}</h2>
            <p>${d.bio || 'Estudiante de TSU en Desarrollo de Software Multiplataforma en la UTHH.'}</p>
            <div class="stats-perfil">
                <span><strong>${d.public_repos}</strong> Repos</span>
                <span><strong>${d.followers}</strong> Seguidores</span>
                <span>📍 ${d.location || 'Huejutla, Hidalgo'}</span>
            </div>
        </div>
    `;
}

// Obtener Repositorio
async function consultarRepositorios() {
    const parametros = "sort=updated&per_page=6&type=owner&direction=desc";
    const res = await fetch(`${API_URL}/repos?${parametros}`);
    const repos = await res.json();
    
    const lista = document.getElementById('repos-contenedor');
    lista.innerHTML = '';

    repos.forEach(r => {
        lista.innerHTML += `
            <div class="practice-card">
                <div class="card-info">
                    <span class="card-tag">${r.language || 'Software'}</span>
                    <h3>${r.name}</h3>
                    <p>${r.description || 'Proyecto desarrollado y gestionado en GitHub.'}</p>
                    <div class="repo-meta">
                        <span>⭐ ${r.stargazers_count}</span>
                        <a href="${r.html_url}" target="_blank" class="enlace-rojo">Ver código →</a>
                    </div>
                </div>
            </div>
        `;
    });
}

// Seguidores
async function consultarSeguidores() {
    const res = await fetch(`${API_URL}/followers?per_page=5`);
    const segs = await res.json();
    
    const contenedor = document.getElementById('seguidores-contenedor');
    segs.forEach(s => {
        contenedor.innerHTML += `
            <a href="${s.html_url}" target="_blank">
                <img src="${s.avatar_url}" class="foto-seguidor" title="${s.login}">
            </a>
        `;
    });
}