
function isAuth(req, res, next) {
    if(req.isAuthenticated()) {
        next()
    } else {
        res.status(401).send("You are not authenticated. Please log in.")
    }
}

function isAdmin(req, res, next) {
    
}

module.exports = {
    isAuth,
    isAdmin,
}
    
