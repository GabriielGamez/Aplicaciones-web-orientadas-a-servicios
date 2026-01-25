/**
 * main.js - Portfolio de Gabriel Gámez
 * Dinamismo y efectos visuales
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Efecto de Máquina de Escribir (Typing Effect)
    const textElement = document.querySelector('.typing-text');
    const phrases = [
        "Proximo Desarrollador de Software Multiplataforma.",
        "Estudiante de T.S.U en Desarrollo de software.",
        "Apasionado por Java, Javascript, PHP y C#.",
        "Bienvenido a mi repositorio de prácticas."
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delay = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            delay = 50;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            delay = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            delay = 2000; // Pausa al terminar de escribir
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 500;
        }

        setTimeout(type, delay);
    }

    // Iniciar animación de texto
    type();

    // 2. Efecto de "Luz de Neón" Dinámica en el Avatar
    const avatar = document.querySelector('.avatar-container');
    
    document.addEventListener('mousemove', (e) => {
        // Obtenemos la posición del ratón
        const { clientX, clientY } = e;
        const { left, top, width, height } = avatar.getBoundingClientRect();
        
        // Calculamos el centro del avatar
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        
        // Calculamos la distancia
        const moveX = (clientX - centerX) / 15;
        const moveY = (clientY - centerY) / 15;

        // Movemos sutilmente el resplandor interno
        avatar.style.boxShadow = `
            ${moveX}px ${moveY}px 30px rgba(255, 0, 60, 0.4), 
            inset 0 0 20px rgba(255, 0, 60, 0.2)
        `;
    });
});