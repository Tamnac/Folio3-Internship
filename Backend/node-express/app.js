const express = require('express') // imported express 

//copied from docs
var bodyParser = require('body-parser')
var multer = require('multer') // v1.0.5
var upload = multer() // for parsing multipart/form-data


// port
const port = 8000

//creating an express app 
const app = express()

//applying middleware
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded



// default route
app.get('/', (req, res) => { //handels the request

    res.send({
        name: 'Atif Mehmood',
        email: 'am02464@st.habib.edu.pk'
    })
})

// * user's endpoints start here
app.get('/user/:id', (req, res) => {
    /**
     * gets a user based on id 
     */
    const id = req.params.id
    var user = users.find((obj) => obj.id == id)
    res.send(user)

})

app.post('/user', (req, res) => {
    /**
     * registers a new user
     */
    // -> Taha 

})

app.put('/user', (req, res) => {
    /**
     * updates a user
     */
    // -> Taha 
    console.log("put method for user")
    console.log(req.body)
})

// ! User's endpoints end here 


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

// ! Weight's endpoints end here 

// * Exercise Log endpoints start here 
app.post('/exercise-log', (req, res) => {
    /**
     * logs exercise of the currently logged In user 
     */
    // -> Atif 
    let body = req.body

})

app.put('/exercise-log/:id', (req, res) => {
    /**
     * updates today's exercise of the currently logged In user 
     */
    let body = req.body
    // -> Atif 

})

app.delete('/exercise-log/:id', (req, res) => {
    /**
     * delete today's exercise of the currently logged In user 
     */
    // -> Atif 
    let body = req.body

})

// ! Exercise Log endpoints end here 

// Food Log endpoints start here 
app.get('/food-log/:date', (req, res) =>{
    let date = new Date(Date.parse(req.params.date))
    console.log(date)
    console.log(database.food_log)
    // filter logs based on date 
    let food_loggs = database.food_log.filter((obj)=> obj.date == date)
    res.send(food_loggs)
})


app.post('/food-log', upload.array(), (req, res) => {
    /**
     * logs food of the currently logged In user 
     */
    let body = req.bod

    //TODO: validations here

    let log = {
        id: database.food_log.length,
        mealType: req.body.mealType,
        date: req.body.date,
        qty: req.body.qty,
        foodId: req.body.foodId
    }

    database.food_log.push(log)
    req.statusCode = 200
    res.send(log)
})

app.put('/food-log', upload.array() , (req, res) => {
    /**
     * logs food of the currently logged In user 
     */

    
    let log_index = database.food_log.findIndex((obj) => req.body.id == obj.id)

    if (log_index != -1){
        let food_log = {...database.food_log[0], ...req.body}
        res.send(food_log)
    }
    else{
        res.statusCode = 404
        res.send({error:'Object Not Found'})
    }
    
})

app.delete('/food-log/:id', (req, res) => {
    /**
     * logs food of the currently logged In user 
     */
    // -> Atif 
    let body = req.body

})

// ! Food Log endpoints end here 

// * Goals endpoints start here 
app.get('/goals/:goal_Id', (req, res) => {
    /**
     * gets all goals logged In user 
     */
    // -> Taha 
    const goal_id = req.params.goal_Id
    var goal = database.goals.find((obj) => obj.goalId == goal_id)
    res.send(goal)
})

app.post('/goal', (req, res) => {
    /**
     * create a goal of currently logged In user 
     */
    // -> Atif 
    let body = req.body

})

app.put('/goal/:id', (req, res) => {
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

// Daily Summary
app.get('daily-summary', (req, res) => {
    /**
     * logs food of the currently logged In user 
     */
    // -> Mubashira
    let body = req.body

})


// TODO: 

//Listen Port
app.listen(8000, () => {
    console.log(`Server is listening at port ${port}`)
})



database = {
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
    food_log: [
        {
            id: 2,
            mealType: 'Dinner',
            foodId: 123,
            date: new Date(Date.now()),
            qty: 3
        }
    ],
    weight_log: [

    ],
    exercise_log: [

    ],
    goals: [{
        goalId: "1", starting_weight: "119lbs", goal_weight: "96lbs", goal_date: "Dec 13,2019", colaries_per_day: "1100"
    },
    {
        goalId: "2", starting_weight: "67lbs", goal_weight: "94lbs", goal_date: "jan 17,2019", colaries_per_day: "1700"

    }],
}