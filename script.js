const nameInput = document.querySelector('.name');
const imgInput = document.querySelector('.urlImg');
const puestosInput = document.querySelector('.puestosInput');
const container = document.querySelector('.container');
const btnSend = document.querySelector('.btn-send');

function checkInputs() {
    if(nameInput.value && imgInput.value  &&
         puestosInput.value){
            btnSend.disabled = false;
         }else{
            btnSend.disabled = true;
         }
}
nameInput.addEventListener('input', checkInputs);
imgInput.addEventListener('input', checkInputs);
puestosInput.addEventListener('input', checkInputs);

document.querySelector('.btn-send').addEventListener('click', (e) => {
    e.preventDefault();

    if (container.style.display === 'none' || container.style.display === '') {
        container.style.display = 'grid';
    } else {
        container.style.display = 'none';
    }
});
