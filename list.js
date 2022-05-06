close()
function vvod() {
    const input = document.querySelector("input[type='text']");
    const ul = document.querySelector("ul.todos");
    function createTodo() {
        let parent = document.querySelector('#li');
        let p = document.createElement('li');
        const input = document.querySelector("input[type='text']");
        p.innerHTML = input.value;
        parent.append(p);
    }
    input.addEventListener("keypress", (keyPressed) => {
        const keyEnter = 13;
        if (keyPressed.which === keyEnter) {
            createTodo();
            close();
        }
    });
    ul.addEventListener("click", onClickTodo);
    input.value = "";
}
vvod()

function close(){
    let myClose = document.getElementsByTagName("LI");
    let i;
    for (i = 0; i < myClose.length; i++) {
        let span = document.createElement("SPAN");
        let txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myClose[i].appendChild(span);
    }
    const close = document.getElementsByClassName("close");
    let a;
    for (a = 0; a < close.length; a++) {
        close[a].onclick = function() {
            const div = this.parentElement;
            div.style.display = "none";
        }
    }
}

