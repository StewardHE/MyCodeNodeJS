const os = require('os');

// shows the operating system 
console.log('Version SO', os.release()); 

// return the cpu architecture
console.log("CPU architecture: " + os.arch());

// show the available memory 
console.log('Memoria Libre: ', os.freemem()); 

// shows the total memory
console.log("Memoria Total: "+ os.totalmem()); 

// It returns the operating systems default directory for temp files.
console.log('OS default directory for temp files : ' + os.tmpdir ());