var operacion = "";
var pantalla;
var balanceParentesis = 0; // Variable para contar paréntesis abiertos

window.onload = function() {
    pantalla = document.getElementById("txt_resultado");
}

function limpiar() {
    operacion = "";
    balanceParentesis = 0; // Reiniciar el balance de paréntesis
    pantalla.value = operacion;
}

function borrar() {
    if (operacion.length > 0) {
        const ultimoCaracter = operacion.slice(-1);
        if (ultimoCaracter === "(") {
            balanceParentesis--; // Disminuir balance si es un paréntesis abierto
        } else if (ultimoCaracter === ")") {
            balanceParentesis++; // Aumentar balance si es un paréntesis cerrado
        }
        operacion = operacion.slice(0, -1); // Eliminar último carácter
    }
    pantalla.value = operacion;
}

function Parentesis_Izq() {
    // Añade una multiplicación implícita si el último carácter es un número o paréntesis de cierre
    if (operacion.endsWith(")") || /[0-9]/.test(operacion.slice(-1))) {
        operacion += "*";
    }
    // Permitir abrir un paréntesis solo si es el comienzo o después de un operador
    if (operacion === "" || validarOperadores() || operacion.endsWith("(") || operacion.endsWith("*")) {
        operacion += "(";
        balanceParentesis++; // Aumentar el balance de paréntesis
        pantalla.value = operacion;
    }
}

function Parentesis_Der() {
    // Solo permitir cerrar un paréntesis si ya hay alguno abierto
    if (balanceParentesis > 0 && !operacion.endsWith("(") && validarOperadores()) {
        operacion += ")";
        balanceParentesis--; // Disminuir el balance de paréntesis
        pantalla.value = operacion;
    }
}

function clickbutton(element) {
    // Añade multiplicación implícita si un número sigue a un paréntesis de cierre
    if (operacion.endsWith(")") && /[0-9]/.test(element.value)) {
        operacion += "*";
    }
    
    switch (element.id) {
        case 'b00': operacion += "0"; break;
        case 'b01': operacion += "1"; break;
        case 'b02': operacion += "2"; break;
        case 'b03': operacion += "3"; break;
        case 'b04': operacion += "4"; break;
        case 'b05': operacion += "5"; break;
        case 'b06': operacion += "6"; break;
        case 'b07': operacion += "7"; break;
        case 'b08': operacion += "8"; break;
        case 'b09': operacion += "9"; break;
        case 'b_sum':
            if (operacion.length > 0 && validarOperadores()) operacion += "+";
            break;
        case 'b_res':
            if (operacion.length > 0 && validarOperadores()) operacion += "-";
            break;
        case 'b_mul':
            if (operacion.length > 0 && validarOperadores()) operacion += "*";
            break;
        case 'b_div':
            if (operacion.length > 0 && validarOperadores()) operacion += "/";
            break;
        case 'b_pun':
            if (validarPunto()) operacion += ".";
            break;
        case 'b_ig':
            if (operacion.length > 0 && balanceParentesis === 0) { // Verifica si balance está en 0
                try {
                    operacion = "" + eval(operacion);
                } catch (e) {
                    alert("La operación no es válida");
                    operacion = "";
                }
            } else {
                alert("Verifica los paréntesis en la operación");
            }
            break;
    }
    pantalla.value = operacion;
}

function validarOperadores() {
    // Verifica que el último carácter no sea un operador o paréntesis de apertura
    return !operacion.endsWith("+") && !operacion.endsWith("-") &&
           !operacion.endsWith("*") && !operacion.endsWith("/") &&
           !operacion.endsWith("(");
}

function validarPunto() {
    // Solo permite agregar punto si no es seguido de operadores y el último número no tiene ya punto
    const partes = operacion.split(/[\+\-\*\/\(\)]/);
    return partes[partes.length - 1].indexOf(".") === -1;
}
