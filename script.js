'use strict'

function Todolist() {
    let ultodo, input ;
    let todos = [
        {
            id : 0,
            text : 'Go to swim',
            completed : false
        },
        {
            id : 1,
            text : 'Do homework',
            completed : false
        },
        {
            id : 2,
            text : 'Buy a bag of good weed',
            completed : false
        },
        {
            id : 3,
            text : 'Learn mySQL',
            completed : false
        },
    ];

    const loadTodosFromLocalStorage = () => {
        const localTodos = localStorage.getItem('todos');
        if (localTodos) {
            const todoArr = JSON.parse(localTodos);
            if (todoArr) {
                todos = todoArr;
            }
        }
    };

    const saveTodosInLocalStorage = () => {
        localStorage.setItem('todos' , JSON.stringify(todos));
    }

    const removeTodo = id => {
        todos = todos.filter( todo => todo.id !== id);
        saveTodosInLocalStorage();
        ultodo.removeChild(ultodo.querySelector('#todo' + id));
    };

    const toggleTodo = (id, ele) => {
        todos = todos.map( ele => {
            if(ele.id === id){
                ele.completed = !ele.completed;
            }
            return ele;
        });
        saveTodosInLocalStorage();
        const oldClass = ele.classList.contains('completed') ? 'completed' : 'uncompleted';
        const newClass = oldClass === 'completed' ? 'uncompleted' : 'completed';
        ele.classList.replace(oldClass, newClass);
        ele.parentElement.classList.toggle('completed');
    };

    const createLi = ({text, completed, id}) => {

        const li = document.createElement('li');
        li.id = 'todo' + id;
        if (completed) {
            li.classList.add('completed');
        };
        const fdiv = document.createElement('div')
        fdiv.classList.add('fl')
        const check = document.createElement('span');
        fdiv.appendChild(check);  
        check.classList.add(completed ? 'completed' : 'uncompleted');
        check.addEventListener('click' , (e) => {
            toggleTodo(id, e.target);
        });
        const textNode = document.createTextNode(text);
        fdiv.appendChild(textNode);
        li.appendChild(fdiv);
        
        const sdiv = document.createElement('div');
        sdiv.classList.add('fr');
        const cross = document.createElement('span');        
        cross.classList.add('cross');
        cross.addEventListener('click' , (e) => {
            removeTodo(id);
        });
        sdiv.appendChild(cross);
        li.appendChild(sdiv);

        return li
        /*<li>
            <div class="fl">
            <span class="completed"></span>
            todo text
            </div>
            <div class="fr">
            <span class="cross"></span>
            </div>
        </li> */
    };

    const addNewTodo = (todo) => {
        todos.unshift(todo);
        saveTodosInLocalStorage();
        const li = createLi(todo);
        const firstLi = ultodo.firstChild;
        if(!firstLi) {
            ultodo.appendChild(li);
        } else {
            ultodo.insertBefore(li, firstLi);
        }
    }

    const addTodo = (e) => {
        const key = e.keyCode, 
        ele = e.target;
        if (key === 13 && ele.value.trim().length > 2) {
            const todo = {
                text: ele.value.trim(),
                id: todos.length,
                completed : false
            }
            addNewTodo(todo);
            ele.value = '';
        }
    }

    const renderTodos = (todoType) => {
        const lis = ultodo.querySelectorAll('li');
        if (lis) {
            lis.forEach( li => ultodo.removeChild(li));
        };
        const currentTodos = todos.filter(todo => {

            if (todoType === 'all'){
                return todo;
            }

            return (todoType === 'completed') ? todo.completed : !todo.completed;
        })

        currentTodos.map( todo => createLi(todo))
        .forEach( li => ultodo.appendChild(li));
    }

    const renderTodosList = () => {
        loadTodosFromLocalStorage();
        ultodo = document.querySelector('ul#todolist');
        if(!ultodo){
            ultodo = document.querySelector('ul');
            ultodo.id = 'todolist';
            document.body.appendChild(ultodo);
        }
        renderTodos('all');

        input = document.querySelector('#todoInput');
        input.addEventListener('keyup', addTodo);
        document.querySelector('#btnAll').addEventListener('click' , e => {
            e.target.classList.toggle('active');
            document.querySelector('#btnCompleted').classList.remove('active');
            document.querySelector('#btnTodo').classList.remove('active');
            renderTodos('all');
        });
        document.querySelector('#btnCompleted').addEventListener('click' , e => {
            e.target.classList.toggle('active');
            document.querySelector('#btnAll').classList.remove('active');
            document.querySelector('#btnTodo').classList.remove('active');
            renderTodos('completed');
        });
        document.querySelector('#btnTodo').addEventListener('click' , e => {
            e.target.classList.toggle('active');
            document.querySelector('#btnCompleted').classList.remove('active');
            document.querySelector('#btnAll').classList.remove('active');
            renderTodos('uncompleted');
        });

    };

    return {
        getTodos : function() {
            return todos;
        },
        init : function() {
            renderTodosList();
        }
    }
}
const today = new Date();
const fs = document.getElementById('footerSpan');
fs.innerText = today.getFullYear() + ' All rights reserved';
const myTodo = Todolist();
myTodo.init();
console.log(myTodo);