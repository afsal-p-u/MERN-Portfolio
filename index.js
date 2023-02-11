const dotenv = require("dotenv")
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

// mongodb connection
mongoose.set("strictQuery", false);
const connectionParms = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
mongoose.connect(process.env.URL, connectionParms).then(() => {
    console.log("Database connected successfully")
}).catch((err) => {
    console.log(err)
})

const adminRoutes = require('./routes/admin')
const skillsRoutes = require('./routes/skills')
const projectRoutes = require('./routes/projects')
const contact = require('./routes/contact')

app.use('/api/admin', adminRoutes) 
app.use('/api/skills', skillsRoutes)  
app.use('/api/projects', projectRoutes) 
app.use('/api', contact) 

const port = process.env.PORT || 8080
app.listen(port, console.log(`Listening port ${port}...`))