let progress = 0; // Variable para el progreso
const progressBar = document.getElementById("progress-bar");
const sidebarProgressBar = document.getElementById("sidebar-progress-bar");

// Recuperar el progreso desde localStorage al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    const savedProgress = localStorage.getItem("courseProgress");
    if (savedProgress) {
        progress = parseInt(savedProgress); // Convertimos el string a número
    }
    updateProgressBars(); // Actualizar la barra al cargar
});

// Evento al hacer clic en "Marcar como completado"
document.getElementById("complete-button")?.addEventListener("click", function() {
    markModuleAsCompleted();
});

function markModuleAsCompleted() {
    // Solo incrementar si el progreso es menor a 20
    if (progress < 20) {
        progress = 20; // Se establece en 20 solo una vez
        localStorage.setItem("courseProgress", progress); // Guardar en localStorage
        updateProgressBars(); // Actualizar la barra de progreso
    } else {
        alert("Ya has completado este módulo.");
    }
}

function updateProgressBars() {
    // Actualizar la barra de progreso
    progressBar.style.width = progress + "%";
    progressBar.textContent = progress + "%";
    
    // Actualizar la barra de la sidebar
    sidebarProgressBar.style.width = progress + "%";
    sidebarProgressBar.textContent = progress + "%";
}
