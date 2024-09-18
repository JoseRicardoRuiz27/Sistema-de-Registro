const nameInput = document.querySelector('.name');
const imgInput = document.querySelector('.urlImg');
const puestosInput = document.querySelector('.puestosInput');
const container = document.querySelector('.container');
const btnSend = document.querySelector('.btn-send');
const errorMessage = document.querySelector('.error_message');
const userListTitle = document.querySelector('.user-list-title'); // Título de la lista

let usersList = []; // Lista de usuarios

// Función para validar la URL
function isValidUrl(url) {
    const regex = /^https:\/\/github\.com\/.+\.png$/;
    return regex.test(url);
}

// Función que verifica si todos los inputs están llenos y la URL es válida
function checkInputs() {
    const isUrlValid = isValidUrl(imgInput.value);

    if (nameInput.value.trim() && imgInput.value.trim() && puestosInput.value.trim() && isUrlValid) {
        btnSend.disabled = false;  // Habilita el botón si todo está correcto
        errorMessage.style.display = 'none'; // Oculta el mensaje de error
        imgInput.setCustomValidity(''); // Limpia el mensaje de error del input
    } else {
        btnSend.disabled = true;   // Deshabilita el botón si falta algún input o la URL es incorrecta

        // Mostrar mensaje de error para URL inválida
        if (!isUrlValid && imgInput.value.trim()) {
            errorMessage.textContent = 'La URL debe seguir el formato https://github.com/NombreDeUsuario.png';
            errorMessage.style.display = 'inline'; // Muestra el mensaje de error
            imgInput.setCustomValidity('La URL no es válida'); // Añade un mensaje de error personalizado en el input
        } else {
            errorMessage.style.display = 'none'; // Oculta el mensaje de error si la URL está vacía o válida
            imgInput.setCustomValidity(''); // Limpia el mensaje de error del input
        }
    }
}

// Función para mostrar los usuarios en el contenedor
// Función para mostrar los usuarios en el contenedor
function mostrarUsuarios() {
    container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos usuarios

    // Agrupar usuarios por puesto
    const agrupadosPorPuesto = usersList.reduce((acc, user) => {
        if (!acc[user.puesto]) {
            acc[user.puesto] = [];
        }
        acc[user.puesto].push(user);
        return acc;
    }, {});

    // Recorrer los puestos agrupados y crear el div correspondiente para cada grupo
    for (const [puesto, usuarios] of Object.entries(agrupadosPorPuesto)) {
        const grupoDiv = document.createElement('div');
        grupoDiv.classList.add('Lenguajes'); // Añadir la clase "Lenguajes" para estilos

        usuarios.forEach(user => {
            const userCard = document.createElement('div');
            userCard.classList.add('user-card'); // Añadir la clase "user-card" para estilos

            userCard.innerHTML = `
                <p>${user.puesto}</p>
                <img src="${user.imgUrl}" alt="${user.name}">
                <p>${user.name}</p>
            `;

            grupoDiv.appendChild(userCard);
        });

        container.appendChild(grupoDiv);
    }
}

// Mostrar u ocultar la lista de usuarios al enviar
btnSend.addEventListener('click', (e) => {
    e.preventDefault();

    const newUser = {
        name: nameInput.value,
        imgUrl: imgInput.value,
        puesto: puestosInput.value
    };

    usersList.push(newUser); // Añadir el nuevo usuario a la lista

    // Limpiar los inputs
    nameInput.value = '';
    imgInput.value = '';
    puestosInput.value = '';

    btnSend.disabled = true;

    // Mostrar los usuarios en el contenedor
    mostrarUsuarios();

    // Mostrar el título al enviar el formulario
    userListTitle.style.display = 'block';

    // Cambiar la visibilidad del contenedor al enviar
    container.style.display = 'grid';
});

// Agrega eventos a los inputs para verificar si se llenaron y son válidos
nameInput.addEventListener('input', checkInputs);
imgInput.addEventListener('input', checkInputs);
puestosInput.addEventListener('input', checkInputs);
