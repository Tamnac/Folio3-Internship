

$(function () {

    // Foods which will be added into Food log
    foodsToBeAdded = []

    // Food Search Bar 
    var foodSearchBar = $("#foodsearchBar")
    // Add Food Btn
    var addFoodButton = $("#add-food-btn")
    console.log(addFoodButton)
    // Food Search Table
    var foodSearchTable = $("#food-search-table")

    removeFromFoodTobeAdded = (id) => {
        foodsToBeAdded = foodsToBeAdded.filter((item) => item.foodId != id)
        $("#total-calories").html("Total Calories: " + totalCalCounter(foodsToBeAdded))
    }

    //!* if length is < 3 don't search
    function totalCalCounter(foodObj) {
        sum = 0
        for (var i = 0; i < foodObj.length; i++)
            sum += foodObj[i].calories
        return sum

    }

    clearDrpChildren = function (dropdownObj) {
        /*
         * Clears search hints
         */
        dropdownObj.html("")
    }

    // food Search Dropdown
    var searchDrpMenu = $("#food-search-dropdown-menu")
    console.log(searchDrpMenu)


    addFoodDrpChildren = function (dropdownObj, table, foodLabel, foodId, foodCalories) {
        /**
         * Adds Search Hints to Food Dropdown
         */

        var div = document.createElement("p")
        div.innerHTML = `<a class="text-dark p-2 "> ${foodCalories} Cal - ${foodLabel}</a>`
        div = $(div).click(function (e) {
            foodsToBeAdded.push({
                foodId,
                calories: foodCalories,
                foodName: foodLabel,
                qty: 1,

            })

            var tr = $(
                `<tr  id='food-item-to-be-added-${foodId.substr(5)}'> <th scope="row">${foodsToBeAdded.length}
                </th><td>${foodLabel} 
                </td><td><input class="form-control" type="number" min="0" max="10" placeholder="qty" value=1 aria-label="Qunatity"></td><td>
                ${foodCalories} </td><td><a><i class="fas fa-times" onclick="removeSelf($('#food-item-to-be-added-${foodId.substr(5)}'),() => removeFromFoodTobeAdded('${foodId}'))"></i></a></td></tr>`)
            table.append(tr)
            foodSearchBar.dropdown('hide')
            foodSearchBar.val('')

            $("#total-calories").html("Total Calories: " + totalCalCounter(foodsToBeAdded))
            clearDrpChildren(dropdownObj)
        })
        dropdownObj.append(div)
    }



    // Food Search bar On key Up
    foodSearchBar.change(function (event) {
        clearDrpChildren(searchDrpMenu)
        foodSearchBar.dropdown('show')
        //addItemInSearchTable(foodSearchTable)
        var query = foodSearchBar.val()
        $.get('https://api.edamam.com/api/food-database/parser?category=generic-foods&ingr=' + query + '&app_id=d15954a8&app_key=853be5bff9bae2b36c49b362524e0404', function (data) {
            var results = []
            console.log(data)
            results = data.hints
            //console.log(results)
            for (var i = 0; i < results.length; i++) {
                addFoodDrpChildren(searchDrpMenu, foodSearchTable, results[i].food.label, results[i].food.foodId, results[i].food.nutrients.ENERC_KCAL)
                console.log(foodsToBeAdded)
            }
        })
    })

    addFoodButton.click(() => {
        console.log(foodsToBeAdded)
        if (foodsToBeAdded.length != 0) {
            //sending post request

            postFoodLog(foodsToBeAdded, $("input[name='mealType']:checked").val(), () => {
                let today = getFormatedDate(new Date(Date.now()))
                fetchIntake(today)
                fetchSummary(today)
            })
            $('#addFoodModal').modal('hide')
            // cleared the food list 
            foodsToBeAdded = []
            // cleared dropdown
            clearDrpChildren(foodSearchTable)
            $("#total-calories").html("Total Calories: ")


        }

    })
})