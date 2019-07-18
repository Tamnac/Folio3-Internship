const express = require('express') // imported express
const validator = require('validator')
//copied from docs
var bodyParser = require('body-parser')
var multer = require('multer') // v1.0.5
var upload = multer() // for parsing multipart/form-data

let authRequired = require("../middlewares/app_level").authRequired
let database = require('../database')
let utils = require("../utils")

// creating a router
let router = express.Router()

// loading middleware
router.use(authRequired)

// Food Log endpoints start here 
router.get('/:date', (req, res) => {
    let date = req.params.date

    database.all(`select * from FoodLog where user_id=${req.user.id} and date=${date}`, (err, rows) => {
        if (err) {
            console.log(err)
            res.send([])
            return
        }
        else {
            res.send(rows)
            return
        }
    })
})


router.post('/', upload.array(), (req, res) => {
    /**
     * logs food of the currently logged In user 
     */
    let body = req.body
    let date = new Date(Date.now())
    date = utils.getFormatedDate(date)
    console.log(body)
    // get all list
    
    database.serialize(() => {
        for (food of req.body.foodList){
            let data = {
                $userId: req.user.id,
                $foodId: food.foodId,
                $foodName: food.foodName,
                $qty: food.qty,
                $calories:food.calories,
                $date: date,
                $mealType: req.body.mealType
            }
            console.log(data)
            database.run(`INSERT into FoodLog (user_id, foodId, foodName,qty, calories, date, mealType) VALUES ($userId,$foodId,$foodName,$qty,$calories,$date,$mealType)`,
            data,
            (err) => {
                console.log(err)
            })
        }
        
    })

    req.statusCode = 200
    res.send("On test mode")
})

router.put('/food-log', upload.array(), (req, res) => {
    /**
     * logs food of the currently logged In user 
     */


    console.log("put request")

})

router.delete('/:foodId',upload.array(), (req, res) => {
    /**
     * logs food of the currently logged In user 
     */
    // -> Atif 
    let body = req.body
    console.log("we have to deleted",req.params.foodId)
    database.run(`DELETE from FoodLog WHERE foodId='${req.params.foodId}'`,(err)=>{
        console.log(err)
    })
    res.send("deleted")

})

// ! Food Log endpoints end here 



module.exports = router