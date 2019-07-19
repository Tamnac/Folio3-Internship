const express = require('express') // imported express 
//copied from docs
var bodyParser = require('body-parser')
var multer = require('multer') // v1.0.5
var upload = multer() // for parsing multipart/form-data
// custom modules imports
const appLevelMiddelware = require("./middlewares/app_level")
const authRouter = require('./routes/auth')
const userRouter = require("./routes/user")
const summaryRouter = require("./routes/summary")
const foodRouter = require("./routes/food")
const exerciseRouter = require("./routes/exercise")
const weightRouter = require("./routes/weight")

// the default port 
const port = 8000

const app = express()

// * loading middleware 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.use(appLevelMiddelware.requestLogger)
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// * Auth Routes 
app.use('/auth', authRouter)

// * User Routes
app.use('/user', userRouter)

// * Summary Routes
app.use('/summary', summaryRouter)

// * Food Routes
app.use('/food-log', foodRouter)

// * Exercise Routes
app.use('/exercise-log', exerciseRouter)

// * weight Routes
app.use('/weight-log', weightRouter)


//Listen Port
app.listen(port, () => {
    console.log(`Server is listening at port ${port}`)
})





