function colorApp(){
    let selectedColor='#ff0000';
    return { // returning the function.
        setColor(color) {
            selectedColor = color; //lexical scoping because it call the variable from its parent.
        },
        applyColor() {
            document.body.style.backgroundColor = selectedColor;
        }
    };
}

// calling the function.
const app = colorApp();

// importing the elements from html.
const createBtn= document.getElementById("createBtn");
const panel= document.getElementById("panel");
const colorSelect= document.getElementById("colorSelect");
const hexInput= document.getElementById("hexInput");
const applyBtn= document.getElementById("applyBtn");

// adding event listners to the element
createBtn.addEventListener('click',() => {panel.classList.toggle('hidden')});
colorSelect.addEventListener('change',()=>{app.setColor(colorSelect.value);})

function isValidHex(hex){
    return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
}

applyBtn.addEventListener("click",()=>{const hexValue = hexInput.value.trim();
    if(hexValue && isValidHex(hexValue)){
        app.setColor(hexValue);
    }
    app.applyColor();
})