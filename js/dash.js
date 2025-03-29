let progress = 0; // Progreso inicial en 0 (si no hay progreso guardado)
const progressBar = document.getElementById("progress-bar");
const courseProgress = document.getElementById("course-progress");
const completionPercentage = document.getElementById("completion-percentage");

const sidebarProgressBar = document.getElementById("sidebar-progress-bar");
const sidebarCompletionPercentage = document.getElementById("sidebar-completion-percentage");

// Recuperar el progreso desde localStorage al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    const savedProgress = localStorage.getItem("courseProgress");
    if (savedProgress) {
        progress = parseInt(savedProgress); // Convertir el valor a número
        updateProgressBars();
    }
});

// Registrar cuando el alumno marca un módulo como completado
document.getElementById("complete-button")?.addEventListener("click", function() {
    markModuleAsCompleted();
});

function markModuleAsCompleted() {
    // Solo incrementar el progreso si es 0 (para que solo suba una vez)
    if (progress === 0) {
        progress = 20; // Incrementa a 20 solo la primera vez
        localStorage.setItem("courseProgress", progress); // Guardar el progreso en localStorage
        updateProgressBars();
    } else {
        alert("Ya has completado este módulo.");
    }
}

function updateProgressBars() {
    // Actualiza las barras de progreso
    progressBar.style.width = progress + "%";
    progressBar.textContent = progress + "%";
    courseProgress.textContent = progress + "%";
    completionPercentage.textContent = progress + "%";
    
    // Actualiza la barra de progreso en la sidebar
    sidebarProgressBar.style.width = progress + "%";
    sidebarProgressBar.textContent = progress + "%";
    sidebarCompletionPercentage.textContent = progress + "%";

    // Si el progreso alcanza el 100%, muestra un mensaje adicional
    if (progress === 100) {
        alert("¡Felicidades! Has completado el curso de HTML.");
    }
}
