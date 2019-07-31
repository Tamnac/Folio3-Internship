const express = require('express') // imported express
const validator = require('validator')
    //copied from docs
var bodyParser = require('body-parser')
var multer = require('multer') // v1.0.5
var upload = multer() // for parsing multipart/form-data

let database = require('../database')
let authRequired = require("../middlewares/app_level").authRequired

// creating a router
let router = express.Router()
router.use(authRequired)

// Daily Summary
router.get('/:date', (req, res) => {
    /**
     * logs food of the currently logged In user 
     */
    // -> Mubashira
    let summary = {
        caloriesConsumed: 0,
        caloriesBurned: 0,
        netCalories: 0,
        over: 0,
        todayWeight:"You Haven't Logged Yet"
    }
    database.serialize(()=>{
        database.get(`select sum(calories) as caloriesConsumed from (SELECT calories * qty as calories  from FoodLog WHERE  date=${req.params.date})`, (err, row)=>{
            if (err){
                console.log(err)
            }
            else if (row){
                console.log(row.caloriesConsumed)
                summary.caloriesConsumed = row.caloriesConsumed
            }
        })
        database.get(`select * from WeightLog where user_id=${req.user.id} and date=${req.params.date}`, (err, row) => {
            if (err){
                console.log(err)
            }
            else if (row){
                console.log(row.weight)
                summary.todayWeight = row.weight
            }
        })
        database.get(`select sum(calories) as caloriesBurned from (SELECT caloriesBurned * duration as calories  from ExerciseLog WHERE  date=${req.params.date})`, (err, row)=>{
            if (err){
                console.log(err)
            }
            else if (row.caloriesBurned){
                console.log(row)
                summary.caloriesBurned = row.caloriesBurned
                
            }
            summary.netCalories = summary.caloriesConsumed - summary.caloriesBurned
            res.send(summary);
        })


    })
    

    

   
})





module.exports = router