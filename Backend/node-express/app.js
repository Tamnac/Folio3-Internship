const express = require('express') // imported express 
//copied from docs
var bodyParser = require('body-parser')
var multer = require('multer') // v1.0.5
var upload = multer() // for parsing multipart/form-data
var nunjucks = require('nunjucks')
// custom modules imports
const appLevelMiddelware = require("./middlewares/app_level")
const authRouter = require('./routes/auth')
const userRouter = require("./routes/user")
const summaryRouter = require("./routes/summary")
const foodRouter = require("./routes/food")
const exerciseRouter = require("./routes/exercise")
const weightRouter = require("./routes/weight")
const goalsRouter = require("./routes/goals")
// the default port 
const port = 8000

const app = express()



// * loading middleware 
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use( express.static('static'))
app.use(appLevelMiddelware.requestLogger)
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


//Registering template engine 
nunjucks.configure('./views', {
  autoescape: true,
  express: app
});

app.set('view engine', 'html');
//root app
app.get('/', function(req, res) {
  res.render('landing.html',{req:req});
});

app.get('/dashboard',appLevelMiddelware.authRequired, function(req, res) {
  res.render('dashboard.html',{req:req, isAuthenticated:true});
});

app.get('/profile',appLevelMiddelware.authRequired, function(req, res) {
  res.render('profile.html',{req:req, isAuthenticated:true});
});

app.get('/food',appLevelMiddelware.authRequired, function(req, res) {
  res.render('food.html',{req:req, isAuthenticated:true});
});

app.get('/exercise',appLevelMiddelware.authRequired, function(req, res) {
  res.render('exercise.html',{req:req, isAuthenticated:true});
});

app.get('/my-goals',appLevelMiddelware.authRequired, function(req, res) {
  res.render('goals.html',{req:req, isAuthenticated:true});
});

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

// * goals Routes
app.use('/goals', goalsRouter)

//contact us
app.post('/contact',(req, res)=>{
  console.log(req.body)
  //will send email here
  res.send("form Submitted successfully")
})

//Listen Port
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`)
})





