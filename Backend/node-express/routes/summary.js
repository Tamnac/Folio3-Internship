const express = require('express') // imported express
const validator = require('validator')
    //copied from docs
var bodyParser = require('body-parser')
var multer = require('multer') // v1.0.5
var upload = multer() // for parsing multipart/form-data

let database = require('../database')

// creating a router
let router = express.Router()

// Daily Summary
router.get('/', (req, res) => {
    /**
     * logs food of the currently logged In user 
     */
    // -> Mubashira
    // Todo : database logic

    let summary = {
        caloriesConsumed: 215,
        caloriesBurned: 132,
        netCalories: 347,
        over: 0
    }

    res.send(summary);
})



module.exports = router