'use strict';

var gNextId = 101;
var gTodos = createTodos();
var gFilterBy = 'All';
var gSortBy = '';
var gArrow;
var gId;

function createTodos() {
    return [
        createTodo('A Importance is 3', 3),
        createTodo('B Importance is 2', 2),
        createTodo('C Importance is 1', 1),
    ]
}
function createTodo(txt, importance) {
    return {
        id: gNextId++,
        txt: txt,
        isDone: false,
        createdAt: Date.now(),
        importance: importance
    }
}

function removeTodo(todoId) {
    // if (confirm('Are you sure?')) {
        var todoIdx = gTodos.findIndex(function (todo) {
            return todo.id === todoId
        })
        gTodos.splice(todoIdx, 1);
    // }

}



function getTodosToShow() {
    // if (gSortBy === 'Importance' && gFilterBy === 'All') return sortByImp();
    if (gArrow === 'UP' || gArrow === 'DOWN') return changePosUp();
    if (gSortBy === 'Importance') sortByImp();
    if (gSortBy === 'Txt') sortByTxt();
    if (gSortBy === 'Created') sortByCreated();


    if (gFilterBy === 'All') return gTodos;


    // if (gSortBy === 'Importance') sortByImp();

    var todosToShow = gTodos.filter(function (todo) {
        return (gFilterBy === 'Done' && todo.isDone) ||
            (gFilterBy === 'Active' && !todo.isDone)


    })
    return todosToShow;
}


function changePosUp() {
    var indexTodos = gTodos.findIndex(function (todos) {
        return todos.id === gId;
    });
    console.log('index is:', indexTodos);
    if (gArrow === 'UP') {


        if (gTodos[0].id === gId) return gTodos;
        var temp = gTodos[indexTodos];
        gTodos[indexTodos] = gTodos[indexTodos - 1];
        gTodos[indexTodos - 1] = temp;
        return gTodos;
    }
    if (gArrow === 'DOWN') {
        if (gTodos[gTodos.length - 1].id === gId) return gTodos;
        var temp = gTodos[indexTodos];
        gTodos[indexTodos] = gTodos[indexTodos + 1];
        gTodos[indexTodos + 1] = temp;
        return gTodos;


    }


}

function getTotalCount() {
    return gTodos.length;
}

function toggleTodo(todoId) {
    var todo = gTodos.find(function (todo) {
        return todo.id === todoId
    })
    // if (!todo) return;
    todo.isDone = !todo.isDone;
}

function addTodo(txt, imp) {
    gTodos.push(createTodo(txt, imp));
}

function setFilter(filterBy) {
    gFilterBy = filterBy;
}

function setSortFilter(filterBy) {
    gSortBy = filterBy;
}


function getActiveCount() {
    var activeTodos = gTodos.filter(function (todo) {
        return !todo.isDone
    })
    return activeTodos.length
}

function sortByImp() {

    gTodos.sort((a, b) => (a.importance > b.importance) ? 1 : -1)
    return gTodos;

}
function sortByTxt() {
    gTodos.sort((a, b) => (a.txt > b.txt) ? 1 : -1)
    return gTodos;

}
function sortByCreated() {
    gTodos.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1)
    return gTodos;

}
