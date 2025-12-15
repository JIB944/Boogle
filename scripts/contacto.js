'use strict';

var FormularioContacto = (function() {
    var formulario = null;
    var nombreInput = null;
    var emailInput = null;
    var mensajeInput = null;
    
    function inicializar() {
        formulario = document.getElementById('formulario-contacto');
        nombreInput = document.getElementById('nombre-contacto');
        emailInput = document.getElementById('email-contacto');
        mensajeInput = document.getElementById('mensaje-contacto');
        if (formulario) {
            formulario.addEventListener('submit', manejarSubmit);
        }
        if (nombreInput) {
            nombreInput.addEventListener('blur', validarNombre);
        }
        if (emailInput) {
            emailInput.addEventListener('blur', validarEmail);
        }
        if (mensajeInput) {
            mensajeInput.addEventListener('blur', validarMensaje);
        }
    }
    
    function validarNombre() {
        var nombre = nombreInput.value.trim();
        var errorNombre = document.getElementById('error-nombre');
        if (nombre.length === 0) {
            mostrarError(errorNombre, 'El nombre es obligatorio');
            return false;
        }
        var esAlfanumerico = /^[a-zA-Z0-9\s]+$/.test(nombre);
        if (!esAlfanumerico) {
            mostrarError(errorNombre, 'El nombre debe ser alfanumérico');
            return false;
        }
        ocultarError(errorNombre);
        return true;
    }
    
    function validarEmail() {
        var email = emailInput.value.trim();
        var errorEmail = document.getElementById('error-email');
        if (email.length === 0) {
            mostrarError(errorEmail, 'El email es obligatorio');
            return false;
        }
        var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            mostrarError(errorEmail, 'El email no es válido');
            return false;
        }
        ocultarError(errorEmail);
        return true;
    }
    
    function validarMensaje() {
        var mensaje = mensajeInput.value.trim();
        var errorMensaje = document.getElementById('error-mensaje');
        if (mensaje.length === 0) {
            mostrarError(errorMensaje, 'El mensaje es obligatorio');
            return false;
        }
        if (mensaje.length < 5) {
            mostrarError(errorMensaje, 'El mensaje debe tener al menos 5 caracteres');
            return false;
        }
        ocultarError(errorMensaje);
        return true;
    }
    
    function mostrarError(elemento, mensaje) {
        if (elemento) {
            elemento.textContent = mensaje;
            elemento.classList.remove('oculto');
        }
    }
    
    function ocultarError(elemento) {
        if (elemento) {
            elemento.textContent = '';
            elemento.classList.add('oculto');
        }
    }
    
    function manejarSubmit(evento) {
        evento.preventDefault();
        var nombreValido = validarNombre();
        var emailValido = validarEmail();
        var mensajeValido = validarMensaje();
        if (!nombreValido || !emailValido || !mensajeValido) {
            return;
        }
        var nombre = nombreInput.value.trim();
        var email = emailInput.value.trim();
        var mensaje = mensajeInput.value.trim();
        var asunto = 'Contacto desde Boogle - ' + nombre;
        var cuerpo = 'Nombre: ' + nombre + '\n';
        cuerpo = cuerpo + 'Email: ' + email + '\n\n';
        cuerpo = cuerpo + 'Mensaje:\n' + mensaje;
        var mailtoLink = 'mailto:tu-email@ejemplo.com';
        mailtoLink = mailtoLink + '?subject=' + encodeURIComponent(asunto);
        mailtoLink = mailtoLink + '&body=' + encodeURIComponent(cuerpo);
        window.location.href = mailtoLink;
    }
    
    return {
        inicializar: inicializar
    };
})();

document.addEventListener('DOMContentLoaded', function() {
    FormularioContacto.inicializar();
});