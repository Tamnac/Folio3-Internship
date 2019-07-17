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

// the default port 
const port = 8000

const app = express()

// * loading middleware 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
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



// default route
app.get('/', (req, res) => { //handels the request
    res.send({
        name: 'Atif Mehmood',
        email: 'am02464@st.habib.edu.pk'
    })
})




// * Weight Log endpoints start here
app.post('/weight-log', (req, res) => {
    /**
     * logs wight of the currently logged In user 
     */
    // -> Atif 
    let body = req.body
    let date = Date().now()



})

app.put('/wight-log/:id', (req, res) => {
    /**
     * updates wight of the currently logged In user 
     */
    // -> Atif 
    let body = req.body

})






// TODO: 

//Listen Port
app.listen(port, () => {
    console.log(`Server is listening at port ${port}`)
})



var database = {
    users: [{
            id: 1,
            name: "shahira ",
            emailadd: "mubashramajid123@gmail.com",
            height: "5",
            weight: "52",
            gender: "female",
            dateofbirth: " 5/9/1958"

        }, {
            id: "2",
            name: "Atif",
            emailadd: "atif123@gmail.com",
            height: "5",
            weight: "52",
            gender: "female",
            dateofbirth: " 5/9/1958"
        }, {
            id: "3",
            name: "hunain",
            emailadd: "hunain123@gmail.com",
            height: "5",
            weight: "52",
            gender: "female",
            dateofbirth: " 5/9/1958"
        } 
        , {
            id: "4",
            name: "taha",
            emailadd: "taha123@gmail.com",
            height: "5",
            weight: "54",
            gender: "female",
            dateofbirth: " 5/9/1958"
        }


        , {
            id: "5",
            name: "ibrahim",
            emailadd: "ibhahim123@gmail.com",
            height: "5",
            weight: "42",
            gender: "female",
            dateofbirth: " 5/9/1958"
        }

        , {
            id: "6",
            name: "arbab",
            emailadd: "std_20696@iobm.edu.pk",
            height: "5",
            weight: "62",
            gender: "female",
            dateofbirth: " 5/9/1958"
        }

        , {
            id: "7",
            name: "hina",
            emailadd: "hina123@gmail.com",
            height: "5",
            weight: "52",
            gender: "female",
            dateofbirth: " 5/9/1958"
        },
        {
            id: "8",
            name: "hira",
            emailadd: "hira123@gmail.com",
            height: "5",
            weight: "52",
            gender: "female",
            dateofbirth: " 5/9/1958"
        },

        {
            id: "9",
            name: "sidhra",
            emailadd: "sidhra123@gmail.com",
            height: "5",
            weight: "52",
            gender: "female",
            dateofbirth: " 5/9/1958"
        },
        {
            id: "10",
            name: "jawairia",
            emailadd: "jawairia123@gmail.com",
            height: "6",
            weight: "62",
            gender: "female",
            dateofbirth: " 5/9/1958"
        }
    ],
    food_log: [{
        id: 2,
        mealType: 'Dinner',
        foodId: 123,
        date: new Date(Date.now()),
        qty: 3
    }],
    weight_log: [

    ],
    exercise_log: [

    ],
    goals: [{
            goalId: "1",
            starting_weight: "119lbs",
            goal_weight: "96lbs",
            goal_date: "Dec 13,2019",
            colaries_per_day: "1100"
        },
        {
            goalId: "2",
            starting_weight: "67lbs",
            goal_weight: "94lbs",
            goal_date: "jan 17,2019",
            colaries_per_day: "1700"

        }
    ],
}








const authenticateUser =  (email, password) =>{
    let user = null
    db.serialize(()=>{
        db.get("SELECT * FROM User where email=$email",{$email:email}, (err , row) =>{
            if (row){
                
                user = row
              
            }
            
            
            
        })
    })
    
    return user
}

//console.log(authenticateUser('am02464@st.habib.edu.pk'))



