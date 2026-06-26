const openMenuBtn = document.getElementById('openBtn')
const closeMenuBtn = document.getElementById('closeMenuBtn')
const slideMenu = document.getElementById('slidingMenu')
const overlay = document.getElementById('overlay')
const menuItem = document.querySelectorAll('.menu-item')

openMenuBtn.addEventListener('click', function(){
    slideMenu.classList.add('active')
    overlay.classList.add('active')
    document.body.classList.add('no-scroll')
})

function closeMenu(){
    slideMenu.classList.remove('active')
    overlay.classList.remove('active')
    document.body.classList.remove('no-scroll')
}
closeMenuBtn.addEventListener('click', closeMenu)
overlay.addEventListener('click', closeMenu)

menuItem.forEach(item =>{
    item.addEventListener('click', function(event){
        alert(`You clicked: ${event.target.innerText}`)
        closeMenu();
    })
})