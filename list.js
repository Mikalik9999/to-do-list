const addBtn = document.querySelector('.addBtn');
const input = document.getElementById('input');
const ul = document.querySelector('.todos');
const deleteAll = document.querySelector('.deleteAll');
const information = document.querySelector('.information');



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
    showInformation('Задача удалена','finish');
    event.target.parentElement.parentElement.remove();
}

function completeElement(e){
    e.target.parentElement.parentElement.classList.add('complete');
    e.target.remove();
}

function showInformation(text, type){
    information.innerText = text;
    information.style.display = 'flex';
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
        information.style.display = 'none';
        information.className = 'information';
    },5000);
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

