const addBtn = document.querySelector('.addBtn');
const input = document.getElementById('input');
const ul = document.querySelector('.todos');
const deleteAll = document.querySelector('.deleteAll');


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
addBtn.addEventListener('click',() => {
    checkEmptyString();
});

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

function completeElement(end){
    end.target.parentElement.classList.add('end');
    end.target.remove();
}

deleteAll.addEventListener('click',(all) => {
    all.target.parentElement.remove();
});

input.addEventListener('keydown',function (e) {
    if (e.keyCode === 13) {
        checkEmptyString();
    }
})

