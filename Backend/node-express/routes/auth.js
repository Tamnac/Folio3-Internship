const express = require('express') // imported express
const validator = require('validator')
//copied from docs
var bodyParser = require('body-parser')
var multer = require('multer') // v1.0.5
var upload = multer() // for parsing multipart/form-data

let database = require('../database')

// creating a router
let router = express.Router()

router.post('/login', upload.array(),(req, res)=>{
    /** 
     * * Signin's end point
     *  */
    if (req.body.email && req.body.password){
        database.get("SELECT * FROM User where email=$email",{$email:req.body.email}, (err , row) =>{
            console.log(row)
            if (row){
                if (row.password_ === req.body.password)
                    res.send(row)
                    return
            }
            //! error 
            res.status(400).send({error:"Invalid Credentials"})
        })
    }
    else{
        res.status(400).send({error:"Please Provide Credentials"})
    }
})

router.post('/signup', upload.array(),(req, res) => {
    let errors = {}
    let isValidRequest = true
    if (!validator.isEmail(req.body.email)){// If the email is correct or not
        isValidRequest = false
        errors.email = "Invalid Email Format"
    }
    if (req.body.password1!=undefined && req.body.password1.length<8){// if password is at least 8 chars long
        isValidRequest = false
        errors.password = "Password Must Contain Min 8 Charachters"

    } else if (req.body.password2 !== req.body.password1){// if both passwords match
        isValidRequest = false
        errors.password = "Passwords Didn't Match"
    }

    if (isValidRequest){// * request is valid
        database.run('INSERT INTO User (email,password_) VALUES ($email,$password)',{
            $email:req.body.email,
            $password:req.body.password
        },(err)=>{
            if (err){
                console.log(err)
                errors.message = err
                res.status(400).send(errors)
                return
            }
            else{
                res.send(`user created sucessfully redirect url is ${'http://google.com'}`)
                return
            }

        })

    }
    else{// ! request is bad
        res.status(400).send(errors)
    }
})


module.exports = router

