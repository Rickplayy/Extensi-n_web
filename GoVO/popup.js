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
  console.log("Aplicando filtros de: ", (optionAltisonantes.checked)?'Altisonantes':'?', (optionRacistas.checked)?', Racistas':', ?', (optionSexistas.checked)?'y Sexistas':'y ?');
    // Llama a las funciones de censura en la página actual
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Llamar a funcion de censura de palabras altisonantes
      if (optionAltisonantes.checked) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: censurarTextoEnPagina_Altisonante
        });
      }
      // Llamar a funcion de censura de palabras racistas
      if (optionRacistas.checked) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: censurarTextoEnPagina_Racista
        });
      }
      // Llamar a funcion de censura de palabras sexistas
      if (optionSexistas.checked) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: censurarTextoEnPagina_Sexista
        });
      }
    });    
});

//Listener del botonEliminar
botonEliminar.addEventListener("click", () => {
  console.log("Aplicando filtros de: ", (optionAltisonantes.checked)?'Altisonantes':'?', (optionRacistas.checked)?', Racistas':', ?', (optionSexistas.checked)?'y Sexistas':'y ?');
    // Llama a la función en la página actual
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Llamar a funcion de borrado de palabras altisonantes
      if (optionAltisonantes.checked) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: borrarTextoEnPagina_Altisonante
        });
      }
      // Llamar a funcion de borrado de palabras racistas
      if (optionRacistas.checked) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: borrarTextoEnPagina_Racista
        });
      }
      // Llamar a funcion de borrado de palabras sexistas
      if (optionSexistas.checked) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: borrarTextoEnPagina_Sexista
        });
      }
    });
});

  
// Estas funciónes se ejecutará en el contexto de la página web
// FUNCIONES DE CENSURA
function censurarTextoEnPagina_Altisonante() {
    //variables provisonales en lo que se extraen las palabras del .md
    const palabrasProhibidas = [""];
    //const sufijos = "(o|a|os|as|itos|ito|itas)?"; 

    /*
    const regex2 = new RegExp(
        "\\b(cabr(ón|ona|ones|oncillo)|pendej(a|os|ear|itos|as|etes|eo|ita|adas)|mierd(a|itas|ero|ón|eros|as)|coñ(o|os|azo|azos)|chinga(da|ndo|r|das|dera)|cul(eros|eras|culerito|ear|ero|era)|desgraciad(o|a|os|as)|mam(ona|oncillos|ones|onas)|hijueput(as|ón)|malparid(os|a|as)|idiot(a|as|ita|ez)|pinch(es|e)|puñet(ero|a|eros|eras)|ojet(es|e)|perr(a|as)|mamahuevo(s)?)\\b",
        "gi"
      );
    */

    const reemplazo = "***";

    function censurarNodo_Altisonante(node) {

        if (node.nodeType === Node.TEXT_NODE) {
            let textoAltisonantes = node.nodeValue;
            palabrasProhibidas.forEach((palabra) => {
                const regex = new RegExp("\\b(cabr(ón|ona|ones|oncillo)|pendej(a|os|ear|itos|as|etes|eo|ita|adas)|mierd(a|itas|ero|ón|eros|as)|coñ(o|os|azo|azos)|chinga(da|ndo|r|das|dera)|cul(eros|eras|culerito|ear|ero|era)|desgraciad(o|a|os|as)|mam(ona|oncillos|ones|onas)|hijueput(as|ón)|malparid(os|a|as)|idiot(a|as|ita|ez)|pinch(es|e)|puñet(ero|a|eros|eras)|ojet(es|e)|perr(a|as)|mamahuevo(s)?)\\b","gi");
                textoAltisonantes = textoAltisonantes.replace(regex, reemplazo);
            });
            node.nodeValue = textoAltisonantes;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            node.childNodes.forEach(censurarNodo_Altisonante);
        }
    }
    censurarNodo_Altisonante(document.body);
}

