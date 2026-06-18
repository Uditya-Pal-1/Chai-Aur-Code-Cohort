const imagePreview = document.getElementById('image')
const caption = document.getElementById('caption')
const previousBtn = document.querySelector('.previousBtn')
const nextBtn = document.querySelector('.nextBtn')
const dotContainer = document.querySelector('.dotContainer')
const autoPlayBtn = document.getElementById('autoPlayBtn')
const timerDisplay = document.querySelector('.timing')

const images = [
    { url: './BgImages/BMW.jpg', caption: 'A Beautiful Car' },
    { url: './BgImages/d1.jpg', caption: 'Flux Ani' },
    { url: './BgImages/d2.jpg', caption: 'Boy & Girl see togather' },
    { url: './BgImages/d3.jpg', caption: 'mercedese cap' },
    { url: './BgImages/d4.jpg', caption: 'motivation poster' },
    { url: './BgImages/d5.jpg', caption: 'motivation poster' },
    { url: './BgImages/d6.jpg', caption: 'Hanuman Ji' },
    { url: './BgImages/d7.jpg', caption: 'Poster' },
    { url: './BgImages/d8.jpg', caption: 'Porche 911 Turbo' },
    { url: './BgImages/d9.jpg', caption: 'GitHub' },
    { url: './BgImages/d10.jpg', caption: 'Gojo' }
]

let currentIndex = 0;
let isPlaying = false;
let timeLeft = 2;
let timerInterval = null;

function updateCarousel() {
    imagePreview.src = images[currentIndex].url;
    caption.innerText = images[currentIndex].caption;

    const dots = document.querySelectorAll('.dot')
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active')
        } else {
            dot.classList.remove('active')
        }
    })
}

function createDot() {
    dotContainer.innerHTML = ''
    dotContainer.style.display = 'flex'
    dotContainer.style.gap = '10px'
    dotContainer.style.justifyContent = 'center'
    dotContainer.style.marginTop = '15px'
    images.forEach((_, index) => {
        const dot = document.createElement('div')
        dot.classList.add('dot')
        dot.addEventListener('click', () => {
            currentIndex = index
            resetTimer();
            updateCarousel();
        })
        dotContainer.appendChild(dot)
    })
}

nextBtn.addEventListener('click', nextSlide)
    function nextSlide () {
    currentIndex = (currentIndex + 1) % images.length
    resetTimer();
    updateCarousel();
}

previousBtn.addEventListener('click', previousSlide)
 function previousSlide () {
    currentIndex --;
    if(currentIndex < 0){
        currentIndex= images.length-1;
    }
    resetTimer();
    updateCarousel();
}

function startTimer(){
    timerInterval = setInterval(()=>{
        timeLeft --;
        timerDisplay.textContent = `Next image in: ${timeLeft}s`
        if(timeLeft <= 0){
            nextSlide();
            timeLeft=2;
            timerDisplay.textContent = `Next image in: ${timeLeft}s`;
        }
    },1000)
}

function resetTimer(){
    if(isPlaying){
        clearInterval(timerInterval)
        timeLeft = 2;
        timerDisplay.textContent = `Next image in: ${timeLeft}s`
        startTimer();
    }
}

autoPlayBtn.addEventListener('click', function(){
    isPlaying = !isPlaying;
    if(isPlaying){
        autoPlayBtn.innerText = 'Stop Auto-Play'
        startTimer();
    }else{
        autoPlayBtn.innerText = 'Start Auto-Play'
        clearInterval(timerInterval)
        timerDisplay.textContent = '-'
    }
})

createDot();
updateCarousel();