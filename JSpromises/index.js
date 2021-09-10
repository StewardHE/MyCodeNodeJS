// JS promises

const promise = new Promise((resolve, reject)=> { // init the promise 
    // all code here, runs 4000 millisegunds later
    setTimeout(()=>{
            resolve({id: 1, model: 'Mercedes', company: 'Clase G'}) // sends the id,model and company of the car
            reject(new Error("Error reading the database"))
    },4000)
})

promise
    .then(result => console.log(result))
    .catch(err => console.log(err.message))