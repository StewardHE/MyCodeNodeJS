
// Function de sumar 2 + 2 

var sumarDosMasDos = function(){ //variable con la function de sumar 2 mas 2 
    return 2+2; // devuelve el resultado de 2+2
}

exports.sumarDosMasDos = sumarDosMasDos; //exporta el modulo para poder usarlo en otra function 

exports.suma = function(numero1, numero2) {
    return numero1 + numero2;
}
