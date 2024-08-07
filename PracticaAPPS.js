//ctrl+f para buscar algo en la pagina
let numSecreto = 0;
let intentosUsu = 0; //inicio de intentos del usuario, se lo deja de esta forma ya que la funcion condiciones iniciales se encragara de darle los valores correctos 
let l_numSorteados = [];
let num_max = 10;

console.log(numSecreto);

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verIntento() {
    let numUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (numSecreto === numUsuario) {
        asignarTextoElemento('p',`Acertaste en ${intentosUsu} ${(intentosUsu === 1)?'vez':'veces'} veces`);
        document.getElementById('reiniciar').removeAttribute('disable'); //esto nos permite decirle al boton "nuevo juego" habilitarlo
    } else { //esto es para cuando el usuario no acierta
        if (numUsuario > numSecreto) {
            asignarTextoElemento('p','El número secreto es menor');
        } else {
            asignarTextoElemento('p','El número secreto es mayor');
        }
        intentosUsu++;
        limpiar();
    }
    return; 
}

function generarNumSecreto() {
    let num_generado = Math.floor(Math.random()*10)+1;
    //si ya sorteamos todos los nunmeros podriamos cerrar el juego de la sgte forma:
    if (l_numSorteados.length == num_max) {
        asignarTextoElemento('p','Ya se sortearon todos los numeros posibles')
    } else {
        // si el numero esta incluido en la lista
        if (l_numSorteados.includes(num_generado)) {
            return generarNumSecreto();
        } else {
            l_numSorteados.push(num_generado);
            return num_generado;
        }
    }
}

//esta funcion se hizo con el fin de que cuando el usu ha terminado de ugar se limpie la cajita donde coloca el numero
function limpiar() {
    document.querySelector('#valorUsuario').value = '';
}

function cond_iniciales() {
    asignarTextoElemento('h1','Juego del número secreto!');
    asignarTextoElemento('p',`Indica un número del 1 al 10`);
    numSecreto = generarNumSecreto(); //solo esta reiniciando el num secreto
    intentosUsu = 1;
}

function rei_juego() {
    //limpiar la caja
    limpiarCaja();
    //mensaje de intervalo de numeros del 1 al 10
    //generar el numero aleatorio
    cond_iniciales();
    // Iniciarlizar el numero de intentos
    document.querySelector('#reiniciar').getAttribute('disable','True');
}

cond_iniciales();