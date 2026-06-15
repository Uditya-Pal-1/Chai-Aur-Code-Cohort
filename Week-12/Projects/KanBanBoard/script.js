const panels = document.querySelector(".panels");
const addTaskBtn = document.getElementById('addTaskBtn');
const addBoardBtn = document.getElementById('addBoardBtn');

const modal = document.getElementById('customModal');
const modalText = document.getElementById('modalText');
const modalInput = document.getElementById('modalInput');
const modalConfirm = document.getElementById('modalConfirm');
const modalCancel = document.getElementById('modalCancel');

function showModal(message, isPrompt = false, defaultValue = "") {
    return new Promise((resolve) => {
        modalText.innerText = message;
        modal.classList.remove('hidden');
        
        if (isPrompt) {
            modalInput.style.display = 'block';
            modalInput.value = defaultValue;
            modalInput.focus();
        } else {
            modalInput.style.display = 'none';
        }

        modalConfirm.onclick = () => {
            modal.classList.add('hidden');
            resolve(isPrompt ? modalInput.value : true);
        };

        modalCancel.onclick = () => {
            modal.classList.add('hidden');
            resolve(isPrompt ? null : false);
        };
    });
}

function saveState() {
    const kanbanData = [];
    document.querySelectorAll('.board').forEach(board => {
        const title = board.querySelector('h4').childNodes[0].textContent.trim();
        const tasks = [];
        
        board.querySelectorAll('.task').forEach(task => {
            tasks.push(task.innerText);
        });

        kanbanData.push({ id: board.id, title: title, tasks: tasks });
    });
    localStorage.setItem('kanbanApp', JSON.stringify(kanbanData));
}

function loadState() {
    const savedData = localStorage.getItem('kanbanApp');
    if (savedData) {
        panels.innerHTML = ''; 
        const parsedData = JSON.parse(savedData);
        
        parsedData.forEach(boardData => {
            const boardElement = createBoardElement(boardData.title, boardData.id);
            panels.appendChild(boardElement);
            
            boardData.tasks.forEach(taskText => {
                const taskElement = createTaskElement(taskText);
                boardElement.appendChild(taskElement);
                updateIcon(taskElement, boardData.id);
            });
        });
    } else {
        initializeDefaultBoards();
    }
}

function createBoardElement(boardName, boardId) {
    const boardDiv = document.createElement('div');
    boardDiv.className = 'board';
    boardDiv.id = boardId;

    const header = document.createElement('h4');
    header.innerText = boardName + ' ';

    const trash = document.createElement('i');
    trash.className = "fa-solid fa-trash remove-board";
    
    trash.addEventListener('click', async () => {
        const confirmed = await showModal(`Delete the "${boardName}" board?`, false);
        if (confirmed) {
            boardDiv.remove();
            saveState();
        }
    });

    header.appendChild(trash);
    boardDiv.appendChild(header);

    boardDiv.addEventListener('dragover', (e) => {
        e.preventDefault();
        const flyingElement = document.querySelector('.Flying');
        if (flyingElement) {
            boardDiv.appendChild(flyingElement);
            updateIcon(flyingElement, boardDiv.id);
        }
    });

    boardDiv.addEventListener('drop', saveState);

    return boardDiv;
}

function createTaskElement(taskText) {
    const taskWrap = document.createElement('div');
    taskWrap.classList.add('tasks');
    taskWrap.setAttribute('draggable', 'true');

    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-cube'); 

    const taskCard = document.createElement('p');
    taskCard.classList.add('task');
    taskCard.innerText = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-task-btn';
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

    taskWrap.appendChild(icon);
    taskWrap.appendChild(taskCard);
    taskWrap.appendChild(deleteBtn);

    taskWrap.addEventListener('dragstart', () => taskWrap.classList.add('Flying'));
    taskWrap.addEventListener('dragend', () => {
        taskWrap.classList.remove('Flying');
        saveState();
    });

    taskCard.addEventListener('click', async () => {
        let newText = await showModal('Edit your task:', true, taskCard.innerText);
        if (newText !== null && newText.trim() !== "") {
            taskCard.innerText = newText;
            saveState();
        }
    });

    deleteBtn.addEventListener('click', async () => {
        const confirmed = await showModal("Delete this task?", false);
        if (confirmed) {
            taskWrap.remove();
            saveState();
        }
    });

    return taskWrap;
}

function updateIcon(taskElement, boardId) {
    const icon = taskElement.querySelector('i:first-child');
    if (!icon) return;

    icon.className = 'fa-solid'; 

    if (boardId.includes('todo')) {
        icon.classList.add('fa-map-pin');
    } else if (boardId.includes('process')) {
        icon.classList.add('fa-spinner', 'fa-spin');
    } else if (boardId.includes('done')) {
        icon.classList.add('fa-circle-check');
    } else {
        icon.classList.add('fa-cube');
    }
}

addBoardBtn.addEventListener('click', async () => {
    const name = await showModal("Enter Board Name", true);
    if (name && name.trim() !== "") {
        const boardId = name.toLowerCase().replace(/\s+/g, '-');
        const boardElement = createBoardElement(name, boardId);
        panels.appendChild(boardElement);
        saveState();
    }
});

addTaskBtn.addEventListener('click', async () => {
    let input = await showModal("Enter the Task:", true);
    if (!input || input.trim() === "") return;

    const taskWrap = createTaskElement(input);
    const firstBoard = document.querySelector('.board');
    
    if (firstBoard) {
        firstBoard.appendChild(taskWrap);
        updateIcon(taskWrap, firstBoard.id);
        saveState();
    } else {
        showModal("Please create a board first!", false);
    }
});

function initializeDefaultBoards() {
    document.querySelectorAll('.board').forEach(board => {
        const h4 = board.querySelector('h4');
        const trash = document.createElement('i');
        trash.className = 'fa-solid fa-trash remove-board';
        
        trash.addEventListener('click', async () => { 
            const confirmed = await showModal("Delete board?", false);
            if (confirmed) {
                board.remove(); 
                saveState();
            }
        });
        h4.appendChild(trash);

        board.addEventListener('dragover', (e) => {
            e.preventDefault();
            const flyingElement = document.querySelector('.Flying');
            if (flyingElement) {
                board.appendChild(flyingElement);
                updateIcon(flyingElement, board.id);
            }
        });
        board.addEventListener('drop', saveState);
    });

    document.querySelectorAll('.tasks').forEach(item => {
        const taskCard = item.querySelector('.task');
        const deleteBtn = item.querySelector('.delete-task-btn');

        item.addEventListener('dragstart', () => item.classList.add('Flying'));
        item.addEventListener('dragend', () => {
            item.classList.remove('Flying');
            saveState();
        });

        taskCard.addEventListener('click', async () => {
            let newText = await showModal('Edit your task:', true, taskCard.innerText);
            if (newText !== null && newText.trim() !== "") {
                taskCard.innerText = newText;
                saveState();
            }
        });

        deleteBtn.addEventListener('click', async () => {
            const confirmed = await showModal("Delete this task?", false);
            if (confirmed) {
                item.remove();
                saveState();
            }
        });
    });

    saveState();
}

loadState();