function censurarTextoEnPagina_Racista() {
  //variables provisonales en lo que se extraen las palabras del .md
  const palabrasProhibidas = [""];
  //const sufijos = "(o|a|os|as|itos|ito|itas)?"; 

  /*
  const regex2 = new RegExp(
      "\\b(cabr(ón|ona|ones|oncillo)|pendej(a|os|ear|itos|as|etes|eo|ita|adas)|mierd(a|itas|ero|ón|eros|as)|coñ(o|os|azo|azos)|chinga(da|ndo|r|das|dera)|cul(eros|eras|culerito|ear|ero|era)|desgraciad(o|a|os|as)|mam(ona|oncillos|ones|onas)|hijueput(as|ón)|malparid(os|a|as)|idiot(a|as|ita|ez)|pinch(es|e)|puñet(ero|a|eros|eras)|ojet(es|e)|perr(a|as)|mamahuevo(s)?)\\b",
      "gi"
    );
  */

  const reemplazo = "***";

  function censurarNodo_Racista(node) {

      if (node.nodeType === Node.TEXT_NODE) {
          let textoRacista = node.nodeValue;
          palabrasProhibidas.forEach((palabra) => {
              //const regex = new RegExp("\\b(cabr(ón|ona|ones|oncillo)|pendej(a|os|ear|itos|as|etes|eo|ita|adas)|mierd(a|itas|ero|ón|eros|as)|coñ(o|os|azo|azos)|chinga(da|ndo|r|das|dera)|cul(eros|eras|culerito|ear|ero|era)|desgraciad(o|a|os|as)|mam(ona|oncillos|ones|onas)|hijueput(as|ón)|malparid(os|a|as)|idiot(a|as|ita|ez)|pinch(es|e)|puñet(ero|a|eros|eras)|ojet(es|e)|perr(a|as)|mamahuevo(s)?)\\b","gi");
              const regex = new RegExp("\\b(nac(o|a|os|on|as)|chair(o|os|ito|ón)|poch(o|os|ita|ón)|frijol(e|a|os|as|ón)|puebler(o|a|os|as|ón))\\b","gi");
              textoRacista = textoRacista.replace(regex, reemplazo);
          });
          node.nodeValue = textoRacista;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
          node.childNodes.forEach(censurarNodo_Racista);
      }
  }
  censurarNodo_Racista(document.body);
}

function censurarTextoEnPagina_Sexista() {
  //variables provisonales en lo que se extraen las palabras del .md
  const palabrasProhibidas = [""];
  //const sufijos = "(o|a|os|as|itos|ito|itas)?"; 

  /*
  const regex2 = new RegExp(
      "\\b(cabr(ón|ona|ones|oncillo)|pendej(a|os|ear|itos|as|etes|eo|ita|adas)|mierd(a|itas|ero|ón|eros|as)|coñ(o|os|azo|azos)|chinga(da|ndo|r|das|dera)|cul(eros|eras|culerito|ear|ero|era)|desgraciad(o|a|os|as)|mam(ona|oncillos|ones|onas)|hijueput(as|ón)|malparid(os|a|as)|idiot(a|as|ita|ez)|pinch(es|e)|puñet(ero|a|eros|eras)|ojet(es|e)|perr(a|as)|mamahuevo(s)?)\\b",
      "gi"
    );
  */

  const reemplazo = "***";

  function censurarNodo_Sexista(node) {

      if (node.nodeType === Node.TEXT_NODE) {
          let textoSexista = node.nodeValue;
          palabrasProhibidas.forEach((palabra) => {
              //const regex = new RegExp("\\b(cabr(ón|ona|ones|oncillo)|pendej(a|os|ear|itos|as|etes|eo|ita|adas)|mierd(a|itas|ero|ón|eros|as)|coñ(o|os|azo|azos)|chinga(da|ndo|r|das|dera)|cul(eros|eras|culerito|ear|ero|era)|desgraciad(o|a|os|as)|mam(ona|oncillos|ones|onas)|hijueput(as|ón)|malparid(os|a|as)|idiot(a|as|ita|ez)|pinch(es|e)|puñet(ero|a|eros|eras)|ojet(es|e)|perr(a|as)|mamahuevo(s)?)\\b","gi");
              const regex = new RegExp("\\b(verg(a|as|otas|uita)|jot(os|itos|olona|erias)|ram(era|ero|eras|eros)|maric(ón|as|ona|ones|oncillo|onada|mariquita)|huevos|cagón(es|cito)|put(o|a|as|os|itos|otes|eros)|zorr(a|eros|as|os|o)|cog(er|iendo)|tet(as|onas|itas|otas)|chich(is|otas|ón)|mujerzuela(s)?|pito(s)?|pucha(s)?|panoch(a|ón|as)|golfa(s)?|prostitut(a|o|as|os)?|prostibulo|cul(o|os|itos|otes|ón))\\b","gi");
              textoSexista = textoSexista.replace(regex, reemplazo);
          });
          node.nodeValue = textoSexista;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
          node.childNodes.forEach(censurarNodo_Sexista);
      }
  }
  censurarNodo_Sexista(document.body);
}

