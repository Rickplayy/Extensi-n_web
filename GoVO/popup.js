const botonCensura = document.querySelector('#btn-Censura');
const botonEliminar = document.querySelector('#btn-Eliminada');
const activador = document.querySelector('#activador');
const jqactivador = $("#activador");
const options = document.querySelectorAll('#altisonantes, #racistas, #sexistas, #btn-Censura, #btn-Eliminada, #rd-baja, #rd-media, #rd-alta'); 
const optionAltisonantes = document.getElementById("altisonantes");
const optionRacistas = document.getElementById("racistas");
const optionSexistas = document.getElementById("sexistas");


// [DE LEGADO] Codigo anterior para desactivar checkboxes en change de activador (No desactiva los checkboxes de opciones al desmarcar activador)
/*activador.addEventListener('change', () =>{
    options.forEach(opcion =>{
        opcion.disabled = !activador.checked;
    });
});
*/

/* Funcion que se ejecuta en DOMContentLoad (Carga de pagina): 
1-Habilita los cambios en options siempre y cuando activador este marcado.
2-Activacion al cargar la extension para salvar los checkboxes en su uso
3- Debug de checkboxes al cargar el DOM*/
    document.addEventListener('DOMContentLoaded', function () {

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
    //alert('Cambios salvados');

    const optionAltisonantes = document.getElementById("altisonantes");
    const optionRacistas = document.getElementById("racistas");
    const optionSexistas = document.getElementById("sexistas");
    const options = document.querySelectorAll('#altisonantes, #racistas, #sexistas, #btn-Censura, #btn-Eliminada, #rd-baja, #rd-media, #rd-alta');
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

    // DEBUG PARA SABER SI ESTA CARGANDO LA EXTENSION
    console.log("Listo");

    // DEBUG PARA ESTADO DE LOS CHECKBOXES AL CARGAR LA EXTENSION
    console.log(optionAltisonantes.checked);
    console.log(optionRacistas.checked);
    console.log(optionSexistas.checked);

    // DEBUG PARA SABER SI EL NAVEGADOR ESTA RECONOCIENDO LOS CHECKBOXES ACTIVOS AL CARGAR EL DOM
    if (optionAltisonantes.checked) {
        //alert("Altisonantes");
        console.log("Altisonantes");
    }
    if (optionRacistas.checked) {
        //alert("Racistas");
        console.log("Racistas");
    }
    if (optionSexistas.checked) {
        //alert("Sexistas");
        console.log("Sexistas");
    }

    // Verificar el estado al cargar la extensión
    toggleOptions();

    // Escuchar cambios en el checkbox activador
    activador.addEventListener('change',toggleOptions);
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

function recargarPagina() {
    // Obtén la pestaña activa y recárgala
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            chrome.tabs.reload(tabs[0].id);
        }
    });
}



//Metodo para recargar la pagina con la api de la extension 
/* chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.reload(tabs[0].id);
  }); */
  

  $("#activador").change(
    function(){
        if (!($(this).is(':checked'))) {
            recargarPagina();
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

    /*
    const regex2 = new RegExp(
        "\\b(cabr(ón|ona|ones|oncillo)|pendej(a|os|ear|itos|as|etes|eo|ita|adas)|mierd(a|itas|ero|ón|eros|as)|coñ(o|os|azo|azos)|chinga(da|ndo|r|das|dera)|cul(eros|eras|culerito|ear|ero|era)|desgraciad(o|a|os|as)|mam(ona|oncillos|ones|onas)|hijueput(as|ón)|malparid(os|a|as)|idiot(a|as|ita|ez)|pinch(es|e)|puñet(ero|a|eros|eras)|ojet(es|e)|perr(a|as)|mamahuevo(s)?)\\b",
        "gi"
      );
    */

    const reemplazo = "***";

    function censurarNodo(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            let textoAltisonantes = node.nodeValue;
            palabrasProhibidas.forEach((palabra) => {
                const regex = new RegExp("\\b(cabr(ón|ona|ones|oncillo)|pendej(a|os|ear|itos|as|etes|eo|ita|adas)|mierd(a|itas|ero|ón|eros|as)|coñ(o|os|azo|azos)|chinga(da|ndo|r|das|dera)|cul(eros|eras|culerito|ear|ero|era)|desgraciad(o|a|os|as)|mam(ona|oncillos|ones|onas)|hijueput(as|ón)|malparid(os|a|as)|idiot(a|as|ita|ez)|pinch(es|e)|puñet(ero|a|eros|eras)|ojet(es|e)|perr(a|as)|mamahuevo(s)?)\\b","gi");
                textoAltisonantes = textoAltisonantes.replace(regex, reemplazo);
            });
            node.nodeValue = textoAltisonantes;
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
                const regex = new RegExp("\\b(cabr(ón|ona|ones|oncillo)|pendej(a|os|ear|itos|as|etes|eo|ita|adas)|mierd(a|itas|ero|ón|eros|as)|coñ(o|os|azo|azos)|chinga(da|ndo|r|das|dera)|cul(eros|eras|culerito|ear|ero|era)|desgraciad(o|a|os|as)|mam(ona|oncillos|ones|onas)|hijueput(as|ón)|malparid(os|a|as)|idiot(a|as|ita|ez)|pinch(es|e)|puñet(ero|a|eros|eras)|ojet(es|e)|perr(a|as)|mamahuevo(s)?)\\b","gi");
                texto2 = texto2.replace(regex, borrado);
            });
            node.nodeValue = texto2;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            node.childNodes.forEach(borrarNodo);
        }
    }
    borrarNodo(document.body);
}