const nameInput = document.querySelector('.name');
const imgInput = document.querySelector('.urlImg');
const puestosInput = document.querySelector('.puestosInput');
const container = document.querySelector('.container');
const btnSend = document.querySelector('.btn-send');
const errorMessage = document.querySelector('.error_message');

let usersList = [];  // Lista para almacenar los usuarios

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

// Función para mostrar los usuarios en el contenedor
function mostrarUsuarios() {
    container.innerHTML = '<h2>Lista de Usuarios</h2>';  // Eliminé el <> incorrecto

    // Recorrer el array de usuarios y crear el div correspondiente
    usersList.forEach(user => {
        const userDivs = document.createElement('div');
        userDivs.classList.add('Lenguajes');  // Asegúrate de que la clase está bien escrita

        userDivs.innerHTML = `
            <p>${user.puesto}</p>
            <img src="${user.imgUrl}" alt="${user.name}">
            <p>${user.name}</p>
        `;
        container.appendChild(userDivs);
    });
}

// Mostrar u ocultar la lista de usuarios al enviar
btnSend.addEventListener('click', (e) => {
    e.preventDefault();

    const newUser = {
        name: nameInput.value,
        imgUrl: imgInput.value,
        puesto: puestosInput.value
    };

    usersList.push(newUser);  // Asegúrate de usar el nombre correcto del array

    // Limpiar los inputs
    nameInput.value = '';
    imgInput.value = '';
    puestosInput.value = '';

    btnSend.disabled = true;

    // Mostrar los usuarios en el contenedor
    mostrarUsuarios();

    // Cambiar la visibilidad del contenedor al enviar
    container.style.display = 'grid';
});

// Agrega eventos a los inputs para verificar si se llenaron y son válidos
nameInput.addEventListener('input', checkInputs);
imgInput.addEventListener('input', checkInputs);
puestosInput.addEventListener('input', checkInputs);
