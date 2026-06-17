const h1Display = document.getElementById('h1Display');
const redBtn = document.getElementById('redBtn');
const greenBtn = document.getElementById('greenBtn');
const purpleBtn = document.getElementById('purpleBtn');
const blueBtn = document.getElementById('blueBtn');
const ResetBtn = document.getElementById('ResetBtn');

function changeRed(){
    h1Display.style.color = 'var(--redColor)'
}

function changeGreen(){
    h1Display.style.color = 'var(--greenColor)'
}

function changePurple(){
    h1Display.style.color = 'var(--purpleColor)'
}

function changeBlue(){
    h1Display.style.color = 'var(--blueColor)'
}

function resetBtn(){
    h1Display.style.color = 'var(--primarycolor)'
}


redBtn.addEventListener('click', changeRed)
greenBtn.addEventListener('click', changeGreen)
purpleBtn.addEventListener('click', changePurple)
blueBtn.addEventListener('click', changeBlue)
ResetBtn.addEventListener('click', resetBtn)