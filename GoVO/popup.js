const boton = document.querySelector('#btn-Censura');

boton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: censurarTextoEnPagina
         // Llama a la función en la página actual
        });
    });
});
  
// Esta función se ejecutará en el contexto de la página web
function censurarTextoEnPagina() {

    const palabrasProhibidas = ["put", "pendej", "culer", "puñeter", "ramer","jodeput", "pelotud"];
    const sufijos = "(o|a|os|as|itos|ito|itas)?"; // Palabras a censurar
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
  




