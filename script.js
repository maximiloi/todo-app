const form = document.querySelector('.todo__form'); // находим элементы с которыми будем работать
const input = document.querySelector('.todo__input');
const todoList = document.querySelector('.todo__list');

const todos = JSON.parse(localStorage.getItem('todos')); // получаем из ЛС задачи

if (todos) { // если есть задачи выводим на страницу
    todos.forEach(todo => { // перебираем массив с задачами
        addTodo(todo); // задачу передаем в функцию
    });
}

function addTodo(todo) { // функция вывода на страницу задач
    let todoText = input.value; // создаем переменную со значением из инрута

    if (todo) { // если есть задачи в ЛС
        todoText = todo.text; // получить текст и присвоить значение
    }

    if (todoText) { // если есть переменая
        const todoItem = document.createElement('li'); // создать элемент

        if (todo && todo.completed) { // если есть задача и у неё есть отметка выполнено
            todoItem.classList.add('completed'); // добавить класс выполнено
        }

        todoItem.classList.add('todo__item'); // добавить задаче класс 
        todoItem.innerText = todoText; // добавить текст из задачи

        todoItem.addEventListener('click', () => { // при клике на задачу добавить класс выполнено
            todoItem.classList.toggle('completed');

            updateLS(); // обновить ЛС с изменеными данными
        });

        todoItem.addEventListener('contextmenu', (e) => { // при клике на задачу правой клавишей
            e.preventDefault(); // отменить действия по умолчанию
            todoItem.remove(); // удалить задачу со страницы

            updateLS(); // обновить ЛС с изменеными данными
        });

        todoList.appendChild(todoItem); // вставить элемент на страницу после элемента списка
        input.value = ''; // очистить инпут

        updateLS(); // обновить ЛС с изменеными данными
    }
}

function updateLS() { // функция обновления ЛС
    const todosEl = document.querySelectorAll('li'); // получаем элементы
    const todos = []; // вспомогательный пустой массив

    todosEl.forEach(todoEl => { // перебираем полученные элементы
        todos.push({ // в массив для каждой записи добавляем объект
            text: todoEl.innerText, // текст задачи
            completed: todoEl.classList.contains('completed'), // проверяем есть ли класс выполнено, ответ записываем в значение true / false
        });
    });

    localStorage.setItem('todos', JSON.stringify(todos)); // записываем в ЛС полученный массив
}

form.addEventListener('submit', (e) => { // слушатель на вводе данный в инпуте
    e.preventDefault(); // отменить действия по умолчанию
    addTodo(); // запустить функцию вывода на страницу
});