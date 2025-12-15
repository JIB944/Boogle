'use strict';

var ModuloTemporizador = (function() {
    var tiempoRestante = 0;
    var intervalo = null;
    var callbackFinalizacion = null;
    var elementoMinutos = null;
    var elementoSegundos = null;
    var elementoTemporizador = null;
    
    function inicializarDOM() {
        elementoMinutos = document.getElementById('minutos');
        elementoSegundos = document.getElementById('segundos');
        elementoTemporizador = document.getElementById('temporizador');
    }
    
    function formatearDosDigitos(numero) {
        return numero < 10 ? '0' + numero : '' + numero;
    }
    
    function actualizarVisualizacion() {
        var minutos = Math.floor(tiempoRestante / 60);
        var segundos = tiempoRestante % 60;
        
        if (elementoMinutos && elementoSegundos) {
            elementoMinutos.textContent = formatearDosDigitos(minutos);
            elementoSegundos.textContent = formatearDosDigitos(segundos);
        }
        
        if (tiempoRestante <= 10) {
            if (elementoTemporizador) {
                elementoTemporizador.classList.add('urgente');
            }
        } else {
            if (elementoTemporizador) {
                elementoTemporizador.classList.remove('urgente');
            }
        }
    }
    
    function tick() {
        tiempoRestante = tiempoRestante - 1;
        actualizarVisualizacion();
        
        if (tiempoRestante <= 0) {
            detener();
            if (callbackFinalizacion) {
                callbackFinalizacion();
            }
        }
    }
    
    function iniciar(segundos, callback) {
        if (!elementoMinutos) {
            inicializarDOM();
        }
        
        tiempoRestante = segundos;
        callbackFinalizacion = callback;
        actualizarVisualizacion();
        
        intervalo = setInterval(tick, 1000);
    }
    
    function detener() {
        if (intervalo) {
            clearInterval(intervalo);
            intervalo = null;
        }
    }
    
    function reiniciar() {
        detener();
        tiempoRestante = 0;
        if (elementoTemporizador) {
            elementoTemporizador.classList.remove('urgente');
        }
    }
    
    function obtenerTiempoRestante() {
        return tiempoRestante;
    }
    
    return {
        iniciar: iniciar,
        detener: detener,
        reiniciar: reiniciar,
        obtenerTiempoRestante: obtenerTiempoRestante
    };
})();