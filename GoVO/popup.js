//variables de botones
const botonCensura = document.querySelector('#btn-Censura');
const botonEliminar = document.querySelector('#btn-Eliminada');
const activador = document.querySelector('#activador');
//Variables de checkbox
const ch_altisonantes = document.querySelector('#altisonantes');
const ch_racistas = document.querySelector('#racistas');
const ch_sexistas = document.querySelector('#sexistas');

var status_filtro = null;

ch_altisonantes.addEventListener('click', function() {
    if (ch_altisonantes.checked) {
        status_filtro = 0;
        console.log("se selecciono altisonantes"+ status_filtro);
    } else {
        console.log("No se selecciono altisonantes");
    }
    evaluarStatus(status_filtro);
});

ch_racistas.addEventListener('click', function() {
    if (ch_racistas.checked) {
        status_filtro = 1;
        console.log("se selecciono racistas"+ status_filtro);
    } else {
        console.log("No se selecciono racistas");
    }
    evaluarStatus(status_filtro);
});

ch_sexistas.addEventListener('click', function() {
    if (ch_sexistas.checked) {
        status_filtro = 2;
        console.log("se selecciono sexistas"+ status_filtro);
    } else {
        console.log("No se selecciono sexistas");
    }
    evaluarStatus(status_filtro);
});

function evaluarStatus(status_filtro) {
    switch (status_filtro) {
        case 0:

            console.log("entra caso 1");
    
        break;
    
        case 1:
            console.log("entra caso 2");
    
        break;
    
        case 2:
            console.log("entra caso 3");
            
        break; 
    }    
}


const options = document.querySelectorAll('#btn-Censura, #btn-Eliminada'); 

activador.addEventListener('change', () =>{
    console.log("Se activa la extension")
    options.forEach(opcion =>{
        opcion.disabled =! activador.checked;
    });
});


//Metodo para recargar la pagina con la api de la extension 
/* chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.reload(tabs[0].id);
  }); */
  

//Listener del botonCensura
botonCensura.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: censurarTextoEnPagina
            // Llama a la función en la página actual
        }).then(() => console.log("Texto censurado"));
    });    
});

//Listener del botonEliminar
botonEliminar.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: borrarTextoEnPagina
            // Llama a la función en la página actual
        }).then(() => console.log("Texto eliminado"));
    });
});
  
// Esta función se ejecutará en el contexto de la página web
function censurarTextoEnPagina() {
    const palabrasProhibidas = ["cabr", "pendej", "mierd", "coñ", "chinga","cul", "desgraciad", "mam", "hijueput", "malparid", "idiot", "pinch", "puñet", "ojet", "perr", "mamahuevo"];
    // const sufijos = "(o|a|os|as|itos|ito|itas)?"; 
    const reemplazo = "***";
  
    function censurarNodo(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            let texto = node.nodeValue;
            palabrasProhibidas.forEach(() => {
                const regex = new RegExp("\\b(cabr(ón|ona|ones|oncillo)|pendej(a|os|ear|itos|as|etes|eo|ita|adas)|mierd(a|itas|ero|ón|eros|as)|coñ(o|os|azo|azos)|chinga(da|ndo|r|das|dera)|cul(eros|eras|culerito|ear|ero|era)|desgraciad(o|a|os|as)|mam(ona|oncillos|ones|onas)|hijueput(as|ón)|malparid(os|a|as)|idiot(a|as|ita|ez)|pinch(es|e)|puñet(ero|a|eros|eras)|ojet(es|e)|perr(a|as)|mamahuevo(s)?)\\b", "gi");
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
    
    const palabrasProhibidas = ["put", "pendej", "culer", "puñeter", "ramer","jodeput", "pelotud","verg"];
    
    const borrado = "";
  
    function borrarNodo(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            let texto2 = node.nodeValue;
            palabrasProhibidas.forEach(() => {
                const regex2 = new RegExp("\\b(cabr(ón|ona|ones|oncillo)|pendej(a|os|ear|itos|as|etes|eo|ita|adas)|mierd(a|itas|ero|ón|eros|as)|coñ(o|os|azo|azos)|chinga(da|ndo|r|das|dera)|cul(eros|eras|culerito|ear|ero|era)|desgraciad(o|a|os|as)|mam(ona|oncillos|ones|onas)|hijueput(as|ón)|malparid(os|a|as)|idiot(a|as|ita|ez)|pinch(es|e)|puñet(ero|a|eros|eras)|ojet(es|e)|perr(a|as)|mamahuevo(s)?)\\b", "gi");
                texto2 = texto2.replace(regex2, borrado);
            });
            node.nodeValue = texto2;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            node.childNodes.forEach(borrarNodo);
        }
    }
    borrarNodo(document.body);
}
