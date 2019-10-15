'use strict';

function init() {
    renderTodos();

}

function renderTodos() {
    var todos = getTodosToShow();
    var strHTMLs = todos.map(function (todo) {
        var className = (todo.isDone) ? 'done' : '';
        return `<li  >
                 <span onclick="onToggleTodo(this, ${todo.id})" class="${className}">   ${todo.txt} </span>
                
                    <button onclick="onRemoveTodo(event, ${todo.id})">x</button>
                    <div class='upDown-btns'>
                    <button class="UP" onclick="onChangePos(this,${todo.id})">↑</button>
                    <button class="DOWN" onclick="onChangePos(this,${todo.id})">↓</button>
                    </div>
                </li>`
    })

    var elTodoList = document.querySelector('.todo-list');
    elTodoList.innerHTML = strHTMLs.join('');

    renderStats();

}
function onChangePos(el, id) {
    gId = id;
    console.log(el);
    if (el.classList.contains('DOWN')) gArrow = 'DOWN';
    if (el.classList.contains('UP')) gArrow = 'UP';
    console.log(gArrow);
    renderTodos();

}


function renderStats() {
    var totalCount = getTotalCount();
    var activeCount = getActiveCount();

    document.querySelector('.total-count').innerText = totalCount;
    document.querySelector('.active-count').innerText = activeCount;
    checkTodoStatus();
}

function onRemoveTodo(ev, todoId) {
    if (confirm('Are you sure?')) {
        ev.stopPropagation()
        removeTodo(todoId)
        renderTodos();
    }






}


function onToggleTodo(elTodo, todoId) {
    toggleTodo(todoId)
    elTodo.classList.toggle('done');
    renderStats();
}

function onAddTodo() {
    var elMsg = document.querySelector('.valid-msg');
    var elInputTxt = document.querySelector('.input-txt');
    var txt = elInputTxt.value
    var elImpTxt = document.querySelector('.importance-txt');
    var ImpTxt = +elImpTxt.value
    console.log('Adding', txt);

    elInputTxt.value = '';
    elImpTxt.value = '';
    if (txt !== '') {
        if (ImpTxt > 0 && ImpTxt <= 3) {
            elMsg.innerText = '';
            addTodo(txt, ImpTxt);
            renderTodos()

        }
        else {

            elMsg.innerText = 'Enter a number between 1-3';
        }
    }
    else {
        elMsg.innerText = 'Empty text! ';
    }

}

function onSetFilter(filterBy) {
    console.log('Setting Filter', filterBy);
    setFilter(filterBy);

    renderTodos();
    hideUpDownBtns();


}


function onSortFilter(filterBy) {
    console.log('Setting Filter', filterBy);

    setSortFilter(filterBy)

    renderTodos();
    hideUpDownBtns();
}



function checkTodoStatus() {

    var checkDone = gTodos.every(isAllDone);
    var checkActive = gTodos.every(isAllActive);


    var elMsg = document.querySelector('.status-msg');

    if (gFilterBy === 'Active' && checkActive) return elMsg.innerText = 'No Active';
    if (gFilterBy === 'Done' && checkDone) return elMsg.innerText = 'No Done';


    if (gTodos.length === 0) return elMsg.innerText = 'No todos';

    elMsg.innerText = '';

}


function isAllDone(toDo) {
    return toDo.isDone === false;
}

function isAllActive(active) {
    return active.isDone === true;

}

function hideUpDownBtns() {
    var elBtns = document.querySelectorAll('.upDown-btns');
    elBtns.forEach(function (div) {

        if (gFilterBy !== 'All') {
            div.classList.add('hide');
        }
        if (gSortBy !== 'Txt') {
            div.classList.add('hide');
        }


    });

}