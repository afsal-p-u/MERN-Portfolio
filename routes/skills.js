const router = require('express').Router()
const auth = require('../middleware/auth')
const Skills = require('../models/skills')

// create skills
router.post("/newskills", auth, async(req, res) => {
    try {
        let skills = await new Skills({
            ...req.body
        }).save()

        res.status(200).send({data: skills, message: 'Skill added successfully...'})
    } catch(err) {
        console.log(err)
        res.status(400).send({message: "Failed to add skills!"})
    }
})

// get skills
router.get('/', async(req, res) => {
    try {
        let skills = await Skills.find().sort({ _id: -1 })
        res.status(200).send({data: skills})
    } catch (err) {
        console.log(err)
        res.status(400).send({message: "Something went wrong!"})
    }
})


// delete skills 
router.delete('/:id', auth, async(req, res) => {
    try {
        await Skills.findByIdAndDelete(req.params.id) // for removing all skills    
        return res.status(200).send({message: "Deleted successfully"})
    } catch (err){
        console.log(err)
        return res.json(500).send({message: "Something went wrong"})
    }
})


// update skills
router.put('/:id', auth, async(req, res) => {
    try {
        let newData = ({
            ...req.body,
        })

        const data = await Skills.findByIdAndUpdate(req.params.id, 
            {
                $set: newData
            }, 
            {
                new: true
            }
        )
        return res.status(200).send({data: data})
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: "Something went wrong"})
    }
})

module.exports = router