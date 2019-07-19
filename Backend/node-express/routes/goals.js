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
router.get('/:goal_Id', (req, res) => {
    /**
     * gets all goals logged In user 
     */
    // -> Taha 
    database.get("select * from Goal where id=?",[req.params.id],(err, row)=>{
        if (err){
            console.log(err)
        }
        else if(row){
            res.send(row)
        }
    })
})

router.get('/', (req, res) => {
    /**
     * gets all goals logged In user 
     */
    // -> Taha 
    let data ={
        curentGoal:null,
        previousGoals:null
    }
    console.log(req.url)
    database.serialize(()=>{
        database.get("select * from Goal where user_id=? and isAchieved=false",[req.user.id],(err, row)=>{
            if (err){
                console.log(err)
            }
            else if(row){
                console.log(row)
                data.curentGoal = row
            }
        })

        database.all("select * from Goal where user_id=? and isAchieved=true",[req.user.id],(err, rows)=>{
            if (err){
                console.log(err)
            }
            else if(rows){
                console.log(rows)
                data.previousGoals = rows
                res.send(data)
            }
        })
    })
    
})

router.post('/', (req, res) => {
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

router.delete('/goal/:id', (req, res) => {
    /**}
     * deletes a goal based on id
     */
    // -> Atif 
})


module.exports = router