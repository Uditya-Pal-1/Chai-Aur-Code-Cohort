const bulb = document.querySelector('.bulb');

const onOffBtn = document.getElementById('onOff');
const themeBtn = document.getElementById('theme');

let isBulbOn = false;
function funBulb() {
    if (isBulbOn === false) {
        bulb.style.backgroundColor = 'var(--secondryColor)'
        bulb.style.boxShadow = ' 0 0 20px var(--secondryColor)'
        bulb.style.border = 'none'
        onOffBtn.innerText = 'Turn Off'
        isBulbOn = true;
    } else {
        bulb.style.backgroundColor = 'var(--whiteColor)'
        bulb.style.boxShadow = 'none'
        bulb.style.border = '1px solid var(--primaryColor)'
        onOffBtn.innerText = 'Turn On'
        isBulbOn = false;
    }
}
function theme() {
    if (document.body.style.backgroundColor === 'var(--whiteColor)') {
        document.body.style.backgroundColor = 'var(--primaryColor)'
    } else {
        document.body.style.backgroundColor = 'var(--whiteColor)'
    }
}


onOffBtn.addEventListener('click', funBulb);
themeBtn.addEventListener('click', theme);