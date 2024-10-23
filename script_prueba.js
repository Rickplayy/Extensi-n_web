// Palabras que queremos cubrir
const palabrasOfensivas = ["put", "pendej", "culer", "puñeter", "ramer"];

// Función para crear la expresión regular
function crearExpresion(palabras) {
    const sufijos = "(o|a|os|as|itos|ito|itas)?";  // Sufijos opcionales
    const patron = palabras.map(palabra => `${palabra}${sufijos}`).join('|');
    return new RegExp(`\\b(${patron})\\b`, 'gi');  // Expresión regular con delimitadores de palabra
}

// Creamos la expresion regular 
const expresionRegular = crearExpresion(palabrasOfensivas);
console.log("EXPRESIÓN regular: " + expresionRegular);

// Función para censurar el texto usando la expresión regular
function censurarTexto(texto) {
    return texto.replace(expresionRegular, '***');  // Esto eemplaza las palabras censuradas con '***'
}

// Función para recorrer toda la pagina alv
function censurarPagina() {
    // Seleccionar todos los elementos del cuerpo de la página
    const elements = document.body.querySelectorAll('*');

    elements.forEach(element => {
        // Evitar reemplazar en inputs, botones y otros elementos que no sean de texto esto lo puse porque me bota error si lo quito
        if (element.children.length === 0 && element.textContent) {
            element.textContent = censurarTexto(element.textContent);
        }
    });
}

