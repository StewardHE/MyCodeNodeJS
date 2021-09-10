// anidated promise
function getCar(id){
    return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                    console.log('Obtained car 23 of our database')
                    resolve({id: 23, model: 'Clase G', company: 'Mercedes'})
            },3000)
    })
}
// function for get car model
function getModel(model){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log('Obtained model clase G of our database')
            resolve({speed: 180, seat: '7', size: '4*5'})
    },3000)
    })
}

/* consume the promise
const promesa = getCar(23)
promesa.then(car => console.log(car))

promesa
    .then(coche=> getModel(car.model))
    .then(model=> console.log(model))
    .catch(err => console.log(err.message))
*/

// async and await
async function showModel(){
    try{

    const car = await getCar(23) // wait until the promise getCar is consumed
    const model = await getModel(car.model)
    console.log(model)

    }catch(err){
        console.log(err.message)
    }
}

showModel() // calls to the method show model