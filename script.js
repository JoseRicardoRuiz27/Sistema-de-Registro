const nameInput = document.querySelector('.name');
const imgInput = document.querySelector('.urlImg');
const puestosInput = document.querySelector('.puestosInput');
const container = document.querySelector('.container');
const btnSend = document.querySelector('.btn-send');
const errorMessage = document.querySelector('.error_message');
const userListTitle = document.querySelector('.user-list-title'); // Título de la lista

// Recuperar la lista de usuarios del LocalStorage o inicializarla si está vacía
let usersList = JSON.parse(localStorage.getItem('usersList')) || [];

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

        if (!isUrlValid && imgInput.value.trim()) {
            errorMessage.textContent = 'La URL debe seguir el formato https://github.com/NombreDeUsuario.png';
            errorMessage.style.display = 'inline';
            imgInput.setCustomValidity('La URL no es válida');
        } else {
            errorMessage.style.display = 'none';
            imgInput.setCustomValidity('');
        }
    }
}

// Función para guardar la lista de usuarios en LocalStorage
function saveToLocalStorage() {
    localStorage.setItem('usersList', JSON.stringify(usersList));
}

// Función para eliminar un usuario de la lista y de LocalStorage
function deleteUser(index) {
    usersList.splice(index, 1); // Eliminar el usuario de la lista
    saveToLocalStorage(); // Actualizar el LocalStorage
    mostrarUsuarios(); // Actualizar el DOM
}

// Función para mostrar los usuarios en el contenedor
function mostrarUsuarios() {
    container.innerHTML = ''; 

    const agrupadosPorPuesto = usersList.reduce((acc, user) => {
        if (!acc[user.puesto]) {
            acc[user.puesto] = [];
        }
        acc[user.puesto].push(user);
        return acc;
    }, {});

    Object.entries(agrupadosPorPuesto).forEach(([puesto, usuarios]) => {
        const grupoDiv = document.createElement('div');
        grupoDiv.classList.add('Lenguajes'); 

        usuarios.forEach((user, index) => {
            const userCard = document.createElement('div');
            userCard.classList.add('user-card'); 
            
            userCard.innerHTML = `
                <p>${user.puesto}</p>
                <img src="${user.imgUrl}" alt="${user.name}">
                <p>${user.name}</p>
                <button class="delete-btn">Eliminar</button>
            `;

            // Evento para eliminar usuario al hacer clic en "Eliminar"
            userCard.querySelector('.delete-btn').addEventListener('click', () => deleteUser(index));

            grupoDiv.appendChild(userCard);
        });

        container.appendChild(grupoDiv);
    });

    // Mostrar el título si hay usuarios
    if (usersList.length > 0) {
        userListTitle.style.display = 'block';
    } else {
        userListTitle.style.display = 'none';
    }
}

// Evento que se dispara al enviar el formulario
btnSend.addEventListener('click', (e) => {
    e.preventDefault();

    const newUser = {
        name: nameInput.value,
        imgUrl: imgInput.value,
        puesto: puestosInput.value
    };

    usersList.push(newUser); // Añadir el nuevo usuario a la lista

    // Guardar en LocalStorage
    saveToLocalStorage();

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

// Función que carga los usuarios al iniciar la página
function loadUsersFromLocalStorage() {
    if (usersList.length > 0) {
        mostrarUsuarios();
        container.style.display = 'grid'; // Mostrar la lista si ya hay usuarios
    } else {
        userListTitle.style.display = 'none'; // Ocultar el título si no hay usuarios
    }
}

// Cargar los usuarios guardados cuando se recarga la página
window.addEventListener('load', loadUsersFromLocalStorage);

// Agrega eventos a los inputs para verificar si se llenaron y son válidos
nameInput.addEventListener('input', checkInputs);
imgInput.addEventListener('input', checkInputs);
puestosInput.addEventListener('input', checkInputs);
