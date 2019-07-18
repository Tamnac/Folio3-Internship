getFormatedDate = (date)=>{
    day = date.getUTCDate()
    if (day<10){
        day = '0'+day
    }
    month =  date.getUTCMonth()+1
    if (month<10){
        month = '0'+month
    }
    year = date.getUTCFullYear()

    formatedDate = `${year}-${month}-${day}`
    return formatedDate
}





module.exports.getFormatedDate = getFormatedDate