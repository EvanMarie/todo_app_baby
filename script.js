const input = document.querySelector('input[type="text"]');
const button = document.querySelector('button');
const todoList = document.querySelector('#todo-list');
const completedList = document.querySelector('#completed-list');
const clearCompletedButton = document.querySelector('#clear-completed-tasks');

// Load stored to-do items on page load
document.addEventListener('DOMContentLoaded', loadTodoItems);


function loadTodoItems() {
    const items = JSON.parse(localStorage.getItem('todoListItems')) || [];
  
    for (const item of items) {
      const li = createListItem(item.text, item.completed);
      if (item.completed) {
        completedList.appendChild(li);
      } else {
        todoList.appendChild(li);
      }
    }
  }
  
  function saveTodoItems() {
    const todoItems = [];
    const allItems = todoList.querySelectorAll('li, .completed-tasks li');
  
    for (const item of allItems) {
      const text = item.querySelector('span').textContent;
      const completed = item.querySelector('input[type="checkbox"]').checked;
      todoItems.push({ text, completed });
    }
  
    localStorage.setItem('todoListItems', JSON.stringify(todoItems));
  }


function addTask() {
  const inputValue = input.value.trim();
  if (inputValue !== '') {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('click', completeTask);
    const span = document.createElement('span');
    span.textContent = inputValue;
    li.appendChild(checkbox);
    li.appendChild(span);
    todoList.appendChild(li);
    input.value = '';
    saveTodoItems();
  }
}


function completeTask(event) {
  const checkbox = event.target;
  const li = checkbox.parentNode;
  if (checkbox.checked) {
    todoList.removeChild(li);
    completedList.appendChild(li);
  } else {
    completedList.removeChild(li);
    todoList.appendChild(li);
  }
  saveTodoItems();
}


function createListItem(text, completed) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('click', completeTask);
    checkbox.checked = completed;
    const span = document.createElement('span');
    span.textContent = text;
    li.appendChild(checkbox);
    li.appendChild(span);
    return li;
  }


input.addEventListener('keypress', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addTask();
  }
});

button.addEventListener('click', addTask);

clearCompletedButton.addEventListener('click', clearCompletedTasks);

function clearCompletedTasks() {
  const completedTasks = completedList.querySelectorAll('li');
  for (const task of completedTasks) {
    completedList.removeChild(task);
  }
  saveTodoItems();
}
