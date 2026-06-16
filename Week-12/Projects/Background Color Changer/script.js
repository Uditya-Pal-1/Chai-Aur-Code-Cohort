const colorButton = document.getElementById('backgroundChangeBtn')

function changeBackground(){
    const red = Math.floor(Math.random()*256)
    const green = Math.floor(Math.random()*256) 
    const blue = Math.floor(Math.random()*256)
    document.body.style.backgroundColor = `rgb(${red},${green},${blue})`

}

colorButton.addEventListener('click', changeBackground)
