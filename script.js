'use strict'

function Todolist() {
    let ultodo, input ;
    const todos = [
        {
            id : 0,
            text : 'Go to swim',
            completed : false
        },
        {
            id : 0,
            text : 'Do homework',
            completed : false
        },
        {
            id : 0,
            text : 'Buy a bag of weed',
            completed : false
        },
        {
            id : 0,
            text : 'Learn mySQL',
            completed : true
        },
    ];

    const createLi = ({text, completed, id}) => {

        const li = document.createElement('li');
        li.id = id;
        const fdiv = document.createElement('div')
        fdiv.classList.add('fl')
        const check = document.createElement('span');
        check.classList.add(completed ? 'completed' : 'uncompleted');
        fdiv.appendChild(check);        
        li.appendChild(fdiv);

        const textNode = document.createTextNode(text);
        fdiv.appendChild(textNode);
        

        const sdiv = document.createElement('div');
        sdiv.classList.add('fr');
        const cross = document.createElement('span');        
        cross.classList.add('cross');
        sdiv.appendChild(cross);
        li.appendChild(sdiv);

        return li

        /*         <li>
            <div class="fl">
            <span class="completed"></span>
            todo
            </div>

            <div class="fr">
            <span class="cross"></span>
            </div>
        </li> */

    };

    const addNewTodo = (todo) => {
        todos.push(todo);
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

    const renderTodos = () => {
        ultodo = document.querySelector('ul#todolist');
        if(!ultodo){
            ultodo = document.querySelector('ul');
            ultodo.id = 'todolist';
            document.body.appendChild(ultodo);
        }
        todos.map( todo => createLi(todo))
        .forEach( li => ultodo.appendChild(li));

        input = document.querySelector('#todoInput');
        input.addEventListener('keyup', addTodo);

    };

    return {
        getTodos : function() {
            return todos;
        },
        init : function() {
            renderTodos();
        }
    }
}
const myTodo = Todolist();
myTodo.init();
console.log(myTodo);