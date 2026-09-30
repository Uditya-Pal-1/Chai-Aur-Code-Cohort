// function changeBackgroundBlack(){
//     document.body.style.backgroundColor="Black";
// }
// // changeBackgroundBlack();

// function changeBackgroundWhite(){
//     document.body.style.backgroundColor="White";
// }

// the above code voilate the DRY property - DO NOT REPEAT .

//---------------------------------------------------------------------
// function changeBackground(color){
//     document.body.style.backgroundColor= color;
// }
// function changeColor(textcolor){
//     document.body.style.color = textcolor;
// }
// const darkButton = document.getElementById('dark-Button');
// const lightButton = document.getElementById('light-Button');
// // console.log(darkButton)
// darkButton.innerText='changed inner text by js';

// darkButton.addEventListener('click',function(){
//     console.log("i got clicked");
//     changeBackground('Black');
//     changeColor('White');
// });

// darkButton.addEventListener('click',function(){
//     console.log("storing data by another event listener with same button");
// });


// lightButton.addEventListener('click',function(){
//     console.log("clicked white theme button");
//     changeBackground('White');
//     changeColor('Black');
// });

//-----------------------------------------------------------------------
// toggle kya hota hai? ---- [on ko off] or [off ko on].

// static jo jesa hai wo wesa hi raheta hai usme koi change nii ata hai.
// dynamic value ko change kr sakte hai.

function changeBackground(color){
    document.body.style.backgroundColor= color;
}
function changeColor(textcolor){
    document.body.style.color=textcolor;
}
const themeButton = document.getElementById('theme-button');

themeButton.addEventListener('click',()=>{
    console.log(document.body.style.backgroundColor);
    const currentColor = document.body.style.backgroundColor;
    if(!currentColor || currentColor == 'white'){
         changeBackground('black');
         changeColor('white');
    }
    else{
        changeBackground('white');
        changeColor('black');
    }
});