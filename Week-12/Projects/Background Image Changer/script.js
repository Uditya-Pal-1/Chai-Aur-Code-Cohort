const bgChanger = document.getElementById('bgChanger')

const images = [
    './BgImages/BMW.jpg',
    './BgImages/d1.jpg',
    './BgImages/d2.jpg',
    './BgImages/d3.jpg',
    './BgImages/d4.jpg',
    './BgImages/d5.jpg',
    './BgImages/d6.jpg',
    './BgImages/d7.jpg',
    './BgImages/d8.jpg',
    './BgImages/d9.jpg',
    './BgImages/d10.jpg'
];

function backgroundChange(){
 const randomNum = Math.floor(Math.random()*images.length);
 const selectedImage = images[randomNum]

    document.body.style.backgroundImage = `url('${selectedImage}')`
}

bgChanger.addEventListener('click', backgroundChange)