const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

themeToggleBtn.addEventListener('click',()=>{
    body.classList.toggle('dark-theme');
})