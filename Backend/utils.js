getFormatedDate = (date) => {
    day = date.getUTCDate()
    if (day < 10) {
        day = '0' + day
    }
    month = date.getUTCMonth() + 1
    if (month < 10) {
        month = '0' + month
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
    let bmr = null
    if (gender === "Female")
        bmr = (weight / 2.2) * 0.9 * 24 * bfcValueForFemale
    else
        bmr = (weight / 2.2) * 24 * bfcValueForMale

    return caloriesToBeBurnned = bmr * 1.65
}


function bfat(ms, sex, height, neck, waist, hips) {
    console.log(sex, height, neck, waist, hips)
    var ibf;
    var bfc;
    height =5 

    if (ms == 'metric' && sex == 'm' && height > 0 && waist > 0 && neck > 0) {
        ibf = Math.round((86.010 * (Math.log(waist * 1 - neck * 1) / Math.log(10)) - 70.041 * (Math.log(height) / Math.log(10)) + 30.30 * 1) * 100) / 100;
        if (ibf <= 5) {
            bfc = 'Essential';
        } else if (ibf > 5 && ibf <= 17) {
            bfc = 'Fit';
        } else if (ibf > 17 && ibf <= 25) {
            bfc = 'Acceptable';
        } else if (ibf > 25) {
            bfc = 'Obese';
        }

    }
    else if (ms == 'us' && sex == 'Male' && height > 0 && waist > 0 && neck > 0) {
        ibf = Math.round((86.010 * (Math.log(waist * 1 - neck * 1) / Math.log(10)) - 70.041 * (Math.log(height) / Math.log(10)) + 36.76 * 1) * 100) / 100;
        if (ibf <= 5) {
            bfc = 'Essential';
        } else if (ibf > 5 && ibf <= 17) {
            bfc = 'Fit';
        } else if (ibf > 17 && ibf <= 25) {
            bfc = 'Acceptable';
        } else if (ibf > 25) {
            bfc = 'Obese';
        }


    }
    else if (ms == 'metric' && sex == 'f' && height > 0 && waist > 0 && neck > 0) {
        ibf = Math.round((163.205 * (Math.log(waist * 1 + hips * 1 - neck * 1) / Math.log(10)) - 97.684 * (Math.log(height) / Math.log(10)) - 104.912 * 1) * 100) / 100;
        if (ibf <= 15) {
            bfc = 'Essential';
        } else if (ibf > 15 && ibf <= 24) {
            bfc = 'Fit';
        } else if (ibf > 24 && ibf <= 31) {
            bfc = 'Acceptable';
        } else if (ibf > 31) {
            bfc = 'Obese';
        }

    } else if (ms == 'us' && sex == 'Female' && height > 0 && waist > 0 && neck > 0) {
        ibf = Math.round((163.205 * (Math.log(waist * 1 + hips * 1 - neck * 1) / Math.log(10)) - 97.684 * (Math.log(height) / Math.log(10)) - 78.387 * 1) * 100) / 100;
        if (ibf <= 15) {
            bfc = 'Essential';
        } else if (ibf > 15 && ibf <= 24) {
            bfc = 'Fit';
        } else if (ibf > 24 && ibf <= 31) {
            bfc = 'Acceptable';
        } else if (ibf > 31) { bfc = 'Obese'; }


    }
    console.log(ibf, bfc)
    return ibf, bfc

}



module.exports.getFormatedDate = getFormatedDate
module.exports.bfat = bfat
module.exports.caloriesCalculator = caloriesCalculator