// FUNCIONES DE BORRADO
function borrarTextoEnPagina_Altisonante() {
    //variables provisonales en lo que se extraen las palabras del .md
    const palabrasProhibidas = [""];
    //const sufijos = "(o|a|os|as|itos|ito|itas)?"; 
    const borrado = "";

  
    function borrarNodo_Altisonante(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            let texto2_Altisonante = node.nodeValue;
            palabrasProhibidas.forEach((palabra2) => {
                const regex = new RegExp("\\b(cabr(ón|ona|ones|oncillo)|pendej(a|os|ear|itos|as|etes|eo|ita|adas)|mierd(a|itas|ero|ón|eros|as)|coñ(o|os|azo|azos)|chinga(da|ndo|r|das|dera)|cul(eros|eras|culerito|ear|ero|era)|desgraciad(o|a|os|as)|mam(ona|oncillos|ones|onas)|hijueput(as|ón)|malparid(os|a|as)|idiot(a|as|ita|ez)|pinch(es|e)|puñet(ero|a|eros|eras)|ojet(es|e)|perr(a|as)|mamahuevo(s)?)\\b","gi");
                texto2_Altisonante = texto2_Altisonante.replace(regex, borrado);
            });
            node.nodeValue = texto2_Altisonante;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            node.childNodes.forEach(borrarNodo_Altisonante);
        }
    }
    borrarNodo_Altisonante(document.body);
}

function borrarTextoEnPagina_Racista() {
  //variables provisonales en lo que se extraen las palabras del .md
  const palabrasProhibidas = [""];
  //const sufijos = "(o|a|os|as|itos|ito|itas)?"; 
  const borrado = "";


  function borrarNodo_Racista(node) {
      if (node.nodeType === Node.TEXT_NODE) {
          let texto2_Racista = node.nodeValue;
          palabrasProhibidas.forEach((palabra2) => {
              const regex = new RegExp("\\b(nac(o|a|os|on|as)|chair(o|os|ito|ón)|poch(o|os|ita|ón)|frijol(e|a|os|as|ón)|puebler(o|a|os|as|ón))\\b","gi");
              texto2_Racista = texto2_Racista.replace(regex, borrado);
          });
          node.nodeValue = texto2_Racista;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
          node.childNodes.forEach(borrarNodo_Racista);
      }
  }
  borrarNodo_Racista(document.body);
}

function borrarTextoEnPagina_Sexista() {
  //variables provisonales en lo que se extraen las palabras del .md
  const palabrasProhibidas = [""];
  //const sufijos = "(o|a|os|as|itos|ito|itas)?"; 
  const borrado = "";


  function borrarNodo_Sexista(node) {
      if (node.nodeType === Node.TEXT_NODE) {
          let texto2_Sexista = node.nodeValue;
          palabrasProhibidas.forEach((palabra2) => {
              const regex = new RegExp("\\b(verg(a|as|otas|uita)|jot(os|itos|olona|erias)|ram(era|ero|eras|eros)|maric(ón|as|ona|ones|oncillo|onada|mariquita)|huevos|cagón(es|cito)|put(o|a|as|os|itos|otes|eros)|zorr(a|eros|as|os|o)|cog(er|iendo)|tet(as|onas|itas|otas)|chich(is|otas|ón)|mujerzuela(s)?|pito(s)?|pucha(s)?|panoch(a|ón|as)|golfa(s)?|prostitut(a|o|as|os)?|prostibulo|cul(o|os|itos|otes|ón))\\b","gi");
              texto2_Sexista = texto2_Sexista.replace(regex, borrado);
          });
          node.nodeValue = texto2_Sexista;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
          node.childNodes.forEach(borrarNodo_Sexista);
      }
  }
  borrarNodo_Sexista(document.body);
}