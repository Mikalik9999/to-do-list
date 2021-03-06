const addBtn = document.querySelector('.addBtn');
const input = document.getElementById('input');
const ul = document.querySelector('.todos');
const deleteAll = document.querySelector('.deleteAll');
const informationWrapper = document.querySelector('.informationWrapper');
const select = document.querySelector('.filterTodo');
const deleteCompletedBtn = document.querySelector('.deleteCompleted');
let arrayTasks = [];
let sort = 'all';

loadTasksLocalStorage();
updateList();

function checkEmptyString () {
    if (input.value?.trim() === '' ) {
        showInformation('Введите текст', 'error');
    }
    else {
        createElement(input.value);
        saveTasksLocalStorage();
        showInformation('Задача добавлена', 'success');
        input.value = '';
    }
}

function createElement(text) {
    const objTasks = {
        id: Date.now(),
        name: text,
        createDate: new Date(),
        completed: false,
    }

    arrayTasks.push(objTasks);
    updateList();
    showInformationUncompleted();
}

function displayElement(objTasks) {
    const li = document.createElement("li");
    const completeBtn = document.createElement('button');
    const closeBtn = document.createElement('button');
    const wrapperBtn = document.createElement ("div");
    const date = document.createElement ("div");

    closeBtn.addEventListener('click', deleteElement);
    closeBtn.classList.add('closeBtn');
    closeBtn.setAttribute('taskId', objTasks.id + '');
    completeBtn.addEventListener('click', completeElement);
    completeBtn.classList.add('completeBtn');
    completeBtn.setAttribute('taskId', objTasks.id + '');
    wrapperBtn.classList.add('wrapperBtn');
    date.classList.add('date');

    date.innerHTML = new Date(objTasks.createDate).toLocaleString();

    li.innerText = objTasks.name;

    wrapperBtn.appendChild(date);
    if (!objTasks.completed) {
        wrapperBtn.appendChild(completeBtn);
    } else {
        li.classList.add('complete');
    }
    wrapperBtn.appendChild(closeBtn);
    li.appendChild(wrapperBtn);
    ul.appendChild (li);
}

function updateList(){
    let tasks ;
    switch (sort) {
        case 'completed':
            tasks = arrayTasks.filter(item => item.completed);
            break;
        case 'uncompleted':
            tasks = arrayTasks.filter(item => !item.completed);
            break;
        default:
            tasks = arrayTasks;
            break;
    }

    ul.innerHTML = '';

    tasks.forEach( (item) => {
        displayElement(item)
    });
    showInformationUncompleted();
}

function saveTasksLocalStorage() {
    localStorage.setItem('arrayTasks', JSON.stringify(arrayTasks));
}

function loadTasksLocalStorage() {
    arrayTasks = JSON.parse(localStorage.getItem('arrayTasks')) || [];
}

function deleteElement(event) {
    const li = event.target.parentElement.parentElement;
    const animation = li.animate ({ opacity: [1, 0]}, 500);
    const taskId = event.target.getAttribute('taskId');

    arrayTasks = arrayTasks.filter(item => item.id !== +taskId);
    animation.onfinish = () => {
        updateList();
        showInformationUncompleted();
    }
    showInformation('Задача удалена','finish');
    saveTasksLocalStorage();
}

function completeElement(e) {
    const taskId = e.target.getAttribute('taskId');
    const task = arrayTasks.find(item => item.id === +taskId );

    task.completed = true;
    updateList();
    showInformationUncompleted();
    saveTasksLocalStorage();
}

function showInformation(text, type){
    const information = document.createElement('div');

    information.innerText = text;
    information.className = 'information';
    informationWrapper.appendChild(information);
    switch (type) {
        case 'error':
            information.classList.add('informationError');
            break;
        case 'success':
            information.classList.add('informationSuccess');
            break;
        case 'finish':
            information.classList.add('informationFinish');
            break;
    }
    setTimeout(()=> {
        const animation = information.animate ({ opacity: [1, 0]}, 1000);
        animation.onfinish = () => {
            information.remove();
        }
    },5000);
    showInformationUncompleted();
}

function showInformationUncompleted () {
    const tasks = arrayTasks.filter((item) => item.completed === false);
    document.getElementById("informationUncompleted").innerHTML = 'Невыполненных задач - ' + tasks.length;
    saveTasksLocalStorage();
}

deleteAll.addEventListener('click',() => {
    ul.innerHTML = '';
    arrayTasks = [];
    showInformationUncompleted();
    saveTasksLocalStorage();
});

input.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) { //поправить
        checkEmptyString();
    }
})

addBtn.addEventListener('click',() => {
    checkEmptyString();
});

deleteCompletedBtn.addEventListener('click',() => {
    const completedTasks = document.querySelectorAll('li.complete');

    arrayTasks = arrayTasks.filter(item => !item.completed);

    completedTasks.forEach((item) => {
        const animation = item.animate ({ opacity: [1, 0]}, 500);

        animation.onfinish = () => {
            item.remove();
        }
    });
    showInformation('Удалены выполненные задачи', 'finish');
    showInformationUncompleted();
    saveTasksLocalStorage();
});

select.addEventListener('change',(e) => {
    sort = e.target.value;
    updateList();
});