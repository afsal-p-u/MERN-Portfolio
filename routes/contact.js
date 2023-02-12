const router = require('express').Router()
const nodemailer = require('nodemailer')

// post method
router.post('/contact', async(req, res) => {
    try {
        
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false
            },
        }) 
        
        let info = await transporter.sendMail({
            from:`${req.body.email} <${process.env.USER}>`,
            to: process.env.TO, 
            subject: req.body.subject, 
            text: `${req.body.name}:
             
${req.body.message}`,
            // html: "<b>html?</b>",
          });

        return res.status(200).send({message: "done"})
    }catch(err) {
        return res.status(401).send({err: err})
    }
})

module.exports = router