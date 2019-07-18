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


// * Weight Log endpoints start here
router.post('/weight-log', upload.array(), (req, res) => {
    /**
     * logs wight of the currently logged In user 
     */
    // -> Atif 

    //  let body = req.body
    // let date = Date().now()
    console.log(req.body)
    db.run('insert into WeightLog(user_id, date, weight) values(?,?,?)', [req.user.id, '2019-07-08', req.body.weight],
        function(err) {
            res.send('done');

        });
})



module.exports = router
