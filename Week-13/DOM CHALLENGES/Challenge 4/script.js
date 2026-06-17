const taskInput = document.getElementById('taskInput')
const completedTasks = document.getElementById('completedTasks')
// const taskCheckBox = document.getElementById('taskCheckBox')
const taskList = document.getElementById('taskList')
const totalTaskDisplay = document.getElementById('totalTaskDisplay')
const messageDisplay = document.getElementById('messageDisplay')
// const deleteBtn = document.getElementById('deleteBtn')
const addTaskBtn = document.getElementById('addTaskBtn')


let totalCount = 0;
let completedCount = 0;
taskList.innerHTML = '';


function updateDashboard() {
    totalTaskDisplay.innerText = `Total Tasks: ${totalCount}`
    completedTasks.innerText = `Completed Tasks: ${completedCount}`
    if (totalCount === 0) {
        messageDisplay.style.display = 'block';
    } else {
        messageDisplay.style.display = 'none';
    }
}

// taskInput.addEventListener('input', inputValueCheck)

// function inputValueCheck() {
//     if (taskInput.value.trim() === '') {
//         addTaskBtn.disabled = true;
//     } else {
//         addTaskBtn.disabled = false;

//     }
// }
// taskInput.addEventListener('click', addTask)

function addTask() {
const text = taskInput.value.trim();
if(text === '')return;

const taskDiv = document.createElement('div')
const checkBox = document.createElement('input')
const label = document.createElement('label')
const deleteBtn = document.createElement('button')

taskDiv.style.display = 'flex'
taskDiv.style.justifyContent = 'space-around'
taskDiv.style.alignItems = 'center'
taskDiv.style.width = '100%'
taskDiv.style.marginBottom = '20px'

checkBox.type = 'checkbox'

label.innerText = text;
label.style.flex = '1'
label.style.marginLeft = '10px'

deleteBtn.innerText = 'Delete'
deleteBtn.style.padding = '8px'
deleteBtn.style.backgroundColor = 'var(--primarycolor)'
deleteBtn.style.color = 'var(--secondrycolor)'
deleteBtn.style.border = 'none'
deleteBtn.style.fontSize = '15px'
deleteBtn.style.fontWeight = '500'
deleteBtn.style.borderRadius = '10px'
deleteBtn.style.cursor = 'pointer'

checkBox.addEventListener('change', function () {
    if (checkBox.checked) {
        completedCount++;
        label.style.textDecoration = 'line-through'
        label.style.color = 'var(--tertiarycolor)'
    } else {
        completedCount--;
        label.style.textDecoration = 'none'
        label.style.color = 'var(--primarycolor)'
    }
    updateDashboard();
})

deleteBtn.addEventListener('click', function () {
    taskDiv.remove();
    totalCount--;
    if (checkBox.checked) {
        completedCount--;
    }
    updateDashboard();
})
taskDiv.appendChild(checkBox);
taskDiv.appendChild(label)
taskDiv.appendChild(deleteBtn)
taskList.appendChild(taskDiv)

totalCount++;
taskInput.value = ''
addTaskBtn.disabled = true
updateDashboard();

}

taskInput.addEventListener('input', function () {
    if (taskInput.value.trim() === '') {
        addTaskBtn.disabled = true;
    } else {
        addTaskBtn.disabled = false;
    }
});

taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter' && taskInput.value.trim() !== '') {
        event.preventDefault();
        addTask();
    }
})

addTaskBtn.addEventListener('click', addTask);
updateDashboard();