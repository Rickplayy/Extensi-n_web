const botonCensura = document.querySelector('#btn-Censura');
const botonEliminar = document.querySelector('#btn-Eliminada');
const activador = document.querySelector('#activador');
const jqactivador = $("#activador");
const options = document.querySelectorAll('#altisonantes, #racistas, #sexistas, #btn-Censura, #btn-Eliminada, #rd-baja, #rd-media, #rd-alta'); 

// Codigo anterior para desactivar checkboxes en change de activador (No desactiva los checkboxes de opciones al desmarcar activador)
/*activador.addEventListener('change', () =>{
    options.forEach(opcion =>{
        opcion.disabled = !activador.checked;
    });
});
*/

// Funcion que se ejecuta en document.ready, habilita los cambios en options siempre y cuando activador este marcado.
$(document).ready(function () {
     // Función para habilitar o deshabilitar las opciones
     const toggleOptions = () => {
        options.forEach(opcion => {
            opcion.disabled = !activador.checked;

            // Desmarcar automáticamente si se deshabilita
            if (!activador.checked) {
                opcion.checked = false;
            }
        });
    };

    // Verificar el estado al cargar la extensión
    toggleOptions();

    // Escuchar cambios en el checkbox activador
    jqactivador.change(function () {
        toggleOptions();
    });
});

// Nuevo metodo para activar o desactivar los checkboxes options en change de activador
jqactivador.change(function(){
    options.forEach(opcion =>{
        opcion.disabled = !activador.checked;

        // Desmarcar automáticamente si se deshabilita
        if (!activador.checked) {
            opcion.checked = false;
        }
    });
});

function restaurarPagina(){
    document.body.innerHTML = originalContent;
}

// Activacion al cargar la extension para salvar los checkboxes en su uso
document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");

    // Restaurar los valores guardados
    const savedStates = JSON.parse(localStorage.getItem("checkboxStates")) || {};
    checkboxes.forEach((checkbox) => {
        checkbox.checked = savedStates[checkbox.id] || false; // Restaurar el estado
    });

    // Guardar los valores al cambiar
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            const savedStates = JSON.parse(localStorage.getItem("checkboxStates")) || {};
            savedStates[checkbox.id] = checkbox.checked; // Actualizar el estado
            localStorage.setItem("checkboxStates", JSON.stringify(savedStates));
        });
    });
    alert('Cambios salvados');
});

//Metodo para recargar la pagina con la api de la extension 
/* chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.reload(tabs[0].id);
  }); */
  

  $("#activador").change(
    function(){
        if (!($(this).is(':checked'))) {
            //alert('checked');
            restaurarPagina();
        }
    });

//Listener del botonCensura
botonCensura.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: censurarTextoEnPagina
            // Llama a la función en la página actual
        });
    });    
});

//Listener del botonEliminar
botonEliminar.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: borrarTextoEnPagina
            // Llama a la función en la página actual
        });
    });
});
  
// Esta función se ejecutará en el contexto de la página web
function censurarTextoEnPagina() {
    //variables provisonales en lo que se extraen las palabras del .md
    const palabrasProhibidas = ["put", "pendej", "culer", "puñeter", "ramer","jodeput", "pelotud","verg"];
    const sufijos = "(o|a|os|as|itos|ito|itas)?"; 
    const reemplazo = "***";

    // Guarda el estado original de la página antes de hacer cambios
    const originalContent = document.body.innerHTML;
    //alert(originalContent);
  
    function censurarNodo(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            let texto = node.nodeValue;
            palabrasProhibidas.forEach((palabra) => {
                const regex = new RegExp(`\\b${palabra}${sufijos}\\b`, 'gi');
                texto = texto.replace(regex, reemplazo);
            });
            node.nodeValue = texto;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            node.childNodes.forEach(censurarNodo);
        }
    }
    censurarNodo(document.body);
}

function borrarTextoEnPagina() {
    //variables provisonales en lo que se extraen las palabras del .md
    const palabrasProhibidas = ["put", "pendej", "culer", "puñeter", "ramer","jodeput", "pelotud","verg"];
    const sufijos = "(o|a|os|as|itos|ito|itas)?"; 
    const borrado = "";

    // Guarda el estado original de la página antes de hacer cambios
    const originalContent = document.body.innerHTML;
    //alert("Borrar");
  
    function borrarNodo(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            let texto2 = node.nodeValue;
            palabrasProhibidas.forEach((palabra2) => {
                const regex = new RegExp(`\\b${palabra2}${sufijos}\\b`, 'gi');
                texto2 = texto2.replace(regex, borrado);
            });
            node.nodeValue = texto2;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            node.childNodes.forEach(borrarNodo);
        }
    }
    borrarNodo(document.body);
}