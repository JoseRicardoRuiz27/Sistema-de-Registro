const lenguajes = document.querySelectorAll('.container .Lenguajes');
const container = document.querySelector('.container');

document.querySelector('.btn-send').addEventListener('click', (e) => {
    e.preventDefault();

    console.log('ahora seguiremos desde aquí :)');

    if (container.style.display === 'none' || container.style.display === '') {
        container.style.display = 'grid';
    } else {
        container.style.display = 'none';
    }
});
