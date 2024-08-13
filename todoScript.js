
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const deleteAllBtn = document.getElementById('delete-all-btn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

addTaskBtn.addEventListener('click', () => {
  const task = taskInput.value;
  const time = prompt('Enter time for task (e.g. 12:00 PM):');

  if (!task.trim() || task.includes(undefined) || task.includes(null)) {
    alert('Please enter a valid task');
    return;
  }

  const timeRegex = /^([1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/;
  if (!timeRegex.test(time)) {
    alert('Please enter a valid time in 12-hour format (e.g. 12:00 PM)');
    return;
  }

  const taskObject = {
    task,
    time,
    id: new Date().getTime(),
  };
  tasks.push(taskObject);
  taskInput.value = '';
  saveTasks();
  renderTaskList();
});

function renderTaskList() {
  taskList.innerHTML = '';
  tasks.sort((a, b) => {
    const timeA = convertTimeToMinutes(a.time);
    const timeB = convertTimeToMinutes(b.time);
    return timeA - timeB;
  });
  tasks.forEach((task) => {
    const taskListItem = document.createElement('li');
    taskListItem.innerHTML = `
      <p>${task.task}</p>
      <p>Time: ${task.time}</p>
      <div class="options" style="display: none;">
        <button class="delete-btn" data-id="${(task.id)}">Delete</button>
        <button class="edit-btn" data-id="${(task.id)}">Edit</button>
      </div>
    `;
    taskListItem.addEventListener('click', () => {
      const options = taskListItem.querySelector('.options');
      options.style.display = options.style.display === 'none' ? 'block' : 'none';
    });
    const deleteBtn = taskListItem.querySelector('.delete-btn');
    const editBtn = taskListItem.querySelector('.edit-btn');
    deleteBtn.addEventListener('click', () => {
      tasks = tasks.filter((t) => (t.id) !== parseInt(deleteBtn.getAttribute('data-id')));
      saveTasks();
      renderTaskList();
    });
   
   editBtn.addEventListener('click', () => {
   const taskId = parseInt(editBtn.getAttribute('data-id'));
   const newTask = prompt('Enter new task:');
   const newTime = prompt('Enter new time:');
   tasks = tasks.map((task) => {
   if ((task.id) === taskId) {
   task.task = newTask;
   task.time = newTime;
   }
   return task;
   });
   saveTasks();
   renderTaskList();
   });
  
    taskList.appendChild(taskListItem);
  });
}

deleteAllBtn.addEventListener('click', () => {
  tasks = [];
  saveTasks();
  renderTaskList();
});

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function convertTimeToMinutes(time) {
  if (typeof time === 'undefined') {
    return null;
  }
  let [hours, minutes, period] = time.match(/^([0-9]+):([0-9]+) (AM|PM)$/).slice(1);
  hours = parseInt(hours);
  minutes = parseInt(minutes);
  if (period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }
  return hours * 60 + minutes;
}
renderTaskList();
