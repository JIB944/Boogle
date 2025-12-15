'use strict';

var ModuloEventos = (function() {
    var elementos = null;
    var callbackInicioJuego = null;
    var callbackClickCelda = null;
    var callbackConfirmarPalabra = null;
    var callbackLimpiarSeleccion = null;
    var callbackMostrarRanking = null;
    var callbackJugarOtraVez = null;
    var callbackTerminarJuego = null;
    var callbackCambioOrdenRanking = null;
    
    function manejarSubmitInicio(evento) {
        evento.preventDefault();
        evento.stopPropagation();
        var nombre = elementos.nombreJugador.value.trim();
        var tiempo = parseInt(elementos.selectorTiempo.value, 10);

        if (nombre.length < 3) {
            ModuloModales.mostrarError('El nombre debe tener al menos 3 caracteres');
            return;
        }

        var esAlfanumerico = /^[a-zA-Z0-9\s]+$/.test(nombre);
        if (!esAlfanumerico) {
            ModuloModales.mostrarError('El nombre debe ser alfanumérico (solo letras y números)');
            return;
        }

        if (callbackInicioJuego) {
            callbackInicioJuego(nombre, tiempo);
        }
    }
    
    function manejarClickCelda(evento) {
        var celda = evento.currentTarget;
        var indice = parseInt(celda.getAttribute('data-indice'), 10);
        if (callbackClickCelda) {
            callbackClickCelda(indice);
        }
    }
    
    function manejarConfirmarPalabra() {
        if (callbackConfirmarPalabra) {
            callbackConfirmarPalabra();
        }
    }
    
    function manejarLimpiarSeleccion() {
        if (callbackLimpiarSeleccion) {
            callbackLimpiarSeleccion();
        }
    }
    
    function manejarMostrarRanking() {
        if (callbackMostrarRanking) {
            callbackMostrarRanking();
        }
    }
    
    function manejarJugarOtraVez() {
        if (callbackJugarOtraVez) {
            callbackJugarOtraVez();
        }
    }
    
    function manejarCambioOrdenRanking() {
        if (callbackCambioOrdenRanking) {
            var orden = elementos.ordenarRanking.value;
            callbackCambioOrdenRanking(orden);
        }
    }
    
    function manejarCerrarRanking() {
        ModuloModales.ocultar('modal-ranking');
    }

    function manejarCerrarError() {
        ModuloModales.ocultar('modal-error');
    }

    function manejarTerminarJuego() {
        if (callbackTerminarJuego) {
            callbackTerminarJuego();
        }
    }

    function manejarSalirInicio() {
        window.close();
    }

    function manejarSalirFin() {
        window.close();
    }

    function configurar(elementosDOM, callbacks) {
        elementos = elementosDOM;
        callbackInicioJuego = callbacks.inicioJuego;
        callbackClickCelda = callbacks.clickCelda;
        callbackConfirmarPalabra = callbacks.confirmarPalabra;
        callbackLimpiarSeleccion = callbacks.limpiarSeleccion;
        callbackMostrarRanking = callbacks.mostrarRanking;
        callbackJugarOtraVez = callbacks.jugarOtraVez;
        callbackTerminarJuego = callbacks.terminarJuego;
        callbackCambioOrdenRanking = callbacks.cambioOrdenRanking;
        
        if (elementos.formularioInicio) {
            elementos.formularioInicio.addEventListener('submit', manejarSubmitInicio);
        }
        
        if (elementos.celdas) {
            var i;
            for (i = 0; i < elementos.celdas.length; i = i + 1) {
                elementos.celdas[i].addEventListener('click', manejarClickCelda);
            }
        }
        
        if (elementos.botonConfirmar) {
            elementos.botonConfirmar.addEventListener('click', manejarConfirmarPalabra);
        }
        if (elementos.botonLimpiar) {
            elementos.botonLimpiar.addEventListener('click', manejarLimpiarSeleccion);
        }
        if (elementos.botonMostrarRanking) {
            elementos.botonMostrarRanking.addEventListener('click', manejarMostrarRanking);
        }
        if (elementos.botonVerRanking) {
            elementos.botonVerRanking.addEventListener('click', manejarMostrarRanking);
        }
        if (elementos.botonJugarOtraVez) {
            elementos.botonJugarOtraVez.addEventListener('click', manejarJugarOtraVez);
        }
        if (elementos.botonTerminarJuego) {
            elementos.botonTerminarJuego.addEventListener('click', manejarTerminarJuego);
        }
        if (elementos.botonSalirInicio) {
            elementos.botonSalirInicio.addEventListener('click', manejarSalirInicio);
        }
        if (elementos.botonSalirFin) {
            elementos.botonSalirFin.addEventListener('click', manejarSalirFin);
        }
        if (elementos.cerrarRanking) {
            elementos.cerrarRanking.addEventListener('click', manejarCerrarRanking);
        }
        if (elementos.botonCerrarError) {
            elementos.botonCerrarError.addEventListener('click', manejarCerrarError);
        }
        if (elementos.ordenarRanking) {
            elementos.ordenarRanking.addEventListener('change', manejarCambioOrdenRanking);
        }
    }
    
    return {
        configurar: configurar
    };
})();