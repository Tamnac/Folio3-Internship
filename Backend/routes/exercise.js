const express = require('express') // imported express
const validator = require('validator')
const utils = require('../utils')
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
    let date = req.params.date
    database.all(
        `select * from ExerciseLog where user_id=${req.user.id} and date=${date}`,
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
    let date = new Date(Date.now())
    date = utils.getFormatedDate(date)
    console.log(body)
    // get all list
    
    database.serialize(() => {
        for (exercise of req.body.exerciseList){
            let data = {
                $userId: req.user.id,
                $exerciseId: exercise.exerciseId,
                $exerciseName: exercise.exerciseName,
                $duration: exercise.qty,
                $caloriesBurned:exercise.caloriesBurned,
                $date: date,
                $mealType: req.body.mealType
            }

            console.log(data)
            database.run(`INSERT into ExerciseLog (user_id, exerciseId, exerciseName, duration, caloriesBurned, date) VALUES ($userId,$exerciseId,$exerciseName,$duration,$caloriesBurned,$date)`,
            data,
            (err) => {
                console.log(err)
            })

            req.statusCode = 200
            res.send("On test mode")
        }
        
    })

})





router.delete('/exercise-log/:id', (req, res) => {
    /**
     * delete today's exercise of the currently logged In user 
     */
    // -> Atif 
    let body = req.body

})


module.exports = router
