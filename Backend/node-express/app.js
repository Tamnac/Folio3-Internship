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
app.get('/user/:id',(req, res) =>{
    /**
     * gets a user based on id 
    */
    const id = req.params.id
    var user = users.find((obj) => obj.id == id  )
    res.send(user)

})

app.post('/user',(req, res) =>{
    /**
     * registers a new user
    */
   // -> Taha 
    
})

app.put('/user',(req, res) =>{
    /**
     * updates a user
    */
   // -> Taha 
    console.log("put method for user")
    console.log(req.body)
})

// ! User's endpoints end here 


// * Weight Log endpoints start here
app.post('/weight-log',(req, res) =>{
    /**
     * logs wight of the currently logged In user 
    */
   // -> Atif 
    let body = req.body

})

app.put('/wight-log/:id', (req, res) =>{
    /**
     * updates wight of the currently logged In user 
    */
   // -> Atif 
    let body = req.body

})

// ! Weight's endpoints end here 

// * Exercise Log endpoints start here 
app.post('/exercise-log',(req, res) =>{
    /**
     * logs exercise of the currently logged In user 
    */
   // -> Atif 
    let body = req.body
     
})

app.put('/exercise-log/:id',(req, res) =>{
    /**
     * updates today's exercise of the currently logged In user 
    */
    let body = req.body
    // -> Atif 
     
})

app.delete('/exercise-log/:id',(req, res) =>{
    /**
     * delete today's exercise of the currently logged In user 
    */
   // -> Atif 
    let body = req.body
     
})

// ! Exercise Log endpoints end here 

// Food Log endpoints start here 
app.post('/food-log',(req, res) =>{
    /**
     * logs food of the currently logged In user 
    */
   // -> Atif 
    let body = req.body
     
})

app.put('/food-log/:id',(req, res) =>{
    /**
     * logs food of the currently logged In user 
    */
   // -> Atif 
    let body = req.body
     
})

app.delete('/food-log/:id',(req, res) =>{
    /**
     * logs food of the currently logged In user 
    */
   // -> Atif 
    let body = req.body
     
})

// ! Food Log endpoints end here 

// * Goals endpoints start here 
app.get('/goals', (req, res) => {
    /**
     * gets all goals logged In user 
    */
   // -> Taha 
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
app.get('daily-summary',(req, res) =>{
    /**
     * logs food of the currently logged In user 
    */
   // -> Mubashira
    let body = req.body
     
})


// TODO: 

//Listen Port
app.listen(8000 , ()=>{
    console.log(`Server is listening at port ${port}`)
})


// Defining Static info
var projects = [//All Projects objects

    {
        id:1,
        name:'Project 1',
    },
    {
        id:2,
        name:'Project 2',
    },
    {
        id:3,
        name:'Project 3',
    },
    {
        id:4,
        name:'Project 4',
    },
    {
        id:5,
        name:'Project 5',
    },
    {
        id:6,
        name:'Project 6',
    },
    {
        id:7,
        name:'Project 7',
    }
]


database = {
    users = [
        {id:1, 'name':'Atif','age':20},
        {id:2, 'name':'Taha','age':21}
    ],
    food_log = [
        
    ],
    weight_log = [

    ],
    exercise_log =[

    ],
    goals = [

    ],
}




