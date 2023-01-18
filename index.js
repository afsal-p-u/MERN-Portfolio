const dotenv = require("dotenv")
const express = require('express');
const mongoose = require('mongoose');

dotenv.config()
const app = express()
app.use(express.json())

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

app.use('/api/admin', adminRoutes) 

const port = process.env.PORT | 8080
app.listen(port, console.log(`Listening port ${port}...`))