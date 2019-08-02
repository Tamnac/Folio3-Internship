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

let date = new Date(Date.now())
date = utils.getFormatedDate(date)

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
                data.curentGoal = row
            }
        })

        database.all("select * from Goal where user_id=? and isAchieved=true",[req.user.id],(err, rows)=>{
            if (err){
                console.log(err)
            }
            else if(rows){
                data.previousGoals = rows
                res.send(data)
            }
        })
    })
    
})

router.post('/',upload.array(), (req, res) => {
    /**
     * create a goal of currently logged In user 
     */
    console.log(req.body)
    database.run("update Goal set isAchieved=true where isAchieved=false", (err)=>{
        if(err){
            console.log(err)
        }
        else{
            //fetch current weight
            database.run("insert into Goal (endDate, startingDate, goalWeight, isAchieved, caloriesPerDay, user_id) values (?, ?,?, ?, ?, ?)", [req.body.goalDate,date, req.body.goalWeight, false,utils.caloriesCalculator(utils.bfat("us",req.user.gender,parseFloat(req.user.heightFeet),parseFloat(req.body.neck),parseFloat(req.body.waist),parseFloat(req.body.hips)),req.user.gender,100), req.user.id], (err)=>{
                console.log(err)
                console.log(req.user.heightFeet)
                res.send("Added Sucessfully")
            })
        }
    })
})

module.exports = router