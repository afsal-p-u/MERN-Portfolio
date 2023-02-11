const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.header('Bearer')
    if(!token){
        return res.status(500).send({message: "Access Denied"})
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, validToken) => {
        if(error){
            return res.status(500).send({message: "Invalid Token"})
        }else{
            next()
        }
    })
}