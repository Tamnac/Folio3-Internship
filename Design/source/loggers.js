$(function() {
    // Added Foods
    var addedFoods

    // Foods which will be added into Food log
    var foodsToBeAdded = []

    // Food Search Bar 
    var foodSearchBar = $("#searchBar")

    // Food Search Table
    var foodSearchTable = $("#food-search-table")

    //!* if length is < 3 don't search
    function totalCalCounter(foodObj) {
        sum = 0
        for (var i = 0; i < foodObj.length; i++)
            sum += foodObj[i].itemCalories
        return sum

    }

    clearDrpChildren = function(dropdownObj) {
        /*
         * Clears search hints
         */
        dropdownObj.html("")
    }




    // food Search Dropdown
    var searchDrpMenu = $("#search-dropdown-menu")
    console.log(searchDrpMenu)


    addFoodDrpChildren = function(dropdownObj, table, itemLabel, itemId, itemCalories) {
        /**
         * Adds Search Hints to Food Dropdown
         */

        var div = document.createElement("p")
        div.innerHTML = '<a class="text-dark p-2">' + itemCalories + ' Cal - ' + itemLabel + '</a>'
        div = $(div).click(function(e) {
            foodsToBeAdded.push({
                itemId,
                itemCalories,
                itemLabel,
                qty: 1,
                mealType: $("input[name='mealType']:checked").val() //Has to be removed 
            })

            var tr = document.createElement("tr")
            tr.innerHTML =
                '<tr><th scope="row">' +
                foodsToBeAdded.length +
                '</th><td>' + itemLabel +
                '</td><td><input class="form-control" type="number" placeholder="qty" value=1 aria-label="Qunatity"></td><td>' +
                itemCalories + '</td><td><a><i class="fas fa-times"></i></a></td></tr>'

            table.append(tr)
            foodSearchBar.dropdown('hide')
            foodSearchBar.val('')

            $("#total-calories").html("Total Calories: " + totalCalCounter(foodsToBeAdded))
            clearDrpChildren(dropdownObj)
        })
        dropdownObj.append(div)
    }



    // Food Search bar On key Up
    foodSearchBar.keyup(function(event) {
        clearDrpChildren(searchDrpMenu)
        foodSearchBar.dropdown('show')
            //addItemInSearchTable(foodSearchTable)
        var query = foodSearchBar.val()
        $.get('https://api.edamam.com/api/food-database/parser?category=generic-foods&ingr=' + query + '&app_id=d15954a8&app_key=853be5bff9bae2b36c49b362524e0404', function(data) {
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
})