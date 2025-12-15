'use strict';

var ModuloModales = (function() {
    function mostrar(idModal) {
        var modal = document.getElementById(idModal);
        if (modal) {
            modal.classList.remove('oculto');
        }
    }
    
    function ocultar(idModal) {
        var modal = document.getElementById(idModal);
        if (modal) {
            modal.classList.add('oculto');
        }
    }
    
    function mostrarFinJuego(nombreJugador, puntaje, totalPalabras) {
        var mensajeFin = document.getElementById('mensaje-fin');
        var puntajeFinal = document.getElementById('puntaje-final');
        
        if (mensajeFin) {
            var textoMensaje = '¡Bien jugado, ' + nombreJugador + '! Encontraste ' + totalPalabras + ' palabra';
            if (totalPalabras !== 1) {
                textoMensaje = textoMensaje + 's';
            }
            mensajeFin.textContent = textoMensaje;
        }
        
        if (puntajeFinal) {
            puntajeFinal.textContent = puntaje + ' puntos';
        }
        
        mostrar('modal-fin');
    }
    
    function crearFilaRanking(posicion, partida) {
        var fila = document.createElement('tr');
        var celdaPosicion = document.createElement('td');
        celdaPosicion.className = 'posicion';
        celdaPosicion.textContent = posicion;
        var celdaNombre = document.createElement('td');
        celdaNombre.textContent = partida.nombre;
        var celdaPuntaje = document.createElement('td');
        celdaPuntaje.className = 'puntaje-destacado';
        celdaPuntaje.textContent = partida.puntaje;
        var celdaPalabras = document.createElement('td');
        celdaPalabras.textContent = partida.totalPalabras || 0;
        var celdaFecha = document.createElement('td');
        var fecha = new Date(partida.fecha);
        celdaFecha.textContent = formatearFecha(fecha);
        fila.appendChild(celdaPosicion);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaPuntaje);
        fila.appendChild(celdaPalabras);
        fila.appendChild(celdaFecha);
        return fila;
    }
    
    function mostrarRanking(partidas, ordenPor) {
        var mensajeVacio = document.getElementById('mensaje-vacio-ranking');
        var tabla = document.getElementById('tabla-ranking');
        var cuerpoTabla = document.getElementById('cuerpo-tabla-ranking');
        
        if (!cuerpoTabla || !tabla || !mensajeVacio) {
            return;
        }
        
        while (cuerpoTabla.firstChild) {
            cuerpoTabla.removeChild(cuerpoTabla.firstChild);
        }
        
        if (!partidas || partidas.length === 0) {
            mensajeVacio.classList.remove('oculto');
            tabla.classList.add('oculto');
        } else {
            mensajeVacio.classList.add('oculto');
            tabla.classList.remove('oculto');
            var partidasOrdenadas = ordenarPartidas(partidas, ordenPor);
            var i;
            for (i = 0; i < partidasOrdenadas.length; i = i + 1) {
                var fila = crearFilaRanking(i + 1, partidasOrdenadas[i]);
                cuerpoTabla.appendChild(fila);
            }
        }
        
        mostrar('modal-ranking');
    }
    
    function ordenarPartidas(partidas, ordenPor) {
        var partidasCopia = partidas.slice();
        
        if (ordenPor === 'fecha') {
            partidasCopia.sort(function(a, b) {
                return new Date(b.fecha) - new Date(a.fecha);
            });
        } else {
            partidasCopia.sort(function(a, b) {
                return b.puntaje - a.puntaje;
            });
        }
        
        return partidasCopia;
    }
    
    function formatearFecha(fecha) {
        var dia = fecha.getDate();
        var mes = fecha.getMonth() + 1;
        var anio = fecha.getFullYear();
        var horas = fecha.getHours();
        var minutos = fecha.getMinutes();
        dia = dia < 10 ? '0' + dia : dia;
        mes = mes < 10 ? '0' + mes : mes;
        horas = horas < 10 ? '0' + horas : horas;
        minutos = minutos < 10 ? '0' + minutos : minutos;
        return dia + '/' + mes + '/' + anio + ' ' + horas + ':' + minutos;
    }
    
    return {
        mostrar: mostrar,
        ocultar: ocultar,
        mostrarFinJuego: mostrarFinJuego,
        mostrarRanking: mostrarRanking
    };
})();