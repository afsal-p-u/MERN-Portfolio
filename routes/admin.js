const router = require('express').Router()
const Admin = require('../models/admin') 
const bcrypt = require('bcrypt')

// admin register
router.post('/register', async(req, res) => {
    try {
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const encryptPassword = await bcrypt.hash(req.body.password, salt)

        let admin = await new Admin({
            ...req.body,
            password: encryptPassword
        }).save()
    
        res.status(200).send({data: admin, message: "Admin setup successfully"})
    } catch (err) {
        console.log(err)
        res.status(404).send({message: "admin register failed..."})
    }
})

// admin login 
router.post("/login", async(req, res) => {
    const admin = await Admin.findOne({email: req.body.email})
    if(!admin){
        res.status(400).send({message: "Not accessable!"})
    }
    const passwordCompare = await bcrypt.compare(req.body.password, admin.password)
    if(!passwordCompare){
        res.status(400).send({message: "Wrong password!"})
    }
    res.status(200).send({message: "admin login successfull...  "})
})

module.exports = router