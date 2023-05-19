/*Estensione di .replace(): La funzione sostituisce tutti i caratteri di una data stringa*/
                        
String.prototype.replaceAll = function(str1, str2, ignore) {
    return this.replace(new RegExp(str1.replace(/([\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, function(c){return "\\" + c;}), "g"+(ignore?"i":"")), str2);
};

/*Estensione di .isNull(): La funzione sostituisce verifica se un data parametro non è valido*/
                        
String.prototype.isNull = function(value) {
    return isNull(value);
};