'use strict';

var ModuloDOM = (function() {
    var elementos = {
        modalInicio: null,
        modalFin: null,
        modalRanking: null,
        modalError: null,
        formularioInicio: null,
        nombreJugador: null,
        selectorTiempo: null,
        contenedorJuego: null,
        nombreJugadorMostrar: null,
        tablero: null,
        celdas: null,
        palabraActual: null,
        textoPalabraActual: null,
        puntaje: null,
        listaPalabras: null,
        contadorPalabras: null,
        botonConfirmar: null,
        botonLimpiar: null,
        botonMostrarRanking: null,
        botonVerRanking: null,
        botonJugarOtraVez: null,
        botonTerminarJuego: null,
        botonSalirInicio: null,
        botonSalirFin: null,
        cerrarRanking: null,
        botonCerrarError: null,
        mensajeFin: null,
        puntajeFinal: null,
        ordenarRanking: null,
        contenedorRanking: null
    };
    
    function inicializar() {
        elementos.modalInicio = document.getElementById('modal-inicio');
        elementos.modalFin = document.getElementById('modal-fin');
        elementos.modalRanking = document.getElementById('modal-ranking');
        elementos.modalError = document.getElementById('modal-error');
        elementos.formularioInicio = document.getElementById('formulario-inicio');
        elementos.nombreJugador = document.getElementById('nombre-jugador');
        elementos.selectorTiempo = document.getElementById('selector-tiempo');
        elementos.contenedorJuego = document.getElementById('contenedor-juego');
        elementos.nombreJugadorMostrar = document.getElementById('nombre-jugador-mostrar');
        elementos.tablero = document.getElementById('tablero');
        elementos.celdas = document.querySelectorAll('.celda');
        elementos.palabraActual = document.getElementById('palabra-actual');
        elementos.textoPalabraActual = document.getElementById('texto-palabra-actual');
        elementos.puntaje = document.getElementById('puntaje');
        elementos.listaPalabras = document.getElementById('lista-palabras');
        elementos.contadorPalabras = document.getElementById('contador-palabras');
        elementos.botonConfirmar = document.getElementById('boton-confirmar');
        elementos.botonLimpiar = document.getElementById('boton-limpiar');
        elementos.botonMostrarRanking = document.getElementById('boton-mostrar-ranking');
        elementos.botonVerRanking = document.getElementById('boton-ver-ranking');
        elementos.botonJugarOtraVez = document.getElementById('boton-jugar-otra-vez');
        elementos.botonTerminarJuego = document.getElementById('boton-terminar-juego');
        elementos.botonSalirInicio = document.getElementById('boton-salir-inicio');
        elementos.botonSalirFin = document.getElementById('boton-salir-fin');
        elementos.cerrarRanking = document.getElementById('cerrar-ranking');
        elementos.botonCerrarError = document.getElementById('boton-cerrar-error');
        elementos.mensajeFin = document.getElementById('mensaje-fin');
        elementos.puntajeFinal = document.getElementById('puntaje-final');
        elementos.ordenarRanking = document.getElementById('ordenar-ranking');
        elementos.contenedorRanking = document.getElementById('contenedor-ranking');
    }
    
    function obtener(nombre) {
        return elementos[nombre];
    }
    
    function obtenerTodos() {
        return elementos;
    }
    
    function actualizarTexto(nombre, texto) {
        if (elementos[nombre]) {
            elementos[nombre].textContent = texto;
        }
    }
    
    function actualizarPuntaje(puntaje) {
        if (elementos.puntaje) {
            elementos.puntaje.textContent = puntaje;
        }
    }
    
    function actualizarPalabraActual(palabra) {
        if (elementos.textoPalabraActual) {
            elementos.textoPalabraActual.textContent = palabra.toUpperCase();
        }
    }
    
    function agregarPalabraALista(palabra, puntos) {
        if (!elementos.listaPalabras) {
            return;
        }
        
        var template = document.getElementById('template-palabra');
        if (!template) {
            return;
        }
        
        var nuevaPalabra = template.cloneNode(true);
        nuevaPalabra.removeAttribute('id');
        nuevaPalabra.classList.remove('oculto');
        
        var spanPalabra = nuevaPalabra.querySelector('.palabra-texto');
        var spanPuntos = nuevaPalabra.querySelector('.palabra-puntos');
        
        if (spanPalabra) {
            spanPalabra.textContent = palabra.toUpperCase();
        }
        
        if (spanPuntos) {
            spanPuntos.textContent = '+' + puntos;
        }
        
        if (elementos.listaPalabras.children.length > 1) {
            elementos.listaPalabras.insertBefore(nuevaPalabra, elementos.listaPalabras.children[1]);
        } else {
            elementos.listaPalabras.appendChild(nuevaPalabra);
        }
        
        var palabrasEncontradas = elementos.listaPalabras.children.length - 1;
        if (elementos.contadorPalabras) {
            elementos.contadorPalabras.textContent = palabrasEncontradas;
        }
    }
    
    function limpiarListaPalabras() {
        if (elementos.listaPalabras) {
            while (elementos.listaPalabras.children.length > 1) {
                elementos.listaPalabras.removeChild(elementos.listaPalabras.lastChild);
            }
        }
        if (elementos.contadorPalabras) {
            elementos.contadorPalabras.textContent = '0';
        }
    }
    
    function toggleBotonConfirmar(habilitar) {
        if (elementos.botonConfirmar) {
            elementos.botonConfirmar.disabled = !habilitar;
        }
    }

    function mostrarNotificacion(mensaje, tipo) {
        var notificacion = document.getElementById('notificacion');
        if (!notificacion) {
            notificacion = document.createElement('div');
            notificacion.id = 'notificacion';
            notificacion.className = 'notificacion';
            document.body.appendChild(notificacion);
        }

        notificacion.textContent = mensaje;
        notificacion.className = 'notificacion ' + tipo + ' visible';

        setTimeout(function() {
            notificacion.className = 'notificacion ' + tipo;
        }, 2500);
    }

    return {
        inicializar: inicializar,
        obtener: obtener,
        obtenerTodos: obtenerTodos,
        actualizarTexto: actualizarTexto,
        actualizarPuntaje: actualizarPuntaje,
        actualizarPalabraActual: actualizarPalabraActual,
        agregarPalabraALista: agregarPalabraALista,
        limpiarListaPalabras: limpiarListaPalabras,
        toggleBotonConfirmar: toggleBotonConfirmar,
        mostrarNotificacion: mostrarNotificacion
    };
})();