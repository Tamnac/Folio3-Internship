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

// Food Log endpoints start here 
router.get('/:date', (req, res) => {
    let date = new Date(Date.parse(req.params.date))
    date = date.toISOString()
     
    database.all("select * from FoodLog where user_id=$userId and date=$date",{$date:'2019-07-17T08:22:27.944Z', $userId:req.user.id},(err, rows)=>{
        if (err){
            console.log(err)
            res.send([])
            return
        }
        // database.all("select * from Food where date=$date",{$date:date},(err, rows)=>{
        //     if (err){
        //         res.send([])
        //         return
        //     }
        //     else{
        //         res.send(rows)
        //         return
        //     }
        // })
    })
})

router.post('/', upload.array(), (req, res) => {
    /**
     * logs food of the currently logged In user 
     */
    let body = req.bod

    //TODO: validations here

    let log = {
        id: database.food_log.length,
        mealType: req.body.mealType,
        date: req.body.date,
        qty: req.body.qty,
        foodId: req.body.foodId
    }

    database.food_log.push(log)
    req.statusCode = 200
    res.send(log)
})

router.put('/food-log', upload.array(), (req, res) => {
    /**
     * logs food of the currently logged In user 
     */


    let log_index = database.food_log.findIndex((obj) => req.body.id == obj.id)

    if (log_index != -1) {
        let food_log = {...database.food_log[0], ...req.body }
        res.send(food_log)
    } else {
        res.statusCode = 404
        res.send({ error: 'Object Not Found' })
    }

})

router.delete('/food-log/:id', (req, res) => {
    /**
     * logs food of the currently logged In user 
     */
    // -> Atif 
    let body = req.body

})

// ! Food Log endpoints end here 



module.exports = router