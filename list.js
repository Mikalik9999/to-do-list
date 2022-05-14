const addBtn = document.querySelector('.addBtn');
const input = document.getElementById('input');
const ul = document.querySelector('.todos');
const deleteAll = document.querySelector('.deleteAll');
const informationWrapper = document.querySelector('.informationWrapper');
const select = document.querySelector('.filterTodo');
const deleteCompletedBtn = document.querySelector('.deleteCompleted');

createElement('Вадик мерсовод');
createElement('Андрюша аудюшник');

function checkEmptyString () {
    if (input.value?.trim() === '' ) {
        showInformation('Введите текст', 'error');
    }
    else {
        createElement(input.value);
        showInformation('Задача добавлена', 'success');
        input.value = '';
    }
}

function createElement(text) {
    const li = document.createElement("li");
    const completeBtn = document.createElement('button');
    const closeBtn = document.createElement('button');
    const wrapperBtn = document.createElement ("div");

    closeBtn.addEventListener('click', deleteElement);
    closeBtn.classList.add('closeBtn');
    completeBtn.addEventListener('click', completeElement);
    completeBtn.classList.add('completeBtn');
    wrapperBtn.classList.add('wrapperBtn');

    li.innerText = text;
    wrapperBtn.appendChild(completeBtn);
    wrapperBtn.appendChild(closeBtn);
    li.appendChild(wrapperBtn);
    ul.appendChild (li);
}

function deleteElement(event) {
    const li = event.target.parentElement.parentElement;
    const animation = li.animate ({ opacity: [1, 0]}, 500);

    animation.onfinish = () => {
        li.remove();
    }
    showInformation('Задача удалена','finish');
}

function completeElement(e){ //удаление кнопки выполнения задачи
    e.target.parentElement.parentElement.classList.add('complete');
    console.log(e.target);
    const animation = e.target.animate ({ opacity: [1, 0]}, 500);

    animation.onfinish = () => {
        e.target.remove();
    }
}

function showInformation(text, type){
    const information = document.createElement('div');

    information.innerText = text;
    information.className = 'information';
    informationWrapper.appendChild(information);
    if (type === 'error') {
        information.classList.add('informationError');
    }
    if (type === 'success') {
        information.classList.add('informationSuccess');
    }
    if (type === 'finish'){
        information.classList.add('informationFinish');
    }
    setTimeout(()=> {
        const animation = information.animate ({ opacity: [1, 0]}, 1000);
        animation.onfinish = () => {
            information.remove();
        }
    },5000);
}

function showUncompletedTasks () {
    const allTasks = document.querySelectorAll('li');

    allTasks.forEach((item) => {
        if (!item.classList.contains('complete')) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function showAllTasks () {
    const allTasks = document.querySelectorAll('li');

    allTasks.forEach((item) => {
        item.style.display = 'flex';
    });
}

function showCompletedTasks () {
    const allTasks = document.querySelectorAll('li');

    allTasks.forEach((item) => {
        if (item.classList.contains('complete')) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

deleteAll.addEventListener('click',() => {
    ul.innerHTML = '';
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

    completedTasks.forEach((item) => {
        const animation = item.animate ({ opacity: [1, 0]}, 500);

        animation.onfinish = () => {
            item.remove();
        }
    });
    showInformation('Удалены выполненные задачи', 'finish');
});

select.addEventListener('change',(e) => {
    switch (e.target.value) {
        case 'uncompleted':
            showUncompletedTasks();
            break;
        case 'completed':
            showCompletedTasks();
            break;
        case 'all':
            showAllTasks();
            break;
    }
});

