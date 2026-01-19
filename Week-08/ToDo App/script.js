alert("Welcome to ToDo App.")
const addbutton = document.getElementById('addbtn');
const todoinput = document.getElementById('todo-input');
const todoItemsContainer = document.getElementById('unorderdlist');
const alldbtn = document.getElementById('del-btn');

addbutton.addEventListener('click',()=>{
    const value = todoinput.value;
    // console.log('user entered', value);
    const li = document.createElement('li'); //<li></li> tag is created but it is in the air so it not showing .
    li.innerText = value;
    // console.log(li)
    const dbtn = document.createElement('button');
    dbtn.innerText = 'Delete';
    dbtn.addEventListener('click',function(){
        li.remove();
    })
    li.appendChild(dbtn);

    alldbtn.addEventListener('click',function(){
      todoItemsContainer.innerHTML='';
    })

    todoItemsContainer.append(li);
    todoinput.value="";
    
});