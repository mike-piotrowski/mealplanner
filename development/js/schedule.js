const user = document.getElementById('user__name');
if (localStorage.getItem('user__name')) user.innerText = localStorage.getItem('user__name');

const editContainer = document.querySelector('.edit__schedule-container');
const mainContainer = document.querySelector('.schedule__list-container');


                        // Add plan button //

const scheduleButton= document.querySelector('.schedule__button');
scheduleButton.addEventListener('click', function() {
    if(localStorage.getItem('user__name') !== null){
        location.href = "./app.html";
        localStorage.setItem("addSchedule", "plan");
    }else{
        alert('Najpierw podaj swoje imę')
        mainContainer.style.display='none'
        location.href = "./app.html";
    }
})

////////////////////////////////////////////////////////////////////////////

                         // Schedule list //

const tableBodySchedule = document.querySelector('.schedule__table-body')

let sorted = Object.entries(localStorage).filter(elem => {
    return elem[0].substring(0, 4) == "plan"
}).sort((a, b) => {
    return parseInt(a[0].substring(5, 10)) - parseInt(b[0].substring(5, 10))
});

if(sorted.length===0){
    let h1 = document.createElement('h1');
    h1.innerText = 'Twoja lista planów jest pusta';
    tableBodySchedule.appendChild(h1);
    tableBodySchedule.style.fontSize = '2rem';
    tableBodySchedule.style.color = '#ffb03b';
    tableBodySchedule.style.display = 'flex';
    tableBodySchedule.style.alignItems= 'center';
    tableBodySchedule.style.justifyContent = 'center';
}else{
    sorted.forEach(e =>{
        const schListLocalSto = JSON.parse(e[1]);
        const trBody = document.createElement('tr');
        const tdBodyId = document.createElement('td');
        const tdBodyName = document.createElement('td');
        const tdBodyDesc = document.createElement('td');
        const tdBodyWeek = document.createElement('td');
        const tdBodyIcon = document.createElement('td');
        const editBtn = document.createElement("i");
        const deleteBtn = document.createElement("i");

        editBtn.className = "fas fa-edit";
        deleteBtn.className = "fas fa-trash-alt";

        trBody.appendChild(tdBodyId);
        trBody.appendChild(tdBodyName);
        trBody.appendChild(tdBodyDesc);
        trBody.appendChild(tdBodyWeek);
        trBody.appendChild(tdBodyIcon);

        tdBodyId.innerText = schListLocalSto.id;
        tdBodyName.innerText = schListLocalSto.title;
        tdBodyDesc.innerText = schListLocalSto.description;
        tdBodyWeek.innerText = schListLocalSto.weekNumber;
        tdBodyIcon.appendChild(editBtn);
        tdBodyIcon.appendChild(deleteBtn);

        tableBodySchedule.appendChild(trBody)

        deleteBtn.addEventListener('click', () =>{
            localStorage.removeItem(e[0]);
            window.location.reload(false);
        })
    })
}

/////////////////////////////////////////////////////////////////////////////


// const exitButton = document.querySelector('.new__schedule-title a')
//
// exitButton.addEventListener('click', function(e){
//     e.preventDefault();
//     mainContainer.style.display = 'block'
//     editContainer.style.display='none'
// })