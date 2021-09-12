// Requires
const jwt = require('jsonwebtoken')

// check if the user token is correct
function auth(req, res, next){
    const jwtToken = req.header('authorization') 
    // if there is no token
    if(!jwtToken) return res.status(401).send('access denied, you need a valid token')

    // Check if the token is valid
    try{
        const payload = jwt.verify(jwtToken, process.env.SECRET_KEY_JWT_CAR_API) 
        req.user = payload
        next()

    // if the token is invalid
    }catch(e){
        res.status(400).send('Access denied, token is invalid')
    }
}
// export the module
module.exports = auth