fetchIntake= (date) =>{
    console.log("fetch intacke called")
    $.get(`http://localhost:8000/food-log/'${date}'`, (data) => {
        let bf_log = $('#breakfast-log-head')
        let lu_log = $('#lunch-log-head')
        let di_log = $('#dinner-log-head')

        //clear old data
        $(".breakfast-log-row").remove()
        $(".lunch-log-row").remove()
        $(".dinner-log-row").remove()

        
        for (log of data) {
            if (log.mealType === 'Lunch') {
                lu_log.after(`<tr id="lunch-log-${log.foodId}" class='lunch-log-row'><td>${log.foodName}</td><td>${log.qty}</td><td>${log.calories}</td><td class="text-center"><p class="fa fa-trash-o pr-2 text-center" onclick="removeSelf($('#lunch-log-${log.foodId}'), () => deleteFoodLog('${date}','${log.foodId}'))" ></p></td></tr>`)
                
            }
            else if (log.mealType === 'Breakfast') {
                bf_log.after(`<tr id='breakfast-log-${log.foodId}' class='breakfast-log-row'><td>${log.foodName}</td><td>${log.qty}</td><td>${log.calories}</td><td class="text-center"><p class="fa fa-trash-o pr-2 text-center" onclick="removeSelf($('#breakfast-log-${log.foodId}'),() => deleteFoodLog('${date}','${log.foodId}'))"></p></td></tr>`)
            }
            else if (log.mealType === 'Dinner') {
                di_log.after(`<tr id="dinner-log-${log.foodId}"  class='dinner-log-row'><td>${log.foodName}</td><td>${log.qty}</td><td>${log.calories}</td><td class="text-center"><p class="fa fa-trash-o pr-2 text-center" onclick="removeSelf($('#dinner-log-${log.foodId}'),() => deleteFoodLog('${date}','${log.foodId}'))"></p></td></tr>`)
            }
        }
    })

}

fetchSummary= (date) =>{
    $.get(`http://localhost:8000/summary/'${date}'`, (data) => {
        let cal_consumed = $('#cal-consumed')
        cal_consumed.html(data.caloriesConsumed)

        let cal_burned = $('#cal-burned')
        cal_burned.html(data.caloriesBurned)

        let net_cal = $('#net-cal')
        net_cal.html( data.caloriesConsumed - data.caloriesBurned)    
        
        let today_weight = $('#today-weight')
        today_weight.html( data.todayWeight)   
    })
}

fetchExercise= (date) =>{
    $.get(`http://localhost:8000/exercise-log/'${date}'`, (data) => {
        $(".exercise-log-row").remove()
        let excersice_log = $('#exercise-log-body')
        for (log of data) {
            excersice_log.append(`<tr id="exercise-log-${log.exerciseId}" class="exercise-log-row"><td>${log.exerciseName}</td><td>${log.time}</td><td class="text-center">${log.caloriesBurned}</td><td class="text-center"><p class="fa fa-trash-o pr-2" onclick="removeSelf($('#exercise-log-${log.exerciseId}'),() => fetchExercise('${date}'))" ></p></td>
            </tr>`)
        }
    })
}

removeSelf = (jqueryElement,callback) =>{
    jqueryElement.remove()
    callback()
} 


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




postFoodLog = (foodList,mealType, callback) => {
    console.log("Post request",foodList)
    $.post("http://localhost:8000/food-log/",{mealType,foodList:foodList}, (data) =>{
        callback()
    })
}


deleteFoodLog = (date, foodId) =>{
    $.ajax({
        url: `http://localhost:8000/food-log/${foodId}`,
        type: 'DELETE',
        success: function(result) {
            console.log(result)
            fetchIntake(date)
            fetchSummary(date)
            fetchExercise(date)
        }
    });
    
}


postWeightLog = (weight, date, callback) => {
    $.post("http://localhost:8000/weight-log",{weight}, (data) =>{
        callback()
        fetchSummary(date)
    })
}