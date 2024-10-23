const mensaje = document.querySelector('div');
const boton = document.querySelector('#cambiar');

boton.addEventListener('click', () => {
    mensaje.textContent = "nuevo mensaje";
});