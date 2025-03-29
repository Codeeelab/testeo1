// Importar las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAOtp0JN2c0YMipeuuGArkVoYYAElT2Pl4",
  authDomain: "laboratorio-7bffd.firebaseapp.com",
  projectId: "laboratorio-7bffd",
  storageBucket: "laboratorio-7bffd.firebasestorage.app",
  messagingSenderId: "994264826341",
  appId: "1:994264826341:web:aeddc5b6cd6ba2e711af0c",
  measurementId: "G-1XKK73F69G"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Función para registrar al alumno
document.getElementById("registroForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const contrasena = document.getElementById("contrasena").value; // Contraseña proporcionada por el usuario

  try {
    // Crear el usuario con el correo y la contraseña proporcionados por el usuario
    const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
    const user = userCredential.user;

    // Guardar los datos del usuario en Firestore
    await setDoc(doc(db, "alumnos", user.uid), {
      nombre: nombre,
      correo: correo,
      usuario: correo.split("@")[0]
    });

    // Mostrar mensaje de éxito
    alert(`Registro exitoso. Tu usuario es: ${correo.split("@")[0]}. Alto capo rey.`);

    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = "login.html"; // Redirección a login.html

  } catch (error) {
    // Si ocurre un error, mostrar mensaje
    alert("Error en el registro: " + error.message);
  }
});

// Función para manejar el inicio de sesión
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevenir el comportamiento por defecto del formulario (recargar página)

  // Obtener el correo y la contraseña desde los campos del formulario
  const correo = document.getElementById("loginCorreo").value;
  const contrasena = document.getElementById("loginContrasena").value;

  try {
    // Intentar iniciar sesión con las credenciales del usuario
    const userCredential = await signInWithEmailAndPassword(auth, correo, contrasena);
    const user = userCredential.user;

    // Si el inicio de sesión es exitoso, redirigir al usuario a la página principal (dashboard)
    window.location.href = "dashboard.html"; // Asegúrate de tener esta página configurada

  } catch (error) {
    // Manejar errores que puedan ocurrir durante el inicio de sesión
    const errorCode = error.code;
    const errorMessage = error.message;

    // Mostrar mensaje de error en función del código de error
    if (errorCode === 'auth/wrong-password') {
      alert("Contraseña incorrecta. Intenta de nuevo wachin.");
    } else if (errorCode === 'auth/user-not-found') {
      alert("No se encontró un usuario con ese correo ¿lo pusiste bien?.");
    } else if (errorCode === 'auth/invalid-email') {
      alert("Correo electrónico inválido.");
    } else {
      alert("Error al iniciar sesión: " + errorMessage);
    }
  }
});
