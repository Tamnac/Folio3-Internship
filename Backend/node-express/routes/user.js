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

    let validateProfiledataCaller =()=>{
        console.log(formData)
        return validateProfiledata(formData)
    }

    let isValidRequest = true
    if (!validator.isEmail(formData.email.value)) {// If the email is correct 
        isValidRequest = false
        formData.email.err = "Invalid Email Format"
    
    

    } else {// else email exist  

        //for email change if this email exists return error regardless any validation
        database.get("select email from User where email=?", [formData.email.value], (err, row) => {
            if (err) {// for any error
                console.log("error occured in user profile post")
                res.status(400).send({ error: "An error occured while updating the records" })
                return
            }
            else {
                console.log(err, row)
                if (row) {//if email already exist 
                    isValidRequest = false
                    formData.email.err = "This email is already registered"
                    let validatedData = validateProfiledataCaller()
                    formData = validatedData.formData
                    isValidRequest = validatedData.isValidRequest
                    res.status(400).send(formData)
                }
                else {// email doesn't exist
                    //pass this check

                    let validatedData = validateProfiledataCaller()
                    formData = validatedData.formData
                    isValidRequest = validatedData.isValidRequest

                    if (isValidRequest){
                        let attrCount = 0
                        let qry = "update User set "
                
                        for (key in formData){
                            attrCount+=1
                            if(formData[key].value!==""){
                                qry += `${key}='${formData[key].value}',`
                              
                            }
                        }
                       
                        if (attrCount >= 1){
                            qry = qry.slice(0,-1)
                            qry += ` where id=${req.user.id}`
                            console.log(qry)
                            database.run(qry,(err)=>{
                                console.log(err)
                                res.status(200).send(formData)
                            })
                        }
                        //database.run("update User (name, email, weight, heightFeet, heightInches)")
                    } else {
                        res.status(400).send(formData)
                    }







                }

            }
        })

    }

    // if (!validator.isAlpha(formData.name.value)) {// If the email is correct or not
    //     isValidRequest = false
    //     formData.name.err = "Name Must Contain Alphabets Only"
    // }




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

let validateProfiledata = (formData) =>{
    //valdiator for height feet 
    let isValidRequest = true
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
    if (validator.isFloat(formData.weight.value, { min: 22, max: 1102 })) {
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

    return {formData, isValidRequest}
}

module.exports = router