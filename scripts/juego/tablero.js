'use strict';

var ModuloTablero = (function() {
    var VECINOS_POR_INDICE = {
        0: [1, 4, 5],
        1: [0, 2, 4, 5, 6],
        2: [1, 3, 5, 6, 7],
        3: [2, 6, 7],
        4: [0, 1, 5, 8, 9],
        5: [0, 1, 2, 4, 6, 8, 9, 10],
        6: [1, 2, 3, 5, 7, 9, 10, 11],
        7: [2, 3, 6, 10, 11],
        8: [4, 5, 9, 12, 13],
        9: [4, 5, 6, 8, 10, 12, 13, 14],
        10: [5, 6, 7, 9, 11, 13, 14, 15],
        11: [6, 7, 10, 14, 15],
        12: [8, 9, 13],
        13: [8, 9, 10, 12, 14],
        14: [9, 10, 11, 13, 15],
        15: [10, 11, 14]
    };
    
    var letrasActuales = [];
    var indicesSeleccionados = [];
    
    function renderizarTablero(letras) {
        letrasActuales = letras;
        var celdas = document.querySelectorAll('.celda');
        var i;
        
        for (i = 0; i < celdas.length; i = i + 1) {
            celdas[i].textContent = letras[i];
            celdas[i].classList.remove('seleccionada', 'ultima', 'posible');
        }
        
        indicesSeleccionados = [];
    }
    
    function esVecino(indice) {
        if (indicesSeleccionados.length === 0) {
            return true;
        }
        
        var ultimoIndice = indicesSeleccionados[indicesSeleccionados.length - 1];
        var vecinos = VECINOS_POR_INDICE[ultimoIndice];
        var i;
        
        for (i = 0; i < vecinos.length; i = i + 1) {
            if (vecinos[i] === indice) {
                return true;
            }
        }
        
        return false;
    }
    
    function yaSeleccionado(indice) {
        var i;
        
        for (i = 0; i < indicesSeleccionados.length; i = i + 1) {
            if (indicesSeleccionados[i] === indice) {
                return true;
            }
        }
        
        return false;
    }
    
    function agregarSeleccion(indice) {
        if (yaSeleccionado(indice)) {
            return false;
        }
        
        if (!esVecino(indice)) {
            return false;
        }
        
        indicesSeleccionados.push(indice);
        return true;
    }
    
    function obtenerPalabra() {
        var palabra = '';
        var i;
        
        for (i = 0; i < indicesSeleccionados.length; i = i + 1) {
            palabra = palabra + letrasActuales[indicesSeleccionados[i]];
        }
        
        return palabra.toLowerCase();
    }
    
    function limpiarSeleccion() {
        indicesSeleccionados = [];
        var celdas = document.querySelectorAll('.celda');
        var i;
        
        for (i = 0; i < celdas.length; i = i + 1) {
            celdas[i].classList.remove('seleccionada', 'ultima', 'posible');
        }
    }
    
    function obtenerVecinosPosibles() {
        if (indicesSeleccionados.length === 0) {
            return [];
        }
        
        var ultimoIndice = indicesSeleccionados[indicesSeleccionados.length - 1];
        var vecinos = VECINOS_POR_INDICE[ultimoIndice];
        var vecinosPosibles = [];
        var i;
        
        for (i = 0; i < vecinos.length; i = i + 1) {
            if (!yaSeleccionado(vecinos[i])) {
                vecinosPosibles.push(vecinos[i]);
            }
        }
        
        return vecinosPosibles;
    }
    
    function obtenerIndicesSeleccionados() {
        return indicesSeleccionados.slice();
    }
    
    return {
        renderizarTablero: renderizarTablero,
        agregarSeleccion: agregarSeleccion,
        obtenerPalabra: obtenerPalabra,
        limpiarSeleccion: limpiarSeleccion,
        obtenerVecinosPosibles: obtenerVecinosPosibles,
        obtenerIndicesSeleccionados: obtenerIndicesSeleccionados
    };
})();