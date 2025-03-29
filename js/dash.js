document.addEventListener("DOMContentLoaded", function() {
    let progress = localStorage.getItem("courseProgress"); 

    // Si no hay progreso guardado, se inicia en 0
    if (progress === null) {
        progress = 0;
    } else {
        progress = parseInt(progress); // Convertimos a número
    }

    updateProgressBars(progress);

    document.getElementById("complete-button")?.addEventListener("click", function() {
        markModuleAsCompleted(progress);
    });
});

function markModuleAsCompleted(currentProgress) {
    // Solo incrementar si el progreso es menor a 20
    if (currentProgress < 20) {
        currentProgress = 20; // Se establece en 20 solo una vez
        localStorage.setItem("courseProgress", currentProgress); // Guardar en localStorage
        updateProgressBars(currentProgress);
    } else {
        alert("Ya has completado este módulo.");
    }
}

function updateProgressBars(progress) {
    const progressBar = document.getElementById("progress-bar");
    const sidebarProgressBar = document.getElementById("sidebar-progress-bar");

    // Actualizar la barra de progreso
    if (progressBar) {
        progressBar.style.width = progress + "%";
        progressBar.textContent = progress + "%";
    }

    // Actualizar la barra de la sidebar
    if (sidebarProgressBar) {
        sidebarProgressBar.style.width = progress + "%";
        sidebarProgressBar.textContent = progress + "%";
    }
}
