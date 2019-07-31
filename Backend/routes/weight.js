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
router.post('/', upload.array(), (req, res) => {
    /**
     * logs wight of the currently logged In user 
     */
    // -> Atif 
    let date = getFormatedDate(new Date())
    database.get(`select id from WeightLog where user_id=? and date=?`, [req.user.id, date], (err, row) => {
        console.log(row, err)
        if (err) {
            console.log(err, row)
        }
        else if (row) {
            database.run(`Update WeightLog set date=?, weight=? where id=?`, [date, req.body.weight, row.id],
                function (err) {
                    if (err) {
                        console.log(err)
                    }
                    else{
                        res.send('done');
                    }
                    

                });
        }
        else {
            database.run('insert into WeightLog(user_id, date, weight) values(?,?,?)', [req.user.id, date, req.body.weight], () => {
                res.send('done');
            })
        }

    })
    
})

module.exports = router
