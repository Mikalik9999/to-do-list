const addBtn = document.querySelector('.addBtn');
const input = document.getElementById('input');
const ul = document.querySelector('.todos');
const deleteAll = document.querySelector('.deleteAll');
const x = document.createElement ("div");


createElement('Вадик мерсовод');
createElement('Андрюша аудюшник');

function checkEmptyString () {
    if (input.value?.trim() === '' ) {
        alert('Пустая строка');
    }
    else {
        createElement(input.value);
        input.value = '';
    }
}

function createElement(text) {
    const li = document.createElement("li");
    const completeBtn = document.createElement('button');
    const closeBtn = document.createElement('button');


    closeBtn.addEventListener('click', deleteElement);
    closeBtn.classList.add('closeBtn');
    completeBtn.addEventListener('click', completeElement);
    completeBtn.classList.add('completeBtn');

    li.innerText = text;
    li.appendChild(completeBtn);
    li.appendChild(closeBtn);
    ul.appendChild (li);
}

function deleteElement(event) {
    event.target.parentElement.remove();
}

function completeElement(e){
    e.target.parentElement.classList.add('complete');
    e.target.remove();
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

