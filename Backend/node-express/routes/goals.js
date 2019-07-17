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



// * Goals endpoints start here 
router.get('/goals/:goal_Id', (req, res) => {
    /**
     * gets all goals logged In user 
     */
    // -> Taha 
    const goal_id = req.params.goal_Id
    var goal = database.goals.find((obj) => obj.goalId == goal_id)
    res.send(goal)
})

router.post('/goal', (req, res) => {
    /**
     * create a goal of currently logged In user 
     */
    // -> Atif 
    let body = req.body

})

router.put('/goal/:id', (req, res) => {
    /**
     * Updates a goal based on id
     */
    // -> Atif 
})

app.delete('/goal/:id', (req, res) => {
    /**
     * deletes a goal based on id
     */
    // -> Atif 
})


module.exports = router