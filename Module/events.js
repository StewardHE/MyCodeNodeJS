const EventEmitter = require('events'); // Especifica el modulo a usar 

const emitter = new EventEmitter(); // crea el emitter

emitter.on('event', function(){ // function para que el evento funcione. Nota: es necesario poner 'event' como prrimer parametro para que este escuche.

    console.log('Un evento ha ocurrido...'); // pone esto si el evento se inicia 
})

emitter.emit('event'); // emite el evento Nota: hay que usar la misma clave "event" ya que este es el activador de events

emitter.on('eventWithArgument', function(arg){ // evento con argumentos
    console.log('Un evento con los siguientes argumentos ha ocurrido: ' + arg.id + ' '+ arg.numero)
})

emitter.emit('eventWithArgument', {id: 1, numero: 24});

emitter.on('eventArrow', (arg)=> { // evento con funcion arrow
    console.log('Un evento flecha con los siguientes argumentos ha ocurrido: ' + arg.id + ' '+ arg.numero)
})

emitter.emit('eventArrow', {id: 1, numero: 24});