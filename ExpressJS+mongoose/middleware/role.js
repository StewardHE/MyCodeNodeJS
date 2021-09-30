// 
function authorize(roles = []){
    if(typeof roles === 'string'){
        roles = [roles]
    }

    return[
        (req, res, next) => {
            if(!roles.includes(req.user.role)) return res.status(403).send('Access denied, You do not have a role to enter here')
        
            next()
        }
    ]
}

// export the module
module.exports = authorize