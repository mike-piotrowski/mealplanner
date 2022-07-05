import AddRemoveElementList from './newrecipe.js';

// <!-- /* === New Recipe === */ -->

const newIngredient = new AddRemoveElementList('.newrecipe__ingredients');
const newInstruction = new AddRemoveElementList('.newrecipe__instructions');
const addRecipeBtn = document.querySelector('.add_recipe');
const recipeName = document.querySelector('.newrecipe__name--input ');
const recipeDescription = document.querySelector('.newrecipe__description--input');

const instructionList = document.querySelector('ol.list');
const ingredientList = document.querySelector('ul.list');
const widgetButton = document.querySelector('.newrecipe-button');

widgetButton.addEventListener('click', () => {
  const widget = document.querySelector('.widgets');
  const week = document.querySelector('.week__plan');
  const newrecipe = document.querySelector('.newrecipe');
  week.classList.toggle('hide');
  widget.classList.toggle('hide');
  newrecipe.classList.toggle('hide');
});



function saveToLocalStorage(newObject) {
  let dataFromLocalStorage = [];
  if (localStorage.getItem('recipes') != null) {
    dataFromLocalStorage = JSON.parse(localStorage.getItem('recipes'));
    dataFromLocalStorage.push(newObject);
    localStorage.setItem('recipes', JSON.stringify(dataFromLocalStorage));
  } else {
    dataFromLocalStorage.push(newObject);
    localStorage.setItem('recipes', JSON.stringify(dataFromLocalStorage));
  }
  alert('Przepis zapisany do localStorage');
}

addRecipeBtn.addEventListener('click', (el) => {
  el.preventDefault();
  const newRecipe = {};
  const widget = document.querySelector('.widgets');
  const week = document.querySelector('.week__plan');
  const newrecipe = document.querySelector('.newrecipe');
    console.log(Array.from(instructionList.children));
  // Walidacja
  if (
    recipeName.value.length === 0 ||
    recipeDescription.value.length === 0 ||
    Array.from(instructionList.children).length === 0 ||
    Array.from(ingredientList.children).length === 0
  )
    return alert('Uzupełnij pola.');

  // zapisujemy detale przepisu do pola obiektu newRecipe
  newRecipe.title = recipeName.value;
  newRecipe.description = recipeDescription.value;
  newRecipe.instruction = Array.from(instructionList.children).map((e) => e.innerText);
  newRecipe.ingredients = Array.from(ingredientList.children).map((e) => e.innerText);

  // zapisujemy nowy przepis do localStorage
  saveToLocalStorage(newRecipe);

  // podglądamy w konsoli co zostało zapisane
  console.log('Zapisano:', newRecipe);

  week.classList.toggle('hide');
  widget.classList.toggle('hide');
  newrecipe.classList.toggle('hide');
  document.location.reload();
});

