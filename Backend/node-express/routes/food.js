const express = require('express') // imported express
const validator = require('validator')
//copied from docs
var bodyParser = require('body-parser')
var multer = require('multer') // v1.0.5
var upload = multer() // for parsing multipart/form-data

let database = require('../database')

// creating a router
let router = express.Router()

// Food Log endpoints start here 
router.get('/:date', (req, res) => {
    let date = new Date(Date.parse(req.params.date))
    //TODO database logic 
    // filter logs based on date 
    //let food_loggs = database.food_log.filter((obj) => obj.date == date)
    res.send([
        {
            id: 2,
            mealType: 'Dinner',
            foodId: 123,
            date: new Date(Date.now()),
            qty: 3
        },
        {
            id: 1,
            mealType: 'Lunch',
            foodId: 123,
            date: new Date(Date.now()),
            qty: 3
        },
        {
            id: 3,
            mealType: 'Breakfast',
            foodId: 123,
            date: new Date(Date.now()),
            qty: 3
        }
    ])
})


router.post('/food-log', upload.array(), (req, res) => {
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
