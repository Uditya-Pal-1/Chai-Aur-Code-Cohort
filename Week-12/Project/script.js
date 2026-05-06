const ToDo = document.getElementById("ToDo");
const process = document.getElementById("process");
const done = document.getElementById("done");
const addBtn = document.querySelector('.addButton');
const panels = document.querySelector(".panels")
const addBoardBtn = document.getElementById('addBoardBtn')


function createBoard(boardName){
    const boardId = boardName.toLowerCase().replace(/\s+/g,'-');

    const boardDiv = document.createElement('div')
    boardDiv.className = 'board'
    boardDiv.id = boardId;

    const header = document.createElement('div')
    header.style.display='flex'
    header.style.justifyContent='Space-between'
    header.innerHTML =`
    <h4>${boardName}</h4>
    <i class="fa-solid fa-trash remove-board" style="cursor:pointer; color:red;"></i>
    `;
    boardDiv.appendChild(header)
    boardDiv.appendChild(document.createElement('hr'))

    boardDiv.addEventListener('dragover',(e)=>{
        e.preventDefault();
        const FlyingElement = document.querySelector('.Flying')
        if(FlyingElement){
            boardDiv.appendChild(FlyingElement)
            if(typeof updateIcon === 'function') updateIcon(FlyingElement,boardDiv.id)
        }
    })
    panels.appendChild(boardDiv);

}
addBoardBtn.addEventListener('click',()=>{
    const name = prompt("Enter Board Name (e.g., Testing")
    if(name) createBoard(name);
})
document.querySelectorAll('.board').forEach(board => {
    const title = board.querySelector('h4').innerText;

    const trash = document.createElement('i');
    trash.className = 'fa-solid fa-trash remove-board';
    trash.style.cssText = 'cursor:pointer; color:red; float:right;';
    board.querySelector('h4').after(trash);

    trash.addEventListener('click', () => {
        if (confirm("Delete this board?")) board.remove();
    });

    board.addEventListener('dragover', (e) => {
        e.preventDefault();
        const flyingElement = document.querySelector('.Flying');
        if (flyingElement) {
            board.appendChild(flyingElement);
            if (typeof updateIcon === "function") updateIcon(flyingElement, board.id);
        }
    });
});



function attachDragEvent(target) {
    target.addEventListener('dragstart', () => {
        target.classList.add('Flying');
    })
    target.addEventListener('dragend', () => {
        target.classList.remove('Flying');
    })
}
function updateIcon(taskElement,boardId){
    const icon = taskElement.querySelector('i');
    if(!icon) return;

    icon.className = 'fa-solid';

    if(boardId === 'ToDo'){
        icon.classList.add('fa-map-pin');
    }else if(boardId === 'process'){
        icon.classList.add('fa-spinner','fa-spin')
    }else if(boardId === 'done'){
        icon.classList.add('fa-circle-check');
    }
}

function taskInteractive(taskWrap){
    const taskText = taskWrap.querySelector(".task")
    const icon = taskWrap.querySelector('i')

taskText.addEventListener('click',()=>{
    let newText = prompt('Edit your task:',taskText.innerText)
    if(newText !== null && newText.trim() !== ""){
        taskText.innerText = newText;
    }
})
icon.addEventListener('click',()=>{
    if(confirm("Delete this Task ?")){
        taskWrap.remove();
    }
});
}
addBtn.addEventListener('click', () => {
    let input = prompt("Enter the Tasks ?");
    if (!input) return;

    const taskWrap = document.createElement('div');
    taskWrap.classList.add('tasks');
    taskWrap.setAttribute('draggable', 'true');

    const taskCard = document.createElement('p')
    taskCard.classList.add('task');
    taskCard.innerText = input;

    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-map-pin');
    icon.style.cursor = 'pointer'
    icon.style.marginRight = '10px';

    icon.addEventListener("click", () => taskWrap.remove());

    taskWrap.appendChild(icon);
    taskWrap.appendChild(taskCard);

    attachDragEvent(taskWrap);
    taskInteractive(taskWrap);
    ToDo.appendChild(taskWrap);
});

document.querySelectorAll('.board').forEach(board => {
    // Add trash icon to static boards if missing
    if (!board.querySelector('.remove-board')) {
        const h4 = board.querySelector('h4');
        const trash = document.createElement('i');
        trash.className = 'fa-solid fa-trash remove-board';
        trash.style.cssText = 'cursor:pointer; color:red; float:right; font-size: 0.8em;';
        h4.style.display = 'flex';
        h4.style.justifyContent = 'space-between';
        h4.appendChild(trash);
        trash.addEventListener('click', () => { if (confirm("Delete board?")) board.remove(); });
    }

    board.addEventListener('dragover', (e) => {
        e.preventDefault();
        const flyingElement = document.querySelector('.Flying');
        if (flyingElement) {
            board.appendChild(flyingElement);
            updateIcon(flyingElement, board.id);
        }
    });
});

document.querySelectorAll('.tasks').forEach(item => {
    attachDragEvent(item);
    taskInteractive(item);
    const parentBoard = item.closest('.board');
    if (parentBoard) updateIcon(item, parentBoard.id);
});