// Event Listeners
document.getElementById('formFood').addEventListener('submit', saveFoods);

// Funcionts
// Save meals
function saveFoods(e) {

    // Variables
    const date = document.getElementById('date').value;
    const breakfast = document.getElementById('breakfast').value;
    const lunch = document.getElementById('lunch').value;
    const snack = document.getElementById('snack').value;
    const dinner = document.getElementById('dinner').value;
    const question = document.getElementById('question').value;

    const food = {
        date,
        breakfast,
        lunch,
        snack,
        dinner,
        question
    };

    // Validate form fields
    function validateField() {

        // Verify that all the fields in the form are complete, in case an error alert does not appear
        if (date === '' || breakfast === '' || lunch === '' || snack === '' || dinner === '' || question === '') {

            alert('Please complete all the fields on the form and send it again.');

        } else {
            // If it is empty we create the food
            if (localStorage.getItem('foods') === null) {
                // If it is empty we create it and it will be an arrangement
                let foods = [];
                // We complete the arrangement with the new food with the "push" method
                foods.push(food);
                // Convert to string format
                localStorage.setItem('foods', JSON.stringify(foods));
            } else {
                let foods = JSON.parse(localStorage.getItem('foods'));
                foods.push(food);
                localStorage.setItem('foods', JSON.stringify(foods));
            }

            // After saving the daily routine the function "getFoods" is executed so that when adding a new routine it is automatically updated without updating the page
            getFoods();

            // Reset form after saving food
            document.getElementById('formFood').reset();

            e.preventDefault();
        }
    }
    validateField();
}

// Get meals
function getFoods() {
    // Get meals and convert them to JSON format
    let foods = JSON.parse(localStorage.getItem('foods'));
    let foodsView = document.getElementById('foods');

    // Initialize empty food view
    foodsView.innerHTML = '';

    for (let i = 0; i < foods.length; i++) {
        let date = foods[i].date;
        let breakfast = foods[i].breakfast;
        let lunch = foods[i].lunch;
        let snack = foods[i].snack;
        let dinner = foods[i].dinner;
        let question = foods[i].question;

        // Code to be printed in the DOM
        foodsView.innerHTML += `
            <div class="card foods-card mb-4 mt-2">
                <div class="card-header bg-success">
                    <h5 class="text-light"><img src="img/icon-date.png"> Date: ${date}</h5>
                </div>
                <div class="card-body">
                    <p><b>Breakfast:</b> ${breakfast}</p>
                    <p><b>Lunch:</b> ${lunch}</p>
                    <p><b>Snack:</b> ${snack}</p>
                    <p><b>Dinner:</b> ${dinner}</p>
                    <p><b>Question:</b> ${question}</p>
                    <a class="button" onclick="deleteFood('${date}')"><img class="delete" src="img/delete.png"></a>
                </div>
            </div>
        `;
    }
}

// Delete food
function deleteFood(date) {
    let foods = JSON.parse(localStorage.getItem('foods'));

    for (let i = 0; i < foods.length; i++) {
        if (foods[i].date == date) {
            // We say what index we want to eliminate and how many elements
            foods.splice(i, 1);
        }
    }

    // We restore your data in localstorage with one less item
    localStorage.setItem('foods', JSON.stringify(foods));

    // After storing we run the "getFoods" function again
    getFoods();
}

getFoods();