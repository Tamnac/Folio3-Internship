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
router.get('/', (req, res) => {
    /**
     * gets a user based on id 
     */
    res.send(req.user)

})

router.post('/', (req, res) => {
    /**
     * updates user profile
     */
    //Todo: validations 
    database.run("update query",(err)=>{
        if (err){
            console.log("error occured in user profile post")
            res.status(400).send({error:"An error occured while updating the records"})
            return 
        }
        else{
            res.send({success:"Information Updated successfully"})
        }
    })


})

module.exports = router