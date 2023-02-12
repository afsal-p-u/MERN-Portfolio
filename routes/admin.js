const router = require('express').Router()
const Admin = require('../models/admin') 
const bcrypt = require('bcrypt')
const CryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

// admin register
router.post('/register', async(req, res) => {
    try {
        if(req.body.email !== process.env.TO){
            return res.status(404).send({message: "your not real"}) 
        }
        // const salt = await bcrypt.genSalt(Number(process.env.SALT))
        // const encryptPassword = await bcrypt.hash(req.body.password, salt)
        const encryptPassword = CryptoJs.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()

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
        return res.status(400).send({message: "Not accessable!"})
    }
    try {
        // const passwordCompare = await bcrypt.compare(req.body.password, admin.password)
        const bytes = CryptoJs.AES.decrypt(admin.password, process.env.SECRET_KEY)
        const originalPassword = bytes.toString(CryptoJs.enc.Utf8)

        if(originalPassword !== req.body.password){
            return res.status(400).send({message: "Wrong password!"}) 
        }
        let data = {
            time: Date(),
            email: admin.email 
        }
        const token = jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '10h' }) 
        let updatedData = {
            email: admin.email,
            token: token
        }  
        res.status(200).send({data: updatedData, message: "admin login successfull..."})
    }catch (err){
        console.log(err) 
    }
})

// get admins 
router.get('/', auth, async(req, res) => {
    const admins = await Admin.find()
    res.status(200).send({data: admins})
})

// delete admin
router.delete('/:id', auth, async(req, res) => {
    try {
        const data = await Admin.find()
        if(data.length == 1){
            return res.status(401).send({message: "Can't Delete, Only one admin left"})
        } 

        await Admin.findByIdAndDelete(req.params.id)
        res.status(200).send({message: 'Deleted successfully...'})
    } catch (err) {
        res.status(400).send({message: "Failed!"})
    }
})

// update data
router.put('/:id', auth, async(req, res) => {
    try {
        // const salt = await bcrypt.genSalt(Number(process.env.SALT))
        // const encryptPassword = await bcrypt.hash(req.body.password, salt)
        const encryptPassword = CryptoJs.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()

        let updatedData = ({
            ...req.body,
            password: encryptPassword
        })

        const admin = await Admin.findByIdAndUpdate(req.params.id, 
            { 
                $set: updatedData
            },
            {
                new: true
            }
        )
        res.status(200).send({data: admin, message: "Updated Successfully"})  
    } catch (err) {
        res.status(500).send({message: "Failed"})
    }
})

module.exports = router 