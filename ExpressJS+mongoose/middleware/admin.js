// middleware for check if the user is admin or no 

module.exports = function(req, res, next){
    // if the user is not a admin
    if(!req.user.isAdmin)return res.status(403).send('access denied')
    // if user is admin 
    next()
}