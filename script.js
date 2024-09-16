const nameInput = document.querySelector('.name');
const imgInput = document.querySelector('.urlImg');
const puestosInput = document.querySelector('.puestosInput');
const container = document.querySelector('.container');
const btnSend = document.querySelector('.btn-send');
const errorMessage = document.querySelector('.error_message');

// Función para validar la URL
function isValidUrl(url) {
    const regex = /^https:\/\/github\.com\/.+\.png$/;
    return regex.test(url);
}

// Función que verifica si todos los inputs están llenos y la URL es válida
function checkInputs() {
    const isUrlValid = isValidUrl(imgInput.value);

    if (nameInput.value && imgInput.value && puestosInput.value && isUrlValid) {
        btnSend.disabled = false;  // Habilita el botón si todo está correcto
        errorMessage.style.display = 'none'; // Oculta el mensaje de error
        imgInput.setCustomValidity(''); // Limpia el mensaje de error del input
    } else {
        btnSend.disabled = true;   // Deshabilita el botón si falta algún input o la URL es incorrecta

        if (!isUrlValid && imgInput.value) {
            errorMessage.textContent = 'La URL debe seguir el formato https://github.com/NombreDeUsuario.png';
            errorMessage.style.display = 'inline'; // Muestra el mensaje de error
            imgInput.setCustomValidity('La URL no es válida'); // Añade un mensaje de error personalizado en el input
        } else {
            errorMessage.style.display = 'none'; // Oculta el mensaje de error si la URL está vacía
            imgInput.setCustomValidity(''); // Limpia el mensaje de error del input
        }
    }
}

// Agrega eventos a los inputs para verificar si se llenaron y son válidos
nameInput.addEventListener('input', checkInputs);
imgInput.addEventListener('input', checkInputs);
puestosInput.addEventListener('input', checkInputs);

// Mostrar u ocultar la lista de usuarios al enviar
btnSend.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Cambia la visibilidad del contenedor al enviar
    if (container.style.display === 'none') {
        container.style.display = 'grid';
    } else {
        container.style.display = 'none';
    }
});
