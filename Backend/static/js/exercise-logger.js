

$(function () {

    // Exercises which will be added into exercise log
    exercisesToBeAdded = []

    // exercise Search Bar 
    var exerciseSearchBar = $("#exercisesearchBar")
    // Add exercise Btn
    var addExerciseButton = $("#add-exercise-btn")
    console.log(addExerciseButton)
    // exercise Search Table
    var exerciseSearchTable = $("#exercise-search-table")

    removeFromExerciseTobeAdded = (id) => {
        exerciseToBeAdded = exercisesToBeAdded.filter((item) => item.exercise + Id != id)
        $("#total-calories-burn").html("Total Calories: " + totalCalCounter(exercisesToBeAdded))
    }

    //!* if length is < 3 don't search
    function totalCalCounter(exerciseObj) {
        let sum = 0
        for (var i = 0; i < exerciseObj.length; i++)
            sum += exerciseObj[i].caloriesBurned
        return sum

    }

    clearDrpChildren = function (dropdownObj) {
        /*
         * Clears search hints
         */
        dropdownObj.html("")
    }

    // exercise Search Dropdown
    var searchDrpMenu = $("#exercise-search-dropdown-menu")
    console.log(searchDrpMenu)


    addExerciseDrpChildren = function (dropdownObj, table, exerciseLabel, exerciseId, exerciseCalories) {
        /**
         * Adds Search Hints to exercise Dropdown
         */

        var div = document.createElement("p")
        div.innerHTML = `<a class="text-dark p-2 "> ${exerciseCalories} Cal - ${exerciseLabel}</a>`
        div = $(div).click(function (e) {
            exercisesToBeAdded.push({
                exerciseId,
                caloriesBurned: exerciseCalories,
                exerciseName: exerciseLabel,
                qty: 1,

            })

            var tr = $(
                `<tr  id='exercise-item-to-be-added-${exerciseId.substr(5)}'> <th scope="row">${exercisesToBeAdded.length}
                </th><td>${exerciseLabel} 
                </td><td><input class="form-control" type="number" min="0" max="10" placeholder="qty" value=15 aria-label="Qunatity"></td><td>
                ${exerciseCalories} </td><td><a><i class="fas fa-times" onclick="removeSelf($('#exercise-item-to-be-added-${exerciseId.substr(5)}'),() => removeFromexerciseTobeAdded('${exerciseId}'))"></i></a></td></tr>`)
            table.append(tr)
            exerciseSearchBar.dropdown('hide')
            exerciseSearchBar.val('')

            $("#total-calories-burn").html("Total Calories: " + totalCalCounter(exercisesToBeAdded))
            clearDrpChildren(dropdownObj)
        })
        dropdownObj.append(div)
    }



    // exercise Search bar On key Up
    exerciseSearchBar.change(function (event) {
        clearDrpChildren(searchDrpMenu)
        exerciseSearchBar.dropdown('show')
        //addItemInSearchTable(exerciseSearchTable)
        var query = exerciseSearchBar.val()
        // $.get('https://api.edamam.com/api/exercise-database/parser?category=generic-exercises&ingr=' + query + '&app_id=d15954a8&app_key=853be5bff9bae2b36c49b362524e0404', function (data) {
        //     var results = []
        //     console.log(data)
        //     // results = data.hints
        //     // //console.log(results)
        //     // for (var i = 0; i < results.length; i++) {
        //     //     addExerciseDrpChildren(searchDrpMenu, exerciseSearchTable, results[i].exercise.label, results[i].exercise.exerciseId, results[i].exercise.nutrients.ENERC_KCAL)
        //     //     console.log(exercisesToBeAdded)
        //     // }
        // })

        results =[{
            label:"Exercise 1",
            id:"1",
            caloriesBurned:122
        }]
        //console.log(results)
        for (var i = 0; i < results.length; i++) {
            addExerciseDrpChildren(searchDrpMenu, exerciseSearchTable, results[i].label, results[i].id, results[i].caloriesBurned)
            console.log(exercisesToBeAdded)
        }
    })

    addExerciseButton.click(() => {
        console.log(exercisesToBeAdded)
        if (exercisesToBeAdded.length != 0) {
            //sending post request

            postExerciseLog(exercisesToBeAdded, () => {
                let today = getFormatedDate(new Date(Date.now()))
                fetchExercise(today)
                fetchSummary(today)
            })
            $('#addExerciseModal').modal('hide')
            // cleared the exercise list 
            exercisesToBeAdded = []
            // cleared dropdown
            clearDrpChildren(exerciseSearchTable)
            $("#total-calories-burn").html("Total Calories: ")


        }

    })
})