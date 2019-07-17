
exports.requestLogger = (req, res, next) => {
    /**
     * * Logges every request on console
     */
    let time = new Date(Date.now())
    console.log(`${time.toISOString()} -- ${req.method}: ${req.url}`)
    //executing next handler/middleware
    next()
}



