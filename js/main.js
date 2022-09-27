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
    <label class="list-item" draggable="true">
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

//drag and drop
const cards = document.querySelectorAll('.card');
const dropzones = document.querySelectorAll('.dropzone');

//our cards
cards.forEach(card => {
    card.addEventListener('dragstart', dragstart);
    card.addEventListener('drag', drag);
    card.addEventListener('dragend', dragend);
})

function dragstart() {
    dropzones.forEach(dropzone => dropzone.classList.add('highlight'));
    this.classList.add('is-dragging');
}

function drag() {

}

function dragend() {
    dropzones.forEach(dropzone => dropzone.classList.remove('highlight'));
    this.classList.remove('is-dragging');
}

// place where we will drop cards
dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragenter', dragenter);
    dropzone.addEventListener('dragover', dragover);
    dropzone.addEventListener('dragleave', dragleave);
    dropzone.addEventListener('drop', drop);
})

function dragenter(){
}

function dragover(){
    this.classList.add('over');

    const cardBeingDragged = document.querySelector('.is-dragging');
    
    this.appendChild(cardBeingDragged);
}

function dragleave(){
    this.classList.remove('over');
}

function drop(){
    this.classList.remove('over');
}