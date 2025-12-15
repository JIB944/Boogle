'use strict';

var ModuloValidacion = (function() {
    var cacheValidacion = {};
    var palabrasEncontradas = [];
    var diccionarioFallback = [
        'aba', 'abe', 'abi', 'abo', 'abs', 'abuelo', 'abuela', 'acabar', 'aceite', 'acto', 'actor', 'actriz', 'adelante', 'adios', 'afuera', 'agua', 'ahora', 'aire', 'ajo', 'alegre', 'algo', 'alguien', 'alma', 'alto', 'amarillo', 'amigo', 'amiga', 'amor', 'ancho', 'angel', 'ano', 'antes', 'aqui', 'arbol', 'arena', 'arriba', 'arte', 'asi', 'ave', 'ayer', 'ayuda', 'azul', 'bailar', 'bajar', 'bajo', 'banco', 'barco', 'base', 'bastante', 'beber', 'beso', 'bien', 'blanco', 'boca', 'bolsa', 'bonito', 'brazo', 'bueno', 'buscar', 'caballo', 'cabeza', 'cada', 'caer', 'cafe', 'caja', 'calle', 'calor', 'cama', 'cambiar', 'camino', 'campo', 'cancion', 'cantar', 'capa', 'cara', 'carne', 'caro', 'carta', 'casa', 'casi', 'ceja', 'cena', 'centro', 'cerca', 'cerdo', 'cero', 'cerrar', 'cielo', 'cien', 'cierto', 'cinco', 'cine', 'ciudad', 'clase', 'claro', 'clima', 'coca', 'coche', 'cocina', 'coger', 'color', 'comer', 'comida', 'como', 'comprar', 'con', 'conocer', 'corazon', 'correr', 'cortar', 'corto', 'cosa', 'crear', 'creer', 'cruz', 'cual', 'cuando', 'cuanto', 'cuarto', 'cuatro', 'cuello', 'cuenta', 'cuerpo', 'cuidar', 'dar', 'de', 'deber', 'decir', 'dedo', 'dejar', 'del', 'dentro', 'derecho', 'desear', 'despues', 'dia', 'diente', 'diez', 'dinero', 'dios', 'donde', 'dormir', 'dos', 'duda', 'durar', 'duro', 'edad', 'el', 'ella', 'ellos', 'en', 'encima', 'encontrar', 'entero', 'entonces', 'entrar', 'entre', 'enviar', 'ese', 'eso', 'espacio', 'espada', 'espejo', 'esperar', 'esposa', 'esposo', 'esta', 'estar', 'este', 'esto', 'estrella', 'estudiar', 'explicar', 'extraño', 'facil', 'falso', 'familia', 'favor', 'feliz', 'feo', 'fie', 'fiesta', 'fin', 'flor', 'forma', 'foto', 'frances', 'frio', 'fruta', 'fuego', 'fuera', 'fuerte', 'fuerza', 'gana', 'ganar', 'gato', 'gente', 'gordo', 'gracias', 'gran', 'grande', 'gritar', 'grupo', 'guapo', 'guardar', 'guerra', 'gustar', 'haber', 'habitacion', 'hablar', 'hacer', 'hacia', 'hambre', 'hasta', 'hay', 'hermano', 'hermana', 'hermoso', 'hijo', 'hija', 'historia', 'hoja', 'hola', 'hombre', 'hombro', 'honor', 'hora', 'hoy', 'hueso', 'huevo', 'idea', 'iglesia', 'importante', 'interes', 'ir', 'isla', 'izquierdo', 'jardin', 'jefe', 'joven', 'juego', 'jugar', 'junto', 'lado', 'lago', 'largo', 'lavar', 'le', 'leer', 'lejos', 'lengua', 'leon', 'letra', 'levantar', 'ley', 'libre', 'libro', 'liga', 'limpio', 'lindo', 'linea', 'lista', 'listo', 'llamar', 'llegar', 'llenar', 'lleno', 'llevar', 'llorar', 'llover', 'lo', 'loco', 'los', 'lugar', 'luna', 'luz', 'madera', 'madre', 'maestro', 'malo', 'mano', 'mantener', 'mañana', 'mar', 'marido', 'mas', 'matar', 'mayor', 'me', 'medio', 'mejor', 'menor', 'menos', 'mente', 'mes', 'mesa', 'meter', 'mi', 'miedo', 'mientras', 'mil', 'minuto', 'mio', 'mirar', 'mismo', 'mitad', 'modo', 'morir', 'mostrar', 'mover', 'muchacho', 'muchacha', 'mucho', 'muerte', 'muerto', 'mujer', 'mundo', 'muy', 'nacer', 'nada', 'nadie', 'nariz', 'necesitar', 'negro', 'ni', 'nieto', 'nieve', 'ninguno', 'niño', 'niña', 'no', 'noche', 'nombre', 'norte', 'nos', 'nosotros', 'nube', 'nuestro', 'nueve', 'nuevo', 'numero', 'nunca', 'ocho', 'ofrecer', 'oir', 'ojo', 'ola', 'oler', 'olvidar', 'once', 'orden', 'oreja', 'oro', 'oscuro', 'oso', 'otro', 'padre', 'pagar', 'pagina', 'pais', 'pajaro', 'palabra', 'pan', 'papel', 'par', 'para', 'parar', 'parecer', 'pared', 'parte', 'partir', 'pasar', 'paseo', 'paso', 'paz', 'pecho', 'pedir', 'pegar', 'pelear', 'pelo', 'pena', 'pensar', 'peor', 'pequeño', 'perder', 'perro', 'persona', 'pesar', 'peso', 'pie', 'piedra', 'piel', 'pierna', 'piso', 'placer', 'plata', 'plato', 'playa', 'plaza', 'pluma', 'pobre', 'poco', 'poder', 'pollo', 'poner', 'por', 'porque', 'posible', 'precio', 'preguntar', 'presente', 'primo', 'prisa', 'probar', 'pronto', 'propio', 'pueblo', 'puerta', 'pues', 'punto', 'que', 'quedar', 'querer', 'quien', 'quince', 'quitar', 'quiza', 'raiz', 'rapido', 'raro', 'rato', 'razon', 'real', 'recibir', 'recordar', 'regla', 'reir', 'rey', 'rico', 'rio', 'risa', 'rojo', 'romper', 'ropa', 'rosa', 'rostro', 'saber', 'sacar', 'sal', 'salir', 'salud', 'sangre', 'santo', 'se', 'seco', 'sed', 'seguir', 'seis', 'semana', 'senor', 'senora', 'sentir', 'ser', 'serio', 'servir', 'si', 'siempre', 'siete', 'silla', 'sin', 'sino', 'sitio', 'sobre', 'sol', 'solo', 'sombra', 'son', 'sonar', 'sonreir', 'subir', 'sucio', 'suelo', 'sueño', 'suerte', 'sur', 'suyo', 'tal', 'tambien', 'tan', 'tanto', 'tardar', 'tarde', 'te', 'techo', 'temer', 'templo', 'temprano', 'tener', 'tercero', 'terminar', 'tierra', 'tiempo', 'tienda', 'tio', 'tia', 'tipo', 'tirar', 'tocar', 'todo', 'tomar', 'tonto', 'toro', 'torre', 'tos', 'trabajar', 'trabajo', 'traer', 'traje', 'tranquilo', 'tras', 'tratar', 'tree', 'trece', 'treinta', 'tren', 'tres', 'triste', 'tu', 'tumba', 'ultimo', 'un', 'una', 'unico', 'unir', 'uno', 'usar', 'uso', 'usted', 'vaca', 'vacio', 'valer', 'valle', 'valor', 'vano', 'varios', 'vaso', 've', 'veces', 'vecino', 'veinte', 'vela', 'vender', 'venir', 'ventana', 'ver', 'verano', 'verdad', 'verde', 'vestido', 'vestir', 'vez', 'viaje', 'viejo', 'viento', 'vino', 'vista', 'vivir', 'vivo', 'volar', 'volver', 'vos', 'voz', 'vuelta', 'ya', 'yo', 'zona'
    ];
    
    function validarLongitud(palabra) {
        return palabra.length >= 3;
    }
    
    function validarNoRepetida(palabra) {
        var i;
        for (i = 0; i < palabrasEncontradas.length; i = i + 1) {
            if (palabrasEncontradas[i] === palabra) {
                return false;
            }
        }
        return true;
    }
    
    function validarConAPI(palabra, callback) {
        if (cacheValidacion.hasOwnProperty(palabra)) {
            callback(cacheValidacion[palabra]);
            return;
        }
        
        setTimeout(function() {
            var esValida = buscarEnFallback(palabra);
            cacheValidacion[palabra] = esValida;
            callback(esValida);
        }, 300);
    }
    
    function buscarEnFallback(palabra) {
        var i;
        var palabraLower = palabra.toLowerCase();
        
        for (i = 0; i < diccionarioFallback.length; i = i + 1) {
            if (diccionarioFallback[i].toLowerCase() === palabraLower) {
                return true;
            }
        }
        
        return false;
    }
    
    function validarPalabra(palabra, callback) {
        var resultado = {
            valida: false,
            razon: ''
        };
        
        if (!validarLongitud(palabra)) {
            resultado.razon = 'La palabra debe tener al menos 3 letras';
            callback(resultado);
            return;
        }
        
        if (!validarNoRepetida(palabra)) {
            resultado.razon = 'Ya encontraste esta palabra';
            callback(resultado);
            return;
        }
        
        validarConAPI(palabra, function(esValida) {
            if (esValida) {
                resultado.valida = true;
                palabrasEncontradas.push(palabra);
            } else {
                resultado.razon = 'La palabra no existe en el diccionario';
            }
            callback(resultado);
        });
    }
    
    function reiniciarPalabras() {
        palabrasEncontradas = [];
    }
    
    function obtenerPalabrasEncontradas() {
        return palabrasEncontradas.slice();
    }
    
    function inicializar() {
    }
    
    return {
        inicializar: inicializar,
        validarPalabra: validarPalabra,
        reiniciarPalabras: reiniciarPalabras,
        obtenerPalabrasEncontradas: obtenerPalabrasEncontradas
    };
})();