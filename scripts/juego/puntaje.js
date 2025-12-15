'use strict';

var ModuloPuntaje = (function() {
    var puntajeActual = 0;
    var PENALIZACION_PALABRA_INVALIDA = -1;
    var TABLA_PUNTOS = {
        3: 1,
        4: 1,
        5: 2,
        6: 3,
        7: 5
    };
    
    function calcularPuntos(palabra) {
        var longitud = palabra.length;
        
        if (longitud <= 4) {
            return TABLA_PUNTOS[3];
        }
        
        if (TABLA_PUNTOS.hasOwnProperty(longitud)) {
            return TABLA_PUNTOS[longitud];
        }
        
        return 11;
    }
    
    function agregarPuntos(palabra) {
        var puntos = calcularPuntos(palabra);
        puntajeActual = puntajeActual + puntos;
        return puntos;
    }
    
    function aplicarPenalizacion() {
        puntajeActual = puntajeActual + PENALIZACION_PALABRA_INVALIDA;
        if (puntajeActual < 0) {
            puntajeActual = 0;
        }
        return PENALIZACION_PALABRA_INVALIDA;
    }
    
    function obtenerPuntaje() {
        return puntajeActual;
    }
    
    function reiniciar() {
        puntajeActual = 0;
    }
    
    return {
        calcularPuntos: calcularPuntos,
        agregarPuntos: agregarPuntos,
        aplicarPenalizacion: aplicarPenalizacion,
        obtenerPuntaje: obtenerPuntaje,
        reiniciar: reiniciar
    };
})();