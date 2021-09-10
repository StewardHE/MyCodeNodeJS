// parallel promise

const promise1 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        console.log('Reading data of Facebook')
        resolve({amigos: 100, likes: 200})
    },1000)
})

const promise2 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        console.log('Reading data of Twitter')
        resolve({amigos: 300, likes: 900})
    },4000)
})

/*promise.all([promesa1, promesa2])
    .then(result=> console.log(result))
    .catch(err => console.log(err.message))
*/
    Promise.race([promise1, promise2])
    .then(result=> console.log(result))
    .catch(err => console.log(err.message))