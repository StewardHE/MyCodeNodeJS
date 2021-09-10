// exercise to count how much exercise the user does

//var start = new Date(2021, 00, 01); // creates the date  of when start to make exercise
//var end = new Date(2021, 00, 18) //creates the date of end the exercise

const d3 = require("d3-time") // get the module d3-time 

var start = new Date(2021, 02, 01); // creates the date  of when start to make exercise
var end = new Date(2021, 03, 01) //creates the date of end the exercise

var miliSegundsDay = 24*60*1000; // milisegunds of the day, is 24 hours of day, 60 segunds of hour, 1000 miliasegunds of segunds 

var resultado = (end-start)/miliSegundsDay; // result divided for  millisegunds 

resultado = d3.timeDay.count(start, end);

console.log("segun nuestras estadisticas, " + "En " + resultado + " dias no has hecho ejercicio") // show full result