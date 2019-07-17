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

// loading middleware
router.use(authRequired)




// * Exercise Log endpoints start here 
router.get('/:date',(req, res) => {
    /**
     * logs exercise of the currently logged In user 
     */ 
    database.all(
        "select * from ExerciseLog where user_id=$userId and date=$date",
        {$date:'12-20-2019', $userId:req.user.id},
        (err, rows)=>{
            if (err){
                console.log(err)
                res.status(400).send({error:"An Error Occoured While Fetching Exercise Loggs"})
                return
            }
            else{
                res.send(rows)
            }
        })

})

router.post('/', upload.array(), (req, res) => {
    /**
     * logs exercise of the currently logged In user 
     */ 
    let body = req.body
    console.log(req.body)

})




router.put('/exercise-log/:id', (req, res) => {
    /**
     * updates today's exercise of the currently logged In user 
     */
    let body = req.body
        // -> Atif 

})

router.delete('/exercise-log/:id', (req, res) => {
    /**
     * delete today's exercise of the currently logged In user 
     */
    // -> Atif 
    let body = req.body

})


module.exports = router