////////////////////////////////////////////////////////////////



    const button = document.querySelector('.btn');
    const nameForm = document.querySelector('.welcome__form');
    const nameInput = document.querySelector('.welcome__input');
    const user = document.getElementById('user__name');
    const close = document.querySelector('.fas');

    // Local storage with name //
    button.addEventListener('click', function(){
        const name = nameInput.value;
        if(name.trim()){
            localStorage.setItem('user__name', name);
            nameInput.value="";
            user.innerText = localStorage.getItem('user__name')
        }else{
            alert('podaj swoje imie')
        }
        welcome.classList.toggle('hide');
        widget.classList.toggle('hide')
        week.classList.toggle('hide')
    })

    //  section welcome always hiden after reload if localstorage =/= null //
    if (localStorage.getItem('user__name')) user.innerText = localStorage.getItem('user__name');
    const welcome = document.querySelector('.welcome')
    const week = document.querySelector('.week__plan')
    const widget = document.querySelector('.widgets')
    if(localStorage.getItem('user__name')) {
        welcome.classList.toggle('hide');
        widget.classList.toggle('hide')
        week.classList.toggle('hide')
        }

    // button 'PLAN' //
    const addPlan = document.querySelector('.add__plan')
    addPlan.addEventListener('click', function(e){
        widget.style.display='none';
        week.style.display= 'none';
        const newSchedule = document.querySelector('.new__schedule-container')
        newSchedule.classList.toggle('hide')
    })

    // cooperation with button from schedule.js //

    if (localStorage.addSchedule != null) {
        widget.style.display = "none";
        week.style.display = "none";
        const newSchedule = document.querySelector('.new__schedule-container')
        newSchedule.classList.toggle('hide')
        let deleteTimeS = setTimeout(() => {
            localStorage.removeItem("addSchedule");
        }, 500);
    }

    // display recipes   tutaj beda przepisy  do wyswietlenia w options //

    const meal = document.querySelectorAll('.meal');
    const recipesLocalStorage = localStorage.getItem('recipes');
    const recipesList = JSON.parse(recipesLocalStorage)

    if( recipesLocalStorage === null ){
        meal.forEach(e =>{
            let optionMeal = document.createElement('option');
            optionMeal.setAttribute("hidden", "");
            optionMeal.value = "null";
            optionMeal.innerHTML  = 'Brak przepisów';
            e.appendChild(optionMeal);
        })
    }else{
        meal.forEach(e =>{
            recipesList.forEach(el =>{
                let optionMeal = document.createElement('option');
                optionMeal.value = el.title;
                optionMeal.innerText  = el.title
                e.appendChild(optionMeal);
            })
        })
    }



    // schedule add // // schedule display //

    function Schedule(id, weekNumber, title, description) {
        this.id = id; // id przepisu
        this.title = title; // nazwa planu
        this.description = description; // opis planu
        this.weekNumber = weekNumber; // numer tygodnia do którego przypisany jest plan
        this.monday = []; // plan na poniedzialek
        this.tuesday = []; // plan na wtorek
        this.wednesday = []; // plan na środę
        this.thursday = []; // plan na czwartek
        this.friday = []; // plan na piątek
        this.saturday = []; // plan na sobotę
        this.sunday = []; // plan na niedzielę
    }

                      // schedule display //
    const titleMonday = document.querySelectorAll('.schedule__view tr td:nth-of-type(1)');
    const titleTuesday = document.querySelectorAll('.schedule__view tr td:nth-of-type(2)');
    const titleWednesday = document.querySelectorAll('.schedule__view tr td:nth-of-type(3)');
    const titleThursday = document.querySelectorAll('.schedule__view tr td:nth-of-type(4)');
    const titleFriday = document.querySelectorAll('.schedule__view tr td:nth-of-type(5)');
    const titleSaturday = document.querySelectorAll('.schedule__view tr td:nth-of-type(6)');
    const titleSunday =  document.querySelectorAll('.schedule__view tr td:nth-of-type(7)');

    const leftSchedule = document.querySelector('.prev__button');
    const rightSchedule = document.querySelector('.next__button');
    const tableTitle = document.querySelector("caption")

    let sorted = Object.entries(localStorage).filter(elem => {
        return elem[0].substring(0, 4) === "plan"
    }).sort((a, b) => {
        return parseInt(a[0].substring(5, 10)) - parseInt(b[0].substring(5, 10))
    });

    let plan;
    let page = 0;

    if(sorted.length === 0){
        tableTitle.innerText = 'Brak planów'
    }else{
        function update__title__table(plan){
            titleMonday.forEach(function (element, index){
                element.innerText = plan.monday[index]
            });
            titleTuesday.forEach(function (element, index){
                element.innerText = plan.tuesday[index]
            });
            titleWednesday.forEach(function (element, index){
                element.innerText = plan.wednesday[index]
            });
            titleThursday.forEach(function (element, index){
                element.innerText = plan.thursday[index]
            });
            titleFriday.forEach(function (element, index){
                element.innerText = plan.friday[index]
            });
            titleSaturday.forEach(function (element, index){
                element.innerText = plan.saturday[index]
            });
            titleSunday.forEach(function (element, index){
                element.innerText = plan.sunday[index]
            });
            tableTitle.innerText = `Twój plan na ${plan.weekNumber} tydzień:`
        }
        window.addEventListener('load', function(){
            plan = JSON.parse(sorted[0][1]);
            update__title__table(plan)
        })
        rightSchedule.addEventListener('click', function (){
            page += 1;
            if(page < sorted.length){
                plan = JSON.parse(sorted[page][1])
                update__title__table(plan)
            }
        })
        leftSchedule.addEventListener('click', function (){
            page -= 1;
            if (page >= 0){
                plan = JSON.parse(sorted[page][1])
                update__title__table(plan);

            }
        })
    }
    //////////////////////////////////////////////////////////////////////////////////////////////


                    //add schedule //

    const exitButton = document.querySelector('.new__schedule-title a');
    exitButton.addEventListener('click', function(e){
        const newSchedule = document.querySelector('.new__schedule-container')
        const planName = document.querySelector('.new__schedule-name input').value;
        const planDesc = document.querySelector('.new__schedule-description textarea').value;
        const planNumber = parseInt(document.querySelector('.new__schedule-number input').value);

        e.preventDefault();
        if(planDesc <= 0 ){
            return alert('wypełnij wszystkie pola');

        }else if(recipesLocalStorage ===null ){
            return alert('Dodaj przepis potem planuj')
        }else{
            let newPlan = new Schedule(Object.entries(localStorage).filter(element => {
                return element[0].substring(0, 4) === 'plan'
            }).length + 1, planNumber, planName, planDesc );
            const monday = document.querySelectorAll('.monday td select');
            const tuesday = document.querySelectorAll('.tuesday td select');
            const wednesday = document.querySelectorAll('.wednesday td select');
            const thursday = document.querySelectorAll('.thursday td select');
            const friday = document.querySelectorAll('.friday td select');
            const saturday = document.querySelectorAll('.saturday td select');
            const sunday = document.querySelectorAll('.sunday td select');

            monday.forEach(function (element) {
                newPlan.monday.push(element.options[element.selectedIndex].value)
            });
            tuesday.forEach(function (element) {
                newPlan.tuesday.push(element.options[element.selectedIndex].value)
            });
            wednesday.forEach(function (element) {
                newPlan.wednesday.push(element.options[element.selectedIndex].value)
            });
            thursday.forEach(function (element) {
                newPlan.thursday.push(element.options[element.selectedIndex].value)
            });
            friday.forEach(function (element) {
                newPlan.friday.push(element.options[element.selectedIndex].value)
            });
            saturday.forEach(function (element) {
                newPlan.saturday.push(element.options[element.selectedIndex].value)
            });
            sunday.forEach(function (element) {
                newPlan.sunday.push(element.options[element.selectedIndex].value)
            });
            localStorage.setItem(('plan_' + newPlan.id), JSON.stringify(newPlan))
            location.href ='./app.html'
            newSchedule.classList.toggle('hide')
             return alert('Plan dodany')
        }
    })
    ////////////////////////////////////////////////////////////////////////////////////


const recipeCounter = document.querySelector('.recipes__counter')
if (recipesList == null) {
    recipeCounter.innerText = "0 przepisów";
} else if (recipesList.length === 1) {
    recipeCounter.innerText = recipesList.length + " przepis";
} else if (
    recipesList.length >= 2 &&
    recipesList.length <= 4
) {
    recipeCounter.innerText = recipesList.length + " przepisy";
} else {
    recipeCounter.innerText = recipesList.length + " przepisów";
}