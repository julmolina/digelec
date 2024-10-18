let correctas = [2, 3, 2, 3, 3];
let opcion_elegida = [];
let cantidad_correctas = 0;

function respuesta(num_pregunta, seleccionada) {
    opcion_elegida[num_pregunta] = seleccionada.value;
    let id = "p" + num_pregunta;
    let labels = document.getElementById(id).childNodes;
    // Restaurar colores de fondo
    labels.forEach(label => {
        if (label.nodeType === Node.ELEMENT_NODE) {
            label.style.backgroundColor = "white";
        }
    });
    // Establecer color de fondo para la opción seleccionada
    seleccionada.parentNode.style.backgroundColor = "#cec0fc";
}

function corregir() {
    cantidad_correctas = 0;
    for (let i = 0; i < correctas.length; i++) {
        if (correctas[i] == opcion_elegida[i]) {
            cantidad_correctas++;
        }
    }

    let resultadoElement = document.getElementById("resultado");
    if (cantidad_correctas === 0) {
        resultadoElement.innerHTML = '0 Aprenda a Leer';
    } else {
        resultadoElement.innerHTML = cantidad_correctas;
    }
}