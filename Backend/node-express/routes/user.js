const express = require('express') // imported express
const validator = require('validator')
//copied from docs
var bodyParser = require('body-parser')
var multer = require('multer') // v1.0.5
var upload = multer() // for parsing multipart/form-data


let authRequired = require("../middlewares/app_level").authRequired
let database = require('../database')

// creating a router
let router = express.Router()

// loading authrequired middleware
router.use(authRequired)



// * user's endpoints start here
// * user's endpoints start here
router.get('/', (req, res) => {
    /**
     * gets a user based on id 
     */

    res.send(req.user)

})

router.post('/', upload.array(), (req, res) => {
    /**
     * updates user profile
     */
    console.log(req.body)
    let formData = {
        error:{
            err:""
        },
        message: {
            value: "",
            err: ""
        },
        name: {
            value: req.body.name ? req.body.name : "",
            err: ""
        },
        email: {
            value: req.body.email ? req.body.email : "",
            err: ""
        },
        heightFeet: {
            value: req.body.heightFeet ? req.body.heightFeet : "",
            err: ""
        },
        heightInches: {
            value: req.body.heightInches ? req.body.heightInches : "",
            err: ""
        },
        dateOfBirth: {
            value: req.body.dateOfBirth ? req.body.dateOfBirth : "",
            err: ""
        },
        weight: {
            value: req.body.weight ? req.body.weight : "",
            err: ""
        },
        gender: {
            value: req.body.gender ? req.body.gender : "",
            err: ""
        },
        maritalStatus: {
            value: req.body.maritalStatus ? req.body.maritalStatus : "",
            err: ""
        }
    }
    let isValidRequest = true
    if (!validator.isEmail(formData.email.value)) {// If the email is correct 
        isValidRequest = false
        formData.email.err = "Invalid Email Format"

    } else {// else email exist  

        //for email change if this email exists return error regardless any validation
        database.get("select email from User where email='$'", (err, row) => {
            if (err) {// for any error
                console.log("error occured in user profile post")
                res.status(400).send({ error: "An error occured while updating the records" })
                return
            }
            else {

                if (row) {//if email already exist 
                    isValidRequest = false
                    formData.email.err = "This email is already registered"
                }
                else {// email doesn't exist
                    //pass this check
                }

            }
        })

    }

    // if (!validator.isAlpha(formData.name.value)) {// If the email is correct or not
    //     isValidRequest = false
    //     formData.name.err = "Name Must Contain Alphabets Only"
    // }

    //valdiator for height feet 
    if (validator.isInt(formData.heightFeet.value, { min: 2, max: 10 })) {
        formData.heightFeet.value = parseInt(formData.heightFeet.value)
    }
    else {
        isValidRequest = false
        formData.heightFeet.err = "Invalid Value For Height. Value Must Be Between 2 and 10 Feets"
    }

    //valdiator for height inches 
    if (validator.isFloat(formData.heightInches.value, { min: 0, max: 10 })) {
        formData.heightInches.value = parseFloat(formData.heightInches.value)
    }
    else {
        isValidRequest = false
        formData.heightInches.err = "Invalid Value For Height. Value Must Be Between 0 and 10 Inches"
    }
    
    
    //valdiator for weight 
    if (validator.isFloat(formData.weight.value, { min: 22, max: 1102})) {
        formData.weight.value = parseFloat(formData.heightInches.value)
    }
    else {
        isValidRequest = false
        formData.weight.err = "Invalid Value For Weight. Value Must Be Between 22 and 1202 Inches"
    }


    if (!validator.isIn(formData.gender.value, ["Male", "Female"])) {
        isValidRequest = false
        formData.gender.err = "Gender Must Be Either Male or Female"
    }

    if (!validator.isIn(formData.maritalStatus.value, ["Married", "Unmarried"])) {
        isValidRequest = false
        formData.maritalStatus.err = "Marital Status Must Be Either Married or Unmarried"
    }

    if (isValidRequest){

    }else{
        res.status(400).send(formData)
    }

    
    // else update


    // database.run("update query",(err)=>{
    //     if (err){
    //         console.log("error occured in user profile post")
    //         res.status(400).send({error:"An error occured while updating the records"})
    //         return 
    //     }
    //     else{
    //         res.send({success:"Information Updated successfully"})
    //     }
    // })


})

module.exports = router