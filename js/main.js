const theme = document.querySelector('#theme');
const newItemInput = document.querySelector('#addItem');
const todoList = document.querySelector('.content ul');
const itemsCount = document.querySelector('.items-left span')

itemsCount.innerText = document.querySelectorAll('.list-item input[type="checkbox"]').length;


//changing theme mode
theme.addEventListener('click', () => {
    document.querySelector('body').classList = [theme.checked ? 'light-theme' : 'dark-theme']
})

//add new todo
newItemInput.addEventListener('keypress', (event) => {
    if (event.charCode === 13 && newItemInput.value.length > 0) {
        createNewTodoItem(newItemInput.value);
        newItemInput.value = '';
    }
})

function createNewTodoItem(text) {
    const element = document.createElement('li');

    element.innerHTML = `
    <label class="list-item">
        <input type="checkbox" name="todoItem">
        <span class="checkmark"></span>
        <span class="text">${text}</span>
    </label>
    <span class="remove"></span>
    
    `;

    todoList.append(element);
    updateItemsCount(1);
}

function updateItemsCount(number) {
    itemsCount.innerText = +itemsCount.innerText + number;
}

//remove todo item
function removeTodoItem(element) {
    element.remove();
    updateItemsCount(-1);
}

todoList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove')) {
        removeTodoItem(event.target.parentElement);
    }
});

//clear completed items
document.querySelector('.clear').addEventListener('click', () => {
    document.querySelectorAll('.list-item input[type="checkbox"]:checked').forEach(item => {
        removeTodoItem(item.closest('li'));
    });
});

//filter
document.querySelectorAll('.filter input').forEach(radio => {
    radio.addEventListener('change', (event) => {
        filterTodoItems(event.target.id);
    });
});

function filterTodoItems(id) {
    const allItems = todoList.querySelectorAll('li');

    switch (id) {
        case 'all':
            allItems.forEach(item => {
                item.classList.remove('hidden');
            })
            break;
        case 'active':
            allItems.forEach(item => {
                item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden');
            })
            break;
        default:
            allItems.forEach(item => {
                !item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden');
            })
            break;
    }
}
