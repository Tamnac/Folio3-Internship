$(()=>{
    //weight loggers 
    weightLoggerInput = $("#weight-logger-input")
    weightLoggerBtn = $("#weight-logger-btn")
    weightLoggerError = $("#weight-logger-err")
    
    weightLoggerInput.keydown(()=>{
        weightLoggerError.html("")
    })
    
    weightLoggerBtn.click(()=>{
        console.log(weightLoggerInput.val())
        let weight = parseFloat(weightLoggerInput.val())
        if (weight>45){
            weightLoggerError.html("")
            postWeightLog(weight,getFormatedDate(new Date(Date.now())),()=>{})
            weightLoggerInput.val(0)
        }else{
            weightLoggerError.html("Please enter valid value.")
        }
    })
})