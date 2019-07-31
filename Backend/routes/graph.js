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


router.get('', (req, res) => {
    /**
     * logs food of the currently logged In user 
     */
    // -> Mubashira
    database.all(`select * from WeightLog where date>'2019-07-1'`, (err, rows)=>{
        if (err){
            console.log(err)
        }
        else if (rows){
            console.log(rows)
            res.send(rows)
        }
    })   
  })
  


module.exports = router