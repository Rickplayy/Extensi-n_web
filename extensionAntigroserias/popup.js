const message = document.querySelector('div');
const boton = document.querySelector('cambiarMensaje')

boton.addEventListener('click', () => {
    message.textContent = "nuevo mensaje"
});