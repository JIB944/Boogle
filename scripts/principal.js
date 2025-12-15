'use strict';

var JuegoBoogle = (function() {
    var nombreJugador = '';
    var tiempoSeleccionado = 120;
    var juegoActivo = false;
    
    function inicializar() {
        ModuloDOM.inicializar();
        ModuloValidacion.inicializar();
        var elementos = ModuloDOM.obtenerTodos();
        ModuloEventos.configurar(elementos, {
            inicioJuego: iniciarJuego,
            clickCelda: manejarClickCelda,
            confirmarPalabra: confirmarPalabra,
            limpiarSeleccion: limpiarSeleccion,
            mostrarRanking: mostrarRanking,
            jugarOtraVez: reiniciarJuego,
            terminarJuego: finalizarJuego,
            cambioOrdenRanking: cambiarOrdenRanking
        });
    }
    
    function iniciarJuego(nombre, tiempo) {
        nombreJugador = nombre;
        tiempoSeleccionado = tiempo;
        juegoActivo = true;
        var todosModales = document.querySelectorAll('.modal');
        var i;
        for (i = 0; i < todosModales.length; i = i + 1) {
            todosModales[i].classList.add('oculto');
        }
        var contenedor = document.getElementById('contenedor-juego');
        if (contenedor) {
            contenedor.classList.remove('oculto');
        }
        var nombreElemento = document.getElementById('nombre-jugador-mostrar');
        if (nombreElemento) {
            nombreElemento.textContent = nombreJugador;
        }
        var letras = ModuloDados.generarLetras();
        ModuloTablero.renderizarTablero(letras);
        ModuloPuntaje.reiniciar();
        ModuloValidacion.reiniciarPalabras();
        ModuloDOM.actualizarPuntaje(0);
        ModuloDOM.limpiarListaPalabras();
        ModuloDOM.actualizarPalabraActual('');
        ModuloTemporizador.iniciar(tiempoSeleccionado, finalizarJuego);
    }
    
    function manejarClickCelda(indice) {
        if (!juegoActivo) {
            return;
        }
        var seleccionExitosa = ModuloTablero.agregarSeleccion(indice);
        if (seleccionExitosa) {
            actualizarVisualizacionSeleccion();
            var palabra = ModuloTablero.obtenerPalabra();
            ModuloDOM.actualizarPalabraActual(palabra);
            ModuloDOM.toggleBotonConfirmar(palabra.length >= 3);
        }
    }
    
    function actualizarVisualizacionSeleccion() {
        var celdas = ModuloDOM.obtener('celdas');
        var indicesSeleccionados = ModuloTablero.obtenerIndicesSeleccionados();
        var vecinosPosibles = ModuloTablero.obtenerVecinosPosibles();
        var i;
        for (i = 0; i < celdas.length; i = i + 1) {
            celdas[i].classList.remove('seleccionada', 'ultima', 'posible');
        }
        for (i = 0; i < indicesSeleccionados.length; i = i + 1) {
            celdas[indicesSeleccionados[i]].classList.add('seleccionada');
        }
        if (indicesSeleccionados.length > 0) {
            var ultimoIndice = indicesSeleccionados[indicesSeleccionados.length - 1];
            celdas[ultimoIndice].classList.add('ultima');
        }
        for (i = 0; i < vecinosPosibles.length; i = i + 1) {
            celdas[vecinosPosibles[i]].classList.add('posible');
        }
    }
    
    function confirmarPalabra() {
        if (!juegoActivo) {
            return;
        }
        var palabra = ModuloTablero.obtenerPalabra();
        if (palabra.length < 3) {
            return;
        }
        ModuloValidacion.validarPalabra(palabra, function(resultado) {
            if (resultado.valida) {
                var puntos = ModuloPuntaje.agregarPuntos(palabra);
                var puntajeTotal = ModuloPuntaje.obtenerPuntaje();
                ModuloDOM.actualizarPuntaje(puntajeTotal);
                ModuloDOM.agregarPalabraALista(palabra, puntos);
                ModuloDOM.mostrarNotificacion('¡Palabra correcta! +' + puntos + ' puntos', 'exito');
            } else {
                ModuloPuntaje.aplicarPenalizacion();
                var puntajeTotal = ModuloPuntaje.obtenerPuntaje();
                ModuloDOM.actualizarPuntaje(puntajeTotal);
                var mensajeError = resultado.razon || 'Palabra no válida';
                ModuloDOM.mostrarNotificacion(mensajeError + ' (-1 punto)', 'error');
            }
            limpiarSeleccion();
        });
    }
    
    function limpiarSeleccion() {
        ModuloTablero.limpiarSeleccion();
        ModuloDOM.actualizarPalabraActual('');
        ModuloDOM.toggleBotonConfirmar(false);
        actualizarVisualizacionSeleccion();
    }
    
    function finalizarJuego() {
        juegoActivo = false;
        var puntaje = ModuloPuntaje.obtenerPuntaje();
        var palabras = ModuloValidacion.obtenerPalabrasEncontradas();
        var totalPalabras = palabras.length;
        guardarPartida(nombreJugador, puntaje, totalPalabras);
        ModuloModales.mostrarFinJuego(nombreJugador, puntaje, totalPalabras);
    }
    
    function guardarPartida(nombre, puntaje, totalPalabras) {
        var partida = {
            nombre: nombre,
            puntaje: puntaje,
            totalPalabras: totalPalabras,
            fecha: new Date().toISOString()
        };
        var partidasGuardadas = obtenerPartidasGuardadas();
        partidasGuardadas.push(partida);
        localStorage.setItem('boogle-ranking', JSON.stringify(partidasGuardadas));
    }
    
    function obtenerPartidasGuardadas() {
        var datos = localStorage.getItem('boogle-ranking');
        if (!datos) {
            return [];
        }
        try {
            return JSON.parse(datos);
        } catch (error) {
            return [];
        }
    }
    
    function mostrarRanking() {
        var partidas = obtenerPartidasGuardadas();
        var orden = 'puntaje';
        var selectorOrden = ModuloDOM.obtener('ordenarRanking');
        if (selectorOrden) {
            orden = selectorOrden.value;
        }
        ModuloModales.mostrarRanking(partidas, orden);
    }
    
    function cambiarOrdenRanking(orden) {
        var partidas = obtenerPartidasGuardadas();
        ModuloModales.mostrarRanking(partidas, orden);
    }
    
    function reiniciarJuego() {
        ModuloModales.ocultar('modal-fin');
        var formulario = ModuloDOM.obtener('formularioInicio');
        if (formulario) {
            formulario.reset();
        }
        var contenedor = ModuloDOM.obtener('contenedorJuego');
        if (contenedor) {
            contenedor.classList.add('oculto');
        }
        ModuloTemporizador.reiniciar();
        ModuloModales.mostrar('modal-inicio');
    }
    
    return {
        inicializar: inicializar
    };
})();

document.addEventListener('DOMContentLoaded', function() {
    JuegoBoogle.inicializar();
});