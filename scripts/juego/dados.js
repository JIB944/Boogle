'use strict';

var ModuloDados = (function() {
    var DADOS_BOOGLE = [
        'AEIORU',
        'AEIONS',
        'AENRST',
        'ACDEMO',
        'ABILRT',
        'ADENPS',
        'AELMNT',
        'AIORST',
        'BCDELO',
        'CDENOS',
        'EILNOR',
        'EMNORT',
        'LMORST',
        'NRASTE',
        'QUROST',
        'RSTUVA'
    ];
    
    function mezclarArray(array) {
        var arrayMezclado = array.slice();
        var i;
        var j;
        var temp;
        
        for (i = arrayMezclado.length - 1; i > 0; i = i - 1) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arrayMezclado[i];
            arrayMezclado[i] = arrayMezclado[j];
            arrayMezclado[j] = temp;
        }
        
        return arrayMezclado;
    }
    
    function obtenerCaraAleatoria(dado) {
        var indiceAleatorio = Math.floor(Math.random() * dado.length);
        var letra = dado.charAt(indiceAleatorio);
        
        if (letra === 'Q') {
            return 'QU';
        }
        
        return letra;
    }
    
    function generarLetras() {
        var dadosMezclados = mezclarArray(DADOS_BOOGLE);
        var letras = [];
        var i;
        
        for (i = 0; i < dadosMezclados.length; i = i + 1) {
            letras.push(obtenerCaraAleatoria(dadosMezclados[i]));
        }
        
        return letras;
    }
    
    return {
        generarLetras: generarLetras
    };
})();