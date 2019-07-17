const database = require('../database')

exports.requestLogger = (req, res, next) => {
    /**
     * * Logges every request on console
     */
    let time = new Date(Date.now())
    console.log(`${time.toISOString()} -- ${req.method}: ${req.url}`)
    //executing next handler/middleware
    next()
}



exports.authRequired = (req, res, next) => {
    /**
     * * Gets Logged in user's instance and adds to req
     */

    database.get("select id, email from User where email='am02464@st.habib.edu.pk'", (err, row)=>{
        if (err || row==undefined){
            console.log("error in auth middleware",row)
            res.status(405).send("Error Authentication Failed")
        }else{
            req.user = row
            next()
        }
    })
    

}