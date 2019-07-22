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
        
        if (data.length!=0){
            for (log of data) {
                console.log("erecise",log)
                excersice_log.append(`<tr id="exercise-log-${log.exerciseId}" class="exercise-log-row"><td>${log.exerciseName}</td><td>${log.time}</td><td class="text-center">${log.caloriesBurned}</td><td class="text-center"><p class="fa fa-trash-o pr-2" onclick="removeSelf($('#exercise-log-${log.exerciseId}'),() => fetchExercise('${date}'))" ></p></td>
                </tr>`)
            }
        }else{
            excersice_log.append(`<div  class=" pt-4    exercise-log-row" span="row" >You Havent Logged Exercise Yet</div>`)
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




fetchUserProfile = (callback)=>{
    $.get("http://localhost:8000/user", (data) =>{
        console.log(data)
        callback(data)
        
    })
}


fetchGoals = ()=>{
    $.get("http://localhost:8000/goals", (data) => {
    if (data.length != 0) {
        $('#all-goals-div').html()
        for (goal of data.previousGoals) {
            let singleGoalCard = `
                                    <div class="col-lg-6 pt-2">
                                        
                                            <div class="card card-body">
                                                <table class="table table-borderless">
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>Start</th>
                                                            <th>End</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th>Date</th>
                                                            <td>${goal.startingDate}</td>
                                                            <td>${goal.endDate}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Weight</th>
                                                            <td>100 lbs</td>
                                                            <td>${goal.goalWeight} lbs</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div class="progress">
                                                    <div class="progress-bar bg-primary" style="width:96% " role="progressbar" aria-valuemin="0"
                                                        aria-valuemax="100" aria-valuenow="96">96%</div>
                                                </div>
                                            </div>
                                      
                                    </div>`
            $('#all-goals-div').append(singleGoalCard)
        }
    }
    else {
        let singleGoalCard = `
        <div class="col-lg-12 text-center">
            <h4>You Don't Have Any Previous Goals</h4>
        </div>
        `
        $('#all-goals-div').append(singleGoalCard)
    }

    if (data.curentGoal) {
        let currentGoalElement = `
        <h3 class="card-title text-center">Current Goal</h3>
        <table class="table">
            <tr>
                <td>Goal weight</td>
                <td class="text-right" id='goal-wgh'>${data.curentGoal.goalWeight}</td>
            </tr>
            <tr>
                <td>Starting Weight (lbs)</td>
                <td class="text-right" id='starting-wgh'>100</td>
            </tr>
            <tr>
                <td>Goal Date</td>
                <td class="text-right" id='goal-date'>${data.curentGoal.endDate}</td>
            </tr>
            <tr>
                <td>Calories/day</td>
                <td class="text-right"id='wgh-day'>${data.curentGoal.caloriesPerDay}</td>
            </tr>
        </table>`
        $('#current-goal-div').html(currentGoalElement)
    }
    console.log(data)
})
}


