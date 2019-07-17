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




module.exports = router