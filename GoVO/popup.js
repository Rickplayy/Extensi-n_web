const botonCensura = document.querySelector('#btn-Censura');
const botonEliminar = document.querySelector('#btn-Eliminada');
const activador = document.querySelector('#activador');
const options = document.querySelectorAll('#altisonantes, #racistas, #sexistas, #btn-Censura, #btn-Eliminada, #rd-baja, #rd-media, #rd-alta'); 

activador.addEventListener('change', () =>{
    options.forEach(opcion =>{
        opcion.disabled = !activador.checked;
    });
});


//Metodo para recargar la pagina con la api de la extension 
/* chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.reload(tabs[0].id);
  }); */
  

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

  




