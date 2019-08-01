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

let caloriesCalculator = (bfc, gender, weight) => {
            var bfcValueForFemale;// Lean factor multiplier
            var bfcValueForMale;// Lean factor multiplier

            if (gender === "Male") {
                //M
                if (14 >= bfc && bfc >= 10)
                    bfcValueForMale = 1.0
                else if (20 >= bfc && bfc >= 15)
                    bfcValueForMale = 0.95
                else if (28 >= bfc && bfc >= 21)
                    bfcValueForMale = 0.90
                else if (28 <= bfc && bfc)
                    bfcValueForMale = 0.85
            }
            else {
                //Female
                if (18 >= bfc && bfc >= 14)
                    bfcValueForFemale = 1.0
                else if (28 >= bfc && bfc >= 19)
                    bfcValueForFemale = 0.95
                else if (38 >= bfc && bfc >= 29)
                    bfcValueForFemale = 0.90
                else if (38 <= bfc && bfc)
                    bfcValueForFemale = 0.85
            }
            //This number is called your Basal Metabolic Rate (BMR). It’s how many calories you would burn in a day if you just lay on the couch all day and did nothing. 
            console.log(bfc)
            console.log(gender)
            console.log(bfcValueForFemale)
            console.log(bfcValueForMale)
            console.log(weight)
            let bmr = null
            if (gender === "Female")
                bmr = (weight / 2.2) * 0.9 * 24 * bfcValueForFemale
            else
                bmr = (weight / 2.2) * 24 * bfcValueForMale

            return caloriesToBeBurnned = bmr * 1.65
        }
    




module.exports.getFormatedDate = getFormatedDate
