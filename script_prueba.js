/* 
    Edito miguel 15/10/24
*/

// Palabras que queremos cubrir
const palabrasOfensivas = ["put", "pendej", "culer", "puñeter", "ramer"];
let guardaPalabras = {};

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
    if(!texto) return'';
    return texto.replace(expresionRegular, (palabraOriginal)=> {
        let censura = "***";
        let palabraNormal = palabraOriginal.toLowerCase();
        if(!guardaPalabras [palabraNormal]){
            guardaPalabras[palabraNormal] = palabraOriginal;
        }
        return censura;
    });  // Esto eemplaza las palabras censuradas con '***'
}
//Funcion para descensurar el texto 
function DescensurarTexto(texto){
    if(!texto) return'';
    for(let palabraOriginal in guardaPalabras){
        let censura = guardaPalabras[palabraOriginal];
        let inversa = new RegExp(`\\*\\*\\*`, 'g');
        texto = texto.replace(inversa, guardaPalabras[palabraOriginal]);
    }
    return texto;
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

