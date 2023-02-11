const router = require('express').Router()
const Projects = require('../models/projects')
const auth = require('../middleware/auth')


// posting the projects to server
router.post('/project', auth, async(req, res) => {
    try {
        let project = await new Projects({
            ...req.body
        }).save()

        return res.status(200).send({data: project, message: "new project added successfully"})
    } catch (err){
        console.log(err)
        return res.status(401).send({message: "something goes wrong", err: err})
    }
})

// change existing project
router.put('/:id', auth, async(req, res) => {
    try {
        let updataedData = {
            ...req.body
        }

        let Project = await Projects.findByIdAndUpdate(req.params.id, 
            {
                $set: updataedData
            },
            {
                new: true
            }
        )

        return res.status(200).send({data: Project, message: "Successfully updated"})
    }catch(err) {
        return res.status(401).send({err: err})
    }
})


// geting all projects from the api
router.get('/', async (req, res) => {
    try {
        const data = await Projects.find()
        return res.status(200).send({data: data});
    } catch (err){
        return res.status(400).send({message: "Something went wrong"})
    }
})

// delete projects
router.delete('/:id', auth, async(req, res) => {
    try {
        await Projects.findByIdAndDelete(req.params.id)
        return res.status(200).send({message: "successfully deleted"})
    }catch(err){
        return res.status(401).send({err: err, message: "failed"})
    }
})


module.exports = router     