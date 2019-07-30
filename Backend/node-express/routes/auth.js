const express = require('express') // imported express
const validator = require('validator')
//copied from docs
var bodyParser = require('body-parser')
var multer = require('multer') // v1.0.5
var upload = multer() // for parsing multipart/form-data

let database = require('../database')

// creating a router
let router = express.Router()
//Registering template engine 


router.post('/login', upload.array(), (req, res) => {
    /** 
     * * Signin's end point
     *  
    */
    let formData = {
        message: "",
        email: req.body.email ? req.body.email : "",
        password: req.body.password ? req.body.password : ""
    }
    console.log(formData)
    database.get("SELECT * FROM User where email=$email", { $email: formData.email }, (err, row) => {
        console.log(row)
        //* * got user 
        if (row) {
            if (row.password_ === formData.password) {
                res.send({ "redirectUrl": "http://localhost:8000/dashboard" })
                // todo: send cokies 
                return
            }
        }
        // ! got error
        formData.message = "Invalid Credentials"
        res.status(401).send(formData)
        return
    })
})

router.post('/signup', upload.array(), (req, res) => {
    var formData = {
        message: {
            err: ""
        },
        email: {
            value: req.body.email ? req.body.email : "",
            err: ""
        },
        password1: {
            value: req.body.password1 ? req.body.password1 : "",
            err: ""
        },
        password2: {
            value: req.body.password2 ? req.body.password2 : "",
            err: ""
        }
    }

    let isValidRequest = true

    if (!validator.isEmail(formData.email.value)) {// If the email is correct or not
        isValidRequest = false
        formData.email.err = "Invalid Email Format"
    }
    if (req.body.password1 != "" && req.body.password1.length < 8) {// if password is at least 8 chars long
        isValidRequest = false
        formData.password1.err = "Password Must Contain Min 8 Charachters"

    } else if (req.body.password2 !== req.body.password1) {// if both passwords match
        isValidRequest = false
        formData.password1.err = "Passwords Didn't Match"
    }

    if (isValidRequest) {// * request is valid
        database.run('INSERT INTO User (email, password_) VALUES (?, ?)',
            [req.body.email,
            req.body.password1]
            , (err) => {
                if (err) {
                    console.log(err)
                    if (err.errno = 19) {
                        formData.email.err = "User with this email address already exist"
                    }
                    else
                        formData.message.err = "Cannot signup at the moment"

                    res.status(400).send(formData)
                    return
                }
                else {
                    res.send({ "redirectUrl": "http://localhost:8000/profile" })
                    return
                }
            })
    }
    else {
        res.status(400).send(formData)
    }


})

module.exports = router

