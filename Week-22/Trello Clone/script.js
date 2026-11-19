function addTask(columnId){
    const input = document.getElementById(`${columnId}-input`)
    const taskText = input.value.trim();
    if(taskText ===""){
        return;
    }

    const taskElement = createTaskElement(taskText);

    const taskContainer = document.getElementById(`${columnId}-task`).appendChild(taskElement)
    input.value = '';
}

function createTaskElement(taskText) {
    const taskElement= document.createElement("div");
    taskElement.textContent = taskText;
    taskElement.classList.add('card');
    taskElement.setAttribute("draggable", true)
    return taskElement;
}
